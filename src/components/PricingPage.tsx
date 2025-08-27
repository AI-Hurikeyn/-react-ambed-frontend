import React, { useEffect, useRef, useState } from 'react';
import Header from '../sections/layout/Header';
import { motion } from 'framer-motion';
import api from '@services/api';
import 'leaflet/dist/leaflet.css';

// Map Picker Component
interface MapPickerProps {
  value?: { lat: number; lng: number; address?: string } | null;
  onChange: (loc: { lat: number; lng: number; address?: string }) => void;
}

const MapPicker: React.FC<MapPickerProps> = ({ value, onChange }) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapInst = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const markerRef = useRef<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let disposed = false;
    (async () => {
      try {
        // Lazy import Leaflet from local bundle
        const leafletModule: any = await import('leaflet');
        const Lm: any = leafletModule.default ?? leafletModule;

        // Fix marker icon URLs in bundlers
        const iconRetinaUrl = new URL('leaflet/dist/images/marker-icon-2x.png', import.meta.url).toString();
        const iconUrl = new URL('leaflet/dist/images/marker-icon.png', import.meta.url).toString();
        const shadowUrl = new URL('leaflet/dist/images/marker-shadow.png', import
        Lm.Icon.Default.mergeOptions({ iconRetinaUrl, iconUrl, shadowUrl });

        if (disposed) return;
        const center = value ? [value.lat, value.lng] : [36.8065, 10.1815]; // Tunis default
        const map = Lm.map(mapRef.current!, { zoomControl: true }).setView(center, value ? 14 : 12);
        Lm.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '&copy; OpenStreetMap'
        }).addTo(map);
        mapInst.current = map;

        if (value) {
          markerRef.current = Lm.marker(center, { draggable: true }).addTo(map);
        }

        const setPoint = async (lat: number, lng: number) => {
          const latlng = [lat, lng] as [number, number];
          if (!markerRef.current) {
            markerRef.current = Lm.marker(latlng, { draggable: true }).addTo(map);
            markerRef.current.on('dragend', async () => {
              const pos = markerRef.current.getLatLng();
              const addr = await reverseGeocode(pos.lat, pos.lng);
              onChange({ lat: pos.lat, lng: pos.lng, address: addr || value?.address });
            });
          } else {
            markerRef.current.setLatLng(latlng);
          }
          const address = await reverseGeocode(lat, lng);
          onChange({ lat, lng, address: address || value?.address });
        };

        map.on('click', async (e: { latlng: { lat: number; lng: number } }) => {
          await setPoint(e.latlng.lat, e.latlng.lng);
        });

        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Map failed to load. Please enter your address in the description.');
        setLoading(false);
      }
    })();
    return () => { disposed = true; try { mapInst.current?.remove?.(); } catch { /* noop */ } };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="map-picker">
      {loading && <div className="map-skeleton" />}
      {error && <div className="map-error">{error}</div>}
      <div ref={mapRef} className="map-canvas" aria-label="Localisez votre projet sur la carte" />
      <p className="map-hint">Cliquez sur la carte pour déposer un marqueur à l'emplacement du projet.</p>
    </div>
  );
};

// Premium Confirmation
const Confirmation: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <motion.div
    className="confirm-overlay"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <motion.div
      className="confirm-card"
      initial={{ scale: 0.9, y: 30, opacity: 0 }}
      animate={{ scale: 1, y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 120, damping: 14 }}
    >
      <div className="confirm-check">
        <svg viewBox="0 0 24 24" width="48" height="48" aria-hidden>
          <circle cx="12" cy="12" r="11" fill="rgba(16,185,129,.15)" />
          <path d="M6 12.5l3.5 3.5L18 8.5" stroke="#10b981" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h3>Merci!</h3>
      <p>Votre demande a été envoyée à Magic Decor. Nous vous répondrons très vite.</p>
      <button className="btn-primary" onClick={onClose}>Revenir à l'accueil</button>
    </motion.div>
  </motion.div>
);

// Main Redesign: Premium Pricing Request Form
const PricingPage: React.FC<{ onBack?: () => void; setShowPricing?: (v: boolean) => void }> = ({ onBack, setShowPricing }) => {
  const [submitting, setSubmitting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Safe navigation back to homepage (prevents blank state)
  const goHome = (hash: string = '#home') => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).__pendingHash = hash;
    // Push/update hash so Header's hashchange listener updates active item
    if (typeof window !== 'undefined') {
      if (window.location.hash !== hash) window.location.hash = hash; else window.dispatchEvent(new Event('hashchange'));
      // Trigger a scroll recompute after closing overlay
      setTimeout(() => window.dispatchEvent(new Event('scroll')), 0);
    }
    if (onBack) onBack();
    else setShowPricing?.(false);
  };

  const [name, setName] = useState('');
  const [contactMethod, setContactMethod] = useState<'whatsapp' | 'email'>('whatsapp');
  const [contactValue, setContactValue] = useState('');
  const [location, setLocation] = useState<{ lat: number; lng: number; address?: string } | null>(null);
  const [description, setDescription] = useState('');
  const [videoLink, setVideoLink] = useState('');
  const [photos, setPhotos] = useState<File[]>([]);

  const valid = name.trim() && contactValue.trim() && description.trim();

  const onFilesChange = (filesList: FileList | null) => {
    const max = 8;
    const arr = Array.from(filesList || []).slice(0, max);
    setPhotos(arr);
  };

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) return;
    try {
      setSubmitting(true);
      const fd = new FormData();
      fd.append('name', name.trim());
      fd.append('contactMethod', contactMethod);
      fd.append('contact', contactValue.trim());
      if (location) {
        fd.append('lat', String(location.lat));
        fd.append('lng', String(location.lng));
        if (location.address) fd.append('address', location.address);
      }
      fd.append('description', description.trim());
      if (videoLink.trim()) fd.append('videoLink', videoLink.trim());
      photos.forEach((f) => fd.append('photos', f));

      const { data } = await api.post('/api/contact/pricing-request', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      if (!data?.success) throw new Error(data?.message || 'Request failed');

      setShowConfirm(true);
      setSubmitting(false);
      // Reset form subtly after confirmation shows
      setTimeout(() => {
        setName(''); setContactValue(''); setDescription(''); setVideoLink(''); setPhotos([]); setLocation(null);
      }, 300);
    } catch (err) {
      console.error(err);
      alert("Une erreur s'est produite. Veuillez réessayer.");
      setSubmitting(false);
    }
  };

  return (
    <div id="page" className="site page-wrapper pricing-request">
      {/* Unified navbar; pass setShowPricing so clicks can exit to home and scroll */}
      <Header setShowPricing={setShowPricing} forceDefer />

      {/* Hero/Intro */}
      <section className="pr-hero" aria-label="Demande de devis">
        <motion.div
          className="pr-hero__content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 100, damping: 16 }}
        >
          <span className="badge">Peinture & Décoration Premium</span>
          <h1>Réservez une visite | Demande de devis</h1>
          <p>Partagez votre projet et laissez notre équipe vous accompagner. Pas de tarifs affichés — une expérience sur‑mesure.</p>
          <button className="btn-outline" onClick={() => document.getElementById('form')?.scrollIntoView({ behavior: 'smooth' })}>Commencer</button>
        </motion.div>
        <div className="pr-hero__bg" />
        <div className="pr-hero__veil" />
      </section>

      {/* Form Section */}
      <section id="form" className="pr-form">
        <div className="container">
          <motion.form onSubmit={submitForm} className="card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6 }}>
            <div className="card__head">
              <h2>Votre Projet</h2>
              <p>Nous ne stockons aucune donnée. Votre demande est envoyée directement par email à notre équipe.</p>
            </div>

            {/* Name */}
            <div className="field-group">
              <label>Votre nom</label>
              <input type="text" placeholder="Nom et prénom" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>

            {/* Contact choice */}
            <div className="field-group">
              <label>Méthode de contact</label>
              <div className="segmented">
                <button type="button" className={contactMethod === 'whatsapp' ? 'active' : ''} onClick={() => { setContactMethod('whatsapp'); setContactValue(''); }}>WhatsApp</button>
                <button type="button" className={contactMethod === 'email' ? 'active' : ''} onClick={() => { setContactMethod('email'); setContactValue(''); }}>Email</button>
              </div>
              {contactMethod === 'whatsapp' ? (
                <input type="tel" inputMode="tel" placeholder="Numéro WhatsApp" value={contactValue} onChange={(e) => setContactValue(e.target.value)} required />
              ) : (
                <input type="email" inputMode="email" placeholder="Adresse email" value={contactValue} onChange={(e) => setContactValue(e.target.value)} required />
              )}
            </div>

            {/* Map */}
            <div className="field-group">
              <label>Localisation du projet</label>
              <MapPicker value={location} onChange={setLocation} />
              {location?.address && <div className="address-chip">{location.address}</div>}
            </div>

            {/* Description */}
            <div className="field-group">
              <label>Description du projet</label>
              <textarea rows={5} placeholder="Décrivez le style, les surfaces à traiter, les contraintes, la disponibilité…" value={description} onChange={(e) => setDescription(e.target.value)} required />
            </div>

            {/* Photos */}
            <div className="field-group">
              <label>Photos (optionnel)</label>
              <div className="uploader">
                <input id="photos" type="file" accept="image/*" multiple onChange={(e) => onFilesChange(e.target.files)} />
                <label htmlFor="photos">Glissez-déposez vos images ou cliquez pour sélectionner</label>
              </div>
              {photos.length > 0 && (
                <div className="previews">
                  {photos.map((f, i) => (
                    <div key={i} className="thumb" title={f.name}>
                      <img src={URL.createObjectURL(f)} alt={f.name} />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Video/Link */}
            <div className="field-group">
              <label>Lien vidéo ou référence (optionnel)</label>
              <input type="url" placeholder="https://…" value={videoLink} onChange={(e) => setVideoLink(e.target.value)} />
            </div>

            {/* Actions */}
            <div className="actions">
              <button type="button" className="btn-ghost" onClick={() => goHome('#home')}>Retour</button>
              <button type="submit" className="btn-primary" disabled={!valid || submitting}>
                {submitting ? 'Envoi…' : 'Envoyer la demande'}
              </button>
            </div>
          </motion.form>
        </div>
      </section>

      {showConfirm && (
        <Confirmation onClose={() => { setShowConfirm(false); goHome('#home'); }} />
      )}
    </div>
  );
};

export default PricingPage;

// Reverse geocode helper (Nominatim)
async function reverseGeocode(lat: number, lng: number): Promise<string | null> {
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`;
    const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
    if (!res.ok) return `Lat ${lat.toFixed(5)}, Lng ${lng.toFixed(5)}`;
    const data = await res.json();
    return data?.display_name || `Lat ${lat.toFixed(5)}, Lng ${lng.toFixed(5)}`;
  } catch {
    return `Lat ${lat.toFixed(5)}, Lng ${lng.toFixed(5)}`;
  }
}

// Styles injection
const styles = `
.pricing-request { font-family: 'Inter', system-ui, -apple-system, Segoe UI, Roboto, sans-serif; color:#1f2937; }

.pr-hero { position:relative; min-height:72vh; display:grid; place-items:center; padding:120px 20px 60px; overflow:hidden; }
.pr-hero__bg { position:absolute; inset:0; background: radial-gradient(1200px 600px at 20% 10%, rgba(255,255,255,.06), transparent), linear-gradient(135deg, #0f172a, #334155); }
.pr-hero__veil { position:absolute; inset:0; background: radial-gradient(600px 300px at 80% 90%, rgba(16,185,129,.15), transparent); }
.pr-hero__content { position:relative; z-index:2; text-align:center; color:#fff; max-width:900px; }
.pr-hero .badge { display:inline-block; background: rgba(255,255,255,.12); border:1px solid rgba(255,255,255,.22); padding:8px 14px; border-radius:999px; letter-spacing:.08em; font-size:12px; margin-bottom:18px; backdrop-filter: blur(8px); }
.pr-hero h1 { font-size: clamp(32px, 6vw, 56px); line-height:1.05; margin:0 0 16px; font-weight:800; }
.pr-hero p { opacity:.9; font-size: clamp(14px, 1.6vw, 18px); margin:0 0 26px; }
.pr-hero .btn-outline { background:transparent; color:#fff; border:2px solid rgba(255,255,255,.45); border-radius:14px; padding:12px 22px; font-weight:600; transition:.3s; }
.pr-hero .btn-outline:hover { transform: translateY(-2px); border-color:#fff; }

.pr-form { padding: 60px 0 100px; background: linear-gradient(180deg, #ffffff, #f8fafc 40%, #f1f5f9 100%); }
.container { max-width: 1080px; margin: 0 auto; padding: 0 20px; }
.card { background:#fff; border-radius:24px; padding:28px; box-shadow: 0 20px 60px -20px rgba(2,6,23,.25), 0 10px 24px -12px rgba(2,6,23,.18); border:1px solid rgba(2,6,23,.06); }
.card__head h2 { margin:0 0 6px; font-size:26px; font-weight:800; letter-spacing:-.02em; }
.card__head p { margin:0 0 18px; color:#64748b; font-size:14px; }

.field-group { margin: 18px 0 14px; }
.field-group label { display:block; font-size:13px; font-weight:700; color:#0f172a; margin: 0 0 10px; letter-spacing:.02em; }
.field-group input[type="text"],
.field-group input[type="tel"],
.field-group input[type="email"],
.field-group input[type="url"],
.field-group textarea { width:100%; background:#f8fafc; border:1.6px solid rgba(2,6,23,.08); border-radius:16px; padding:14px 16px; font-size:14px; color:#0f172a; transition:.25s; }
.field-group textarea { resize: vertical; min-height: 120px; }
.field-group input:focus,
.field-group textarea:focus { background:#fff; outline:none; border-color:#10b981; box-shadow: 0 10px 28px -16px rgba(16,185,129,.6); }

.segmented { display:flex; gap:10px; background: #f1f5f9; padding:6px; border-radius:12px; border:1px solid rgba(2,6,23,.06); margin: 0 0 10px; }
.segmented button { flex:1; padding:10px 12px; border-radius:10px; border:none; background:transparent; color:#334155; font-weight:700; cursor:pointer; transition:.25s; }
.segmented button.active { background:#fff; color:#0f172a; box-shadow: 0 8px 24px -16px rgba(2,6,23,.35); border:1px solid rgba(2,6,23,.06); }
.segmented button:hover { transform: translateY(-1px); }

.map-picker { background:#fff; border:1px dashed rgba(2,6,23,.15); border-radius:16px; padding:12px; }
.map-canvas { height: 280px; border-radius:12px; overflow:hidden; }
.map-skeleton { height: 280px; border-radius:12px; background: linear-gradient(90deg, #f1f5f9, #e2e8f0, #f1f5f9); background-size: 200% 100%; animation: shimmer 1.6s infinite; }
.map-hint { color:#64748b; font-size:12px; margin:8px 4px 0; }
.map-error { color:#b91c1c; font-size:13px; font-weight:600; margin:8px 0; }
.address-chip { display:inline-block; margin-top:10px; padding:8px 12px; background:#ecfeff; border:1px solid #a5f3fc; color:#155e75; border-radius:999px; font-size:12px; }

.uploader { position:relative; display:flex; align-items:center; justify-content:center; padding:22px; border-radius:16px; border:1.6px dashed rgba(2,6,23,.15); background:#f8fafc; }
.uploader input[type=file] { position:absolute; inset:0; width:100%; height:100%; opacity:0; cursor:pointer; }
.uploader label { pointer-events:none; color:#475569; font-weight:600; }
.previews { display:flex; gap:10px; flex-wrap:wrap; margin-top:10px; }
.previews .thumb { width:84px; height:84px; border-radius:12px; overflow:hidden; border:1px solid rgba(2,6,23,.08); box-shadow: 0 10px 24px -14px rgba(2,6,23,.25); }
.previews img { width:100%; height:100%; object-fit:cover; display:block; }

.actions { display:flex; gap:12px; margin-top: 8px; }
.btn-primary { background: linear-gradient(90deg,#10b981,#059669); color:#fff; border:none; padding:14px 18px; border-radius:14px; font-weight:800; letter-spacing:.02em; box-shadow: 0 16px 42px -18px rgba(5,150,105,.8); cursor:pointer; transition:.25s; }
.btn-primary:hover { transform: translateY(-2px); }
.btn-primary:disabled { opacity:.6; cursor:not-allowed; }
.btn-ghost { background:#fff; border:1px solid rgba(2,6,23,.12); color:#0f172a; padding:14px 18px; border-radius:14px; font-weight:700; cursor:pointer; transition:.25s; }
.btn-ghost:hover { transform: translateY(-1px); }

.confirm-overlay { position:fixed; inset:0; display:grid; place-items:center; background: rgba(2,6,23,.55); z-index: 1000; }
.confirm-card { background:#fff; width:min(520px, calc(100vw - 40px)); border-radius:22px; padding:28px; text-align:center; box-shadow: 0 30px 80px -20px rgba(2,6,23,.45); border:1px solid rgba(2,6,23,.06); }
.confirm-check { display:grid; place-items:center; width:72px; height:72px; margin:0 auto 10px; border-radius:50%; background: radial-gradient(closest-side, rgba(16,185,129,.2), rgba(16,185,129,.05)); }
.confirm-card h3 { margin:8px 0 6px; font-size:22px; font-weight:800; }
.confirm-card p { margin:0 0 16px; color:#475569; }

@keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }

@media (max-width: 700px) {
  .card { padding:18px; border-radius:18px; }
  .actions { flex-direction: column; }
}
`;

if (typeof document !== 'undefined') {
  const el = document.createElement('style');
  el.textContent = styles;
  document.head.appendChild(el);
}
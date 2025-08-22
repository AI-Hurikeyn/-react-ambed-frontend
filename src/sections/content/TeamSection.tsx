import React, { useRef, useEffect } from 'react';

const certificates = [
	{
		img: '/assets/certifics/1000011387.jpg',
		title: 'Certification Qualité 2024',
		issuer: 'Institut National',
		desc: 'Reconnaissance officielle de la qualité de nos prestations.',
	},
	{
		img: '/assets/certifics/1000011388.jpg',
		title: 'Accréditation Design',
		issuer: 'Astral', // updated issuer
		desc: 'Validation de notre excellence créative et technique.',
	},
];

const TeamSection: React.FC = () => {
	const containerRef = useRef<HTMLDivElement | null>(null);

	// Scroll reveal
	useEffect(() => {
		const cards = containerRef.current?.querySelectorAll('.cert-card');
		if (!cards || !cards.length) return;
		const io = new IntersectionObserver(
			(entries) => {
				entries.forEach((e) => { if (e.isIntersecting) (e.target as HTMLElement).classList.add('in-view'); });
			},
			{ threshold: 0.3 }
		);
		cards.forEach((c) => io.observe(c));
		return () => io.disconnect();
	}, []);

	// Continuous scroll-driven 3D oscillation (never static)
	useEffect(() => {
		const wrap = containerRef.current;
		if (!wrap) return;
		const cards = Array.from(wrap.querySelectorAll<HTMLElement>('.cert-card'));
		let ticking = false;

		const update = () => {
			if (!wrap) { ticking = false; return; }
			const rect = wrap.getBoundingClientRect();
			const vh = window.innerHeight;
			// Base progress for initial settle
			const total = rect.height + vh;
			const scrolled = vh - rect.top;
			const raw = scrolled / total;
			const progress = Math.min(1, Math.max(0, raw));
			const settleEase = 1 - Math.pow(1 - progress, 3); // 0 -> 1
			const globalScroll = window.scrollY || window.pageYOffset;

			cards.forEach((card, i) => {
				const dir = i % 2 === 0 ? -1 : 1;
				// Stronger initial tilt then flatten
				const baseX = 32; // degrees
				const baseY = 26; // degrees
				// Continuous oscillation tied to scroll position for perpetual subtle movement
				const oscX = Math.sin((globalScroll + i * 160) / 140) * 6; // amplitude 6
				const oscY = Math.cos((globalScroll + i * 220) / 150) * 8 * dir; // amplitude 8
				// Residual tilt reduces as component settles ( (1-settleEase) factor )
				const rx = baseX * (1 - settleEase) + oscX * 0.6; // blend oscillation
				const ry = (baseY * (1 - settleEase) + oscY * 0.7) * dir;
				card.style.setProperty('--rx', `${rx.toFixed(2)}deg`);
				card.style.setProperty('--ry', `${ry.toFixed(2)}deg`);
				// Halo intensity tracks settle + oscillation energy
				const halo = Math.min(1, 0.15 + settleEase * 0.55 + Math.abs(oscX) / 40);
				card.style.setProperty('--tilt-opacity', halo.toFixed(2));
			});
			// keep running (no removal) for perpetual subtle motion
			ticking = false;
		};

		const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
		window.addEventListener('scroll', onScroll, { passive: true });
		// Also animate on interval (so motion continues if user stops scrolling)
		const rafLoop = () => { update(); requestAnimationFrame(rafLoop); };
		rAFStart();
		function rAFStart(){ requestAnimationFrame(rafLoop); }
		update();
		return () => { window.removeEventListener('scroll', onScroll); };
	}, []);

	return (
		<section className="team-one certs" id="team">
			<div className="container">
				<div className="section-title text-center fade-seq">
					<span className="section-title__tagline">CERTIFICATIONS</span>
					<h2 className="section-title__title">Notre Crédibilité Validée</h2>
					<div className="section-title__line"></div>
				</div>
				<div ref={containerRef} className="certs__grid" aria-label="Certifications officielles">
					{certificates.map((c) => (
						<article key={c.title} className="cert-card">
							<div className="cert-card__inner">
								<div className="cert-card__media">
									<img
										src={c.img}
										alt={c.title}
										loading="lazy"
										decoding="async"
										onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = '0.3'; }}
									/>
									<div className="cert-card__glare" />
									<div className="cert-card__glare cert-card__glare--alt" />
									<div className="cert-card__ring" />
								</div>
								<div className="cert-card__meta">
									<h3 className="cert-card__title">{c.title}</h3>
									<p className="cert-card__issuer">{c.issuer}</p>
									<p className="cert-card__desc">{c.desc}</p>
								</div>
							</div>
						</article>
					))}
				</div>
			</div>
		</section>
	);
};

export default TeamSection;

// Data for HomePage sections

export const sliderData = [
  {
    bg: '/vendor/assets/uploads/2022/04/main-slider-1-1.jpg',
    headline: 'Papiers Peints <br> de Qualité <span class="amp">&</span> <br>Peinture Pour Maison',
    subheadline: 'Bienvenue chez Magic Decor',
    btn: 'Découvrir Plus',
  },
  {
    bg: '/vendor/assets/uploads/2022/04/main-slider-1-2.jpg',
    headline: 'Papiers Peints <br> de Qualité <span class="amp">&</span> <br>Peinture Pour Maison',
    subheadline: 'Bienvenue chez Magic Decor',
    btn: 'Découvrir Plus',
  },
  {
    bg: '/vendor/assets/uploads/2022/04/main-slider-1-3.jpg',
    headline: 'Papiers Peints <br> de Qualité <span class="amp">&</span> <br>Peinture Pour Maison',
    subheadline: 'Bienvenue chez Magic Decor',
    btn: 'Découvrir Plus',
  },
];

// === Project Slides (870x612 main target with fallback) ===
// We now target a standardized 870x612 main image per project. Provide those files named by a normalized slug:
//   design-exterieur-870x612.jpeg
//   design-mural-moderne-870x612.jpeg (note: title has "Moderne" but current original file is Design-Mural-Modern.jpg)
//   interieur-de-chambre-870x612.jpeg
//   papier-peint-de-chambre-870x612.jpeg
// Place them in public/assets. Until they exist, we keep a fallbackOriginal pointing to current files so the component can fallback.
// Update the rendering component to try project.img then fallback to project.fallbackOriginal on onError.

const rawProjectSlides = [
  {
    title: 'Design Extérieur',
    text: 'Découvrez nos créations extérieures exceptionnelles qui transforment votre façade en une œuvre d\'art. Nous combinons esthétique moderne et durabilité pour créer des espaces qui vous ressemblent.',
    link: '#projects',
    original: '/assets/Design-Exterieur.jpeg'
  },
  {
    title: 'Design Mural Moderne',
    text: 'Transformez vos murs avec nos designs contemporains et sophistiqués. Chaque projet reflète l\'élégance et l\'innovation pour créer des intérieurs uniques et harmonieux.',
    link: '#projects',
    // Original filename uses English "Modern"; keep as fallback
    original: '/assets/Design-Mural-Modern.jpg'
  },
  {
    title: 'Intérieur de Chambre',
    text: 'Créez des espaces de vie confortables et stylés avec nos solutions d\'aménagement intérieur. Nous concevons chaque pièce pour maximiser le confort et l\'esthétique.',
    link: '#projects',
    original: '/assets/Intérieur-de-chambre.jpeg'
  },
  {
    title: 'Papier Peint de Chambre',
    text: 'Nos papiers peints haut de gamme apportent caractère et personnalité à vos espaces. Découvrez une sélection exclusive de motifs et textures pour sublimer vos intérieurs.',
    link: '#projects',
    original: '/assets/Papier-peint-de-chambre.jpg'
  },
];

const toSlug = (title: string) => title
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/[^A-Za-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '')
  .toLowerCase();

export const projectSlides = rawProjectSlides.map(p => {
  const slug = toSlug(p.title); // e.g. design-exterieur
  return {
    title: p.title,
    text: p.text,
    link: p.link,
    img: `/assets/${slug}-870x612.jpeg`,      // properly sized 870x612 main image
    thumb: `/assets/${slug}-130x120.jpeg`,    // properly sized 130x120 thumbnail
    fallbackOriginal: p.original,             // fallback if sized images fail to load
  };
});
// === End Project Slides ===

export const testimonialSlides = [
  {
    img: '/vendor/assets/uploads/2022/04/testimonial-1-1.jpg',
    name: 'Snoussi Wassim',
    title: 'Notre Client',
    text: 'Magic Decor a transformé notre maison avec un professionnalisme exceptionnel. Le résultat dépasse toutes nos attentes. Une équipe créative et à l\'écoute !'
  },
  {
    img: '/vendor/assets/uploads/2022/04/testimonial-1-2.jpg',
    name: 'Yassmine Boughanmi',
    title: 'Notre Cliente',
    text: 'Un service de qualité remarquable ! L\'équipe de Magic Decor a su comprendre parfaitement nos besoins et réaliser un projet magnifique dans les délais.'
  },
  {
    img: '/vendor/assets/uploads/2022/04/testimonial-1-3.jpg',
    name: 'Ezzedine Abid',
    title: 'Notre Client',
    text: 'Je recommande vivement Magic Decor pour leur expertise et leur attention aux détails. Ils ont donné vie à notre vision avec brio et créativité.'
  },
];

export const brandSlides = [
  '/vendor/assets/uploads/2022/04/brand-1-1.png',
  '/vendor/assets/uploads/2022/04/brand-1-2.png',
  '/vendor/assets/uploads/2022/04/brand-1-3.png',
  '/vendor/assets/uploads/2022/04/brand-1-4.png',
  '/vendor/assets/uploads/2022/04/brand-1-5.png',
];

export const business = {
  name: 'Stickers Corporation',
  phone: '+92 345 5130004',
  secondPhone: '+92 306 5130004',
  landline: '051-4441242',
  email: 'stickerzcorp@gmail.com',
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '923455130004',
  address: 'Shop #1, Umair Plaza, Opposite PSO Pump Car Wash, I-10 Markaz, Islamabad, Pakistan',
  maps: 'https://www.google.com/maps/dir/?api=1&destination=Stickers+Corporation+Islamabad&destination_place_id=ChIJLRjMavGV3zgRPh1liHLwtjw',
  instagram: 'https://www.instagram.com/stickers.corporation/',
  facebook: 'https://www.facebook.com/Stickerzcorp/',
};

export const services = [
  { id: 'vehicle', title: 'Vehicle wrapping & graphics', short: 'Vehicle graphics', text: 'A new look, a personal detail, or your business on the move. Explore vinyl wraps and custom-sized car stickers.', detail: 'Tell us your vehicle model, the areas you want covered, and the look you have in mind.', image: 'scooter-pop-art-vinyl-wrap', tags: ['Car wrapping', 'Custom car stickers', 'Vinyl graphics'] },
  { id: 'stickers', title: 'Custom stickers & printing', short: 'Stickers & printing', text: 'Printed stickers, clear labels and custom vinyl graphics. Make your artwork work on the surface you have in mind.', detail: 'Share the artwork, approximate size, quantity and where the sticker will be used.', image: 'solid-color-vinyl-sheet-selection', tags: ['Printed & clear stickers', 'PVC & vinyl printing', 'Custom sizes'] },
  { id: 'signage', title: 'Commercial signage', short: 'Signage', text: 'Give your name a physical presence. Signboards, neon signs, logos and Panaflex printing for your business or space.', detail: 'Share the sign dimensions, indoor or outdoor location, and your preferred style.', image: 'cheezy-burger-and-shake-cutout-sign', tags: ['Signboards', 'Neon signs', 'Panaflex'] },
  { id: 'interiors', title: 'Wall art & interior branding', short: 'Wall & interior graphics', text: 'Make a room feel like yours. Custom wall stickers, wallpaper and graphics for homes, offices and commercial interiors.', detail: 'Send your wall measurements, a photo of the space and an idea of the design.', image: 'colorful-world-map-wall-graphic', tags: ['Wall art', 'Wallpaper', 'Office graphics'] },
  { id: 'glass', title: 'Glass graphics & films', short: 'Glass graphics', text: 'Printed glass graphics and glass safety films. Discuss the right treatment for your window, partition or glass surface.', detail: 'Tell us the glass dimensions and whether you need graphics, coverage or safety film.', image: null, tags: ['Glass printing', 'Glass paper', 'Safety films'] },
  { id: 'custom', title: 'Printing beyond paper', short: 'Custom printing', text: 'Have a different surface in mind? Ask about printing on glass, wood, metal, plastic, paper and shirts.', detail: 'Tell us the material, shape, size and quantity. We will discuss what is suitable for your item.', image: null, tags: ['Custom materials', 'Shirt printing', 'Commercial branding'] },
] as const;

export type ServiceId = typeof services[number]['id'];
export const serviceTitle = (id: string) => services.find(service => service.id === id)?.title || 'Help me choose';
export const quoteHref = (id: string, material?: string) => `?service=${encodeURIComponent(id)}${material ? `&material=${encodeURIComponent(material)}` : ''}#quote`;

export type Project = { slug: string; title: string; category: 'interiors' | 'vehicle' | 'signage'; label: string; alt: string; width: number; height: number; note: string };
export const projects: Project[] = [
  { slug: 'colorful-world-map-wall-graphic', title: 'A world of colour.', category: 'interiors', label: 'Wall & interior graphics', alt: 'Bright illustrated world map wall graphic with country names and colourful animals', width: 4032, height: 3024, note: 'A colourful world map graphic photographed in an interior space.' },
  { slug: 'scooter-pop-art-vinyl-wrap', title: 'Personality. In motion.', category: 'vehicle', label: 'Vehicle wrapping', alt: 'Scooter front and mudguard covered in vivid comic-style pop art vinyl', width: 1200, height: 1600, note: 'Pop-art vinyl covering the front and mudguard of a scooter.' },
  { slug: 'science-and-technology-wall-graphic', title: 'Ideas off the page.', category: 'interiors', label: 'Wall & interior graphics', alt: 'Science and technology line-art wall graphic featuring a bicycle, microscope and computer', width: 4032, height: 3024, note: 'Science and technology imagery arranged as a wall graphic.' },
  { slug: 'cheezy-burger-and-shake-cutout-sign', title: 'Made to stand out.', category: 'signage', label: 'Commercial signage', alt: 'Cheezy Burger and Shake cutout sign with a burger, pizza slice and milkshake', width: 3024, height: 4032, note: 'A Cheezy Burger & Shake cutout sign photographed inside the shop.' },
  { slug: 'focus-motivation-office-wall-lettering', title: 'Words with presence.', category: 'interiors', label: 'Office wall lettering', alt: 'Office wall lettering reading focus on motivation education off excuses', width: 4032, height: 3024, note: 'Motivational lettering on an office wall.' },
  { slug: 'coding-word-cloud-wall-graphic', title: 'A space that speaks.', category: 'interiors', label: 'Office wall graphics', alt: 'Coding word cloud in black and red on an interior wall', width: 4032, height: 3024, note: 'A coding-themed word cloud applied to an interior wall.' },
];

export const materialFamilies = [
  { id: 'solid', name: 'Solid colours', image: 'solid-color-vinyl-sheet-selection', alt: 'Fan of solid colour vinyl sheets in contrasting colours', title: 'One colour. A different feeling.', text: 'Keep it bold, keep it subtle, make it yours. Explore solid-colour PVC and vinyl, with shine and matte options to discuss.', detail: 'Ask about available colours and finishes for your surface.' },
  { id: 'pattern', name: 'Printed patterns', image: 'patterned-vinyl-roll-selection', alt: 'Selection of patterned vinyl rolls with graphic and illustrated designs', title: 'Let the pattern do the talking.', text: 'From graphic prints to expressive illustrations, patterned vinyl adds another layer of personality to a surface.', detail: 'Ask about current designs, dimensions and availability.' },
  { id: 'marble', name: 'Marble effect', image: 'marble-effect-vinyl-roll-selection', alt: 'Marble-effect vinyl rolls in light, dark and warm stone patterns', title: 'A little change of texture.', text: 'Stone-inspired patterns, translated into vinyl. Explore the marble-effect rolls shown in the material collection.', detail: 'Ask about suitability for your surface before ordering.' },
] as const;

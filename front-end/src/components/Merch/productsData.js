const products = [
  // Characters
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `character-${i + 1}`,
    type: 'character',
    name: `Ch ${i + 1}`,
    price: 2.5,
    url: `/assets/ch${i + 1}.png`,
  })),
  // Outfits
  ...Array.from({ length: 8 }, (_, i) => ({
    id: `outfit-${i + 1}`,
    type: 'outfit',
    name: `Outfit ${i + 1}`,
    price: 2.5,
    url: `/images/outfits/outfit${i + 1}.jpg`,
  })),
  // Backgrounds
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `background-${i + 1}`,
    type: 'background',
    name: `Bg ${i + 1}`,
    price: 2.5,
    url: `/images/backgrounds/bg${i + 1}.jpg`,
  })),
];

export default products;

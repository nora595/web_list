window.BPS_LIST_DATA = (function () {
  const IMGS = [
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=480&h=480&fit=crop',
    'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=480&h=480&fit=crop',
    'https://images.unsplash.com/photo-1617806117938-529d34949e8f?w=480&h=480&fit=crop',
    'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=480&h=480&fit=crop',
    'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=480&h=480&fit=crop',
    'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=480&h=480&fit=crop',
    'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=480&h=480&fit=crop',
    'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=480&h=480&fit=crop',
    'https://images.unsplash.com/photo-1617103996701-966ffc08c9b0?w=480&h=480&fit=crop',
    'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=480&h=480&fit=crop',
  ];

  const CATEGORIES = [
    { id: 'all', name: 'All Categories', img: IMGS[0] },
    { id: 'new', name: 'New Arrivals', img: IMGS[1] },
    { id: 'best', name: 'Bestsellers', img: IMGS[2] },
    { id: 'living', name: 'Linsy Living', img: IMGS[3] },
    { id: 'kids', name: 'Kids Furniture', img: IMGS[5] },
    { id: 'inspire', name: 'Inspire Series', img: IMGS[4] },
    { id: 'livingroom', name: 'Living Room', img: IMGS[6] },
    { id: 'dining', name: 'Dining Room', img: IMGS[7] },
    { id: 'bedroom', name: 'Bedroom', img: IMGS[8] },
    { id: 'study', name: 'Study', img: IMGS[9] },
  ];

  const PRODUCTS = Array.from({ length: 20 }, (_, i) => {
    const imgIdx = i % IMGS.length;
    return {
      id: `p${i + 1}`,
      title: 'Oxygen Wood Grain Sintered s...',
      item: `LSC25ZH07589${i}`,
      price: 78.56,
      estDel: '7d',
      moq: 5,
      images: 12,
      image: IMGS[imgIdx],
      gallery: [
        IMGS[imgIdx],
        IMGS[(imgIdx + 1) % IMGS.length],
        IMGS[(imgIdx + 2) % IMGS.length],
        IMGS[(imgIdx + 3) % IMGS.length],
        IMGS[(imgIdx + 4) % IMGS.length],
      ],
      favorited: i % 7 === 0,
    };
  });

  return { CATEGORIES, PRODUCTS };
})();

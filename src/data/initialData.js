export const CATEGORIES = ["Hammasi", "Noutbuklar", "Audio", "Aksessuarlar"];

export const DELIVERY_FEE = 30000;

export const PROMO_CODES = {
  SALE10: { code: "SALE10", percent: 10 },
  TEXNO15: { code: "TEXNO15", percent: 15 },
  SALE20: { code: "SALE20", percent: 20 },
};

export const INITIAL_PRODUCTS = [
  {
    id: 1,
    title: 'MacBook Air M2 13"',
    category: "Noutbuklar",
    specs: "8GB RAM • 256GB SSD • Space Gray",
    price: 12400000,
    rating: "4.9",
    stock: 5,
    icon: "laptop",
  },
  {
    id: 2,
    title: "Sony WH-1000XM5",
    category: "Audio",
    specs: "Active Noise Cancelling • 30 soat batareya",
    price: 4200000,
    rating: "4.8",
    stock: 2,
    icon: "headphones",
  },
  {
    id: 3,
    title: "Keychron K2 Pro",
    category: "Aksessuarlar",
    specs: "Mexanik klaviatura • Bluetooth / USB-C",
    price: 1350000,
    rating: "4.7",
    stock: 8,
    icon: "keyboard",
  },
  {
    id: 4,
    title: "Apple Watch Series 9",
    category: "Aksessuarlar",
    specs: "45mm Aluminium • GPS • Midnight",
    price: 5100000,
    rating: "4.8",
    stock: 4,
    icon: "watch",
  },
  {
    id: 5,
    title: "ASUS Zenbook 14 OLED",
    category: "Noutbuklar",
    specs: "16GB RAM • 512GB SSD • Core Ultra 5",
    price: 10800000,
    rating: "4.7",
    stock: 0,
    icon: "laptop",
  },
  {
    id: 6,
    title: "Logitech MX Master 3S",
    category: "Aksessuarlar",
    specs: "8000 DPI • Silent Click • Wireless",
    price: 1180000,
    rating: "4.9",
    stock: 6,
    icon: "mouse",
  },
];

export const INITIAL_WISHLIST = [1, 3];

export const INITIAL_CART = [
  { productId: 2, quantity: 1 },
  { productId: 3, quantity: 2 },
];

export const INITIAL_ORDERS = [
  {
    id: "#1024",
    customer: "Azizbek Karimov",
    email: "azizbek@example.com",
    itemsSummary: "MacBook Air M2 (1x), Logitech MX Master 3S (1x)",
    delivery: "Kuryer orqali",
    status: "Qabul qilindi",
    total: "13 610 000 so'm",
  },
  {
    id: "#1023",
    customer: "Malika Rustamova",
    email: "malika@example.com",
    itemsSummary: "Sony WH-1000XM5 (1x)",
    delivery: "Do‘kondan olib ketish",
    status: "Qabul qilindi",
    total: "4 200 000 so'm",
  },
];

export const INITIAL_USERS = [
  {
    id: 1,
    fullName: "Azizbek Karimov",
    email: "azizbek@example.com",
    phone: "+998 90 123 45 67",
    password: "123456",
  },
];

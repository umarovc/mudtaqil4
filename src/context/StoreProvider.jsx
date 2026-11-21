import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  DELIVERY_FEE,
  INITIAL_CART,
  INITIAL_ORDERS,
  INITIAL_PRODUCTS,
  INITIAL_USERS,
  INITIAL_WISHLIST,
  PROMO_CODES,
} from "../data/initialData";
import { formatPrice } from "../utils/format";
import { StoreContext } from "./storeContext";

const STORAGE_KEYS = {
  products: "texnobozor_products_v1",
  wishlist: "texnobozor_wishlist_v1",
  cart: "texnobozor_cart_v1",
  orders: "texnobozor_orders_v1",
  users: "texnobozor_users_v1",
  currentUser: "texnobozor_current_user_v1",
};

function readStorage(key, fallback, storage = window.localStorage) {
  try {
    const raw = storage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function readCurrentUser() {
  const fromLocal = readStorage(STORAGE_KEYS.currentUser, null, window.localStorage);
  if (fromLocal) return fromLocal;
  return readStorage(STORAGE_KEYS.currentUser, null, window.sessionStorage);
}

export function StoreProvider({ children }) {
  const [products, setProducts] = useState(() =>
    readStorage(STORAGE_KEYS.products, INITIAL_PRODUCTS)
  );
  const [wishlistIds, setWishlistIds] = useState(() =>
    readStorage(STORAGE_KEYS.wishlist, INITIAL_WISHLIST)
  );
  const [cart, setCart] = useState(() =>
    readStorage(STORAGE_KEYS.cart, INITIAL_CART)
  );
  const [orders, setOrders] = useState(() =>
    readStorage(STORAGE_KEYS.orders, INITIAL_ORDERS)
  );
  const [users, setUsers] = useState(() =>
    readStorage(STORAGE_KEYS.users, INITIAL_USERS)
  );
  const [currentUser, setCurrentUser] = useState(readCurrentUser);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Hammasi");
  const [onlyWishlist, setOnlyWishlist] = useState(false);
  const [sortBy, setSortBy] = useState("default");

  const [appliedPromo, setAppliedPromo] = useState(null);
  const [deliveryMethod, setDeliveryMethod] = useState("courier");
  const [toast, setToast] = useState(null);
  const toastTimerRef = useRef(null);

  const showToast = useCallback((message, type = "success") => {
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }
    setToast({ message, type, id: Date.now() });
    toastTimerRef.current = setTimeout(() => {
      setToast(null);
    }, 3000);
  }, []);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) {
        clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEYS.products, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEYS.wishlist, JSON.stringify(wishlistIds));
  }, [wishlistIds]);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEYS.orders, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(users));
  }, [users]);

  const toggleWishlist = useCallback(
    (productId) => {
      const targetProduct = products.find((p) => p.id === productId);
      setWishlistIds((prev) => {
        const exists = prev.includes(productId);
        if (targetProduct) {
          showToast(
            exists
              ? `${targetProduct.title} sevimlilardan olib tashlandi`
              : `${targetProduct.title} sevimlilarga qo‘shildi`,
            "info"
          );
        }
        return exists ? prev.filter((id) => id !== productId) : [...prev, productId];
      });
    },
    [products, showToast]
  );

  const resetFilters = useCallback(() => {
    setSearchQuery("");
    setSelectedCategory("Hammasi");
    setOnlyWishlist(false);
    setSortBy("default");
  }, []);

  const addToCart = useCallback(
    (productId) => {
      const product = products.find((p) => p.id === productId);
      if (!product || product.stock <= 0) {
        showToast("Bu mahsulot hozircha omborda mavjud emas", "error");
        return;
      }

      const existing = cart.find((item) => item.productId === productId);
      if (existing && existing.quantity >= product.stock) {
        showToast(`Omborda faqat ${product.stock} dona mavjud`, "error");
        return;
      }

      setCart((prev) => {
        const found = prev.find((item) => item.productId === productId);
        if (found) {
          return prev.map((item) =>
            item.productId === productId
              ? { ...item, quantity: Math.min(item.quantity + 1, product.stock) }
              : item
          );
        }
        return [...prev, { productId, quantity: 1 }];
      });

      showToast(`${product.title} savatga qo‘shildi`, "success");
    },
    [cart, products, showToast]
  );

  const increaseQty = useCallback(
    (productId) => {
      const product = products.find((p) => p.id === productId);
      if (!product) return;

      const currentItem = cart.find((item) => item.productId === productId);
      if (currentItem && currentItem.quantity >= product.stock) {
        showToast(`Omborda jami ${product.stock} dona mavjud`, "error");
        return;
      }

      setCart((prev) =>
        prev.map((item) =>
          item.productId === productId
            ? { ...item, quantity: Math.min(item.quantity + 1, product.stock) }
            : item
        )
      );
    },
    [cart, products, showToast]
  );

  const decreaseQty = useCallback((productId) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }, []);

  const removeFromCart = useCallback(
    (productId) => {
      const product = products.find((p) => p.id === productId);
      setCart((prev) => prev.filter((item) => item.productId !== productId));
      if (product) {
        showToast(`${product.title} savatdan o‘chirildi`, "info");
      }
    },
    [products, showToast]
  );

  const clearCart = useCallback(() => {
    setCart([]);
    setAppliedPromo(null);
    showToast("Savat tozalandi", "info");
  }, [showToast]);

  const applyPromoCode = useCallback((rawCode) => {
    const normalized = rawCode.trim().toUpperCase();
    if (!normalized) {
      return { ok: false, error: "Promo kodni kiriting (masalan: SALE10)" };
    }
    const promo = PROMO_CODES[normalized];
    if (!promo) {
      return {
        ok: false,
        error: "Noto‘g‘ri promo kod. Mavjud kodlar: SALE10, TEXNO15, SALE20",
      };
    }
    setAppliedPromo(promo);
    return { ok: true, promo };
  }, []);

  const removePromoCode = useCallback(() => {
    setAppliedPromo(null);
  }, []);

  const cartItems = useMemo(() => {
    return cart
      .map((entry) => {
        const product = products.find((p) => p.id === entry.productId);
        if (!product || product.stock <= 0) return null;
        const safeQty = Math.min(entry.quantity, product.stock);
        return {
          id: product.id,
          name: product.title,
          category: product.category,
          specs: product.specs,
          price: product.price,
          stock: product.stock,
          unitPrice: formatPrice(product.price),
          subtotalNumber: product.price * safeQty,
          subtotal: formatPrice(product.price * safeQty),
          quantity: safeQty,
          icon: product.icon,
        };
      })
      .filter(Boolean);
  }, [cart, products]);

  const cartTotalCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  const itemsSubtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.subtotalNumber, 0),
    [cartItems]
  );

  const discountAmount = useMemo(() => {
    if (!appliedPromo || itemsSubtotal === 0) return 0;
    return Math.round((itemsSubtotal * appliedPromo.percent) / 100);
  }, [appliedPromo, itemsSubtotal]);

  const deliveryFee = useMemo(() => {
    if (cartItems.length === 0) return 0;
    return deliveryMethod === "courier" ? DELIVERY_FEE : 0;
  }, [cartItems.length, deliveryMethod]);

  const finalTotal = useMemo(
    () => Math.max(0, itemsSubtotal - discountAmount + deliveryFee),
    [itemsSubtotal, discountAmount, deliveryFee]
  );

  const placeOrder = useCallback(
    ({ customerName, phone }) => {
      if (cartItems.length === 0) {
        return { ok: false, error: "Savatingiz bo‘sh. Avval mahsulot qo‘shing." };
      }

      const trimmedName = customerName.trim();
      const trimmedPhone = phone.trim();

      if (trimmedName.length < 2) {
        return { ok: false, error: "Iltimos, ismingizni to‘liq kiriting." };
      }

      if (trimmedPhone.replace(/\D/g, "").length < 7) {
        return { ok: false, error: "Iltimos, to‘g‘ri telefon raqam kiriting." };
      }

      const highestId = orders.reduce((max, order) => {
        const numeric = parseInt(String(order.id).replace(/\D/g, ""), 10);
        return Number.isFinite(numeric) && numeric > max ? numeric : max;
      }, 1024);

      const newOrder = {
        id: `#${highestId + 1}`,
        customer: trimmedName,
        phone: trimmedPhone,
        email: currentUser?.email || "",
        itemsSummary: cartItems
          .map((item) => `${item.name} (${item.quantity}x)`)
          .join(", "),
        delivery:
          deliveryMethod === "courier"
            ? "Kuryer orqali"
            : "Do‘kondan olib ketish",
        status: "Qabul qilindi",
        total: formatPrice(finalTotal),
      };

      setProducts((prev) =>
        prev.map((product) => {
          const ordered = cartItems.find((item) => item.id === product.id);
          if (!ordered) return product;
          return {
            ...product,
            stock: Math.max(0, product.stock - ordered.quantity),
          };
        })
      );

      setOrders((prev) => [newOrder, ...prev]);
      setCart([]);
      setAppliedPromo(null);
      showToast(`Buyurtma ${newOrder.id} muvaffaqiyatli qabul qilindi!`, "success");
      return { ok: true, order: newOrder };
    },
    [cartItems, currentUser, deliveryMethod, finalTotal, orders, showToast]
  );

  const login = useCallback(
    ({ email, password, remember }) => {
      const normalizedEmail = email.trim().toLowerCase();
      if (!normalizedEmail || !password) {
        return { ok: false, error: "Elektron pochta va parolni kiriting." };
      }

      const matched = users.find(
        (u) => u.email.toLowerCase() === normalizedEmail && u.password === password
      );

      if (!matched) {
        return { ok: false, error: "Elektron pochta yoki parol noto‘g‘ri." };
      }

      const sessionUser = {
        id: matched.id,
        fullName: matched.fullName,
        email: matched.email,
        phone: matched.phone,
      };

      setCurrentUser(sessionUser);
      if (remember) {
        window.localStorage.setItem(
          STORAGE_KEYS.currentUser,
          JSON.stringify(sessionUser)
        );
        window.sessionStorage.removeItem(STORAGE_KEYS.currentUser);
      } else {
        window.sessionStorage.setItem(
          STORAGE_KEYS.currentUser,
          JSON.stringify(sessionUser)
        );
        window.localStorage.removeItem(STORAGE_KEYS.currentUser);
      }

      showToast(`Xush kelibsiz, ${sessionUser.fullName}!`, "success");
      return { ok: true, user: sessionUser };
    },
    [showToast, users]
  );

  const register = useCallback(
    ({ fullName, email, phone, password, confirmPassword }) => {
      const trimmedName = fullName.trim();
      const normalizedEmail = email.trim().toLowerCase();
      const trimmedPhone = phone.trim();

      if (trimmedName.length < 2) {
        return { ok: false, error: "To‘liq ismingizni kiriting." };
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
        return { ok: false, error: "To‘g‘ri elektron pochta kiriting." };
      }
      if (trimmedPhone.replace(/\D/g, "").length < 7) {
        return { ok: false, error: "To‘g‘ri telefon raqam kiriting." };
      }
      if (password.length < 6) {
        return { ok: false, error: "Parol kamida 6 ta belgidan iborat bo‘lishi kerak." };
      }
      if (password !== confirmPassword) {
        return { ok: false, error: "Parollar bir-biriga mos kelmadi." };
      }

      const exists = users.some((u) => u.email.toLowerCase() === normalizedEmail);
      if (exists) {
        return {
          ok: false,
          error: "Bu elektron pochta bilan hisob allaqachon mavjud.",
        };
      }

      const newUser = {
        id: Date.now(),
        fullName: trimmedName,
        email: normalizedEmail,
        phone: trimmedPhone,
        password,
      };

      setUsers((prev) => [...prev, newUser]);

      const sessionUser = {
        id: newUser.id,
        fullName: newUser.fullName,
        email: newUser.email,
        phone: newUser.phone,
      };

      setCurrentUser(sessionUser);
      window.localStorage.setItem(
        STORAGE_KEYS.currentUser,
        JSON.stringify(sessionUser)
      );

      showToast("Ro‘yxatdan muvaffaqiyatli o‘tdingiz!", "success");
      return { ok: true, user: sessionUser };
    },
    [showToast, users]
  );

  const updateProfile = useCallback(
    ({ fullName, phone }) => {
      if (!currentUser) {
        return { ok: false, error: "Avval hisobingizga kiring." };
      }

      const trimmedName = fullName.trim();
      const trimmedPhone = phone.trim();
      if (trimmedName.length < 2) {
        return { ok: false, error: "To‘liq ism kamida 2 ta harf bo‘lishi kerak." };
      }
      if (trimmedPhone.replace(/\D/g, "").length < 7) {
        return { ok: false, error: "To‘g‘ri telefon raqam kiriting." };
      }

      const updatedUser = {
        ...currentUser,
        fullName: trimmedName,
        phone: trimmedPhone,
      };

      setCurrentUser(updatedUser);
      setUsers((prev) =>
        prev.map((u) =>
          u.email.toLowerCase() === currentUser.email.toLowerCase()
            ? { ...u, fullName: trimmedName, phone: trimmedPhone }
            : u
        )
      );

      if (window.localStorage.getItem(STORAGE_KEYS.currentUser)) {
        window.localStorage.setItem(
          STORAGE_KEYS.currentUser,
          JSON.stringify(updatedUser)
        );
      } else {
        window.sessionStorage.setItem(
          STORAGE_KEYS.currentUser,
          JSON.stringify(updatedUser)
        );
      }

      showToast("Profil ma’lumotlari saqlandi", "success");
      return { ok: true };
    },
    [currentUser, showToast]
  );

  const logout = useCallback(() => {
    setCurrentUser(null);
    window.localStorage.removeItem(STORAGE_KEYS.currentUser);
    window.sessionStorage.removeItem(STORAGE_KEYS.currentUser);
    showToast("Hisobdan chiqdingiz", "info");
  }, [showToast]);

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    const result = products.filter((product) => {
      if (selectedCategory !== "Hammasi" && product.category !== selectedCategory) {
        return false;
      }
      if (onlyWishlist && !wishlistIds.includes(product.id)) {
        return false;
      }
      if (query) {
        const hay = `${product.title} ${product.category} ${product.specs}`.toLowerCase();
        if (!hay.includes(query)) return false;
      }
      return true;
    });

    if (sortBy === "price-asc") {
      return [...result].sort((a, b) => a.price - b.price);
    }
    if (sortBy === "price-desc") {
      return [...result].sort((a, b) => b.price - a.price);
    }
    return result;
  }, [onlyWishlist, products, searchQuery, selectedCategory, sortBy, wishlistIds]);

  const value = {
    products,
    filteredProducts,
    wishlistIds,
    wishlistCount: wishlistIds.length,
    toggleWishlist,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    onlyWishlist,
    setOnlyWishlist,
    sortBy,
    setSortBy,
    resetFilters,
    cartItems,
    cartTotalCount,
    addToCart,
    increaseQty,
    decreaseQty,
    removeFromCart,
    clearCart,
    appliedPromo,
    applyPromoCode,
    removePromoCode,
    deliveryMethod,
    setDeliveryMethod,
    itemsSubtotal,
    discountAmount,
    deliveryFee,
    finalTotal,
    orders,
    placeOrder,
    currentUser,
    login,
    register,
    updateProfile,
    logout,
    toast,
    showToast,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

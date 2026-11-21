import { useStore } from "../context/storeContext";
import { formatPrice } from "../utils/format";
import { CartIcon, DeviceIcon, HeartIcon, StarIcon } from "./Icons";

function ProductCard({ product }) {
  const { wishlistIds, toggleWishlist, cartItems, addToCart } = useStore();

  const isOut = product.stock === 0;
  const isLow = product.stock > 0 && product.stock <= 2;
  const isLiked = wishlistIds.includes(product.id);
  const cartEntry = cartItems.find((item) => item.id === product.id);
  const inCartQty = cartEntry ? cartEntry.quantity : 0;
  const reachedMax = !isOut && inCartQty >= product.stock;

  return (
    <article className="product-card">
      <div className={`product-visual ${isOut ? "product-visual--out" : ""}`}>
        <span
          className={`stock-badge ${
            isOut ? "stock-badge--out" : isLow ? "stock-badge--low" : ""
          }`}
        >
          {isOut ? "Tugagan" : `Omborda: ${product.stock} ta`}
        </span>

        <button
          type="button"
          className={`wishlist-btn ${isLiked ? "is-liked" : ""}`}
          aria-label={isLiked ? "Sevimlilardan olish" : "Sevimlilarga qo'shish"}
          aria-pressed={isLiked}
          onClick={() => toggleWishlist(product.id)}
        >
          <HeartIcon filled={isLiked} />
        </button>

        <DeviceIcon type={product.icon} />
      </div>

      <div className="product-body">
        <div className="product-meta">
          <span className="product-category">{product.category}</span>
          <span className="product-rating">
            <StarIcon />
            {product.rating}
          </span>
        </div>

        <h3 className="product-title">{product.title}</h3>
        <p className="product-specs">{product.specs}</p>

        <div className="product-footer">
          <span className="product-price">{formatPrice(product.price)}</span>

          <button
            type="button"
            className={`btn-add-cart ${isOut || reachedMax ? "is-disabled" : ""}`}
            disabled={isOut || reachedMax}
            onClick={() => addToCart(product.id)}
          >
            <CartIcon />
            <span>
              {isOut
                ? "Mavjud emas"
                : reachedMax
                  ? `Savatda (${inCartQty})`
                  : inCartQty > 0
                    ? `Savatda (${inCartQty}) +`
                    : "Savatga"}
            </span>
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;

import { useStore } from "../context/storeContext";
import { CATEGORIES } from "../data/initialData";
import { CloseIcon, HeartIcon } from "./Icons";

function FilterBar() {
  const {
    selectedCategory,
    setSelectedCategory,
    onlyWishlist,
    setOnlyWishlist,
    sortBy,
    setSortBy,
    searchQuery,
    setSearchQuery,
    filteredProducts,
  } = useStore();

  return (
    <section className="filter-bar" aria-label="Mahsulotlarni saralash">
      <div className="filter-categories">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            type="button"
            className={`filter-tab ${selectedCategory === category ? "active" : ""}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}

        {searchQuery.trim() && (
          <button
            type="button"
            className="search-chip"
            onClick={() => setSearchQuery("")}
          >
            <span>Qidiruv: &ldquo;{searchQuery.trim()}&rdquo;</span>
            <CloseIcon />
          </button>
        )}
      </div>

      <div className="filter-controls">
        <button
          type="button"
          className={`wishlist-toggle ${onlyWishlist ? "active" : ""}`}
          onClick={() => setOnlyWishlist((prev) => !prev)}
        >
          <HeartIcon filled={onlyWishlist} />
          <span>Faqat sevimlilar</span>
        </button>

        <select
          className="sort-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          aria-label="Mahsulotlarni narx bo'yicha saralash"
        >
          <option value="default">Saralash: Standart</option>
          <option value="price-asc">Narx: Arzondan qimmatga</option>
          <option value="price-desc">Narx: Qimmatdan arzonga</option>
        </select>

        <span className="results-count">{filteredProducts.length} ta mahsulot</span>
      </div>
    </section>
  );
}

export default FilterBar;

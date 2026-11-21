import { useStore } from "../context/storeContext";
import { SearchIcon } from "./Icons";

function EmptyState() {
  const { resetFilters } = useStore();

  return (
    <div className="empty-state">
      <div className="empty-state-icon">
        <SearchIcon size={26} />
      </div>
      <h3 className="empty-state-title">Mahsulot topilmadi</h3>
      <p className="empty-state-desc">
        Qidiruv so‘rovi yoki tanlangan filtrlar bo‘yicha mos mahsulot topilmadi.
        Boshqa so‘z bilan urinib ko‘ring.
      </p>
      <button type="button" className="empty-state-btn" onClick={resetFilters}>
        Qidiruvni tozalash
      </button>
    </div>
  );
}

export default EmptyState;

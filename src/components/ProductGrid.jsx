import { useStore } from "../context/storeContext";
import EmptyState from "./EmptyState";
import ProductCard from "./ProductCard";

function ProductGrid() {
  const { filteredProducts } = useStore();

  if (filteredProducts.length === 0) {
    return <EmptyState />;
  }

  return (
    <section className="product-grid" aria-label="Mahsulotlar katalogi">
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  );
}

export default ProductGrid;

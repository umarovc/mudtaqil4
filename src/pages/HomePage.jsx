import FilterBar from "../components/FilterBar";
import ProductGrid from "../components/ProductGrid";
import OrdersSection from "../components/OrdersSection";

function HomePage() {
  return (
    <>
      <FilterBar />
      <ProductGrid />
      <OrdersSection />
    </>
  );
}

export default HomePage;

import { useStore } from "../context/storeContext";
import OrderCard from "./OrderCard";

function OrdersSection() {
  const { orders } = useStore();

  return (
    <section
      id="orders-section"
      className="orders-section"
      aria-label="So'nggi buyurtmalar"
    >
      <div className="orders-header">
        <div>
          <h2 className="orders-title">So‘nggi buyurtmalar ({orders.length})</h2>
          <p className="orders-subtitle">
            Tasdiqlangan buyurtmalar ro‘yxati
          </p>
        </div>
      </div>

      <div className="orders-grid">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </section>
  );
}

export default OrdersSection;

import { RouterProvider } from "react-router-dom";
import { StoreProvider } from "./context/StoreProvider";
import { router } from "./routes";

function App() {
  return (
    <StoreProvider>
      <RouterProvider router={router} />
    </StoreProvider>
  );
}

export default App;

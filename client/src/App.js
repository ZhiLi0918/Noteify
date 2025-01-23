import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Success from "./pages/Success";
import { useSelector } from "react-redux";
const queryClient = new QueryClient()

function App() {
  const user = useSelector(state => state.user.currentUser)
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
          <Route path="/login" element={user ? <Navigate to="/" /> : <Login /> } />
          <Route path="/products/:category" element={<ProductList />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/success" element={<Success />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;

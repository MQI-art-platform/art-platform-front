import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { PersonalAccount } from "./pages/PersonalAccount";
import { ShoppingCart } from "./pages/ShoppingCart";
import { NoPageFound } from "./pages/NoPageFound";
import { Catalog } from "./pages/Catalog";
import { ApiClientProvider } from "./client/platform.api.context";
import { SessionProvider } from "./session/session.context";
import OrderSuccess from "./pages/SuccessOrder";
import PaintingPage from "./pages/PaintingPage";

export default function App() {
    const BASE_URL = "http://localhost:8080"
    return (
        <SessionProvider>
            <ApiClientProvider baseURL={BASE_URL}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Layout />}>
                            <Route path="personal-account" element={<PersonalAccount />} />
                            <Route path="shopping-cart" element={<ShoppingCart />} />
                            <Route path="catalog" element={<Catalog />} />
                            <Route path="success-order" element={<OrderSuccess />} />
                            <Route path="painting" element={<PaintingPage />} />
                            <Route path="*" element={<NoPageFound />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </ApiClientProvider>
        </SessionProvider>
    );
}
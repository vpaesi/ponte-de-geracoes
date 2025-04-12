import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";
import HomePage from "./pages/HomePage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import EditRegistrationPage from "./pages/EditRegistrationPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import RegisteredPage from "./pages/RegisteredPage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import { UserProvider } from "./utils/UserContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/edit-registration" element={<EditRegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registered" element={<RegisteredPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </UserProvider>
  </StrictMode>
);

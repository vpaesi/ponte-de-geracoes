import "./index.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import EditRegistrationPage from "./pages/EditRegistrationPage";
import LoginPage from "./pages/LoginPage";
import RegisteredPage from "./pages/RegisteredPage";
import ProfilePage from "./pages/ProfilePage";
import AboutPage from "./pages/AboutPage";
import { UserProvider } from "./utils/UserContext";
import { ThemeProvider } from "./utils/ThemeContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/edit-registration" element={<EditRegistrationPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registered" element={<RegisteredPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </ThemeProvider>
    </UserProvider>
  </StrictMode>
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { Provider } from "react-redux";
import App from "./App.tsx";
import "./index.css";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login.tsx";
import About from "./pages/About.tsx";
import Pricing from "./pages/Pricing.tsx";
import FAQs from "./pages/FAQs.tsx";
import MenusTemplates from "./pages/MenuTemplates.tsx";
import Template2 from "./components/menu-templates/TemplateTwo.tsx";
import Template1 from "./components/menu-templates/TemplateOne.tsx";
import store from "./redux/store.ts";
import Dashboard from "./components/Dashboard.tsx";
import Activate from "./components/Activation.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import RequestDesign from "./pages/RequestDesign.tsx";
import ParentComponent from "./components/userMenu-templates/userTemplates.tsx";
import UserTemplate1 from "./components/userMenu-templates/userTemplateOne.tsx";

// import Logout from './pages/Logout.tsx';

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about-us" element={<About />} />
            <Route path="/menus" element={<MenusTemplates />} />
            <Route path="menus/template1" element={<Template1 />} />
            <Route path="menus/template2" element={<Template2 />} />

            <Route path="/dashboard/*" element={<Dashboard />} />
            {/* <Route path="/dashboard/*" element={<MainDashboard />} /> */}
            {/* <Route path="/dashboard/menus" element={<Dashboard />} /> */}
            <Route path="/templates" element={<ParentComponent />} />
            <Route path="/templates/:templateId" element={<UserTemplate1 />} />

            <Route path="/pricing" element={<Pricing />} />
            <Route path="/faqs" element={<FAQs />} />
            <Route path="/request-design" element={<RequestDesign />} />

            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/users/activate/:token" element={<Activate />} />
            {/* <Route path="/logout" element={<Logout />} /> */}
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </StrictMode>
);

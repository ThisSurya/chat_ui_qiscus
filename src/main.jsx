import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import PageChat from "./chat/PageChat.jsx";
import PageSettings from "./settings/PageSettings.jsx";
import LayoutChat from "./LayoutChat.jsx";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Root element not found");
}

createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route element={<LayoutChat />}>
        <Route path="/" element={<PageChat />} />
        <Route path="settings" element={<PageSettings />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

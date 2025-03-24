import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ClickUIProvider, ThemeName } from "@clickhouse/click-ui";
import Home from "./Pages/Home";
import Cart from "./Pages/Cart";
import History from "./Pages/History";
import Credit from "./Pages/Credit";
import PurchaseDetail from "./Pages/History/PurchaseDetail";

function App() {
  const [theme, setTheme] = useState<ThemeName>("dark");
  return (
    <ClickUIProvider theme={theme} config={{ tooltip: { delayDuration: 0 } }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/history" element={<History />} />
          <Route path="/credit" element={<Credit />} />
          <Route path="/purchase/:purchaseId" element={<PurchaseDetail />} />
        </Routes>
      </BrowserRouter>
    </ClickUIProvider>
  );
}

export default App;

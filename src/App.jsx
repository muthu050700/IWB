import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Home from "./Component/Home";
import CartPage from "./Component/CartPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/DEV" element={<CartPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

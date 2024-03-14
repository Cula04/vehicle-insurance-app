import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { History } from "./pages/History";
import { Insurance } from "./pages/Insurance";

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="max-w-screen-xl mx-auto">
          <NavBar />
          <Routes>
            <Route path="/" element={<Insurance />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

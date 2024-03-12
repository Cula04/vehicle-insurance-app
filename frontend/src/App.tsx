import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";
import { NavBar } from "./components/NavBar";
import { SideBar } from "./components/SideBar";
import { History } from "./pages/History";
import { Insurance } from "./pages/Insurance";

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Header />
        <div className="flex">
          {/* Main Content */}
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Insurance />} />
              <Route path="/history" element={<History />} />
            </Routes>
          </div>
          {/* SideBar */}
          <div className="w-64">
            <SideBar />
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

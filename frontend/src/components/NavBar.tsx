import { Link } from "react-router-dom";

export const NavBar = () => {
  return (
    <nav className="bg-green-900 text-white p-4">
      <div className="max-w-7xl mx-auto flex justify-center">
        <div className="flex items-center justify-center space-x-24">
          <Link to="/" className="text-xl font-semibold">
            Insurance
          </Link>
          <Link to="/history" className="text-xl font-semibold">
            History
          </Link>
        </div>
      </div>
    </nav>
  );
};

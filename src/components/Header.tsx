import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from "../assets/quiz-logo.png";

const Header: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-md px-6 py-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3">
          <img src={Logo} alt="QuizApp Logo" className="w-10 h-10" />
          <span className="text-2xl font-bold text-gray-800">QuizApp</span>
        </Link>

        {/* Menu for Desktop */}
        <nav className="hidden md:flex space-x-6 font-medium text-gray-700">
          <Link to="/" className="hover:text-blue-500 transition">Home</Link>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-700" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col space-y-4 mt-4 bg-gray-100 p-4 rounded-lg shadow-md">
          <Link to="/" className="hover:text-blue-500 transition" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/user" className="hover:text-blue-500 transition" onClick={() => setIsOpen(false)}>User</Link>
          <Link to="/login" className="hover:text-blue-500 transition" onClick={() => setIsOpen(false)}>Login</Link>
          <Link to="/register" className="hover:text-blue-500 transition" onClick={() => setIsOpen(false)}>Register</Link>
        </div>
      )}
    </header>
  );
};

export default Header;

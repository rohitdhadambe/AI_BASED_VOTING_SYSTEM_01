import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-green-600 via-green-500 to-green-400 shadow-lg rounded-b-2xl py-4 px-2">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <h1 className="text-2xl font-extrabold text-white drop-shadow-lg tracking-wide mb-2 md:mb-0">
          <span className="text-green-100">AI Based</span> Voting System
        </h1>
        <div className="flex space-x-2 md:space-x-6">
          <Link
            to="/"
            className="px-4 py-2 rounded-lg font-semibold text-white hover:bg-green-700 hover:text-green-100 transition-all duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200 active:scale-95"
          >
            Home
          </Link>
          <Link
            to="/upload"
            className="px-4 py-2 rounded-lg font-semibold text-white hover:bg-green-700 hover:text-green-100 transition-all duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200 active:scale-95"
          >
            Upload
          </Link>
          <Link
            to="/vote"
            className="px-4 py-2 rounded-lg font-semibold text-white hover:bg-green-700 hover:text-green-100 transition-all duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200 active:scale-95"
          >
            Vote
          </Link>
        </div>
      </div>
    </nav>
  );
}

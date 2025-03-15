import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import backgroundImage from "../img/homevoteimg.jpg";

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div 
        className="relative w-full h-[80vh] flex items-center justify-center bg-cover bg-center text-white"
        style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: "contain" }}
      >
        <div className="text-center max-w-2xl px-6 bg-black bg-opacity-80 p-10 rounded-lg">
          <h1 className="text-5xl font-extrabold drop-shadow-lg">AI-Based Voting System</h1>
          <p className="text-lg text-gray-200 mt-4">Secure, reliable, and efficient voting experience powered by AI technology.</p>
          <button 
            onClick={() => navigate("/upload")} 
            className="mt-6 bg-white text-green-600 px-6 py-3 font-bold rounded-lg shadow-md hover:bg-gray-200 transition duration-300"
          >
          -----GO FOR VOTE-----
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}

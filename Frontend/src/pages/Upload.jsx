import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import backgroundImage from "../img/homevoteimg.jpg";


const Upload = () => {
  const [file, setFile] = useState(null); // To store the selected file
  const [fullName, setFullName] = useState(""); // Full Name
  const [phoneNumber, setPhoneNumber] = useState(""); // Phone Number
  const [aadhaarNumber, setAadhaarNumber] = useState(""); // Aadhaar Number
  const [message, setMessage] = useState(""); // To display messages to the user
  const [isLoading, setIsLoading] = useState(false); // To show a loading state
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Set the selected file
    setMessage(""); // Clear any previous messages
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !fullName || !phoneNumber || !aadhaarNumber) {
      setMessage("Please fill all fields and upload a file.");
      return;
    }

    if (aadhaarNumber.length !== 12 || isNaN(aadhaarNumber)) {
      setMessage("Please enter a valid 12-digit Aadhaar number.");
      return;
    }

    if (phoneNumber.length !== 10 || isNaN(phoneNumber)) {
      setMessage("Please enter a valid 10-digit phone number.");
      return;
    }

    const formData = new FormData(); // Create a form data object
    formData.append("file", file); // Append the selected file
    formData.append("fullName", fullName);
    formData.append("phoneNumber", phoneNumber);
    formData.append("aadhaarNumber", aadhaarNumber);

    setIsLoading(true); // Start loading spinner
    try {
      const response = await fetch("http://127.0.0.1:5000/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json(); // Parse the response
      if (response.ok) {
        setMessage(result.message); // Display success message
        if (result.redirect) {
          navigate("/upload/vote"); // Redirect to the vote page if backend response indicates so
        }
      } else {
        setMessage(`Error: ${result.message}`); // Display error message
      }
    } catch (error) {
      setMessage("An error occurred while connecting to the backend.");
    } finally {
      setIsLoading(false); // Stop loading spinner
    }
  };

  return (
    <div >
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4"  
      style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: "contain" }}>
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
          <h1 className="text-xl font-bold mb-4 text-gray-700">Upload your Information :</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="border border-gray-300 p-2 rounded-lg w-full"
              required
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="border border-gray-300 p-2 rounded-lg w-full"
              required
            />
            <input
              type="text"
              placeholder="Aadhaar Number"
              value={aadhaarNumber}
              onChange={(e) => setAadhaarNumber(e.target.value)}
              className="border border-gray-300 p-2 rounded-lg w-full"
              required
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="border border-gray-300 p-2 rounded-lg w-full"
            />
            <button
              type="submit"
              className={`w-full p-2 rounded-lg text-white ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600"
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Uploading..." : "Upload"}
            </button>
          </form>
          {message && (
            <div
              className={`mt-4 p-2 rounded-lg text-center ${
                message.includes("Error")
                  ? "bg-red-100 text-red-600"
                  : "bg-green-100 text-green-600"
              }`}
            >
              {message}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Upload;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import backgroundImage from "../img/homevoteimg.jpg";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [enteredAadhar, setEnteredAadhar] = useState("");
  const [enteredName, setEnteredName] = useState(""); 
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [extractedAadhar, setExtractedAadhar] = useState("");  // To store Extracted Aadhaar
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !enteredAadhar || !phoneNumber) {
      setMessage("Please fill all fields and upload a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("entered_aadhar", enteredAadhar);
    formData.append("phone_number", phoneNumber);

    setIsLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:5000/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        setExtractedAadhar(result.extracted_aadhar);  
        setMessage(result.message);
        if (result.redirect) {
          navigate("/upload/vote");
        }
      } else {
        setMessage(`Error: ${result.message}`);
      }
    } catch (error) {
      setMessage("An error occurred while connecting to the backend.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div
  className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4"
  style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: "contain" }}
>
  <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md border-2 border-gray-300 transition-all duration-300 hover:border-4 hover:border-green-500">
    <h1 className="text-xl font-bold mb-4 text-gray-700">Voting Form : </h1>
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
    <input
        type="text"
        placeholder="Enter Your Name"
        value={enteredName}
        onChange={(e) => setEnteredName(e.target.value)}
        className="border border-gray-300 p-2 rounded-lg w-full"
      />
      <input
        type="text"
        placeholder="Enter valid Aadhaar Number"
        value={enteredAadhar}
        onChange={(e) => setEnteredAadhar(e.target.value)}
        className="border border-gray-300 p-2 rounded-lg w-full"
      />
      <input
        type="text"
        placeholder="Enter Phone Number Registerd to Addhar"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        className="border border-gray-300 p-2 rounded-lg w-full"
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
          isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
        }`}
        disabled={isLoading}
      >
        {isLoading ? "Uploading..." : "Upload"}
      </button>
    </form>
    {extractedAadhar && (
      <p className="mt-4 p-2 rounded-lg bg-yellow-100 text-yellow-700 text-center">
        Extracted Aadhaar: {extractedAadhar}
      </p>
    )}
    {message && (
      <div
        className={`mt-4 p-2 rounded-lg text-center ${
          message.includes("Error") ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
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

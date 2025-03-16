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
  const [extractedAadhar, setExtractedAadhar] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.size > 2 * 1024 * 1024) {
      setMessage("File size should not exceed 2MB.");
      setFile(null);
      return;
    }
    setFile(selectedFile);
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !enteredAadhar || !phoneNumber || !enteredName) {
      setMessage("Please fill all fields and upload a file.");
      return;
    }

    if (!/^\d{12}$/.test(enteredAadhar)) {
      setMessage("Invalid Aadhaar number. It should be exactly 12 digits.");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(phoneNumber)) {
      setMessage("Invalid phone number. Enter a valid 10-digit number.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("entered_aadhar", enteredAadhar);
    formData.append("phone_number", phoneNumber);
    formData.append("name", enteredName);

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

  const clearForm = () => {
    setFile(null);
    setEnteredAadhar("");
    setEnteredName("");
    setPhoneNumber("");
    setMessage("");
    setExtractedAadhar("");
  };

  return (
    <div>
      <Navbar />
      <div
        className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4"
        style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: "cover" }}
      >
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md border-2 border-gray-300 transition-all duration-300 hover:border-4 hover:border-green-500">
          <h1 className="text-xl font-bold mb-4 text-gray-700">Voting Form :</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Enter Your Name"
              value={enteredName}
              onChange={(e) => setEnteredName(e.target.value)}
              className="border border-gray-300 p-2 rounded-lg w-full"
              required
            />
            <input
              type="text"
              placeholder="Enter valid Aadhaar Number"
              value={enteredAadhar}
              onChange={(e) => setEnteredAadhar(e.target.value)}
              className="border border-gray-300 p-2 rounded-lg w-full"
              required
            />
            <input
              type="text"
              placeholder="Enter Phone Number Registered to Aadhaar"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="border border-gray-300 p-2 rounded-lg w-full"
              required
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="border border-gray-300 p-2 rounded-lg w-full"
              required
            />
            {file && <p className="text-sm text-gray-500 mt-1">Selected File: {file.name}</p>}
            <button
              type="submit"
              className={`w-full p-2 rounded-lg text-white ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"}`}
              disabled={isLoading}
            >
              {isLoading ? "Uploading..." : "Upload"}
            </button>
            <button
              type="button"
              className="mt-2 w-full p-2 rounded-lg bg-gray-400 hover:bg-gray-500 text-white"
              onClick={clearForm}
            >
              Clear Form
            </button>
          </form>
          {extractedAadhar && extractedAadhar !== enteredAadhar && (
            <p className="mt-4 p-2 rounded-lg bg-yellow-100 text-yellow-700 text-center">
              Extracted Aadhaar: {extractedAadhar}
            </p>
          )}
          {message && (
            <div
              className={`mt-4 p-2 rounded-lg text-center ${message.includes("Error") ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}`}
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

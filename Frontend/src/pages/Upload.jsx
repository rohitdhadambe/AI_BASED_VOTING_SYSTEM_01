import { useState } from "react";
 import { useNavigate } from "react-router-dom"; // Import useNavigate
 
 const Upload = () => {
   const [file, setFile] = useState(null); // To store the selected file
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
 
     if (!file) {
       setMessage("Please upload a file.");
       return;
     }
 
     const formData = new FormData(); // Create a form data object
     formData.append("file", file); // Append the selected file
 
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
     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
       <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
         <h1 className="text-xl font-bold mb-4 text-gray-700">Upload Aadhar Card</h1>
         <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
                 : "bg-blue-500 hover:bg-blue-600"
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
   );
 };
 
 export default Upload;
import { useState } from "react";
 import axios from "axios";
 import { useNavigate } from "react-router-dom";
 
 const UploadAadhar = () => {
   const [file, setFile] = useState(null);
   const [message, setMessage] = useState("");
   const navigate = useNavigate();
 
   // Handle file selection
   const handleFileChange = (e) => {
     setFile(e.target.files[0]);
   };
 
   // Handle form submission
   const handleSubmit = async (e) => {
     e.preventDefault();
 
     // Check if a file has been selected
     if (!file) {
       setMessage("Please upload a file.");
       return;
     }
 
     const formData = new FormData();
     formData.append("file", file);  // Append the selected file to FormData
 
     try {
       // Make the API call to upload the file
       const response = await axios.post("http://127.0.0.1:5000/upload", formData, {
         headers: {
           "Content-Type": "multipart/form-data",
         },
       });
 
       // Log the response data for debugging purposes
       console.log("Response received:", response.data);  // Log the response
 
       // Display the message returned from the backend
       setMessage(response.data.message);
 
       // Check if the backend indicates that the user should be redirected
       if (response.data.redirect === true) {
         console.log("Redirecting to vote page...");  // Log for debugging
         navigate("/upload/vote");  // Navigate to the vote page
       }
     } catch (error) {
       console.error("Error during Axios request:", error);
 
       // Handle errors in the API request
       if (error.response && error.response.data) {
         setMessage(error.response.data.message);  // Show the error message from the backend
       } else {
         setMessage("An error occurred while processing the request.");
       }
     }
   };
 
   return (
     <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center justify-center">
       <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-96">
         <h2 className="text-2xl font-semibold mb-4">Upload Aadhar</h2>
         <input
           type="file"
           accept="image/*"
           onChange={handleFileChange}  // Handle file change
           className="mb-4 p-2 border rounded w-full"
         />
         <button
           type="submit"
           className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
         >
           Submit
         </button>
       </form>
       {message && <p className="mt-4 text-red-600">{message}</p>}  {/* Display the message */}
     </div>
   );
 };
 
 export default UploadAadhar;
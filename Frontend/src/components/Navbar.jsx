import { Link } from "react-router-dom";
 
 export default function Navbar() {
   return (
     <nav className="bg-blue-500 text-white p-4">
       <div className="container mx-auto flex justify-between">
         <h1 className="text-lg font-bold">AI Voting System</h1>
         <div>
           <Link to="/" className="mx-2">Home</Link>
           <Link to="/upload" className="mx-2">Upload</Link>
           <Link to="/vote" className="mx-2">Vote</Link>
         </div>
       </div>
     </nav>
   );
 }
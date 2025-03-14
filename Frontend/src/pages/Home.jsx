import Navbar from "../components/Navbar";
 
 export default function Home() {
   return (
     <>
       <Navbar />
       <div className="text-center mt-10">
         <h2 className="text-2xl font-bold">Welcome to AI Voting System</h2>
         <p className="text-gray-600 mt-2">Secure voting made easy.</p>
       </div>
     </>
   );
 }
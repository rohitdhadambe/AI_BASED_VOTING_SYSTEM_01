import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
 import Home from "./pages/Home";
 import Upload from "./pages/Upload";
 
 import VotePage from './components/VotePage'
 
 function App() {
   return (
     <Router>
       <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/upload" element={<Upload />} />
         <Route path="/upload/vote" element={<VotePage />} />
       </Routes>
     </Router>
   );
 }
 
 export default App;
export default function Footer() {
    return (
      <footer className="bg-green-900 text-gray-300 py-12 mt-16">
        <div className="container mx-auto max-w-7xl px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div>
            <h2 className="text-xl font-extrabold text-white">AI Based Voting System</h2>
            <p className="mt-3 text-gray-400">A next-gen voting platform ensuring transparency, security, and ease of use with AI-powered technology.</p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-white transition duration-300"><i className="fab fa-facebook text-xl"></i></a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300"><i className="fab fa-twitter text-xl"></i></a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300"><i className="fab fa-linkedin text-xl"></i></a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300"><i className="fab fa-instagram text-xl"></i></a>
            </div>
          </div>
  
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="mt-3 space-y-2">
              <li className="hover:text-white transition duration-300 cursor-pointer">Home</li>
              <li className="hover:text-white transition duration-300 cursor-pointer">Features</li>
              <li className="hover:text-white transition duration-300 cursor-pointer">About Us</li>
              <li className="hover:text-white transition duration-300 cursor-pointer">Contact</li>
              <li className="hover:text-white transition duration-300 cursor-pointer">FAQ</li>
            </ul>
          </div>
  
          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold text-white">Resources</h3>
            <ul className="mt-3 space-y-2">
              <li className="hover:text-white transition duration-300 cursor-pointer">User Guide</li>
              <li className="hover:text-white transition duration-300 cursor-pointer">Security Measures</li>
              <li className="hover:text-white transition duration-300 cursor-pointer">Terms & Conditions</li>
              <li className="hover:text-white transition duration-300 cursor-pointer">Privacy Policy</li>
            </ul>
          </div>
  
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white">Contact Us</h3>
            <p className="mt-3 text-gray-400">Email: <a href="mailto:support@aivoting.com" className="hover:text-white">support@aivoting.com</a></p>
            <p className="text-gray-400">Phone: +91 98765 43210</p>
            <p className="text-gray-400">Address: Pune, India</p>
          </div>
        </div>
        
        <div className="text-center text-white-500 mt-8 border-t border-gray-700 pt-4">
          &copy; 2025 AI Based Voting System. All Rights Reserved.
        </div>
      </footer>
    );
  }
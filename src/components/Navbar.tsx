 
import {  FaCog, FaBell } from 'react-icons/fa';
import userImage from '../assets/user1.jpg'; // Asegúrate de tener esta imagen en tu proyecto

function Navbar() {
  return (
    <div className="flex items-center justify-end h-full bg-bluegray p-6  space-x-6">
      <div className="flex items-center gap-4">
 
        {/* Notifications Icon */}
        <button className="relative text-neutral hover:text-gray-800 transition-colors">
          <FaBell className="text-xl" />
          <span className="absolute top-0 right-0 block h-2 w-2 bg-red-600 rounded-full"></span>
        </button>
      </div>

      {/* Settings Icon */}
      <button className="text-neutral hover:text-gray-800 transition-colors">
        <FaCog className="text-xl" />
      </button>

      {/* User Profile Image */}
      <div className="flex items-center">
        <img src={userImage} alt="User" className="w-10 h-10 rounded-full border-2 border-gray-300" />
      </div>
    </div>
  );
}

export default Navbar;

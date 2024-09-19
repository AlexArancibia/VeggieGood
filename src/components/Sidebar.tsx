import { FaHome, FaUser } from "react-icons/fa"
import logo from "../assets/veggielogo.png"
import RouteItem from "./RouteItem"
import { IoMdSettings } from "react-icons/io"
import { MdFactory } from "react-icons/md"
import { Link } from "react-router-dom"

function Sidebar() {
  return (
    <div className='h-full flex flex-col overflow-y-auto bg-bluegray'>
      
      <div className='p-6 pb-2 z-66'>
      <Link to="/dashboard" >
        <div className="flex flex-row w-full gap-2 items-center pb-4 border-b">
          
            <img src={logo} alt='logo' className="w-12"/>
            
            <h3 className="text-grayblack">Veggie Good</h3>
          
        </div>
        </Link>
      </div>
      
      <div className='flex flex-col w-full p-6 gap-4'>
      <RouteItem icon={FaHome} label="Home" href="/dashboard" />
      <RouteItem icon={MdFactory} label="Production Module" href="/dashboard/production" />
      <RouteItem icon={FaUser} label="Profile" href="/dashboard/profile" />
      <RouteItem icon={IoMdSettings} label="Settings" href="/dashboard/settings" />
      </div>
    </div>
  )
}

export default Sidebar
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

function Layout() {
  return (
    <div className="flex h-screen  bg-bluegray" >
    <div className='h-[80px] md:pl-72   fixed inset-y-0 w-full z-10'>
      <Navbar />
          </div>
        <div className='hidden md:flex h-full w-72 flex-col fixed z-15 inset-y-0'>
          <Sidebar />
        </div>
        <main className='md:pl-72 pt-[80px] flex-1 overflow-auto'> 
          <Outlet />    
 
        </main>  
      </div>
  )
}

export default Layout


 
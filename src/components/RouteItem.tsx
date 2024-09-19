import { IconType } from "react-icons";
import { Link, useLocation  } from "react-router-dom";

interface RouteItemProps {
  icon: IconType;
  label: string;
  href: string;
}

function RouteItem({ icon: Icon, label, href }: RouteItemProps) {
  
  const location = useLocation();
  const currentPath = location.pathname;

  // Verifica si la ruta actual es exactamente igual a href
  // o si es una subruta de href, y maneja el caso especial de "/dashboard"
  const isActive = (currentPath === href && href !== "/dashboard") || 
    (currentPath.startsWith(`${href}/`) && href !== "/dashboard") || 
    (href === "/dashboard" && currentPath === "/dashboard");

   return (
    <Link 
      to={href} 
      className={`flex flex-row items-center p-2 rounded-lg w-full transition-colors duration-300 ${isActive ? 'bg-white shadow-md' : 'bg-transparent'}`}
    >
      <div 
        className={`flex items-center gap-2 w-full transition-colors duration-300 ${isActive ? 'text-black' : 'text-gray-600 hover:text-gray-800'}`}
      >
        <div 
          className={`flex items-center justify-center w-10 h-10 rounded-xl transition-colors duration-300 ${isActive ? 'bg-blue-600 text-white' : 'bg-transparent text-blue-600'}`}
        >
          <Icon className="text-xl" />
        </div>
        <h4 className={`text-base font-medium ml-2 transition-colors duration-300 ${isActive ? ' text-grayblack' : '  text-neutral'}`}>{label}</h4>
      </div>
    </Link>
  );
}

export default RouteItem;

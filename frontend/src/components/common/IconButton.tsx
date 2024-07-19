import React from "react";

interface IconButtonProps {
    icon: React.ReactNode;
    handleFunction?: () => void;
    isActive?: boolean;
}
const IconButton = ({
    icon, 
    handleFunction,
    isActive
}: IconButtonProps) => {
    return ( 
        <button className={`border-none text-black text-3xl rounded-full hover:bg-gray-300 p-2 ${isActive? "bg-gray-300": ""}`} onClick={handleFunction}>
            {icon}
        </button>   
     );
}
 
export default IconButton;
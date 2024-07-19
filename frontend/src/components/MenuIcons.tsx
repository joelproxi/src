import IconButton from "./common/IconButton";
import { MdChat } from "react-icons/md"
import { HiDotsVertical } from "react-icons/hi";

const MenuIcons = () => {
    return ( 
        <div className="flex flex-col justify-between h-full items-center py-3">
            <div className="flex flex-col">
                <IconButton 
                    icon={ <MdChat />} isActive={true}
                />
                <IconButton 
                    icon={ <MdChat />}
                />
            </div>
            <div className="flex flex-col items-center">
                <IconButton icon={<HiDotsVertical/>} />
                <img src="src/assets/pp.jpg" alt="" className="h-7 w-7 mt-3 rounded-full items-center"/>
            </div>
        </div>
     );
}
 
export default MenuIcons;
import { useSelector } from 'react-redux'
import { IMessage } from "../models/MessageModel";
import { authSelectorState } from '../store/selectors/AuthSelector';


export function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }

export default function Message({ message }: {message: IMessage }){
    const { user } = useSelector(authSelectorState);
    console.log(message)
    const formatTimestamp = (timestamp: string) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString().slice(0, 4) + date.toLocaleTimeString().slice(7, 10);
    }

    return(
    <>
        <li className={`mt-1 mb-1 d-flex ${user!.telephone === message.receiver?.telephone ? "justify-content-start" : "justify-content-end"}`}>
            <div className={`position-relative max-w-xl rounded-lg px-2 py-1 text-gray-700 shadow ${user!.telephone === message.receiver?.telephone ? "" : "bg-secondary bg-gradient"}`}>
                <div className="d-flex align-items-end">
                <span className="d-block text-black">{message.text_content}</span>
                <span className="ms-2" style={{ fontSize: "0.6rem", lineHeight: "1rem" }}>
                    {formatTimestamp(message.created_at)}
                </span>
                </div>
            </div>
        </li>
        {/* <hr /> */}
    </>)
 }
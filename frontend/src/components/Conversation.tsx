
import { IConversation } from '../models/ConversationModel'

export default function Conversation({ conversation }: {conversation: IConversation }){
    if(conversation && !conversation?.last_message){
        return   <h6> {conversation?.other_user.full_name} </h6> 
    }
    return (
        <>
            <h6> {conversation?.other_user.full_name} </h6> 
            { <span>{conversation?.last_message.text_content ?( conversation.last_message?.text_content.length > 20 ? conversation.last_message.text_content.slice(0, 20) + " ..." : conversation.last_message.text_content): ""}</span>} 
        </>
    )
}

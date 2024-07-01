
import { IConversation } from '../models/ConversationModel'

export default function Conversation({ conversation }: {conversation: IConversation }){
    return (
        <>
            <h6> {conversation?.other_user.full_name} </h6> 
            { <span>{conversation.last_message.text_content}</span>} 
        </>
    )
}

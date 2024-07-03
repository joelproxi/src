
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import useWebSocket from 'react-use-websocket'
import { useSelector } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useHotkeys } from "react-hotkeys-hook";

import NavBar from '../components/NavBar';
import { authSelectorState } from '../store/selectors/AuthSelector';
import  {BASE_URL_WS } from '../services/Api';
import Conversation from '../components/Conversation';
import AuthService from '../services/AuthService';
import { IConversation } from '../models/ConversationModel';
import Message from '../components/Message';
import ChatLoader from '../components/ChatLoader';
import { IMessage } from '../models/MessageModel';
import { Navigate } from 'react-router-dom';


function ChatPage() {
  const initialState = {message: '' };
  const { user } = useSelector(authSelectorState);
  const [state, setState] = useState(initialState);
  const [messageHistory, setMessageHistory] = useState<IMessage[]>([]);
  const [conversationName, setConversationName] = useState<string>('');
  const [conversations, setConversations] = useState<IConversation[]>([]);
  const [page, setPage] = useState<number>(2);
  const [hasMoreMessage, setHasMoreMessage] = useState<boolean>(false);
  const [meTyping, setMeTyping] = useState(false);
  const timeout = useRef<any>();
  const [otherTyping, setOtherTyping] = useState(false);
  const [onlines, setOnlines] = useState<string[]>([])

 

  const {sendJsonMessage} = useWebSocket( user ? `${BASE_URL_WS}/${conversationName}`: null, {
    queryParams: {token: user ? user.token: ""},
    onOpen: () => {
      console.log("Opened");
    },

    onMessage: (event) => {
      const data = JSON.parse(event.data)
      console.log(data);
      switch (data.type) {
        case 'last_50_messages_from_server':
          console.log(data.message);
          setMessageHistory(data?.messages)
          setHasMoreMessage(data?.has_more)
          break;

        case 'send_message_to_user':
          setMessageHistory((prev: any) => prev.concat(data.message));
          break;
        
        case 'user_join':
          console.log(onlines);
          
          // if(participients.includes(data.user)){
          //   setParticipients([...participients, data.user])
          // }else{
          //   setParticipients(participients);
          // }
          setOnlines(
            (pts: string[]) => {
              if (!pts.includes(data.user)) {
                return [...pts, data.user];
              }
              return pts;
            }
            
            );
          break;
        
        case 'user_leave':
          setOnlines((ptcps: string[]) => {
            const newPtcps = ptcps.filter((item: string) => item !== data.user);
            return newPtcps;
          })
          break;

        case 'online_user_list':
          // setParticipients(data.user)
          break;

        case 'typing':
          updateTyping(data);
          break;

        default:
          console.error("error");
          break;
      }
      
    },

    onClose: (error) => {
      console.error(error);
      
    }
  })


  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setState({
      ...state,
      [name]: value
    });
    onTyping()
    console.log({ [name]: value});
  }

  const handleOnSubmit = (event: { preventDefault: () => void; })  => {
    if (Message.length === 0) return ;
    sendJsonMessage({
      "type": "send_message_to_user",
      "message": state.message
    });
    event.preventDefault();
    setState(initialState);
    clearTimeout(timeout.current);
    timeOut();
  }

  const selectUser = (conversation: IConversation) => {
    setConversationName(createConversationName(conversation.other_user.telephone));
  }

  async function fetchMessages() {
    const resp = await AuthService.getMessages(conversationName, page);
    if(resp.status === 200){
      const data: {
        count: number,
        next: string| null,
        previous: string | null ,
        results: IMessage[]
      }  = resp.data;
      setMessageHistory((prev:IMessage[]) => prev.concat(data.results));
      setPage(page + 1);
      setHasMoreMessage(data.next !== null)
    }
  }

  const inputReference: any = useHotkeys(
    "enter",
    () => {
      handleOnSubmit;
    },
    {
      enableOnFormTags: ["INPUT"]
    }
  );

  function timeOut() {
    setMeTyping(false);
    sendJsonMessage({
      type: "typing",
      "typing": false
    });
  }

  function onTyping(){
    if(meTyping === false){
      setMeTyping(true);
      sendJsonMessage({
        type: "typing",
        "typing": true
      });
      timeout.current = setTimeout(timeOut, 5000);
    }else{
      clearTimeout(timeout.current);
      timeout.current = setTimeout(timeOut, 5000)
    }
  }

  function updateTyping(event: { user: string; typing: boolean }) {
    console.log("&&&&&&&&&&&&&&&", event, '@@@@@', user)
    if (event.user !== user!.telephone) {
      setOtherTyping(event.typing);
    }
  }


  useEffect(() => {
    (inputReference.current as HTMLElement).focus();
  }, [inputReference]);


  useEffect(() => {
    const fetchConversations = async () => {
      const resp = await AuthService.getConversations();
      if(resp.status === 200){
        setConversations(resp.data);
      }
    }
    fetchConversations();
    
  }, [user, conversationName])
  
  function createConversationName(telephone: string) {
    const namesAlph = [user?.telephone, telephone].sort();
    return `${namesAlph[0]}__${namesAlph[1]}`;
  }

  if(!user){
    return <Navigate to={'/login'} />
  }

  return (
    <>
      <div className="row d-flex">
        {/* <div className="">
          <h4>Online users list</h4>
            {
              users?.filter((u: IUserModel) => u.telephone !== user?.telephone)
              .map((u: any, idx: number) => {
                return <li key={idx}  onClick={( )=> selectUser(u)}> {u.email}
                </li>
              })
            }
        </div> */}
        {/* <hr /> */}
        <div className='col-4'>
        <NavBar />
          <h4>Conversation list</h4>
          {
            conversations?.map( 
              (item: IConversation, idx: number 
              )=> (<div onClick={() => selectUser(item)} key={idx}>
                  <div className='row d-flex'>
                    <span className="text-sm">
                      is currently
                      {onlines?.includes(item.other_user.telephone)
                        ? " online"
                        : " offline"}
                    </span>
                    <Conversation  conversation={item} />  
                    {otherTyping && <span> typing... </span>}
                    <hr />
                </div>
              </div>))
          }
        </div>

        <div data-bs-spy="scroll" data-bs-target="#navbar-example2" data-bs-offset="0" className="scrollspy-example col-7" tabIndex="0">
           <InfiniteScroll
              dataLength={messageHistory.length}
              next={fetchMessages}
              inverse={true}
              loader={<ChatLoader />}
              hasMore={hasMoreMessage}
              scrollableTarget="scrollableDiv"
           >
             {messageHistory?.map((message: IMessage, idx: number) => (
                <Message key={idx} message={message} />
            ))}
           </InfiniteScroll>

        </div>
      </div>
      <div className='footer'>
        
      </div>
      <footer className="footer fixed-bottom">
        <div className="container text-center">
          <form onSubmit={handleOnSubmit}>
            <div className='row d-flex'>
              <div className='col-2'></div>
                <input 
                  type="text" 
                  onChange={handleOnChange} 
                  name='message' 
                  value={state.message} 
                  className='col-8'
                  ref={inputReference}
                  />
               {state.message.trim() ? 
                (<button type='submit'  className='btn btn-primary col-1'>Send</button>) 
               : (<button type='submit' disabled className='btn btn-primary col-1 disabled'>Send</button>)} 
            </div>
          </form>
        </div>
    </footer>

    </>
  )
}

export default ChatPage

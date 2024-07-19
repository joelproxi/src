interface ChatProps {
  avatarUrl: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  unReadCount?: number;
}

const Chat = ({
  avatarUrl,
  name,
  lastMessage,
  timestamp,
  unReadCount,
}: ChatProps) => {
  return (
    <div>
      <img src={avatarUrl} alt="pp" />
      <div>
        <div className="flex">
          <h2>{name}</h2>
          <span>{timestamp}</span>
        </div>
        <div className="">
          <p>{lastMessage}</p>
          <span>{unReadCount}</span>
        </div>
        y
      </div>
    </div>
  );
};

export default Chat;

import { useEffect, useState } from "react";
import { io } from "socket.io-client";
// const socket = new io("ws://localhost:8080");


function WebChat() {
  

    const [socket, setSocket]= useState(null);

  
  console.log("Rerendered");

  const [serverMessages, setServerMessages] = useState([]);
  const [userMessage, setUserMessage] = useState("");

  const sendMessageHandler = (e) => {
    e.preventDefault();
    console.log("Sending Message");
    socket.emit("message", userMessage);
  };


  useEffect(()=> {
    const connection = new io('ws://localhost:8080');
    setSocket(connection);
    
  }, [])


  useEffect(()=> {
    
    socket?.on("message", (text) => {
        console.log("Reciving message");
        setServerMessages((prev) => [...prev, text]);
      });
  
  }, [socket]);
  
  return (
    <>
      <ul>
        {serverMessages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>

      <form onSubmit={sendMessageHandler}>
        <input
          type="text"
          value={userMessage}
          onInput={(event) => setUserMessage(event.target.value)}
        />
        <button type="submit">Send Message</button>
      </form>
    </>
  );
}

export default WebChat;

import React, { useRef, useEffect } from "react";
import { useSockets } from "../context/socket.context";
import EVENTS from "../config/events";
import styles from "../styles/Messages.module.css";

function MessagesContainer(): JSX.Element {
  const { socket, username, rooms, roomId, messages, setMessages } =
    useSockets();

  const newMessageRef = useRef(null);
  const messagesEndRef = useRef(null);

  const handleSendMessage = (e) => {
    e.preventDefault();
    var message = newMessageRef.current.value;

    if (!String(message).trim()) {
      return;
    }

    socket.emit(EVENTS.CLIENT.SEND_ROOM_MESSAGE, { roomId, message, username });

    const date = new Date();

    setMessages([
      ...messages,
      {
        username: "You",
        message,
        time: `${date.getHours()}:${date.getMinutes()}`,
      },
    ]);

    newMessageRef.current.value = "";
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.messageList}>
        {messages.map(({ message, username, time }, index) => {
          return (
            <div key={index} className={styles.message}>
              <div key={index} className={styles.messageInner}>
                <span className={styles.messageSender}>
                  {username} - {time}
                </span>
                <span className={styles.messageBody}>{message}</span>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <div className={styles.messageBox}>
        <form onSubmit={handleSendMessage}>
            <input type="input" placeholder="Messages" ref={newMessageRef} />
            <button onClick={handleSendMessage}>SEND</button>
        </form>
      </div>
    </div>
  );
}

export default MessagesContainer;

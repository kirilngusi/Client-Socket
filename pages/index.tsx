import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { useSockets } from "../context/socket.context";
import { useEffect, useRef } from "react";

import RoomsContainer from "../containers/Rooms";
import MessagesContainer from "../containers/Messages";

const Home: NextPage = () => {
  const {username, setUsername } = useSockets();

  const usernameRef = useRef(null);

  function handleUsername() {
    const value = usernameRef.current.value;
    if (!value) {
      return;
    }
    setUsername(value);

    localStorage.setItem("username", value);
  }

  useEffect(() => {
    if (usernameRef) {
      usernameRef.current.value = localStorage.getItem("username");
    }
  }, []);

  return (
    <>
      <div className={styles.userStyle}>
        {!username && (
          <div className={styles.user}>
            <input type="text" placeholder="Username" ref={usernameRef} />
            <button onClick={handleUsername}>Start</button>
          </div>
        )}
      </div>
      <div>
        {username && (
          <div className={styles.container}>
            <RoomsContainer />
            <MessagesContainer />
          </div>
        )}
      </div>
    </>
  );
};

export default Home;

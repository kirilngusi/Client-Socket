import React, { useEffect, useRef } from "react";
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSockets } from "../context/socket.context";
import EVENTS from "../config/events";
import styles from "../styles/Room.module.css"
const RoomsContainer = (): JSX.Element=> {
  const { socket, roomId, rooms } = useSockets();
  const newRoomRef = useRef(null);

  function handleCreateRoom() {
    //get the room name
    const roomName = newRoomRef.current.value || "";
    if (!String(roomName).trim()) {
      return;
    }

    //emit room created event 
    socket.emit(EVENTS.CLIENT.CREATE_ROOM, { roomName });

    //set room name input to empty string
    newRoomRef.current.value = "";

  }

  function handleJoinRoom(key:any) {
    if(key === roomId) return;
    socket.emit(EVENTS.CLIENT.JOIN_ROOM, key);
  }

  //join room default
  useEffect(() => {
    socket.emit(EVENTS.CLIENT.JOIN_ROOM, 'room1');
  }, [])


  return (

    <nav className={styles.wrapper}>    
    {/* <i className="fas fa-bars"></i> */}
    {/* <FontAwesomeIcon icon="fas fa-bars" size="lg" /> */}

      <div className={styles.nav__avatar}>
        <Image src="/ava2.jpg" alt="Avatar" width="188" height="188" priority/>
      </div>
      <div className={styles.createRoomWrapper}>
        <input ref={newRoomRef} placeholder="Room name" />
        <button className="cta" onClick={handleCreateRoom}>
          CREATE ROOM
        </button>
      </div>
      <ul className={styles.roomList}>
        {Object.keys(rooms).map((key) => {
          return (
            <div key={key}>
              <button
                disabled={key === roomId}
                title={`Join ${rooms[key].name}`}
                onClick={() => handleJoinRoom(key)}
              >
                {rooms[key].name}
              </button>
            </div>
          );
        })}
      </ul>
    </nav>
  );
};

export default RoomsContainer
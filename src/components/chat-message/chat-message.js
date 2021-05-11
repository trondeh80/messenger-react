import React, { useContext } from 'react';
import MessengerContext from "../../context/messenger-context";

export default function ChatMessage({ id, userId, message }) {
  const {
    state: {
      users,
      activeUser
    }
  } = useContext(MessengerContext);

  const user = getUserById(userId);
  return (
    <div className={`chat-message ${activeUser === userId ? 'chat-message--me': 'chat-message--other'}`} key={id}>
      <div className="chat-message__user">
        {user?.name ?? ''}
      </div>
      <div className="chat-message__message">
        {message}
      </div>
    </div>
  );

  function getUserById(userId) {
    return users.find(({ id }) => userId === id);
  }
}
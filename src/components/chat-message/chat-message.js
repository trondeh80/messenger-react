import React, { useContext } from 'react';
import MessengerContext from '../../context/messenger-context';

import './chat-message.scss';

export default function ChatMessage({ userId: messageUserId, message }) {
    const {
        state: {
            users,
            userId
        }
    } = useContext(MessengerContext);

    const user = getUserById(messageUserId);
    return (
      <div className={`chat-message ${userId === messageUserId ? 'chat-message--me' : 'chat-message--other'}`}>
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
import React, { useContext, useEffect, useState } from 'react';

import './chat.scss';
import MessengerContext from '../../context/messenger-context';
import { fetchChatForUser } from '../../services/messenger-service';
import ENUMS from "../../util/enums";
import Loader from "../loader/loader";
import ChatMessage from "../chat-message/chat-message";

export default function Chat() {
  const {
    state: {
      users = [],
      activeUser,
      chats = { }
    },
    dispatch
  } = useContext(MessengerContext);

  const [ isLoading, setIsLoading ] = useState(true);
  const messages = chats?.[activeUser];

  useEffect(() => {
    if (!activeUser) {
      return;
    }
    fetchChat(activeUser);
  }, [ activeUser ]);

  return (
    <div className="chat">

      { !activeUser && <>Select a user</> }

      { activeUser && isLoading && <Loader /> }

      { activeUser && !isLoading && messages && messages.map(ChatMessage)}

    </div>
  );

  function fetchChat(activeUser) {
      setIsLoading(true);

      return fetchChatForUser(activeUser).then((messages) => {
        dispatch({
          type: ENUMS.MESSENGER.ACTIONS.MESSAGES_LOAD,
          data: {
            messages: [...messages]
          }
        });
        setIsLoading(false);
      });
  }
}
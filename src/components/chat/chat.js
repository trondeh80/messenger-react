import React, { useContext, useEffect, useState } from 'react';
import MessengerContext from '../../context/messenger-context';
import { fetchChatForUser } from '../../services/messenger-service';
import ENUMS from '../../util/enums';
import Loader from '../loader/loader';
import ChatMessage from '../chat-message/chat-message';
import ChatWrapper from '../chat-wrapper/chat-wrapper';

export default function Chat() {
    const {
        state: {
            activeUser,
            chats = {}
        },
        dispatch
    } = useContext(MessengerContext);

    useEffect(() => {
        if (!activeUser) {
            return;
        }
        fetchChat(activeUser);
    }, [activeUser]);

    const [isLoading, setIsLoading] = useState(true);
    const messages = chats?.[activeUser] ?? [];

    if (!activeUser) {
        return (<ChatWrapper isLoading={isLoading}>Select a user</ChatWrapper>);
    }

    if (activeUser && isLoading) {
        return (<ChatWrapper isLoading={isLoading}><Loader /></ChatWrapper>);
    }

    return (
      <ChatWrapper isLoading={isLoading}>
          {
              messages.map(({ id, ...message }) =>
                <ChatMessage key={id} {...message} />
              )
          }
      </ChatWrapper>
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
import React, { useContext } from 'react';
import MessengerContext from '../../context/messenger-context';
import Loader from '../loader/loader';
import ChatMessage from '../chat-message/chat-message';
import ChatWrapper from '../chat-wrapper/chat-wrapper';
import useChats from '../../util/use-chats';

export default function Chat() {
    const {
        state: {
            activeUser,
            chats = {}
        }
    } = useContext(MessengerContext);

    const { isLoading } = useChats(activeUser)
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

}
import React, { useRef } from 'react';
import ChatInput from '../chat-input/chat-input';
import './chat-wrapper.scss';

export default function ChatWrapper({ children, isLoading = true }) {
    const messagesRef = useRef(null);
    if (messagesRef.current) {
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }

    return (
      <div className="chat">
          <div className="chat__messages" ref={messagesRef}>
              {children}
          </div>
          <div className="chat__input">
              <ChatInput isLoading={isLoading} />
          </div>
      </div>
    );
}
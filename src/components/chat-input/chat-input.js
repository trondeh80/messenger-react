import React, { useContext, useState } from 'react';
import MessengerContext from '../../context/messenger-context';
import ENUMS from '../../util/enums';
import './chat-input.scss';

export default function ChatInput({ isLoading }) {
    const {
        dispatch
    } = useContext(MessengerContext);
    const [message, setMessage] = useState('');

    const hideStyle = {
        display: 'none'
    }
    return (
      <form onSubmit={onSubmit} autoComplete="off">
          <input autoComplete="false" name="hidden" type="text" style={hideStyle} />
          <div className="chat-input">
              <input disabled={isLoading} type="text" name="message" value={message} onChange={onChange}
                     className="chat-input__input" />
              <button disabled={isLoading} className="chat-input__button" type="submit">
                  Send
              </button>
          </div>
      </form>
    );

    function onChange({ target: { value } }) {
        setMessage(value);
    }

    function onSubmit(e) {
        dispatch({
            type: ENUMS.MESSENGER.ACTIONS.ADD_MESSAGE,
            data: {
                message
            }
        });
        setMessage(''); // Clear chat
        e.preventDefault();
        return false;
    }
}
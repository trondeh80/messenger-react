import React from 'react';
import ENUMS from '../util/enums';

export const messengerState = {
  users: [],
  activeUser: null,
  chats: {}
};

export function messengerReducer(state, { data, type }) {


  switch(type) {
    case ENUMS.MESSENGER.ACTIONS.LOAD:
      const { users = [] } = data;
      return {
        ...state,
        users: [...users]
      };

    case ENUMS.MESSENGER.ACTIONS.SET_CHAT_ID:
      const { id } = data;
      return {
        ...state,
        activeUser: id
      };

    case ENUMS.MESSENGER.ACTIONS.MESSAGES_LOAD:
      const { messages } = data;
      const { activeUser } = state;
      return {
        ...state,
        chats: {
          [activeUser]:messages
        }
      };

    default:
      return messengerState;
  }
}

const MessengerContext = React.createContext();
export default MessengerContext;
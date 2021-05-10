import React from 'react';
import ENUMS from '../util/enums';

export const messengerState = {
  users: [],
  activeUser: null
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
      const { id: activeUser } = data;
      return {
        ...state,
        activeUser
      };

    default:
      return messengerState;
  }
}

const MessengerContext = React.createContext();
export default MessengerContext;
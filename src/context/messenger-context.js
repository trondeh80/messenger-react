import React from 'react';
import ENUMS from '../util/enums';
import createChatMessage from "../util/create-chat-message";

export const messengerState = {
    userId: 1337,
    users: [],
    activeUser: null,
    chats: {}
};

export function messengerReducer(state, { data, type }) {
    const { activeUser, userId } = state;

    switch (type) {
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
            return {
                ...state,
                chats: {
                    [activeUser]: messages
                }
            };

        case ENUMS.MESSENGER.ACTIONS.ADD_MESSAGE:
            const { chats } = state;
            const { message } = data;
            const activeChat = chats?.[activeUser] ?? [];
            return {
                ...state,
                chats: {
                    ...chats,
                    [activeUser]: [
                      ...activeChat,
                        createChatMessage({ userId , message })
                    ]
                }
            }

        default:
            return messengerState;
    }
}

const MessengerContext = React.createContext();
export default MessengerContext;
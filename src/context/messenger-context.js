import React from 'react';
import ENUMS from '../util/enums';
import createChatMessage from '../util/create-chat-message';

export const messengerState = {
    userId: 1337,
    users: [],
    activeUser: null,
    chats: {}
};

export function messengerReducer(state, { data, type }) {
    const { activeUser, userId, chats } = state;

    switch (type) {
        case ENUMS.MESSENGER.ACTIONS.LOAD:
            const { users = [] } = data;
            return {
                ...state,
                users: [...users]
            };

        case ENUMS.MESSENGER.ACTIONS.SET_CHAT_ID:
            const { id } = data;
            const messages = chats?.[activeUser] ?? [];
            return {
                ...state,
                activeUser: id,
                chats: {
                    [activeUser]: [...messages],
                    ...chats
                }
            };

        case ENUMS.MESSENGER.ACTIONS.MESSAGES_LOAD:
            const { messages: serverMessages } = data;
            const chatMessages = chats?.[activeUser] ?? serverMessages;
            return {
                ...state,
                chats: {
                    ...chats,
                    [activeUser]: [...chatMessages],
                }
            };

        case ENUMS.MESSENGER.ACTIONS.ADD_MESSAGE:
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
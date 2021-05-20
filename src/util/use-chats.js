import React, { useContext, useEffect, useState } from 'react';
import MessengerContext from '../../context/messenger-context';
import { fetchChatForUser } from '../../services/messenger-service';

export default function useChats(userId) {
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(fetchData, [userId]);

    // custom hook returns value
    return { error, isLoading };

    function fetchData() {
        if (!userId) {
            return;
        }

        const {
            dispatch
        } = useContext(MessengerContext);

        fetchChatForUser(userId)
            .then((messages) => {
                dispatch({
                    type: ENUMS.MESSENGER.ACTIONS.MESSAGES_LOAD,
                    data: {
                        messages: [...messages]
                    }
                });
            })
            .catch(setError)
            .finally(() => {
                setIsLoading(false);
            });
    }
}

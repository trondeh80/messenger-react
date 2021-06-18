import {useContext, useEffect, useState} from 'react';
import ENUMS from './enums';
import MessengerContext from '../context/messenger-context';
import {fetchChatForUser} from '../services/messenger-service';

export default function useChats(userId) {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const {dispatch} = useContext(MessengerContext);

  useEffect(fetchData, [userId, dispatch]);

  // custom hook returns only errors/isloading state.
  return {error, isLoading};

  function fetchData() {
    if (!userId) {
      return;
    }

    fetchChatForUser(userId)
      .then((messages) =>
        dispatch({
          type: ENUMS.MESSENGER.ACTIONS.MESSAGES_LOAD,
          data: {
            messages: [...messages],
          },
        })
      )
      .catch(setError)
      .finally(() => setIsLoading(false));
  }
}

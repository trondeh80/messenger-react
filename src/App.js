import React, { useReducer, useState, useEffect } from 'react';
import Header from './components/header/header';
import Main from './components/main/main';
import MessengerContext, { messengerReducer, messengerState } from './context/messenger-context';
import getChats from './services/messenger-service';
import ENUMS from './util/enums';
import Loader from './components/loader/loader';

function App() {
    const [state, dispatch] = useReducer(messengerReducer, messengerState);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(initialDataFetch, []); // Empty array makes this call only run on mount

    return (
      <MessengerContext.Provider value={{ state, dispatch }}>
          {
              isLoading ? <Loader /> : (
                <>
                    <Header />
                    <Main />
                </>
              )
          }
      </MessengerContext.Provider>
    );

    function initialDataFetch() {
        getChats().then((userData) => {
            setIsLoading(false);

            dispatch({
                type: ENUMS.MESSENGER.ACTIONS.LOAD,
                data: {
                    users: [...userData]
                }
            });
        });
    }
}

export default App;

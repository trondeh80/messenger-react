import React, { useContext } from 'react';
import MessengerContext from '../../context/messenger-context';
import ENUMS from '../../util/enums';

import './user-list.scss';

export default function UserList() {
    const {
        state: {
            users = [],
            activeUser
        },
        dispatch
    } = useContext(MessengerContext);

    return (
      <div className="user-list">
          {
              users
                .filter(({ isMe }) => !isMe)
                .map(renderUser)
          }
      </div>
    );

    function renderUser({ id, name }) {
        const activeClass = activeUser === id ? 'active' : '';
        return (
          <div className={activeClass + ' user'} key={id}>
              <button className="user--button" onClick={getActivateUserFn(id)}>
                  {name}
              </button>
          </div>
        );
    }

    function getActivateUserFn(id) {
        return () => {
            dispatch({
                type: ENUMS.MESSENGER.ACTIONS.SET_CHAT_ID,
                data: {
                    id
                }
            });
        };
    }
}


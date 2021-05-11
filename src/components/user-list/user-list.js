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
        users.map(renderUser)
      }
    </div>
  );

  function renderUser({ id, name, lastOnline }) {
    const lastOnlineDate = new Date(lastOnline);
    const dateStr = `${lastOnlineDate.getHours()}:${lastOnlineDate.getMinutes()}`;
    const activeClass = activeUser === id ? 'active' : '';
    return (
      <div className={activeClass + ' user'} key={id}>
        <button className="user--button" onClick={getActivateUserFn(id)}>
          {name} <span className="user--lastonline">{dateStr}</span>
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


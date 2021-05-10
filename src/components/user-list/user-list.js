import React, { useContext } from 'react';
import MessengerContext from "../../context/MessengerContext";
import ENUMS from "../../util/enums";

export default function UserList() {
  const { state: { users = [], activeUser }, dispatch } = useContext(MessengerContext);
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
      <div className={activeClass + ' user'}>
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
    }
  }
}


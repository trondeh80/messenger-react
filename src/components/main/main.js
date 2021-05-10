import React from 'react';
import UserList from "../user-list/user-list";
import Chat from "../chat/chat";

export default function Main() {
  return (
    <main>
      <div className="section section--left">
        <UserList />
      </div>
      <div className="section section--right">
        <Chat />
      </div>
    </main>
  );
}
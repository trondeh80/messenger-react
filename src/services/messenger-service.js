import sleep from '../util/sleep';
import createChatMessage from "../util/create-chat-message";

export default async function getChats() {
  await sleep(500);
  return [
    createUser({ name: 'John Doe' }),
    createUser({ name: 'Bruce Willis' }),
    createUser({ id: 1337, name: 'Professor Chaos', isMe: true }),
  ];
}

function createUser({ name, id = null }) {
  return {
    id: id ?? Math.round(Math.random() * 1000),
    name,
    lastOnline: new Date().getTime()
  };
}

export async function fetchChatForUser(userId) {
  await sleep(100);
  return [
    createChatMessage({ userId, message: 'Did you buy gamestop stocks?' }),
    createChatMessage({ userId: 1337, message: 'Nah, only bought dogecoin...' })
  ];
}


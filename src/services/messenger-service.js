import sleep from '../util/sleep';

export default async function getChats() {
  await sleep(1200);
  return [
    createUser({ name: 'John Doe' }),
    createUser({ name: 'Bruce Willis' }),
    createUser({ id: 1337, name: 'Professor Chaos' }),
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
  await sleep(500);
  return [
    createChat({ userId, message: 'Did you buy gamestop stocks?' }),
    createChat({ userId: 1337, message: 'Nah, only bought dogecoin...' })
  ];
}

function createChat({ userId, message }) {
  return {
    id: Math.round(Math.random() * 100000),
    userId,
    message,
    time: new Date().getTime() - 1000
  };
}
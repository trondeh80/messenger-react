import sleep from '../util/sleep';

export default async function getChats() {
  await sleep(1200);
  return [
    createChat({ name: 'John Doe' }),
    createChat({ name: 'Bruce Willis' })
  ];
}

function createChat({ name }) {
  return {
    id: Math.round(Math.random() * 1000),
    name,
    lastOnline: new Date().getTime()

  };
}
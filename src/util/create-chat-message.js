export default function createChatMessage({ userId, message }) {
    return {
        id: Math.round(Math.random() * 100000),
        userId,
        message,
        time: new Date().getTime(),
        siblings: null
    };
}
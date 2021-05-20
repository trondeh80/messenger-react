export default function sleep(timeInMillis) {
    return new Promise((resolve) => setTimeout(resolve, timeInMillis));
}
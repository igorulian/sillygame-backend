export function getRandomPlayerPosition(min=1, max=19) {
    return Math.random() * (max - min) + min;
}
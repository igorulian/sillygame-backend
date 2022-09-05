export function getRandomPlayerPosition(min=1, max=2) {
    return Math.floor(Math.random() * (max - min) + min)
}
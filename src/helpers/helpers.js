function getRandomNum(min, max) {
    min = Math.ceil(min);
  	max = Math.floor(max);
  	return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}

export function getRandomInt() {
	return getRandomNum(0, 10)
}

export function getRandomStr() {
	const letters = "abcdefghijklmnopqrstuvwxyz"
	const int = getRandomNum(0, letters.length)
	return letters[int]
}

// let values = Array.from({length: 40}, () => getRandomInt(0, 40));

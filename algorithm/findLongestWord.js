function findLongestWord(sentence) {
  if (sentence === undefined) {
    return "Sentence is needed";
  }

  if (!sentence) {
    return "Sentence can not be empty";
  }

  const words = sentence.split(" ");
  let longestWord = words[0];
  let maxCharactersInAWord = words[0].length;

  for (let i = 1; i < words.length; i++) {
    if (words[i].length > longestWord.length) {
      longestWord = words[i];
      maxCharactersInAWord = words[i].length;
    }
  }

  return `${longestWord}: ${maxCharactersInAWord} character`;
}

const sentence = "Saya sangat senang mengerjakan soal algoritma";
const sentence2 = "Aku suka lauk teri";
const sentence3 = "Aku";
const sentence4 = "";

console.log("sentence", findLongestWord(sentence));
console.log("sentence2", findLongestWord(sentence2));
console.log("sentence3", findLongestWord(sentence3));
console.log("sentence4", findLongestWord(sentence4));
console.log("Tanpa string", findLongestWord());

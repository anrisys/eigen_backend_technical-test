function countOccurences(INPUT, QUERY) {
  if (INPUT.length === 0 || !INPUT) {
    return "INPUT dibutuhkan";
  } else if (QUERY.length === 0 || !INPUT) {
    return "QUERY dibutuhkan";
  }

  const inputWordOccurences = {};

  for (const word of INPUT) {
    if (!inputWordOccurences[word]) {
      inputWordOccurences[word] = 1;
    } else {
      inputWordOccurences[word]++;
    }
  }

  const queryInInput = [];

  for (const word of QUERY) {
    if (inputWordOccurences[word]) {
      queryInInput.push(inputWordOccurences[word]);
    } else {
      queryInInput.push(0);
    }
  }

  let output = `[${queryInInput.join(", ")}] karena`;

  for (let i = 0; i < QUERY.length; i++) {
    const explanation =
      queryInInput[i] !== 0
        ? ` kata '${QUERY[i]}' terdapat ${queryInInput[i]} pada INPUT`
        : ` kata '${QUERY[i]}' tidak ada pada INPUT`;
    output += explanation;

    if (i < QUERY.length - 1) {
      output += ",";
    }
  }

  return output;
}

const QUERY1 = ["bbb", "ac", "dz"];
const INPUT1 = ["xc", "dz", "bbb", "dz"];
const QUERY2 = [];
const INPUT2 = [];

console.log(countOccurences(INPUT1, QUERY1));
console.log(countOccurences(INPUT1, QUERY2));
console.log(countOccurences(INPUT2, QUERY1));

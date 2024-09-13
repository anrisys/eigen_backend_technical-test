function reverseAlphabets(str) {
  if (str === undefined) {
    return "String is needed";
  }

  const alphabets = str.replace(/[0-9]/g, "").split("").reverse().join("");
  const digit = str.match(/[0-9]/g) || [];

  return alphabets + (digit ? digit.join("") : "");
}

const str = "NEGIE1";
const str2 = "NEGIE";
const str3 = "1";
const str4 = "";
const str5 = "UKA12";
console.log("Str", reverseAlphabets(str));
console.log("Str2", reverseAlphabets(str2));
console.log("Str3", reverseAlphabets(str3));
console.log("Str4", reverseAlphabets(str4));
console.log("Tanpa string", reverseAlphabets(str5));

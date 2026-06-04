/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/

function isAnagram(str1, str2) {
  //sorting str1 and str2
  //returning true if str1 == str2
  const lwrcase1 = str1.toLowerCase();
  const arr1 = lwrcase1.split("");
  arr1.sort();
  const strr1 = arr1.join("");

  const lwrcase2 = str2.toLowerCase();
  const arr2 = lwrcase2.split("");
  arr2.sort();
  const strr2 = arr2.join("");

  if (strr1 == strr2) {
    return true;
  } else {
    return false;
  }
}

module.exports = isAnagram;

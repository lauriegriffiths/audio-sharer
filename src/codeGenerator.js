const CodeGenerator = noOfLetters => {
  return Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, "")
    .substr(0, noOfLetters);
};

export default CodeGenerator;

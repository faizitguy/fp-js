// cli blog

const { Task } = require("./lib/types");
const { save, all } = require("./lib/db");

const AuthorTable = "Authors";

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const getInput = (q) =>
  //   Task((rej, res) => readline.question(q, (i) => res(i.trim())));
  Task((rej, res) => readline.question(q, (i) => res(i.trim())));

getInput("sup?")
  .map((answer) => answer.toUpperCase())
  .fork(console.error, console.log);

const createAuthor = () => getInput("Name?").map((name) => Author);
const start = () =>
  all(AuthorTable).map((authors) => (authors.length ? menu : createAuthor));

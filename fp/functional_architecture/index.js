// cli blog

const { Task } = require("./lib/types");
const { save, all } = require("./lib/db");
const { last } = require("ramda");

const AuthorTable = "Authors";
const Author = (name) => ({ name });
const PostTable = "Post";
const Post = (title, body) => ({ title, body });

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const getInput = (q) =>
  Task((rej, res) => readline.question(q, (i) => res(i.trim())));

const menu = () =>
  getInput(
    "navigation menu choose one  (createAuthor, write, latest, all)"
  ).map((route) => router[route]);

const formatPost = (post) => `${post.title} :\n ${post.body}`;
const print = (s) => Task((_rej, res) => res(console.log(s)));

const latest = () =>
  all(PostTable)
    .chain((posts) => last(posts))
    .map(formatPost)
    .chain(print)
    .map(() => menu());

const write = () =>
  getInput("Title : ")
    .chain((title) => getInput("Body : "))
    .map((body) => Post(title, body))
    .chain((post) => save(PostTable, post))
    .map(() => latest());

// we're returning a task that holds another function which returns another task as vice verca
// recurrsive operation is happening here
// we need to create a recurrsive operation where task is holding another task like that
// () => Task () => Task => ...
// () => Task Task Task ...

const createAuthor = () =>
  getInput("Name?")
    .map((name) => Author(name))
    .chain((author) => save(AuthorTable, author))
    .map(() => menu());

const start = () =>
  all(AuthorTable).map((authors) => (authors.length ? menu() : createAuthor()));

const router = { menu, createAuthor, write, latest };

const runApp = (f) => f().fork(console.error, console.log);

runApp(start);

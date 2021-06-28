// import { curry, compose, replace } from "ramda";

const { curry, compose, replace } = require("ramda");
// const add = (x, y) => x + y;

// const toUpper = (str) => str.toUpperCase();

// const exclaim = (str) => str + "!";

// const first = (str) => str[0];

// const compose = (f, g) => (x) => f(g(x));

// const shout = compose(exclaim, toUpper);

// console.log(shout("tears"));

const _underscore = replace(/\W+/g, "_"); //<-- leave this alone and use to sanitize

const _samllCase = (str) => str.toLowerCase();

const join = (str) => str.join("");

const sanitizeNames = compose(_samllCase, _underscore);

const result = sanitizeNames("Faiz Ahmed Khan");

console.log(result);

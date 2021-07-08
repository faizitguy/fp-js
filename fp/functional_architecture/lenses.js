// // lenses

// // lenses built on functors
// // we will be using lenses pretty light and we can do most amazing things with lenses
// // we can rewrite every app with just lenses

// const { toUpper, view, over, lensProp, compose } = require("ramda");

// const L = {
//   name: lensProp("name"),
//   street: lensProp("street"),
//   address: lensProp("address"),
// };

// const user = { address: { street: { name: "Nabikot" } } };

// // we have a nested object (user) and if you wanna see something from there you should use VIEW

// // const res = view(compose(L.address, L.street), user); // { name: 'Nabikot' }
// // console.log(res);

// // over allows you to modify it
// const addStr = compose(L.address, L.street, L.name);
// const res = over(addStr, toUpper, user); // { address: { street: { name: 'NABIKOT' } } }
// console.log(res);

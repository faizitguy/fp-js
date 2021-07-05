// semigroup

// 1 + 2 + 3;
// 1 + (2 + 3) = (1 + 2) + 3 => associative and closed
// if we add a bunch of integers we never break out of integers always get integers back => closed
// so it's closed under composition
// same for 1*2*3
// if it is both associative and closed then it is PARALLEL

// ===========================================
// creating semigroup dataType

// const Sum = (x) => ({
//   x,
//   concat: (other) => Sum(x + other.x),
// });

// const res = Sum(3).concat(Sum(5));
// console.log(res); // Sum(8)

// const Product = (x) => ({
//   x,
//   concat: (other) => Product(x * other.x),
// });

// const res = Product(3).concat(Product(5));
// console.log(res); // Product(15)

// const Any = (x) => ({
//   x,
//   concat: (other) => Any(x || other.x),
// });

// const res = Any(true).concat(Any(true));
// console.log(res); // true

// we've defined some of the methods above let's go little further and understand
// how this works as MONOID
// and then understand how it applies to functors

// monoids are just a semigroup with an identity

// Monoid = Semigroup + Identity

// ===================================================
// Defining Empty Identity

// Monoid = Semigroup + Identity

// we're going to call this one empty in the interface but it is an identity function

// const Product = (x) => ({
//   x,
//   concat: (other) => Product(x * other.x),
// });

// Product.empty = () => Product(1);

// const res = Product(1).concat(Product(10));
// const res = Product.empty().concat(Product(10));
// console.log(res); // 10

// const Sum = (x) => ({
//   x,
//   concat: (other) => Sum(x + other.x),
// });

// Sum.empty = () => Sum(0);

// const res = [1, 2, 3, 4, 5].map(Sum).reduce((acc, n) => acc.concat(n)); // 5
// const res = [].map(Sum).reduce((acc, n) => acc.concat(n)); //  Reduce of empty array with no initial value
// const res = [].map(Sum).reduce((acc, n) => acc.concat(n), Sum.empty()); // 0
// we have a way to proceed in our program eventhough we didn't have any data to process right now
// we can still provide some kinda value

// console.log(res);
// const { List } = require("immutable-ext");
// const All = (x) => ({
//   x,
//   concat: (other) => All(x && other.x),
// });

// All.empty = () => All(true);
// // const res = [true, true].map(All).reduce((ac, n) => ac.concat(n), All.empty());
// const res = List([true, true]).foldMap(All, All.empty());
// console.log(res);

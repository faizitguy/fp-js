// either => functor in a monad

// it has a map and chain method and it's gonna have a fold method which we define, we call that foldable

const Right = (x) => ({
  chain: (f) => f(x),
  map: (f) => Right(f(x)),
  fold: (f, g) => g(x),
  toString: () => `Right(${x})`,
});

const Left = (x) => ({
  chain: (f) => Left(x),
  map: (f) => Left(x),
  fold: (f, g) => f(x),
  toString: () => `Left(${x})`,
});

// const findColor = (name) => {
//   const found = {
//     red: "#ff4444",
//     blue: "#3b5998",
//     yellow: "#fff68f",
//   }[name];
//   return found ? Right(found) : Left("dunno");
// };

// const fromNullable = (x) => (x !== null ? Right(x) : Left());
// // one definitive null check

// const findColor = (name) =>
//   fromNullable({ red: "#ff4444", blue: "#3b5998", yellow: "#fff68f" }[name]);

// const res = findColor("red")
//   .map((x) => x.toUpperCase())
//   .fold(
//     (err) => "no color",
//     (color) => color
//   );

// console.log(res);

// Definitions
// ====================
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

const fromNullable = (x) => (x != null ? Right(x) : Left(null));

const tryCatch = (f) => {
  try {
    return Right(f());
  } catch (e) {
    return Left(e);
  }
};

const logIt = (x) => {
  console.log(x);
  return x;
};

const DB_REGEX = /postgres:\/\/([^:]+):([^@]+)@.*?\/(.+)$/i;

// Exercise: Either
// Goal: Refactor each example using Either
// Bonus: no curlies
// =========================

// Ex1: Refactor streetName to use Either instead of nested if's
// =========================
// const street_ = (user) => {
//   const address = user.address;

//   if (address) {
//     return address.street;
//   } else {
//     return "no street";
//   }
// };

// // example1 answer

// const street = (user) =>
//   fromNullable(user.address) // Right or Left (address)
//     .map((address) => address.street)
//     .fold(
//       () => "no street",
//       (x) => x
//     );

// QUnit.test("Ex1: street", (assert) => {
//   const user = { address: { street: { name: "Willow" } } };
//   assert.deepEqual(street(user), { name: "Willow" });
//   assert.equal(street({}), "no street");
// });

// // Ex1: Refactor streetName to use Either instead of nested if's
// // =========================
// const streetName_ = (user) => {
//   const address = user.address;

//   if (address) {
//     const street = address.street;

//     if (street) {
//       return street.name;
//     }
//   }

//   return "no street";
// };

// // example2 answer

// const streetName = (user) =>
//   fromNullable(user.address)
//     .chain((address) => fromNullable(address.street))
//     .map((street) => street.name)
//     .fold(
//       () => "no street",
//       (x) => x
//     );

// QUnit.test("Ex1: streetName", (assert) => {
//   const user = { address: { street: { name: "Willow" } } };
//   assert.equal(streetName(user), "Willow");
//   assert.equal(streetName({}), "no street");
//   assert.equal(streetName({ address: { street: null } }), "no street");
// });

// // Ex2: Refactor parseDbUrl to return an Either instead of try/catch
// // =========================
// const parseDbUrl_ = (cfg) => {
//   try {
//     const c = JSON.parse(cfg); // throws if it can't parse
//     return c.url.match(DB_REGEX);
//   } catch (e) {
//     return null;
//   }
// };

// // example3 answer

// const parseDbUrl = (cfg) =>
//   tryCatch(() => JSON.parse(cfg))
//     .map((c) => c.url.match(DB_REGEX))
//     .fold(
//       (x) => null,
//       (x) => x
//     );

// QUnit.test("Ex1: parseDbUrl", (assert) => {
//   const config = '{"url": "postgres://sally:muppets@localhost:5432/mydb"}';
//   assert.equal(parseDbUrl(config)[1], "sally");
//   assert.equal(parseDbUrl(), null);
// });

// // Ex3: Using Either and the functions above, refactor startApp
// // =========================
// const startApp_ = (cfg) => {
//   const parsed = parseDbUrl(cfg);

//   if (parsed) {
//     const [_, user, password, db] = parsed;
//     return `starting ${db}, ${user}, ${password}`;
//   } else {
//     return "can't get config";
//   }
// };

// // example4 answer
// const startApp = (cfg) =>
//   fromNullable(parseDbUrl(cfg))
//     .map(([_, user, password, db]) => `starting ${db}, ${user}, ${password}`)
//     .fold(
//       () => "can't get config",
//       (x) => x
//     );

// QUnit.test("Ex3: startApp", (assert) => {
//   const config = '{"url": "postgres://sally:muppets@localhost:5432/mydb"}';
//   assert.equal(String(startApp(config)), "starting mydb, sally, muppets");
//   assert.equal(String(startApp()), "can't get config");
// });

// extra examples

// check if there is state present in the address
const address = {
  state: "andhra",
  city: "kadapa",
  street: "nabikot",
};

// const state_ = (address) => {
//   if (address.state) {
//     return address.state;
//   } else {
//     return "there is no state";
//   }
// };

// const state = (address) =>
//   fromNullable(address.state) // Right or Left(address.state)
//     .map((state) => state)
//     .fold(
//       () => "there is no state",
//       (x) => x
//     );

// console.log(state(address));

// extra example2

// check if there is a state called andhra in the object nested condition

const checkAndhra_ = (address) => {
  if (address.state) {
    if (address.state === "andhra") {
      return address.state;
    }
  }

  return "no state";
};
const checkAndhra = (address) =>
  fromNullable(address.state)
    .chain((state) => fromNullable(state === "andhra"))
    .map((state) => (state ? "andhra" : "no andhra"))
    .fold(
      () => "null",
      (x) => x
    );

console.log(checkAndhra(address));

// let do architecture around validations
// validations are a thing that combined

const { List } = require("immutable-ext");
const { Either } = require("./lib/types");
const { Left, Right } = Either;

const isPresent = Validation((key, x) =>
  !!x ? Success(x) : Fail([`${key} needs to be present`])
);

const Success = (x) => ({
  x,
  isFail: false,
  fold: (f, g) => g(x),
  concat: (other) => (other.isFail ? other : Success(x)),
});

const Fail = (x) => ({
  x,
  isFail: true,
  fold: (f, g) => f(x),
  concat: (other) => (other.isFail ? Fail(x.concat(other.x)) : Fail(x)),
});

const validate = (spec, obj) =>
  List(Object.keys(spec)).foldMap(
    (key) => (spec[key](obj[key]) ? Success([obj]) : Fail([`${key} is bad`])),
    Success([obj])
  );

const validations = { name: isPresent, email: isPresent };

const obj = { name: "faiz", email: "faiz@gmail.com" };

const res = validate(validations, obj);

res.fold(console.error, console.log);

// we will get either a combined errors or the original object
// we wanna build somthing that combines a bunch of validations and presents us with all errors or a successful
// object that got through the gauntlet

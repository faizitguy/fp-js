// let's build a validation library that combines the bunch of validations and presents
// all the errors or an successful object

const { List } = require("immutable-ext");
const { Either } = require("./lib/types");
const { Left, Right } = Either;

const Validation = (run) => ({
  run,
  concat: (other) =>
    Validation((key, x) => run(key, x).concat(other.run(key, x))),
});

const Success = (x) => ({
  isFail: false,
  x,
  fold: (f, g) => g(x),
  concat: (other) => (other.isFail ? other : Success(x)),
});

const Fail = (x) => ({
  isFail: true,
  x,
  fold: (f, g) => f(x),
  concat: (other) => (other.isFail ? Fail(x.concat(other.x)) : Fail(x)),
});

const isPresent = Validation((key, x) =>
  !!x ? Success(x) : Fail([`${key} should present`])
);

const isEmail = Validation((key, x) =>
  /@/.test(x) ? Success(x) : Fail([`${key} must be an email`])
);

const validate = (spec, obj) =>
  List(Object.keys(spec)).foldMap(
    (key) => spec[key].run(key, obj[key]),
    Success([obj])
  );

const validations = { name: isPresent, email: isPresent.concat(isEmail) };

const obj = { name: "", email: "faizgmail.com" };

const res = validate(validations, obj);

res.fold(console.error, console.log);

module.exports = { validate };

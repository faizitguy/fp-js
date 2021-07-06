// let's build a validation library that combines the bunch of validations and presents
// all the errors or an successful object
const { List } = require("immutable-ext");
const { Either } = require("./lib/types");
const { Left, Right } = Either;

const isPresent = (x) => !!x;

const validate = (spec, obj) => {
  List(Object.keys(spec)).foldMap(
    (key) => (spec[key](obj[key]) ? Right([obj]) : Left([`${key} bad`])),
    Either.of([obj])
  );
};

const validations = { name: isPresent, email: isPresent };
const obj = { name: "faiz", email: "faiz@gmail.com" };

const res = validate(validations, obj);
res.fold(console.log, console.log);

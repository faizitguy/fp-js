// what do we want to acheive with architecture
// every app has a set of values that we wanna go after
// like we want our app could be modular, extendable, perfomant, maintainable, readable etc.,

// when we do architecture we just kindaa group things and we name them and
// once we have named procedures that we've grouped
// then we group that procedures with names into more groups
// and we call them as modulars, modules or classes
// and we have datatypes and we group data into these little bundles and then we give those names
// and we have names to top of names it could be like a giant cloud of names

// domain driven design by eric evans => book name
// this book tells you how coding by metaphor and using these names and really getting into
// the zone of using ubiquitous language to model the real world

// we have a some problems with metaphors
// you have to know about context and domain
// mixed metaphor : Processor, Convertor etc.,
// Evolves/Blurs over time
// Hodge-Podge of functionality in each object

// If we capture procedures for reuse and we're just depending on a name, we don't know what we can do with tha
// there are no actual rules of composition
// if we're planning on recomposing this after grouping it and naming it
// we don't know if we can run this more than once, can run it in diff orders, changing other parts of the program
// how does it interact with others
// we will be focusing on the properties => associative, commutative, identity, distributive

// these 4  laws protect us from just the confusion of the name alone

// =============================

// class User {
//   constructor(firstName, lastName) {
//     this.firstName = firstName;
//     this.lastName = lastName;
//   }
//   fullName() {
//     return this.firstName + " " + this.lastName;
//   }
// }

// const user = new User("Faiz", "khan");
// console.log(user.fullName()); // Faiz khan

// =============================

// const user = { firstName: "faiz", lastName: "khan" };
// const joinWithSpace = (...args) => args.join(" ");

// const res = joinWithSpace(user.firstName, user.lastName);

// joinWithSpace(joinWithSpace("a", "b", "c")); // a b c
// joinWithSpace("a", joinWithSpace("b", "c")); // a b c

// console.log(res);

// =============================
const user = { firstName: "faiz", lastName: "khan" };
const joinWithSpace = (joinable) => joinable.join(" ");
// here joinWithSpace nothing will do other than joining because it nothing knows about its data type
// by generalizing we are making less possibility,  simplier implementations and  more resuse and it becomes
// more generic genaralized function
// we are recovering encapsulation
// by hiding information effectively

const res = joinWithSpace([user.firstName, user.lastName]);
console.log(res);

const identity = (a) => a;
// it knows nothing of this a it just gonna take it a and return an a
// if we call anything to it would break that contract of taking anything at all and returning it back

// by generalizing it to its logical end we're actually doing information hiding and protecting ourselves from rippling
// changes across our application

joinWithSpace("a", "b", "c"); // 'a b c'
joinWithSpace(joinWithSpace("a", "b"), "c"); // 'a b c'
joinWithSpace(a, joinWithSpace("b", "c")); // 'a b c'

// here we can notice that joinWithSpace is associative down here
// It doesn't matter how we group them
// joinWithSpace is reusable utility now. It's not stuck and tied to an object to be written again and again

// so we want highly generlized principles it's a good guiding principle
// we will be keep abstracting away until we programming to the most minimal interface then we will get the maximum
// reuse and information hiding
// if you change your program here and there it's not gonna ripple

// => creating generalized functions to make the code simplier, easier, robust, reusable and hide information(encapsulation and abstraction)

// =========================================================

// composition architecture

// let's suppose we've two types one is where we have a bunch of little functions which does one thing
// and another type is where we've a big function that does one big thing
// let's understand what are the usecases and disadvantages of them both
// little functions => benefits => inifinite usecases, simple and understandable functions, mostly reusable
// little functions => disadvantages => harger to change implementation, harder for user to compose
// big function => benefits => flexibility in implementation changes
// big function => disadvantages => won't satisfy all cases, less reusability, less cases to support

// for the bunch of functions we've laws of composition applied and we can compose it in many different ways
// mostly we'll be focusing on writing little bunch of functions which we can compose for reusability

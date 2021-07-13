// Functional-Light Javascript by Kyle simpson, v3 => frontend masters

// It is the same name of his companion book => Functional Light Javascript => very famous book
// It is not a intro/ light/ easy

// why functional programming

// there might be wide range of motivations
// biggest reason
// It is impossible to write FP in isolation

// Imperative vs Declarative
// paradigm shift in the way we approach code

// Imperative => how to do something
// Future reader of that code has to read all of the code and almost mentally execute the code before they
// understand what it's purpose is
// they can't simply glance at any part and immediately know what it is executing
// it forces the reader to do something that they're not actually naturally gifted at doing
// brain will not execute the code but machines do

// Declarative => what and why

// code comments
// code comments should focus on why (something is being used there ) not on what
// shift the code from imperative to declarative
// focus on, let's allow the system to do what it does best it figures things out best
// and let's focus our code on why we need that, what outcome (what is it going to accomplish and why is that useful)

// FP by nature it is declarative

// PROVABLE

// FP actually it looks like function calls, it's actually math
// it's ok if you don't know math
// why not math => restaurant bill (arithmetic) => life skills
// you don't gone through the formal proof of why 1 + 1 = 2
// you don't need that level of math to prove why 1+1=2 it's amazing complex to prove that
// we'll take the advantage of mathematical principle even if we can't prove it to ourselves.

// reduce the surface area of where you want to focus on
// best code is that where there is less to read
// suppose if there are 1000 lines of code and 900 lines are provable code that doesn't change
// only 100 lines of code is business logic then we can just focus on that logic part rather everthing

// ************* Course Overview *************

// 1. functions
// 2. closure
// 3. composition
// 4. immutability
// 5. recursion
// 6. lists / data structures
// 7. Async
// 8. FP Libraries

// ========================= FUNCTIONS ===========================

// what is a function

// functional programming is not all about the function keyword

// Procedure => it is a collection of operations
// using the function keyword doesn't make it a function it at least makes it a procedure

// function addNumbers(x = 0, y = 0, z = 0, w = 0) {
//   var total = x + y + z + w;
//   console.log(total);
// }

// it doesn't return anything so it is not a function but procedure

// function extraNumbers(x = 2, ...args) {
//   return addNumbers(x, 40, ...args);
// }

// it is returning procedure so it pollutes and then it becomes a procedure

// extraNumbers(); // 42

// extraNumbers(3, 8, 11); // 62

// tuple => two elments in an array

// function tuple(x, y) {
//   return [x + 1, y - 1];
// }

// var [a, b] = tuple(...[5, 10]);

// console.log(a); // 6
// console.log(b); // 9

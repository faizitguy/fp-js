# Functional Programming

## What is Functional Programming

Functional Programming is the process of building software by COMPOSING PURE FUNCTIONS,
avoiding SHARED STATE, MUTABLE DATA, and SIDE EFFECTS.

Functional Programming is declarative rather than imperative, and application state flows
through pure functions

defined by Eric Elliot

1. Avoid SideEffects
2. Avoid Mutations
3. Avoid SharedState
4. use Pure Functions
5. use Function Composition
6. use Declarative code instead of Imperative code

## 1. Avoiding sideEffects (Example on exercises/exercise1)

## 3. Avoiding Shared State

A program is considered stateful if it is designed to remember data from events or user interactions.
The remembered information is called the state of the program.

A JavaScript program stores data in variables and objects.
The contents of this storage locations at any given moment while the program is running is considered its state.

### What is shared state

shared state is any variable, object, or memory space that exists in a shared scope, or as the property of an object being passed between scopes.
A shared scope can include global scope or closure scopes.

## 2. Avoiding mutable data

mutable === changable,
immutable === not changable

data is mutable if it can be changed after has been creaetd,
data is immutable if it can't be changed

we have const variable in the ES6 version of javascript
we can't able to reassign it when it is declared but it is true for premitive values not for reference values(objects)

objects in JS are mutable

we want to get a copy of the object and change the copy, not changing the original one this will prevent mutating data

so one method to avoid mutaing is to clone the object

### Cloning the object

we can clone object by using Object.assgin(obj) method method but it copies object in a shallow way such that nested objects are not cloned, when we try to change the nested object then it mutates the original object so we will be cloning objects by using JSON.parse(JSON.stringify(obj)) method

## 5. using Function Composition

Before diving into the concept we need to understand some basic concepts of FirstClass Functions, Higher Order Functions and Closures

### Function Composition

Function Composition is the combining of functions for the purpose of producing a new function or performing some new computation

we need to understand what is the purpose of combining functions why do we actually need and what it accomplish?

when using a FP programming paradigm, functions can be looked at in one of two ways as a procedure or a function

in FP we want to create function not procedure

so what is the difference between them

### Procedure

A procedure is a collection of functionality, it may have inputs or may not it may have return values or may not and it frequently does its work by working on a shared state.

### functions

They are based on the ideas that come from mathematical functions.

- Functions have an input
- Functions retun a value
- Functions are simplified to a single task

Every function is so specific that it accomplishes a small amount of work and it makes them easy to reuse

Then we will combine those many resuable functions to acheive a big task this is what functinal composition is

A functional programmer sees every function in their program like a little lego piece. They recognize the blue 2x2 brick at a glance, and know exactly how it works and what they can do with it. As they go about building a bigger complex lego model, as they need each next piece, they already have an instinct for which of their many spare pieces to grab.

But sometimes you take the blue 2X2 brick and the gray 4X1 brick and put them together in a certain way, and you realize, "that's a useful piece that I need often"
Kyle Thompson

understand how to use compose or pipe for composing functions from concepts/compose

### Currying

A curried function is a function that takes multiple arguments one at a time.

currying is where a function that expects multiple arguments broken down into successive functions
that each take a single argument and return another function to accept the next argument

Partial applications can take as many or as few arguments a time as desired.
Curried functions on the other hand always return a unary function : a function which takes only one argument

### Advantages of currying

1. Currying can be used to specialize functions
2. It simplifies function composition

## Imperative versus Declarative Programming

### Imperative Programming

- Imperative programming is a style that tells computer how to accomplish the task

### Declarative Programming

- It expresses the logic of a program without identifying the control flow.
- Control flow is abstracted away, so declarative code only needs to specify what to do.

### Example

- If you want to tell the address of your place what will be your approach
- you could say the exact location or address to anyone or you could start giving instructions go right, take left etc.,
- Giving instructions => Imperative Approach
- Giving exact Address => Declarative Approach

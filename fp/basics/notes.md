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

## sideEffects Example on code

## Avoid sharedState and Mutations

## Avoiding Shared State

A program is considered stateful if it is designed to remember data from events or user interactions.
The remembered information is called the state of the program.

A JavaScript program stores data in variables and objects.
The contents of this storage locations at any given moment while the program is running is considered its state.

### What is shared state

shared state is any variable, object, or memory space that exists in a shared scope, or as the property of an object being passed between scopes.
A shared scope can include global scope or closure scopes.

### Avoiding mutable data

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

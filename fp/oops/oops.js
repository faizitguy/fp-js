// what is object oriented programming

// A programming paradigm centered around objects rather than functions

// OOP is not a programming language or tool

// c#, java, ruby python, Javascript support OOPS

// there are some of the libraries and frame works that support OOP such as Angular

// OOP is popular style of programming

// Four pillars of OOP

// Before OOP we had procedural programming that divided a program into a set of functions
// so we have data stored in a bunch of variables and function operate under data
// But as our programs grow we will end up with a bunch of functions that are all over the place
// we might found ourself copying and pasting lines of code over and over to make change function
// and then several other functions break => spagetti code

// There is so much interdependancy between this functions and it becomes problematic.

// In OOP programming we combine group of related variables and functions into a unit(object)
// variables => properties, functions => methods

// In OOP we group related variables and functions that operate on them into objects
// and we call it ENCAPSULATION

let baseSalary = 30000;
let overTime = 10;
let rate = 20;

function getWage(baseSalary, overTime, rate) {
  return baseSalary + overTime * rate;
}

// we call it procedural
// we have variables on one side and functions on the other side

// OOP way

let employee = {
  baseSalary: 30000,
  overTime: 30,
  rate: 20,
  getWage: function () {
    return this.baseSalary + this.overTime * this.rate;
  },
};

employee.getWage();

// It has no prameters
// all parameters are modelled as properties of object
// all this are part of one unit

// one of the symptoms of procedural is function with so many parameters
// The best functions are those with no parameters! => Uncle Bob

// ABSTRACTION

// DVD player as an object
// this DVD has an complex logic  board in the inside and few buttons in the outside that we interact with
// we simply press the play button and we don't care what happens in the inside

// all the complexity is hidden from you
// This is abstraction technique in practice

// we can use the same technique in our objects
// we can hide some of the properties and methods from the outside
// this gives us couple of benefits

// first we'll make the interface of those objects simpler
// using and understanding an object with a few properties and methods is easier than an object with several
// properties and methods

// second is it will help us to reduce the impact of change
// let's imagine that tomorrow we change this inner and private methods
// none of these changes will leak to the outside because we don't have any code that touches these methods
// outside of their containing object.
// we may delete the method, change the parameters
// none of this changes will impact the rest of the applications code.

// INHERITANCE

// Inheritance is a mechanism that allows you to eliminate redundant code.
// suppose we have elements in html such as textBox, select, checkBox
// they have same properties (hidden, innerHTML) and methods (click, focus)
// we will create a parent object called HTMLElement and give all the properties and methods to it
// and then we can inherit them to all the elements

// POLYMORPHISM

// poly => many
// morph => form

// in OOP POLYMORPHISM is a technique that allows us to get rid of long if & else or switch and case statements
// let's suppose if we want to render many different methods in a procedural way we will be having many conditional
// statements to do it
// so rather we can attach render method to every element and we can render individually => element.render()

// Benefits of Object Oriented Programming

// Encapsulation => using encapsulation we group related variables and  functions together and we can reduce complexity
// we can reuse this object in different parts of the program

// Abstration => with abstration we hide the details and the complexity and show only the essentials.
// it reduces complexity and also isolates the impact of changes in the code

// Inheritence => we can eliminate redundant code,

// Polymorphism => we can refactor ugly switch/ case statements

// ===============================================================================

// course structure

// objects
// prototypes
// prototypical inheritence
// Es6 classes
// Modules

---
title: Functional Programming with JS
date: 2021-06-28
description: All the usual blog post.
tags: ["javascript"]
author: pratham82
subTitle: working of map reduce and filter in JS
---

![](image.jpg)

Ever since I started learning react I heard this buzzword **Functional Programming**. I have searched all over the internet and found some useful resources, watched countless youtube videos and finally got the hang of it, And probably you'll get it too till the end of this article.
First we will see how programming paradigm works, then we will cover functional programming and once we know the basics we will go over the implementation with JavaScript's Map, Reduce and Filter method.

<br />

## **Programming Paradigms**

Basically there are various approaches to write you programs. If you've done a CS major you'd probably know these and if you didn't don't worry its a method to solve a problem. There are two main paradigms **Imperative programming** and **Declarative programming**.

<br />

### 1. Imperative Programming

**Imperative programming** works by **changing** the **program state** through **assignment statements**. The main focus in this approach is **how we achieve the goal**

#### **Advantages**:

- Very easy to implement
- Contains loops and variables

#### **Disadvantages**:

- More buggy compared to Declarative
- Hard to maintain
- Less efficient for long term
- Parallel programming not available

#### **Examples**:

**OOPS** is one of the most famous programming paradigm. OOPS short for (Object Oriented Programming) it comes under Imperative programming. In this paradigm everything is revolving around classes and objects.

- **Languages**: Java,Python,C++,Ruby, Smalltalk

<br />

### 2. Declarative Programming

**Declarative programming** is a way of building programs that **express** the **logic** of computation **without describing** its **control flow**.

#### **Advantages**:

- Short and Efficient Code
- Implemented by the methods not yet known at the time of programming
- Characterized by **high level of abstraction** that's why easier to represent complex logic
- Maintenance is possible irrespective of application development.

#### **Disadvantages**:

- Hard to understand for external Devs
- Hard to take characteristics of individual applications into account during programming

#### **Examples**:

<br />

**Functional programming** The functional programming paradigms has its roots in mathematics and it is language independent. The central model for the abstraction is the function which are meant for some specific computation and not the data structure. Data are loosely coupled to functions.

- **Languages**: JavaScript,Haskell,Scala,Erlang, Lisp

## **Functional Programming**

Functional programming is the process of building software by **composing** **pure functions**, **avoiding shared state**, **mutable data**, and **side-effects**. In functional programming application state flows through pure functions. As compared with **OOP** where the state is shared with methods and objects.

## Main concepts to learn in Functional Programming:

- **Pure functions:** pure function is the function which takes the input and gives the same output every single time. It does not affect the state. Pure function has no side effects
- **Function Composition:** it is the process of combining two or more functions which gives us a new function. Composing functions together is like snapping together a series of pipes for our data to flow through.
- **Avoiding shared states:** **shared state** is any variable, object or memory space in a program. which can be passed down between multiple scopes. But in functional programming we should avoid this for avoiding mutation of states which changes the state.
- **Avoiding side effects:** side effect is a function causing the state change which is observable outside the function call other than its return value. In simple words when our current function is modifying the state outside the current function.

<br />

## **Implementing of functional programming in JS with (Map, Reduce and Filter)**

### I will be covering most used functional array methods and JS which are **Map, Reduce and Filter**. These are the holy grail of functional programming in JavaScript. It is the best way iterate over arrays without changing them. Lets get started.

<br />

## **1. Map**

It can be applied to an array. The map() method creates a new array populated with the results of calling a provided function on every element in the calling array.

### **Syntax:**

**Regular JS:**

```javascript
let newArr = arr.map(function (currentValue, index, currentArray) {
  //logic for new array
});
```

**Using ES6 arrow functions:**

I would suggest using arrow function where possible its a great way of writing JS. Because its cleaner and more readable.

```javascript
let newArr = arr.map((currentValue, index, currentArray) => {
  //logic for new array;
});
```

- **function:** This will be callback function which can be declared before can be added as we use it.
- **currentValue:** Current value is similar to arr[i] when we iterate over array using for loops
- **index:** Current index of the item
- **currentArray:** the array we are iterating over. In this case its "arr"

- **newArr** will return a new array with our applied modifications.

### **Where can I use it ?**

We can use map while iterating over arrays, normally where you use for loop, we can use map method instead. We can extract the valuable info from the objects and return it in a form of an array. Simply it can be used on the array which has definite length. I loved using map and ditched "for loop" since I started learning it, its a good practice in writing clean code.

<br />

#### **Example 1: Finding square of each number in array**

**Without using Map:**
In regular JS fashion we would approach this problem something like this. Create an empty array. Iterate over the given array. Take the item from the current array and square it.Push the squared item in the empty array.Return the new array

```javascript
let arr = [1, 2, 3, 4, 5];

let squaredArray = [];

for (let i = 0; i < arr.length; i++) {
  squaredArray.push(arr[i] ** 2);
}

// Output:
console.log(squaredArray); // [ 1, 4, 9, 16, 25 ]
```

<br />

**With Map:**
Now we can see some map magic. While doing the same thing using map we don't have to explicitly declare a new array map method creates it under the hood. map method returns a copy of the array.

```javascript
// Using map and arrow function it be applied something like this:
const newArr = arr.map((val) => val ** 2);
console.log(newArr); // [ 1, 4, 9, 16, 25 ]
```

In the above example we are calling the map method on **arr** and passing in the callback function which will return an array of

So now you can see, how powerful it is. If you are seeing it for the first time it can be little confusing but trust me if you try to embrace the difficulty and start using it.

<br />

#### **Example 2: Add the index of the current item into itself**

```javascript
// Input:
const arr = [0, 1, 2, 3, 4, 5];

// Output:
// [ 0, 2, 4, 6, 8 ]
```

**Without using Map:**

```javascript
let newArray = [];

for (let i = 0; i < arr.length; i++) {
  newArray.push(arr[i] + i);
}

console.log(newArray); // [ 0, 2, 4, 6, 8 ]
```

In the following example we will make use of 3 parameters. **val** is the current value of item, **index** od current item, **arr** is the current array that we are iterating

**With Map:**

```javascript
const newArray = arr.map((val, index, arr) => val + arr[index]);

console.log(newArray); // [ 0, 2, 4, 6, 8 ]
```

<br />

#### **Example 3: Extract full name and title of the employees from given object**

Object that we will be working with:

```javascript
let EmployeesObject = {
  Employees: [
    {
      userId: "rirani",
      jobTitleName: "Developer",
      firstName: "Romin",
      lastName: "Irani",
      employeeCode: "E1",
      region: "CA",
      phoneNumber: "408-1234567",
      emailAddress: "romin.k.irani@gmail.com",
    },
    {
      userId: "nirani",
      jobTitleName: "Database Admin",
      firstName: "Neil",
      lastName: "Irani",
      employeeCode: "E2",
      region: "CA",
      phoneNumber: "408-1111111",
      emailAddress: "neilrirani@gmail.com",
    },
    {
      userId: "thanks",
      jobTitleName: "Program Directory",
      firstName: "Tom",
      lastName: "Hanks",
      employeeCode: "E3",
      region: "CA",
      phoneNumber: "408-2222222",
      emailAddress: "tomhanks@gmail.com",
    },
  ],
};
```

```javascript
// Storing employee Array in separately for readability
const data = EmployeesObject.Employees;

// Extracting the required data and storing into new array
const curatedData = data.map(
  (employee) =>
    `Name: ${employee.firstName} ${employee.lastName}, Title: ${employee.jobTitleName}`,
);

console.log(curatedData);

// Output:
[
  "Name: Romin Irani, Title: Developer",
  "Name: Neil Irani, Title: Database Admin",
  "Name: Tom Hanks, Title: Program Directory",
];
```

<br />

## **2. Filter**

Filter is a higher order function which will loops through an array, and for each item going to pass it in callback function. It will expect the callback function to return either true or false, to tell filter whether pr not this item should be in the new array. The filer() method also creates a new array but only with the elements which passes the test provided in the callback function.

<br />

### **Syntax:**

**Regular JS:**

```javascript
let newArr = arr.filter(function (currentValue, index, currentArray) {
  //Condition for new array
});
```

**Using ES6 arrow functions:**

```javascript
let newArr = arr.filter((currentValue, index, currentArray) => {
  // Condition for new array
});
```

- **function:** This will be callback function which checks the condition if its true or false for each item
- **currentValue:** Current value is similar to arr[i] when we iterate over array using for loops
- **index:** Current index of the item
- **currentArray:** the array we are iterating over. In this case its "arr"

- **newArr** will return a new array with our applied modifications.

<br />

#### **Example 1: Find how many students pass the test**

You are provided with the marks of students, passing marks is 35, you have to find how many students passed the test

```javascript
let marks = [34, 56, 67, 12, 98, 71, 45, 32];
```

**Without using Filter:**

```javascript
let passed = 0;
for (let i = 0; i < marks.length; i++) {
  if (marks[i] > 35) {
    passed++;
  }
}

console.log(passed); // 5
```

**With Filter:**

```javascript
let passedStudents = marks.filter((mark) => mark > 35).length; // 5
```

<br />

#### **Example 2: Find dogs from the given array**

Return the array of animal which has species dog

```javascript
let animals = [
  { name: "FluffyKins 🐇", Species: "rabbit" },
  { name: "DexLuthor 🐕", Species: "dog" },
  { name: "Trenton 🐕", Species: "dog" },
  { name: "Joey 🐕", Species: "dog" },
  { name: "FetchFishy 🐟", Species: "fish" },
  { name: "Dianna 🐟", Species: "fish" },
  { name: "CatePurry 🐈", Species: "cat " },
  { name: "BobBear 🐻", Species: "bear" },
  { name: "Todd 🐻", Species: "bear" },
  { name: "AlexLeon 🦁", Species: "lion" },
];
```

**Without using Filter:**

```javascript
let dogsFor = [];
for (let i = 0; i < animals.length; i++) {
  if (animals[i].Species == "dog") {
    dogsFor.push(animals[i]);
  }
}

console.log(dogsFor);

//Output:
[
  { name: "DexLuthor 🐕", Species: "dog" },
  { name: "Trenton 🐕", Species: "dog" },
  { name: "Joey 🐕", Species: "dog" },
];
```

**With Filter:**

```javascript
const dogs = animals.filter((animal) => animal.Species === "dog");

//Output:
[
  { name: "DexLuthor 🐕", Species: "dog" },
  { name: "Trenton 🐕", Species: "dog" },
  { name: "Joey 🐕", Species: "dog" },
];
```

<br />

## **3. Reduce**

This can be the most confusing method in the bunch, its just has lots of **parameters**. Basically we are taking a **iterable** array or object and converting it to a **single value**. Normally we have to use the **accumulator**(it can be an array or the value 0) for storing the **data**, but **reduce** method gives us this accumulator **out of the box**. It is the **first parameter** in the **callback function**, and the **initial value** of this accumulator is provided **after** the **function callback** inside round braces.

Reduce method executes a reducer function that you provide as a callback and returns a single output. In other words it takes the iterable and reducer function then return a reduced value.

Reducer comes with some terminology such as reducer and accumulator.

- The accumulator is the value that we end with and the reducer is what action we will perform in order get to one value.
- accumulator is just a fancy word for an empty array or zero.
- Reduce will return one value and one value only hence the name is reduce

### **Syntax:**

**Regular JS:**

```javascript
let newArr = arr.reduce(function (accumulator, currentVal, index, currentArr) {
  //Reducer function
}, initialValue);
```

**Using ES6 arrow functions:**

```javascript
let newArr = arr.reduce((accumulator, currentValue, index, currentArray) => {
  //Reducer logic
}, initialValue);
```

- **function:** This will be callback function which checks the condition if its true or false for each item
- **accumulator:** The accumulator accumulates callback's return values. It means its stores all the values returned by callback. It can be a number, array or object.
- **currentValue:** Current value is similar to arr[i] when we iterate over array using for loops
- **index:** Current index of the item
- **currentArray:** the array we are iterating over. In this case its "arr"

- **newArr:** will return a new reduced array.
- **initialValue:** A value to use as the first argument to the first call of the callback.
  Further Reading:

<br />

#### **Example 1: Find the sum of the provided numbers**

```javascript
let scores = [99, 45, 67, 35, 76, 29, 78, 83, 69, 88];
```

**Without using Reduce:**

```javascript
let avg = 0;

function avgFor(arr) {
  for (i = 0; i < arr.length; i++) {
    avg += arr[i];
  }
  return avg;
}

console.log(avgFor(scores)); // 669
```

**Wit Reduce:**

```javascript
let avg = scores.reduce((sum, score) => sum + score);
console.log(avg); //669
```

<br />

#### **Example 2: Find the average salary of the given employees**

```javascript
let EmployeesObject = {
  Employees: [
    {
      userId: "rirani",
      jobTitleName: "Developer",
      firstName: "Romin",
      lastName: "Irani",
      preferredFullName: "Romin Irani",
      employeeCode: "E1",
      salary: 75000,
      region: "CA",
      phoneNumber: "408-1234567",
      emailAddress: "romin.k.irani@gmail.com",
    },
    {
      userId: "nirani",
      jobTitleName: "Database Admin",
      firstName: "Neil",
      lastName: "Irani",
      preferredFullName: "Neil Irani",
      employeeCode: "E2",
      region: "CA",
      salary: 90000,
      phoneNumber: "408-1111111",
      emailAddress: "neilrirani@gmail.com",
    },
    {
      userId: "thanks",
      jobTitleName: "Program Directory",
      firstName: "Tom",
      lastName: "Hanks",
      preferredFullName: "Tom Hanks",
      employeeCode: "E3",
      region: "CA",
      salary: 150000,
      phoneNumber: "408-2222222",
      emailAddress: "tomhanks@gmail.com",
    },
    {
      userId: "draks",
      jobTitleName: "Full Stack Developer",
      firstName: "Drake",
      lastName: "Smith",
      preferredFullName: "Drake Smith",
      employeeCode: "E3",
      region: "CA",
      salary: 150000,
      phoneNumber: "408-2222222",
      emailAddress: "tomhanks@gmail.com",
    },
  ],
};
```

Storing employees array in a variable. finding the sum of the salary and storing it in an accumulator which initializes at 0, and finally dividing it by salaries length which will give us an average salary

```javascript
const salaries = EmployeesObject.Employees;

const avgSalary =
  salaries.reduce((avg, employee) => avg + employee.salary, 0) /
  salaries.length;

// Output
console.log(avgSalary); // 116250
```

<br />

#### **Conclusion**: I've just scratched a surface using on the functional programming part, JS has many other methods which comes under functional programming, But I think these are the main ones. My react journey has been very easy because of these methods and overall JS too. I encourage you to master these methods so you can write efficient JS code. Thanks for reading. Follow me on github I post well documented code with various examples on m [github](https://github.com/Pratham82/) .

<br />

### **Further Reading:**

[Functional Programming](https://link.medium.com/vHX7Nzr8o)

[Programming Paradigms](https://www.geeksforgeeks.org/introduction-of-programming-paradigms/)

### **Video links:**

[Learning functional programming (JS conf)](https://www.youtube.com/watch?v=e-5obm1G_FY)

[Fun fun function's playlist](https://www.youtube.com/playlist?list=PL0zVEGEvSaeEd9hlmCXrk5yUyqUag-n84)

<br />

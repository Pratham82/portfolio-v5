---
title: How Delete Buttons Work in Dynamic Todo Lists
date: 2025-06-26
description: Understand how JavaScript closures allow each delete button to target the correct element in a dynamic list.
tags: ["javascript", "closures", "vanilla-js", "frontend", "post"]
author: pratham82
subTitle: How closures make delete buttons smart in JavaScript
---

When building a simple Todo app using **vanilla JavaScript**, one common question that comes up is:

> **“If I have multiple todos, how does each delete button know which `<li>` to remove?”**

Let’s break it down with a real example, code walkthrough, and a clear explanation of the JavaScript magic — **closures** — that make this possible.

---

### ✅ The Goal

We’re building a dynamic list where each todo item is added like this:

```html
<li>Buy Milk <button>X</button></li>
```

Clicking the ❌ button should remove only that specific `<li>` item — even when there are multiple in the list.

---

### 🛠️ HTML Setup

Here’s the basic HTML:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>JavaScript Sandbox</title>
    <meta charset="UTF-8" />
  </head>

  <body>
    <h1>Vanilla JS Practice</h1>

    <h2>Todo App</h2>
    <div id="todoContainer">
      <input id="todoInput" placeholder="Enter Todo here" type="text" />
      <button id="todoBtn">Add Todo</button>
    </div>

    <ul id="todoList"></ul>

    <script src="./index.js"></script>
  </body>
</html>
```

---

### 💡 JavaScript Code

```js
console.log({
  msg: "Hello from script",
});

// capture elements
const todoBtn = document.getElementById("todoBtn");
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");

// function to generate a random 3-digit ID
const getRandomId = () => {
  return Math.floor(100 + Math.random() * 900);
};

// Add event listener to "Add Todo" button
todoBtn.addEventListener("click", () => {
  const currentInputText = todoInput.value;
  if (!currentInputText) return;

  // create new <li>
  const todoItem = document.createElement("li");
  todoItem.id = getRandomId();

  // create delete button
  const deletBtn = document.createElement("button");
  deletBtn.textContent = "X";
  deletBtn.style.cssText = "margin-left:10px";

  // ⛔️ here's the magic: this delete button "remembers" its todoItem
  deletBtn.addEventListener("click", () => {
    console.log("Delete clicked:", todoItem.id);
    todoItem.remove(); // removes *only this specific* <li>
  });

  // assemble and render
  todoItem.textContent = currentInputText.trim();
  todoItem.appendChild(deletBtn);
  todoList.appendChild(todoItem);
  todoInput.value = "";
});
```

---

### 🤯 How Does Each Delete Button Know Which `<li>` to Delete?

Even though all delete buttons are created inside the same event listener, **each delete button gets a unique reference to the `<li>` it was created with**.

That’s because of how **JavaScript closures** work.

> A closure is when a function “remembers” the variables from its outer scope — even after that outer function has finished executing.

So in our case:

```js
deletBtn.addEventListener("click", () => {
  todoItem.remove(); // this closure "remembers" the specific todoItem
});
```

Each ❌ button **closes over** the `todoItem` that was in memory at the time of creation. That means every button knows **exactly** which list item it belongs to.

---

### 🔁 Multiple Items? Still Works!

Let's say you add these todos:

1. Buy milk → `<li id="item-101">`
2. Walk dog → `<li id="item-202">`
3. Read book → `<li id="item-303">`

Each of their delete buttons was created **inside a separate click event**, each with its own `todoItem`. So when you click any ❌, **only that specific `<li>` is removed**.

---

### 🧠 What You’ve Learned

✅ How to create a dynamic list using vanilla JS  
✅ How to attach delete buttons to each item  
✅ Why JavaScript closures make it all work

---

## 💬 Want to Go Further?

If you're building more advanced apps, you might want to:

- Use **event delegation** for better performance
- Add **localStorage** to save todos
- Add **editing** or **completion** checkboxes

Let me know in the comments or reach out on [Twitter](https://twitter.com/Pratham_82) if you want a follow-up post on that!

---

### 🔗 Final Thoughts

This is a perfect example of how **understanding JavaScript fundamentals like closures** can help you write cleaner and more powerful code — even without a framework.

Happy hacking! 🧠✨

What is a Closure?

👉 **Definition (simple):**

> A closure is a function that remembers variables from its outer scope even after the outer function has finished executing.

---

# 🔹 In simple words

👉 A function “remembers” the environment where it was created 🧠

---

# 🔥 Basic Example

```js
function outer() {
  let count = 0;

  function inner() {
    count++;
    console.log(count);
  }

  return inner;
}

const fn = outer();

fn(); // 1
fn(); // 2
fn(); // 3
```

---

# 🔹 What’s happening here?

### Step-by-step:

1. `outer()` runs
2. It creates variable:

   ```js
   count = 0
   ```
3. Returns `inner` function
4. Normally `outer` should be removed from memory ❌

👉 BUT because of **closure**:

* `inner` still has access to `count` ✅

---

# 🔥 Key Insight

👉 Even after `outer()` is finished:

```js
fn();
```

👉 Still remembers:

```js
count
```

---

# 🔥 Real-Life Analogy

👉 Think like:

> You leave a room, but take a **memory note** with you

---

# 🔥 Example 2 (Interview Favorite)

```js
function createCounter() {
  let count = 0;

  return function () {
    return ++count;
  };
}

const counter = createCounter();

console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3
```

👉 `count` is **private variable** 🔒

---

# 🔥 Example 3 (Very Important – setTimeout)

```js
for (var i = 1; i <= 3; i++) {
  setTimeout(() => {
    console.log(i);
  }, 1000);
}
```

### Output:

```text
4
4
4
```

👉 Why?

* `var` shares same scope
* closure captures same `i`

---

# ✅ Fix using closure

```js
for (let i = 1; i <= 3; i++) {
  setTimeout(() => {
    console.log(i);
  }, 1000);
}
```

### Output:

```text
1
2
3
```

---

# 🔥 Example 4 (Your debounce uses closure!)

```js
function debounce(fn, delay) {
  let timer; // 👈 closure

  return function () {
    clearTimeout(timer);
    timer = setTimeout(fn, delay);
  };
}
```
how to see my text exact which produce by chat gpt?

👉 `timer` is remembered between calls
👉 That’s closure in action 🔥
how to see my text exact which produce by chat gpt?how to see my text exact which produce by chat gpt?
---

# 🔥 Why Closure is Useful

### ✅ 1. Data Privacy

```js
let count = 0; // private
```

---

### ✅ 2. Maintain State

```js
counter keeps increasing
```

---

### ✅ 3. Used in:

* Debounce 🔥
* Throttle
* Event handlers
* React hooks

---

# 🔥 Interview Definition

> “Closure is a function that has access to its lexical scope even after the outer function has executed.”

---

# 🚀 Final Summary

* Function remembers outer variables 🧠
* Even after outer function ends
* Used to store state and create private variables

---

# 🔥 One-Line Understanding

👉 Closure =
**Function + its remembered environment**

---

If you want next 🔥
I can give:

* Advanced closure interview questions
* Tricky output-based questions
* Closure in React (useEffect/useState connection)

Just tell me 👍




How code get execute inside Event browser
Promise.resolve()
  .then(() => console.log(1));

setTimeout(() => console.log(2), 10);

queueMicrotask(() => {
  console.log(3)
  queueMicrotask(() => console.log(4))
});

console.log(5);






// example of shallow copy
const user={
  "name":"Mahesh Kumawat",
  "email":"mahikumawat121998@gmail.com",
  address:{
    "addressLine":"New Janta Colony Piprali Road Sikar",
    "country":"India",
  }
}

// const copy={...user};
const copy=JSON.parse(JSON.stringify(user))
copy.name="shubham",
copy.address.country="Australia";
console.log("copy2",copy);
console.log("user1",user);



// example  deep copy

const original = {
  name: "Mahesh",
  address: {
    city: "Sikar"
  }
};

const deepCopy = JSON.parse(JSON.stringify(original));
deepCopy.address.city = "Jaipur";

console.log(original.address.city); // Sikar ✅ (unchanged)
console.log(deepCopy.address.city);




BrainStorming Question


const details={
  accountNumber:"123123"
}

function currying(a){
  let user={
    name:"Mahesh",
    suername:"Kumawat"
  }
  let self=this
  console.log(`${this.accountNumber}`)
  return {
    // increment:function(b){
      // return `${a+b} ${user.name} ${self.accountNumber}`;
    //   return `${a+b} ${user.name} ${self.accountNumber}`;
    // },
    increment:(b)=>{
      // return `${a+b} ${user.name} ${self.accountNumber}`;
      return `${a+b} ${user.name} ${this.accountNumber}`;
    },
    decrement:function(b){
      return a-b;
    }
  }
}
const x=currying.call(details,5);
const y=x.increment(10)
let result = y;
console.log(result);





Question : What is the difference between Object.seal() and Object.freeze() method in Object.
# Difference Between `Object.seal()` and `Object.freeze()`

Both methods are used to restrict modifications to objects in JavaScript.

But they behave differently.

---

# 1. Object.seal()

`Object.seal()`:

* Prevents adding new properties
* Prevents deleting properties
* Allows modifying existing property values

---

## Example

```javascript id="8hm0lu"
const user = {
  name: "Mahesh",
  age: 25
};

Object.seal(user);

// Allowed
user.name = "Raj";

// Not allowed
user.city = "Sikar";

// Not allowed
delete user.age;

console.log(user);
```

---

## Output

```javascript id="ljlwm1"
{
  name: "Raj",
  age: 25
}
```

---

# What Seal Prevents

| Operation             | Allowed? |
| --------------------- | -------- |
| Update existing value | ✅ Yes    |
| Add new property      | ❌ No     |
| Delete property       | ❌ No     |

---

# 2. Object.freeze()

`Object.freeze()`:

* Prevents adding properties
* Prevents deleting properties
* Prevents modifying existing values

Object becomes almost immutable.

---

## Example

```javascript id="qjlwm2"
const user = {
  name: "Mahesh",
  age: 25
};

Object.freeze(user);

// Not allowed
user.name = "Raj";

// Not allowed
user.city = "Sikar";

// Not allowed
delete user.age;

console.log(user);
```

---

## Output

```javascript id="jlwm3v"
{
  name: "Mahesh",
  age: 25
}
```

No changes happen.

---

# Main Difference

| Feature               | Object.seal() | Object.freeze() |
| --------------------- | ------------- | --------------- |
| Add property          | ❌ No          | ❌ No            |
| Delete property       | ❌ No          | ❌ No            |
| Modify existing value | ✅ Yes         | ❌ No            |

---

# Important Interview Point

Both methods are **shallow**.

Nested objects can still change.

---

# Example

```javascript id="jlwm4x"
const user = {
  name: "Mahesh",
  address: {
    city: "Sikar"
  }
};

Object.freeze(user);

user.address.city = "Jaipur";

console.log(user.address.city);
```

---

## Output

```text id="jlwm5y"
Jaipur
```

Because freeze is shallow.

---

# Deep Freeze Example

```javascript id="jlwm6z"
function deepFreeze(obj) {
  Object.keys(obj).forEach(key => {
    if (typeof obj[key] === "object" && obj[key] !== null) {
      deepFreeze(obj[key]);
    }
  });

  return Object.freeze(obj);
}
```

---

# Internal Behavior

# Object.seal()

Internally:

```javascript id="jlwm7a"
configurable: false
```

But:

```javascript id="jlwm8b"
writable: true
```

---

# Object.freeze()

Internally:

```javascript id="jlwm9c"
configurable: false
writable: false
```

---

# Check If Object Is Frozen or Sealed

## isSealed()

```javascript id="jlwm0d"
Object.isSealed(obj);
```

---

## isFrozen()

```javascript id="jlwm1e"
Object.isFrozen(obj);
```

---

# Real-World Usage

# Use Object.seal()

When:

* Structure should remain fixed
* Values can still update

Example:

* User schema object
* Config object

---

# Use Object.freeze()

When:

* Data must never change
* Immutable constants needed

Example:

* Redux state constants
* App configuration
* Enum-like objects

---

# Interview Answer

> `Object.seal()` prevents adding or deleting properties but allows modification of existing properties.
>
> `Object.freeze()` prevents adding, deleting, and modifying properties, making the object immutable at the top level. Both methods work shallowly, meaning nested objects can still be modified unless deep freezing is implemented.








Question:What is the use case of Object.hasOwn() property in Js?

# `Object.hasOwn()` in JavaScript

`Object.hasOwn()` is a static method in JavaScript used to check whether an object contains a specific property directly on itself.

It checks:

* own properties
* NOT inherited properties

---

# Syntax

```javascript id="1o3z0h"
Object.hasOwn(object, property)
```

---

# Example

```javascript id="s8vjlwm"
const user = {
  name: "Mahesh",
  age: 25
};

console.log(Object.hasOwn(user, "name"));
console.log(Object.hasOwn(user, "city"));
```

---

# Output

```text id="jlwmg1"
true
false
```

---

# Why We Use It

Sometimes objects inherit properties from prototypes.

`Object.hasOwn()` helps distinguish:

* own properties
* inherited properties

---

# Example With Prototype

```javascript id="jlwmg2"
const parent = {
  country: "India"
};

const child = Object.create(parent);

child.name = "Mahesh";

console.log(Object.hasOwn(child, "name"));
console.log(Object.hasOwn(child, "country"));
```

---

# Output

```text id="jlwmg3"
true
false
```

Because:

* `name` belongs directly to `child`
* `country` comes from prototype

---

# Difference Between `in` Operator and `Object.hasOwn()`

| Feature                     | `in` | `Object.hasOwn()` |
| --------------------------- | ---- | ----------------- |
| Checks own properties       | ✅    | ✅                 |
| Checks inherited properties | ✅    | ❌                 |

---

# Example

```javascript id="jlwmg4"
const parent = {
  country: "India"
};

const child = Object.create(parent);

child.name = "Mahesh";

console.log("name" in child);
console.log("country" in child);

console.log(Object.hasOwn(child, "country"));
```

---

# Output

```text id="jlwmg5"
true
true
false
```

---

# Older Alternative

Before `Object.hasOwn()` developers used:

```javascript id="jlwmg6"
obj.hasOwnProperty("key")
```

Example:

```javascript id="jlwmg7"
user.hasOwnProperty("name");
```

---

# Why `Object.hasOwn()` Is Better

Because `hasOwnProperty()` can fail if object overrides it.

---

# Problem Example

```javascript id="jlwmg8"
const obj = {
  hasOwnProperty: () => false,
  name: "Mahesh"
};

console.log(obj.hasOwnProperty("name"));
```

Wrong output.

---

# Safe Solution

```javascript id="jlwmg9"
Object.hasOwn(obj, "name");
```

Reliable and modern.

---

# Real-World Use Cases

# 1. API Response Validation

```javascript id="jlwmh0"
if (Object.hasOwn(response, "token")) {
  console.log("Token exists");
}
```

---

# 2. Looping Objects Safely

```javascript id="jlwmh1"
for (let key in user) {
  if (Object.hasOwn(user, key)) {
    console.log(key);
  }
}
```

Prevents inherited properties from appearing.

---

# Important Interview Point

`Object.hasOwn()`:

* safer
* modern replacement
* avoids prototype issues

---

# Interview Answer

> `Object.hasOwn()` is a static JavaScript method used to check whether a property exists directly on an object rather than being inherited through the prototype chain. It is a safer and modern alternative to `hasOwnProperty()`.















const add = (a, b) => a + b;
console.log("Arrow Function:", add(10, 20));

function greet(name, callback) {
  console.log("Hello " + name);
  callback();
}

greet("Teja", () => console.log("Callback executed"));

let promise = new Promise((resolve) => {
  resolve("Promise resolved");
});
promise.then((msg) => console.log(msg));

async function display() {
  let message = await new Promise((resolve) => {
    resolve("Hello Bro!");
  });

  console.log(message);
}

display();

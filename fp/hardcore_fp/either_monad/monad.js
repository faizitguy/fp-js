// what is a monad
// monad => a single unit
// Monad is best thought of as a container of a value like arrays, objects

// Identity Monad

const Identity = (x) => ({
  emit: () => x, // emit the value contained within.
  map: (f) => Identity(f(x)),
  chain: (f) => f(x), // flatMap,bind (which is intended to chain various monads together)
});

const one = Identity(1);
console.log(one.chain((a) => a + 2));

// map is the most important method. This is what makes monads so useful:
// we can take an established monad Identity(1) and through a function, generate Identity(2)
// without any mutation of our example constant one.

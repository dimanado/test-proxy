const NumberArray = new Proxy(Array, {
  construct(target, [args]) {
    args.forEach(arg => {
      if (typeof arg !== 'number') {
        throw "Значение должно быть числом";
      }
    });

    return new Proxy(new target(...args), {
      set(target, prop, val) {
        if (typeof val === 'number') {
          target[prop] = val;
          return true;
        } else {
          throw "Значение должно быть числом";
        }
      }
    })
  }
});

const newArray = new NumberArray([1, 2]);

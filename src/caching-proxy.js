console.log(forge);
const sum = (a, b) => {
  console.log('function was called');
  return a + b;
};

// добавить ограничение на число элементов в кеше
const cachingProxy = (target) => {
  const cache = {};

  return new Proxy(target, {
    apply(target, thisArg, args) {
      const md = forge.md.sha256.create();
      md.update(args);
      const hex = md.digest().toHex();

      const funResult = cache[hex];

      if (funResult) {
        return funResult;
      } else {
        const resultToCache = Reflect.apply(target, thisArg, args);
        cache[hex] = resultToCache;
        return resultToCache;
      }
    }
  });
};

const cachingSum = cachingProxy(sum);

const withHiddenProps = (target, prefix = '_') => {
  return new Proxy(target, {
    has: (obj, prop) => Reflect.has(obj, prop) && !prop.startsWith(prefix),
    ownKeys: obj => Reflect.ownKeys(obj).filter(p => !p.startsWith(prefix)),
    get: (obj, prop, receiver) => {
      if (prop in receiver) {
        return Reflect.get(obj, prop, receiver);
      } else {
        throw "Невозможно получить значение";
      }
    },
    set: (obj, prop, val, receiver) => {
      if (prop in receiver) {
        return Reflect.set(obj, prop, val, receiver);
      } else {
        throw "Невозможно сохранить значение";
      }
    }
  })
};

const data = withHiddenProps({
  name: 'Name',
  age: 25,
  _uid: '1231231'
});

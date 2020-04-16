const camelCase = (str) => (str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase()));
const snakeCase = (str) => (str.split(/(?=[A-Z])/).join('_').toLowerCase());

const toLowerCamelCase = (target) => {
  return new Proxy(target, {

    get: (obj, prop) => {
      if (prop in obj) {
        return obj[prop];
      } else {
        const snakeCaseProp = snakeCase(prop);

        if (snakeCaseProp in obj) {
          return obj[snakeCaseProp]
        }

        return void 0;
      }
    },

    has: (obj, prop) => {
      const snakeCaseProp = snakeCase(prop);
      if (snakeCaseProp in obj) {
        return true;
      }

      return obj[prop];
    },

    ownKeys: (obj) => {
      const keys = new Set(Reflect.ownKeys(obj));

      Reflect.ownKeys(obj).forEach((key) => {
        const camelCaseProp = camelCase(key);
        keys.add(camelCaseProp);
      });

      return Array.from(keys);
    },

    getOwnPropertyDescriptor(obj, prop) {
      if (prop in obj) {
        return Object.getOwnPropertyDescriptor(obj, prop)
      } else {
        const snakeCaseProp = snakeCase(prop);

        if (snakeCaseProp in obj) {
          return {
            enumerable: true,
            configurable: true,
            value: obj[snakeCaseProp]
          }
        }

        return void 0;
      }
    }
  })
};

const rubyObject = {
  first_name: 'Name',
  last_name: 'Last',
  age: 25
};

const data = toLowerCamelCase(rubyObject);

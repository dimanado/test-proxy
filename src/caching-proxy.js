const cachingProxy = (target, limit = 3) => {
    const cache = new CacheWithLimit(limit);

    return new Proxy(target, {
        apply(target, thisArg, args) {
            const md = forge.md.sha256.create();
            md.update(args);
            const hex = md.digest().toHex();

            const funResult = cache.get(hex);

            if (funResult) {
                return funResult;
            } else {
                const resultToCache = Reflect.apply(target, thisArg, args);
                cache.append(hex, resultToCache);
                return resultToCache;
            }
        }
    });
};

const sum = (a, b) => {
    console.log('function was called');
    return a + b;
};

const cachingSum = cachingProxy(sum); // you can provide the second argument to change cache limit by default it's 3
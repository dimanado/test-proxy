var Benchmark = require('benchmark');
var get = require('lodash/get');

var suite = new Benchmark.Suite;

var obj = {
    faz: {
        baz: {
            bar: '',
        }
    }
};

var _obj = {
    faz: {
        baz: {
            bar: '',
        }
    }
};

var proxy = new Proxy(_obj, {
    get: (target, property) => {
        target[property] = (property in target) ? target[property] : {};
        if (typeof target[property] === 'object') {
            return new Proxy(target[property], handler);
        }
        return target[property];
    }
});


suite.
add('vanilla', function() {
    obj.faz.baz.bar;
}).
add('proxy', function() {
    proxy.prop = 5;
}).
add('lodash', function() {
    get(_obj, 'faz.baz.bar');
}).
on('cycle', function(event) {
    console.log(String(event.target));
}).
on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
}).
run();

/* 
vanilla x 737,690,116 ops/sec ±0.30% (93 runs sampled)
proxy x 2,345,496 ops/sec ±2.11% (92 runs sampled)
lodash x 4,983,966 ops/sec ±2.17% (87 runs sampled)
Fastest is vanilla 
*/
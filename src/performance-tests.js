var Benchmark = require('benchmark');

var suite = new Benchmark.Suite;

var obj = {};

var _obj = {};
var proxy = new Proxy(_obj, {
    set: (obj, prop, value) => { _obj[prop] = value; }
});

var defineProp = {};
Object.defineProperty(defineProp, 'prop', {
    configurable: false,
    set: v => defineProp._v = v
});

suite.
add('vanilla', function() {
    obj.prop = 5;
}).
add('proxy', function() {
    proxy.prop = 5;
}).
add('defineProperty', function() {
    defineProp.prop = 5;
}).
on('cycle', function(event) {
    console.log(String(event.target));
}).
on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
}).
run();

// vanilla x 727,461,548 ops/sec ±0.72% (94 runs sampled)
// proxy x 28,399,789 ops/sec ±1.81% (89 runs sampled)
// defineProperty x 695,943,411 ops/sec ±2.72% (90 runs sampled)
// Fastest is vanilla
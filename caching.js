var fibonacci = function() {
    var cache = [0, 1];
    var fib = function(n) {
        var res = cache[n];
        if ( typeof res !== 'number' ) {
            res = fib(n-1) + fib(n-2);
            cache[n] = res;
        }
        return res; 
    };
    return fib;
}();

console.log(fibonacci(5));

function fibonacci_iter(n) {
    var a = 0, b = 1;
    return function() {
        for(var i = 0; i < n; i++) {
            var tmp = b;
            b = b + a;
            a = tmp;
        }

        return a;
    }();
};

console.log(fibonacci_iter(5));

var memoize = function(initial, f) {
    var shell = function(n) {
        var result = initial[n];
        if ( typeof result !== 'number' ) {
            result = f(shell, n);
            initial[n] = result;
        }
        return result;
    };
    return shell;
};

var fibomem = memoize([0,1], function (f, n) {
    return f(n-1) + f(n-2);
});
console.log(fibomem(5));

var factmem = memoize([1,1], function(f,n) { return n * f(n-1); });
console.log(factmem(5));

var lucasmem = memoize([2,1], function(f,n) { return f(n-1) + f(n-2); });
console.log(lucasmem(5));

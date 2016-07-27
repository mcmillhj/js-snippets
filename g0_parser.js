// Parses simple arithmetic expressions
// E -> E + T
//    | E - T
//    | T
//
// T -> T * F 
//    | T / F 
//    | F
//
// F -> '(' E ')'
//    | [+-] [0-9]
//    | [+-] [a-z]

var buffer  = "+a + -b * c / +d + -5 * +7 + (a * -3 * 7 + 2)".split(''),
    current = 0,
    token   = buffer[current];

function expect(t) {
    if ( token == t ) {
        consume(); 
    }
    else {
        throw "Expected '" + t + "', but saw '" + token + "' at column " + current;;
    }
}

function consume() {
    while ( (token = buffer[++current]) == ' ' ) {}    
}

function E() {
    T();
    while ( token == '+' || token == '-' ) {
        consume();
        T();
    }
}

function T() {
    F();
    while ( token == '*' || token == '/' ) {
        consume();
        F();
    }
}

function F() {
    if ( token == '(' ) {
        consume();
        E();
        expect(')');
    }
    else if ( token == '-' || token == '+' ) {
        consume();
        if ( isDigit(token) || isLetter(token) ) {
            consume();
        }
        else {
            throw "Expected 0-9 or a-z after unary '+'/'-' but saw '" + token + "' at column " + current;
        }
    }
    else if ( isDigit(token) || isLetter(token) ) {
        consume();
    }
    else {
        throw "Expected 0-9, 'a'-'z' or '(' but saw '" + token + "' at column " + current;
    }
}

function isDigit(t) {
    return t >= '0' && t <= '9';
}

function isLetter(t) {
    return t >= 'a' && t <= 'z';
}

try {
    E();
    console.log("Expression " + buffer.join('') + " was a valid arithmetic expression");
}
catch (e) {
    console.log(e);
    console.log("Expression " + buffer.join('') + " was NOT a valid arithmetic expression");
}

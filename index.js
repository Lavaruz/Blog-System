const str = 'first\nsecond\r\nthird';

const result = str.split(/\r?\n/);

console.log(result);
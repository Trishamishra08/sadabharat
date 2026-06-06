const fs = require('fs');
const code = fs.readFileSync('src/components/admin/AdminProducts.jsx', 'utf8');

let stack = [];
let inString = false;
let stringChar = '';

for (let i = 0; i < code.length; i++) {
  const c = code[i];
  if (inString) {
    if (c === stringChar && code[i-1] !== '\\') inString = false;
  } else {
    if (c === '"' || c === "'" || c === "`") {
      inString = true;
      stringChar = c;
    } else if (c === '(') {
      stack.push({ char: '(', pos: i });
    } else if (c === ')') {
      if (stack.length > 0 && stack[stack.length - 1].char === '(') stack.pop();
      else console.log('Unmatched ) at pos', i);
    } else if (c === '{') {
      stack.push({ char: '{', pos: i });
    } else if (c === '}') {
      if (stack.length > 0 && stack[stack.length - 1].char === '{') stack.pop();
      else console.log('Unmatched } at pos', i);
    } else if (c === '[') {
      stack.push({ char: '[', pos: i });
    } else if (c === ']') {
      if (stack.length > 0 && stack[stack.length - 1].char === '[') stack.pop();
      else console.log('Unmatched ] at pos', i);
    } else if (c === '<') {
      // Very naive check for tags just to see if we're unbalanced inside JSX
      // Actually JSX parsing is much more complex
    }
  }
}
console.log('Unmatched symbols remaining:', stack.map(s => s.char));

// Print a small snippet around the first unmatched symbol
if (stack.length > 0) {
  const first = stack[stack.length - 1]; // Let's check the LAST pushed (deepest unclosed)
  const context = code.slice(Math.max(0, first.pos - 50), Math.min(code.length, first.pos + 50));
  console.log('Context of deepest unclosed symbol:', context);
}

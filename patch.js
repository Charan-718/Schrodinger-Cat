const fs = require('fs');
const file = 'src/components/HeroSection.js';
let code = fs.readFileSync(file, 'utf8');

// The file accidentally got literal backslashes escaping the backticks and dollar signs.
// We remove the escaping backslashes to restore normal React template literals.
code = code.replace(/\\`/g, '`');
code = code.replace(/\\\$/g, '$');

fs.writeFileSync(file, code);
console.log('Fixed syntax escapes in HeroSection.js');

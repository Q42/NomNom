const fs = require('fs');

const existingOutput = JSON.parse(fs.readFileSync('./output.json')) || [];
console.log('current items length', existingOutput.length);

const BLOCK_LIST = [
  '&',
  'met',
  'en',
  'in',
  'van'
];

const newOutput = existingOutput.map(recipe => {
  return {
    ...recipe,
    keywords: recipe.title.split(' ').map(x => x.replace(',', '').toLowerCase()).filter(x => x && !BLOCK_LIST.includes(x))
  };
});

console.log('new output', newOutput.slice(0, 10));

fs.writeFileSync('./output-keywords.json', JSON.stringify(newOutput));
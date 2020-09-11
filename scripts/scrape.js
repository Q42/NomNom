const fs = require('fs');
const cheerio = require('cheerio');
const $ = cheerio.load(fs.readFileSync('./source.html'));

const BASE_URL = 'https://ah.nl';
const SOURCE_IMAGE_DIMENSIONS = '445x297';
const IMAGE_DIMENSIONS = '890x594';

const existingOutput = JSON.parse(fs.readFileSync('./output.json')) || [];
console.log('current items length', existingOutput.length);

$('#items-wrapper .item').toArray().map(item => {
  const el = $(item);
  const id = el.attr('data-id');
  if (existingOutput.some(x => x.id === id)) {
    console.log('duplicate:', id);
    return;
  }

  existingOutput.push({
    id,
    title: el.find('header h4 a').text().replace(/\u00AD/g,''),
    imageUrl: el.find('figure img').attr('data-src').replace(SOURCE_IMAGE_DIMENSIONS, IMAGE_DIMENSIONS),
    url: `${BASE_URL}${el.find('figure a').attr('href')}`
  });
});

console.log('new items length', existingOutput.length);
fs.writeFileSync('./output.json', JSON.stringify(existingOutput));
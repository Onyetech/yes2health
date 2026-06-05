const fs = require('fs');

const file = 'c:/Users/ikenna.okonkwo/OneDrive - Interswitch Limited/Desktop/JAMLOCK/Quantun product/index.html';
let content = fs.readFileSync(file, 'utf8');

// The regex will look for the price-container and swap the old-price-wrapper and the new-price-text div.
const regex = /(<div class="price-container price-inline">\s*)(\s*<div class="old-price-wrapper">[\s\S]*?<\/div>\s*)(\s*<div class="product-price-standalone new-price-text">.*?<\/div>\s*)/g;

let matchCount = 0;
const newContent = content.replace(regex, (match, container, oldPrice, newPrice) => {
    matchCount++;
    return container + newPrice + oldPrice;
});

console.log(`Replaced ${matchCount} occurrences.`);

if (matchCount > 0) {
    fs.writeFileSync(file, newContent, 'utf8');
}

const fs = require('fs');
const file = 'c:/Users/ikenna.okonkwo/OneDrive - Interswitch Limited/Desktop/JAMLOCK/Quantun product/index.html';
let content = fs.readFileSync(file, 'utf8');

// Find all buttons that match and replace
const regex = /<button class="product-link order-btn order-btn-standalone"([^>]*)>\s*Order Now\s*<svg[\s\S]*?<\/svg>\s*<\/button>/g;

let matchCount = 0;
const newContent = content.replace(regex, (match, attrs) => {
    matchCount++;
    return `<button class="order-btn-standalone order-btn pulse-soft"${attrs}>Order Now</button>`;
});

console.log(`Replaced ${matchCount} button occurrences in index.html`);
if (matchCount > 0) {
    fs.writeFileSync(file, newContent, 'utf8');
}

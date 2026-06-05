const fs = require('fs');
const file = 'c:/Users/ikenna.okonkwo/OneDrive - Interswitch Limited/Desktop/JAMLOCK/Quantun product/index.html';
let html = fs.readFileSync(file, 'utf8');

const regex = /(<div class="price-container price-inline">[\s\S]*?)(\s*<\/div>)(\s*<button class="order-btn-standalone order-btn pulse-soft"[^>]*>Order Now<\/button>)/g;

let count = 0;
html = html.replace(regex, (match, p1, p2, p3) => {
    count++;
    return p1 + p3 + p2;
});

console.log(`Moved ${count} buttons inside price-inline.`);
fs.writeFileSync(file, html, 'utf8');

// Also update CSS for .price-inline to allow wrapping
const cssFile = 'c:/Users/ikenna.okonkwo/OneDrive - Interswitch Limited/Desktop/JAMLOCK/Quantun product/css/styles.css';
let css = fs.readFileSync(cssFile, 'utf8');
css = css.replace(/\.price-inline\s*\{[\s\S]*?\}/g, (match) => {
    return match.replace(/flex-wrap:\s*nowrap;/g, 'flex-wrap: wrap;');
});
fs.writeFileSync(cssFile, css, 'utf8');

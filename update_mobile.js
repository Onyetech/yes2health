const fs = require('fs');
const file = 'c:/Users/ikenna.okonkwo/OneDrive - Interswitch Limited/Desktop/JAMLOCK/Quantun product/css/styles.css';
let css = fs.readFileSync(file, 'utf8');

// The goal is to ensure order-btn-standalone has width: 100% on mobile so it forces a break, and width: auto on desktop.
// Let's just append the necessary overrides at the very end to win specificity.

css += `
/* Force button to new line on mobile */
@media (max-width: 767px) {
    .order-btn-standalone {
        width: 100%;
        margin-top: 10px;
    }
}
@media (min-width: 768px) {
    .order-btn-standalone {
        width: auto;
        margin-top: 0;
    }
}
`;

fs.writeFileSync(file, css, 'utf8');

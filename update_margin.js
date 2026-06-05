const fs = require('fs');
const file = 'c:/Users/ikenna.okonkwo/OneDrive - Interswitch Limited/Desktop/JAMLOCK/Quantun product/css/styles.css';
let css = fs.readFileSync(file, 'utf8');

css += `
@media (min-width: 768px) {
    .price-inline {
        width: 100%;
    }
    .order-btn-standalone {
        margin-left: auto;
    }
}
`;

fs.writeFileSync(file, css, 'utf8');

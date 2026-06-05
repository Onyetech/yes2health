const fs = require('fs');

const file = 'c:/Users/ikenna.okonkwo/OneDrive - Interswitch Limited/Desktop/JAMLOCK/Quantun product/css/styles.css';
let css = fs.readFileSync(file, 'utf8');

// Replace the old .order-btn-standalone and its hover completely
const regex = /\.order-btn-standalone\s*\{[\s\S]*?\}\s*\.order-btn-standalone:hover\s*\{[\s\S]*?\}/g;
css = css.replace(regex, '');

// Append the new styles
const newStyles = `

.product-action-column {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
    margin-top: 15px;
    width: 100%;
}
@media (min-width: 768px) {
    .product-action-column {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        gap: 10px;
    }
}

.order-btn-standalone {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: var(--gold-gradient, linear-gradient(135deg, #e5c158 0%, #d4af37 100%));
    color: #111827 !important;
    padding: 10px 20px;
    border-radius: 50px;
    font-size: 0.85rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    border: none;
    box-shadow: 0 4px 15px rgba(212, 175, 55, 0.4);
    transition: all 0.3s ease;
    cursor: pointer;
    white-space: nowrap;
}

.order-btn-standalone:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(212, 175, 55, 0.6);
}
`;

fs.writeFileSync(file, css + newStyles, 'utf8');

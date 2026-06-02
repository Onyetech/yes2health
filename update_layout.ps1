$html = Get-Content 'index.html' -Raw

$html = $html -replace '<div class="product-action-row" style="display: flex; align-items: center; justify-content: flex-start; gap: 1.2rem; margin-top: 1rem;">', '<div class="product-action-row action-row-inline">'
$html = $html -replace '<div class="price-container" style="display: flex; flex-direction: column;">', '<div class="price-container price-inline">'
$html = $html -replace '<div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.2rem;">', '<div class="old-price-wrapper">'
$html = $html -replace 'style="font-size: 0.9rem; color: #9ca3af; text-decoration: line-through;"', 'class="old-price-text"'
$html = $html -replace 'style="background: rgba\(239, 68, 68, 0\.15\); color: #ef4444; border: 1px solid #ef4444; font-size: 0\.65rem; font-weight: 700; padding: 0\.15rem 0\.4rem; border-radius: 4px;"', 'class="discount-badge"'
$html = $html -replace 'style="font-weight: 800; font-size: 1\.4rem; color: #eab308; line-height: 1;"', 'class="new-price-text"'
$html = $html -replace 'style="font-weight: 800; font-size: 1\.1rem; color: #eab308; line-height: 1;"', 'class="new-price-text"'
$html = $html -replace 'style="margin: 0; padding: 0.8rem 1.5rem;"', 'class="order-btn-inline"'

$html | Set-Content 'index.html'

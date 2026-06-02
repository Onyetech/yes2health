$html = Get-Content 'index.html' -Raw
$html = $html -replace 'class="product-price-standalone" class="new-price-text"', 'class="product-price-standalone new-price-text"'
$html = $html -replace 'class="product-link order-btn" (data-product="[^"]*") (data-price="[^"]*") class="order-btn-inline"', 'class="product-link order-btn order-btn-inline" $1 $2'
$html | Set-Content 'index.html'

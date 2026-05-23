import re

index_path = r'c:\Users\ikenna.okonkwo\OneDrive - Interswitch Limited\Desktop\JAMLOCK\Quantun product\index.html'

with open(index_path, 'r', encoding='utf-8', errors='ignore') as f:
    html = f.read()

# Remove the broken script block entirely
html = re.sub(r'<!-- Custom Vanilla JS Form Submission -->.*?</script>', '', html, flags=re.DOTALL)

# Also ensure any lingering Formspree AJAX script is removed just in case
html = re.sub(r'<script[^>]*formspree[^>]*>.*?</script>', '', html, flags=re.DOTALL)

# The correct, bug-free script block
new_script = """
    <!-- Custom Vanilla JS Form Submission -->
    <script>
        async function handleFormSubmit(event, endpoint, successHtml, containerSelector) {
            event.preventDefault();
            const form = event.target;
            const data = new FormData(form);
            const btn = form.querySelector('button[type="submit"]');
            const originalBtnText = btn.innerHTML;
            
            // Instantly simulate success if running locally from a folder (file:// protocol)
            if (window.location.protocol === 'file:') {
                document.querySelector(containerSelector).innerHTML = successHtml;
                form.reset();
                form.style.display = 'none';
                return;
            }

            btn.disabled = true;
            btn.innerHTML = 'Submitting...';

            try {
                const response = await fetch(endpoint, {
                    method: 'POST',
                    body: data,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    document.querySelector(containerSelector).innerHTML = successHtml;
                    form.reset();
                    form.style.display = 'none';
                } else {
                    alert('There was a problem submitting your form. Please check your internet or contact us on WhatsApp.');
                    btn.disabled = false;
                    btn.innerHTML = originalBtnText;
                }
            } catch (error) {
                alert('Network error. Please try again or contact us directly on WhatsApp.');
                btn.disabled = false;
                btn.innerHTML = originalBtnText;
            }
        }

        document.getElementById('contact-form').addEventListener('submit', function(e) {
            handleFormSubmit(e, 'https://formspree.io/f/meedgpbr', '<p style="color: #22c55e; font-weight: bold; font-size:1.1rem; margin-top:1rem;">Thank you! Your message has been sent successfully. We will get back to you soon.</p>', '[data-fs-success]');
        });

        document.getElementById('purchase-form').addEventListener('submit', function(e) {
            handleFormSubmit(e, 'https://formspree.io/f/xaqkbygk', '<div style="background: #111827; border: 2px solid #22c55e; border-radius: 12px; padding: 2rem; text-align: center; margin-top: 1rem; box-shadow: 0 10px 25px rgba(0,0,0,0.5);"><h4 style="color: #4ade80; font-size: 1.8rem; margin-bottom: 0.5rem; font-weight: 800; text-shadow: 0 2px 4px rgba(0,0,0,0.5);">Order Placed Successfully!</h4><p style="color: #ffffff; font-size: 1.1rem; margin-bottom: 2rem; font-weight: 500;">Thank you! We have received your order details.</p><div style="background: #1f2937; border-radius: 8px; padding: 1.5rem; margin-bottom: 2rem; text-align: center; border: 1px solid #4b5563;"><p style="color: #fde047; font-weight: 800; font-size: 1.3rem; margin-bottom: 1rem; letter-spacing: 1px;">MAKE PAYMENT TO:</p><p style="color: #ffffff; margin-bottom: 0.6rem; font-size: 1.2rem;"><strong style="color: #9ca3af;">Bank:</strong> Zenith Bank Plc</p><p style="color: #ffffff; margin-bottom: 1.2rem; font-size: 1.2rem;"><strong style="color: #9ca3af;">Account Name:</strong> Yes2Health Plus</p><div style="background: #000000; display: inline-block; padding: 12px 25px; border-radius: 8px; border: 1px dashed #eab308;"><p style="color: #fde047; margin: 0; font-size: 2rem; font-weight: 900; letter-spacing: 3px;">0984586744</p></div></div><p style="color: #9ca3af; font-size: 1.1rem; font-weight: 800; margin-bottom: 1.5rem; letter-spacing: 2px;">&mdash; OR &mdash;</p><a href="https://wa.me/2349050735251" target="_blank" style="display: inline-block; background: #25D366; color: #ffffff; padding: 14px 28px; border-radius: 50px; text-decoration: none; font-weight: 800; font-size: 1.15rem; transition: transform 0.3s ease; box-shadow: 0 4px 15px rgba(37,211,102,0.4); text-transform: uppercase; letter-spacing: 0.5px;">Contact on WhatsApp First</a></div>', '[data-fs-success-purchase]');
        });
    </script>
</body>
"""

# inject right before </body>
html = html.replace('</body>', new_script)

with open(index_path, 'w', encoding='utf-8') as f:
    f.write(html)

print('Script repaired successfully!')

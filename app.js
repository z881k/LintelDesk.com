/**
 * LINTELDESK — Client Controller
 * Handles Mobile Menu, FAQ Accordion, and Shoppex Post-Purchase Redirects.
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initFaqAccordion();
  handleShoppexRedirectParams();
});

window.addEventListener('hashchange', handleShoppexRedirectParams);

/* Mobile Menu Toggle */
function initMobileMenu() {
  const toggle = document.querySelector('.mobile-toggle');
  const menu = document.querySelector('.nav-menu');

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const isVisible = menu.style.display === 'flex';
      menu.style.display = isVisible ? 'none' : 'flex';
      menu.style.flexDirection = 'column';
      menu.style.position = 'absolute';
      menu.style.top = '72px';
      menu.style.left = '0';
      menu.style.width = '100%';
      menu.style.backgroundColor = 'var(--bg-black)';
      menu.style.padding = '1.5rem';
      menu.style.borderBottom = '1px solid var(--border-subtle)';
      menu.style.gap = '1.25rem';
    });

    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 960) {
          menu.style.display = 'none';
        }
      });
    });
  }
}

/* FAQ Accordion */
function initFaqAccordion() {
  const items = document.querySelectorAll('.faq-item');

  items.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    if (!trigger) return;

    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      items.forEach(i => i.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/* Shoppex Post-Purchase Redirect Handler */
function handleShoppexRedirectParams() {
  let paramsString = '';
  if (window.location.search) {
    paramsString = window.location.search.substring(1);
  } else if (window.location.hash && window.location.hash.includes('?')) {
    paramsString = window.location.hash.substring(window.location.hash.indexOf('?') + 1);
  }

  const urlParams = new URLSearchParams(paramsString);
  const orderId = urlParams.get('order_id') || urlParams.get('order') || urlParams.get('orderId');
  const productId = urlParams.get('product_id') || urlParams.get('product');

  if (orderId || productId) {
    const downloadSection = document.getElementById('download');

    if (downloadSection) {
      const existingBanner = document.getElementById('shoppex-success-banner');
      if (!existingBanner) {
        const banner = document.createElement('div');
        banner.id = 'shoppex-success-banner';
        banner.style.cssText = `
          background: #0A0A0A;
          border: 1px solid #FFFFFF;
          border-radius: var(--radius-md);
          padding: 1.5rem;
          margin-bottom: 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.25rem;
          box-shadow: var(--shadow-card);
        `;
        banner.innerHTML = `
          <div>
            <div style="font-weight: 700; color: #FFFFFF; font-size: 1.0625rem;">
              ✓ Payment Confirmed via Shoppex.io ${orderId ? `(Order #${orderId})` : ''}
            </div>
            <div style="font-size: 0.875rem; color: var(--text-secondary); margin-top: 4px;">
              Thank you for purchasing LintelDesk! Your download is ready below:
            </div>
          </div>
          <a href="./Downoad/LintelDesk%20Setup%201.0.0%20-%20.exe" class="btn btn-primary btn-sm" download style="flex-shrink:0;">
            Download Installer (82.7 MB)
          </a>
        `;
        const downloadCard = document.querySelector('.download-card');
        if (downloadCard) {
          downloadCard.parentNode.insertBefore(banner, downloadCard);
        }
      }

      setTimeout(() => {
        downloadSection.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  }
}

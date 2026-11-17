// Contact clicks indicate intent, not a completed call or confirmed lead.
(() => {
  document.addEventListener('click', (event) => {
    const link = event.target instanceof Element ? event.target.closest('a[href]') : null;
    if (!link) return;

    const url = new URL(link.href, document.baseURI);
    let method;
    if (url.protocol === 'tel:') method = 'phone';
    else if (url.protocol === 'mailto:') method = 'email';
    else if (url.hostname === 'wa.me') method = 'whatsapp';
    else if (url.hostname === 'maps.app.goo.gl') method = 'directions';
    else return;

    const region = link.closest('section, header, footer, .topbar, .mobile-contact');
    const placement = region ? region.id || region.classList[0] || region.tagName.toLowerCase() : 'page';
    // Exclude destination numbers, email addresses and prefilled message text.
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'contact_click',
      contact_method: method,
      contact_placement: placement,
      page_language: document.documentElement.lang || 'en'
    });
    // Preserve native navigation and keyboard activation, even if tags are blocked.
  });
})();

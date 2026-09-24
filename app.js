const menu = document.querySelector('#mobile-menu');
const openButton = document.querySelector('#menu-open');
function closeMenu(){menu.close();}
openButton.addEventListener('click',()=>{menu.showModal();openButton.setAttribute('aria-expanded','true');document.body.classList.add('menu-open');});
document.querySelector('#menu-close').addEventListener('click',closeMenu);
menu.addEventListener('close',()=>{openButton.setAttribute('aria-expanded','false');document.body.classList.remove('menu-open');openButton.focus();});
menu.addEventListener('click',event=>{if(event.target===menu&&event.clientX<menu.getBoundingClientRect().left)closeMenu();});
menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.querySelectorAll('.quick-grid a[href^="#"]').forEach(a=>a.addEventListener('click',()=>{const section=document.querySelector(a.getAttribute('href'));if(section?.tagName==='DETAILS')section.open=true;}));

// Resource actions: confirmed URLs or an honest, useful request dialog.
const resourceDialog = document.querySelector('#resource-dialog');
document.querySelectorAll('[data-resource]').forEach(button => {
  button.addEventListener('click', () => {
    const resource = window.MMT_RESOURCES[button.dataset.resource];
    if (!resource) return;
    if (resource.url && /^https?:\/\//i.test(resource.url)) {
      window.open(resource.url, '_blank', 'noopener,noreferrer');
      return;
    }
    document.querySelector('#resource-title').textContent = resource.title;
    document.querySelector('#resource-contact').href =
      'mailto:marc@mmtfininsurance.com?subject=' + encodeURIComponent(resource.title);
    resourceDialog.showModal();
  });
});
resourceDialog.querySelector('.dialog-close').addEventListener('click', () => resourceDialog.close());
resourceDialog.addEventListener('click', event => { if (event.target === resourceDialog) {
  const bounds = resourceDialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) resourceDialog.close();
}});
document.querySelectorAll('[data-filter]').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-filter]').forEach(item => {
      item.classList.toggle('active', item === button);
      item.setAttribute('aria-pressed', String(item === button));
    });
    document.querySelectorAll('[data-category]').forEach(article => {
      article.hidden = button.dataset.filter !== 'all' && article.dataset.category !== button.dataset.filter;
    });
  });
});
document.querySelectorAll('form[data-request]').forEach(form => {
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const body = `Hello MMT,\n\nI would like to request: ${form.dataset.request}.\n\nName: ${data.get('firstName') || ''}\nEmail: ${data.get('email')}\n`;
    location.href = 'mailto:marc@mmtfininsurance.com?subject=' + encodeURIComponent(form.dataset.request) + '&body=' + encodeURIComponent(body);
  });
});

/* Lightweight script that:
   - Loads config.json
   - Renders header, about, services, projects, contact
   - Handles nav toggle, smooth scroll, dark-mode toggle
   - Handles Learn More toggle and "Enquire" autofill
*/
(() => {
  const cfgUrl = 'config.json';

  // Helpers
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from((ctx || document).querySelectorAll(sel));
  const el = (tag, attrs = {}, children = []) => {
    const n = document.createElement(tag);
    Object.entries(attrs).forEach(([k, v]) => {
      if (k === 'class') n.className = v;
      else if (k === 'html') n.innerHTML = v;
      else n.setAttribute(k, v);
    });
    (Array.isArray(children) ? children : [children]).forEach(c => c && n.appendChild(typeof c === 'string' ? document.createTextNode(c) : c));
    return n;
  };

  // Smooth scroll for nav links (native CSS supports it; fallback)
  document.documentElement.style.scrollBehavior = 'smooth';

  // Toggle mobile nav
  const navToggle = $('#navToggle');
  const mainNav = $('#mainNav');
  navToggle.addEventListener('click', () => {
    const open = mainNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  // Theme toggle
  const themeToggle = $('#themeToggle');
  const body = document.body;
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') body.classList.add('dark');
  themeToggle.addEventListener('click', () => {
    const isDark = body.classList.toggle('dark');
    themeToggle.setAttribute('aria-pressed', isDark ? 'true' : 'false');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });

  // Load config and render
  fetch(cfgUrl).then(r => r.json()).then(config => {
    renderAll(config);
    attachInteractivity(config);
  }).catch(err => {
    console.error('Failed loading config.json', err);
    // Minimal fallback text
    $('#companyName').textContent = 'Mechanical Service Works';
    $('#tagline').textContent = 'Precision. Reliability. Craftsmanship.';
    $('#aboutText').textContent = 'Edit config.json to populate this site.';
  });

  function renderAll(cfg){
    // Header
    $('#logo').src = cfg.logo || '';
    $('#logo').alt = cfg.companyName || 'Company logo';
    $('#companyName').textContent = cfg.companyName || 'Company Name';
    $('#tagline').textContent = cfg.tagline || '';

    // About
    $('#aboutText').textContent = cfg.about?.text || '';
    if (cfg.about?.missionEnabled && cfg.about?.missionText) {
      $('#missionText').textContent = cfg.about.missionText;
      $('#missionBlock').hidden = false;
    } else {
      $('#missionBlock').hidden = true;
    }

    // Services
    $('#servicesIntro').textContent = cfg.servicesIntro || '';
    const servicesGrid = $('#servicesGrid');
    servicesGrid.innerHTML = '';
    const serviceT = document.getElementById('serviceTemplate');

    if (Array.isArray(cfg.services)) {
      cfg.services.forEach((s, i) => {
        const node = serviceT.content.cloneNode(true);
        const article = node.querySelector('.service-card');
        const mediaWrap = node.querySelector('.media-wrap');
        const title = node.querySelector('.service-title');
        const desc = node.querySelector('.service-desc');
        const more = node.querySelector('.more');
        const moreContent = node.querySelector('.more-content');
        const learnBtn = node.querySelector('.learn-more');
        const enquireBtn = node.querySelector('.enquire');
        const pastExp = node.querySelector('.past-exp');
        const pastText = node.querySelector('.past-text');

        title.textContent = s.title || 'Service title';
        desc.textContent = s.shortDescription || '';

        // media: image or video
        if (s.media?.type === 'video') {
          const v = document.createElement('video');
          v.src = s.media.src;
          v.controls = true;
          v.setAttribute('playsinline', '');
          mediaWrap.appendChild(v);
        } else if (s.media?.type === 'image' || s.media?.src) {
          const im = document.createElement('img');
          im.src = s.media?.src || '';
          im.alt = s.title || 'Service image';
          mediaWrap.appendChild(im);
        } else {
          mediaWrap.appendChild(el('div', {class: 'placeholder', html: '<small>No media</small>'}));
        }

        // more content & past experience
        moreContent.innerHTML = s.longDescription || '';
        if (s.pastExperienceEnabled && s.pastExperienceText) {
          pastText.textContent = s.pastExperienceText;
          pastExp.hidden = false;
        } else {
          pastExp.hidden = true;
        }

        // Learn more toggles the .more block
        learnBtn.addEventListener('click', () => {
          const isHidden = more.hidden;
          more.hidden = !isHidden;
          learnBtn.textContent = isHidden ? 'Close' : 'Learn more';
        });

        // Enquire fills contact form service-select / message
        enquireBtn.addEventListener('click', () => {
          $('#serviceSelect').value = s.title || '';
          // also focus message if present
          const msgField = $('#contactForm').querySelector('[name="message"], textarea');
          if (msgField) {
            msgField.focus();
            msgField.value = `Inquiry about: ${s.title}\n\n${s.shortDescription || ''}`;
          }
          // scroll to contact
          document.getElementById('contact').scrollIntoView({behavior: 'smooth'});
        });

        servicesGrid.appendChild(node);
      });
    }

    // Projects (showcase toggle)
    if (cfg.showcase && Array.isArray(cfg.projects) && cfg.projects.length) {
      $('#projects').hidden = false;
      $('#projectsIntro').textContent = cfg.projectsIntro || '';
      const projectsGrid = $('#projectsGrid');
      projectsGrid.innerHTML = '';
      const projT = document.getElementById('projectTemplate');
      cfg.projects.forEach(p => {
        const node = projT.content.cloneNode(true);
        const title = node.querySelector('.project-title');
        const desc = node.querySelector('.project-desc');
        const media = node.querySelector('.project-media');

        title.textContent = p.title || 'Project';
        desc.textContent = p.description || '';

        // simple: take first gallery item
        if (Array.isArray(p.gallery) && p.gallery.length) {
          const item = p.gallery[0];
          if (item.type === 'video') {
            const v = document.createElement('video');
            v.src = item.src; v.controls = true; media.appendChild(v);
          } else {
            const im = document.createElement('img');
            im.src = item.src; im.alt = p.title || 'Project image'; media.appendChild(im);
          }
        } else {
          media.appendChild(el('div', {class:'placeholder', html: '<small>No media</small>'}));
        }
        projectsGrid.appendChild(node);
      });
    } else {
      $('#projects').hidden = true;
      // hide nav link to projects if project showcase disabled
      $('#projectsLink').style.display = 'none';
    }

    // Contact details
    $('#contactIntro').textContent = cfg.contact?.intro || '';
    const phone = cfg.contact?.phone || '';
    const email = cfg.contact?.email || '';
    const address = cfg.contact?.address || '';
    const mapLink = cfg.contact?.mapLink || '';

    const phoneEl = $('#contactPhone');
    phoneEl.href = phone ? `tel:${phone.replace(/\s+/g,'')}` : '#';
    phoneEl.textContent = phone || '—';

    const emailEl = $('#contactEmail');
    emailEl.href = email ? `mailto:${email}` : '#';
    emailEl.textContent = email || '—';

    $('#contactAddress').textContent = address || '';
    $('#mapLink').href = mapLink || '#';
    $('#mapLinkWrap').style.display = mapLink ? 'block' : 'none';

    // Footer
    $('#footerYear').textContent = new Date().getFullYear();
    $('#footerCompany').textContent = cfg.companyName || '';

    // Populate serviceSelect
    const serviceSelect = $('#serviceSelect');
    serviceSelect.innerHTML = '<option value="">-- Select service --</option>';
    (cfg.services || []).forEach(s => {
      const opt = document.createElement('option');
      opt.value = s.title || '';
      opt.textContent = s.title || '';
      serviceSelect.appendChild(opt);
    });

    // Build contact form fields from config (fall back to defaults)
    const formFieldsWrap = $('#formFields');
    formFieldsWrap.innerHTML = '';
    const fields = cfg.contact?.formFields?.length ? cfg.contact.formFields : [
      {name:'name', label:'Name', type:'text', required:true},
      {name:'email', label:'Email', type:'email', required:true},
      {name:'phone', label:'Phone', type:'tel', required:false},
      {name:'message', label:'Message', type:'textarea', required:true},
    ];
    fields.forEach(f => {
      const row = el('div', {'class':'form-row'});
      const label = el('label', {for: `field-${f.name}`}, f.label);
      let input;
      if (f.type === 'textarea') {
        input = el('textarea', {id:`field-${f.name}`, name:f.name, rows:4});
      } else if (f.type === 'select' && Array.isArray(f.options)) {
        input = el('select', {id:`field-${f.name}`, name:f.name});
        input.appendChild(el('option', {value:''}, '--'));
        f.options.forEach(opt => input.appendChild(el('option', {value:opt.value}, opt.label || opt.value)));
      } else {
        input = el('input', {id:`field-${f.name}`, name:f.name, type:f.type || 'text'});
      }
      if (f.required) input.required = true;
      row.appendChild(label);
      row.appendChild(input);
      formFieldsWrap.appendChild(row);
    });

    // Hook the serviceSelect change -> auto-fill message area
    serviceSelect.addEventListener('change', (e) => {
      const val = e.target.value;
      const msg = $('#contactForm').querySelector('textarea[name="message"], textarea') || $('#contactForm').querySelector('[name="message"], input[name="message"]');
      if (msg) {
        if (val) msg.value = `Inquiry about: ${val}\n\nPlease share details...`;
        else msg.value = '';
      }
    });
  } // renderAll

  function attachInteractivity(cfg){
    // Contact form submit (demo: does not send; shows success and resets)
    const form = $('#contactForm');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const obj = {};
      data.forEach((v,k) => obj[k] = v);
      // In production: replace with AJAX POST to your server endpoint
      $('#formMsg').textContent = 'Thanks — your message is ready to be sent. (Demo mode)';
      form.reset();
      setTimeout(()=>$('#formMsg').textContent = '', 4000);
    });

    // Close mobile nav when clicking a nav link
    $$('.nav-link').forEach(a => a.addEventListener('click', () => {
      mainNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded','false');
    }));

    // simple reveal animation (optional)
    const cards = $$('.card');
    cards.forEach((c, i) => {
      setTimeout(()=> c.classList.add('reveal'), 80 * i);
    });
  }

})();


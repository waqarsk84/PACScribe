/* PACScribe specialty landing page – interactions
   - Specialty tabs (ARIA tabs, keyboard, swipeable on small screens)
   - Scroll reveal, header compaction, progress bar, subtle hero parallax
   - Floating viewport preview widget (mobile / tablet / desktop)
*/
(function () {
  'use strict';

  var root = document.documentElement;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var isEmbed = root.classList.contains('is-embed');

  /* ------------------------------------------------------------------
     Specialty content (placeholder copy written for this preview –
     all statistics are illustrative and need sign-off before launch)
     ------------------------------------------------------------------ */
  var SPECIALTIES = {
    derm: {
      title: 'Dermatology',
      desc: 'Bring clinical photos, dermoscopy and pathology slides into one timeline, so lesions can be compared visit to visit and reviewed by the right dermatologist without chasing files.',
      stats: [['3×', 'Faster lesion comparisons'], ['100%', 'Visits linked to their images']],
      challenges: ['Clinical photos scattered across phones, cameras and shared drives', 'Hard to compare lesion changes across follow-up visits', 'Dermoscopy and pathology images rarely sit side by side', 'Teledermatology referrals arrive without usable images'],
      helps: ['One photo, dermoscopy and slide timeline for every patient', 'Side-by-side comparison tools for tracking lesion change', 'Secure capture-to-chart uploads from approved devices', 'Referral packets that bundle images, notes and history']
    },
    cardio: {
      title: 'Cardiology',
      desc: 'Pull echo, cath lab and cardiac CT/MR studies into a single view, so cardiologists can read, compare and report on the full picture at the workstation or on call.',
      stats: [['35%', 'Shorter echo read times'], ['24/7', 'Secure on-call viewer access']],
      challenges: ['Echo, cath and CT studies spread across vendor systems', 'Slow access to prior studies during urgent reads', 'Measurements re-typed by hand into final reports', 'Limited remote access for on-call cardiologists'],
      helps: ['A single worklist for echo, cath lab and cardiac imaging', 'Relevant priors fetched automatically for comparison', 'Structured measurements that flow straight into reports', 'Zero-install viewer for secure reading from anywhere']
    },
    urgent: {
      title: 'Urgent Care',
      desc: 'Give walk-in clinics fast imaging turnaround with remote reads from on-call radiologists, so patients leave with answers instead of a callback.',
      stats: [['<30 min', 'Typical remote read turnaround'], ['60%', 'Fewer follow-up callbacks']],
      challenges: ['No on-site radiologist for evening and weekend X-rays', 'Images burned to disc or emailed for second opinions', 'Patients sent home before results are confirmed', 'Results lost between the clinic and primary care'],
      helps: ['Teleradiology routing with priority flags for urgent studies', 'Browser-based sharing with no discs or attachments', 'Live read status visible to clinicians and front desk', 'Automatic result delivery to the primary care provider']
    },
    gyn: {
      title: 'Gynaecology & Obstetrics',
      desc: 'Connect ultrasound, fetal imaging and OB records so high-risk pregnancies reach the right specialists fast, with every provider working from the same up-to-date picture across teams and sites.',
      stats: [['40%', 'Quicker specialist consults'], ['99.9%', 'Platform availability']],
      challenges: ['Ultrasound studies split between machines, clinics and hospitals', 'Slow access to prenatal scans when complications appear', 'Hard to coordinate reviews with maternal-fetal medicine teams', 'Scans shared by hand, delaying time-sensitive decisions'],
      helps: ['Secure one-click sharing of fetal studies, with full audit logs', 'Alerts that route abnormal findings to the care team instantly', "Prenatal imaging linked directly to the patient's EHR record", 'Every study available from the first visit through delivery']
    },
    ortho: {
      title: 'Orthopedics',
      desc: 'Keep X-ray, MRI and CT next to templating and surgical plans, so surgeons can prepare cases and follow healing from one screen.',
      stats: [['50%', 'Less time preparing cases'], ['1 view', 'Pre-op to post-op history']],
      challenges: ['Pre-op planning done in separate templating tools', 'Outside imaging arrives on CDs just before surgery', 'Fracture healing hard to track across follow-ups', 'Physiotherapy teams lack access to recent scans'],
      helps: ['Built-in measurement and templating overlays', 'Outside studies imported and matched to the right patient', 'Serial imaging timeline for healing and implant checks', 'Role-based access for therapists and care partners']
    },
    onco: {
      title: 'Oncology',
      desc: 'Track tumour response across PET, CT and MRI with consistent measurements, and share imaging with tumour boards and treatment teams in one place.',
      stats: [['45%', 'Less time building board packs'], ['100%', 'Priors ready at review']],
      challenges: ['Response assessment spread across many scan dates', 'Tumour board materials assembled by hand', 'Measurements vary between readers and sites', 'Radiation oncology waiting on image transfers'],
      helps: ['Longitudinal lesion tracking with consistent measurements', 'Tumour board worklists with images pre-loaded', 'Standardised templates for treatment-response reporting', 'Direct sharing with radiotherapy planning systems']
    },
    gastro: {
      title: 'Gastroenterology',
      desc: 'Bring endoscopy captures, CT colonography and liver imaging together, so GI teams can review findings and report without switching systems.',
      stats: [['30%', 'Faster procedure reporting'], ['1 record', 'Endoscopy and radiology combined']],
      challenges: ['Endoscopy images captured outside the main archive', 'Radiology and procedure findings stored separately', 'Key images picked by hand for every report', 'Hepatology follow-ups missing earlier imaging'],
      helps: ['Endoscopy stills and video archived with each procedure', 'Combined view of procedure and radiology findings', 'Drag-and-drop key images into structured reports', 'Surveillance schedules linked to prior imaging']
    },
    ophth: {
      title: 'Ophthalmology',
      desc: 'Store OCT, fundus and visual-field images in one archive, so eye specialists can compare visits, spot progression and share studies with referring clinics.',
      stats: [['25%', 'Shorter clinic review time'], ['10+ yrs', 'Retinal history at a glance']],
      challenges: ['OCT and fundus images locked inside device software', 'Progression hard to see across years of visits', 'Optometry referrals arrive without images', 'Large files slow to open during busy clinics'],
      helps: ['Vendor-neutral storage for OCT, fundus and field tests', 'Progression views that line up visits over time', 'Secure referral portal with image upload', 'Fast-loading previews tuned for clinic workflows']
    },
    ent: {
      title: 'ENT',
      desc: 'Keep sinus CT, endoscopy captures and audiology results together, so ENT surgeons can plan procedures and follow patients with full context.',
      stats: [['35%', 'Faster surgical planning'], ['1 chart', 'Scans, scopes and audiology']],
      challenges: ['Sinus CT and scope images reviewed in different tools', 'Audiology reports stored apart from imaging', 'Navigation-ready scans needed before theatre', 'Post-op comparisons rely on memory and notes'],
      helps: ['One ENT view of CT, scope and audiology data', 'Export of surgical-navigation-ready datasets', 'Annotated key images shared with the theatre team', 'Before-and-after comparisons attached to follow-ups']
    },
    dent: {
      title: 'Dentistry',
      desc: 'Manage intraoral X-rays, panoramics and CBCT in a single archive, so dental teams and specialists can diagnose, plan and refer with confidence.',
      stats: [['70%', 'Fewer duplicate X-rays'], ['Same day', 'Specialist referrals']],
      challenges: ['Dental images trapped in chair-side sensor software', 'CBCT volumes too large to share easily', 'Repeat X-rays when patients change practices', 'Referral letters sent without supporting images'],
      helps: ['One archive for intraoral, panoramic and CBCT imaging', 'Browser-based 3D viewing with nothing to install', 'Image history shared securely between practices', 'Image-rich referrals sent to specialists in a click']
    }
  };

  /* Per-specialty header art exported from Figma (fills only) + the position of each
     frame's blurred glow ellipse, in Figma px on the 1006px-wide header */
  var HEADERS = {
    derm:   { glow: [472, 226, 458] }, cardio: { glow: [513, 226, 496] },
    urgent: { glow: [472, 226, 458] }, gyn:    { glow: [432, 226, 557] },
    ortho:  { glow: [472, 226, 458] }, onco:   { glow: [382, 367, 458] },
    gastro: { glow: [432, 287, 458] }, ophth:  { glow: [472, 226, 458] },
    ent:    { glow: [416, 323, 496] }, dent:   { glow: null }
  };
  function headerSrc(key) { return 'assets/img/specialty-' + key + '-bg.jpg'; }

  /* ------------------------------------------------------------------ Tabs */
  var tablist = document.querySelector('.spec-tabs');
  var tabs = tablist ? Array.prototype.slice.call(tablist.querySelectorAll('[role="tab"]')) : [];
  var panel = document.getElementById('spec-panel');
  var panelBg = panel && panel.querySelector('.spec-panel__bg');
  var panelGlow = panel && panel.querySelector('.spec-panel__glow');
  var field = function (name) { return panel.querySelector('[data-f="' + name + '"]'); };
  var current = 'gyn';
  var swapTimer;

  // Build DOM nodes with textContent only (no HTML parsing) so content can never be parsed as markup
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function renderBullets(target, list) {
    target.replaceChildren.apply(target, list.map(function (t, i) {
      var li = el('li', null, t); li.style.setProperty('--i', i); return li;
    }));
  }

  function countUp(el) {
    if (reduceMotion) return;
    var raw = el.textContent;
    var m = raw.match(/^([^\d]*)([\d.]+)(.*)$/);
    if (!m) return;
    var target = parseFloat(m[2]); var decimals = (m[2].split('.')[1] || '').length;
    var start = performance.now(); var dur = 700;
    function step(now) {
      var p = Math.min(1, (now - start) / dur); var e = 1 - Math.pow(1 - p, 3);
      el.textContent = m[1] + (target * e).toFixed(decimals) + m[3];
      if (p < 1) requestAnimationFrame(step); else el.textContent = raw;
    }
    requestAnimationFrame(step);
  }

  function applyHeader(key) {
    var h = HEADERS[key];
    if (!h) return;
    panelBg.style.backgroundImage = 'url("' + headerSrc(key) + '")';
    if (h.glow) {
      panelGlow.hidden = false;
      panelGlow.style.left = (h.glow[0] / 1006 * 100).toFixed(2) + '%';
      panelGlow.style.width = h.glow[1] + 'px';
      panelGlow.style.height = h.glow[2] + 'px';
    } else {
      panelGlow.hidden = true; // Dentistry has no glow layer in Figma
    }
  }

  function fill(key) {
    var d = SPECIALTIES[key];
    if (!d) return;
    applyHeader(key);
    field('title').textContent = d.title;
    field('desc').textContent = d.desc;
    var stats = field('stats');
    stats.replaceChildren.apply(stats, d.stats.map(function (s) {
      var box = el('div', 'spec-stat');
      box.append(el('span', 'spec-stat__value', s[0]), el('span', 'spec-stat__label', s[1]));
      return box;
    }));
    renderBullets(field('challenges'), d.challenges);
    renderBullets(field('helps'), d.helps);
  }

  function select(tab, opts) {
    opts = opts || {};
    var key = tab.dataset.key;
    if (!Object.prototype.hasOwnProperty.call(SPECIALTIES, key)) return;
    tabs.forEach(function (t) {
      var on = t === tab;
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.tabIndex = on ? 0 : -1;
    });
    panel.setAttribute('aria-labelledby', tab.id);
    if (opts.focus) tab.focus({ preventScroll: true });
    keepTabVisible(tab);
    if (key === current) return;
    current = key;

    clearTimeout(swapTimer);
    if (reduceMotion) { fill(key); return; }
    panel.classList.add('is-swapping');
    swapTimer = setTimeout(function () {
      fill(key);
      // restart the subtle image settle animation
      panelBg.classList.remove('is-zooming'); void panelBg.offsetWidth; panelBg.classList.add('is-zooming');
      requestAnimationFrame(function () {
        panel.classList.remove('is-swapping');
        panel.querySelectorAll('.spec-stat__value').forEach(countUp);
      });
    }, 200);
  }

  function keepTabVisible(tab) {
    // On small screens the tab list scrolls horizontally – keep the active chip in view
    if (tablist.scrollWidth <= tablist.clientWidth + 1) return;
    var left = tab.offsetLeft - (tablist.clientWidth - tab.offsetWidth) / 2;
    tablist.scrollTo({ left: Math.max(0, left), behavior: reduceMotion ? 'auto' : 'smooth' });
  }

  if (tablist && panel) {
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () { select(tab); });
    });
    tablist.addEventListener('keydown', function (e) {
      var i = tabs.indexOf(document.activeElement);
      if (i < 0) return;
      var vertical = tablist.getAttribute('aria-orientation') === 'vertical';
      var next = null;
      if (e.key === (vertical ? 'ArrowDown' : 'ArrowRight')) next = tabs[(i + 1) % tabs.length];
      else if (e.key === (vertical ? 'ArrowUp' : 'ArrowLeft')) next = tabs[(i - 1 + tabs.length) % tabs.length];
      else if (e.key === 'Home') next = tabs[0];
      else if (e.key === 'End') next = tabs[tabs.length - 1];
      if (next) { e.preventDefault(); select(next, { focus: true }); }
    });
    var mqVertical = window.matchMedia('(min-width: 1024px)');
    var syncOrientation = function () { tablist.setAttribute('aria-orientation', mqVertical.matches ? 'vertical' : 'horizontal'); };
    syncOrientation();
    (mqVertical.addEventListener ? mqVertical.addEventListener('change', syncOrientation) : mqVertical.addListener(syncOrientation));
    // warm the cache so switching tabs never flashes an empty header
    window.addEventListener('load', function () {
      var idle = window.requestIdleCallback || function (cb) { return setTimeout(cb, 600); };
      idle(function () { Object.keys(HEADERS).forEach(function (k) { var img = new Image(); img.src = headerSrc(k); }); });
    });
    // centre the default tab on load for horizontal layouts
    requestAnimationFrame(function () { keepTabVisible(tabs.filter(function (t) { return t.getAttribute('aria-selected') === 'true'; })[0]); });
  }

  /* ------------------------------------------------------------------ Mobile menu */
  var menuBtn = document.querySelector('.menu-btn');
  if (menuBtn) {
    var setMenu = function (open) {
      root.classList.toggle('menu-open', open);
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };
    menuBtn.addEventListener('click', function () { setMenu(!root.classList.contains('menu-open')); });
    document.querySelectorAll('.mobile-menu a').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
  }

  /* ------------------------------------------------------------------ Scroll reveal */
  var revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
    // count the stats up the first time the panel comes into view
    var statsIO = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) { panel.querySelectorAll('.spec-stat__value').forEach(countUp); statsIO.disconnect(); }
    }, { threshold: 0.4 });
    if (panel) statsIO.observe(panel.querySelector('.spec-stats'));
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ------------------------------------------------------------------ Scroll effects */
  var progress = document.querySelector('.progress');
  var heroBg = document.querySelector('.hero__bg');
  var heroInner = document.querySelector('.hero__inner');
  var hero = document.querySelector('.hero');
  var stickyHero = window.matchMedia('(max-width: 767px)');
  var ticking = false;
  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    root.classList.toggle('is-scrolled', y > 24);
    var max = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.transform = 'scaleX(' + (max > 0 ? Math.min(1, y / max) : 0) + ')';
    if (!reduceMotion && hero) {
      var h = hero.offsetHeight;
      if (stickyHero.matches) {
        // pinned hero (mobile): no parallax; ease the copy back as content covers it
        var q = Math.min(1, y / h);
        heroBg.style.transform = 'scale(' + (1 + q * 0.06).toFixed(3) + ')';
        heroInner.style.transform = 'translate3d(0,' + (-q * 24).toFixed(1) + 'px,0) scale(' + (1 - q * 0.05).toFixed(3) + ')';
        heroInner.style.opacity = String(1 - Math.min(0.7, q * 0.9));
      } else if (y < h) {
        heroBg.style.transform = 'translate3d(0,' + (y * 0.18).toFixed(1) + 'px,0)';
        var p = y / h;
        heroInner.style.transform = 'translate3d(0,' + (y * 0.08).toFixed(1) + 'px,0)';
        heroInner.style.opacity = String(1 - Math.min(0.45, p * 0.6));
      }
    }
    ticking = false;
  }
  window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();

  /* ------------------------------------------------------------------ Newsletter (preview only – nothing is sent) */
  var form = document.querySelector('.newsletter form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = form.querySelector('input');
      var msg = document.querySelector('.newsletter__msg');
      var ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim());
      msg.textContent = ok ? 'Preview only: sign-up is not connected yet.' : 'Please enter a valid email address.';
      if (!ok) input.focus();
    });
  }

  /* ------------------------------------------------------------------ Viewport preview widget */
  if (isEmbed) return;
  var widget = document.querySelector('.vp-widget');
  var stage = document.querySelector('.vp-stage');
  if (!widget || !stage) return;
  var device = stage.querySelector('.vp-device');
  var frame = stage.querySelector('iframe');
  var meta = stage.querySelector('.vp-meta');
  var rotateBtn = widget.querySelector('[data-vp-rotate]');
  var sep = widget.querySelector('.vp-sep');
  var SIZES = { mobile: { w: 390, h: 844, name: 'Mobile' }, tablet: { w: 834, h: 1112, name: 'Tablet' } };
  var mode = 'desktop'; var landscape = false;

  function frameSrc() { return location.href.split('#')[0] + '#vp-embed'; }

  function layout() {
    if (mode === 'desktop') return;
    var s = SIZES[mode];
    var w = landscape ? s.h : s.w; var h = landscape ? s.w : s.h;
    var pad = mode === 'tablet' ? 32 : 24;
    device.style.width = (w + pad) + 'px';
    device.style.height = (h + pad) + 'px';
    var availW = window.innerWidth - 48; var availH = window.innerHeight - 24 - 90 - 30;
    var scale = Math.min(1, availW / (w + pad), availH / (h + pad));
    device.style.transform = 'scale(' + scale.toFixed(3) + ')';
    device.style.margin = (-(h + pad) * (1 - scale) / 2).toFixed(1) + 'px ' + (-(w + pad) * (1 - scale) / 2).toFixed(1) + 'px';
    var b = document.createElement('b'); b.textContent = s.name;
    meta.replaceChildren(b, document.createTextNode(' · ' + w + ' × ' + h + (scale < 1 ? ' · shown at ' + Math.round(scale * 100) + '%' : '')));
  }

  function setMode(next) {
    mode = next;
    widget.querySelectorAll('[data-vp]').forEach(function (b) { b.setAttribute('aria-pressed', b.dataset.vp === mode ? 'true' : 'false'); });
    var open = mode !== 'desktop';
    rotateBtn.hidden = !open; sep.hidden = !open;
    if (open) {
      device.classList.toggle('vp-device--tablet', mode === 'tablet');
      if (frame.getAttribute('src') !== frameSrc()) frame.setAttribute('src', frameSrc());
      layout();
      stage.classList.add('is-open'); stage.setAttribute('aria-hidden', 'false');
      root.classList.add('vp-open');
    } else {
      landscape = false;
      stage.classList.remove('is-open'); stage.setAttribute('aria-hidden', 'true');
      root.classList.remove('vp-open');
    }
  }

  widget.addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b) return;
    if (b.hasAttribute('data-vp-rotate')) { landscape = !landscape; layout(); return; }
    setMode(b.dataset.vp);
  });
  stage.addEventListener('click', function (e) { if (e.target === stage) setMode('desktop'); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && mode !== 'desktop') setMode('desktop'); });
  window.addEventListener('resize', layout);
})();

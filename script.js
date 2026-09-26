/* Progressive enhancement only — every page is complete and readable without JavaScript.
   No scroll-reveal: nothing on this site is hidden waiting for a script to run. */
(function () {
  'use strict';

  var doc = document;

  /* ---------- footer year ---------- */
  var year = doc.getElementById('year');
  if (year) { year.textContent = new Date().getFullYear(); }

  /* ---------- mark the current page in the navigation ---------- */
  var path = location.pathname.replace(/index\.html$/, '');
  Array.prototype.forEach.call(doc.querySelectorAll('.nav a'), function (link) {
    if (link.hasAttribute('aria-current')) { return; }
    var href = link.getAttribute('href');
    if (!href || href.charAt(0) === '#') { return; }
    var target = new URL(href, location.href).pathname.replace(/index\.html$/, '');
    if (target === path) { link.setAttribute('aria-current', 'page'); }
  });

  /* ---------- compact navigation menu (small screens) ---------- */
  var navToggle = doc.querySelector('.nav-toggle');
  var nav = doc.getElementById('site-nav');
  if (navToggle && nav) {
    var mq = window.matchMedia('(max-width: 700px)');

    var setOpen = function (open) {
      navToggle.setAttribute('aria-expanded', String(open));
      nav.hidden = !open;
    };

    var syncToViewport = function () {
      if (mq.matches) { setOpen(false); }
      else { nav.hidden = false; navToggle.setAttribute('aria-expanded', 'false'); }
    };

    syncToViewport();
    if (mq.addEventListener) { mq.addEventListener('change', syncToViewport); }
    else if (mq.addListener) { mq.addListener(syncToViewport); }

    navToggle.addEventListener('click', function () {
      var open = navToggle.getAttribute('aria-expanded') === 'true';
      setOpen(!open);
      if (!open) {
        var first = nav.querySelector('a');
        if (first) { first.focus(); }
      }
    });

    doc.addEventListener('keydown', function (event) {
      if (event.key !== 'Escape' && event.key !== 'Esc') { return; }
      if (!mq.matches || navToggle.getAttribute('aria-expanded') !== 'true') { return; }
      setOpen(false);
      navToggle.focus();
    });

    doc.addEventListener('click', function (event) {
      if (!mq.matches || navToggle.getAttribute('aria-expanded') !== 'true') { return; }
      if (nav.contains(event.target) || navToggle.contains(event.target)) { return; }
      setOpen(false);
    });

    /* Closing the menu must not strand focus inside a hidden element: for an
       in-page link, move focus to the section it points at; otherwise the page
       is navigating away and the browser handles it. */
    nav.addEventListener('click', function (event) {
      if (!mq.matches) { return; }
      var link = event.target.closest('a');
      if (!link) { return; }
      setOpen(false);
      var href = link.getAttribute('href') || '';
      var hash = href.indexOf('#') === 0 ? href.slice(1) : '';
      if (!hash) { return; }
      var target = doc.getElementById(hash);
      if (!target) { return; }
      if (!target.hasAttribute('tabindex')) { target.setAttribute('tabindex', '-1'); }
      setTimeout(function () { target.focus({ preventScroll: true }); }, 0);
    });
  }

  /* ---------- figure enlargement ---------- */
  var zooms = doc.querySelectorAll('a.zoom');
  if (zooms.length && typeof HTMLDialogElement === 'function' && HTMLDialogElement.prototype.showModal) {
    var dialog = doc.createElement('dialog');
    dialog.className = 'lightbox';
    dialog.setAttribute('aria-label', 'Enlarged figure');
    dialog.innerHTML =
      '<div class="lightbox-inner">' +
        '<button type="button" class="lightbox-close" data-close aria-label="Close enlarged figure">✕</button>' +
        '<img alt="">' +
        '<p class="lightbox-caption"></p>' +
      '</div>';
    doc.body.appendChild(dialog);
    var image = dialog.querySelector('img');
    var caption = dialog.querySelector('.lightbox-caption');
    var closeButton = dialog.querySelector('[data-close]');
    var opener = null;

    Array.prototype.forEach.call(zooms, function (link) {
      if (!link.hasAttribute('aria-label')) {
        var inner = link.querySelector('img');
        var alt = inner ? (inner.getAttribute('alt') || '') : '';
        link.setAttribute('aria-label', alt ? 'Enlarge figure: ' + alt : 'Enlarge figure');
      }
      link.addEventListener('click', function (event) {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) { return; }
        event.preventDefault();
        opener = link;
        var inner = link.querySelector('img');
        image.src = link.getAttribute('href');
        image.alt = inner ? inner.alt : '';
        var fig = link.closest('figure');
        var cap = fig ? fig.querySelector('figcaption') : null;
        caption.textContent = cap ? cap.textContent.replace(/\s+/g, ' ').trim() : '';
        dialog.setAttribute('aria-label',
          caption.textContent ? 'Enlarged figure: ' + caption.textContent.slice(0, 120) : 'Enlarged figure');
        dialog.showModal();
        closeButton.focus();
      });
    });

    dialog.addEventListener('click', function (event) {
      if (event.target === dialog || event.target.hasAttribute('data-close')) { dialog.close(); }
    });
    dialog.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' || event.key === 'Esc') { event.preventDefault(); dialog.close(); }
    });
    dialog.addEventListener('close', function () {
      image.removeAttribute('src');
      var origin = opener;
      opener = null;
      if (origin) { setTimeout(function () { origin.focus(); }, 0); }
    });
  }

  /* ---------- concept animations ----------
     Motion is off by default and runs on hover or keyboard focus via CSS.
     This button is the only route on touch devices, where hover does not exist. */
  Array.prototype.forEach.call(doc.querySelectorAll('[data-anim-toggle]'), function (button) {
    var figure = button.closest('.concept-anim');
    if (!figure) { return; }
    button.addEventListener('click', function () {
      var playing = figure.classList.toggle('is-playing');
      button.setAttribute('aria-pressed', String(playing));
      button.textContent = playing ? 'Pause animation' : 'Play animation';
    });
  });

  /* ---------- CV page: say so plainly if the file is not there ---------- */
  var cvPreview = doc.getElementById('cv-preview');
  if (cvPreview && location.protocol.indexOf('http') === 0 && typeof fetch === 'function') {
    var src = cvPreview.getAttribute('data-pdf');
    var options = { method: 'HEAD' };
    var timer = null;
    if (typeof AbortController === 'function') {
      var controller = new AbortController();
      options.signal = controller.signal;
      timer = setTimeout(function () { controller.abort(); }, 4000);
    }
    fetch(src, options).then(function (response) {
      if (timer) { clearTimeout(timer); }
      if (response.status === 404 || response.status === 410) {
        var notice = doc.getElementById('cv-missing');
        if (notice) { notice.hidden = false; }
        var actions = doc.querySelector('.cv-actions');
        if (actions) { actions.hidden = true; }
      }
    }).catch(function () { if (timer) { clearTimeout(timer); } });
  }
}());

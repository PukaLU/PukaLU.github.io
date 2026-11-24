/*
 * Setările site-ului PukaLu Games. Aici schimbi:
 *  - linkurile către TikTok și YouTube (după ce faci conturile)
 *  - live: true pentru Orbita, în ziua în care jocul apare public în Google Play
 */
window.SITE = {
  email: 'pukaluorbito@gmail.com',
  social: {
    tiktok: '',   // ex: 'https://www.tiktok.com/@pukalugames'
    youtube: 'https://www.youtube.com/@pukalugames',
  },
  orbita: {
    live: false,
    play: 'https://play.google.com/store/apps/details?id=ro.jocuri.orbita',
    group: 'https://groups.google.com/g/orbita-game-pukalu',
    optin: 'https://play.google.com/apps/testing/ro.jocuri.orbita',
  },
};

(function () {
  const root = document.documentElement;
  // limba: alegerea salvată, altfel limba browserului (română sau engleză)
  let lang = 'en';
  try { lang = localStorage.getItem('pukalu-lang') || ''; } catch (e) {}
  if (lang !== 'ro' && lang !== 'en') lang = (navigator.language || 'en').toLowerCase().startsWith('ro') ? 'ro' : 'en';
  const setLang = l => {
    lang = l; root.dataset.lang = l; root.lang = l;
    try { localStorage.setItem('pukalu-lang', l); } catch (e) {}
    document.querySelectorAll('.lang').forEach(b => { b.textContent = l === 'ro' ? 'EN' : 'RO'; b.setAttribute('aria-label', l === 'ro' ? 'Switch to English' : 'Schimbă în română'); });
    // trailerul: în limba aleasă, cu „În curând” sau „Gratuit în Google Play” pe final, după stadiul jocului
    document.querySelectorAll('video[data-trailer]').forEach(v => {
      const name = (window.SITE.orbita.live ? 'live-' : 'soon-') + l;
      if (v.dataset.cur === name) return;
      v.dataset.cur = name;
      v.poster = `video/poster-${l}.jpg`;
      v.src = `video/trailer-${name}.mp4`;
    });
  };
  setLang(lang);
  document.addEventListener('click', e => { if (e.target.closest('.lang')) setLang(lang === 'ro' ? 'en' : 'ro'); });

  const S = window.SITE;
  // Orbita: butoane după stadiu (testare sau publicat)
  document.querySelectorAll('[data-orbita-play]').forEach(a => {
    a.href = S.orbita.play;
    if (!S.orbita.live) { a.setAttribute('aria-disabled', 'true'); a.removeAttribute('href'); }
  });
  document.querySelectorAll('[data-orbita-status]').forEach(el => el.classList.toggle('live', S.orbita.live));
  document.querySelectorAll('[data-when="live"]').forEach(el => { el.hidden = !S.orbita.live; });
  document.querySelectorAll('[data-when="beta"]').forEach(el => { el.hidden = S.orbita.live; });
  document.querySelectorAll('[data-link="group"]').forEach(a => { a.href = S.orbita.group; });
  document.querySelectorAll('[data-link="optin"]').forEach(a => { a.href = S.orbita.optin; });
  document.querySelectorAll('[data-email]').forEach(a => { a.href = 'mailto:' + S.email; a.textContent = S.email; });

  // rețele sociale: apar doar cele care au link
  const icons = {
    tiktok: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M16.6 3c.3 2.2 1.6 3.6 3.9 3.8v3.1c-1.4.1-2.6-.3-3.9-1.1v6.1c0 4.8-5.2 6.9-8.4 4.2-2.6-2.1-2.3-6.9 1.9-7.6.5-.1 1-.1 1.6 0v3.2c-.4-.1-.8-.2-1.2-.1-1.6.2-2.2 1.6-1.7 2.7.6 1.4 3 1.6 3.6-.2.1-.4.2-.8.2-1.2V3h3.2z"/></svg>',
    youtube: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.3 5 12 5 12 5s-6.3 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8c1.5.4 7.8.4 7.8.4s6.3 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8zM10 15V9l5.2 3L10 15z"/></svg>',
  };
  const names = { tiktok: 'TikTok', youtube: 'YouTube' };
  document.querySelectorAll('[data-socials]').forEach(box => {
    const links = Object.entries(S.social).filter(([, url]) => url);
    if (!links.length) { box.closest('[data-socials-wrap]')?.setAttribute('hidden', ''); return; }
    box.innerHTML = links.map(([k, url]) => `<a href="${url}" target="_blank" rel="noopener">${icons[k]}${names[k]}</a>`).join('');
  });
  document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });
})();

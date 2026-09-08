window.dataLayer = window.dataLayer || [];
function dlPush(event){ window.dataLayer.push({event:event}); }

(function(){
  const btn = document.getElementById('menuBtn');
  const panel = document.getElementById('mobile-panel');

  const latestJournalGrid = document.getElementById('latestJournalGrid');
  const mq = window.matchMedia('(min-width: 1025px)');
  const focusableSel = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
  let lastFocused = null;

  function track(name){ window.dataLayer.push({event:name}); }
  function wire(id, eventName){
    const el = document.getElementById(id);
    if(el) el.addEventListener('click', function(){ track(eventName); });
  }

  wire('headerTeeTime','tee_time_click');
  wire('rewardsCta','rewards_click');
  wire('membershipCta','membership_click');
  wire('lessonsCta','lessons_click');
  wire('contactLink','contact_click');
  wire('contactQuickTeeTime','tee_time_click');
  wire('contactPhone','phone_click');
  wire('bookingPhone','tee_time_phone_click');
  wire('mobileCall','phone_click');
  wire('memberLogin','member_login_click');
  wire('bgcFooterPhone','phone_click');
  wire('bgcFooterTeeTime','tee_time_click');
  wire('bgcFooterMemberLogin','member_login_click');
  wire('privacyPolicyLink','privacy_click');

  function trackArticle(title){ window.dataLayer.push({event:'article_click', article_title:title}); }



  function openMenu(){
    if(!btn || !panel) return;
    lastFocused = document.activeElement;
    panel.classList.add('open');
    btn.setAttribute('aria-expanded','true');
    btn.setAttribute('aria-label','Close menu');
    const first = panel.querySelector(focusableSel);
    if(first) first.focus();
  }

  function closeMenu(returnFocus){
    if(!btn || !panel) return;
    panel.classList.remove('open');
    btn.setAttribute('aria-expanded','false');
    btn.setAttribute('aria-label','Open menu');
    if(returnFocus && lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
  }

  function toggleMenu(){
    if(!panel) return;
    if(panel.classList.contains('open')) closeMenu(false);
    else openMenu();
  }

  function trapFocus(e){
    if(!panel || !panel.classList.contains('open')) return;
    if(e.key === 'Escape'){ e.preventDefault(); closeMenu(true); return; }
    if(e.key !== 'Tab') return;
    const items = Array.from(panel.querySelectorAll(focusableSel));
    if(!items.length) return;
    const first = items[0], last = items[items.length - 1];
    if(e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
    else if(!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
  }

  if(btn && panel){
    btn.addEventListener('click', toggleMenu);
    panel.addEventListener('click', function(e){
      if(e.target.closest('a')) closeMenu(false);
    });
    document.addEventListener('keydown', trapFocus);
    window.addEventListener('resize', function(){ if(mq.matches) closeMenu(false); });
  }

  function escapeHtml(str){
    return String(str || '').replace(/[&<>"']/g, function(ch){
      return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]);
    });
  }

  function formatJournalDate(value){
    const date = new Date(value);
    if(Number.isNaN(date.getTime())) return '';
    return new Intl.DateTimeFormat('en-US', { month:'long', day:'numeric', year:'numeric' }).format(date);
  }

  function renderJournalFallback(){
    if(!latestJournalGrid) return;
    latestJournalGrid.setAttribute('aria-busy','false');
    latestJournalGrid.innerHTML = '<article class="journal-home-card"><div class="journal-home-body" style="min-height:240px;align-items:center;justify-content:center;text-align:center;gap:14px"><div class="journal-home-meta" style="justify-content:center"><span class="category">Journal</span></div><p style="margin:0;color:var(--muted)">Latest Journal stories are available in the full archive.</p><a class="btn btn-primary" href="https://paymegpt.com/p/fHpcvCS2Y">View All Journal Articles</a></div></article>';
  }

  function renderJournalCards(cards){
    if(!latestJournalGrid) return;
    if(!cards.length){ renderJournalFallback(); return; }
    latestJournalGrid.setAttribute('aria-busy','false');
    latestJournalGrid.innerHTML = cards.map(function(item){
      return '<article class="journal-home-card journal-card" data-article-url="'+escapeHtml(item.url)+'" data-title="'+escapeHtml(item.title)+'">'+
        '<a class="journal-home-media journal-link" href="'+escapeHtml(item.url)+'" aria-label="'+escapeHtml(item.title)+'">'+
          '<img src="'+escapeHtml(item.image)+'" alt="'+escapeHtml(item.alt)+'" width="1200" height="800" loading="lazy" decoding="async" class="'+(item.title === "How to Play a Davis Love III Golf Course: Strategy at Bluffton Golf Club" ? 'davis-love-top-crop' : '')+'">'+
        '</a>'+
        '<div class="journal-home-body">'+
          '<div class="journal-home-meta"><span class="date">'+escapeHtml(item.dateLabel)+' </span><span class="category">'+escapeHtml(item.category)+'</span></div>'+
          '<h3>'+escapeHtml(item.title)+'</h3>'+
          '<p>'+escapeHtml(item.excerpt)+'</p>'+
          '<div class="hero-actions"><a class="btn btn-secondary journal-link" href="'+escapeHtml(item.url)+'">Read Article</a></div>'+
        '</div>'+
      '</article>';
    }).join('');
  }

  function bindJournalAnalytics(){
    if(!latestJournalGrid) return;
    latestJournalGrid.addEventListener('click', function(e){
      const link = e.target.closest('a.journal-link');
      if(!link) return;
      const card = link.closest('.journal-card');
      const title = card && card.getAttribute('data-title');
      if(title) trackArticle(title);
    });
  }

  bindJournalAnalytics();

  (async function loadLatestJournal(){
    if(!latestJournalGrid) return;
    try{
      const res = await fetch('https://paymegpt.com/p/fHpcvCS2Y', { credentials:'omit' });
      if(!res.ok) throw new Error('Blog fetch failed');
      const html = await res.text();
      const doc = new DOMParser().parseFromString(html, 'text/html');
      const nodes = Array.from(doc.querySelectorAll('.journal-card'));
      const articles = nodes.map(function(node, index){
        const published = node.getAttribute('data-published') || '';
        const category = node.getAttribute('data-category') || 'Journal';
        const url = node.getAttribute('data-article-url') || '';
        const title = node.getAttribute('data-title') || '';
        const excerpt = node.getAttribute('data-excerpt') || '';
        let image = node.getAttribute('data-image') || '';
        let alt = node.getAttribute('data-alt') || '';

        if (image.includes('01af5d04e30bd4f2.jpg')) {
          image = 'https://paymegpt.com/objects/quick-uploads/1257/d47399bef87be957.jpg';
          alt = 'Harbour Town Lighthouse and marina on Hilton Head Island, South Carolina';
        } else if (image.includes('11de0feca443f28c.jpg')) {
          image = 'https://paymegpt.com/objects/quick-uploads/1257/c4c4a4d187c2dc1e.jpg';
          alt = 'The Church of the Cross in historic Bluffton, South Carolina';
        } else if (image.includes('4e172538f233fe7e.jpg')) {
          image = 'https://paymegpt.com/objects/quick-uploads/1257/f8c6493e70d8d98b.jpg';
          alt = 'Davis Love III at Congressional Country Club';
        } else if (image.includes('3006703a9a28786e.jpg')) {
          image = 'https://paymegpt.com/objects/quick-uploads/1257/c02c5b73925622d1.jpg';
          alt = 'Golf ball resting in a sand bunker for golf instruction in Bluffton, South Carolina';
        } else if (image.includes('a393c1023f5b1e07.jpg')) {
          image = 'https://paymegpt.com/objects/quick-uploads/1257/7b077bccfbc14f9b.jpg';
          alt = 'May River in Bluffton, South Carolina';
        } else if (image.includes('dc19f7167e3787f6.jpg')) {
          image = 'https://paymegpt.com/objects/quick-uploads/1257/29743a4dc53b3dc9.jpg';
          alt = 'Bluffton Golf Club course in Bluffton, South Carolina';
        }

        const time = Date.parse(published);
        if(!url || !title || !excerpt || !image || !alt || Number.isNaN(time)) return null;
        return { published: time, index: index, url: url, title: title, excerpt: excerpt, image: image, alt: alt, category: category, dateLabel: formatJournalDate(published) };
      }).filter(Boolean).sort(function(a,b){
        return b.published - a.published || a.index - b.index;
      }).slice(0,3);
      renderJournalCards(articles);
      if(!articles.length) renderJournalFallback();
    }catch(err){
      renderJournalFallback();
    }
  })();


})();

(function(){
  const host = location.hostname;
  if(host === 'paymegpt.com') return;

  const isGithubPages = host.endsWith('github.io');
  const sitePrefix = isGithubPages ? '/bluffton-golf-club' : '';

  const routeMap = {
    'https://paymegpt.com/p/SUpiU9p': '/',
    'https://paymegpt.com/p/7kEfQDVgfm': '/golf/',
    'https://paymegpt.com/p/5c8a7v9Aa': '/membership/',
    'https://paymegpt.com/p/BbtfDrfYx': '/lessons/',
    'https://paymegpt.com/p/UrkWi8r': '/outings/',
    'https://paymegpt.com/p/fHpcvCS2Y': '/blog/',
    'https://paymegpt.com/p/fDMLxwZ8': '/contact/',
    'https://paymegpt.com/p/S6jARJrr': '/book-tee-times/',
    'https://paymegpt.com/p/WSYbZ2a6q': '/privacy/',
    'https://paymegpt.com/p/S48UZA4': '/rewards/',
    'https://paymegpt.com/p/QdFmcQ': '/blog/public-golf-near-hilton-head/',
    'https://paymegpt.com/p/TVSWTAP': '/blog/golf-courses-in-bluffton-sc/',
    'https://paymegpt.com/p/Q4j95JW9HH': '/blog/davis-love-iii-course-strategy/',
    'https://paymegpt.com/p/AVRKGkLz': '/blog/golf-lessons-in-bluffton-sc/',
    'https://paymegpt.com/p/DVjf4mfhk': '/blog/lowcountry-golf-guide/',
    'https://paymegpt.com/p/iGQS8v': '/blog/golf-membership-in-bluffton-sc/'
  };

  function toPrefixedPath(path){
    return sitePrefix + path;
  }

  function rewriteUrl(value){
    if(!value) return value;
    for(const base in routeMap){
      if(value === base) return toPrefixedPath(routeMap[base]);
      if(value.startsWith(base + '?') || value.startsWith(base + '#')) {
        return toPrefixedPath(routeMap[base]) + value.slice(base.length);
      }
    }
    return value;
  }

  function rewriteRoot(){
    document.querySelectorAll('a[href]').forEach(function(a){
      const href = a.getAttribute('href');
      const next = rewriteUrl(href);
      if(next !== href) a.setAttribute('href', next);
    });
    document.querySelectorAll('[data-article-url]').forEach(function(el){
      const val = el.getAttribute('data-article-url');
      const next = rewriteUrl(val);
      if(next !== val) el.setAttribute('data-article-url', next);
    });
  }

  function observe(){
    const observer = new MutationObserver(function(mutations){
      let shouldRewrite = false;
      for(const m of mutations){
        if(m.type === 'childList' && m.addedNodes && m.addedNodes.length){
          shouldRewrite = true;
          break;
        }
        if(m.type === 'attributes' && (m.attributeName === 'href' || m.attributeName === 'data-article-url')){
          shouldRewrite = true;
          break;
        }
      }
      if(shouldRewrite) rewriteRoot();
    });
    observer.observe(document.documentElement, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ['href','data-article-url']
    });
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', function(){
      rewriteRoot();
      observe();
    }, { once:true });
  }else{
    rewriteRoot();
    observe();
  }
})();
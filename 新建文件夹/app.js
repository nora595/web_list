(function () {
  const { CATEGORIES, PRODUCTS } = window.BPS_LIST_DATA;

  const state = {
    view: 'simple',
    category: 'all',
    page: 2,
    sort: 'sales',
    favorites: new Set(PRODUCTS.filter((p) => p.favorited).map((p) => p.id)),
    loggedIn: true,
  };

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  function parseView() {
    const hash = location.hash.replace(/^#\/?/, '');
    state.view = hash === 'filter' ? 'filter' : 'simple';
    state.loggedIn = state.view === 'simple';
  }

  function showToast(msg) {
    let el = $('#toast');
    if (!el) {
      el = document.createElement('div');
      el.id = 'toast';
      el.className = 'toast';
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.classList.add('show');
    setTimeout(() => el.classList.remove('show'), 2000);
  }

  function renderToolbar() {
    return `
      <div class="demo-toolbar">
        <a href="#/simple" class="${state.view === 'simple' ? 'active' : ''}">Grid List</a>
        <a href="#/filter" class="${state.view === 'filter' ? 'active' : ''}">Filter List</a>
      </div>
    `;
  }

  function renderTopbar() {
    const greet = state.loggedIn
      ? 'Hi, Linsytest <span class="icon-exit" title="Logout">↗</span>'
      : 'Hi, Login/Register';
    return `
      <div class="topbar">
        <div class="container topbar-inner">
          <div class="topbar-left"><span class="user-greet">${greet}</span></div>
          <div class="topbar-center">
            <span class="service-info">Service call: 0757-81299039 &nbsp;|&nbsp; Service email: franchise@linsy.com</span>
          </div>
          <div class="topbar-right">
            <div class="topbar-tools">
              <button class="tool" type="button">English ▾</button>
              <span class="sep">|</span>
              <button class="tool" type="button">USD ▾</button>
              <span class="sep">|</span>
              <span class="guide">Guide</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function renderHeader() {
    const placeholder = state.view === 'filter' ? 'sofas' : 'Search';
    return `
      <header class="header">
        <div class="container header-inner">
          <div class="brand">
            <span class="brand-en">LINSY</span><span class="brand-cn">林氏</span>
          </div>
          <nav class="main-nav">
            <a class="nav-link" href="#">Home</a>
            <a class="nav-link active" href="#">Products <span class="arrow">▼</span></a>
            <a class="nav-link" href="#">Wishlist</a>
            <a class="nav-link" href="#">PO</a>
            <a class="nav-link" href="#">Account</a>
          </nav>
          <div class="search-box">
            <input type="text" placeholder="${placeholder}" />
            <button type="button" class="search-btn" aria-label="Search">🔍</button>
          </div>
        </div>
      </header>
    `;
  }

  function renderCategoryBar() {
    return `
      <div class="category-bar">
        <div class="container category-scroll">
          ${CATEGORIES.map((c) => `
            <button type="button" class="cat-item ${state.category === c.id ? 'active' : ''}" data-cat="${c.id}">
              <img class="cat-img" src="${c.img}" alt="${c.name}" />
              <span>${c.name}</span>
            </button>
          `).join('')}
          <button type="button" class="cat-arrow" aria-label="More categories">›</button>
        </div>
      </div>
    `;
  }

  function renderProductCard(p) {
    const fav = state.favorites.has(p.id);
    const thumbs = p.gallery.slice(0, 4);
    return `
      <article class="product-card" data-id="${p.id}">
        <div class="card-img">
          <img class="product-img" src="${p.image}" alt="${p.title}" loading="lazy" />
          <div class="thumb-dots">
            ${thumbs.map((t) => `<img class="dot-img" src="${t}" alt="" />`).join('')}
            <span class="more">+${p.images}</span>
          </div>
        </div>
        <div class="card-body">
          <div class="card-title-row">
            <h3 class="card-title">${p.title}</h3>
            <button type="button" class="fav-btn ${fav ? 'on' : ''}" data-fav="${p.id}" aria-label="Wishlist">♡</button>
          </div>
          <div class="card-price">$ ${p.price.toFixed(2)} USD</div>
          <div class="card-meta">
            <span>Est. Del: ${p.estDel}</span>
            <span>MOQ: ${p.moq} pcs</span>
            <span>Item: ${p.item}</span>
          </div>
        </div>
      </article>
    `;
  }

  function renderFilters() {
    return `
      <aside class="filter-panel">
        <div class="filter-head">
          <span>Filters</span>
          <button type="button" class="filter-reset" title="Reset filters">🗑</button>
        </div>
        <section class="filter-block">
          <h4>Label</h4>
          <div class="chip-group">
            <button type="button" class="chip active">New Arrivals</button>
            <button type="button" class="chip">Bestsellers</button>
          </div>
        </section>
        <section class="filter-block">
          <h4>Price</h4>
          <div class="range-wrap">
            <div class="range-bar">
              <div class="range-fill"></div>
              <span class="range-knob min"></span>
              <span class="range-knob max"></span>
            </div>
            <div class="range-labels"><span>$0</span><span>$5000</span></div>
          </div>
          <div class="chip-group">
            <button type="button" class="chip active">Any</button>
            <button type="button" class="chip">$0-$100</button>
            <button type="button" class="chip">$101-$500</button>
            <button type="button" class="chip">$501-$1000</button>
          </div>
        </section>
        <section class="filter-block">
          <h4>MOQ</h4>
          <div class="chip-group">
            <button type="button" class="chip active">Any</button>
            <button type="button" class="chip">1 Piece</button>
            <button type="button" class="chip">5 Pieces</button>
            <button type="button" class="chip">10 Pieces</button>
            <button type="button" class="chip">50 Pieces</button>
            <button type="button" class="chip">100 Pieces</button>
          </div>
        </section>
        <section class="filter-block">
          <h4>Delivery Time</h4>
          <div class="chip-group">
            <button type="button" class="chip active">Any</button>
            <button type="button" class="chip">7 days</button>
            <button type="button" class="chip">15 days</button>
            <button type="button" class="chip">30 days</button>
            <button type="button" class="chip">Over 30 days</button>
          </div>
        </section>
        <section class="filter-block">
          <h4>Product Material</h4>
          <label class="check"><input type="checkbox" checked /> Any Material</label>
          <label class="check"><input type="checkbox" /> Wood</label>
          <label class="check"><input type="checkbox" /> Metal</label>
          <label class="check"><input type="checkbox" /> Fabric</label>
          <label class="check"><input type="checkbox" /> Plastic</label>
          <label class="check"><input type="checkbox" /> Glass</label>
        </section>
        <section class="filter-block">
          <h4>Product Size</h4>
          <label class="check"><input type="checkbox" checked /> Any Size</label>
          <label class="check"><input type="checkbox" /> Small</label>
          <label class="check"><input type="checkbox" /> Medium</label>
          <label class="check"><input type="checkbox" /> Large</label>
          <label class="check"><input type="checkbox" /> Custom Size</label>
        </section>
      </aside>
    `;
  }

  function renderSortBar() {
    const sorts = [
      { id: 'date', label: 'Listing Date' },
      { id: 'price', label: 'Price' },
      { id: 'delivery', label: 'Delivery Time' },
      { id: 'sales', label: 'Sales' },
    ];
    return `
      <div class="sort-bar">
        ${sorts.map((s) => `
          <button type="button" class="sort-item ${state.sort === s.id ? 'active' : ''}" data-sort="${s.id}">
            ${s.label}${state.sort === s.id ? ' <span class="arrow-up">↑</span>' : ''}
          </button>
        `).join('')}
      </div>
    `;
  }

  function renderPagination() {
    const pages = [1, 2, 3, '...', 17];
    return `
      <div class="pagination">
        <button type="button" class="page-btn" data-page="prev">‹</button>
        ${pages.map((p) => typeof p === 'number'
    ? `<button type="button" class="page-btn ${state.page === p ? 'active' : ''}" data-page="${p}">${p}</button>`
    : `<span class="page-ellipsis">${p}</span>`).join('')}
        <button type="button" class="page-btn" data-page="next">›</button>
      </div>
    `;
  }

  function renderFooter() {
    return `
      <footer class="footer">
        <div class="container footer-grid">
          <div class="footer-brand">
            <div class="brand footer-logo"><span class="brand-en">LINSY</span><span class="brand-cn">林氏</span></div>
            <div class="footer-contact">Contact Us</div>
            <div>0757-81299039</div>
            <div class="globe">🌐</div>
          </div>
          <div class="footer-col">
            <h4>About LINSY</h4>
            <a>Brand Story</a><a>Why Choose Us</a><a>Company News</a><a>Contact Us</a>
          </div>
          <div class="footer-col">
            <h4>Investment Cooperation</h4>
            <a>Apply to Be a Distributor</a><a>Global Outlets</a><a>Our Strengths</a>
          </div>
          <div class="footer-col">
            <h4>Service Support</h4>
            <a>Warranty Service</a><a>Packaging Service</a><a>Delivery Service</a><a>VR Showroom</a><a>FAQS</a>
          </div>
          <div class="footer-col">
            <h4>Legal</h4>
            <a>Terms &amp; Conditions</a><a>Offers &amp; Details</a><a>Terms of Use</a><a>Privacy Policy</a>
            <a>SMS Program Terms</a><a>Dispute Resolution Process</a><a>Product Recalls</a>
            <a>Interest Based Ads</a><a>Do not sell or share my personal information</a>
          </div>
        </div>
        <div class="footer-bottom">FOSHAN LINSY HOME CO.,LTD 粤ICP备2021048987号-23 linsydirect.com</div>
      </footer>
    `;
  }

  function renderMain() {
    const isFilter = state.view === 'filter';
    const cols = isFilter ? 'cols-4' : 'cols-5';
    return `
      ${renderCategoryBar()}
      <div class="container page-products ${isFilter ? 'with-filter' : ''}">
        ${isFilter ? renderFilters() : ''}
        <section class="product-area">
          ${isFilter ? renderSortBar() : ''}
          <div class="product-grid ${cols}">
            ${PRODUCTS.map(renderProductCard).join('')}
          </div>
          ${renderPagination()}
        </section>
      </div>
    `;
  }

  function render() {
    parseView();
    $('#app').innerHTML = `
      ${renderToolbar()}
      ${renderTopbar()}
      ${renderHeader()}
      <main>${renderMain()}</main>
      ${renderFooter()}
    `;
    bindEvents();
  }

  function bindEvents() {
    $$('[data-cat]').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.category = btn.dataset.cat;
        render();
      });
    });

    $$('[data-fav]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.dataset.fav;
        if (state.favorites.has(id)) {
          state.favorites.delete(id);
          showToast('Removed from wishlist');
        } else {
          state.favorites.add(id);
          showToast('Added to wishlist');
        }
        btn.classList.toggle('on', state.favorites.has(id));
      });
    });

    $$('[data-sort]').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.sort = btn.dataset.sort;
        render();
      });
    });

    $$('[data-page]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const val = btn.dataset.page;
        if (val === 'prev' && state.page > 1) state.page -= 1;
        else if (val === 'next' && state.page < 17) state.page += 1;
        else if (!Number.isNaN(Number(val))) state.page = Number(val);
        render();
      });
    });

    $$('.chip').forEach((chip) => {
      chip.addEventListener('click', () => {
        const group = chip.closest('.chip-group');
        if (!group) return;
        group.querySelectorAll('.chip').forEach((c) => c.classList.remove('active'));
        chip.classList.add('active');
      });
    });

    $$('.product-card').forEach((card) => {
      card.addEventListener('click', () => showToast('Navigate to product detail'));
    });
  }

  window.addEventListener('hashchange', render);
  render();
})();

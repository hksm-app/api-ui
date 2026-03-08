/*!
 * @hikasami/api-ui v1.0.0
 * Dark API Reference UI for OpenAPI 3.x
 * https://github.com/hksm-app/api-ui
 * Apache License 2.0
 *
 * Usage:
 *   HikasamiApiUI.init({ specUrl: '/openapi.json', appName: 'My API' });
 */
(function (global) {
  'use strict';

  // ── DEFAULT CONFIG ──────────────────────────────────────────────────────────
  const DEFAULTS = {
    specUrl: '/openapi.json',
    appName: 'API Reference',
    logoSvg: '<svg width="284" height="276" viewBox="0 0 284 276" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M181.139 77.4309L221.819 76.8509L249.344 77.7285L247.538 78.0427C244.24 78.0926 240.474 78.1642 236.445 78.2408C236.442 78.2408 236.439 78.2409 236.435 78.2409H236.434C215.252 78.6437 186.824 79.1841 181.139 77.4309Z" fill="white"/><path d="M249.344 77.7285L258.204 78.011C256.009 77.9445 252.252 77.9714 247.538 78.0427L249.344 77.7285Z" fill="white"/><path fill-rule="evenodd" clip-rule="evenodd" d="M124.64 5.80026V11.4553L108.033 13.9203C98.7875 15.3704 90.5695 16.8203 89.5422 17.4003C88.6862 17.8353 85.9469 18.2704 83.5499 18.4154C79.2697 18.7054 45.7128 24.3604 40.2341 25.6654C38.6932 26.1004 37.6659 27.1154 38.3508 27.8405C38.8644 28.7105 35.7827 29.1454 30.1328 28.8555C30.1328 28.8555 17.241 28.25 17.6345 32.6254C17.9226 35.8284 24.9965 37.9905 24.9965 37.9905H37.1523C44.5143 37.9905 48.9657 38.5705 48.4521 39.2955C47.0824 41.3256 58.0398 41.0356 67.7987 39.0055C74.1334 37.7005 74.9895 37.1205 72.2501 36.2505C70.5381 35.6705 74.3047 35.3805 80.9818 35.5255C87.659 35.8155 98.4451 35.5255 104.951 34.9455C106.967 34.7823 108.792 34.6267 110.445 34.4857L110.463 34.4842L110.468 34.4837C119.858 33.6829 123.67 33.3577 125.361 34.8074C126.518 35.7984 126.683 37.6186 126.962 40.6831C127.031 41.4463 127.108 42.2866 127.208 43.2106C127.722 48.7206 128.749 58.2907 129.605 64.6708C130.29 71.0508 130.804 76.5609 130.461 76.8509C130.29 76.9959 123.613 77.8659 115.737 78.5909C107.862 79.3159 100.328 80.3309 98.9587 80.9109C96.2194 81.7809 95.3633 81.9259 84.0636 83.5209C77.044 84.5359 74.9895 83.5209 78.2425 80.4759C81.3242 77.5759 83.5499 69.4558 81.8378 66.8458C80.8106 65.2508 79.9546 62.4957 79.7833 60.4657C79.4409 57.7107 78.7561 57.1307 76.7016 58.1457C75.3319 58.7257 70.3668 59.3057 65.9154 59.3057C55.9853 59.4507 54.4444 60.1757 54.4444 64.8158C54.4444 66.9908 53.4172 68.2958 51.8763 68.2958C49.3082 68.2958 48.7945 70.1808 48.6233 82.6509L48.4521 89.176L38.8644 90.771L29.2767 92.511C29.2767 92.511 18.8709 95.8301 12.8407 98.9635C7.45477 101.762 0 107.301 0 107.301C0.684836 109.041 26.0238 110.201 37.1523 108.896L46.2264 107.881L45.1991 114.551C42.4598 132.531 37.1523 181.252 34.7554 209.672C34.5786 211.851 34.412 213.902 34.255 215.834L34.2511 215.882L34.2494 215.903C32.2844 240.087 31.8358 245.607 31.9488 251.12C31.9822 252.75 32.0648 254.379 32.1718 256.491L32.1873 256.797L32.5297 264.773L34.413 259.697L36.2963 254.622L37.3235 259.697C38.516 264.314 38.522 264.194 38.8593 257.336L38.8644 257.232C38.8644 253.172 39.7205 249.402 40.5765 248.967C41.2613 248.532 42.9734 244.327 44.0007 239.542C45.0279 234.757 46.9112 230.697 47.9385 230.407C48.9657 230.117 51.8763 219.097 54.4444 206.047C57.0126 192.852 59.5807 180.527 60.0943 178.497C60.6079 176.467 61.9776 169.652 63.0049 163.272C64.0321 156.892 65.9154 150.947 67.1139 150.222C68.3123 149.352 70.1956 144.131 71.3941 138.621C74.8183 122.816 80.4682 105.996 82.5227 105.851C83.0755 105.773 84.719 105.695 86.8396 105.594L86.8409 105.594L86.8422 105.594L86.8436 105.594L86.8449 105.594L86.8499 105.594L86.8526 105.594C88.67 105.508 90.8364 105.405 92.9664 105.271C97.7603 105.126 104.609 104.256 108.375 103.386C118.819 101.066 132.687 99.7611 133.714 101.211C134.057 101.791 135.084 107.591 135.597 113.971C136.282 120.351 137.994 133.691 139.364 143.696C142.617 167.332 142.959 169.797 145.356 183.572C145.907 186.992 146.458 190.536 146.903 193.402L146.903 193.406C147.288 195.885 147.594 197.856 147.753 198.797C152.376 227.507 154.43 237.512 155.8 238.672C156.827 239.542 157.17 238.817 156.485 236.497C153.403 223.157 151.177 191.112 153.574 194.447C154.43 195.462 155.8 201.407 156.485 207.497C158.026 223.012 159.738 224.027 159.395 209.237C158.882 196.767 159.053 196.622 161.621 201.552C162.991 204.307 165.217 213.442 166.586 221.852C168.47 234.612 172.921 257.957 176.688 275.648C177.03 277.678 177.201 270.718 176.859 260.422C176.174 243.747 176.345 242.587 177.886 250.997C178.742 256.072 180.454 260.712 181.481 261.292C182.509 261.872 183.878 264.773 184.734 267.818C185.762 272.313 185.933 271.008 185.762 262.307L185.419 250.997L181.139 206.482C179.256 204.887 176.688 182.847 178.571 182.847C179.427 182.847 179.427 182.267 178.228 181.687C177.03 181.107 176.174 179.367 176.345 177.772C176.516 172.987 174.291 157.617 168.983 126.441C166.244 110.201 164.018 96.716 164.018 96.426C164.018 95.991 171.722 94.976 178.228 94.541L183.022 94.396C195.198 91.6237 238.592 87.9037 263.6 85.7599L263.605 85.7595L263.619 85.7583C269.064 85.2915 273.636 84.8996 276.823 84.6084L283.886 83.5209L281.378 82.9033L262.837 83.2297L276.823 81.781C276.823 81.781 272.31 79.5137 269.119 78.736C265.01 77.7345 258.204 78.011 258.204 78.011L233.153 80.5449L247.538 78.0427C244.24 78.0926 240.474 78.1642 236.445 78.2408L236.435 78.2409H236.434C215.252 78.6437 186.824 79.1841 181.139 77.4309C179.256 79.0259 160.594 80.1859 160.594 78.7359C160.594 77.8659 162.648 76.8509 165.388 76.5609C169.839 75.9809 169.839 75.9809 164.703 75.6909C159.395 75.5459 159.224 75.2559 157.17 66.4108C155.971 61.4808 154.773 55.8257 154.602 53.7957C154.259 51.7657 153.574 48.8656 153.061 47.2706C152.804 46.4731 152.419 45.168 151.991 43.7178L151.99 43.7157L151.989 43.7115C151.561 42.2632 151.091 40.6709 150.664 39.2955L149.294 34.2205L164.018 31.9005C172.065 30.5955 179.427 29.7255 180.283 29.8705C180.283 29.8705 195.478 26.2454 195.478 24.2154C195.478 22.1854 194.194 21.1704 194.194 21.1704C194.194 21.1704 202.328 21.1906 205.75 18.4878C209.341 15.6522 209.603 8.35291 209.603 8.35291C206.259 8.01318 205.839 7.44962 206.307 6.52524C207.163 4.64023 206.649 4.35022 203.739 5.07523C199.287 6.38025 197.233 3.77023 201.17 1.59521C203.91 0.145203 203.739 0.000183105 199.972 0.725189C197.575 1.16022 183.022 3.33524 167.613 5.51025C142.617 8.9903 139.535 9.2803 137.652 7.25031C136.625 5.94528 133.201 3.91525 130.29 2.46524L124.64 0.000183105V5.80026ZM78.4137 21.8954C78.4137 22.6204 77.044 23.3454 75.5031 23.3454C72.935 23.3454 72.7638 23.0554 74.9895 21.8954C78.2424 20.1554 78.4137 20.1554 78.4137 21.8954ZM179.427 26.2454C176.688 27.6954 167.956 28.2754 169.497 26.9704C170.01 26.5354 172.236 25.8104 174.291 25.5204C176.345 25.2304 178.571 24.5054 179.084 24.0704C179.598 23.6354 180.454 23.6354 180.968 24.2154C181.481 24.6504 180.797 25.5204 179.427 26.2454ZM134.913 44.6606C134.913 53.0707 132.858 51.6207 131.831 42.7756C131.488 38.2806 131.831 36.3955 133.029 37.1205C134.057 37.5555 134.913 41.0356 134.913 44.6606ZM134.399 59.1607C133.885 60.6107 133.543 59.4507 133.543 56.6957C133.543 53.9407 133.885 52.7807 134.399 54.0857C134.741 55.5357 134.741 57.8557 134.399 59.1607ZM136.111 67.1358C135.597 68.1508 135.255 67.4258 135.255 65.3958C135.255 63.3658 135.597 62.6407 136.111 63.5108C136.453 64.5258 136.453 66.2658 136.111 67.1358ZM128.92 79.8959C129.434 80.6209 129.091 81.3459 128.235 81.3459C127.208 81.3459 126.352 80.6209 126.352 79.8959C126.352 79.0259 126.695 78.4459 127.037 78.4459C127.551 78.4459 128.407 79.0259 128.92 79.8959ZM77.2152 106.866C77.7288 107.446 77.2152 109.476 76.0167 111.651C74.6471 113.681 73.1062 118.176 72.4213 121.511C71.7365 124.991 70.7093 127.746 70.0244 127.746C69.1684 127.746 69.8532 122.816 71.2229 116.871C73.6198 106.576 74.6471 104.836 77.2152 106.866ZM203.469 85.3776H218.041L195.478 86.4515L203.469 85.3776ZM265.536 81.0818L259.059 81.6188L257.44 82.1558H259.599L265.536 81.0818Z" fill="white"/></svg>',
    logoImgUrl: null,
    faviconUrl: null,
    tokenKey: 'hau_jwt',
    accentColor: '#0B8AFC',
    mountId: 'hau-root',
  };

  let cfg = {};
  let spec = null;

  // ── INIT ────────────────────────────────────────────────────────────────────
  function init(options) {
    cfg = Object.assign({}, DEFAULTS, options || {});

    // Apply accent color CSS variable
    document.documentElement.style.setProperty('--hau-accent', cfg.accentColor);
    document.documentElement.style.setProperty('--hau-accent2', cfg.accentColor);

    _injectFonts();
    _applyFavicon();
    _injectHTML();
    _bindEvents();
    _loadSpec().catch(console.error);
  }

  // ── FONTS ──────────────────────────────────────────────────────────────────
  function _injectFonts() {
    if (document.querySelector('link[href*="fonts.googleapis.com/css2"][href*="Inter"]')) return;
    const preconnect1 = document.createElement('link');
    preconnect1.rel = 'preconnect';
    preconnect1.href = 'https://fonts.googleapis.com';
    const preconnect2 = document.createElement('link');
    preconnect2.rel = 'preconnect';
    preconnect2.href = 'https://fonts.gstatic.com';
    preconnect2.crossOrigin = '';
    const fonts = document.createElement('link');
    fonts.rel = 'stylesheet';
    fonts.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap';
    document.head.appendChild(preconnect1);
    document.head.appendChild(preconnect2);
    document.head.appendChild(fonts);
  }

  // ── FAVICON ─────────────────────────────────────────────────────────────────
  function _applyFavicon() {
    const href = cfg.faviconUrl || _resolveDefaultFavicon();
    if (!href) return;
    let link = document.querySelector('link[rel~="icon"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.href = href;
  }

  function _resolveDefaultFavicon() {
    const scripts = document.querySelectorAll('script[src]');
    for (let i = 0; i < scripts.length; i++) {
      const src = scripts[i].getAttribute('src');
      if (src && (src.includes('api-ui.js') || src.includes('api-ui.min.js'))) {
        return src.replace(/api-ui(\.min)?\.js$/, 'favicon.ico');
      }
    }
    return null;
  }

  // ── HTML SKELETON ───────────────────────────────────────────────────────────
  function _injectHTML() {
    const root = document.getElementById(cfg.mountId) || document.body;
    root.innerHTML = `
<header id="hau-hdr">
  <div class="hau-logo" id="hau-logo-link">
    <div class="hau-logo-icon">
      ${cfg.logoImgUrl ? `<img src="${_esc(cfg.logoImgUrl)}" alt="logo" />` : cfg.logoSvg}
    </div>
    <span class="hau-logo-name">${_esc(cfg.appName)}</span>
  </div>
  <div class="hau-divider"></div>
  <span class="hau-section">API Reference</span>
  <div class="hau-search">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
    <input id="hau-q" type="text" placeholder="Search endpoints..." autocomplete="off" spellcheck="false" />
  </div>
  <div class="hau-hdr-right">
    <span id="hau-ver">v1.0</span>
    <div id="hau-auth-wrap">
      <button id="hau-auth-btn">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        <span id="hau-auth-btn-label">Authorization</span>
        <span class="hau-auth-dot" id="hau-auth-dot"></span>
      </button>
      <div id="hau-auth-dropdown">
        <div class="hau-auth-dd-title">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          JWT Authorization
        </div>
        <div class="hau-auth-dd-sub">
          Token will be added as <code>Authorization: Bearer &lt;token&gt;</code> to all Try It requests.
        </div>
        <div class="hau-auth-dd-label">Access Token</div>
        <input id="hau-auth-token-input" type="password" placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." autocomplete="off" spellcheck="false" />
        <div class="hau-auth-dd-actions">
          <button id="hau-auth-save-btn">Save</button>
          <button id="hau-auth-clear-btn">Clear</button>
        </div>
        <div class="hau-auth-status-bar empty" id="hau-auth-status-bar">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          <span>No token set.</span>
        </div>
      </div>
    </div>
    <a id="hau-dl-btn" href="${_esc(cfg.specUrl)}" download="openapi.json">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
      OpenAPI
    </a>
  </div>
</header>

<div id="hau-body">
  <nav id="hau-sb"><div id="hau-sb-inner"></div><div id="hau-sb-resize" title="Drag to resize"></div></nav>
  <div id="hau-main">
    <div id="hau-doc">
      <div id="hau-landing">
        <div class="hau-landing-title">API Reference</div>
        <div class="hau-landing-sub" id="hau-landing-desc">Select an endpoint from the sidebar.</div>
        <div id="hau-landing-auth-status" class="noauth">
          <span class="hau-las-dot"></span>
          <span id="hau-landing-auth-text">Not authorized — requests sent without token</span>
        </div>
        <div class="hau-landing-stats">
          <div class="hau-stat-card"><div class="hau-stat-num" id="hau-stat-total">—</div><div class="hau-stat-lbl">Endpoints</div></div>
          <div class="hau-stat-card"><div class="hau-stat-num" id="hau-stat-tags">—</div><div class="hau-stat-lbl">Tags</div></div>
          <div class="hau-stat-card"><div class="hau-stat-num" id="hau-stat-get">—</div><div class="hau-stat-lbl">GET</div></div>
          <div class="hau-stat-card"><div class="hau-stat-num" id="hau-stat-post">—</div><div class="hau-stat-lbl">POST</div></div>
        </div>
        <div class="hau-methods-legend">
          <div class="hau-ml-item"><span class="hau-mb hau-mb-GET">GET</span> Read data</div>
          <div class="hau-ml-item"><span class="hau-mb hau-mb-POST">POST</span> Create</div>
          <div class="hau-ml-item"><span class="hau-mb hau-mb-PUT">PUT</span> Replace</div>
          <div class="hau-ml-item"><span class="hau-mb hau-mb-PATCH">PATCH</span> Update</div>
          <div class="hau-ml-item"><span class="hau-mb hau-mb-DELETE">DELETE</span> Delete</div>
        </div>
      </div>
      <div id="hau-ep-detail">
        <div class="hau-ep-hdr">
          <div class="hau-ep-hdr-top">
            <span class="hau-ep-method-badge" id="hau-ep-method-badge"></span>
            <span class="hau-ep-path-text" id="hau-ep-path-text"></span>
          </div>
          <div class="hau-ep-summary" id="hau-ep-summary"></div>
        </div>
        <div class="hau-ep-body" id="hau-ep-body"></div>
      </div>
    </div>
    <div id="hau-try-panel" class="hidden">
      <div id="hau-try-panel-resize" title="Drag to resize"></div>
      <div class="hau-try-hdr">
        <div>
          <div class="hau-try-hdr-title">Try It</div>
          <div class="hau-try-hdr-sub" id="hau-try-hdr-sub">Select an endpoint</div>
        </div>
        <button id="hau-try-execute-btn" disabled>Send</button>
      </div>
      <div id="hau-try-inner">
        <div id="hau-try-auth-section">
          <div class="hau-try-auth-title">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            Authorization
          </div>
          <input id="hau-try-bearer" type="password" placeholder="Bearer token (optional)" autocomplete="off" />
        </div>
        <div id="hau-try-fields"></div>
      </div>
      <div id="hau-try-response">
        <div id="hau-try-response-resize" title="Drag to resize"></div>
        <div id="hau-try-response-inner">
          <div class="hau-try-resp-empty" id="hau-try-resp-empty">Click Send to see the response</div>
          <div id="hau-try-resp-content" style="display:none">
            <div class="hau-try-resp-status">
              <span class="hau-try-resp-code" id="hau-try-resp-code"></span>
              <span class="hau-try-resp-time" id="hau-try-resp-time"></span>
            </div>
            <div class="hau-try-resp-tabs">
              <button class="hau-try-tab active" data-tab="body">Body</button>
              <button class="hau-try-tab" data-tab="headers">Headers</button>
            </div>
            <div class="hau-try-tab-body active" id="hau-tab-body">
              <div class="hau-code-block" id="hau-try-resp-body" style="overflow-y:auto;font-size:11px;"></div>
            </div>
            <div class="hau-try-tab-body" id="hau-tab-headers">
              <div class="hau-code-block" id="hau-try-resp-headers" style="overflow-y:auto;font-size:11px;"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`;
  }

  // ── TOKEN STORAGE ───────────────────────────────────────────────────────────
  function _getToken() {
    return localStorage.getItem(cfg.tokenKey) || '';
  }

  function _saveToken() {
    const val = _el('hau-auth-token-input').value.trim();
    val ? localStorage.setItem(cfg.tokenKey, val) : localStorage.removeItem(cfg.tokenKey);
    _updateAuthUI();
    const b = _el('hau-try-bearer');
    if (b) b.value = val;
    _closeAuthDropdown();
  }

  function _clearToken() {
    localStorage.removeItem(cfg.tokenKey);
    _el('hau-auth-token-input').value = '';
    const b = _el('hau-try-bearer');
    if (b) b.value = '';
    _updateAuthUI();
  }

  function _updateAuthUI() {
    const token = _getToken();
    const btn = _el('hau-auth-btn');
    const lbl = _el('hau-auth-btn-label');
    const dot = _el('hau-auth-dot');
    const bar = _el('hau-auth-status-bar');
    const ls = _el('hau-landing-auth-status');
    const lt = _el('hau-landing-auth-text');
    if (!btn) return;
    if (token) {
      btn.classList.add('authed');
      dot.style.background = '#1ec919';
      dot.style.boxShadow = '0 0 6px #1ec91929';
      lbl.textContent = 'Authorized';
      if (bar) {
        bar.className = 'hau-auth-status-bar ok';
        bar.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg><span>Token saved. All Try It requests will be authorized.</span>';
      }
      if (ls) {
        ls.className = 'authed';
      }
      if (lt) lt.textContent = 'Authorized — Bearer token will be sent with requests';
    } else {
      btn.classList.remove('authed');
      dot.style.background = '';
      dot.style.boxShadow = '';
      lbl.textContent = 'Authorization';
      if (bar) {
        bar.className = 'hau-auth-status-bar empty';
        bar.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg><span>No token set.</span>';
      }
      if (ls) {
        ls.className = 'noauth';
      }
      if (lt) lt.textContent = 'Not authorized — requests sent without token';
    }
  }

  function _toggleAuthDropdown() {
    const dd = _el('hau-auth-dropdown');
    const isOpen = dd.classList.toggle('open');
    if (isOpen) {
      _el('hau-auth-token-input').value = _getToken();
      setTimeout(() => _el('hau-auth-token-input').focus(), 50);
    }
  }

  function _closeAuthDropdown() {
    _el('hau-auth-dropdown').classList.remove('open');
  }

  // ── SPEC ────────────────────────────────────────────────────────────────────
  async function _loadSpec() {
    const res = await fetch(cfg.specUrl);
    spec = await res.json();
    if (spec.info) {
      if (spec.info.version) _el('hau-ver').textContent = 'v' + spec.info.version;
      if (spec.info.description) _el('hau-landing-desc').textContent = spec.info.description;
    }
    _buildSidebar();
    _buildStats();
    _updateAuthUI();
    _restoreFromHash();
    const stored = _getToken();
    const b = _el('hau-try-bearer');
    if (b && stored) b.value = stored;
  }

  function _buildStats() {
    const paths = spec.paths || {};
    let total = 0,
      gets = 0,
      posts = 0;
    const tagSet = new Set();
    Object.entries(paths).forEach(([, methods]) => {
      Object.entries(methods).forEach(([method, op]) => {
        if (!['get', 'post', 'put', 'patch', 'delete'].includes(method)) return;
        total++;
        if (method === 'get') gets++;
        if (method === 'post') posts++;
        (op.tags || ['Default']).forEach(t => tagSet.add(t));
      });
    });
    _el('hau-stat-total').textContent = total;
    _el('hau-stat-tags').textContent = tagSet.size;
    _el('hau-stat-get').textContent = gets;
    _el('hau-stat-post').textContent = posts;
  }

  function _restoreFromHash() {
    const hash = location.hash.slice(1);
    if (!hash) return;
    let method, path;
    try {
      const decoded = decodeURIComponent(hash);
      const sep = decoded.indexOf('|');
      if (sep < 0) return;
      method = decoded.slice(0, sep).toUpperCase();
      path = decoded.slice(sep + 1);
    } catch (_) {
      return;
    }
    if (!['GET', 'POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) return;
    const paths = spec.paths || {};
    const op = paths[path] && paths[path][method.toLowerCase()];
    if (!op) return;
    const btn = Array.from(document.querySelectorAll('.hau-sb-ep')).find(el => el.dataset.method === method && el.dataset.path === path);
    if (btn) {
      const group = btn.closest('.hau-sb-group');
      if (group) {
        group.querySelector('.hau-sb-eps').classList.add('open');
        group.querySelector('.hau-sb-group-hd').classList.add('open');
      }
    }
    _openOp(method, path, op, btn || null);
  }

  function _buildSidebar() {
    const paths = spec.paths || {};
    const tags = {};
    Object.entries(paths).forEach(([path, methods]) => {
      Object.entries(methods).forEach(([method, op]) => {
        if (!['get', 'post', 'put', 'patch', 'delete'].includes(method)) return;
        const tl = (op.tags && op.tags.length) ? op.tags : ['Default'];
        tl.forEach(tag => {
          if (!tags[tag]) tags[tag] = [];
          tags[tag].push({
            method: method.toUpperCase(),
            path,
            op
          });
        });
      });
    });
    const nav = _el('hau-sb-inner');
    nav.innerHTML = '';
    Object.entries(tags).sort((a, b) => a[0].localeCompare(b[0])).forEach(([tag, eps]) => {
      const g = document.createElement('div');
      g.className = 'hau-sb-group';
      const hd = document.createElement('div');
      hd.className = 'hau-sb-group-hd';
      hd.innerHTML = `<svg class="hau-sb-group-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg><span class="hau-sb-group-name">${_esc(tag)}</span><span class="hau-sb-group-cnt">${eps.length}</span>`;
      const list = document.createElement('div');
      list.className = 'hau-sb-eps';
      eps.forEach(ep => {
        const btn = document.createElement('button');
        btn.className = 'hau-sb-ep';
        btn.dataset.method = ep.method;
        btn.dataset.path = ep.path;
        const name = ep.op.summary || ep.path;
        btn.innerHTML = `<span class="hau-mb hau-mb-${ep.method}">${ep.method}</span><span class="hau-sb-ep-name" title="${_esc(name)}">${_esc(name)}</span>`;
        btn.addEventListener('click', () => _openOp(ep.method, ep.path, ep.op, btn));
        list.appendChild(btn);
      });
      hd.addEventListener('click', () => {
        const o = list.classList.toggle('open');
        hd.classList.toggle('open', o);
      });
      g.appendChild(hd);
      g.appendChild(list);
      nav.appendChild(g);
    });
  }

  function _openOp(method, path, op, btn) {
    location.hash = encodeURIComponent(method + '|' + path);
    document.querySelectorAll('.hau-sb-ep').forEach(e => e.classList.remove('active'));
    if (btn) btn.classList.add('active');
    _el('hau-landing').style.display = 'none';
    _el('hau-ep-detail').style.display = 'block';
    const badge = _el('hau-ep-method-badge');
    badge.textContent = method;
    badge.className = `hau-ep-method-badge hau-mb hau-mb-${method}`;
    badge.style.fontSize = '13px';
    badge.style.padding = '4px 12px';
    _el('hau-ep-path-text').textContent = path;
    _el('hau-ep-summary').textContent = op.summary || op.description || '';
    _renderEpBody(method, path, op);
    _renderTryPanel(method, path, op);
    _el('hau-try-panel').classList.remove('hidden');
    _el('hau-doc').scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  function _goHome() {
    if (location.hash) history.replaceState(null, '', location.pathname + location.search);
    document.querySelectorAll('.hau-sb-ep').forEach(e => e.classList.remove('active'));
    _el('hau-landing').style.display = '';
    _el('hau-ep-detail').style.display = 'none';
    _el('hau-try-panel').classList.add('hidden');
    _el('hau-doc').scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    _updateAuthUI();
  }

  // ── PARAMETER RESOLUTION ─────────────────────────────────────────────────
  function _resolveParam(p) {
    if (p && p.$ref) {
      const name = p.$ref.split('/').pop();
      return (spec.components && spec.components.parameters && spec.components.parameters[name]) || p;
    }
    return p;
  }

  function _resolveAllParams(path, op) {
    const pathItem = spec.paths && spec.paths[path] || {};
    const pathLevel = (pathItem.parameters || []).map(_resolveParam);
    const opLevel = (op.parameters || []).map(_resolveParam);
    const merged = new Map();
    pathLevel.forEach(p => merged.set(p.name + '|' + p.in, p));
    opLevel.forEach(p => merged.set(p.name + '|' + p.in, p));
    return Array.from(merged.values());
  }

  // ── DOC BODY ────────────────────────────────────────────────────────────────
  function _renderEpBody(method, path, op) {
    const body = _el('hau-ep-body');
    let html = '';
    if (op.description && op.description !== op.summary)
      html += `<div class="hau-ep-section"><div class="hau-ep-section-title">Description</div><p style="color:var(--hau-t2);font-size:13.5px;line-height:1.7;">${_esc(op.description)}</p></div>`;
    const allParams = _resolveAllParams(path, op);
    if (allParams.length) {
      html += '<div class="hau-ep-section"><div class="hau-ep-section-title">Parameters</div><table class="hau-params-table"><thead><tr><th>Name</th><th>Type</th><th>Description</th></tr></thead><tbody>';
      allParams.forEach(p => {
        const s = p.schema || {};
        const type = s.type || 'string';
        const req = p.required ? '<span class="hau-param-req">*</span>' : '';
        const enums = s.enum ? s.enum.map(v => `<span class="hau-enum-val">${_esc(v)}</span>`).join('') : '';
        html += `<tr><td><div class="hau-param-name">${_esc(p.name)}${req}</div><div class="hau-param-in">${_esc(p.in)}</div></td><td><span class="hau-param-type">${_esc(type)}${s.format ? ' &lt;' + _esc(s.format) + '&gt;' : ''}</span></td><td><span class="hau-param-desc">${_esc(p.description || '—')}</span>${enums ? '<div class="hau-param-enum">' + enums + '</div>' : ''}</td></tr>`;
      });
      html += '</tbody></table></div>';
    }
    if (op.requestBody) {
      html += '<div class="hau-ep-section"><div class="hau-ep-section-title">Request Body</div>';
      Object.entries(op.requestBody.content || {}).forEach(([mime, media]) => {
        html += `<div style="font-size:11px;color:var(--hau-t3);margin-bottom:8px;font-family:'JetBrains Mono',monospace;">${_esc(mime)}</div>`;
        if (media.schema) html += _codeBlock(JSON.stringify(_buildExample(media.schema), null, 2));
      });
      html += '</div>';
    }
    if (op.responses) {
      html += '<div class="hau-ep-section"><div class="hau-ep-section-title">Responses</div>';
      Object.entries(op.responses).forEach(([code, resp]) => {
        const cls = _respClass(code);
        html += `<div class="hau-resp-item"><div class="hau-resp-head" data-hau-toggle-resp><svg class="hau-resp-arr" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg><span class="hau-resp-code ${cls}">${_esc(code)}</span><span class="hau-resp-desc">${_esc(resp.description || '')}</span></div><div class="hau-resp-body">`;
        const ct2 = resp.content || {};
        let hasContent = false;
        Object.entries(ct2).forEach(([, media]) => {
          hasContent = true;
          if (media.schema) html += _codeBlock(JSON.stringify(_buildExample(media.schema), null, 2));
        });
        if (!hasContent) html += '<div style="padding:12px 16px;font-size:12px;color:var(--hau-t3);">No content</div>';
        html += '</div></div>';
      });
      html += '</div>';
    }
    body.innerHTML = html;
    body.querySelectorAll('[data-hau-toggle-resp]').forEach(hd => hd.addEventListener('click', () => hd.closest('.hau-resp-item').classList.toggle('open')));
    body.querySelectorAll('[data-hau-copy]').forEach(btn => btn.addEventListener('click', () => _copyCode(btn)));
  }

  function _codeBlock(code) {
    const id = 'hau_cb_' + Math.random().toString(36).slice(2);
    return `<div class="hau-code-block" id="${id}"><button class="hau-code-copy" data-hau-copy data-target="${id}">Copy</button>${_syntaxJSON(_esc(code))}</div>`;
  }

  function _copyCode(btn) {
    const el = document.getElementById(btn.dataset.target);
    const text = el.innerText.replace('Copy', '').trim();
    navigator.clipboard.writeText(text).then(() => {
      btn.textContent = 'Copied!';
      btn.classList.add('copied');
      setTimeout(() => {
        btn.textContent = 'Copy';
        btn.classList.remove('copied');
      }, 1600);
    });
  }

  // ── TRY-IT ──────────────────────────────────────────────────────────────────
  function _renderTryPanel(method, path, op) {
    _el('hau-try-hdr-sub').textContent = method + ' ' + path;
    const btn = _el('hau-try-execute-btn');
    btn.disabled = false;
    btn.onclick = () => _executeRequest(method, path, op);
    _el('hau-try-resp-empty').style.display = 'block';
    _el('hau-try-resp-content').style.display = 'none';
    const b = _el('hau-try-bearer');
    if (b) b.value = _getToken();
    const fields = _el('hau-try-fields');
    fields.innerHTML = '';
    const resolvedParams = _resolveAllParams(path, op);
    const pathParams = resolvedParams.filter(p => p.in === 'path');
    const queryParams = resolvedParams.filter(p => p.in === 'query');
    const headerParams = resolvedParams.filter(p => p.in === 'header');
    [
      ['Path Parameters', pathParams, 'path', true],
      ['Query Parameters', queryParams, 'query', false],
      ['Header Parameters', headerParams, 'header', false]
    ].forEach(([title, params, inType, isPath]) => {
      if (!params.length) return;
      let h = `<div class="hau-try-section"><div class="hau-try-section-title">${title}</div>`;
      params.forEach(p => {
        h += `<div class="hau-try-field"><div class="hau-try-label">${_esc(p.name)}${p.required ? '<span class="hau-req-star">*</span>' : ''} <span style="color:var(--hau-t3);font-weight:400;font-size:10px;">${inType}</span></div><input class="hau-try-input${isPath ? ' is-path-param' : ''}" data-in="${inType}" data-name="${_esc(p.name)}" placeholder="${_esc(p.description || p.name)}" /></div>`;
      });
      h += '</div>';
      fields.innerHTML += h;
    });
    if (op.requestBody) {
      const ct = op.requestBody.content || {};
      const mime = Object.keys(ct)[0] || 'application/json';
      const ex = _buildExample((ct[mime] || {}).schema || {});
      fields.innerHTML += `<div class="hau-try-section"><div class="hau-try-section-title">Request Body</div><textarea class="hau-try-input" id="hau-try-body-input" rows="8" style="resize:vertical;min-height:120px;font-size:11px;" data-mime="${_esc(mime)}">${_esc(JSON.stringify(ex, null, 2))}</textarea></div>`;
    }
  }

  async function _executeRequest(method, path, op) {
    const btn = _el('hau-try-execute-btn');
    btn.disabled = true;
    btn.textContent = 'Sending…';
    let url = path;
    const queryParts = [];
    const extraHeaders = {};
    document.querySelectorAll('#hau-try-fields .hau-try-input').forEach(inp => {
      const val = inp.value.trim();
      if (!val) return;
      if (inp.dataset.in === 'path') url = url.replace('{' + inp.dataset.name + '}', encodeURIComponent(val));
      if (inp.dataset.in === 'query') queryParts.push(encodeURIComponent(inp.dataset.name) + '=' + encodeURIComponent(val));
      if (inp.dataset.in === 'header') extraHeaders[inp.dataset.name] = val;
    });
    if (queryParts.length) url += '?' + queryParts.join('&');
    const bearer = (_el('hau-try-bearer').value.trim()) || _getToken();
    const reqHeaders = {
      'Content-Type': 'application/json',
      ...extraHeaders
    };
    if (bearer) reqHeaders['Authorization'] = 'Bearer ' + bearer;
    const fetchOpts = {
      method,
      headers: reqHeaders
    };
    const bodyEl = _el('hau-try-body-input');
    if (bodyEl && bodyEl.value.trim()) {
      fetchOpts.headers['Content-Type'] = bodyEl.dataset.mime || 'application/json';
      fetchOpts.body = bodyEl.value.trim();
    }
    const t0 = Date.now();
    try {
      const resp = await fetch(url, fetchOpts);
      const elapsed = Date.now() - t0;
      const text = await resp.text();
      let pretty = text;
      try {
        pretty = JSON.stringify(JSON.parse(text), null, 2);
      } catch (e) {}
      const codeEl = _el('hau-try-resp-code');
      codeEl.textContent = resp.status + ' ' + resp.statusText;
      codeEl.style.color = resp.ok ? 'var(--hau-get-c)' : 'var(--hau-del-c)';
      _el('hau-try-resp-time').textContent = elapsed + 'ms';
      _el('hau-try-resp-body').innerHTML = _syntaxJSON(_esc(pretty));
      const hdrs = [];
      resp.headers.forEach((v, k) => hdrs.push(k + ': ' + v));
      _el('hau-try-resp-headers').textContent = hdrs.join('\n');
      _el('hau-try-resp-empty').style.display = 'none';
      _el('hau-try-resp-content').style.display = 'block';
    } catch (e) {
      const codeEl = _el('hau-try-resp-code');
      codeEl.textContent = 'Error';
      codeEl.style.color = 'var(--hau-del-c)';
      _el('hau-try-resp-time').textContent = '';
      _el('hau-try-resp-body').textContent = String(e);
      _el('hau-try-resp-empty').style.display = 'none';
      _el('hau-try-resp-content').style.display = 'block';
    }
    btn.disabled = false;
    btn.textContent = 'Send';
  }

  // ── RESIZE ──────────────────────────────────────────────────────────────────
  function _initResize() {
    // Try response panel (vertical)
    const handle = _el('hau-try-response-resize');
    const panel = _el('hau-try-response');
    if (handle && panel) {
      const saved = localStorage.getItem('hau_resp_h');
      if (saved) panel.style.height = saved + 'px';
      let startY = 0, startH = 0, dragging = false;
      handle.addEventListener('mousedown', e => {
        dragging = true;
        startY = e.clientY;
        startH = panel.getBoundingClientRect().height;
        handle.classList.add('dragging');
        document.body.style.userSelect = 'none';
        document.body.style.cursor = 'ns-resize';
        e.preventDefault();
      });
      document.addEventListener('mousemove', e => {
        if (!dragging) return;
        const d = startY - e.clientY;
        panel.style.height = Math.max(56, Math.min(startH + d, window.innerHeight * .8)) + 'px';
      });
      document.addEventListener('mouseup', () => {
        if (!dragging) return;
        dragging = false;
        handle.classList.remove('dragging');
        document.body.style.userSelect = '';
        document.body.style.cursor = '';
        localStorage.setItem('hau_resp_h', parseInt(panel.style.height));
      });
    }

    // Sidebar (horizontal resize)
    const sbResize = _el('hau-sb-resize');
    const sb = _el('hau-sb');
    if (sbResize && sb) {
      const savedSb = localStorage.getItem('hau_sb_w');
      if (savedSb) {
        const w = parseInt(savedSb, 10);
        if (w >= 180 && w <= 500) sb.style.width = w + 'px';
      }
      let startX = 0, startW = 0, sbDragging = false;
      sbResize.addEventListener('mousedown', e => {
        sbDragging = true;
        startX = e.clientX;
        startW = sb.getBoundingClientRect().width;
        sbResize.classList.add('dragging');
        document.body.style.userSelect = 'none';
        document.body.style.cursor = 'col-resize';
        e.preventDefault();
      });
      document.addEventListener('mousemove', e => {
        if (!sbDragging) return;
        const d = e.clientX - startX;
        const w = Math.max(180, Math.min(500, startW + d));
        sb.style.width = w + 'px';
      });
      document.addEventListener('mouseup', () => {
        if (!sbDragging) return;
        sbDragging = false;
        sbResize.classList.remove('dragging');
        document.body.style.userSelect = '';
        document.body.style.cursor = '';
        localStorage.setItem('hau_sb_w', parseInt(sb.style.width));
      });
    }

    // Try panel (horizontal resize)
    const tpResize = _el('hau-try-panel-resize');
    const tp = _el('hau-try-panel');
    if (tpResize && tp) {
      const savedTp = localStorage.getItem('hau_tp_w');
      if (savedTp) {
        const w = parseInt(savedTp, 10);
        if (w >= 300 && w <= 600) tp.style.width = w + 'px';
      }
      let startX = 0, startW = 0, tpDragging = false;
      tpResize.addEventListener('mousedown', e => {
        tpDragging = true;
        startX = e.clientX;
        startW = tp.getBoundingClientRect().width;
        tpResize.classList.add('dragging');
        document.body.style.userSelect = 'none';
        document.body.style.cursor = 'col-resize';
        e.preventDefault();
      });
      document.addEventListener('mousemove', e => {
        if (!tpDragging) return;
        const d = startX - e.clientX;
        const w = Math.max(300, Math.min(600, startW + d));
        tp.style.width = w + 'px';
      });
      document.addEventListener('mouseup', () => {
        if (!tpDragging) return;
        tpDragging = false;
        tpResize.classList.remove('dragging');
        document.body.style.userSelect = '';
        document.body.style.cursor = '';
        localStorage.setItem('hau_tp_w', parseInt(tp.style.width));
      });
    }
  }

  // ── EVENTS ──────────────────────────────────────────────────────────────────
  function _bindEvents() {
    document.addEventListener('click', e => {
      const wrap = _el('hau-auth-wrap');
      if (wrap && !wrap.contains(e.target)) _closeAuthDropdown();
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') _closeAuthDropdown();
    });

    // Logo → home (delegated since DOM may not exist yet at bind time)
    document.addEventListener('click', e => {
      const logo = e.target.closest('#hau-logo-link');
      if (logo) {
        e.preventDefault();
        _goHome();
      }
    });

    // Auth buttons (delegated)
    document.addEventListener('click', e => {
      if (e.target.closest('#hau-auth-btn')) _toggleAuthDropdown();
      if (e.target.closest('#hau-auth-save-btn')) _saveToken();
      if (e.target.closest('#hau-auth-clear-btn')) _clearToken();
    });

    // Tab switching
    document.addEventListener('click', e => {
      const tab = e.target.closest('.hau-try-tab');
      if (!tab) return;
      document.querySelectorAll('.hau-try-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.hau-try-tab-body').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      _el('hau-tab-' + tab.dataset.tab).classList.add('active');
    });

    // Search
    document.addEventListener('input', e => {
      if (e.target.id !== 'hau-q') return;
      const q = e.target.value.trim().toLowerCase();
      document.querySelectorAll('.hau-sb-group').forEach(g => {
        const eps = g.querySelectorAll('.hau-sb-ep');
        let any = false;
        eps.forEach(ep => {
          const show = !q || ep.textContent.toLowerCase().includes(q);
          ep.classList.toggle('hau-sh', !show);
          if (show) any = true;
        });
        g.style.display = any ? '' : 'none';
        if (q && any) {
          g.querySelector('.hau-sb-eps').classList.add('open');
          g.querySelector('.hau-sb-group-hd').classList.add('open');
        }
      });
    });

    // Hash change (back/forward) - restore endpoint from URL
    window.addEventListener('hashchange', () => {
      if (!spec) return;
      const hash = location.hash.slice(1);
      if (!hash) {
        _goHome();
        return;
      }
      _restoreFromHash();
    });

    // Resize init after DOM injected
    setTimeout(_initResize, 0);
  }

  // ── UTILS ───────────────────────────────────────────────────────────────────
  function _el(id) {
    return document.getElementById(id);
  }

  function _esc(s) {
    return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function _respClass(code) {
    const n = parseInt(code) || 0;
    if (n >= 200 && n < 300) return 'hau-resp-2xx';
    if (n >= 300 && n < 400) return 'hau-resp-3xx';
    if (n >= 400) return 'hau-resp-4xx';
    return 'hau-resp-5xx';
  }

  function _syntaxJSON(json) {
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, m => {
      let cls = 'color:#b5d0ff';
      if (/^"/.test(m)) {
        cls = /:$/.test(m) ? 'color:#9db8ff' : 'color:#a8e6cf';
      } else if (/true|false/.test(m)) {
        cls = 'color:#f8a4a4';
      } else if (/null/.test(m)) {
        cls = 'color:#888';
      }
      return '<span style="' + cls + '">' + m + '</span>';
    });
  }

  function _buildExample(schema, depth) {
    depth = depth || 0;
    if (depth > 4) return '...';
    if (!schema) return null;
    if (schema.$ref) {
      const n = schema.$ref.split('/').pop();
      return _buildExample((spec.components && spec.components.schemas && spec.components.schemas[n]) || {}, depth + 1);
    }
    if (schema.example !== undefined) return schema.example;
    if (schema.type === 'object' || schema.properties) {
      const out = {};
      Object.entries(schema.properties || {}).forEach(([k, v]) => {
        out[k] = _buildExample(v, depth + 1);
      });
      return out;
    }
    if (schema.type === 'array') return [_buildExample(schema.items || {}, depth + 1)];
    return {
      string: 'string',
      integer: 0,
      number: 0.0,
      boolean: true
    } [schema.type] || null;
  }

  // ── PUBLIC API ──────────────────────────────────────────────────────────────
  global.HikasamiApiUI = {
    init
  };

})(typeof window !== 'undefined' ? window : this);
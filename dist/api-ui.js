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
    logoSvg: '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5"><path d="M12 2L2 7l10 5 10-5-10-5M2 17l10 5 10-5M2 12l10 5 10-5"/></svg>',
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

    _applyFavicon();
    _injectHTML();
    _bindEvents();
    _loadSpec().catch(console.error);
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
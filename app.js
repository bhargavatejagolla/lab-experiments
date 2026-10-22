// CodeLab Hub Application Logic
(function() {
    'use strict';

    // Application State
    const state = {
        data: window.APP_DATA || { experiments: [], comparisons: [] },
        currentLevel: 'all',
        currentCategory: 'All',
        currentSearch: '',
        currentView: 'grid', // 'grid' | 'reader' | 'compare'
        activeExpId: 'simple-1',
        activeFileIndex: 0,
        activeStageTab: 'code',
        wrapLines: false,
        fontSize: 14,
        completed: JSON.parse(localStorage.getItem('zfsd_completed') || '{}')
    };

    // DOM Elements Cache
    const el = {
        searchInput: document.getElementById('searchInput'),
        progressText: document.getElementById('progressText'),
        progressBar: document.getElementById('progressBar'),
        viewGrid: document.getElementById('viewGrid'),
        viewReader: document.getElementById('viewReader'),
        viewCompare: document.getElementById('viewCompare'),
        btnViewGrid: document.getElementById('btnViewGrid'),
        btnViewReader: document.getElementById('btnViewReader'),
        btnViewCompare: document.getElementById('btnViewCompare'),
        tabAll: document.getElementById('tabAll'),
        tabSimple: document.getElementById('tabSimple'),
        tabComplex: document.getElementById('tabComplex'),
        countAll: document.getElementById('countAll'),
        countSimple: document.getElementById('countSimple'),
        countComplex: document.getElementById('countComplex'),
        sidebarList: document.getElementById('sidebarList'),
        sidebarCount: document.getElementById('sidebarCount'),
        stageTitle: document.getElementById('stageTitle'),
        stageSubtitle: document.getElementById('stageSubtitle'),
        stageMetaPills: document.getElementById('stageMetaPills'),
        stageCheckCompleted: document.getElementById('stageCheckCompleted'),
        fileTabsContainer: document.getElementById('fileTabsContainer'),
        codeViewerElem: document.getElementById('codeViewerElem'),
        codeViewerBox: document.getElementById('codeViewerBox'),
        explainAim: document.getElementById('explainAim'),
        explainConcepts: document.getElementById('explainConcepts'),
        explainWalkthrough: document.getElementById('explainWalkthrough'),
        runCommandsContainer: document.getElementById('runCommandsContainer'),
        sandboxContainer: document.getElementById('sandboxContainer'),
        vivaContainer: document.getElementById('vivaContainer'),
        comparisonList: document.getElementById('comparisonList'),
        toast: document.getElementById('toast'),
        toastMsg: document.getElementById('toastMsg')
    };

    // -----------------------------------------------------------------
    // THEME MANAGEMENT
    // -----------------------------------------------------------------
    function initTheme() {
        const saved = localStorage.getItem('zfsd_theme') || 'dark';
        document.body.setAttribute('data-theme', saved);
        updatePrismTheme(saved);
    }

    window.toggleTheme = function() {
        const current = document.body.getAttribute('data-theme') || 'dark';
        const next = current === 'dark' ? 'light' : 'dark';
        document.body.setAttribute('data-theme', next);
        localStorage.setItem('zfsd_theme', next);
        updatePrismTheme(next);
        showToast('Switched to ' + (next === 'dark' ? 'Dark' : 'Light') + ' Theme');
    };

    function updatePrismTheme(theme) {
        const link = document.getElementById('prism-theme');
        if (!link) return;
        if (theme === 'light') {
            link.href = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism.min.css';
        } else {
            link.href = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css';
        }
    }

    // -----------------------------------------------------------------
    // PROGRESS TRACKER
    // -----------------------------------------------------------------
    function updateProgress() {
        const total = state.data.experiments.length;
        const done = Object.values(state.completed).filter(Boolean).length;
        const pct = total > 0 ? Math.round((done / total) * 100) : 0;
        if (el.progressText) el.progressText.textContent = `${done} / ${total} Revised (${pct}%)`;
        if (el.progressBar) el.progressBar.style.width = pct + '%';
    }

    window.toggleCompleted = function(expId, e) {
        if (e) e.stopPropagation();
        state.completed[expId] = !state.completed[expId];
        localStorage.setItem('zfsd_completed', JSON.stringify(state.completed));
        updateProgress();
        renderCardGrid();
        renderSidebar();
        if (state.activeExpId === expId && el.stageCheckCompleted) {
            el.stageCheckCompleted.checked = !!state.completed[expId];
        }
    };

    window.toggleStageCompleted = function() {
        if (!el.stageCheckCompleted) return;
        state.completed[state.activeExpId] = el.stageCheckCompleted.checked;
        localStorage.setItem('zfsd_completed', JSON.stringify(state.completed));
        updateProgress();
        renderCardGrid();
        renderSidebar();
    };

    // -----------------------------------------------------------------
    // FILTERING & SEARCH
    // -----------------------------------------------------------------
    function getFilteredExperiments() {
        return state.data.experiments.filter(exp => {
            if (state.currentLevel !== 'all' && exp.level !== state.currentLevel) return false;
            if (state.currentCategory !== 'All' && exp.category !== state.currentCategory) return false;
            if (state.currentSearch) {
                const q = state.currentSearch.toLowerCase();
                const mTitle = exp.title.toLowerCase().includes(q);
                const mSub = exp.subtitle.toLowerCase().includes(q);
                const mCat = exp.category.toLowerCase().includes(q);
                const mTags = exp.tags.some(t => t.toLowerCase().includes(q));
                const mFiles = exp.files.some(f => f.name.toLowerCase().includes(q) || f.content.toLowerCase().includes(q));
                return mTitle || mSub || mCat || mTags || mFiles;
            }
            return true;
        });
    }

    window.filterLevel = function(level) {
        state.currentLevel = level;
        if (el.tabAll) el.tabAll.classList.toggle('active', level === 'all');
        if (el.tabSimple) el.tabSimple.classList.toggle('active', level === 'simple');
        if (el.tabComplex) el.tabComplex.classList.toggle('active', level === 'complex');
        renderCardGrid();
        renderSidebar();
    };

    window.filterCategory = function(cat) {
        state.currentCategory = cat;
        document.querySelectorAll('.tag-pill').forEach(p => {
            const isMatch = cat === 'All' ? p.textContent.includes('All Categories') : p.textContent.includes(cat);
            p.classList.toggle('active', isMatch);
        });
        renderCardGrid();
        renderSidebar();
    };

    window.handleSearch = function() {
        state.currentSearch = el.searchInput ? el.searchInput.value.trim() : '';
        renderCardGrid();
        renderSidebar();
    };

    // -----------------------------------------------------------------
    // VIEW SWITCHING
    // -----------------------------------------------------------------
    window.switchView = function(view) {
        state.currentView = view;
        if (el.btnViewGrid) el.btnViewGrid.classList.toggle('active', view === 'grid');
        if (el.btnViewReader) el.btnViewReader.classList.toggle('active', view === 'reader');
        if (el.btnViewCompare) el.btnViewCompare.classList.toggle('active', view === 'compare');

        if (el.viewGrid) el.viewGrid.style.display = view === 'grid' ? 'grid' : 'none';
        if (el.viewReader) el.viewReader.style.display = view === 'reader' ? 'grid' : 'none';
        if (el.viewCompare) el.viewCompare.style.display = view === 'compare' ? 'flex' : 'none';

        if (view === 'grid') renderCardGrid();
        if (view === 'reader') renderReader();
        if (view === 'compare') renderComparison();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // -----------------------------------------------------------------
    // CARD GRID EXPLORER
    // -----------------------------------------------------------------
    function renderCardGrid() {
        if (!el.viewGrid) return;
        const items = getFilteredExperiments();

        if (items.length === 0) {
            el.viewGrid.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
                    <div style="font-size: 42px; margin-bottom: 12px;">🔍</div>
                    <h3 style="font-size: 18px; margin-bottom: 8px;">No matching experiments found</h3>
                    <p style="color: var(--text-secondary); font-size: 14px;">Try clearing your search query or level filters.</p>
                    <button class="btn-read" style="margin: 16px auto; max-width: 180px;" onclick="document.getElementById('searchInput').value=''; handleSearch(); filterLevel('all'); filterCategory('All');">Reset Filters</button>
                </div>
            `;
            return;
        }

        el.viewGrid.innerHTML = items.map(exp => {
            const isDone = !!state.completed[exp.id];
            const previewSnippet = exp.files[0]?.content.split('\n').slice(0, 5).join('\n') || '// No preview';

            return `
                <div class="exp-card ${exp.level}" onclick="openInReader('${exp.id}')">
                    <div class="card-header-top">
                        <span class="difficulty-badge ${exp.level}">
                            ${exp.level === 'simple' ? '🟢 Simple' : '🟣 Complex'} · Exp ${exp.expNum}
                        </span>
                        <label class="card-completed-label" onclick="event.stopPropagation()">
                            <input type="checkbox" ${isDone ? 'checked' : ''} onchange="toggleCompleted('${exp.id}', event)">
                            <span>${isDone ? 'Revised' : 'Mark Done'}</span>
                        </label>
                    </div>

                    <div>
                        <h3 class="exp-card-title">${exp.title}</h3>
                        <p style="font-size: 12px; color: var(--accent-primary); font-weight: 500; margin-top: 2px;">${exp.subtitle}</p>
                    </div>

                    <p class="exp-card-desc">${exp.summary}</p>

                    <div class="card-tags">
                        ${exp.tags.map(t => `<span class="card-tag">${t}</span>`).join('')}
                    </div>

                    <div class="card-code-preview"><code>${escapeHtml(previewSnippet)}</code></div>

                    <div class="card-footer-actions" onclick="event.stopPropagation()">
                        <button class="btn-read" onclick="openInReader('${exp.id}', 'code')">
                            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
                            Read Code
                        </button>
                        <button class="btn-preview-link" onclick="openInReader('${exp.id}', 'sandbox')">
                            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path></svg>
                            Preview
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    }

    // -----------------------------------------------------------------
    // READER VIEW (IDE MODE)
    // -----------------------------------------------------------------
    window.openInReader = function(expId, initialTab = 'code') {
        state.activeExpId = expId;
        state.activeFileIndex = 0;
        state.activeStageTab = initialTab;
        switchView('reader');
        switchStageTab(initialTab);
    };

    function renderReader() {
        renderSidebar();
        renderActiveStage();
    }

    function renderSidebar() {
        if (!el.sidebarList) return;
        const items = getFilteredExperiments();

        const simpleItems = items.filter(x => x.level === 'simple');
        const complexItems = items.filter(x => x.level === 'complex');

        let html = '';

        if (simpleItems.length > 0) {
            html += '<div class="sidebar-group-title">🟢 Simple Track (Exp 1-6)</div>';
            simpleItems.forEach(exp => {
                const isActive = exp.id === state.activeExpId;
                const isDone = !!state.completed[exp.id];
                html += `
                    <div class="sidebar-item simple ${isActive ? 'active' : ''}" onclick="selectExp('${exp.id}')">
                        <div class="sidebar-item-left">
                            <div class="sidebar-item-num">${exp.expNum}</div>
                            <span class="sidebar-item-title">${exp.title}</span>
                        </div>
                        <span style="font-size: 11px;">${isDone ? '✅' : ''}</span>
                    </div>
                `;
            });
        }

        if (complexItems.length > 0) {
            html += '<div class="sidebar-group-title" style="margin-top: 12px;">🟣 Complex Track (Exp 1-6)</div>';
            complexItems.forEach(exp => {
                const isActive = exp.id === state.activeExpId;
                const isDone = !!state.completed[exp.id];
                html += `
                    <div class="sidebar-item complex ${isActive ? 'active' : ''}" onclick="selectExp('${exp.id}')">
                        <div class="sidebar-item-left">
                            <div class="sidebar-item-num">${exp.expNum}</div>
                            <span class="sidebar-item-title">${exp.title}</span>
                        </div>
                        <span style="font-size: 11px;">${isDone ? '✅' : ''}</span>
                    </div>
                `;
            });
        }

        el.sidebarList.innerHTML = html;
        if (el.sidebarCount) el.sidebarCount.textContent = `${items.length} shown`;
    }

    window.selectExp = function(expId) {
        state.activeExpId = expId;
        state.activeFileIndex = 0;
        renderSidebar();
        renderActiveStage();
    };

    function renderActiveStage() {
        const exp = state.data.experiments.find(x => x.id === state.activeExpId);
        if (!exp) return;

        // Stage Title
        if (el.stageTitle) {
            el.stageTitle.innerHTML = `
                <span class="difficulty-badge ${exp.level}">${exp.level === 'simple' ? 'Simple' : 'Complex'} · Exp ${exp.expNum}</span>
                ${exp.title}
            `;
        }
        if (el.stageSubtitle) el.stageSubtitle.textContent = exp.subtitle;
        if (el.stageCheckCompleted) el.stageCheckCompleted.checked = !!state.completed[exp.id];

        if (el.stageMetaPills) {
            el.stageMetaPills.innerHTML = `
                <span class="meta-pill">📁 ${exp.path}</span>
                <span class="meta-pill">🏷️ ${exp.category}</span>
                ${exp.tags.map(t => `<span class="meta-pill">${t}</span>`).join('')}
            `;
        }

        renderFileTabs(exp);
        renderCodeContent(exp);
        renderExplanation(exp);
        renderRunCommands(exp);
        renderSandbox(exp);
        renderViva(exp);
    }

    window.switchStageTab = function(tabKey) {
        state.activeStageTab = tabKey;
        document.querySelectorAll('.stage-tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));

        const btn = document.getElementById('tab' + capitalize(tabKey));
        const panel = document.getElementById('panel' + capitalize(tabKey));
        if (btn) btn.classList.add('active');
        if (panel) panel.classList.add('active');
    };

    function capitalize(s) {
        return s.charAt(0).toUpperCase() + s.slice(1);
    }

    // -----------------------------------------------------------------
    // SOURCE CODE TAB & TOOLS
    // -----------------------------------------------------------------
    function renderFileTabs(exp) {
        if (!el.fileTabsContainer) return;
        el.fileTabsContainer.innerHTML = exp.files.map((f, i) => `
            <button class="file-tab-pill ${i === state.activeFileIndex ? 'active' : ''}" onclick="selectFile(${i})">
                <span>${getFileIcon(f.name)}</span>
                ${f.name}
            </button>
        `).join('');
    }

    function getFileIcon(name) {
        if (name.endsWith('.html')) return '🌐';
        if (name.endsWith('.js') || name.endsWith('.jsx')) return '📜';
        if (name.endsWith('.css')) return '🎨';
        if (name.endsWith('.java')) return '☕';
        if (name.endsWith('.sql')) return '🗄️';
        if (name.endsWith('.xml') || name.endsWith('.dtd') || name.endsWith('.xsd')) return '📄';
        if (name.endsWith('.py')) return '🐍';
        if (name.endsWith('.json')) return '⚙️';
        return '📄';
    }

    window.selectFile = function(index) {
        state.activeFileIndex = index;
        const exp = state.data.experiments.find(x => x.id === state.activeExpId);
        renderFileTabs(exp);
        renderCodeContent(exp);
    };

    function renderCodeContent(exp) {
        const file = exp.files[state.activeFileIndex] || exp.files[0];
        if (!el.codeViewerElem) return;

        const lang = file.language === 'javascript' ? 'javascript' :
                     file.language === 'html' ? 'html' :
                     file.language === 'css' ? 'css' :
                     file.language === 'java' ? 'java' :
                     file.language === 'sql' ? 'sql' :
                     file.language === 'python' ? 'python' :
                     file.language === 'json' ? 'json' : 'markup';

        el.codeViewerElem.className = 'language-' + lang;
        el.codeViewerElem.textContent = file.content;

        if (window.Prism) {
            Prism.highlightElement(el.codeViewerElem);
        }
    }

    window.toggleWrapLines = function() {
        state.wrapLines = !state.wrapLines;
        if (el.codeViewerBox) el.codeViewerBox.classList.toggle('wrap-lines', state.wrapLines);
        showToast(state.wrapLines ? 'Word wrap enabled' : 'Word wrap disabled');
    };

    window.changeFontSize = function(delta) {
        state.fontSize = Math.min(22, Math.max(11, state.fontSize + delta));
        document.documentElement.style.setProperty('--font-size-code', state.fontSize + 'px');
        showToast('Code font size: ' + state.fontSize + 'px');
    };

    window.copyCurrentCode = function() {
        const exp = state.data.experiments.find(x => x.id === state.activeExpId);
        const file = exp.files[state.activeFileIndex] || exp.files[0];
        navigator.clipboard.writeText(file.content).then(() => {
            showToast(`Copied ${file.name} to clipboard!`);
        });
    };

    window.downloadCurrentFile = function() {
        const exp = state.data.experiments.find(x => x.id === state.activeExpId);
        const file = exp.files[state.activeFileIndex] || exp.files[0];
        const blob = new Blob([file.content], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = file.name;
        a.click();
        URL.revokeObjectURL(url);
        showToast(`Downloaded ${file.name}`);
    };

    // -----------------------------------------------------------------
    // EXPLANATION TAB
    // -----------------------------------------------------------------
    function renderExplanation(exp) {
        if (el.explainAim) el.explainAim.textContent = exp.aim;
        if (el.explainConcepts) {
            el.explainConcepts.innerHTML = exp.concepts.map(c => `
                <li>
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                    <span>${c}</span>
                </li>
            `).join('');
        }
        if (el.explainWalkthrough) {
            el.explainWalkthrough.innerHTML = exp.walkthrough.map(w => `
                <div class="guide-card">
                    <h4>Lines ${w.lines}: ${w.title}</h4>
                    <p>${w.text}</p>
                </div>
            `).join('');
        }
    }

    // -----------------------------------------------------------------
    // HOW TO RUN TAB
    // -----------------------------------------------------------------
    function renderRunCommands(exp) {
        if (!el.runCommandsContainer) return;
        el.runCommandsContainer.innerHTML = exp.howToRun.map(cmd => `
            <div class="cmd-box">
                <span class="cmd-code">${escapeHtml(cmd.cmd)}</span>
                <button class="tool-btn" onclick="copyText('${escapeJs(cmd.cmd)}', 'Command copied!')">Copy</button>
            </div>
            <div class="cmd-desc">👉 ${cmd.desc}</div>
        `).join('');
    }

    window.copyText = function(text, msg) {
        navigator.clipboard.writeText(text).then(() => {
            showToast(msg || 'Copied!');
        });
    };

    // -----------------------------------------------------------------
    // SANDBOX / INTERACTIVE SIMULATORS TAB
    // -----------------------------------------------------------------
    function renderSandbox(exp) {
        if (!el.sandboxContainer) return;

        if (exp.liveType === 'html') {
            const file = exp.files.find(f => f.name.endsWith('.html')) || exp.files[0];
            el.sandboxContainer.innerHTML = `
                <div class="sandbox-toolbar">
                    <div class="viewport-btns">
                        <span style="font-size: 12px; color: var(--text-secondary); margin-right: 4px;">Viewport:</span>
                        <button class="viewport-btn active" id="btnVpDesktop" onclick="setIframeViewport('100%')">💻 Desktop</button>
                        <button class="viewport-btn" id="btnVpTablet" onclick="setIframeViewport('768px')">📱 Tablet (768px)</button>
                        <button class="viewport-btn" id="btnVpMobile" onclick="setIframeViewport('375px')">📲 Mobile (375px)</button>
                    </div>
                    <button class="tool-btn" onclick="reloadIframe()">🔄 Reload Frame</button>
                </div>
                <div class="sandbox-frame-wrapper">
                    <iframe id="liveSandboxIframe" class="sandbox-iframe" sandbox="allow-scripts allow-forms allow-same-origin allow-modals"></iframe>
                </div>
            `;
            setTimeout(() => {
                const iframe = document.getElementById('liveSandboxIframe');
                if (iframe) iframe.srcdoc = file.content;
            }, 50);
        }
        else if (exp.liveType === 'js-runner') {
            el.sandboxContainer.innerHTML = `
                <div class="simulator-box" style="margin: 20px;">
                    <div class="sim-header">
                        <div>
                            <h3 style="font-size: 16px; font-weight: 700;">ES6+ Interactive JavaScript Console</h3>
                            <p style="font-size: 12px; color: var(--text-secondary);">Execute modern arrow functions, promises, and async/await directly in browser memory.</p>
                        </div>
                        <button class="btn-read" style="max-width: 140px;" onclick="runEs6Simulator()">▶ Run Script</button>
                    </div>
                    <div class="sim-console" id="es6SimConsole">Click "Run Script" to execute es6.js...</div>
                </div>
            `;
        }
        else if (exp.liveType === 'jdbc-sim') {
            el.sandboxContainer.innerHTML = `
                <div class="simulator-box" style="margin: 20px;">
                    <div class="sim-header">
                        <div>
                            <h3 style="font-size: 16px; font-weight: 700;">Java JDBC + MySQL Terminal Simulator</h3>
                            <p style="font-size: 12px; color: var(--text-secondary);">Simulates the interactive terminal menu & database table updates in real time.</p>
                        </div>
                    </div>
                    <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 14px;">
                        <button class="tool-btn" onclick="simJdbcAction('insert')">1. Insert Record</button>
                        <button class="tool-btn" onclick="simJdbcAction('display')">2. Display Records</button>
                        <button class="tool-btn" onclick="simJdbcAction('update')">3. Update Marks</button>
                        <button class="tool-btn" onclick="simJdbcAction('delete')">4. Delete Record</button>
                        <button class="tool-btn" onclick="simJdbcAction('reset')">Reset Database</button>
                    </div>
                    <div class="sim-console" id="jdbcSimConsole">MySQL Database Connected: jdbc:mysql://localhost:3306/college\nTable: student (id, name, marks)\n\nReady. Select an operation above.</div>
                </div>
            `;
        }
        else if (exp.liveType === 'xml-sim') {
            el.sandboxContainer.innerHTML = `
                <div class="simulator-box" style="margin: 20px;">
                    <div class="sim-header">
                        <div>
                            <h3 style="font-size: 16px; font-weight: 700;">Python lxml Schema Validator Simulator</h3>
                            <p style="font-size: 12px; color: var(--text-secondary);">Tests bookstore.xml against bookstore.dtd and bookstore.xsd definitions.</p>
                        </div>
                        <button class="btn-read" style="max-width: 180px;" onclick="simXmlValidate()">▶ Run validate.py</button>
                    </div>
                    <div class="sim-console" id="xmlSimConsole">Click "Run validate.py" to execute validator...</div>
                </div>
            `;
        }
        else if (exp.liveType === 'rest-sim') {
            el.sandboxContainer.innerHTML = `
                <div class="simulator-box" style="margin: 20px;">
                    <div class="sim-header">
                        <div>
                            <h3 style="font-size: 16px; font-weight: 700;">Express REST API Client Playground</h3>
                            <p style="font-size: 12px; color: var(--text-secondary);">Test endpoints against simulated Express backend: GET, POST, PUT, DELETE.</p>
                        </div>
                    </div>
                    <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 14px;">
                        <button class="tool-btn" style="border-color: #38bdf8;" onclick="simRestAction('GET')">GET /students</button>
                        <button class="tool-btn" style="border-color: #10b981;" onclick="simRestAction('POST')">POST /students</button>
                        <button class="tool-btn" style="border-color: #eab308;" onclick="simRestAction('PUT')">PUT /students/1</button>
                        <button class="tool-btn" style="border-color: #ef4444;" onclick="simRestAction('DELETE')">DELETE /students/2</button>
                        <button class="tool-btn" onclick="simRestAction('RESET')">Reset Data</button>
                    </div>
                    <div class="sim-console" id="restSimConsole">Express.js server listening on http://localhost:3000\nReady for incoming requests...</div>
                </div>
            `;
        }
        else if (exp.liveType === 'session-sim') {
            el.sandboxContainer.innerHTML = `
                <div class="simulator-box" style="margin: 20px;">
                    <div class="sim-header">
                        <div>
                            <h3 style="font-size: 16px; font-weight: 700;">Express Session & Cookie State Simulator</h3>
                            <p style="font-size: 12px; color: var(--text-secondary);">Simulates visiting GET / with cookie setting and session visits counter.</p>
                        </div>
                        <button class="btn-read" style="max-width: 160px;" onclick="simSessionHit()">🔄 Hit GET / (Visit)</button>
                    </div>
                    <div class="sim-console" id="sessionSimConsole">Server running at http://localhost:3000\nNo visits yet. Click "Hit GET /" to test.</div>
                </div>
            `;
        }
        else if (exp.liveType === 'jwt-sim') {
            el.sandboxContainer.innerHTML = `
                <div class="simulator-box" style="margin: 20px;">
                    <div class="sim-header">
                        <div>
                            <h3 style="font-size: 16px; font-weight: 700;">JWT Authentication & Protected Route Tester</h3>
                            <p style="font-size: 12px; color: var(--text-secondary);">Login as admin to generate JWT token, then test accessing protected /profile.</p>
                        </div>
                    </div>
                    <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 14px;">
                        <button class="tool-btn" style="border-color: #10b981;" onclick="simJwtLogin(true)">1. Login (Valid: admin/1234)</button>
                        <button class="tool-btn" style="border-color: #ef4444;" onclick="simJwtLogin(false)">Login (Invalid: wrong pass)</button>
                        <button class="tool-btn" style="border-color: #a855f7;" onclick="simJwtProfile(true)">2. GET /profile (With Token)</button>
                        <button class="tool-btn" onclick="simJwtProfile(false)">GET /profile (No Token)</button>
                    </div>
                    <div class="sim-console" id="jwtSimConsole">Auth server listening on http://localhost:3000\nPerform Login to obtain Bearer Token.</div>
                </div>
            `;
        }
        else if (exp.liveType === 'node-core-sim') {
            el.sandboxContainer.innerHTML = `
                <div class="simulator-box" style="margin: 20px;">
                    <div class="sim-header">
                        <div>
                            <h3 style="font-size: 16px; font-weight: 700;">Node.js Core Modules & EventEmitter Inspector</h3>
                            <p style="font-size: 12px; color: var(--text-secondary);">Inspects OS info, filename path resolution, and event-driven triggers.</p>
                        </div>
                        <button class="btn-read" style="max-width: 160px;" onclick="simNodeCore()">▶ Run Core Server</button>
                    </div>
                    <div class="sim-console" id="nodeCoreSimConsole">Click "Run Core Server" to trigger node runtime simulation...</div>
                </div>
            `;
        }
        else if (exp.liveType === 'react-sim') {
            el.sandboxContainer.innerHTML = `
                <div class="simulator-box" style="margin: 20px;">
                    <div class="sim-header">
                        <div>
                            <h3 style="font-size: 16px; font-weight: 700;">React Router SPA Dynamic Route Navigator</h3>
                            <p style="font-size: 12px; color: var(--text-secondary);">Single Page Application simulation: switch routes without page reload!</p>
                        </div>
                    </div>
                    <div style="display: flex; gap: 8px; justify-content: center; margin-bottom: 16px; background: #054cf1; padding: 12px; border-radius: 8px;">
                        <button class="tool-btn" style="background: navy; color: white;" onclick="simReactRoute('/')">Register (/)</button>
                        <button class="tool-btn" style="background: navy; color: white;" onclick="simReactRoute('/login')">Login (/login)</button>
                        <button class="tool-btn" style="background: navy; color: white;" onclick="simReactRoute('/contact')">Contact (/contact)</button>
                        <button class="tool-btn" style="background: navy; color: white;" onclick="simReactRoute('/about')">About (/about)</button>
                    </div>
                    <div id="reactSimStage" style="background: #054cf1; padding: 20px; border-radius: 8px; text-align: center; color: white;">
                    </div>
                </div>
            `;
            setTimeout(() => simReactRoute('/'), 50);
        }
    }

    window.setIframeViewport = function(width) {
        const iframe = document.getElementById('liveSandboxIframe');
        if (iframe) iframe.style.width = width;
        document.querySelectorAll('.viewport-btn').forEach(b => b.classList.remove('active'));
        if (width === '100%') document.getElementById('btnVpDesktop')?.classList.add('active');
        if (width === '768px') document.getElementById('btnVpTablet')?.classList.add('active');
        if (width === '375px') document.getElementById('btnVpMobile')?.classList.add('active');
    };

    window.reloadIframe = function() {
        const exp = state.data.experiments.find(x => x.id === state.activeExpId);
        const file = exp.files.find(f => f.name.endsWith('.html')) || exp.files[0];
        const iframe = document.getElementById('liveSandboxIframe');
        if (iframe) {
            iframe.srcdoc = file.content;
            showToast('Reloaded preview');
        }
    };

    // Simulator Handlers
    window.runEs6Simulator = function() {
        const c = document.getElementById('es6SimConsole');
        if (!c) return;
        const add = (a, b) => a + b;
        let out = '=== RUNNING: node es6.js ===\n';
        out += 'Arrow Function: ' + add(10, 20) + '\n';
        out += 'Hello Teja\nCallback executed\n';
        out += 'Promise resolved\n';
        out += 'Hello Bro! (Async/Await fulfilled)\n\nExecution finished successfully with code 0.';
        c.textContent = out;
    };

    let mockStudents = [
        { id: 1, name: "Ravi", marks: 85 },
        { id: 2, name: "Teja", marks: 90 }
    ];

    window.simJdbcAction = function(action) {
        const c = document.getElementById('jdbcSimConsole');
        if (!c) return;
        let out = c.textContent + '\n\n';

        if (action === 'insert') {
            const newId = mockStudents.length + 1;
            mockStudents.push({ id: newId, name: "Student" + newId, marks: 88 });
            out += `> Choice: 1\nID, Name, Marks: ${newId} Student${newId} 88\nPreparedStatement executed: INSERT INTO student VALUES (${newId}, 'Student${newId}', 88)\nRecord inserted!`;
        } else if (action === 'display') {
            out += '> Choice: 2\nExecuting: SELECT * FROM student\n--- Student Records ---\n';
            mockStudents.forEach(s => {
                out += `${s.id} ${s.name} ${s.marks}\n`;
            });
        } else if (action === 'update') {
            if (mockStudents.length > 0) {
                mockStudents[0].marks += 5;
                out += `> Choice: 3\nEnter ID and new marks: 1 ${mockStudents[0].marks}\nPreparedStatement executed: UPDATE student SET marks=${mockStudents[0].marks} WHERE id=1\nRecord updated!`;
            }
        } else if (action === 'delete') {
            if (mockStudents.length > 0) {
                const removed = mockStudents.pop();
                out += `> Choice: 4\nEnter ID to delete: ${removed.id}\nPreparedStatement executed: DELETE FROM student WHERE id=${removed.id}\nRecord deleted!`;
            } else {
                out += '> Table is currently empty!';
            }
        } else if (action === 'reset') {
            mockStudents = [{ id: 1, name: "Ravi", marks: 85 }, { id: 2, name: "Teja", marks: 90 }];
            out = 'Database reset to default records.';
        }
        c.textContent = out;
        c.scrollTop = c.scrollHeight;
    };

    window.simXmlValidate = function() {
        const c = document.getElementById('xmlSimConsole');
        if (!c) return;
        c.textContent = `=== RUNNING: python validate.py ===\nParsed document: bookstore.xml\nValidating against bookstore.dtd...\nDTD: True\n\nValidating against bookstore.xsd...\nXSD: True\n\nBoth DTD and XSD validations passed successfully!`;
    };

    window.simRestAction = function(action) {
        const c = document.getElementById('restSimConsole');
        if (!c) return;
        let out = c.textContent + '\n\n';

        if (action === 'GET') {
            out += `HTTP/1.1 GET /students\nStatus: 200 OK\nContent-Type: application/json\n\n${JSON.stringify(mockStudents, null, 2)}`;
        } else if (action === 'POST') {
            const nextId = mockStudents.length + 1;
            const newStudent = { id: nextId, name: "Anji", marks: 95 };
            mockStudents.push(newStudent);
            out += `HTTP/1.1 POST /students\nPayload: ${JSON.stringify(newStudent)}\nStatus: 200 OK\nResponse: Student added successfully`;
        } else if (action === 'PUT') {
            if (mockStudents[0]) {
                mockStudents[0].marks = 99;
                out += `HTTP/1.1 PUT /students/1\nPayload: {"name":"Ravi","marks":99}\nStatus: 200 OK\nResponse: Student updated successfully`;
            }
        } else if (action === 'DELETE') {
            mockStudents = mockStudents.filter(s => s.id !== 2);
            out += `HTTP/1.1 DELETE /students/2\nStatus: 200 OK\nResponse: Student deleted successfully`;
        } else if (action === 'RESET') {
            mockStudents = [{ id: 1, name: "Ravi", marks: 85 }, { id: 2, name: "Teja", marks: 90 }];
            out = 'API mock database reset.';
        }
        c.textContent = out;
        c.scrollTop = c.scrollHeight;
    };

    let simVisits = 0;
    window.simSessionHit = function() {
        simVisits++;
        const c = document.getElementById('sessionSimConsole');
        if (!c) return;
        c.textContent = `GET / HTTP/1.1\nHost: localhost:3000\nCookie: connect.sid=s%3A_abc123...\n\nHTTP/1.1 200 OK\nSet-Cookie: username=Teja; Path=/\nContent-Type: text/html\n\nCookie set!<br>Session visits: ${simVisits}`;
    };

    let currentMockJwt = null;
    window.simJwtLogin = function(valid) {
        const c = document.getElementById('jwtSimConsole');
        if (!c) return;
        if (valid) {
            currentMockJwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9." +
                             btoa(JSON.stringify({ username: "admin", iat: Math.floor(Date.now()/1000), exp: Math.floor(Date.now()/1000) + 3600 })) +
                             ".signedChecksumToken123";
            c.textContent = `POST /login HTTP/1.1\nBody: {"username":"admin","password":"1234"}\n\nStatus: 200 OK\nResponse:\n{\n  "token": "${currentMockJwt}"\n}\n\nToken captured for Bearer header authorization!`;
        } else {
            c.textContent = `POST /login HTTP/1.1\nBody: {"username":"admin","password":"wrong"}\n\nStatus: 401 Unauthorized\nResponse: Invalid username or password`;
        }
    };

    window.simJwtProfile = function(includeToken) {
        const c = document.getElementById('jwtSimConsole');
        if (!c) return;
        if (includeToken && currentMockJwt) {
            c.textContent = `GET /profile HTTP/1.1\nAuthorization: Bearer ${currentMockJwt}\n\nStatus: 200 OK\nResponse:\n{\n  "message": "Access granted!",\n  "user": {\n    "username": "admin",\n    "iat": 1740000000,\n    "exp": 1740003600\n  }\n}`;
        } else if (includeToken && !currentMockJwt) {
            c.textContent = 'Please click "1. Login (Valid: admin/1234)" first to generate a JWT token!';
        } else {
            c.textContent = `GET /profile HTTP/1.1\n[No Authorization Header]\n\nStatus: 403 Forbidden\nResponse: Token required`;
        }
    };

    window.simNodeCore = function() {
        const c = document.getElementById('nodeCoreSimConsole');
        if (!c) return;
        c.textContent = `=== NODE RUNTIME SIMULATOR ===\nEvent registered: event.on("hello")\nTriggering event.emit("hello")...\nConsole Log: Event occurred!\n\nHTTP Server created with http.createServer().\nListening on http://localhost:3000\n\nIncoming Request: GET /\nResponse sent:\n  Welcome to Node.js Server!\n  OS: win32 (Windows NT)\n  File: server.js\n  Server running successfully!`;
    };

    window.simReactRoute = function(route) {
        const stage = document.getElementById('reactSimStage');
        if (!stage) return;
        let content = '';

        if (route === '/') {
            content = `
                <div style="background: rgb(126, 247, 5); padding: 15px; border-radius: 8px; color: #000; max-width: 320px; margin: 0 auto;">
                    <h3 style="margin-bottom: 10px;">Registration Page</h3>
                    <input style="padding: 8px; margin: 4px; width: 85%; border-radius: 6px; border: 1px solid #999;" placeholder="Enter your Name"><br>
                    <input style="padding: 8px; margin: 4px; width: 85%; border-radius: 6px; border: 1px solid #999;" placeholder="Email"><br>
                    <input style="padding: 8px; margin: 4px; width: 85%; border-radius: 6px; border: 1px solid #999;" type="password" placeholder="Password"><br>
                    <button style="padding: 8px 16px; background: navy; color: white; border: none; border-radius: 6px; margin-top: 6px; cursor: pointer;">Register</button>
                </div>
            `;
        } else if (route === '/login') {
            content = `
                <div style="background: rgb(126, 247, 5); padding: 15px; border-radius: 8px; color: #000; max-width: 320px; margin: 0 auto;">
                    <h3 style="margin-bottom: 10px;">Login</h3>
                    <input style="padding: 8px; margin: 4px; width: 85%; border-radius: 6px; border: 1px solid #999;" placeholder="Email"><br>
                    <input style="padding: 8px; margin: 4px; width: 85%; border-radius: 6px; border: 1px solid #999;" type="password" placeholder="Password"><br>
                    <button style="padding: 8px 16px; background: navy; color: white; border: none; border-radius: 6px; margin-top: 6px; cursor: pointer;">Login</button>
                </div>
            `;
        } else if (route === '/contact') {
            content = `
                <div style="background: rgb(126, 247, 5); padding: 15px; border-radius: 8px; color: #000; max-width: 320px; margin: 0 auto;">
                    <h3 style="margin-bottom: 10px;">Contact</h3>
                    <p style="font-weight: 500;">Email: student@college.com</p>
                </div>
            `;
        } else if (route === '/about') {
            content = `
                <div style="background: rgb(126, 247, 5); padding: 15px; border-radius: 8px; color: #000; max-width: 320px; margin: 0 auto;">
                    <h3 style="margin-bottom: 10px;">About</h3>
                    <p>Student Management System using React.</p>
                </div>
            `;
        }

        stage.innerHTML = `
            <div style="font-size: 11px; margin-bottom: 8px; opacity: 0.8;">Current Route: ${route} (No page reload)</div>
            ${content}
        `;
    };

    // -----------------------------------------------------------------
    // VIVA VOCE TAB
    // -----------------------------------------------------------------
    function renderViva(exp) {
        if (!el.vivaContainer) return;
        el.vivaContainer.innerHTML = exp.vivaQuestions.map((v, i) => `
            <div class="viva-item" onclick="this.classList.toggle('open')">
                <div class="viva-question">
                    <span>Q${i+1}: ${v.q}</span>
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
                <div class="viva-answer">${v.a}</div>
            </div>
        `).join('');
    }

    // -----------------------------------------------------------------
    // COMPARISON MATRIX VIEW
    // -----------------------------------------------------------------
    function renderComparison() {
        if (!el.comparisonList) return;
        el.comparisonList.innerHTML = state.data.comparisons.map(c => `
            <div class="comparison-card">
                <div class="comparison-header">
                    <h3>${c.topic}: ${c.title}</h3>
                    <span class="meta-pill">Experiment ${c.expNum} Contrast</span>
                </div>
                <div class="comparison-grid">
                    <div class="side-col simple">
                        <h4>🟢 ${c.simpleTitle}</h4>
                        <p>${c.simpleSummary}</p>
                        <ul class="side-pros-list">
                            ${c.simplePros.map(p => `<li>✓ ${p}</li>`).join('')}
                        </ul>
                        <button class="tool-btn" onclick="openInReader('simple-${c.expNum}')">View Simple Code</button>
                    </div>
                    <div class="side-col complex">
                        <h4>🟣 ${c.complexTitle}</h4>
                        <p>${c.complexSummary}</p>
                        <ul class="side-pros-list">
                            ${c.complexPros.map(p => `<li>✓ ${p}</li>`).join('')}
                        </ul>
                        <button class="tool-btn" onclick="openInReader('complex-${c.expNum}')">View Complex Code</button>
                    </div>
                </div>
                <div class="comparison-takeaway">
                    <strong>Key Insight:</strong> ${c.takeaway}
                </div>
            </div>
        `).join('');
    }

    // -----------------------------------------------------------------
    // TOAST NOTIFICATIONS & HELPERS
    // -----------------------------------------------------------------
    function showToast(msg) {
        if (!el.toast) return;
        if (el.toastMsg) el.toastMsg.textContent = msg;
        el.toast.classList.add('show');
        setTimeout(() => el.toast.classList.remove('show'), 2500);
    }

    function escapeHtml(text) {
        return (text || '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    function escapeJs(str) {
        return (str || '').replace(/'/g, "\\'");
    }

    // -----------------------------------------------------------------
    // KEYBOARD SHORTCUTS
    // -----------------------------------------------------------------
    window.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
            e.preventDefault();
            if (el.searchInput) el.searchInput.focus();
        } else if (e.key === '/' && document.activeElement.tagName !== 'INPUT') {
            e.preventDefault();
            if (el.searchInput) el.searchInput.focus();
        } else if (e.key === 'Escape') {
            if (el.searchInput) {
                el.searchInput.value = '';
                el.searchInput.blur();
                handleSearch();
            }
        }
    });

    // -----------------------------------------------------------------
    // INITIALIZATION
    // -----------------------------------------------------------------
    initTheme();
    updateProgress();
    renderCardGrid();

})();

/**
 * js/componentLoader.js
 * * Logic trung tâm chịu trách nhiệm tải component (Header, Footer, Fab Container)
 * * Sử dụng IVSHeaderController và IVSFooterController từ file riêng.
 * @version 5.0 - Đã tách Controllers. Chỉ giữ lại logic tải component nâng cao.
 */

'use strict';

// Ensure componentLog and debounce (from utils.js) are available
if (typeof window.componentLog !== 'function') {
    window.componentLog = (msg, level = 'info') => console[level](`[IVS Loader] ${msg}`);
}
if (typeof window.debounce !== 'function') {
    window.debounce = (func) => func;
}

// =================================================================
// COMPONENT LOADER CORE
// =================================================================

// fetchWithRetry và safeInitController (Code từ mẫu loadComponents.js của bạn)
async function fetchWithRetry(resource, options = {}) {
    const attempts = options.attempts || 3;
    const timeout = options.timeout || 5000;
    
    // keep root-relative component paths (do not rewrite /components/ to relative)

    for (let attempt = 1; attempt <= attempts; attempt++) {
        try {
            const controller = new AbortController();
            const id = setTimeout(() => controller.abort(), timeout);
            const resp = await fetch(resource, { signal: controller.signal });
            clearTimeout(id);
            return resp;
        } catch (err) {
            window.componentLog(`fetchWithRetry: attempt ${attempt} for ${resource} failed: ${err.message}`, attempt < attempts ? 'warn' : 'error');
            if (attempt === attempts) throw err;
            const backoff = Math.min(2000 * attempt, 8000);
            const jitter = Math.floor(Math.random() * 300);
            await new Promise(r => setTimeout(r, backoff + jitter));
        }
    }
    throw new Error(`Failed to fetch ${resource} after ${attempts} attempts.`);
}

async function loadAndInject(url, placeholderId) {
    const normalize = (u) => {
        if (typeof u !== 'string') return u;
        // Ensure components are fetched from the site root so pages in subfolders work.
        if (u.startsWith('/components/')) return u; // already root-relative
        if (u.startsWith('components/')) return '/' + u; // make root-relative
        return u;
    };
    const normalizedUrl = normalize(url);
    const placeholder = document.getElementById(placeholderId);
    if (!placeholder) {
        window.componentLog(`Placeholder '${placeholderId}' not found.`, "error");
        return false;
    }
    try {
        if (placeholder.querySelector(`[data-component-src="${normalizedUrl}"]`)) return true; // Already loaded

        const response = await fetchWithRetry(normalizedUrl, { attempts: 3, timeout: 5000 });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const text = await response.text();
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = text;
        const scripts = Array.from(tempDiv.querySelectorAll('script'));
        scripts.forEach(script => script.parentNode?.removeChild(script));
        
        const wrapper = document.createElement('div');
        wrapper.setAttribute('data-component-src', normalizedUrl);
        wrapper.innerHTML = tempDiv.innerHTML;
        placeholder.appendChild(wrapper);

        for (const oldScript of scripts) {
            const newScript = document.createElement('script');
            Array.from(oldScript.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));
            if (oldScript.src) {
                newScript.src = oldScript.src;
                await new Promise((resolve, reject) => {
                    newScript.onload = resolve;
                    newScript.onerror = reject;
                    wrapper.appendChild(newScript);
                });
            } else {
                newScript.textContent = oldScript.textContent;
                wrapper.appendChild(newScript);
            }
        }
        return true;
    } catch (error) {
        window.componentLog(`Failed to load ${url}: ${error.message}`, 'error');
        const fallbackHTML = `<div class="p-4 text-center bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 shadow-md">Lỗi tải Component: ${url}</div>`;
        if (placeholder) placeholder.innerHTML = fallbackHTML;
        return false;
    }
}

async function safeInitController(controller, id) {
    const maxAttempts = 6;
    const baseDelay = 25;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            if (controller && typeof controller.init === 'function') {
                controller.init();
                window.componentLog(`Controller for ${id} initialized.`, 'info');
                return;
            } else {
                window.componentLog(`Controller for ${id} missing init or not provided.`, 'warn');
                return;
            }
        } catch (err) {
            window.componentLog(`safeInitController attempt ${attempt} for ${id} failed: ${err.message}`, attempt < maxAttempts ? 'warn' : 'error');
            await new Promise(r => setTimeout(r, baseDelay * attempt));
        }
    }
    window.componentLog(`safeInitController: Failed to initialize controller for ${id} after ${maxAttempts} attempts.`, 'error');
}


/**
 * Loads common components (header, fab-container, footer) and initializes their controllers.
 */
async function loadCommonComponents() {
    if (window.__IVS_components_loadingStarted) return;
    window.__IVS_components_loadingStarted = true;

    window.componentLog("Initializing component sequence...", "info");
    
    // Sử dụng đường dẫn Root-Relative Path
    const components = [
        { id: 'header-placeholder', url: '/components/header.html', controller: window.IVSHeaderController },
        // Giả định IVSFabController từ fabController.js đã định nghĩa
        { id: 'fab-container-placeholder', url: '/components/fab-container.html', controller: window.IVSFabController }
    ];

    const footerComponent = { id: 'footer-placeholder', url: '/components/footer.html', controller: window.IVSFooterController };

    // Tải Header và FAB trước
    for (const comp of components) {
        if (document.getElementById(comp.id)) {
            const success = await loadAndInject(comp.url, comp.id);
            if (success && comp.controller) {
                await safeInitController(comp.controller, comp.id);
            }
        }
    }

    // Tải fab-assistant vào fab-container
    if (document.getElementById('fab-container-placeholder')) {
        try {
            const assistantLoaded = await loadAndInject('/components/fab-assistant.html', 'fab-container-placeholder');
            if (assistantLoaded) {
                window.componentLog('fab-assistant loaded into fab-container-placeholder', 'info');
                if (window.IVSFabController && typeof window.IVSFabController.init === 'function') {
                    await safeInitController(window.IVSFabController, 'fab-container-placeholder');
                }
            }
        } catch (err) {
            window.componentLog('Failed to load fab-assistant: ' + err.message, 'warn');
        }
    }

    // Tải Footer sau cùng
    if (document.getElementById(footerComponent.id)) {
        const success = await loadAndInject(footerComponent.url, footerComponent.id);
        if (success && footerComponent.controller) {
            await safeInitController(footerComponent.controller, footerComponent.id);
        }
    }
    
    // Khởi tạo thư viện AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 700,
            once: true,
            offset: 50,
            easing: 'ease-out-cubic'
        });
    }

    // Thực hiện callback của trang cụ thể
    window.onPageComponentsLoadedCallback?.();

    window.componentLog("Component sequence complete.", "info");
}

// Gán hàm loader chính vào biến global mà trang HTML gọi
window.loadComponentsAndInitialize = loadCommonComponents;

// Tự động khởi động khi DOMContentLoaded, nếu chưa được khởi động
document.addEventListener('DOMContentLoaded', function() {
    if (!window.__IVS_components_loadingStarted) {
        loadCommonComponents().catch(err => window.componentLog(`Error during automatic component loading: ${err.message}`, 'error'));
    }
});

/**
 * @fileoverview Global utility functions for IVS JSC applications.
 * This script provides common helper functions like logging and debouncing
 * to be used across various JavaScript modules.
 */

'use strict';

// =================================================================
//  LOGGING UTILITY
// =================================================================

/**
 * Logs messages to the console with a consistent prefix.
 * @param {string} message The message to log.
 * @param {'log' | 'info' | 'warn' | 'error'} [level='info'] The console logging level.
 */
function componentLog(message, level = 'info') {
    // Ensure console exists and has the method
    if (typeof console !== 'undefined' && console && typeof console[level] === 'function') {
        try {
            console[level](`[IVS App] ${message}`);
        } catch (error) {
            // Fallback to console.log if specific level fails
            if (typeof console.log === 'function') {
                console.log(`[IVS App] ${level.toUpperCase()}: ${message}`);
            }
        }
    } else {
        // Ultimate fallback
        if (typeof console !== 'undefined' && console && typeof console.log === 'function') {
            console.log(`[IVS App] ${level.toUpperCase()}: ${message}`);
        }
    }
}
window.componentLog = componentLog; // Expose globally

// =================================================================
//  DEBOUNCE UTILITY
// =================================================================

/**
 * Creates a debounced function that delays invoking `func` until after `wait` milliseconds
 * have passed since the last time the debounced function was invoked.
 * @param {Function} func The function to debounce.
 * @param {number} wait The number of milliseconds to delay.
 * @returns {Function} The new debounced function.
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func.apply(this, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
window.debounce = debounce; // Expose globally

// =================================================================
//  OTHER POTENTIAL UTILITIES (Add as needed)
// =================================================================

// Example: Simple element selector
// function getElement(id) {
//     return document.getElementById(id);
// }
// window.getElement = getElement;

// Example: Basic event listener helper
// function on(element, event, handler) {
//     if (element) {
//         element.addEventListener(event, handler);
//     }
// }
// window.on = on;

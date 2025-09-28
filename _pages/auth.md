---
title: "IVS Auth - Đăng nhập / Đăng ký"
description: "Đăng nhập hoặc đăng ký tài khoản IVS JSC để trải nghiệm toàn bộ hệ sinh thái giáo dục, công nghệ và nhân sự."
layout: page.njk
permalink: /auth.html/
cssFiles:
  - css/tailwind.css
  - css/styles.css
  - css/style.css
  - css/animations.css
jsFiles:
  - js/loadComponents.js
---

<div class="auth-card p-8 rounded-xl w-full max-w-md relative z-10"> <!-- z-10 để đảm bảo form nằm trên video -->
            <h2 class="text-3xl font-bold font-display text-center text-ivs-text-primary mb-6" id="auth-title">Đăng nhập</h2>
            
            <form id="auth-form" class="space-y-5">
                <div>
                    <label for="email" class="block text-sm font-medium text-ivs-text-secondary mb-1">Email</label>
                    <input type="email" id="email" name="email" required
                           class="form-input mt-1 block w-full px-4 py-2 rounded-md shadow-sm focus:outline-none sm:text-sm">
                </div>
                <div>
                    <label for="password" class="block text-sm font-medium text-ivs-text-secondary mb-1">Mật khẩu</label>
                    <input type="password" id="password" name="password" required
                           class="form-input mt-1 block w-full px-4 py-2 rounded-md shadow-sm focus:outline-none sm:text-sm">
                </div>
                
                <div id="forgot-password-area" class="text-right text-sm">
                    <button type="button" id="forgot-password-btn" class="font-medium text-ivs-blue hover:text-ivs-blue-darker focus:outline-none">
                        Quên mật khẩu?
                    </button>
                </div>

                <button type="submit" id="submit-btn"
                        class="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-md shadow-lg text-base font-medium text-white bg-ivs-blue hover:bg-ivs-blue-darker focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ivs-blue transition-colors duration-200">
                    <span class="button-text">Đăng nhập</span>
                    <span id="loading-spinner" class="loading-spinner hidden"></span>
                </button>
                
                <p class="text-center text-sm text-ivs-text-secondary mt-4">
                    Bạn chưa có tài khoản? 
                    <button type="button" id="toggle-auth-mode" class="font-medium text-ivs-green hover:text-ivs-green focus:outline-none">
                        Đăng ký ngay
                    </button>
                </p>
                <div id="auth-message" class="mt-4 p-3 text-center text-sm rounded-md hidden" role="alert"></div>
            </form>
        </div>
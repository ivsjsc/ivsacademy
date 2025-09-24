// fab-social.js - Toggle social FAB icons

document.addEventListener('DOMContentLoaded', function() {
    const mainFabBtn = document.getElementById('mainFabBtn');
    const socialIconsContainer = document.getElementById('socialIconsContainer');
    if (!mainFabBtn || !socialIconsContainer) return;

    mainFabBtn.addEventListener('click', function() {
        socialIconsContainer.classList.toggle('hidden');
    });

    // Optional: Click outside to close
    document.addEventListener('click', function(e) {
        if (!mainFabBtn.contains(e.target) && !socialIconsContainer.contains(e.target)) {
            socialIconsContainer.classList.add('hidden');
        }
    });
});

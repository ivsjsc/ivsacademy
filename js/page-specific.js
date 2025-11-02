        // Initialize AOS
        AOS.init({
            offset: 80,
            duration: 600,
            easing: 'ease-out-quad',
            once: true,
            mirror: false,
            anchorPlacement: 'top-bottom',
        });

        // Scroll to top button logic
        const scrollToTopBtn = document.getElementById('scrollToTopBtn');
        if (scrollToTopBtn) {
            window.addEventListener('scroll', () => {
                if (window.pageYOffset > 200) {
                    scrollToTopBtn.classList.remove('hidden');
                    scrollToTopBtn.classList.add('flex');
                } else {
                    scrollToTopBtn.classList.remove('flex');
                    scrollToTopBtn.classList.add('hidden');
                }
            }, { passive: true });

            scrollToTopBtn.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
            // Initialize visibility based on current scroll position
            if (window.pageYOffset <= 200) {
                scrollToTopBtn.classList.add('hidden');
            }
        }

        // Functions from layout.html for 3D hero, animated counters, and spotlight effect
        function initHero3D() {
            const container = document.getElementById('hero-canvas-container');
            const loadingOverlay = document.getElementById('loading-overlay');

            // Failsafe: Hide loading overlay after a timeout even if 3D initialization fails
            const hideOverlayTimeout = setTimeout(() => {
                if (loadingOverlay) {
                    loadingOverlay.style.opacity = '0';
                    setTimeout(() => {
                        loadingOverlay.style.display = 'none';
                    }, 500); // Match transition duration
                }
            }, 5000); // Hide after 5 seconds if not already hidden

            if (!container) {
                console.warn('Container for 3D hero not found. Skipping 3D initialization.');
                clearTimeout(hideOverlayTimeout); // Clear timeout if 3D is skipped
                if (loadingOverlay) {
                    loadingOverlay.style.opacity = '0';
                    setTimeout(() => {
                        loadingOverlay.style.display = 'none';
                    }, 500);
                }
                return;
            }

            let scene, camera, renderer, stars;
            let mouseX = 0, mouseY = 0;

            try {
                function init() {
                    scene = new THREE.Scene();
                    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
                    camera.position.z = 1;
                    camera.rotation.x = Math.PI / 2;

                    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
                    renderer.setSize(window.innerWidth, window.innerHeight);
                    container.appendChild(renderer.domElement);

                    const starGeo = new THREE.BufferGeometry();
                    const starVertices = [];
                    for (let i = 0; i < 8000; i++) {
                        starVertices.push((Math.random() - 0.5) * 2000, (Math.random() - 0.5) * 2000, (Math.random() - 0.5) * 2000);
                    }
                    starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));

                    let starMaterial = new THREE.PointsMaterial({ color: 0xaaaaaa, size: 0.7, transparent: true });
                    stars = new THREE.Points(starGeo, starMaterial);
                    scene.add(stars);

                    window.addEventListener('resize', onWindowResize, false);
                    document.addEventListener('mousemove', onMouseMove, false);

                    animate();

                    // Hide loading overlay after successful 3D initialization
                    clearTimeout(hideOverlayTimeout); // Clear the failsafe timeout
                    if (loadingOverlay) {
                        loadingOverlay.style.opacity = '0';
                        setTimeout(() => {
                            loadingOverlay.style.display = 'none';
                        }, 500); // Match transition duration
                    }
                }

                function onMouseMove(e) {
                    mouseX = e.clientX - window.innerWidth / 2;
                    mouseY = e.clientY - window.innerHeight / 2;
                }

                function onWindowResize() {
                    camera.aspect = window.innerWidth / window.innerHeight;
                    camera.updateProjectionMatrix();
                    renderer.setSize(window.innerWidth, window.innerHeight);
                }

                function animate() {
                    requestAnimationFrame(animate);
                    stars.rotation.y += 0.0001;
                    camera.position.y += (-mouseY * 0.00002 - camera.position.y) * 0.05;
                    camera.position.x += (mouseX * 0.00002 - camera.position.x) * 0.05;
                    camera.lookAt(scene.position);
                    renderer.render(scene, camera);
                }

                init(); // Call init directly
            } catch (error) {
                console.error('Error initializing 3D hero:', error);
                // Ensure loading overlay is hidden even if 3D initialization fails
                clearTimeout(hideOverlayTimeout);
                if (loadingOverlay) {
                    loadingOverlay.style.opacity = '0';
                    setTimeout(() => {
                        loadingOverlay.style.display = 'none';
                    }, 500);
                }
            }
        }

        function initAnimatedCounters() {
            const counters = document.querySelectorAll('#impact-counters h3');
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const counter = entry.target;
                        const target = +counter.getAttribute('data-target');
                        const duration = 2000;
                        let start = 0;
                        const step = (timestamp) => {
                            if (!start) start = timestamp;
                            const progress = timestamp - start;
                            const current = Math.min(Math.floor(progress / duration * target), target);
                            counter.innerText = current.toLocaleString('en-US');
                            if (current < target) {
                                requestAnimationFrame(step);
                            }
                        };
                        requestAnimationFrame(step);
                        observer.unobserve(counter);
                    }
                });
            }, { threshold: 0.5 });
            counters.forEach(counter => observer.observe(counter));
        }

        function initSpotlightEffect() {
            const cards = document.querySelectorAll('.spotlight-card');
            cards.forEach(card => {
                card.addEventListener('mousemove', (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    card.style.setProperty('--px', x + 'px');
                    card.style.setProperty('--py', y + 'px');
                });
            });
        }

        // FAQ Toggle Logic
        function initFaqToggle() {
            const faqQuestions = document.querySelectorAll('.faq-question');
            faqQuestions.forEach(question => {
                question.addEventListener('click', () => {
                    const answer = question.nextElementSibling;
                    const icon = question.querySelector('i');

                    // Close all other open FAQs
                    faqQuestions.forEach(otherQuestion => {
                        if (otherQuestion !== question) {
                            otherQuestion.nextElementSibling.classList.remove('open');
                            otherQuestion.nextElementSibling.style.maxHeight = null;
                            otherQuestion.querySelector('i').classList.remove('rotate-180');
                        }
                    });

                    // Toggle current FAQ
                    answer.classList.toggle('open');
                    icon.classList.toggle('rotate-180');
                    if (answer.style.maxHeight) {
                        answer.style.maxHeight = null;
                    } else {
                        answer.style.maxHeight = answer.scrollHeight + "px";
                    }
                });
            });
        }

        // Initialize all effects and dynamic content after DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            initAnimatedCounters();
            initSpotlightEffect();
            initFaqToggle();
            
            // initHero3D is called on window.onload to ensure it runs after full page load
            // and hides the loading overlay.
        });

        // Call initHero3D on window load
        window.addEventListener('load', initHero3D);

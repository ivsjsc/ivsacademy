---
title: ""
description: "IVS JSC - A pioneering organization in Vietnam in education (IVS Academy, IVS Kindergarten), EdTech (IVS Celestech), public health, and international cooperation."
layout: page.njk
permalink: /ivs-global-teacher-hub.html/
cssFiles:
  - css/tailwind.css
  - css/styles.css
  - css/style.css
  - css/animations.css
jsFiles:
  - js/loadComponents.js
  - js/language.js
  - js/script.js
  - js/posts-loader.js
---

<div class="container">
            <h1 class="text-3xl font-bold text-gray-800 mb-6">IVS Global Teacher Hub</h1>
            <p class="text-gray-600 mb-4">IVS – Strategic Thinking, Practical Action, Global Value.</p>
            <!-- New descriptive paragraph for the page's purpose -->
            <p class="text-gray-700 mb-6">This page serves as a central hub for international teachers interested in working in Vietnam. You can register your information here to apply for teaching positions, access important resources, and stay updated on relevant news and regulations.</p>
            <!-- VNeID News Preview Section -->
            <section class="py-8 bg-ivs-bg">
                <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-md">
                    <div class="bg-ivs-card p-6 rounded-lg shadow-lg border border-ivs-border text-center">
                        <!-- Heading for the news article -->
                        <h3 class="text-xl font-bold font-display text-sky-500 mb-2" data-lang-key="vneid_news_title">
                            Guide to Registering for VNeID Level 2 for Foreigners
                        </h3>
                        <!-- Description of the news article -->
                        <p class="text-ivs-text-secondary text-sm mb-4" data-lang-key="vneid_news_description">
                            Discover the benefits and simple process to register for a VNeID Level 2 electronic identification account in Vietnam. Simplify administrative transactions and enhance security for your life.
                        </p>
                        <!-- Call to action button to view details -->
                        <a href="https://ivsacademy.edu.vn/Blogs/blog-vneid-guide.html" class="inline-block bg-ivs-blue hover:bg-ivs-blue-darker text-white font-semibold py-2 px-4 rounded-md transition-colors" data-lang-key="vneid_news_cta">
                            View Details
                        </a>
                    </div>
                </div>
            </section>
            <!-- News and Updates Section -->
            <section id="news-updates-section" class="mb-8 p-6 bg-white rounded-lg shadow-md">
                <h2 class="text-2xl font-bold text-gray-800 mb-4" data-lang-key="news_updates_title_en">News & Updates for International Teachers</h2>
                <p class="text-gray-700 mb-6" data-lang-key="news_updates_description_en">Stay informed with the latest regulations, events, and essential resources for foreign teachers in Vietnam.</p>
                
                <div id="news-list" class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- News articles will be loaded here by JavaScript -->
                    <div class="bg-ivs-neutral-50 p-4 rounded-lg shadow-sm">
                        <h3 class="text-lg font-semibold text-primary mb-2">Loading news...</h3>
                        <p class="text-sm text-gray-600">Please wait a moment.</p>
                    </div>
                </div>
                <div class="text-center mt-6">
                    <button id="load-more-news-button" class="button-secondary" data-lang-key="load_more_news_button_en">Load More News</button>
                </div>
            </section>
            <!-- End News and Updates Section -->

            <div class="flex justify-center space-x-4 mb-6">
                <button id="apply-tab-button" class="tab-button active" data-lang-key="teacher_application_tab">Teacher Application</button>
            </div>

            <div id="teacher-application-section">
                <h2 class="text-2xl font-bold text-gray-800 mb-4" data-lang-key="submit_application_title">Submit Teacher Application</h2>
                <p class="text-gray-700 mb-6" data-lang-key="submit_application_description">Please fill in the information below to become part of IVS's international teaching team.</p>

                <form id="teacher-application-form" class="text-left">
                    <label for="fullName" class="block text-gray-700 text-sm font-bold mb-2" data-lang-key="full_name_label">Full Name:</label>
                    <input type="text" id="fullName" class="input-field" placeholder="Your full name" data-lang-key="full_name_placeholder" required>

                    <label for="email" class="block text-gray-700 text-sm font-bold mb-2" data-lang-key="email_label">Email:</label>
                    <input type="email" id="email" class="input-field" placeholder="Your email address" data-lang-key="email_placeholder" required>

                    <label for="phoneNumber" class="block text-gray-700 text-sm font-bold mb-2" data-lang-key="phone_number_label">Phone Number:</label>
                    <input type="tel" id="phoneNumber" class="input-field" placeholder="Contact phone number" data-lang-key="phone_number_placeholder" required>

                    <label for="nationality" class="block text-gray-700 text-sm font-bold mb-2" data-lang-key="nationality_label">Nationality:</label>
                    <input type="text" id="nationality" class="input-field" placeholder="Your nationality" data-lang-key="nationality_placeholder" required>

                    <label for="qualification" class="block text-gray-700 text-sm font-bold mb-2" data-lang-key="qualification_label">Highest Qualification:</label>
                    <input type="text" id="qualification" class="input-field" placeholder="e.g., Master of Education, Bachelor of English" data-lang-key="qualification_placeholder" required>

                    <label for="experience" class="block text-gray-700 text-sm font-bold mb-2" data-lang-key="experience_label">Years of Teaching Experience:</label>
                    <input type="number" id="experience" class="input-field" placeholder="Years of experience" data-lang-key="experience_placeholder" min="0" required>

                    <label for="subjects" class="block text-gray-700 text-sm font-bold mb-2" data-lang-key="subjects_label">Subjects You Can Teach (comma-separated):</label>
                    <input type="text" id="subjects" class="input-field" placeholder="e.g., English, Math, Science" data-lang-key="subjects_placeholder" required>

                    <label for="bio" class="block text-gray-700 text-sm font-bold mb-2" data-lang-key="bio_label">Brief Introduction About Yourself:</label>
                    <textarea id="bio" class="textarea-field" placeholder="Highlight your teaching experience and style (max 200 words)" data-lang-key="bio_placeholder" maxlength="200" required></textarea>

                    <!-- New field for Expectation -->
                    <label for="expectation" class="block text-gray-700 text-sm font-bold mb-2" data-lang-key="expectation_label">Expectation (Job preferences):</label>
                    <textarea id="expectation" class="textarea-field" placeholder="e.g., Full-time job in Dong Nai, Schools or English centers. Or Part-time only in the evenings on weekdays (already have a fixed daytime job)." data-lang-key="expectation_placeholder" required></textarea>

                    <p class="text-gray-700 text-sm mt-4 mb-2" data-lang-key="document_upload_instruction">To submit your CV, profile photo, or other documents (video, PDF), please prepare these files on a cloud storage service (e.g., Google Drive, Dropbox) and provide public or appropriately accessible links in the fields below.</p>

                    <label for="resumeUrl" class="block text-gray-700 text-sm font-bold mb-2" data-lang-key="resume_url_label">CV/Online Portfolio Link (optional):</label>
                    <input type="url" id="resumeUrl" class="input-field" placeholder="URL to your CV or portfolio" data-lang-key="resume_url_placeholder">

                    <label for="photoUrl" class="block text-gray-700 text-sm font-bold mb-2" data-lang-key="photo_url_label">Profile Photo Link (optional):</label>
                    <input type="url" id="photoUrl" class="input-field" placeholder="URL to your profile photo" data-lang-key="photo_url_placeholder">

                    <button type="submit" class="button-primary w-full mt-4" data-lang-key="submit_application_button">Submit Application</button>
                </form>
            </div>
        </div>
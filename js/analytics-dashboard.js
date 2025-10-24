// Analytics Dashboard functionality
class AnalyticsDashboard {
    constructor(langData) {
        this.charts = {};
        this.currentTimeRange = '7d';
        this.lang = langData || {}; // Store language data
        this.initialize();
    }

    initialize() {
        this.setupEventListeners();
        this.loadAnalyticsData();
        this.initializeCharts();
        this.updateDashboard();
    }

    setupEventListeners() {
        document.getElementById('timeRange').addEventListener('change', (e) => {
            this.currentTimeRange = e.target.value;
            this.updateDashboard();
        });

        document.getElementById('exportBtn').addEventListener('click', () => {
            this.exportData();
        });
    }

    loadAnalyticsData() {
        if (window.analyticsManager) {
            this.analyticsData = window.analyticsManager.getAnalyticsData(this.currentTimeRange);
        } else {
            this.analyticsData = this.getDemoData();
        }
    }

    getDemoData() {
        // Demo data remains the same
        return {
            summary: {
                totalEvents: 1250,
                pageViews: 450,
                courseInteractions: 89,
                materialDownloads: 34,
                quizCompletions: 67,
                averageSessionDuration: 245,
                topCourses: [
                    { courseId: 'english-basic', interactions: 45 },
                    { courseId: 'stem-intro', interactions: 38 },
                    { courseId: 'business-english', interactions: 32 }
                ],
            },
            events: this.generateDemoEvents()
        };
    }

    generateDemoEvents() {
        const events = [];
        const eventTypes = ['page_view', 'course_interaction', 'material_download', 'quiz_completion'];
        for (let i = 0; i < 50; i++) {
            events.push({
                name: eventTypes[Math.floor(Math.random() * eventTypes.length)],
                parameters: {
                    timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
                    page_url: '/learning-materials.html',
                    session_id: 'session_' + Math.random().toString(36).substr(2, 9)
                }
            });
        }
        return events;
    }

    updateDashboard() {
        this.loadAnalyticsData();
        this.updateMetrics();
        this.updateCharts();
        this.updateTopLists();
        this.updateRecentEvents();
    }

    updateMetrics() {
        const summary = this.analyticsData.summary;
        document.getElementById('totalPageViews').textContent = summary.pageViews.toLocaleString();
        document.getElementById('courseInteractions').textContent = summary.courseInteractions.toLocaleString();
        document.getElementById('materialDownloads').textContent = summary.materialDownloads.toLocaleString();
        document.getElementById('quizCompletions').textContent = summary.quizCompletions.toLocaleString();
        document.getElementById('avgLoadTime').textContent = '1.2s';
        document.getElementById('bounceRate').textContent = '32%';
        document.getElementById('sessionDuration').textContent = Math.round(summary.averageSessionDuration / 60) + 'm';
    }

    initializeCharts() {
        this.initializeTrafficChart();
        this.initializeEngagementChart();
        this.initializeProgressChart();
    }

    initializeTrafficChart() {
        const ctx = document.getElementById('trafficChart').getContext('2d');
        this.charts.traffic = new Chart(ctx, {
            type: 'line',
            data: {
                labels: this.getLast7Days(),
                datasets: [{
                    label: this.lang['analytics_chart_page_views'] || 'Page Views',
                    data: this.generateRandomData(7, 50, 150),
                    borderColor: '#60a5fa',
                    backgroundColor: 'rgba(96, 165, 250, 0.1)',
                    tension: 0.4
                }]
            },
            options: { responsive: true, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, grid: { color: '#27272a' }, ticks: { color: '#a1a1aa' } }, x: { grid: { color: '#27272a' }, ticks: { color: '#a1a1aa' } } } }
        });
    }

    initializeEngagementChart() {
        const ctx = document.getElementById('engagementChart').getContext('2d');
        this.charts.engagement = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: [
                    this.lang['analytics_chart_engagement_courses'] || 'Courses',
                    this.lang['analytics_chart_engagement_materials'] || 'Materials',
                    this.lang['analytics_chart_engagement_quizzes'] || 'Quizzes',
                    this.lang['analytics_chart_engagement_search'] || 'Search'
                ],
                datasets: [{ data: [35, 25, 20, 20], backgroundColor: ['#60a5fa', '#4ade80', '#a78bfa', '#fb923c'] }]
            },
            options: { responsive: true, plugins: { legend: { position: 'bottom', labels: { color: '#f4f4f5' } } } }
        });
    }

    initializeProgressChart() {
        const ctx = document.getElementById('progressChart').getContext('2d');
        const weekLabel = this.lang['analytics_chart_progress_week'] || 'Week';
        this.charts.progress = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: [`${weekLabel} 1`, `${weekLabel} 2`, `${weekLabel} 3`, `${weekLabel} 4`],
                datasets: [{
                    label: this.lang['analytics_chart_progress_completions'] || 'Course Completions',
                    data: [12, 19, 15, 25],
                    backgroundColor: '#4ade80',
                    borderRadius: 4
                }]
            },
            options: { responsive: true, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, grid: { color: '#27272a' }, ticks: { color: '#a1a1aa' } }, x: { grid: { color: '#27272a' }, ticks: { color: '#a1a1aa' } } } }
        });
    }

    updateCharts() {
        if (this.charts.traffic) {
            this.charts.traffic.data.datasets[0].data = this.generateRandomData(7, 50, 150);
            this.charts.traffic.update();
        }
    }

    updateTopLists() {
        const topCoursesContainer = document.getElementById('topCourses');
        const topCourses = this.analyticsData.summary.topCourses || [];
        const interactionsLabel = this.lang['analytics_interactions'] || 'interactions';

        topCoursesContainer.innerHTML = topCourses.map((course, index) => `
            <div class="flex items-center justify-between">
                <div class="flex items-center">
                    <div class="w-8 h-8 bg-ivs-blue rounded-lg flex items-center justify-center text-sm font-bold mr-3">${index + 1}</div>
                    <div>
                        <p class="font-semibold">${this.formatCourseName(course.courseId)}</p>
                        <p class="text-sm text-ivs-text-secondary">${course.interactions} ${interactionsLabel}</p>
                    </div>
                </div>
                <div class="w-20 bg-ivs-border rounded-full h-2"><div class="bg-ivs-blue h-2 rounded-full" style="width: ${Math.min(course.interactions * 2, 100)}%"></div></div>
            </div>
        `).join('');
    }

    updateRecentEvents() {
        const eventsContainer = document.getElementById('recentEvents');
        const recentEvents = this.analyticsData.events.slice(-10).reverse();
        eventsContainer.innerHTML = recentEvents.map(event => `
            <div class="flex items-center space-x-4 p-3 bg-ivs-bg rounded-lg">
                <div class="w-8 h-8 ${this.getEventIconColor(event.name)} rounded-lg flex items-center justify-center">
                    <i class="fas ${this.getEventIcon(event.name)} text-white text-sm"></i>
                </div>
                <div class="flex-1">
                    <p class="font-semibold">${this.formatEventName(event.name)}</p>
                    <p class="text-sm text-ivs-text-secondary">${new Date(event.parameters.timestamp).toLocaleString('vi-VN')}</p>
                </div>
            </div>
        `).join('');
    }

    getLast7Days() {
        const days = [];
        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            days.push(date.toLocaleDateString('vi-VN', { weekday: 'short' }));
        }
        return days;
    }

    generateRandomData(count, min, max) {
        return Array.from({ length: count }, () => Math.floor(Math.random() * (max - min + 1)) + min);
    }

    formatCourseName(courseId) {
        const names = {
            'english-basic': this.lang['analytics_course_name_english_basic'] || 'English Basic',
            'stem-intro': this.lang['analytics_course_name_stem_intro'] || 'STEM Introduction',
            'business-english': this.lang['analytics_course_name_business_english'] || 'Business English'
        };
        return names[courseId] || courseId;
    }

    formatEventName(eventName) {
        const names = {
            'page_view': this.lang['analytics_event_page_view'] || 'Page View',
            'course_interaction': this.lang['analytics_event_course_interaction'] || 'Course Interaction',
            'material_download': this.lang['analytics_event_material_download'] || 'Material Download',
            'quiz_completion': this.lang['analytics_event_quiz_completion'] || 'Quiz Completion'
        };
        return names[eventName] || eventName;
    }

    getEventIcon(eventName) {
        const icons = { 'page_view': 'fa-eye', 'course_interaction': 'fa-book', 'material_download': 'fa-download', 'quiz_completion': 'fa-brain' };
        return icons[eventName] || 'fa-circle';
    }

    getEventIconColor(eventName) {
        const colors = { 'page_view': 'bg-ivs-blue', 'course_interaction': 'bg-ivs-green', 'material_download': 'bg-ivs-purple', 'quiz_completion': 'bg-ivs-orange' };
        return colors[eventName] || 'bg-gray-500';
    }

    exportData() {
        if (window.analyticsManager) {
            const data = window.analyticsManager.exportAnalyticsData('csv');
            const blob = new Blob([data], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `ivs-analytics-${new Date().toISOString().split('T')[0]}.csv`;
            a.click();
            window.URL.revokeObjectURL(url);
        } else {
            alert(this.lang['analytics_export_unavailable'] || 'Analytics data not available for export');
        }
    }
}

// Initialize dashboard when DOM is loaded and language data is available
document.addEventListener('DOMContentLoaded', function() {
    // This assumes that language.js has already fetched and stored langData in window.langData
    const initializeDashboard = () => {
        if (typeof Chart !== 'undefined' && window.langData) {
            window.analyticsDashboard = new AnalyticsDashboard(window.langData);
        } else {
            // Retry if resources are not ready
            setTimeout(initializeDashboard, 100);
        }
    };
    initializeDashboard();
});
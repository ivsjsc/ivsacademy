/**
 * Interactive Learning Materials Module
 * Handles course navigation, progress tracking, quizzes, and multimedia content
 */

class LearningHub {
    constructor() {
        this.currentCourse = null;
        this.userProgress = this.loadProgress();
        this.quizData = {};
        this.multimediaData = {};
        this.initialize();
    }

    initialize() {
        this.setupEventListeners();
        this.loadCourseData();
        this.updateProgressDisplay();
        this.initializeQuizzes();
        this.initializeMultimedia();
    }

    setupEventListeners() {
        // Course category selection
        const courseCards = document.querySelectorAll('.bg-ivs-bg.rounded-xl');
        courseCards.forEach(card => {
            card.addEventListener('click', (e) => this.handleCourseSelection(e));
        });

        // Quick action buttons
        const quickActions = document.querySelectorAll('.bg-ivs-blue, .bg-gray-700, .bg-ivs-green');
        quickActions.forEach(button => {
            button.addEventListener('click', (e) => this.handleQuickAction(e));
        });

        // Quiz interactions
        this.setupQuizListeners();

        // Multimedia controls
        this.setupMultimediaListeners();
    }

    handleCourseSelection(event) {
        const card = event.currentTarget;
        const category = card.querySelector('h3').textContent.toLowerCase().replace(/\s+/g, '-');

        // Visual feedback
        card.style.transform = 'scale(0.98)';
        setTimeout(() => {
            card.style.transform = '';
        }, 150);

        // Navigate to course category
        this.loadCourseCategory(category);
    }

    handleQuickAction(event) {
        const button = event.currentTarget;
        const action = button.textContent.trim().toLowerCase();

        if (action.includes('tiếp tục học')) {
            this.continueLearning();
        } else if (action.includes('bài tập mới')) {
            this.loadNewExercises();
        } else if (action.includes('thành tích')) {
            this.showAchievements();
        }
    }

    setupQuizListeners() {
        // Radio button selections
        const quizOptions = document.querySelectorAll('input[type="radio"]');
        quizOptions.forEach(option => {
            option.addEventListener('change', (e) => this.handleQuizSelection(e));
        });

        // Submit quiz button
        const submitButton = document.querySelector('button:has-text("Nộp Bài")');
        if (submitButton) {
            submitButton.addEventListener('click', () => this.submitQuiz());
        }
    }

    handleQuizSelection(event) {
        const option = event.target;
        const questionContainer = option.closest('.bg-ivs-bg');

        // Remove previous highlights
        const labels = questionContainer.querySelectorAll('label');
        labels.forEach(label => {
            label.classList.remove('bg-blue-100', 'dark:bg-blue-900', 'ring-2', 'ring-blue-500');
        });

        // Highlight selected option
        const selectedLabel = option.closest('label');
        selectedLabel.classList.add('bg-blue-100', 'dark:bg-blue-900', 'ring-2', 'ring-blue-500');
    }

    submitQuiz() {
        const selectedOptions = document.querySelectorAll('input[type="radio"]:checked');
        let correctAnswers = 0;
        let totalQuestions = 0;

        selectedOptions.forEach(option => {
            totalQuestions++;
            // Simple quiz logic - in real implementation, this would check against correct answers
            if (option.value === 'correct') {
                correctAnswers++;
            }
        });

        const score = Math.round((correctAnswers / totalQuestions) * 100);
        this.showQuizResult(score);
        this.updateProgress(score);
    }

    showQuizResult(score) {
        const resultModal = this.createResultModal(score);
        document.body.appendChild(resultModal);

        // Auto remove after 3 seconds
        setTimeout(() => {
            resultModal.remove();
        }, 3000);
    }

    createResultModal(score) {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        modal.innerHTML = `
            <div class="bg-ivs-card rounded-xl p-8 border border-ivs-border max-w-md mx-4">
                <div class="text-center">
                    <div class="w-16 h-16 ${score >= 80 ? 'bg-green-500' : score >= 60 ? 'bg-yellow-500' : 'bg-red-500'} rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="fas ${score >= 80 ? 'fa-check' : score >= 60 ? 'fa-exclamation-triangle' : 'fa-times'} text-white text-2xl"></i>
                    </div>
                    <h3 class="text-xl font-bold mb-2">Kết Quả Bài Kiểm Tra</h3>
                    <p class="text-3xl font-bold text-ivs-blue mb-4">${score}%</p>
                    <p class="text-ivs-text-secondary">
                        ${score >= 80 ? 'Xuất sắc! Bạn đã nắm vững kiến thức.' :
                          score >= 60 ? 'Tốt! Hãy ôn tập thêm một chút.' :
                          'Cần cố gắng hơn. Hãy xem lại bài học.'}
                    </p>
                </div>
            </div>
        `;
        return modal;
    }

    setupMultimediaListeners() {
        const playButtons = document.querySelectorAll('button:has-text("Phát Video")');
        const downloadButtons = document.querySelectorAll('button:has-text("Tải Tài Liệu")');

        playButtons.forEach(button => {
            button.addEventListener('click', (e) => this.playMultimedia(e));
        });

        downloadButtons.forEach(button => {
            button.addEventListener('click', (e) => this.downloadResource(e));
        });
    }

    playMultimedia(event) {
        const button = event.currentTarget;
        const container = button.closest('.bg-ivs-card');
        const videoPlaceholder = container.querySelector('.aspect-video');

        // Create video player
        const videoPlayer = document.createElement('video');
        videoPlayer.className = 'w-full h-full rounded-lg';
        videoPlayer.controls = true;
        videoPlayer.innerHTML = `
            <source src="/videos/sample-lesson.mp4" type="video/mp4">
            Trình duyệt của bạn không hỗ trợ video.
        `;

        videoPlaceholder.innerHTML = '';
        videoPlaceholder.appendChild(videoPlayer);
        videoPlayer.play();
    }

    downloadResource(event) {
        const button = event.currentTarget;
        // In real implementation, this would trigger actual download
        button.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Đang tải...';

        setTimeout(() => {
            button.innerHTML = '<i class="fas fa-check mr-2"></i>Đã tải';
            setTimeout(() => {
                button.innerHTML = '<i class="fas fa-download mr-2"></i>Tải Tài Liệu';
            }, 2000);
        }, 1500);
    }

    loadProgress() {
        const saved = localStorage.getItem('ivs-learning-progress');
        return saved ? JSON.parse(saved) : {
            completedCourses: 24,
            lessonsLearned: 156,
            averageScore: 89,
            hoursPerMonth: 12,
            streak: 7,
            currentCourses: [
                { name: 'Tiếng Anh Giao Tiếp', progress: 75 }
            ]
        };
    }

    updateProgress(newScore) {
        this.userProgress.averageScore = Math.round(
            (this.userProgress.averageScore + newScore) / 2
        );
        this.saveProgress();
        this.updateProgressDisplay();
    }

    saveProgress() {
        localStorage.setItem('ivs-learning-progress', JSON.stringify(this.userProgress));
    }

    updateProgressDisplay() {
        // Update stats
        const stats = document.querySelectorAll('.text-3xl.font-bold');
        if (stats.length >= 4) {
            stats[0].textContent = this.userProgress.completedCourses;
            stats[1].textContent = this.userProgress.lessonsLearned;
            stats[2].textContent = `${this.userProgress.averageScore}%`;
            stats[3].textContent = this.userProgress.hoursPerMonth;
        }

        // Update streak
        const streakElement = document.querySelector('.text-4xl.font-bold.text-ivs-orange');
        if (streakElement) {
            streakElement.textContent = this.userProgress.streak;
        }

        // Update progress bar
        const progressBar = document.querySelector('.bg-ivs-blue');
        if (progressBar && this.userProgress.currentCourses.length > 0) {
            const progress = this.userProgress.currentCourses[0].progress;
            progressBar.style.width = `${progress}%`;

            const progressText = document.querySelector('.flex.justify-between.text-sm span:last-child');
            if (progressText) {
                progressText.textContent = `${progress}%`;
            }
        }
    }

    loadCourseData() {
        // Mock course data - in real implementation, this would load from API
        this.quizData = {
            basic: [
                { question: 'What is the capital of France?', options: ['London', 'Paris', 'Berlin'], correct: 1 }
            ]
        };

        this.multimediaData = {
            english: [
                { type: 'video', title: 'Present Perfect Tense', url: '/videos/present-perfect.mp4' },
                { type: 'audio', title: 'Pronunciation Practice', url: '/audios/pronunciation.mp3' }
            ]
        };
    }

    loadCourseCategory(category) {
        // Navigate to category page or show category content
        console.log(`Loading course category: ${category}`);
        // In real implementation, this would load category-specific content
    }

    continueLearning() {
        // Continue from last lesson
        console.log('Continuing learning from last lesson');
    }

    loadNewExercises() {
        // Load new exercises
        console.log('Loading new exercises');
    }

    showAchievements() {
        // Show user achievements
        const achievements = [
            'Hoàn thành 24 khóa học',
            'Đạt điểm trung bình 89%',
            'Duy trì chuỗi học tập 7 ngày',
            'Hoàn thành bài kiểm tra xuất sắc'
        ];

        const modal = this.createAchievementsModal(achievements);
        document.body.appendChild(modal);
    }

    createAchievementsModal(achievements) {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        modal.innerHTML = `
            <div class="bg-ivs-card rounded-xl p-8 border border-ivs-border max-w-lg mx-4 max-h-96 overflow-y-auto">
                <div class="flex justify-between items-center mb-6">
                    <h3 class="text-2xl font-bold">Thành Tích Của Bạn</h3>
                    <button class="text-ivs-text-secondary hover:text-white" onclick="this.closest('.fixed').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="space-y-4">
                    ${achievements.map(achievement => `
                        <div class="flex items-center bg-ivs-bg p-4 rounded-lg">
                            <div class="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center mr-4">
                                <i class="fas fa-trophy text-white"></i>
                            </div>
                            <span>${achievement}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        return modal;
    }

    initializeQuizzes() {
        // Initialize quiz functionality
        console.log('Quizzes initialized');
    }

    initializeMultimedia() {
        // Initialize multimedia players
        console.log('Multimedia initialized');
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.learning-hub')) {
        new LearningHub();
    }
});

// Export for potential use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LearningHub;
}
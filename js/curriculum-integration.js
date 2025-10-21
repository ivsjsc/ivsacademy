// Curriculum Integration for Learning Materials Page
// This script loads and displays curriculum data from the curriculum folder

class CurriculumManager {
    constructor() {
        this.curriculumData = null;
        this.currentLanguage = 'vi'; // Default to Vietnamese
    }

    // Load curriculum data (simplified version for web use)
    async loadCurriculumData() {
        try {
            // For now, we'll create a simplified version of the curriculum data
            // In a real implementation, this would load from the TypeScript files
            this.curriculumData = [
                {
                    category: { en: 'Kindergarten IVS-Mastery', vi: 'Mầm non IVS-Mastery' },
                    levels: [
                        {
                            level: 'GD1',
                            title: { en: 'Goal Digger 1', vi: 'Goal Digger 1' },
                            subtitle: { en: 'Foundation English', vi: 'Tiếng Anh Cơ bản' },
                            units: [
                                { id: 'gd1-u1', title: { en: 'Unit 1: Hello World', vi: 'Bài 1: Chào thế giới' } },
                                { id: 'gd1-u2', title: { en: 'Unit 2: My Family', vi: 'Bài 2: Gia đình tôi' } }
                            ]
                        },
                        {
                            level: 'GD2',
                            title: { en: 'Goal Digger 2', vi: 'Goal Digger 2' },
                            subtitle: { en: 'Basic Communication', vi: 'Giao tiếp Cơ bản' },
                            units: [
                                { id: 'gd2-u1', title: { en: 'Unit 1: Colors & Shapes', vi: 'Bài 1: Màu sắc & Hình dạng' } },
                                { id: 'gd2-u2', title: { en: 'Unit 2: Numbers', vi: 'Bài 2: Số đếm' } }
                            ]
                        }
                    ]
                },
                {
                    category: { en: 'Primary IVS-Mastery', vi: 'Tiểu học IVS-Mastery' },
                    levels: [
                        {
                            level: 'SM1',
                            title: { en: 'Smart Master 1', vi: 'Smart Master 1' },
                            subtitle: { en: 'Grade 1 English', vi: 'Tiếng Anh Lớp 1' },
                            units: [
                                { id: 'sm1-u1', title: { en: 'Unit 1: My School', vi: 'Bài 1: Trường học của tôi' } },
                                { id: 'sm1-u2', title: { en: 'Unit 2: My Friends', vi: 'Bài 2: Bạn bè của tôi' } }
                            ]
                        },
                        {
                            level: 'SM2',
                            title: { en: 'Smart Master 2', vi: 'Smart Master 2' },
                            subtitle: { en: 'Grade 2 English', vi: 'Tiếng Anh Lớp 2' },
                            units: [
                                { id: 'sm2-u1', title: { en: 'Unit 1: Animals', vi: 'Bài 1: Động vật' } },
                                { id: 'sm2-u2', title: { en: 'Unit 2: Food', vi: 'Bài 2: Đồ ăn' } }
                            ]
                        }
                    ]
                },
                {
                    category: { en: 'Secondary IVS-Mastery', vi: 'Trung học IVS-Mastery' },
                    levels: [
                        {
                            level: 'SW6',
                            title: { en: 'Smart World 6', vi: 'Smart World 6' },
                            subtitle: { en: 'Grade 6 English', vi: 'Tiếng Anh Lớp 6' },
                            units: [
                                { id: 'sw6-u1', title: { en: 'Unit 1: My Hobbies', vi: 'Bài 1: Sở thích của tôi' } },
                                { id: 'sw6-u2', title: { en: 'Unit 2: Sports', vi: 'Bài 2: Thể thao' } }
                            ]
                        }
                    ]
                },
                {
                    category: { en: 'High School', vi: 'Trung học phổ thông' },
                    levels: [
                        {
                            level: 'G10',
                            title: { en: 'Grade 10', vi: 'Lớp 10' },
                            subtitle: { en: 'Global Success', vi: 'Tiếng Anh 10 - Global Success' },
                            units: [
                                { id: 'g10-u1', title: { en: 'Unit 1: Family Life', vi: 'Bài 1: Cuộc sống gia đình' } },
                                { id: 'g10-u2', title: { en: 'Unit 2: Personal Information', vi: 'Bài 2: Thông tin cá nhân' } }
                            ]
                        },
                        {
                            level: 'G11',
                            title: { en: 'Grade 11', vi: 'Lớp 11' },
                            subtitle: { en: 'Global Success', vi: 'Tiếng Anh 11 - Global Success' },
                            units: [
                                { id: 'g11-u1', title: { en: 'Unit 1: Friendship', vi: 'Bài 1: Tình bạn' } },
                                { id: 'g11-u2', title: { en: 'Unit 2: Personal Experiences', vi: 'Bài 2: Trải nghiệm cá nhân' } }
                            ]
                        },
                        {
                            level: 'G12',
                            title: { en: 'Grade 12', vi: 'Lớp 12' },
                            subtitle: { en: 'Global Success', vi: 'Tiếng Anh 12 - Global Success' },
                            units: [
                                { id: 'g12-u1', title: { en: 'Unit 1: Urbanization', vi: 'Bài 1: Đô thị hóa' } },
                                { id: 'g12-u2', title: { en: 'Unit 2: The Green Movement', vi: 'Bài 2: Phong trào xanh' } }
                            ]
                        }
                    ]
                }
            ];

            console.log('Curriculum data loaded successfully');
            return true;
        } catch (error) {
            console.error('Failed to load curriculum data:', error);
            return false;
        }
    }

    // Render curriculum categories to the page
    renderCurriculumCategories() {
        const container = document.querySelector('.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3.gap-8');
        if (!container || !this.curriculumData) return;

        // Clear existing static content
        container.innerHTML = '';

        // Create curriculum category cards
        this.curriculumData.forEach((category, categoryIndex) => {
            const categoryCard = this.createCategoryCard(category, categoryIndex);
            container.appendChild(categoryCard);
        });
    }

    // Create a category card
    createCategoryCard(category, categoryIndex) {
        const card = document.createElement('div');
        card.className = 'bg-ivs-bg rounded-xl p-6 border border-ivs-border hover:border-ivs-blue transition-all cursor-pointer group';
        card.setAttribute('data-aos', 'fade-up');
        card.setAttribute('data-aos-delay', (categoryIndex * 100).toString());

        const categoryName = category.category[this.currentLanguage] || category.category.en;
        const levelCount = category.levels.length;
        const totalUnits = category.levels.reduce((sum, level) => sum + (level.units ? level.units.length : 0), 0);

        // Choose icon based on category
        let iconClass = 'fas fa-language';
        let colorClass = 'bg-blue-500';
        let hoverColor = 'text-ivs-blue';

        if (category.category.en.includes('Kindergarten')) {
            iconClass = 'fas fa-baby';
            colorClass = 'bg-pink-500';
            hoverColor = 'text-pink-500';
        } else if (category.category.en.includes('Primary')) {
            iconClass = 'fas fa-school';
            colorClass = 'bg-green-500';
            hoverColor = 'text-ivs-green';
        } else if (category.category.en.includes('Secondary')) {
            iconClass = 'fas fa-graduation-cap';
            colorClass = 'bg-purple-500';
            hoverColor = 'text-ivs-purple';
        } else if (category.category.en.includes('High School')) {
            iconClass = 'fas fa-university';
            colorClass = 'bg-orange-500';
            hoverColor = 'text-ivs-orange';
        }

        card.innerHTML = `
            <div class="w-16 h-16 ${colorClass} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <i class="${iconClass} text-2xl text-white"></i>
            </div>
            <h3 class="text-xl font-bold mb-2">${categoryName}</h3>
            <p class="text-ivs-text-secondary mb-4">${levelCount} cấp độ • ${totalUnits} bài học</p>
            <div class="flex justify-between items-center">
                <span class="${hoverColor} font-semibold">Khám phá</span>
                <i class="fas fa-arrow-right ${hoverColor} group-hover:translate-x-2 transition-transform"></i>
            </div>
        `;

        // Add click handler
        card.addEventListener('click', () => {
            this.showCategoryDetails(category);
        });

        return card;
    }

    // Show detailed view of a category
    showCategoryDetails(category) {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
        modal.innerHTML = `
            <div class="bg-ivs-card rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div class="p-6 border-b border-ivs-border">
                    <div class="flex justify-between items-center">
                        <h2 class="text-2xl font-bold">${category.category[this.currentLanguage] || category.category.en}</h2>
                        <button class="text-ivs-text-secondary hover:text-white text-2xl" onclick="this.closest('.fixed').remove()">&times;</button>
                    </div>
                </div>
                <div class="p-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        ${category.levels.map(level => this.createLevelCard(level)).join('')}
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    // Create a level card for the modal
    createLevelCard(level) {
        const levelTitle = level.title[this.currentLanguage] || level.title.en;
        const subtitle = level.subtitle[this.currentLanguage] || level.subtitle.en;
        const unitCount = level.units ? level.units.length : 0;

        return `
            <div class="bg-ivs-bg rounded-lg p-4 border border-ivs-border hover:border-ivs-blue transition-colors cursor-pointer">
                <h3 class="font-bold text-lg mb-1">${levelTitle}</h3>
                <p class="text-ivs-text-secondary text-sm mb-2">${subtitle}</p>
                <p class="text-xs text-ivs-blue">${unitCount} bài học</p>
            </div>
        `;
    }

    // Initialize the curriculum manager
    async init() {
        const success = await this.loadCurriculumData();
        if (success) {
            this.renderCurriculumCategories();
        }
    }
}

// Initialize curriculum manager when page loads
document.addEventListener('DOMContentLoaded', function() {
    window.curriculumManager = new CurriculumManager();
    window.curriculumManager.init();
});
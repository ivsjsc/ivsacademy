import { CurriculumLevel } from '../types';

export const goaldigger3Data: CurriculumLevel = {
    level: 3,
    title: { en: 'Goaldigger 3', vi: 'Goaldigger 3' },
    subtitle: { en: 'Preschool - Ages 5', vi: 'Mầm non - 5 tuổi' },
    ebookPdfUrl: 'https://drive.google.com/file/d/1O-0ZgQzV5Yb2X2V3Yf8bW5LkKj3e9U3P/view?usp=sharing',
    units: [
        {
            id: 301,
            title: { en: 'Unit 1: My Day', vi: 'Bài 1: Ngày của mình' },
            lessons: [
                {
                    id: 30101,
                    title: { en: 'Daily Routines', vi: 'Thói quen hàng ngày' },
                    aims: {
                        en: ['Experience daily routines through interactive play.', 'Develop time awareness and sequence understanding.', 'Build confidence in daily activities.'],
                        vi: ['Trải nghiệm thói quen hàng ngày qua trò chơi tương tác.', 'Phát triển nhận thức thời gian và hiểu thứ tự.', 'Xây dựng sự tự tin trong hoạt động hàng ngày.']
                    },
                    vocabulary: [
                        { term: 'wake up', pronunciation: '/weɪk ʌp/', vietnamese: 'thức dậy' },
                        { term: 'brush teeth', pronunciation: '/brʌʃ tiːθ/', vietnamese: 'đánh răng' },
                        { term: 'have breakfast', pronunciation: '/hæv ˈbrɛkfəst/', vietnamese: 'ăn sáng' },
                        { term: 'go to school', pronunciation: '/ɡoʊ tuː skuːl/', vietnamese: 'đi học' },
                        { term: 'play', pronunciation: '/pleɪ/', vietnamese: 'chơi' },
                        { term: 'go to bed', pronunciation: '/ɡoʊ tuː bɛd/', vietnamese: 'đi ngủ' }
                    ],
                    grammar: [{
                        title: { en: 'Natural Communication', vi: 'Giao tiếp tự nhiên' },
                        explanation: {
                            en: ['Focus on natural expression through play and interaction.', 'No formal grammar rules - emphasize communication through gestures, sounds, and simple words.'],
                            vi: ['Tập trung vào biểu đạt tự nhiên qua trò chơi và tương tác.', 'Không có quy tắc ngữ pháp chính thức - nhấn mạnh giao tiếp qua cử chỉ, âm thanh và từ đơn giản.']
                        }
                    }],
                    activities: [{
                        type: 'Routine Role-Play',
                        description: {
                            en: ['Daily routine puppet shows.', 'Personal care center activities.', 'Morning circle time routines.', 'Bedtime story sequencing.'],
                            vi: ['Buổi biểu diễn rối thói quen hàng ngày.', 'Hoạt động trung tâm chăm sóc cá nhân.', 'Thói quen vòng tròn buổi sáng.', 'Sắp xếp thứ tự câu chuyện đi ngủ.']
                        }
                    },
                    {
                        type: 'Time Awareness',
                        description: {
                            en: ['Clock face exploration games.', 'Before/after activity sequencing.', 'Daily schedule picture charts.', 'Time-related movement games.'],
                            vi: ['Trò chơi khám phá mặt đồng hồ.', 'Sắp xếp thứ tự hoạt động trước/sau.', 'Biểu đồ hình ảnh lịch trình hàng ngày.', 'Trò chơi cử động liên quan thời gian.']
                        }
                    }]
                },
                {
                    id: 30102,
                    title: { en: 'Food & Health', vi: 'Thức ăn & Sức khỏe' },
                    aims: {
                        en: ['Explore healthy foods through sensory play.', 'Learn about body care and healthy habits.', 'Develop appreciation for nutritious choices.'],
                        vi: ['Khám phá thực phẩm lành mạnh qua trò chơi giác quan.', 'Học về chăm sóc cơ thể và thói quen khỏe mạnh.', 'Phát triển sự đánh giá cao đối với lựa chọn dinh dưỡng.']
                    },
                    vocabulary: [
                        { term: 'apple', pronunciation: '/ˈæpəl/', vietnamese: 'quả táo' },
                        { term: 'banana', pronunciation: '/bəˈnænə/', vietnamese: 'quả chuối' },
                        { term: 'milk', pronunciation: '/mɪlk/', vietnamese: 'sữa' },
                        { term: 'bread', pronunciation: '/brɛd/', vietnamese: 'bánh mì' },
                        { term: 'water', pronunciation: '/ˈwɔtər/', vietnamese: 'nước' },
                        { term: 'wash hands', pronunciation: '/wɔʃ hændz/', vietnamese: 'rửa tay' },
                        { term: 'healthy', pronunciation: '/ˈhɛlθi/', vietnamese: 'khỏe mạnh' },
                        { term: 'strong', pronunciation: '/strɔŋ/', vietnamese: 'mạnh mẽ' },
                    ],
                    grammar: [{
                        title: { en: 'Natural Communication', vi: 'Giao tiếp tự nhiên' },
                        explanation: {
                            en: ['Focus on natural expression through play and interaction.', 'No formal grammar rules - emphasize communication through gestures, sounds, and simple words.'],
                            vi: ['Tập trung vào biểu đạt tự nhiên qua trò chơi và tương tác.', 'Không có quy tắc ngữ pháp chính thức - nhấn mạnh giao tiếp qua cử chỉ, âm thanh và từ đơn giản.']
                        }
                    }],
                    activities: [{
                        type: 'Sensory Food Play',
                        description: {
                            en: ['Food texture exploration with safe samples.', 'Color and shape food sorting games.', 'Healthy food charades.', 'Food group classification activities.'],
                            vi: ['Khám phá kết cấu thực phẩm với mẫu an toàn.', 'Trò chơi phân loại thực phẩm theo màu và hình dạng.', 'Trò diễn tả thực phẩm lành mạnh.', 'Hoạt động phân loại nhóm thực phẩm.']
                        }
                    },
                    {
                        type: 'Health Habits',
                        description: {
                            en: ['Handwashing song and dance routines.', 'Body part identification games.', 'Healthy habit role-play.', 'Nutrition awareness through stories.'],
                            vi: ['Bài hát và điệu nhảy rửa tay.', 'Trò chơi nhận biết bộ phận cơ thể.', 'Đóng vai thói quen khỏe mạnh.', 'Nhận thức dinh dưỡng qua câu chuyện.']
                        }
                    },
                    {
                        type: 'Family Nutrition',
                        description: {
                            en: ['Family meal planning activities.', 'Healthy snack preparation with parents.', 'Food diary drawing and sharing.', 'Family cooking show role-play.'],
                            vi: ['Hoạt động lập kế hoạch bữa ăn gia đình.', 'Chuẩn bị đồ ăn nhẹ lành mạnh với phụ huynh.', 'Vẽ và chia sẻ nhật ký thực phẩm.', 'Đóng vai chương trình nấu ăn gia đình.']
                        }
                    }]
                },
                {
                    id: 30103,
                    title: { en: 'Friends & Play', vi: 'Bạn bè & Trò chơi' },
                    aims: {
                        en: ['Develop social skills through cooperative play.', 'Learn sharing and turn-taking.', 'Build friendship and group awareness.'],
                        vi: ['Phát triển kỹ năng xã hội qua trò chơi hợp tác.', 'Học chia sẻ và luân phiên.', 'Xây dựng tình bạn và nhận thức nhóm.']
                    },
                    vocabulary: [
                        { term: 'friend', pronunciation: '/frɛnd/', vietnamese: 'bạn bè' },
                        { term: 'share', pronunciation: '/ʃɛr/', vietnamese: 'chia sẻ' },
                        { term: 'play', pronunciation: '/pleɪ/', vietnamese: 'chơi' },
                        { term: 'together', pronunciation: '/təˈɡɛðər/', vietnamese: 'cùng nhau' },
                        { term: 'help', pronunciation: '/hɛlp/', vietnamese: 'giúp đỡ' },
                        { term: 'nice', pronunciation: '/naɪs/', vietnamese: 'tốt bụng' },
                        { term: 'fun', pronunciation: '/fʌn/', vietnamese: 'vui vẻ' },
                        { term: 'smile', pronunciation: '/smaɪl/', vietnamese: 'cười' },
                    ],
                    grammar: [{
                        title: { en: 'Natural Communication', vi: 'Giao tiếp tự nhiên' },
                        explanation: {
                            en: ['Focus on natural expression through play and interaction.', 'No formal grammar rules - emphasize communication through gestures, sounds, and simple words.'],
                            vi: ['Tập trung vào biểu đạt tự nhiên qua trò chơi và tương tác.', 'Không có quy tắc ngữ pháp chính thức - nhấn mạnh giao tiếp qua cử chỉ, âm thanh và từ đơn giản.']
                        }
                    }],
                    activities: [{
                        type: 'Cooperative Games',
                        description: {
                            en: ['Group building block activities.', 'Sharing circle games.', 'Turn-taking board games.', 'Team problem-solving challenges.'],
                            vi: ['Hoạt động xây dựng khối nhóm.', 'Trò chơi vòng tròn chia sẻ.', 'Trò chơi bàn luân phiên.', 'Thách thức giải quyết vấn đề nhóm.']
                        }
                    },
                    {
                        type: 'Friendship Skills',
                        description: {
                            en: ['Friendship role-play scenarios.', 'Kindness compliment circles.', 'Helping hands activities.', 'Friendship bracelet making.'],
                            vi: ['Kịch bản đóng vai tình bạn.', 'Vòng tròn khen ngợi lòng tốt.', 'Hoạt động bàn tay giúp đỡ.', 'Làm vòng tay tình bạn.']
                        }
                    },
                    {
                        type: 'Social Stories',
                        description: {
                            en: ['Friendship picture book creation.', 'Social situation discussions.', 'Emotion recognition in play.', 'Conflict resolution role-play.'],
                            vi: ['Tạo sách hình tình bạn.', 'Thảo luận tình huống xã hội.', 'Nhận biết cảm xúc trong trò chơi.', 'Đóng vai giải quyết xung đột.']
                        }
                    }]
                }
            ]
        }
    ]
};

export default goaldigger3Data;

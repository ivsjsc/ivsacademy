import { CurriculumLevel } from '../types';

const IMG_BASE = 'https://storage.googleapis.com/maker-suite-project-files-prod/upload/flashcard_images/';
const GD_BASE = `${IMG_BASE}goaldigger_`;

export const goaldigger1Data: CurriculumLevel = {
    level: 1,
    title: { en: 'Goaldigger 1', vi: 'Goaldigger 1' },
    subtitle: { en: 'Preschool - Ages 3', vi: 'Mầm non - 3 tuổi' },
    ebookPdfUrl: 'https://drive.google.com/file/d/15nr-AZWt8i5kMalcGs6boFTFxVoRvIzn/view?usp=sharing',
    units: [
        {
            id: 101,
            title: { en: 'Unit 1: Getting Started', vi: 'Bài 1: Bắt đầu' },
            lessons: [
                {
                    id: 10101,
                    title: { en: 'Familiar Objects & Colors', vi: 'Đồ vật quen thuộc & Màu sắc' },
                    aims: {
                        en: ['Explore familiar objects and colors through play.', 'Develop sensory awareness and basic communication.', 'Build confidence through interactive activities.'],
                        vi: ['Khám phá đồ vật quen thuộc và màu sắc qua trò chơi.', 'Phát triển nhận thức giác quan và giao tiếp cơ bản.', 'Xây dựng sự tự tin qua các hoạt động tương tác.']
                    },
                    vocabulary: [
                        { term: 'red', pronunciation: '/rɛd/', vietnamese: 'màu đỏ', imageUrl: `${GD_BASE}red.png` },
                        { term: 'yellow', pronunciation: '/ˈjɛloʊ/', vietnamese: 'màu vàng', imageUrl: `${GD_BASE}yellow.png` },
                        { term: 'blue', pronunciation: '/blu/', vietnamese: 'màu xanh dương', imageUrl: `${GD_BASE}blue.png` },
                        { term: 'apple', pronunciation: '/ˈæpəl/', vietnamese: 'quả táo', imageUrl: `${GD_BASE}apple.png` },
                        { term: 'ball', pronunciation: '/bɔːl/', vietnamese: 'quả bóng' },
                        { term: 'sun', pronunciation: '/sʌn/', vietnamese: 'mặt trời', imageUrl: `${GD_BASE}sun.png` },
                    ],
                    grammar: [{
                        title: { en: 'Natural Communication', vi: 'Giao tiếp tự nhiên' },
                        explanation: {
                            en: ['Focus on natural expression through play and interaction.', 'No formal grammar rules - emphasize communication through gestures, sounds, and simple words.'],
                            vi: ['Tập trung vào biểu đạt tự nhiên qua trò chơi và tương tác.', 'Không có quy tắc ngữ pháp chính thức - nhấn mạnh giao tiếp qua cử chỉ, âm thanh và từ đơn giản.']
                        }
                    }],
                    activities: [{
                        type: 'Interactive Play',
                        description: {
                            en: ['Color recognition games with real objects.', 'Sensory play with colored balls and toys.', 'Parent-child color matching activities at home.', 'Group circle time with color songs and movements.'],
                            vi: ['Trò chơi nhận biết màu sắc với đồ vật thật.', 'Trò chơi giác quan với bóng và đồ chơi màu.', 'Hoạt động phối hợp phụ huynh - con nhận biết màu tại nhà.', 'Thời gian vòng tròn nhóm với bài hát màu sắc và cử chỉ.']
                        }
                    },
                    {
                        type: 'Parent Involvement',
                        description: {
                            en: ['Daily color exploration at home with household items.', 'Photo sharing of child\'s favorite colored objects.', 'Simple color vocabulary practice during meals and playtime.'],
                            vi: ['Khám phá màu sắc hàng ngày tại nhà với đồ vật gia đình.', 'Chia sẻ ảnh đồ vật màu yêu thích của con.', 'Thực hành từ vựng màu sắc đơn giản trong bữa ăn và giờ chơi.']
                        }
                    }]
                },
                {
                    id: 10102,
                    title: { en: 'Counting & Animals', vi: 'Đếm số & Động vật' },
                    aims: {
                        en: ['Experience numbers through movement and play.', 'Connect with animals through stories and songs.', 'Develop basic counting skills through fun activities.'],
                        vi: ['Trải nghiệm số qua cử động và trò chơi.', 'Kết nối với động vật qua câu chuyện và bài hát.', 'Phát triển kỹ năng đếm cơ bản qua hoạt động vui vẻ.']
                    },
                    vocabulary: [
                        { term: 'one', pronunciation: '/wʌn/', vietnamese: 'một', imageUrl: `${GD_BASE}one.png` },
                        { term: 'two', pronunciation: '/tu/', vietnamese: 'hai', imageUrl: `${GD_BASE}two.png` },
                        { term: 'three', pronunciation: '/θri/', vietnamese: 'ba', imageUrl: `${GD_BASE}three.png` },
                        { term: 'cat', pronunciation: '/kæt/', vietnamese: 'con mèo', imageUrl: `${GD_BASE}cat.png` },
                        { term: 'dog', pronunciation: '/dɔɡ/', vietnamese: 'con chó', imageUrl: `${GD_BASE}dog.png` },
                        { term: 'bird', pronunciation: '/bɜːrd/', vietnamese: 'con chim', imageUrl: `${GD_BASE}bird.png` },
                    ],
                    grammar: [{
                        title: { en: 'Natural Communication', vi: 'Giao tiếp tự nhiên' },
                        explanation: {
                            en: ['Focus on natural expression through play and interaction.', 'No formal grammar rules - emphasize communication through gestures, sounds, and simple words.'],
                            vi: ['Tập trung vào biểu đạt tự nhiên qua trò chơi và tương tác.', 'Không có quy tắc ngữ pháp chính thức - nhấn mạnh giao tiếp qua cử chỉ, âm thanh và từ đơn giản.']
                        }
                    }],
                    activities: [{
                        type: 'Movement Games',
                        description: {
                            en: ['Counting jumps and hops with animal movements.', 'Animal charades and imitation games.', 'Number songs with body movements.', 'Counting toys during playtime.'],
                            vi: ['Đếm nhảy và nhún với cử động động vật.', 'Trò chơi bắt chước và diễn tả động vật.', 'Bài hát số với cử động cơ thể.', 'Đếm đồ chơi trong giờ chơi.']
                        }
                    },
                    {
                        type: 'Story Time',
                        description: {
                            en: ['Animal finger puppets and storytelling.', 'Parent-child animal sound games.', 'Picture book sharing about familiar animals.', 'Animal movement dances and songs.'],
                            vi: ['Con rối ngón tay động vật và kể chuyện.', 'Trò chơi âm thanh động vật với phụ huynh.', 'Chia sẻ sách hình về động vật quen thuộc.', 'Điệu nhảy và bài hát cử động động vật.']
                        }
                    }]
                },
                {
                    id: 10103,
                    title: { en: 'Emotions & Daily Activities', vi: 'Cảm xúc & Hoạt động hàng ngày' },
                    aims: {
                        en: ['Express feelings through play and art.', 'Connect daily routines with familiar activities.', 'Build emotional awareness through interactive experiences.'],
                        vi: ['Biểu đạt cảm xúc qua trò chơi và nghệ thuật.', 'Kết nối thói quen hàng ngày với hoạt động quen thuộc.', 'Xây dựng nhận thức cảm xúc qua trải nghiệm tương tác.']
                    },
                    vocabulary: [
                        { term: 'happy', pronunciation: '/ˈhæpi/', vietnamese: 'vui vẻ', imageUrl: `${GD_BASE}happy.png` },
                        { term: 'sleepy', pronunciation: '/ˈslipi/', vietnamese: 'buồn ngủ', imageUrl: `${GD_BASE}sleepy.png` },
                        { term: 'hungry', pronunciation: '/ˈhʌŋɡri/', vietnamese: 'đói bụng', imageUrl: `${GD_BASE}hungry.png` },
                        { term: 'eat', pronunciation: '/it/', vietnamese: 'ăn', imageUrl: `${GD_BASE}eat.png` },
                        { term: 'drink', pronunciation: '/drɪŋk/', vietnamese: 'uống', imageUrl: `${GD_BASE}drink.png` },
                        { term: 'play', pronunciation: '/pleɪ/', vietnamese: 'chơi', imageUrl: `${GD_BASE}play.png` },
                    ],
                    grammar: [{
                        title: { en: 'Natural Communication', vi: 'Giao tiếp tự nhiên' },
                        explanation: {
                            en: ['Focus on natural expression through play and interaction.', 'No formal grammar rules - emphasize communication through gestures, sounds, and simple words.'],
                            vi: ['Tập trung vào biểu đạt tự nhiên qua trò chơi và tương tác.', 'Không có quy tắc ngữ pháp chính thức - nhấn mạnh giao tiếp qua cử chỉ, âm thanh và từ đơn giản.']
                        }
                    }],
                    activities: [{
                        type: 'Emotional Expression',
                        description: {
                            en: ['Emotion faces drawing and role-play.', 'Feeling check-in circle time.', 'Emotion charades with family members.', 'Comfort object sharing and stories.'],
                            vi: ['Vẽ khuôn mặt cảm xúc và đóng vai.', 'Thời gian vòng tròn kiểm tra cảm xúc.', 'Trò diễn tả cảm xúc với thành viên gia đình.', 'Chia sẻ đồ vật an ủi và câu chuyện.']
                        }
                    },
                    {
                        type: 'Daily Routine Play',
                        description: {
                            en: ['Doll house daily routine role-play.', 'Personal care routine songs and movements.', 'Meal time preparation games.', 'Bedtime routine stories and puppets.'],
                            vi: ['Đóng vai thói quen hàng ngày với nhà búp bê.', 'Bài hát và cử động thói quen chăm sóc cá nhân.', 'Trò chơi chuẩn bị bữa ăn.', 'Câu chuyện và con rối thói quen đi ngủ.']
                        }
                    },
                    {
                        type: 'Parent Partnership',
                        description: {
                            en: ['Home emotion journal with photos.', 'Daily routine charts with child participation.', 'Family feeling sharing during dinner.', 'Comfort item rituals for transitions.'],
                            vi: ['Nhật ký cảm xúc tại nhà với ảnh.', 'Biểu đồ thói quen hàng ngày với sự tham gia của con.', 'Chia sẻ cảm xúc gia đình trong bữa tối.', 'Nghi thức đồ vật an ủi cho các chuyển tiếp.']
                        }
                    }]
                }
            ]
        }
    ]
};

export default goaldigger1Data;

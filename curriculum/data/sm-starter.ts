import { CurriculumLevel } from '../types';

export const smStarterData: CurriculumLevel = {
    level: 0,
    title: { en: 'Super Minds Starter', vi: 'Super Minds Starter' },
    subtitle: { en: 'Primary - Grade 1', vi: 'Tiểu học - Lớp 1' },
    ebookPdfUrl: 'https://drive.google.com/file/d/1starter-ebook-link/view?usp=sharing',
    units: [
        {
            id: 1101,
            title: { en: 'Unit 1: Hello', vi: 'Bài 1: Xin chào' },
            lessons: [
                {
                    id: 110101,
                    title: { en: 'Greetings and Introductions', vi: 'Chào hỏi và giới thiệu' },
                    aims: {
                        en: ['Use simple greetings like Hello and Goodbye.', 'Introduce yourself: My name is...'],
                        vi: ['Sử dụng lời chào đơn giản như Xin chào và Tạm biệt.', 'Giới thiệu bản thân: Tên tôi là...']
                    },
                    vocabulary: [
                        { term: 'hello', pronunciation: '/həˈloʊ/', vietnamese: 'xin chào' },
                        { term: 'goodbye', pronunciation: '/ɡʊdˈbaɪ/', vietnamese: 'tạm biệt' },
                        { term: 'name', pronunciation: '/neɪm/', vietnamese: 'tên' },
                        { term: 'friend', pronunciation: '/frɛnd/', vietnamese: 'bạn bè' }
                    ],
                    grammar: [{ title: { en: 'Subject Pronouns', vi: 'Đại từ nhân xưng' }, explanation: { en: ['I, you, he, she, it, we, they'], vi: ['I, you, he, she, it, we, they'] } }],
                    activities: [{ type: 'Practice', description: { en: ['Say hello to a classmate.'], vi: ['Chào một bạn trong lớp.'] } }]
                }
            ]
        }
    ]
};

export default smStarterData;

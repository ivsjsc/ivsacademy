import { CurriculumLevel } from '../types';

export const sw7Data: CurriculumLevel = {
    level: 7,
    title: { en: 'i-Learn Smart World 7', vi: 'i-Learn Smart World 7' },
    subtitle: { en: 'Secondary School - Grade 7', vi: 'Trung học cơ sở - Lớp 7' },
    ebookPdfUrl: 'https://drive.google.com/file/d/1H9LEAJS2xZALd7CUryibtkjKtOXIpEBM/view?usp=drive_link',
    units: [
        {
            id: 701,
            title: { en: 'Unit 1: Free Time', vi: 'Bài 1: Thời gian rảnh' },
            lessons: [
                {
                    id: 70101,
                    title: { en: 'Lesson 1: Hobbies', vi: 'Bài học 1: Sở thích' },
                    aims: {
                        en: ['Ask and answer about personal hobbies.', 'Use the Present Simple to talk about habits, general truths, and repeated actions.'],
                        vi: ['Hỏi và trả lời về các sở thích cá nhân.', 'Sử dụng thì Hiện tại đơn để diễn tả thói quen, sự thật chung và các sự việc lặp đi lặp lại.'],
                    },
                    vocabulary: [
                        { term: 'collect soccer stickers', pronunciation: '/kəˈlɛkt ˈsɑkər ˈstɪkərz/', vietnamese: 'sưu tập hình dán bóng đá' },
                        { term: 'build models', pronunciation: '/bɪld ˈmɑdəlz/', vietnamese: 'lắp ráp mô hình' },
                        { term: 'bake cakes', pronunciation: '/beɪk keɪks/', vietnamese: 'nướng bánh' },
                        { term: 'make vlogs', pronunciation: '/meɪk vlɔgz/', vietnamese: 'làm video nhật ký' },
                        { term: 'read comics', pronunciation: '/rid ˈkɑmɪks/', vietnamese: 'đọc truyện tranh' },
                        { term: 'play online games', pronunciation: '/pleɪ ˈɔnˌlaɪn geɪmz/', vietnamese: 'chơi game trực tuyến' },
                    ],
                    grammar: [
                        { title: { en: 'Present Simple for habits/routines & General Truths', vi: 'Hiện tại đơn cho thói quen/lịch trình & Sự thật chung' }, explanation: { en: ['Usage: Describes habits, repeated actions, or general truths.', 'Formula: S + V(s/es) / S + do/does + not + V.', 'Note: Pay attention to the position of adverbs of frequency and the pronunciation of -s/-es endings.'], vi: ['Công dụng: Dùng để diễn tả thói quen, hành động lặp đi lặp lại hoặc sự thật hiển nhiên.', 'Công thức: S + V(s/es) / S + do/does + not + V.', 'Lưu ý: Chú ý vị trí của trạng từ tần suất và cách phát âm đuôi -s/-es.'] } },
                    ],
                    activities: [
                        { type: 'Speaking', description: { en: ['Group survey: Ask each other about hobbies, frequency, and specific times, then report the results.'], vi: ['Khảo sát nhóm: Hỏi nhau về sở thích, tần suất và thời gian cụ thể, sau đó báo cáo kết quả.'] } },
                        { type: 'Writing', description: { en: ['Write 5 sentences about the habits of family members using at least 3 adverbs of frequency.'], vi: ['Viết 5 câu về thói quen của thành viên trong gia đình, sử dụng ít nhất 3 trạng từ tần suất.'] } }
                    ],
                },
                {
                    id: 70102,
                    title: { en: 'Lesson 2: Making Plans', vi: 'Bài học 2: Lên kế hoạch' },
                    aims: {
                        en: ['Make plans and politely invite friends out.', 'Use the Present Continuous for future plans.', 'Use prepositions of place to identify locations.'],
                        vi: ['Lên kế hoạch và mời bạn bè đi chơi một cách lịch sự.', 'Sử dụng thì Hiện tại tiếp diễn để diễn tả kế hoạch tương lai gần.', 'Sử dụng thành thạo giới từ chỉ nơi chốn để xác định vị trí.'],
                    },
                    vocabulary: [
                        { term: 'sports center', pronunciation: '/spɔrts ˈsɛntər/', vietnamese: 'trung tâm thể thao' },
                        { term: 'bowling alley', pronunciation: '/ˈboʊlɪŋ ˈæli/', vietnamese: 'sân bowling' },
                        { term: 'ice rink', pronunciation: '/aɪs rɪŋk/', vietnamese: 'sân trượt băng' },
                        { term: 'water park', pronunciation: '/ˈwɔtər pɑrk/', vietnamese: 'công viên nước' },
                        { term: 'market', pronunciation: '/ˈmɑrkɪt/', vietnamese: 'chợ' },
                        { term: 'fair', pronunciation: '/fɛr/', vietnamese: 'hội chợ/vui chơi' },
                    ],
                    grammar: [
                        { title: { en: 'Present Continuous for future plans', vi: 'Hiện tại tiếp diễn cho kế hoạch tương lai' }, explanation: { en: ['Usage: Describes arranged future plans.', 'Formula: S + be + V-ing + (Future time expression).', 'Example: I\'m going to the bowling alley tonight.'], vi: ['Công dụng: Diễn tả các kế hoạch trong tương lai đã được sắp xếp.', 'Công thức: S + be + V-ing + (Trạng từ chỉ thời gian tương lai).', 'Ví dụ: I\'m going to the bowling alley tonight.'] } },
                        { title: { en: 'Prepositions of place', vi: 'Giới từ chỉ nơi chốn' }, explanation: { en: ['Usage: To specify the location of someone or something.', 'Examples: in front of, behind, next to, opposite, between, near.'], vi: ['Công dụng: Dùng để xác định vị trí của ai đó hoặc cái gì đó.', 'Ví dụ: in front of, behind, next to, opposite, between, near.'] } },
                    ],
                    activities: [
                        { type: 'Listening', description: { en: ['Listen to a conversation about plans and answer multiple-choice questions.'], vi: ['Nghe cuộc hội thoại về kế hoạch và trả lời câu hỏi trắc nghiệm.'] } },
                        { type: 'Role-play', description: { en: ['Student A invites B to go out. B accepts/declines and suggests a time/place to meet.'], vi: ['Học sinh A mời B đi chơi. B chấp nhận/từ chối và đề xuất thời gian/địa điểm gặp mặt.'] } }
                    ],
                },
                {
                    id: 70103,
                    title: { en: 'Lesson 3: Extreme Sports & Writing', vi: 'Bài học 3: Thể thao mạo hiểm & Viết' },
                    aims: {
                        en: ['Discuss extreme sports.', 'Practice writing an invitation email with a logical structure and friendly tone.'],
                        vi: ['Thảo luận về các môn thể thao mạo hiểm.', 'Luyện tập kỹ năng Viết email mời (Invitation Email) với cấu trúc logic và văn phong thân mật.'],
                    },
                    vocabulary: [
                        { term: 'skateboarding', pronunciation: '/ˈskeɪtˌbɔrdɪŋ/', vietnamese: 'trượt ván' },
                        { term: 'surfing', pronunciation: '/ˈsɜrfɪŋ/', vietnamese: 'lướt sóng' },
                        { term: 'rock climbing', pronunciation: '/rɑk ˈklaɪmɪŋ/', vietnamese: 'leo núi' },
                        { term: 'zorbing', pronunciation: '/ˈzɔrbɪŋ/', vietnamese: 'lăn bóng hơi' },
                    ],
                    grammar: [
                         { title: { en: 'Review & Polite Invitation Phrases', vi: 'Ôn tập & các cụm từ mời lịch sự' }, explanation: { en: ['Review previously learned tenses (Present Simple, Present Continuous).', 'Focus on using Wh-questions for details and polite invitation phrases like "How about...?", "Would you like to...?".'], vi: ['Ôn tập các thì đã học (Hiện tại đơn, Hiện tại tiếp diễn).', 'Tập trung vào cách sử dụng câu hỏi Wh- để hỏi thông tin chi tiết và các cụm từ mời lịch sự như "How about...?", "Would you like to...?".'] } },
                    ],
                    activities: [
                        { type: 'Discussion', description: { en: ['Discuss extreme sports: Would you try it? Why/Why not? What are the risks?'], vi: ['Thảo luận về thể thao mạo hiểm: Bạn có muốn thử không? Tại sao/Tại sao không? Rủi ro là gì?'] } },
                        { type: 'Writing', description: { en: ['Write an email (60-80 words) inviting a friend to an activity. Use peer review to check for structure and grammar.'], vi: ['Viết một email (60-80 từ) mời bạn bè tham gia một hoạt động. Sử dụng đánh giá chéo để kiểm tra cấu trúc và ngữ pháp.'] } }
                    ],
                }
            ]
        },
        {
            id: 702,
            title: { en: 'Unit 2: Health', vi: 'Bài 2: Sức khỏe' },
            lessons: [
                 {
                    id: 70201,
                    title: { en: 'Lesson 1: Healthy Lifestyle', vi: 'Bài học 1: Lối sống lành mạnh' },
                    aims: {
                        en: ['Discuss healthy/unhealthy habits.', 'Use indefinite quantifiers and questions with How much/many...?'],
                        vi: ['Thảo luận về những thói quen lành mạnh/không lành mạnh.', 'Sử dụng thành thạo lượng từ bất định (quantifiers) và câu hỏi How much/many...?']
                    },
                    vocabulary: [
                        { term: 'eat fruit and vegetables', pronunciation: '/it frut ænd ˈvɛdʒtəbəlz/', vietnamese: 'ăn trái cây và rau' },
                        { term: 'eat fast food', pronunciation: '/it fæst fud/', vietnamese: 'ăn đồ ăn nhanh' },
                        { term: 'drink soda', pronunciation: '/drɪŋk ˈsoʊdə/', vietnamese: 'uống soda' },
                        { term: 'get (some) sleep', pronunciation: '/gɛt (sʌm) slip/', vietnamese: 'ngủ một chút' },
                        { term: 'healthy', pronunciation: '/ˈhɛlθi/', vietnamese: 'lành mạnh' },
                        { term: 'unhealthy', pronunciation: '/ʌnˈhɛlθi/', vietnamese: 'không lành mạnh' },
                    ],
                    grammar: [{
                        title: { en: 'Indefinite quantifiers & How much/many?', vi: 'Lượng từ bất định & How much/many?' },
                        explanation: { en: ['Use (not) any, a little/not much (U-nouns), some, a lot of/lots of (C/U-nouns).', 'Ask questions with How much...? (U-nouns) and How many...? (C-nouns).'], vi: ['Sử dụng (not) any, a little/not much (danh từ không đếm được), some, a lot of/lots of (danh từ đếm được/không đếm được).', 'Đặt câu hỏi với How much...? (danh từ không đếm được) và How many...? (danh từ đếm được).'] }
                    }],
                    activities: [
                        { type: 'Discussion', description: { en: ['Categorize activities as "Healthy" or "Unhealthy" and explain why.'], vi: ['Phân loại các hoạt động là "Lành mạnh" hay "Không lành mạnh" và giải thích tại sao.'] } },
                        { type: 'Speaking', description: { en: ['Conduct a survey asking "How much/many...?" questions to find the person with the healthiest lifestyle.'], vi: ['Thực hiện khảo sát với câu hỏi "How much/many...?" để tìm ra người có lối sống lành mạnh nhất.'] } }
                    ]
                },
                {
                    id: 70202,
                    title: { en: 'Lesson 2: Health Problems and Advice', vi: 'Bài học 2: Vấn đề sức khỏe và Lời khuyên' },
                    aims: {
                        en: ['Describe common health problems and prevention methods.', 'Use modal verbs (should/shouldn\'t) to give advice.'],
                        vi: ['Mô tả các vấn đề sức khỏe thông thường và cách phòng tránh.', 'Sử dụng động từ khuyết thiếu (should/shouldn\'t) để đưa ra lời khuyên.']
                    },
                    vocabulary: [
                        { term: 'feel weak', pronunciation: '/fil wik/', vietnamese: 'cảm thấy yếu' },
                        { term: 'have a sore throat', pronunciation: '/hæv ə sɔr θroʊt/', vietnamese: 'bị đau họng' },
                        { term: 'have a fever', pronunciation: '/hæv ə ˈfivər/', vietnamese: 'bị sốt' },
                        { term: 'have a cough', pronunciation: '/hæv ə kɔf/', vietnamese: 'bị ho' },
                        { term: 'have a headache', pronunciation: '/hæv ə ˈhɛdˌeɪk/', vietnamese: 'bị đau đầu' },
                        { term: 'get some rest', pronunciation: '/gɛt sʌm rɛst/', vietnamese: 'nghỉ ngơi' },
                        { term: 'take vitamins', pronunciation: '/teɪk ˈvaɪtəmɪnz/', vietnamese: 'uống vitamin' },
                        { term: 'take medicine', pronunciation: '/teɪk ˈmɛdəsən/', vietnamese: 'uống thuốc' },
                        { term: 'stay up late', pronunciation: '/steɪ ʌp leɪt/', vietnamese: 'thức khuya' },
                        { term: 'keep warm', pronunciation: '/kip wɔrm/', vietnamese: 'giữ ấm' },
                    ],
                    grammar: [{
                        title: { en: 'Modals for advice: should / shouldn\'t', vi: 'Động từ khuyết thiếu cho lời khuyên: should / shouldn\'t' },
                        explanation: { en: ['Usage: To give gentle advice.', 'Formula: S + should/shouldn\'t + V (base form).', 'Example: You should take some medicine. You shouldn\'t eat so much candy.'], vi: ['Công dụng: Dùng để đưa ra lời khuyên nhẹ nhàng.', 'Công thức: S + should/shouldn\'t + V (nguyên mẫu).', 'Ví dụ: You should take some medicine. / You shouldn\'t eat so much candy.'] }
                    }],
                    activities: [
                        { type: 'Role-play', description: { en: ['"At the Doctor\'s": Student A (doctor) asks about symptoms. Student B (patient) describes their health problem. The doctor gives 3 pieces of advice using should/shouldn\'t.'], vi: ['"Tại phòng khám": Học sinh A (Bác sĩ) hỏi triệu chứng. Học sinh B (Bệnh nhân) mô tả vấn đề sức khỏe. Bác sĩ đưa ra 3 lời khuyên hợp lý sử dụng should/shouldn\'t.'] } }
                    ]
                },
                {
                    id: 70203,
                    title: { en: 'Lesson 3: Healthy Food at School & Writing', vi: 'Bài học 3: Thực phẩm lành mạnh ở trường & Viết' },
                    aims: {
                        en: ['Discuss healthy food at school and make suggestions.', 'Practice writing a formal request letter.'],
                        vi: ['Thảo luận về thực phẩm lành mạnh ở trường và đưa ra đề xuất.', 'Luyện tập kỹ năng Viết thư yêu cầu (Request Letter) trang trọng.']
                    },
                    vocabulary: [
                        { term: 'cafeteria', pronunciation: '/ˌkæfəˈtɪriə/', vietnamese: 'căng-tin' },
                        { term: 'principal', pronunciation: '/ˈprɪnsəpəl/', vietnamese: 'hiệu trưởng' },
                        { term: 'provide', pronunciation: '/prəˈvaɪd/', vietnamese: 'cung cấp' },
                        { term: 'brain food', pronunciation: '/breɪn fud/', vietnamese: 'thực phẩm tốt cho trí não' },
                        { term: 'nutritious', pronunciation: '/nuˈtrɪʃəs/', vietnamese: 'bổ dưỡng' },
                    ],
                    grammar: [
                         { title: { en: 'Review & Formal Language', vi: 'Ôn tập & Ngôn ngữ trang trọng' }, explanation: { en: ['Review Should/Shouldn\'t, Present Simple.', 'Focus on formal language such as "Dear Mr./Ms. [Name]", "Sincerely", and polite phrases like "I am writing to request...", "I suggest that...".'], vi: ['Ôn tập Should/Shouldn\'t, Hiện tại đơn.', 'Tập trung vào văn phong trang trọng như sử dụng "Dear Mr./Ms. [Name]", "Sincerely", và các cụm từ lịch sự (I am writing to request..., I suggest that...).'] } }
                    ],
                    activities: [
                        { type: 'Reading & Analysis', description: { en: ['Read a formal request letter to the principal. Analyze the structure: Address, Greeting, Problem Introduction, Suggestions, Closing.'], vi: ['Đọc thư yêu cầu trang trọng gửi hiệu trưởng. Phân tích cấu trúc: Địa chỉ, Lời chào, Giới thiệu vấn đề, Đề xuất/Yêu cầu, Kết thư.'] } },
                        { type: 'Writing', description: { en: ['Write a letter (60-80 words) to the principal to suggest improvements for the cafeteria menu.'], vi: ['Viết một lá thư (60-80 từ) gửi hiệu trưởng để đề xuất cải thiện thực đơn căng-tin.'] } }
                    ]
                }
            ]
        },
        {
            id: 703,
            title: { en: 'Unit 3: Music and Arts', vi: 'Bài 3: Âm nhạc và Nghệ thuật' },
            lessons: [
                {
                    id: 70301,
                    title: {en: 'Lesson 1: Music Genres', vi: 'Bài học 1: Các thể loại nhạc'},
                    aims: {
                        en: ['Identify and talk about favorite/disliked music genres.', 'Use adverbs of intensity to emphasize feelings and opinions.'],
                        vi: ['Nhận biết và nói về các thể loại âm nhạc yêu thích/không thích.', 'Sử dụng thành thạo trạng từ chỉ mức độ để nhấn mạnh cảm xúc, quan điểm.']
                    },
                    vocabulary: [
                        { term: 'Pop', pronunciation: '/pɑp/', vietnamese: 'Nhạc Pop' },
                        { term: 'Rock', pronunciation: '/rɑk/', vietnamese: 'Nhạc Rock' },
                        { term: 'Classical', pronunciation: '/ˈklæsɪkəl/', vietnamese: 'Nhạc cổ điển' },
                        { term: 'Jazz', pronunciation: '/dʒæz/', vietnamese: 'Nhạc Jazz' },
                        { term: 'Hip-hop', pronunciation: '/ˈhɪpˌhɑp/', vietnamese: 'Nhạc Hip-hop' },
                        { term: 'Folk music', pronunciation: '/foʊk ˈmjuzɪk/', vietnamese: 'Nhạc dân gian' },
                        { term: 'boring', pronunciation: '/ˈbɔrɪŋ/', vietnamese: 'nhàm chán' },
                        { term: 'exciting', pronunciation: '/ɪkˈsaɪtɪŋ/', vietnamese: 'thú vị' },
                        { term: 'relaxing', pronunciation: '/rɪˈlæksɪŋ/', vietnamese: 'thư giãn' },
                    ],
                    grammar: [{
                        title: {en: 'Adverbs of Intensity', vi: 'Trạng từ chỉ mức độ'},
                        explanation: {en: ['Usage: Placed before adjectives/adverbs to strengthen their meaning.', 'Examples: really, very, quite, a little.', 'Note: "a little" is usually used with negative adjectives (e.g., a little boring).'], vi: ['Công dụng: Đứng trước tính từ/trạng từ để nhấn mạnh ý nghĩa.', 'Ví dụ: really, very, quite, a little.', 'Lưu ý: "a little" thường chỉ dùng với tính từ tiêu cực (ví dụ: a little boring).']}
                    }],
                    activities: [
                        { type: 'Listening', description: { en: ['Listen to a conversation about music preferences and fill in a table.'], vi: ['Nghe đoạn hội thoại về sở thích âm nhạc và điền thông tin vào bảng.'] } },
                        { type: 'Speaking', description: { en: ['Group discussion: What kind of music do you like? Why? Use adverbs of intensity to defend your opinion.'], vi: ['Thảo luận nhóm: Bạn thích thể loại nhạc nào? Tại sao? Sử dụng trạng từ chỉ mức độ để bảo vệ quan điểm.'] } }
                    ]
                },
                {
                    id: 70302,
                    title: {en: 'Lesson 2: Art Forms', vi: 'Bài học 2: Các loại hình nghệ thuật'},
                    aims: {
                        en: ['Talk about art forms and feelings.', 'Use comparatives/superlatives with long adjectives.'],
                        vi: ['Nói về các loại hình nghệ thuật và cảm xúc.', 'Sử dụng so sánh hơn/nhất với tính từ dài.']
                    },
                    vocabulary: [
                        { term: 'painting', pronunciation: '/ˈpeɪntɪŋ/', vietnamese: 'hội họa' },
                        { term: 'sculpture', pronunciation: '/ˈskʌlptʃər/', vietnamese: 'điêu khắc' },
                        { term: 'pottery', pronunciation: '/ˈpɑtəri/', vietnamese: 'gốm sứ' },
                        { term: 'street art', pronunciation: '/strit ɑrt/', vietnamese: 'nghệ thuật đường phố' },
                        { term: 'creative', pronunciation: '/kriˈeɪtɪv/', vietnamese: 'sáng tạo' },
                        { term: 'inspirational', pronunciation: '/ˌɪnspəˈreɪʃənəl/', vietnamese: 'truyền cảm hứng' },
                    ],
                    grammar: [
                        {title: {en: 'Comparatives and Superlatives (Long Adjectives)', vi: 'So sánh hơn và nhất (Tính từ dài)'}, explanation: {en: ['Formula: more/most + Adjective.', 'Example: Painting is more creative than pottery. Street art is the most impressive form of art.'], vi: ['Công thức: more/most + Adjective.', 'Ví dụ: Painting is more creative than pottery. Street art is the most impressive form of art.']}},
                    ],
                    activities: [
                        { type: 'Speaking', description: { en: ['"Art Debate": Argue which art form is the most interesting/difficult/beautiful, using comparatives and superlatives.'], vi: ['"Tranh luận nghệ thuật": Tranh luận về loại hình nghệ thuật thú vị/khó/đẹp nhất, sử dụng so sánh hơn/nhất.'] } }
                    ]
                },
                {
                    id: 70303,
                    title: {en: 'Lesson 3: A Concert Review & Writing', vi: 'Bài học 3: Đánh giá buổi hòa nhạc & Viết'},
                    aims: {
                        en: ['Review a cultural/art event you attended.', 'Practice writing a review with a clear structure and descriptive language.'],
                        vi: ['Đánh giá một sự kiện văn hóa/nghệ thuật đã tham gia.', 'Luyện tập kỹ năng Viết đánh giá (Review) với cấu trúc rõ ràng và ngôn ngữ mô tả.']
                    },
                    vocabulary: [
                        { term: 'audience', pronunciation: '/ˈɔdiəns/', vietnamese: 'khán giả' },
                        { term: 'performance', pronunciation: '/pərˈfɔrməns/', vietnamese: 'màn trình diễn' },
                        { term: 'atmosphere', pronunciation: '/ˈætməˌsfɪr/', vietnamese: 'bầu không khí' },
                        { term: 'entertaining', pronunciation: '/ˌɛntərˈteɪnɪŋ/', vietnamese: 'thú vị' },
                        { term: 'disappointed', pronunciation: '/ˌdɪsəˈpɔɪntɪd/', vietnamese: 'thất vọng' },
                        { term: 'spectacular', pronunciation: '/spɛkˈtækjələr/', vietnamese: 'ngoạn mục' },
                    ],
                    grammar: [
                        {title: {en: 'Review Tense Usage', vi: 'Sử dụng thì trong bài đánh giá'}, explanation: {en: ['Use Past Simple to recount the experience.', 'Use Present Simple to give general opinions/evaluations.'], vi: ['Sử dụng Quá khứ đơn để kể lại trải nghiệm.', 'Sử dụng Hiện tại đơn để đưa ra đánh giá/ý kiến chung.']}}
                    ],
                    activities: [
                        { type: 'Reading & Analysis', description: { en: ['Read a concert review. Analyze the structure: Introduction, Body (description and evaluation), Conclusion.'], vi: ['Đọc bài đánh giá về một buổi hòa nhạc. Phân tích cấu trúc: Giới thiệu, Thân bài (mô tả và đánh giá), Kết luận.'] } },
                        { type: 'Writing', description: { en: ['Write a review (70-90 words) of a concert or exhibition you have seen.'], vi: ['Viết một bài đánh giá (70-90 từ) về một buổi hòa nhạc hoặc triển lãm đã xem.'] } }
                    ]
                }
            ]
        },
        {
            id: 704,
            title: { en: 'Unit 4: Community Services', vi: 'Bài 4: Dịch vụ Cộng đồng' },
            lessons: [
                {
                    id: 70401,
                    title: {en: 'Lesson 1: Volunteering', vi: 'Bài học 1: Tình nguyện'},
                    aims: {
                        en: ['Talk about volunteer activities.', 'Use gerunds and to-infinitives/bare infinitives as objects.'],
                        vi: ['Nói về các hoạt động tình nguyện.', 'Sử dụng danh động từ (gerunds) và động từ nguyên mẫu có/không to làm tân ngữ.']
                    },
                    vocabulary: [
                        { term: 'volunteer', pronunciation: '/ˌvɑlənˈtɪr/', vietnamese: 'tình nguyện' },
                        { term: 'raise money', pronunciation: '/reɪz ˈmʌni/', vietnamese: 'quyên góp tiền' },
                        { term: 'clean up the park', pronunciation: '/klin ʌp ðə pɑrk/', vietnamese: 'dọn dẹp công viên' },
                        { term: 'help the elderly', pronunciation: '/hɛlp ði ˈɛldərli/', vietnamese: 'giúp đỡ người già' },
                        { term: 'donate books', pronunciation: '/ˈdoʊneɪt bʊks/', vietnamese: 'quyên góp sách' },
                        { term: 'plant trees', pronunciation: '/plænt triz/', vietnamese: 'trồng cây' },
                    ],
                    grammar: [{
                        title: {en: 'Gerunds and Infinitives', vi: 'Danh động từ và Động từ nguyên mẫu'},
                        explanation: {en: ['Some verbs are followed by a Gerund (e.g., enjoy playing).', 'Some verbs are followed by a To-Infinitive (e.g., want to go).'], vi: ['Một số động từ được theo sau bởi Danh động từ (ví dụ: enjoy playing).', 'Một số động từ được theo sau bởi Động từ nguyên mẫu có to (ví dụ: want to go).']}
                    }],
                    activities: [
                        { type: 'Reading', description: { en: ['Read an article about a volunteer club. Find and classify the V-ing and To-V forms.'], vi: ['Đọc bài viết về một câu lạc bộ tình nguyện. Tìm và phân loại các dạng V-ing và To-V.'] } },
                        { type: 'Speaking', description: { en: ['Discuss "Volunteer Ideas". Propose volunteer activities for the school/community and give reasons.'], vi: ['Thảo luận "Ý tưởng tình nguyện". Đưa ra ý tưởng hoạt động tình nguyện tại trường/địa phương và lý do.'] } }
                    ]
                },
                {
                    id: 70402,
                    title: {en: 'Lesson 2: Helping the Community', vi: 'Bài học 2: Giúp đỡ cộng đồng'},
                    aims: {
                        en: ['Discuss actions to help the community.', 'Use indefinite pronouns correctly in different sentence types.'],
                        vi: ['Thảo luận về những hành động giúp đỡ cộng đồng.', 'Sử dụng đại từ bất định một cách chính xác.']
                    },
                    vocabulary: [
                        { term: 'homeless people', pronunciation: '/ˈhoʊmləs ˈpipəl/', vietnamese: 'người vô gia cư' },
                        { term: 'raise awareness', pronunciation: '/reɪz əˈwɛrnəs/', vietnamese: 'nâng cao nhận thức' },
                        { term: 'take part in', pronunciation: '/teɪk pɑrt ɪn/', vietnamese: 'tham gia vào' },
                        { term: 'charity event', pronunciation: '/ˈtʃærəti ɪˈvɛnt/', vietnamese: 'sự kiện từ thiện' },
                        { term: 'make a difference', pronunciation: '/meɪk ə ˈdɪfərəns/', vietnamese: 'tạo ra sự khác biệt' },
                    ],
                    grammar: [{
                        title: {en: 'Indefinite Pronouns', vi: 'Đại từ bất định'},
                        explanation: {en: ['Examples: something, anything, nothing, everyone, no one.', 'They always take a singular verb.', 'Distinguish between some- compounds (affirmative) and any- compounds (negative/interrogative).'], vi: ['Ví dụ: something, anything, nothing, everyone, no one.', 'Luôn chia động từ số ít.', 'Phân biệt cách dùng some- (khẳng định) và any- (phủ định/nghi vấn).']}
                    }],
                    activities: [
                        { type: 'Listening', description: { en: ['Listen to a conversation about a charity event and note down the indefinite pronouns used.'], vi: ['Nghe đoạn hội thoại về một sự kiện từ thiện và ghi chú các đại từ bất định được sử dụng.'] } },
                        { type: 'Group Project', description: { en: ['"Charity Campaign": Plan a charity campaign, deciding who to help, what to do, and where.'], vi: ['"Chiến dịch từ thiện": Lập kế hoạch cho một chiến dịch từ thiện, quyết định ai, cái gì, ở đâu.'] } }
                    ]
                },
                {
                    id: 70403,
                    title: {en: 'Lesson 3: Community Poster & Writing', vi: 'Bài học 3: Poster cộng đồng & Viết'},
                    aims: {
                        en: ['Describe a charity campaign and call for participation.', 'Practice writing a persuasive public appeal poster.'],
                        vi: ['Mô tả một chiến dịch từ thiện và kêu gọi tham gia.', 'Luyện tập kỹ năng Viết poster kêu gọi tập trung vào sự thuyết phục.']
                    },
                    vocabulary: [
                        { term: 'urgent', pronunciation: '/ˈɜrdʒənt/', vietnamese: 'khẩn cấp' },
                        { term: 'support', pronunciation: '/səˈpɔrt/', vietnamese: 'ủng hộ' },
                        { term: 'generous', pronunciation: '/ˈdʒɛnərəs/', vietnamese: 'hào phóng' },
                        { term: 'get involved', pronunciation: '/gɛt ɪnˈvɑlvd/', vietnamese: 'tham gia' },
                        { term: 'volunteers needed', pronunciation: '/ˌvɑlənˈtɪrz ˈnidəd/', vietnamese: 'cần tình nguyện viên' },
                    ],
                    grammar: [
                         {title: {en: 'Review & Imperative Sentences', vi: 'Ôn tập & Câu mệnh lệnh'}, explanation: {en: ['Review Gerunds/Infinitives, Indefinite Pronouns.', 'Focus on using imperative sentences to call for action (e.g., Join us!, Donate now!).'], vi: ['Ôn tập Gerunds/Infinitives, Đại từ bất định.', 'Tập trung vào câu mệnh lệnh để kêu gọi hành động (ví dụ: Join us!, Donate now!).']}}
                    ],
                    activities: [
                        { type: 'Analysis', description: { en: ['Analyze effective posters: What makes them work? (Visuals, Slogan, Emotion, Clear Call to Action).'], vi: ['Phân tích các poster hiệu quả: Điều gì làm chúng hiệu quả? (Hình ảnh, Khẩu hiệu, Cảm xúc, Kêu gọi hành động rõ ràng).'] } },
                        { type: 'Writing', description: { en: ['Design and write a poster (under 80 words) calling people to join an environmental cleanup activity.'], vi: ['Thiết kế và viết một poster (dưới 80 từ) kêu gọi mọi người tham gia hoạt động dọn dẹp môi trường.'] } }
                    ]
                }
            ]
        },
        {
            id: 705,
            title: { en: 'Unit 5: Food and Drinks', vi: 'Bài 5: Đồ ăn và Thức uống' },
            lessons: [
                {
                    id: 70501,
                    title: {en: 'Lesson 1: Food Types', vi: 'Bài học 1: Các loại thực phẩm'},
                    aims: {
                        en: ['Categorize and talk about food types.', 'Use comparatives/superlatives with short and irregular adjectives.'],
                        vi: ['Phân loại và nói về các loại thực phẩm.', 'Sử dụng so sánh hơn/nhất với tính từ ngắn và bất quy tắc.']
                    },
                    vocabulary: [
                        { term: 'protein', pronunciation: '/ˈproʊˌtin/', vietnamese: 'chất đạm' },
                        { term: 'fiber', pronunciation: '/ˈfaɪbər/', vietnamese: 'chất xơ' },
                        { term: 'fat', pronunciation: '/fæt/', vietnamese: 'chất béo' },
                        { term: 'sugar', pronunciation: '/ˈʃʊgər/', vietnamese: 'đường' },
                        { term: 'seafood', pronunciation: '/ˈsiˌfud/', vietnamese: 'hải sản' },
                        { term: 'dairy products', pronunciation: '/ˈdɛri ˈprɑdəkts/', vietnamese: 'sản phẩm từ sữa' },
                        { term: 'balanced diet', pronunciation: '/ˈbælənst ˈdaɪət/', vietnamese: 'chế độ ăn cân bằng' },
                    ],
                    grammar: [{
                        title: {en: 'Comparatives/Superlatives (Short & Irregular Adjectives)', vi: 'So sánh hơn/nhất (Tính từ ngắn & bất quy tắc)'},
                        explanation: {en: ['Review Adj-er/est forms.', 'Focus on irregular cases: good/better/best, bad/worse/worst, far/further/furthest.'], vi: ['Ôn tập dạng Adj-er/est.', 'Tập trung vào các trường hợp bất quy tắc: good/better/best, bad/worse/worst, far/further/furthest.']}
                    }],
                    activities: [
                        { type: 'Speaking', description: { en: ['"Healthy Food Debate": Discuss "Which food group is the most important for teenagers and why?".'], vi: ['"Tranh luận về thực phẩm lành mạnh": Thảo luận "Nhóm thực phẩm nào là quan trọng nhất đối với thanh thiếu niên và tại sao?".'] } }
                    ]
                },
                {
                    id: 70502,
                    title: {en: 'Lesson 2: Ordering Food', vi: 'Bài học 2: Đặt món ăn'},
                    aims: {
                        en: ['Practice ordering food and drinks at a restaurant politely.', 'Use "would like to" and "too/enough" to describe suitability.'],
                        vi: ['Thực hành đặt món ăn và đồ uống tại nhà hàng.', 'Sử dụng cấu trúc would like to và too/enough.']
                    },
                    vocabulary: [
                        { term: 'menu', pronunciation: '/ˈmɛnju/', vietnamese: 'thực đơn' },
                        { term: 'order', pronunciation: '/ˈɔrdər/', vietnamese: 'gọi món' },
                        { term: 'waiter/waitress', pronunciation: '/ˈweɪtər/ˈweɪtrəs/', vietnamese: 'bồi bàn' },
                        { term: 'bill/check', pronunciation: '/bɪl/tʃɛk/', vietnamese: 'hóa đơn' },
                        { term: 'dessert', pronunciation: '/dɪˈzɜrt/', vietnamese: 'món tráng miệng' },
                        { term: 'main course', pronunciation: '/meɪn kɔrs/', vietnamese: 'món chính' },
                        { term: 'spicy', pronunciation: '/ˈspaɪsi/', vietnamese: 'cay' },
                    ],
                    grammar: [
                        {title: {en: 'Expressing Needs/Wants & too/enough', vi: 'Bày tỏ nhu cầu/mong muốn & too/enough'}, explanation: {en: ['Use "I\'d like to V" for polite requests.', 'Structure: too + Adj/Adv (excessive) and Adj/Adv + enough (sufficient).', 'Example: The soup is too salty. The table is big enough.'], vi: ['Sử dụng "I\'d like to V" cho các yêu cầu lịch sự.', 'Cấu trúc: too + Adj/Adv (quá mức) và Adj/Adv + enough (đủ).', 'Ví dụ: The soup is too salty. The table is big enough.']}}
                    ],
                    activities: [
                        { type: 'Role-play', description: { en: ['"At the Restaurant": Student A (customer) orders food using "I\'d like to...". Student B (waiter) confirms the order.'], vi: ['"Tại nhà hàng": Học sinh A (Khách hàng) đặt món, dùng "I\'d like to...". Học sinh B (Phục vụ) xác nhận đơn hàng.'] } }
                    ]
                },
                {
                    id: 70503,
                    title: {en: 'Lesson 3: Food Blog Post & Writing', vi: 'Bài học 3: Bài đăng blog ẩm thực & Viết'},
                    aims: {
                        en: ['Describe a favorite dish or restaurant.', 'Practice writing an engaging blog post with a personal style.'],
                        vi: ['Mô tả một món ăn hoặc nhà hàng yêu thích.', 'Luyện tập kỹ năng Viết bài đăng blog với phong cách cá nhân, hấp dẫn.']
                    },
                    vocabulary: [
                        { term: 'local specialty', pronunciation: '/ˈloʊkəl ˈspɛʃəlti/', vietnamese: 'đặc sản địa phương' },
                        { term: 'delicious', pronunciation: '/dɪˈlɪʃəs/', vietnamese: 'ngon' },
                        { term: 'ingredients', pronunciation: '/ɪnˈgridiənts/', vietnamese: 'nguyên liệu' },
                        { term: 'recipe', pronunciation: '/ˈrɛsəpi/', vietnamese: 'công thức' },
                        { term: 'authentic', pronunciation: '/ɔˈθɛntɪk/', vietnamese: 'chuẩn vị' },
                        { term: 'must-try', pronunciation: '/mʌst-traɪ/', vietnamese: 'phải thử' },
                    ],
                    grammar: [
                        {title: {en: 'Review & Descriptive Language', vi: 'Ôn tập & Ngôn ngữ mô tả'}, explanation: {en: ['Review all concepts of comparison, quantifiers, too/enough.', 'Encourage the use of vivid descriptive adjectives and exclamatory sentences to engage readers.'], vi: ['Ôn tập tất cả kiến thức về so sánh, lượng từ, too/enough.', 'Khuyến khích sử dụng ngôn ngữ mô tả sinh động và các câu cảm thán để thu hút người đọc.']}}
                    ],
                    activities: [
                        { type: 'Reading & Analysis', description: { en: ['Read a blog post about Pho. Analyze the structure: Title/Photo, Introduction, Body (description and experience), Conclusion.'], vi: ['Đọc bài đăng blog về món Phở. Phân tích cấu trúc: Tiêu đề/Ảnh, Giới thiệu, Thân bài (mô tả và trải nghiệm), Kết luận.'] } },
                        { type: 'Writing', description: { en: ['Write a blog post (70-90 words) about your favorite food/drink/restaurant.'], vi: ['Viết một bài đăng blog (70-90 từ) về món ăn/đồ uống/nhà hàng yêu thích của bạn.'] } }
                    ]
                }
            ]
        },
        {
            id: 706,
            title: { en: 'Unit 6: Education', vi: 'Bài 6: Giáo dục' },
            lessons: [
                {
                    id: 70601,
                    title: {en: 'Lesson 1: School Obligations', vi: 'Bài học 1: Nghĩa vụ ở trường'},
                    aims: {
                        en: ['Decline invitations and express obligations.', 'Use have to/don\'t have to to talk about necessary or unnecessary obligations.'],
                        vi: ['Từ chối lời mời và diễn tả nghĩa vụ phải làm.', 'Sử dụng have to/don\'t have to để nói về nghĩa vụ bắt buộc hoặc không cần thiết.']
                    },
                    vocabulary: [
                        { term: 'essay', pronunciation: '/ˈɛseɪ/', vietnamese: 'bài luận' },
                        { term: 'project', pronunciation: '/ˈprɑdʒɛkt/', vietnamese: 'dự án' },
                        { term: 'homework', pronunciation: '/ˈhoʊmˌwɜrk/', vietnamese: 'bài tập về nhà' },
                        { term: 'book report', pronunciation: '/bʊk rɪˈpɔrt/', vietnamese: 'báo cáo sách' },
                        { term: 'test', pronunciation: '/tɛst/', vietnamese: 'bài kiểm tra' },
                        { term: 'presentation', pronunciation: '/ˌprizɛnˈteɪʃən/', vietnamese: 'bài thuyết trình' },
                    ],
                    grammar: [{
                        title: {en: 'Modals of Obligation: have to/don\'t have to', vi: 'Động từ khuyết thiếu chỉ sự bắt buộc: have to/don\'t have to'},
                        explanation: {en: ['Use have to/has to for obligations.', 'Use don\'t have to/doesn\'t have to for things that are not necessary.', 'Example: I have to finish my homework. She doesn\'t have to come early.'], vi: ['Sử dụng have to/has to cho các nghĩa vụ.', 'Sử dụng don\'t have to/doesn\'t have to cho những việc không cần thiết.', 'Ví dụ: I have to finish my homework. She doesn\'t have to come early.']}
                    }],
                    activities: [
                        { type: 'Role-play', description: { en: ['"Invitation & Refusal": Invite a friend out; the friend must decline because they are busy with homework (using "have to").'], vi: ['"Mời và từ chối": Mời bạn đi chơi, bạn kia từ chối vì bận làm bài tập (sử dụng have to).'] } }
                    ]
                },
                {
                    id: 70602,
                    title: {en: 'Lesson 2: Feelings about School', vi: 'Bài học 2: Cảm xúc về trường học'},
                    aims: {
                        en: ['Talk about feelings towards school and results.', 'Use intensifiers (so, really) and the conjunction "because" to give reasons.'],
                        vi: ['Nói về cảm xúc đối với việc học và kết quả.', 'Sử dụng các từ nhấn mạnh và liên từ because để đưa ra lý do.']
                    },
                    vocabulary: [
                        { term: 'upset', pronunciation: '/əpˈsɛt/', vietnamese: 'buồn bã' },
                        { term: 'fail', pronunciation: '/feɪl/', vietnamese: 'trượt' },
                        { term: 'pleased', pronunciation: '/plizd/', vietnamese: 'hài lòng' },
                        { term: 'disappointed', pronunciation: '/ˌdɪsəˈpɔɪntɪd/', vietnamese: 'thất vọng' },
                        { term: 'surprised', pronunciation: '/sərˈpraɪzd/', vietnamese: 'ngạc nhiên' },
                        { term: 'delighted', pronunciation: '/dɪˈlaɪtɪd/', vietnamese: 'vui mừng' },
                        { term: 'nervous', pronunciation: '/ˈnɜrvəs/', vietnamese: 'lo lắng' },
                    ],
                    grammar: [
                        {title: {en: 'Intensifiers (so/really) and Conjunction (because)', vi: 'Từ nhấn mạnh (so/really) và Liên từ (because)'}, explanation: {en: ['Use "so" and "really" to make adjectives stronger.', 'Use "because" to introduce a reason.', 'Example: I am so happy because I passed the test.'], vi: ['Sử dụng "so" và "really" để làm tính từ mạnh hơn.', 'Sử dụng "because" để đưa ra lý do.', 'Ví dụ: I am so happy because I passed the test.']}}
                    ],
                    activities: [
                        { type: 'Speaking', description: { en: ['"Exam Feelings": Discuss your feelings after a test, using intensifiers and explaining the reason with "because".'], vi: ['"Cảm xúc kỳ thi": Thảo luận về cảm xúc của bạn sau một bài kiểm tra, sử dụng từ nhấn mạnh và giải thích lý do bằng "because".'] } }
                    ]
                },
                {
                    id: 70603,
                    title: {en: 'Lesson 3: Studying Abroad & Writing', vi: 'Bài học 3: Du học & Viết'},
                    aims: {
                        en: ['Discuss studying abroad (pros/cons).', 'Practice writing a paragraph using contrast connectors (although, however).'],
                        vi: ['Thảo luận về việc du học (ưu/nhược điểm).', 'Luyện tập kỹ năng Viết đoạn văn sử dụng các liên từ chỉ sự tương phản.']
                    },
                    vocabulary: [
                        { term: 'study abroad', pronunciation: '/ˈstʌdi əˈbrɔd/', vietnamese: 'du học' },
                        { term: 'experience', pronunciation: '/ɪkˈspɪriəns/', vietnamese: 'trải nghiệm' },
                        { term: 'public transportation', pronunciation: '/ˈpʌblɪk ˌtrænspɔrˈteɪʃən/', vietnamese: 'giao thông công cộng' },
                        { term: 'homestay', pronunciation: '/ˈhoʊmˌsteɪ/', vietnamese: 'ở nhà dân' },
                        { term: 'independent', pronunciation: '/ˌɪndɪˈpɛndənt/', vietnamese: 'độc lập' },
                        { term: 'culture shock', pronunciation: '/ˈkʌltʃər ʃɑk/', vietnamese: 'sốc văn hóa' },
                    ],
                    grammar: [{
                        title: {en: 'Contrast Connectors: however, although', vi: 'Liên từ tương phản: however, although'},
                        explanation: {en: ['Use to connect contrasting ideas.', 'Although: Can be at the beginning or in the middle of a sentence.', 'However: Usually comes after a semicolon or period.', 'Example: Although the weather is cold, I like studying here. The city is expensive; however, it is very safe.'], vi: ['Dùng để nối các ý tương phản.', 'Although: có thể đứng đầu hoặc giữa câu.', 'However: thường đứng sau dấu chấm phẩy hoặc dấu chấm.', 'Ví dụ: Although the weather is cold, I like studying here. The city is expensive; however, it is very safe.']}
                    }],
                    activities: [
                        { type: 'Writing', description: { en: ['Write a paragraph (60-80 words) about the pros and cons of studying abroad, using "although" and "however" at least once.'], vi: ['Viết một đoạn văn (60-80 từ) về những mặt tích cực và tiêu cực của việc du học, sử dụng "although" và "however" ít nhất một lần.'] } }
                    ]
                }
            ]
        },
        {
            id: 707,
            title: { en: 'Unit 7: Transportation', vi: 'Bài 7: Giao thông' },
            lessons: [
                {
                    id: 70701,
                    title: {en: 'Lesson 1: Personal Belongings', vi: 'Bài học 1: Đồ dùng cá nhân'},
                    aims: {
                        en: ['Describe and identify personal belongings.', 'Use possessive pronouns and the correct adjective order.'],
                        vi: ['Mô tả và xác định đồ dùng cá nhân.', 'Sử dụng đại từ sở hữu và trật tự tính từ.']
                    },
                    vocabulary: [
                        { term: 'boarding pass', pronunciation: '/ˈbɔrdɪŋ pæs/', vietnamese: 'thẻ lên máy bay' },
                        { term: 'passport', pronunciation: '/ˈpæspɔrt/', vietnamese: 'hộ chiếu' },
                        { term: 'customs', pronunciation: '/ˈkʌstəmz/', vietnamese: 'hải quan' },
                        { term: 'baggage claim', pronunciation: '/ˈbægɪdʒ kleɪm/', vietnamese: 'nơi nhận hành lý' },
                        { term: 'suitcase', pronunciation: '/ˈsutˌkeɪs/', vietnamese: 'va li' },
                        { term: 'backpack', pronunciation: '/ˈbækˌpæk/', vietnamese: 'ba lô' },
                    ],
                    grammar: [
                        {title: {en: 'Possessive Pronouns', vi: 'Đại từ sở hữu'}, explanation: {en: ['Used to replace a noun phrase to show possession.', 'Examples: mine, yours, his, hers, ours, theirs.'], vi: ['Dùng để thay thế cho Cụm danh từ để chỉ sự sở hữu.', 'Ví dụ: mine, yours, his, hers, ours, theirs.']}},
                        {title: {en: 'Ordering Adjectives', vi: 'Trật tự tính từ'}, explanation: {en: ['The general order is: Opinion - Size - Age - Color - Noun (OSACL).', 'Example: This small, old, red suitcase is mine.'], vi: ['Trật tự chung là: Ý kiến - Kích thước - Tuổi tác - Màu sắc - Danh từ (OSACL).', 'Ví dụ: This small, old, red suitcase is mine.']}}
                    ],
                    activities: [
                        { type: 'Speaking Game', description: { en: ['"Whose is it?": Describe a "lost" item using 3 adjectives in the correct order. Others guess the owner using a possessive pronoun.'], vi: ['Trò chơi "Của ai?": Mô tả một vật dụng thất lạc bằng 3 tính từ theo đúng trật tự. Các bạn khác đoán chủ sở hữu bằng đại từ sở hữu.'] } }
                    ]
                },
                {
                    id: 70702,
                    title: {en: 'Lesson 2: Comparing Transportation', vi: 'Bài học 2: So sánh phương tiện giao thông'},
                    aims: {
                        en: ['Compare different types of transportation.', 'Use the structure (not) as...as... for comparison.'],
                        vi: ['So sánh các loại phương tiện giao thông khác nhau.', 'Sử dụng cấu trúc so sánh bằng ((not) as...as...).']
                    },
                    vocabulary: [
                        { term: 'frequent', pronunciation: '/ˈfrikwənt/', vietnamese: 'thường xuyên' },
                        { term: 'reliable', pronunciation: '/rɪˈlaɪəbəl/', vietnamese: 'đáng tin cậy' },
                        { term: 'eco-friendly', pronunciation: '/ˈikoʊ-ˈfrɛndli/', vietnamese: 'thân thiện với môi trường' },
                        { term: 'comfortable', pronunciation: '/ˈkʌmfərtəbəl/', vietnamese: 'thoải mái' },
                        { term: 'convenient', pronunciation: '/kənˈvinjənt/', vietnamese: 'tiện lợi' },
                        { term: 'subway', pronunciation: '/ˈsʌbˌweɪ/', vietnamese: 'tàu điện ngầm' },
                    ],
                    grammar: [{
                        title: {en: 'Comparison: (not) as...as...', vi: 'So sánh: (không) bằng...'},
                        explanation: {en: ['Usage: To compare things that are equal or unequal.', 'Formula: S1 + V + (not) as + Adj/Adv + as + S2.', 'Example: A bus is not as fast as a motorbike.'], vi: ['Công dụng: Dùng để so sánh sự bằng nhau hoặc không bằng nhau.', 'Công thức: S1 + V + (not) as + Adj/Adv + as + S2.', 'Ví dụ: A bus is not as fast as a motorbike.']}
                    }],
                    activities: [
                        { type: 'Speaking', description: { en: ['"Choosing the Best Route": In groups, decide on transportation for a long trip based on criteria (cost, speed, comfort), using "as...as" for comparison.'], vi: ['"Chọn tuyến đường tốt nhất": Thảo luận nhóm để quyết định phương tiện di chuyển đến một địa điểm xa dựa trên các tiêu chí, sử dụng as...as để so sánh.'] } }
                    ]
                },
                {
                    id: 70703,
                    title: {en: 'Lesson 3: Opinion about Transportation & Writing', vi: 'Bài học 3: Ý kiến về Giao thông & Viết'},
                    aims: {
                        en: ['Discuss and give opinions about types of transportation.', 'Practice writing an opinion paragraph.'],
                        vi: ['Thảo luận và đưa ra ý kiến về các loại phương tiện giao thông.', 'Luyện tập kỹ năng Viết đoạn văn bày tỏ quan điểm.']
                    },
                    vocabulary: [
                        { term: 'fold', pronunciation: '/foʊld/', vietnamese: 'gấp' },
                        { term: 'electronic map', pronunciation: '/ɪˌlɛkˈtrɑnɪk mæp/', vietnamese: 'bản đồ điện tử' },
                        { term: 'get lost', pronunciation: '/gɛt lɔst/', vietnamese: 'bị lạc' },
                        { term: 'traffic jam', pronunciation: '/ˈtræfɪk dʒæm/', vietnamese: 'kẹt xe' },
                        { term: 'efficient', pronunciation: '/ɪˈfɪʃənt/', vietnamese: 'hiệu quả' },
                        { term: 'sustainable', pronunciation: '/səˈsteɪnəbəl/', vietnamese: 'bền vững' },
                    ],
                    grammar: [
                        {title: {en: 'Opinion Paragraph Structure', vi: 'Cấu trúc đoạn văn quan điểm'}, explanation: {en: ['An opinion paragraph should have a clear Topic Sentence, 2-3 Supporting Ideas, and a Concluding Sentence.'], vi: ['Một đoạn văn quan điểm cần có Câu chủ đề rõ ràng, 2-3 ý hỗ trợ và Câu kết luận.']}}
                    ],
                    activities: [
                        { type: 'Writing', description: { en: ['Write an opinion paragraph (60-80 words) explaining why a certain type of transport is best for children in the city.'], vi: ['Viết một đoạn văn quan điểm (60-80 từ) giải thích tại sao một loại phương tiện nào đó là tốt nhất cho trẻ em trong thành phố.'] } }
                    ]
                }
            ]
        },
        {
            id: 708,
            title: { en: 'Unit 8: Festivals Around the World', vi: 'Bài 8: Lễ hội khắp thế giới' },
            lessons: [
                {
                    id: 70801,
                    title: {en: 'Lesson 1: Festivals', vi: 'Bài học 1: Lễ hội'},
                    aims: {
                        en: ['Talk about festivals around the world.', 'Use the Future Simple (will/won\'t) for predictions and decisions.'],
                        vi: ['Nói về các lễ hội trên thế giới.', 'Sử dụng thì Tương lai đơn (will/won\'t) để dự đoán và quyết định.']
                    },
                    vocabulary: [
                        { term: 'lantern', pronunciation: '/ˈlæntərn/', vietnamese: 'đèn lồng' },
                        { term: 'bonfire', pronunciation: '/ˈbɑnˌfaɪər/', vietnamese: 'lửa trại' },
                        { term: 'race', pronunciation: '/reɪs/', vietnamese: 'cuộc đua' },
                        { term: 'competition', pronunciation: '/ˌkɑmpɪˈtɪʃən/', vietnamese: 'cuộc thi' },
                        { term: 'sculpture', pronunciation: '/ˈskʌlptʃər/', vietnamese: 'điêu khắc' },
                        { term: 'hot-air balloon', pronunciation: '/hɑt-ɛr bəˈlun/', vietnamese: 'khinh khí cầu' },
                        { term: 'parade', pronunciation: '/pəˈreɪd/', vietnamese: 'diễu hành' },
                        { term: 'fireworks', pronunciation: '/ˈfaɪərˌwɜrks/', vietnamese: 'pháo hoa' },
                    ],
                    grammar: [{
                        title: {en: 'Future Simple: will/won\'t', vi: 'Tương lai đơn: will/won\'t'},
                        explanation: {en: ['Usage: To talk about future events/predictions or make instant decisions.', 'Formula: S + will + V (base form).', 'Example: Next year, the festival will be in August.'], vi: ['Công dụng: Nói về các sự kiện/dự đoán trong tương lai hoặc đưa ra quyết định tức thời.', 'Công thức: S + will + V (nguyên mẫu).', 'Ví dụ: Next year, the festival will be in August.']}
                    }],
                    activities: [
                        { type: 'Speaking', description: { en: ['"Future Festival Planner": Plan a new festival for your town (name, time, 3 main activities), using will/won\'t.'], vi: ['"Lên kế hoạch Lễ hội Tương lai": Lên kế hoạch cho một lễ hội mới trong thị trấn (tên, thời gian, 3 hoạt động chính), sử dụng will/won\'t.'] } }
                    ]
                },
                {
                    id: 70802,
                    title: {en: 'Lesson 2: Traditions', vi: 'Bài học 2: Truyền thống'},
                    aims: {
                        en: ['Compare how different countries celebrate festivals.', 'Use "like" and "different from" for comparison.'],
                        vi: ['So sánh cách các quốc gia khác nhau tổ chức lễ hội.', 'Sử dụng like và different from để so sánh.']
                    },
                    vocabulary: [
                        { term: 'celebrate', pronunciation: '/ˈsɛləˌbreɪt/', vietnamese: 'kỷ niệm, ăn mừng' },
                        { term: 'tradition', pronunciation: '/trəˈdɪʃən/', vietnamese: 'truyền thống' },
                        { term: 'midnight', pronunciation: '/ˈmɪdˌnaɪt/', vietnamese: 'nửa đêm' },
                        { term: 'wish', pronunciation: '/wɪʃ/', vietnamese: 'lời chúc' },
                        { term: 'exchange', pronunciation: '/ɪksˈtʃeɪndʒ/', vietnamese: 'trao đổi' },
                        { term: 'custom', pronunciation: '/ˈkʌstəm/', vietnamese: 'phong tục' },
                    ],
                    grammar: [{
                        title: {en: 'Comparison: like and different from', vi: 'So sánh: like và different from'},
                        explanation: {en: ['Use "like + noun" to show similarity.', 'Use "be + different from" to show difference.', 'Example: Tet is like Christmas in many ways. Vietnamese Lunar New Year is different from Chinese New Year.'], vi: ['Sử dụng "like + danh từ" để chỉ sự tương đồng.', 'Sử dụng "be + different from" để chỉ sự khác biệt.', 'Ví dụ: Tet is like Christmas in many ways. Vietnamese Lunar New Year is different from Chinese New Year.']}
                    }],
                    activities: [
                        { type: 'Speaking', description: { en: ['"Cultural Comparison": Compare any two festivals in the world (e.g., Halloween and Mid-Autumn Festival), using "like" and "different from".'], vi: ['"So sánh văn hóa": So sánh 2 lễ hội bất kỳ trên thế giới (ví dụ: Halloween và Tết Trung Thu), sử dụng like và different from.'] } }
                    ]
                },
                {
                    id: 70803,
                    title: {en: 'Lesson 3: Unusual Festivals in Vietnam & Writing', vi: 'Bài học 3: Lễ hội độc đáo ở Việt Nam & Viết'},
                    aims: {
                        en: ['Talk about unique festivals in Vietnam.', 'Practice writing a blog post about a favorite festival.'],
                        vi: ['Nói về các lễ hội độc đáo ở Việt Nam.', 'Luyện tập kỹ năng Viết bài blog về lễ hội yêu thích.']
                    },
                    vocabulary: [
                        { term: 'unique', pronunciation: '/juˈnik/', vietnamese: 'độc đáo' },
                        { term: 'ceremony', pronunciation: '/ˈsɛrəˌmoʊni/', vietnamese: 'nghi lễ' },
                        { term: 'spectacular', pronunciation: '/spɛkˈtækjələr/', vietnamese: 'ngoạn mục' },
                        { term: 'ancient', pronunciation: '/ˈeɪnʃənt/', vietnamese: 'cổ xưa' },
                        { term: 'local community', pronunciation: '/ˈloʊkəl kəˈmjunəti/', vietnamese: 'cộng đồng địa phương' },
                    ],
                    grammar: [
                        {title: {en: 'Review & Descriptive Language', vi: 'Ôn tập & Ngôn ngữ mô tả'}, explanation: {en: ['Review tenses (Present Simple, Past Simple) and comparisons.', 'Use descriptive language and express emotions to attract blog readers.'], vi: ['Ôn tập các thì (Hiện tại đơn, Quá khứ đơn), so sánh.', 'Sử dụng ngôn ngữ mô tả và cảm xúc để thu hút người đọc blog.']}}
                    ],
                    activities: [
                        { type: 'Writing', description: { en: ['Write a blog post (60-80 words) about your favorite festival. Describe at least 2 activities and include 1 comparison/emotion.'], vi: ['Viết một bài blog (60-80 từ) về lễ hội yêu thích của bạn. Mô tả ít nhất 2 hoạt động và 1 câu so sánh/cảm xúc.'] } }
                    ]
                }
            ]
        },
        {
            id: 709,
            title: { en: 'Unit 9: English in the World', vi: 'Bài 9: Tiếng Anh trên thế giới' },
            lessons: [
                {
                    id: 70901,
                    title: {en: 'Lesson 1: Tourist Attractions', vi: 'Bài học 1: Địa điểm du lịch'},
                    aims: {
                        en: ['Talk about tourist attractions in English-speaking countries.', 'Use "the" and the zero article with place names.'],
                        vi: ['Nói về các điểm du lịch của các nước nói tiếng Anh.', 'Sử dụng mạo từ the và mạo từ rỗng với tên địa danh.']
                    },
                    vocabulary: [
                        { term: 'tour guide', pronunciation: '/tʊr gaɪd/', vietnamese: 'hướng dẫn viên du lịch' },
                        { term: 'stadium', pronunciation: '/ˈsteɪdiəm/', vietnamese: 'sân vận động' },
                        { term: 'flight', pronunciation: '/flaɪt/', vietnamese: 'chuyến bay' },
                        { term: 'historic', pronunciation: '/hɪˈstɔrɪk/', vietnamese: 'mang tính lịch sử' },
                        { term: 'ferry', pronunciation: '/ˈfɛri/', vietnamese: 'phà' },
                        { term: 'museum', pronunciation: '/mjuˈziəm/', vietnamese: 'bảo tàng' },
                        { term: 'monument', pronunciation: '/ˈmɑnjəmənt/', vietnamese: 'đài tưởng niệm' },
                    ],
                    grammar: [{
                        title: {en: 'Articles with place names', vi: 'Mạo từ với tên địa danh'},
                        explanation: {en: ['Use "the" with specific buildings, museums, rivers, and island groups.', 'Use zero article (no article) with streets, parks, cities, and most countries.', 'Exceptions: The United States, The UK.'], vi: ['Sử dụng "the" với các tòa nhà, bảo tàng, sông, quần đảo cụ thể.', 'Không dùng mạo từ với tên đường, công viên, thành phố và hầu hết các quốc gia.', 'Ngoại lệ: The United States, The UK.']}
                    }],
                    activities: [
                        { type: 'Speaking', description: { en: ['"My Dream Trip": Describe a dream trip to an English-speaking country (choose 3 places), using articles correctly.'], vi: ['"Chuyến đi mơ ước của tôi": Mô tả một chuyến đi mơ ước đến một quốc gia nói tiếng Anh (chọn 3 địa điểm), sử dụng đúng mạo từ.'] } }
                    ]
                },
                {
                    id: 70902,
                    title: {en: 'Lesson 2: Holidays', vi: 'Bài học 2: Các kỳ nghỉ'},
                    aims: {
                        en: ['Talk about past holidays.', 'Use the Past Simple with irregular verbs fluently.'],
                        vi: ['Nói về các kỳ nghỉ đã qua.', 'Sử dụng thì Quá khứ đơn với động từ bất quy tắc.']
                    },
                    vocabulary: [
                        { term: 'souvenirs', pronunciation: '/ˌsuvəˈnɪrz/', vietnamese: 'quà lưu niệm' },
                        { term: 'sightseeing', pronunciation: '/ˈsaɪtˌsiɪŋ/', vietnamese: 'ngắm cảnh' },
                        { term: 'swimsuit', pronunciation: '/ˈswɪmˌsut/', vietnamese: 'đồ bơi' },
                        { term: 'postcards', pronunciation: '/ˈpoʊstˌkɑrdz/', vietnamese: 'bưu thiếp' },
                        { term: 'had fun', pronunciation: '/hæd fʌn/', vietnamese: 'đã vui vẻ' },
                        { term: 'tried local food', pronunciation: '/traɪd ˈloʊkəl fud/', vietnamese: 'thử đồ ăn địa phương' },
                    ],
                    grammar: [{
                        title: {en: 'Past Simple with irregular verbs', vi: 'Quá khứ đơn với động từ bất quy tắc'},
                        explanation: {en: ['Focus on common irregular verbs.', 'Examples: go -> went, buy -> bought, see -> saw, eat -> ate.'], vi: ['Tập trung vào các động từ bất quy tắc phổ biến.', 'Ví dụ: go -> went, buy -> bought, see -> saw, eat -> ate.']}
                    }],
                    activities: [
                        { type: 'Speaking', description: { en: ['"Last Holiday": Ask and answer about your last holiday, recounting actions using the Past Simple.'], vi: ['"Kỳ nghỉ trước": Hỏi và trả lời về kỳ nghỉ vừa qua, kể lại các hành động bằng Quá khứ đơn.'] } }
                    ]
                },
                {
                    id: 70903,
                    title: {en: 'Lesson 3: Benefits of English & Writing', vi: 'Bài học 3: Lợi ích của tiếng Anh & Viết'},
                    aims: {
                        en: ['Discuss the benefits of speaking English.', 'Practice writing postcards.'],
                        vi: ['Thảo luận về lợi ích của việc nói tiếng Anh.', 'Luyện tập kỹ năng Viết bưu thiếp.']
                    },
                    vocabulary: [
                        { term: 'communicate', pronunciation: '/kəˈmjunɪˌkeɪt/', vietnamese: 'giao tiếp' },
                        { term: 'global language', pronunciation: '/ˈgloʊbəl ˈlæŋgwɪdʒ/', vietnamese: 'ngôn ngữ toàn cầu' },
                        { term: 'career opportunities', pronunciation: '/kəˈrɪr ˌɑpərˈtunətiz/', vietnamese: 'cơ hội nghề nghiệp' },
                        { term: 'travel easily', pronunciation: '/ˈtrævəl ˈizəli/', vietnamese: 'du lịch dễ dàng' },
                        { term: 'understand culture', pronunciation: '/ˌʌndərˈstænd ˈkʌltʃər/', vietnamese: 'hiểu văn hóa' },
                    ],
                    grammar: [
                        {title: {en: 'Postcard Writing Style', vi: 'Văn phong viết bưu thiếp'}, explanation: {en: ['Focus on a friendly, concise style.', 'Structure: Greeting, Main news (experience), Closing, Name.'], vi: ['Tập trung vào văn phong thân mật, ngắn gọn.', 'Cấu trúc: Lời chào, Tin chính (trải nghiệm), Kết thúc, Tên.']}}
                    ],
                    activities: [
                        { type: 'Writing', description: { en: ['Write a postcard (60-80 words) from a holiday abroad, telling about how you used English.'], vi: ['Viết một tấm bưu thiếp (60-80 từ) từ một kỳ nghỉ ở nước ngoài, kể về việc bạn đã sử dụng tiếng Anh như thế nào.'] } }
                    ]
                }
            ]
        },
        {
            id: 710,
            title: { en: 'Unit 10: Energy Sources', vi: 'Bài 10: Nguồn năng lượng' },
            lessons: [
                {
                    id: 71001,
                    title: {en: 'Lesson 1: Types of Energy', vi: 'Bài học 1: Các loại năng lượng'},
                    aims: {
                        en: ['Talk about types and sources of energy (renewable/non-renewable).', 'Use more...than... and less...than... to compare quantities.'],
                        vi: ['Nói về các loại và nguồn năng lượng (tái tạo/không tái tạo).', 'Sử dụng more...than... và less...than... để so sánh số lượng.']
                    },
                    vocabulary: [
                        { term: 'solar power', pronunciation: '/ˈsoʊlər ˈpaʊər/', vietnamese: 'năng lượng mặt trời' },
                        { term: 'wind power', pronunciation: '/wɪnd ˈpaʊər/', vietnamese: 'năng lượng gió' },
                        { term: 'oil', pronunciation: '/ɔɪl/', vietnamese: 'dầu mỏ' },
                        { term: 'coal', pronunciation: '/koʊl/', vietnamese: 'than đá' },
                        { term: 'natural gas', pronunciation: '/ˈnætʃərəl gæs/', vietnamese: 'khí tự nhiên' },
                        { term: 'hydropower', pronunciation: '/ˈhaɪdroʊˌpaʊər/', vietnamese: 'thủy điện' },
                        { term: 'renewable', pronunciation: '/rɪˈnuəbəl/', vietnamese: 'tái tạo' },
                        { term: 'non-renewable', pronunciation: '/nɑn-rɪˈnuəbəl/', vietnamese: 'không tái tạo' },
                    ],
                    grammar: [{
                        title: {en: 'Comparison: more...than... / less...than...', vi: 'So sánh: nhiều hơn... / ít hơn...'},
                        explanation: {en: ['Usage: To compare quantities/percentages.', 'Example: Our city uses more solar power than oil. Coal is less eco-friendly than wind power.'], vi: ['Công dụng: Dùng để so sánh số lượng/phần trăm.', 'Ví dụ: Our city uses more solar power than oil. Coal is less eco-friendly than wind power.']}
                    }],
                    activities: [
                        { type: 'Speaking', description: { en: ['"Energy Chart Analysis": Compare the energy use of two cities based on a chart, using more/less...than.'], vi: ['"Phân tích biểu đồ năng lượng": So sánh việc sử dụng năng lượng của hai thành phố dựa trên biểu đồ, sử dụng more/less...than.'] } }
                    ]
                },
                {
                    id: 71002,
                    title: {en: 'Lesson 2: Advantages and Disadvantages', vi: 'Bài học 2: Ưu điểm và Nhược điểm'},
                    aims: {
                        en: ['Talk about the pros and cons of energy sources.', 'Use the conjunctions "and" and "but" to connect ideas.'],
                        vi: ['Nói về ưu và nhược điểm của các nguồn năng lượng.', 'Sử dụng liên từ and và but để nối các ý.']
                    },
                    vocabulary: [
                        { term: 'power plant', pronunciation: '/ˈpaʊər plænt/', vietnamese: 'nhà máy điện' },
                        { term: 'wind turbine', pronunciation: '/wɪnd ˈtɜrbaɪn/', vietnamese: 'tua-bin gió' },
                        { term: 'solar panel', pronunciation: '/ˈsoʊlər ˈpænəl/', vietnamese: 'tấm pin mặt trời' },
                        { term: 'causes pollution', pronunciation: '/ˈkɔzɪz pəˈluʃən/', vietnamese: 'gây ô nhiễm' },
                        { term: 'clean to run', pronunciation: '/klin tu rʌn/', vietnamese: 'sạch khi vận hành' },
                        { term: 'noisy', pronunciation: '/ˈnɔɪzi/', vietnamese: 'ồn ào' },
                        { term: 'reliable', pronunciation: '/rɪˈlaɪəbəl/', vietnamese: 'đáng tin cậy' },
                    ],
                    grammar: [{
                        title: {en: 'Conjunctions: and and but', vi: 'Liên từ: and và but'},
                        explanation: {en: ['Use "and" to add similar ideas.', 'Use "but" to add contrasting ideas.', 'Example: Wind power is clean but it is noisy. Solar power is clean and renewable.'], vi: ['Sử dụng "and" để thêm ý tương đồng.', 'Sử dụng "but" để thêm ý tương phản.', 'Ví dụ: Wind power is clean but it is noisy. Solar power is clean and renewable.']}
                    }],
                    activities: [
                        { type: 'Speaking', description: { en: ['"Best Energy Choice": Discuss the pros and cons of energy sources and choose the top 3 for your local area, using and/but.'], vi: ['"Lựa chọn năng lượng tốt nhất": Thảo luận về ưu/nhược điểm của các nguồn năng lượng và chọn ra 3 nguồn tốt nhất cho địa phương, sử dụng and/but.'] } }
                    ]
                },
                {
                    id: 71003,
                    title: {en: 'Lesson 3: Suggesting Energy Sources & Writing', vi: 'Bài học 3: Đề xuất nguồn năng lượng & Viết'},
                    aims: {
                        en: ['Make suggestions about energy sources.', 'Practice writing a formal email.'],
                        vi: ['Đưa ra đề xuất về nguồn năng lượng.', 'Luyện tập kỹ năng Viết email trang trọng.']
                    },
                    vocabulary: [
                        { term: 'polluted', pronunciation: '/pəˈlutɪd/', vietnamese: 'bị ô nhiễm' },
                        { term: 'eco-friendly', pronunciation: '/ˈikoʊ-ˈfrɛndli/', vietnamese: 'thân thiện môi trường' },
                        { term: 'reduce', pronunciation: '/rɪˈdus/', vietnamese: 'giảm' },
                        { term: 'invest', pronunciation: '/ɪnˈvɛst/', vietnamese: 'đầu tư' },
                        { term: 'recommend', pronunciation: '/ˌrɛkəˈmɛnd/', vietnamese: 'đề xuất' },
                        { term: 'Mayor', pronunciation: '/ˈmeɪər/', vietnamese: 'thị trưởng' },
                    ],
                    grammar: [
                        {title: {en: 'Review & Formal Email Language', vi: 'Ôn tập & Ngôn ngữ Email trang trọng'}, explanation: {en: ['Review modals like Should/Must/Have to for making suggestions.', 'Focus on formal email style (e.g., To whom it may concern, I recommend that..., Sincerely yours).'], vi: ['Ôn tập các động từ khuyết thiếu như Should/Must/Have to để đưa ra đề xuất.', 'Tập trung vào văn phong email trang trọng (ví dụ: To whom it may concern, I recommend that..., Sincerely yours).']}}
                    ],
                    activities: [
                        { type: 'Writing', description: { en: ['Write an email (60-80 words) to the mayor suggesting changes to the town\'s energy sources, outlining 1 problem and 2 solutions.'], vi: ['Viết một email (60-80 từ) gửi thị trưởng để đề xuất thay đổi nguồn năng lượng cho thị trấn, nêu ra 1 vấn đề và 2 giải pháp.'] } }
                    ]
                }
            ]
        }
    ]
};

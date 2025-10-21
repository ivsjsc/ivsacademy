import { CurriculumLevel } from '../types';

/**
 * Dữ liệu chương trình i-Learn Smart World 8 (i-Learn Smart World 8)
 * NỘI DUNG ĐẦY ĐỦ: Đã tích hợp các mục tiêu, từ vựng mở rộng và ngữ pháp chi tiết theo tài liệu.
 * Cấu trúc bao gồm 8 Unit, mỗi Unit có 3 Lesson.
 * Mỗi từ vựng (vocabulary) là một mảng object gồm: term, pronunciation, vietnamese.
 */
export const sw8Data: CurriculumLevel = {
    level: 8,
    title: { en: 'i-Learn Smart World 8', vi: 'i-Learn Smart World 8' },
    subtitle: { en: 'Secondary School - Grade 8 (Full Content)', vi: 'Trung học cơ sở - Lớp 8 (Nội dung chi tiết)' },
    ebookPdfUrl: 'https://drive.google.com/file/d/1gbl9bh_HnkYwHZeRkP6gGJ0dJ5wn0PUf/view?usp=drive_link', // URL tham khảo cho SW8
    units: [
        // --- UNIT 1: FREE TIME ---
        {
            id: 801,
            title: { en: 'Unit 1: Free Time', vi: 'Bài 1: Thời gian rảnh' },
            lessons: [
                {
                    id: 80101,
                    title: { en: 'Lesson 1: Leisure Activities', vi: 'Bài học 1: Hoạt động giải trí' },
                    aims: {
                        en: ['Talk in detail about leisure activities, likes, and dislikes using adverbs of degree.', 'Express clear preference using prefer X to Y.', 'Master verbs of preference + Gerund.'],
                        vi: ['Nói chi tiết về các hoạt động giải trí, sở thích và điều không thích, sử dụng các từ chỉ mức độ (e.g., quite, very, absolutely).', 'Thể hiện sự ưu tiên rõ ràng giữa hai hoạt động khác nhau bằng cấu trúc prefer X to Y.', 'Sử dụng thành thạo động từ diễn tả sở thích + Danh động từ (Gerund).'],
                    },
                    vocabulary: [
                        { term: 'chat', pronunciation: '/tʃæt/', vietnamese: 'trò chuyện' },
                        { term: 'fishing', pronunciation: '/ˈfɪʃɪŋ/', vietnamese: 'câu cá' },
                        { term: 'hang out', pronunciation: '/hæŋ aʊt/', vietnamese: 'đi chơi, tụ tập (chill out, socialize)' },
                        { term: 'jogging', pronunciation: '/ˈdʒɑːɡɪŋ/', vietnamese: 'chạy bộ' },
                        { term: 'jewelry making', pronunciation: '/ˈdʒuːəlri ˈmeɪkɪŋ/', vietnamese: 'làm đồ trang sức' },
                        { term: 'handball', pronunciation: '/ˈhændbɔːl/', vietnamese: 'bóng ném' },
                        { term: 'rock climbing', pronunciation: '/rɑːk ˈklaɪmɪŋ/', vietnamese: 'leo núi đá' },
                        { term: 'board games', pronunciation: '/bɔːrd ɡeɪmz/', vietnamese: 'trò chơi bàn cờ' },
                        { term: 'skateboarding', pronunciation: '/ˈskeɪtbɔːrdɪŋ/', vietnamese: 'trượt ván' },
                        { term: 'arts and crafts', pronunciation: '/ɑːrts ænd kræfts/', vietnamese: 'thủ công, mỹ nghệ' },
                        { term: 'take up a hobby', pronunciation: '/teɪk ʌp ə ˈhɑːbi/', vietnamese: 'bắt đầu một sở thích' },
                        { term: 'designing clothes', pronunciation: '/dɪˈzaɪnɪŋ kloʊðz/', vietnamese: 'thiết kế quần áo' },
                    ],
                    grammar: [
                        { title: { en: 'Verbs of preference + Gerund', vi: 'Động từ diễn tả sở thích + V-ing' }, explanation: { en: ['Use verbs of preference with gerunds to express likes/dislikes. Example: I love playing board games, but I don\'t really like fishing.'], vi: ['Dùng động từ diễn tả sở thích theo sau bởi V-ing để diễn tả thích/không thích. Ví dụ: Tôi thích chơi trò chơi bàn, nhưng tôi không thích câu cá.'] } },
                        { title: { en: 'Expressing preference (prefer X to Y)', vi: 'Diễn tả sự ưu tiên (prefer X to Y)' }, explanation: { en: ['Use prefer X to Y to show preference between two activities. Example: I prefer jogging to rock climbing.'], vi: ['Dùng prefer X to Y để thể hiện sở thích giữa hai hoạt động. Ví dụ: Tôi thích chạy bộ hơn leo núi.'] } },
                        { title: { en: 'Gerund vs To-infinitive for preference', vi: 'Gerund và To-infinitive cho sở thích' }, explanation: { en: ['Gerund often expresses general preference while to-infinitive can express a specific action or intention. Example: I like reading (general). I like to read this book tonight (specific).'], vi: ['Gerund thường diễn tả sở thích chung còn to-infinitive có thể diễn tả hành động cụ thể. Ví dụ: Tôi thích đọc (chung). Tôi thích đọc quyển sách này tối nay (cụ thể).'] } }
                    ],
                    activities: [
                        { type: 'Speaking', description: { en: ['Discuss favorite leisure activities (5-7 activities) using adverbs of degree (quite, very, absolutely).'], vi: ['Thảo luận về các hoạt động giải trí yêu thích (5-7 hoạt động) sử dụng các từ chỉ mức độ (e.g., quite, very, absolutely).'] } }
                    ],
                },
                {
                    id: 80102,
                    title: { en: 'Lesson 2: Adjectives of Emotion', vi: 'Bài học 2: Tính từ chỉ cảm xúc' },
                    aims: {
                        en: ['Describe feelings and opinions about leisure activities using -ing/-ed adjectives.', 'Express surprise and excitement using Exclamations.'],
                        vi: ['Mô tả cảm xúc và quan điểm về các hoạt động giải trí, sử dụng tính từ kết thúc bằng -ing (gây ra cảm xúc)/-ed (cảm thấy cảm xúc).', 'Bày tỏ sự ngạc nhiên và hứng thú (e.g., What an amazing day!).'],
                    },
                    vocabulary: [
                        { term: 'boring', pronunciation: '/ˈbɔːrɪŋ/', vietnamese: 'nhàm chán (gây ra)' },
                        { term: 'bored', pronunciation: '/bɔːrd/', vietnamese: 'cảm thấy nhàm chán' },
                        { term: 'exciting', pronunciation: '/ɪkˈsaɪtɪŋ/', vietnamese: 'thú vị, hấp dẫn (gây ra)' },
                        { term: 'excited', pronunciation: '/ɪkˈsaɪtɪd/', vietnamese: 'cảm thấy hào hứng' },
                        { term: 'interesting', pronunciation: '/ˈɪntrəstɪŋ/', vietnamese: 'thú vị, đáng quan tâm (gây ra)' },
                        { term: 'interested', pronunciation: '/ˈɪntrəstɪd/', vietnamese: 'cảm thấy quan tâm' },
                        { term: 'tiring', pronunciation: '/ˈtaɪərɪŋ/', vietnamese: 'mệt mỏi (gây ra)' },
                        { term: 'tired', pronunciation: '/ˈtaɪərd/', vietnamese: 'cảm thấy mệt mỏi' },
                        { term: 'surprising', pronunciation: '/sərˈpraɪzɪŋ/', vietnamese: 'bất ngờ (gây ra)' },
                        { term: 'surprised', pronunciation: '/sərˈpraɪzd/', vietnamese: 'cảm thấy bất ngờ' },
                    ],
                    grammar: [
                        { title: { en: 'Adjectives ending in -ing/-ed', vi: 'Tính từ kết thúc bằng -ing/-ed' }, explanation: { en: ['Use -ing to describe the cause (the activity) and -ed to describe the feeling. Example: Rock climbing is tiring. I am tired after rock climbing.'], vi: ['Dùng -ing để mô tả thứ gây cảm xúc và -ed để mô tả cảm nhận. Ví dụ: Leo núi thật mệt. Tôi cảm thấy mệt sau khi leo núi.'] } },
                        { title: { en: 'Exclamations (What a/an + Adj + Noun)', vi: 'Câu cảm thán (What a/an + Adj + Noun)' }, explanation: { en: ['Use exclamations to express strong feeling: What an exciting game! What a terrible movie!'], vi: ['Dùng câu cảm thán để diễn tả cảm xúc mạnh: Thật là một trò chơi thú vị! Thật là một bộ phim tệ!'] } }
                    ],
                    activities: [
                        { type: 'Listening', description: { en: ['Listen and identify the appropriate -ing/-ed adjective to describe an activity.'], vi: ['Nghe và xác định tính từ -ing/-ed phù hợp để mô tả một hoạt động và cảm xúc của người nói.'] } }
                    ],
                },
                {
                    id: 80103,
                    title: { en: 'Lesson 3: A Special Hobby', vi: 'Bài học 3: Một sở thích đặc biệt' },
                    aims: {
                        en: ['Talk about a special hobby, including how to start and what is needed.', 'Write an email describing a hobby (80-100 words).'],
                        vi: ['Nói về một sở thích đặc biệt, bao gồm cả cách bắt đầu và những dụng cụ/kỹ năng cần thiết.', 'Viết một email (80-100 từ) mô tả sở thích cho bạn bè.'],
                    },
                    vocabulary: [
                        { term: 'take up (a hobby)', pronunciation: '/teɪk ʌp/', vietnamese: 'bắt đầu một sở thích' },
                        { term: 'collection', pronunciation: '/kəˈlekʃən/', vietnamese: 'bộ sưu tập' },
                        { term: 'skill', pronunciation: '/skɪl/', vietnamese: 'kỹ năng' },
                        { term: 'creative', pronunciation: '/kriˈeɪtɪv/', vietnamese: 'sáng tạo' },
                        { term: 'satisfying', pronunciation: '/ˈsætɪsfaɪɪŋ/', vietnamese: 'thỏa mãn' },
                        { term: 'stressful', pronunciation: '/ˈstresfl/', vietnamese: 'gây căng thẳng' },
                        { term: 'challenging', pronunciation: '/ˈtʃælɪndʒɪŋ/', vietnamese: 'đầy thử thách, khó khăn' },
                        { term: 'time-consuming', pronunciation: '/ˈtaɪm kənˌsuːmɪŋ/', vietnamese: 'tốn thời gian' },
                        { term: 'equipment', pronunciation: '/ɪˈkwɪpmənt/', vietnamese: 'thiết bị, dụng cụ' },
                    ],
                    grammar: [{ title: { en: 'Present Simple vs Present Continuous', vi: 'Hiện tại đơn vs Hiện tại tiếp diễn' }, explanation: { en: ['Compare routine (Present Simple) with actions happening now (Present Continuous). Example: I usually take photos (Simple) but today I am editing photos (Continuous).'], vi: ['So sánh thói quen (Hiện tại đơn) với hành động đang xảy ra (Hiện tại tiếp diễn). Ví dụ: Tôi thường chụp ảnh nhưng hôm nay tôi đang chỉnh sửa ảnh.'] } }],
                    activities: [
                        { type: 'Writing', description: { en: ['Write an email to a friend describing a new hobby (why you started, feelings, what you learned, and equipment needed).'], vi: ['Viết email cho bạn bè mô tả một sở thích mới (tại sao bạn bắt đầu, cảm xúc, bạn đã học được gì và cần những gì).'] } }
                    ],
                },
            ],
        },

        // --- UNIT 2: SCHOOL TALK ---
        {
            id: 802,
            title: { en: 'Unit 2: School Talk', vi: 'Bài 2: Chủ đề học đường' },
            lessons: [
                {
                    id: 80201,
                    title: { en: 'Lesson 1: School Schedule', vi: 'Bài học 1: Thời khóa biểu' },
                    aims: {
                        en: ['Ask and answer about school schedules and subjects in detail.', 'Show understanding of school events and activities.'],
                        vi: ['Hỏi và trả lời chi tiết về thời khóa biểu, các môn học bắt buộc và tự chọn.', 'Thể hiện sự hiểu biết về các sự kiện học đường (lễ hội, câu lạc bộ).'],
                    },
                    vocabulary: [
                        { term: 'chemistry', pronunciation: '/ˈkemɪstri/', vietnamese: 'hóa học' },
                        { term: 'physics', pronunciation: '/ˈfɪzɪks/', vietnamese: 'vật lý' },
                        { term: 'literature', pronunciation: '/ˈlɪtərətʃər/', vietnamese: 'văn học' },
                        { term: 'history', pronunciation: '/ˈhɪstəri/', vietnamese: 'lịch sử' },
                        { term: 'geography', pronunciation: '/dʒiˈɑːɡrəfi/', vietnamese: 'địa lý' },
                        { term: 'biology', pronunciation: '/baɪˈɑːlədʒi/', vietnamese: 'sinh học' },
                        { term: 'P.E. (Physical Education)', pronunciation: '/ˌpiː ˈiː/', vietnamese: 'giáo dục thể chất' },
                        { term: 'elective subject', pronunciation: '/ɪˈlektɪv ˈsʌbdʒɪkt/', vietnamese: 'môn học tự chọn' },
                        { term: 'school fair', pronunciation: '/skuːl feər/', vietnamese: 'hội chợ trường học' },
                        { term: 'debate club', pronunciation: '/dɪˈbeɪt klʌb/', vietnamese: 'câu lạc bộ tranh biện' },
                        { term: 'extracurricular', pronunciation: '/ˌekstrəkəˈrɪkjələr/', vietnamese: 'ngoại khóa' },
                    ],
                    grammar: [{ title: { en: 'Wh-questions and prepositions of time', vi: 'Câu hỏi Wh và giới từ chỉ thời gian' }, explanation: { en: ['Use Wh-questions for schedules and prepositions (at, on, in) to state time. Example: When is your history class? It is at 9 a.m. on Monday. The fair is in June.'], vi: ['Dùng câu hỏi Wh cho lịch và các giới từ chỉ thời gian (at, on, in). Ví dụ: Lớp lịch sử của bạn khi nào? Nó vào lúc 9 giờ sáng thứ Hai. Hội chợ vào tháng Sáu.'] } }],
                    activities: [
                        { type: 'Role-play', description: { en: ['Ask and answer about weekly study plans (time, subjects, extracurricular activities) with classmates.'], vi: ['Đóng vai hỏi và trả lời về kế hoạch học tập trong tuần (thời gian, môn học, hoạt động ngoại khóa) sử dụng các câu hỏi chi tiết.'] } }
                    ],
                },
                {
                    id: 80202,
                    title: { en: 'Lesson 2: Giving Advice', vi: 'Bài học 2: Đưa ra lời khuyên' },
                    aims: {
                        en: ['Give effective study advice to other students.', 'Use modal verbs to express strong obligation, necessity, and gentle advice.'],
                        vi: ['Đưa ra lời khuyên hiệu quả cho các bạn học sinh về việc học.', 'Diễn tả nghĩa vụ (must, have to), sự cần thiết và lời khuyên nhẹ nhàng (should, shouldn’t).'],
                    },
                    vocabulary: [
                        { term: 'concentrate (on)', pronunciation: '/ˈkɑːnsntreɪt/', vietnamese: 'tập trung vào' },
                        { term: 'review', pronunciation: '/rɪˈvjuː/', vietnamese: 'ôn tập' },
                        { term: 'take notes', pronunciation: '/teɪk noʊts/', vietnamese: 'ghi chú' },
                        { term: 'memorize', pronunciation: '/ˈmeməraɪz/', vietnamese: 'ghi nhớ' },
                        { term: 'assignment', pronunciation: '/əˈsaɪnmənt/', vietnamese: 'bài tập được giao' },
                        { term: 'deadline', pronunciation: '/ˈdedlaɪn/', vietnamese: 'hạn chót' },
                        { term: 'stress management', pronunciation: '/stres ˈmænɪdʒmənt/', vietnamese: 'quản lý căng thẳng' },
                        { term: 'procrastinate', pronunciation: '/proʊˈkræstɪneɪt/', vietnamese: 'trì hoãn' },
                        { term: 'effective study habit', pronunciation: '/ɪˈfektɪv ˈstʌdi ˈhæbɪt/', vietnamese: 'thói quen học tập hiệu quả' },
                    ],
                    grammar: [{ title: { en: 'Modal verbs for advice and necessity', vi: 'Động từ khiếm khuyết cho lời khuyên và nghĩa vụ' }, explanation: { en: ['Use should/ought to for advice and must/have to for obligation. Example: You should review before the test. We have to submit the assignment by Friday.'], vi: ['Dùng should/ought to để khuyên và must/have to để diễn tả nghĩa vụ. Ví dụ: Bạn nên ôn trước bài kiểm tra. Chúng ta phải nộp bài vào thứ Sáu.'] } }],
                    activities: [
                        { type: 'Speaking', description: { en: ['Give comprehensive advice to a new student on how to adapt to high school life and achieve high scores in the final exam.'], vi: ['Đưa ra lời khuyên toàn diện cho một học sinh mới về cách thích nghi với cấp 2/3 và đạt điểm cao trong kỳ thi cuối kỳ.'] } }
                    ],
                },
                {
                    id: 80203,
                    title: { en: 'Lesson 3: Study Skills', vi: 'Bài học 3: Kỹ năng học tập' },
                    aims: {
                        en: ['Talk about important study skills (e.g., critical thinking, teamwork).', 'Write a short essay (100-120 words) on the importance of group study.'],
                        vi: ['Nói về các kỹ năng học tập quan trọng (study skills) như tư duy phản biện, làm việc nhóm, tự học.', 'Viết một bài luận ngắn (100-120 từ) về tầm quan trọng của việc học nhóm (group study).'],
                    },
                    vocabulary: [
                        { term: 'effective', pronunciation: '/ɪˈfektɪv/', vietnamese: 'hiệu quả' },
                        { term: 'self-study', pronunciation: '/self ˈstʌdi/', vietnamese: 'tự học' },
                        { term: 'critical thinking', pronunciation: '/ˈkrɪtɪkl ˈθɪŋkɪŋ/', vietnamese: 'tư duy phản biện' },
                        { term: 'problem-solving', pronunciation: '/ˈprɑːbləm ˈsɑːlvɪŋ/', vietnamese: 'giải quyết vấn đề' },
                        { term: 'teamwork', pronunciation: '/ˈtiːmwɜːrk/', vietnamese: 'làm việc nhóm' },
                        { term: 'cooperation', pronunciation: '/koʊˌɑːpəˈreɪʃən/', vietnamese: 'sự hợp tác' },
                        { term: 'mind-mapping', pronunciation: '/ˈmaɪnd mæpɪŋ/', vietnamese: 'sơ đồ tư duy' },
                        { term: 'peer support', pronunciation: '/pɪr səˈpɔːrt/', vietnamese: 'hỗ trợ từ bạn bè' },
                    ],
                    grammar: [{ title: { en: 'Connectors for structuring arguments', vi: 'Liên từ để kết cấu lập luận' }, explanation: { en: ['Use connectors like because, so, however, moreover to structure arguments. Example: Group study is effective because we can share ideas. However, it can also be time-consuming.'], vi: ['Dùng các liên từ như because, so, however, moreover để tổ chức lập luận. Ví dụ: Học nhóm hiệu quả vì chúng ta có thể chia sẻ ý tưởng. Tuy nhiên, nó cũng có thể mất thời gian.'] } }],
                    activities: [
                        { type: 'Writing', description: { en: ['Write an essay about the benefits/challenges of a specific study method (e.g., Mind-mapping, group study), providing strong arguments and conclusions.'], vi: ['Viết một bài luận về lợi ích/thách thức của một phương pháp học tập cụ thể (ví dụ: Mind-mapping, học nhóm), cung cấp lập luận và kết luận rõ ràng.'] } }
                    ],
                },
            ],
        },

        // --- UNIT 3: TRAVEL ---
        {
            id: 803,
            title: { en: 'Unit 3: Travel', vi: 'Bài 3: Du lịch' },
            lessons: [
                {
                    id: 80301,
                    title: { en: 'Lesson 1: Types of Travel', vi: 'Bài học 1: Các loại hình du lịch' },
                    aims: {
                        en: ['Talk about different types of travel (ecotourism, cultural tour) and transport.', 'Compare tourist destinations using superlatives (the most, the least) and modifiers (by far, second most).'],
                        vi: ['Nói về các loại hình du lịch (du lịch sinh thái, du lịch văn hóa) và phương tiện đi lại.', 'So sánh các địa điểm du lịch bằng so sánh nhất (the most, the least) và các từ bổ trợ (by far, the second most).'],
                    },
                    vocabulary: [
                        { term: 'ecotourism', pronunciation: '/ˌiːkoʊˈtʊrɪzəm/', vietnamese: 'du lịch sinh thái' },
                        { term: 'adventure travel', pronunciation: '/ədˈventʃər ˈtrævl/', vietnamese: 'du lịch mạo hiểm' },
                        { term: 'cultural tour', pronunciation: '/ˈkʌltʃərəl tʊr/', vietnamese: 'chuyến tham quan văn hóa' },
                        { term: 'staycation', pronunciation: '/steɪˈkeɪʃən/', vietnamese: 'du lịch tại chỗ (nghỉ ngơi gần nhà)' },
                        { term: 'cruise ship', pronunciation: '/kruːz ʃɪp/', vietnamese: 'tàu du lịch lớn' },
                        { term: 'high-speed train', pronunciation: '/haɪ spiːd treɪn/', vietnamese: 'tàu cao tốc' },
                        { term: 'camper van', pronunciation: '/ˈkæmpər væn/', vietnamese: 'xe cắm trại' },
                        { term: 'cable car', pronunciation: '/ˈkeɪbl kɑːr/', vietnamese: 'cáp treo' },
                        { term: 'backpacking', pronunciation: '/ˈbækˌpækɪŋ/', vietnamese: 'du lịch bụi' },
                        { term: 'local transport', pronunciation: '/ˈloʊkl ˈtrænspɔːrt/', vietnamese: 'phương tiện giao thông địa phương' },
                    ],
                    grammar: [
                        { title: { en: 'Superlative adjectives (the most/least)', vi: 'Tính từ so sánh nhất (most/least)' }, explanation: { en: ['Use superlative adjectives to compare more than two items. Example: It is the most beautiful island.'], vi: ['Dùng tính từ so sánh nhất để so sánh hơn hai đối tượng. Ví dụ: Đó là hòn đảo đẹp nhất.'] } },
                        { title: { en: 'Superlatives with modifiers (by far, second most)', vi: 'So sánh nhất với từ bổ trợ (by far, second most)' }, explanation: { en: ['Use modifiers to emphasize or rank items: by far, the second most. Example: The cruise ship is the most relaxing way to travel by far.'], vi: ['Dùng các từ bổ trợ để nhấn mạnh hoặc xếp hạng: by far, the second most. Ví dụ: Tàu du lịch là cách thư giãn nhất để đi du lịch, hơn hẳn các cách khác.'] } }
                    ],
                    activities: [
                        { type: 'Discussion', description: { en: ['Compare 3 tourist destinations in terms of price, excitement, and transport convenience using superlative forms and modifiers.'], vi: ['So sánh 3 địa điểm du lịch về giá cả, độ thú vị, và sự tiện lợi của phương tiện đi lại bằng các hình thức so sánh nhất chi tiết.'] } }
                    ],
                },
                {
                    id: 80302,
                    title: { en: 'Lesson 2: Travel Preparation', vi: 'Bài học 2: Chuẩn bị Du lịch' },
                    aims: {
                        en: ['Describe actions happening at the moment of speaking in a travel setting (Present Continuous).', 'Use adverbs of sequence to narrate preparation steps clearly.'],
                        vi: ['Mô tả các hành động đang diễn ra tại thời điểm nói trong môi trường du lịch (Thì hiện tại tiếp diễn).', 'Dùng trạng từ trình tự (first, next, then, finally) để kể về các bước chuẩn bị một cách rõ ràng.'],
                    },
                    vocabulary: [
                        { term: 'check in', pronunciation: '/tʃek ɪn/', vietnamese: 'làm thủ tục (khách sạn, sân bay)' },
                        { term: 'pack a suitcase', pronunciation: '/pæk ə ˈsuːtkeɪs/', vietnamese: 'đóng gói vali' },
                        { term: 'board the plane', pronunciation: '/bɔːrd ðə pleɪn/', vietnamese: 'lên máy bay' },
                        { term: 'rent a car', pronunciation: '/rent ə kɑːr/', vietnamese: 'thuê xe hơi' },
                        { term: 'reserve a room', pronunciation: '/rɪˈzɜːrv ə ruːm/', vietnamese: 'đặt phòng' },
                        { term: 'souvenir', pronunciation: '/ˌsuːvəˈnɪr/', vietnamese: 'quà lưu niệm' },
                        { term: 'tour guide', pronunciation: '/tʊr ɡaɪd/', vietnamese: 'hướng dẫn viên du lịch' },
                        { term: 'currency exchange', pronunciation: '/ˈkɜːrənsi ɪksˈtʃeɪndʒ/', vietnamese: 'đổi tiền tệ' },
                        { term: 'travel insurance', pronunciation: '/ˈtrævl ɪnˈʃʊrəns/', vietnamese: 'bảo hiểm du lịch' },
                    ],
                    grammar: [{ title: { en: 'Present Continuous & Adverbs of sequence', vi: 'Hiện tại tiếp diễn & Trạng từ trình tự (first, next, then, finally)' }, explanation: { en: ['Use Present Continuous to describe actions happening now and adverbs of sequence to narrate steps: First, Next, Then, Finally. Example: First, I pack my clothes. Next, I check in at the airport. They are currently waiting for the bus.'], vi: ['Dùng Hiện tại tiếp diễn để mô tả hành động đang xảy ra và các trạng từ trình tự để kể các bước: First, Next, Then, Finally. Ví dụ: Đầu tiên, tôi đóng gói quần áo. Tiếp theo, tôi làm thủ tục tại sân bay. Họ hiện đang chờ xe buýt.'] } }],
                    activities: [
                        { type: 'Speaking', description: { en: ['Discuss and share your best travel tips for planning and packing, using adverbs of sequence.'], vi: ['Thảo luận và chia sẻ những mẹo du lịch tốt nhất của bạn cho quá trình chuẩn bị (lên kế hoạch, đóng gói), sử dụng trạng từ trình tự.'] } }
                    ],
                },
                {
                    id: 80303,
                    title: { en: 'Lesson 3: A Travel Blog', vi: 'Bài học 3: Blog Du lịch' },
                    aims: {
                        en: ['Talk about a travel experience with descriptive language.', 'Write a well-structured travel blog post (80-100 words).'],
                        vi: ['Nói về một trải nghiệm du lịch với ngôn ngữ mô tả hấp dẫn.', 'Viết một bài blog du lịch (80-100 từ) có cấu trúc tốt.'],
                    },
                    vocabulary: [
                        { term: 'memorable', pronunciation: '/ˈmemərəbl/', vietnamese: 'đáng nhớ' },
                        { term: 'exotic', pronunciation: '/ɪɡˈzɑːtɪk/', vietnamese: 'ngoại lai/độc đáo' },
                        { term: 'culture', pronunciation: '/ˈkʌltʃər/', vietnamese: 'văn hóa' },
                        { term: 'adventure', pronunciation: '/ədˈventʃər/', vietnamese: 'cuộc phiêu lưu' },
                        { term: 'scenery', pronunciation: '/ˈsiːnəri/', vietnamese: 'phong cảnh' },
                        { term: 'local cuisine', pronunciation: '/ˈloʊkl kwɪˈziːn/', vietnamese: 'ẩm thực địa phương' },
                        { term: 'breathtaking', pronunciation: '/ˈbreθteɪkɪŋ/', vietnamese: 'ngoạn mục, hấp dẫn' },
                        { term: 'hospitable', pronunciation: '/hɑːˈspɪtəbl/', vietnamese: 'hiếu khách, thân thiện' },
                        { term: 'remote', pronunciation: '/rɪˈmoʊt/', vietnamese: 'hẻo lánh, xa xôi' },
                    ],
                    grammar: [{ title: { en: 'Review: Past Simple vs. Present Perfect', vi: 'Ôn tập: Quá khứ đơn vs Hiện tại hoàn thành' }, explanation: { en: ['Contrast Past Simple for specific past events and Present Perfect for life experiences or actions with present relevance. Example: I visited Ha Long Bay last year (Simple). I have never been to Europe (Perfect).'], vi: ['So sánh Quá khứ đơn cho các sự kiện cụ thể trong quá khứ và Hiện tại hoàn thành cho kinh nghiệm cuộc sống hoặc hành động còn liên quan tới hiện tại. Ví dụ: Tôi đã tới Hạ Long năm ngoái (Quá khứ đơn). Tôi chưa từng đến châu Âu (Hiện tại hoàn thành).'] } }],
                    activities: [
                        { type: 'Writing', description: { en: ['Write a travel blog post (80-100 words) about a memorable trip, describing the place, activities, and what made it special, using descriptive adjectives.'], vi: ['Viết một bài blog du lịch (80-100 từ) về một chuyến đi đáng nhớ, mô tả chi tiết địa điểm, hoạt động và những cảm xúc đặc biệt.'] } }
                    ],
                },
            ],
        },

        // --- UNIT 4: IN THE NEIGHBORHOOD ---
        {
            id: 804,
            title: { en: 'Unit 4: In the Neighborhood', vi: 'Bài 4: Trong khu phố' },
            lessons: [
                {
                    id: 80401,
                    title: { en: 'Lesson 1: Describing the Neighborhood', vi: 'Bài học 1: Mô tả khu phố' },
                    aims: {
                        en: ['Describe the neighborhood and ask for/give directions clearly.', 'Use countable/uncountable nouns with a variety of quantifiers (a lot of, few, little, some, any).'],
                        vi: ['Mô tả khu phố và hỏi/chỉ đường một cách rõ ràng.', 'Sử dụng danh từ đếm được/không đếm được với đa dạng từ chỉ số lượng (quantifiers).'],
                    },
                    vocabulary: [
                        { term: 'convenience store', pronunciation: '/kənˈviːniəns stɔːr/', vietnamese: 'cửa hàng tiện lợi' },
                        { term: 'laundry', pronunciation: '/ˈlɔːndri/', vietnamese: 'tiệm giặt ủi' },
                        { term: 'post office', pronunciation: '/poʊst ˈɑːfɪs/', vietnamese: 'bưu điện' },
                        { term: 'parking lot', pronunciation: '/ˈpɑːrkɪŋ lɑːt/', vietnamese: 'bãi đỗ xe' },
                        { term: 'pedestrian street', pronunciation: '/pəˈdestriən striːt/', vietnamese: 'phố đi bộ' },
                        { term: 'sidewalk', pronunciation: '/ˈsaɪdwɔːk/', vietnamese: 'vỉa hè' },
                        { term: 'traffic jam', pronunciation: '/ˈtræfɪk dʒæm/', vietnamese: 'tắc đường' },
                        { term: 'bank', pronunciation: '/bæŋk/', vietnamese: 'ngân hàng' },
                        { term: 'pharmacy', pronunciation: '/ˈfɑːrməsi/', vietnamese: 'nhà thuốc' },
                    ],
                    grammar: [
                        { title: { en: 'Countable/Uncountable Nouns and Quantifiers', vi: 'Danh từ đếm được/không đếm được & Từ chỉ lượng' }, explanation: { en: ['Use quantifiers appropriately with countable and uncountable nouns: a few, many, much, a little, few, some, any. Example: There are a few parks. There is much traffic.'], vi: ['Sử dụng các từ chỉ lượng phù hợp với danh từ đếm được và không đếm được: a few, many, much, a little, few, some, any. Ví dụ: Có vài công viên. Có nhiều giao thông.'] } },
                        { title: { en: 'Asking for/Giving directions', vi: 'Hỏi và chỉ đường' }, explanation: { en: ['Use directional phrases: go straight, turn left/right, next to, opposite, etc. Example: Go straight and turn left at the corner. The library is opposite the bank.'], vi: ['Dùng các cụm từ chỉ hướng: đi thẳng, rẽ trái/phải, bên cạnh, đối diện, v.v. Ví dụ: Đi thẳng và rẽ trái ở góc. Thư viện đối diện ngân hàng.'] } }
                    ],
                    activities: [
                        { type: 'Map Reading', description: { en: ['Role-play asking for directions to 3 different places on a simulated neighborhood map.'], vi: ['Đóng vai hỏi đường đến 3 địa điểm khác nhau trên bản đồ khu phố giả định và chỉ dẫn chi tiết bằng các giới từ, cụm từ chỉ vị trí.'] } }
                    ],
                },
                {
                    id: 80402,
                    title: { en: 'Lesson 2: Neighborhood Improvement', vi: 'Bài học 2: Cải thiện khu phố' },
                    aims: {
                        en: ['Talk about things you have/haven\'t done recently to improve the neighborhood (Present Perfect).', 'Make polite suggestions and proposals for local improvement.'],
                        vi: ['Nói về những điều bạn đã làm/chưa làm gần đây để cải thiện khu phố (Sử dụng Thì hiện tại hoàn thành).', 'Đưa ra gợi ý lịch sự (How about, Let’s, Why don’t we) và đề xuất cải thiện địa phương.'],
                    },
                    vocabulary: [
                        { term: 'recycle', pronunciation: '/ˌriːˈsaɪkl/', vietnamese: 'tái chế' },
                        { term: 'pick up trash', pronunciation: '/pɪk ʌp træʃ/', vietnamese: 'nhặt rác' },
                        { term: 'plant trees', pronunciation: '/plænt triːz/', vietnamese: 'trồng cây' },
                        { term: 'donate', pronunciation: '/ˈdoʊneɪt/', vietnamese: 'quyên góp' },
                        { term: 'volunteer', pronunciation: '/ˌvɑːlənˈtɪr/', vietnamese: 'tình nguyện' },
                        { term: 'community center', pronunciation: '/kəˈmjuːnəti ˈsentər/', vietnamese: 'trung tâm cộng đồng' },
                        { term: 'public space', pronunciation: '/ˈpʌblɪk speɪs/', vietnamese: 'không gian công cộng' },
                        { term: 'clean up', pronunciation: '/kliːn ʌp/', vietnamese: 'dọn dẹp' },
                        { term: 'fundraise', pronunciation: '/ˈfʌndreɪz/', vietnamese: 'gây quỹ' },
                    ],
                    grammar: [
                        { title: { en: 'Present Perfect', vi: 'Hiện tại hoàn thành' }, explanation: { en: ['Use Present Perfect to talk about actions in the recent past or actions that continue to the present. Example: I have volunteered twice this month. We haven\'t cleaned up the park yet.'], vi: ['Dùng Hiện tại hoàn thành để nói về hành động vừa xảy ra gần đây hoặc hành động bắt đầu trong quá khứ và còn liên quan tới hiện tại. Ví dụ: Tôi đã tình nguyện hai lần trong tháng này. Chúng tôi vẫn chưa dọn công viên.'] } },
                        { title: { en: 'Making suggestions', vi: 'Đưa ra gợi ý' }, explanation: { en: ["Use structures to suggest activities: How about + V-ing, Why don't we + V, Let's + V. Example: How about picking up trash this weekend?"], vi: ['Dùng cấu trúc đề nghị: How about + V-ing, Why don\'t we + V, Let\'s + V. Ví dụ: Thế này cuối tuần chúng ta đi nhặt rác nhé?'] } }
                    ],
                    activities: [
                        { type: 'Speaking', description: { en: ['Discuss 3 pressing issues in the neighborhood (e.g., lack of greenery, pollution) and propose solutions, using the Present Perfect and suggestion structures.'], vi: ['Thảo luận về 3 vấn đề nổi cộm trong khu phố (ví dụ: thiếu cây xanh, ô nhiễm) và đưa ra các giải pháp khả thi, sử dụng Hiện tại hoàn thành và các cấu trúc gợi ý.'] } }
                    ],
                },
                {
                    id: 80403,
                    title: { en: 'Lesson 3: Community Service', vi: 'Bài học 3: Dịch vụ cộng đồng' },
                    aims: {
                        en: ['Talk about the importance of community service and local social issues.', 'Write a short article (120 words) about a local social issue, including causes and solutions.'],
                        vi: ['Nói về tầm quan trọng của dịch vụ cộng đồng và các vấn đề xã hội địa phương.', 'Viết một bài báo ngắn (120 từ) về vấn đề xã hội địa phương, bao gồm nguyên nhân và giải pháp.'],
                    },
                    vocabulary: [
                        { term: 'social issue', pronunciation: '/ˈsoʊʃl ˈɪʃuː/', vietnamese: 'vấn đề xã hội' },
                        { term: 'homelessness', pronunciation: '/ˈhoʊmləsnəs/', vietnamese: 'vô gia cư' },
                        { term: 'pollution', pronunciation: '/pəˈluːʃən/', vietnamese: 'ô nhiễm' },
                        { term: 'access to education', pronunciation: '/ˈækses tuː ˌedʒuˈkeɪʃən/', vietnamese: 'tiếp cận giáo dục' },
                        { term: 'campaign', pronunciation: '/kæmˈpeɪn/', vietnamese: 'chiến dịch' },
                        { term: 'awareness', pronunciation: '/əˈwernəs/', vietnamese: 'nhận thức' },
                        { term: 'charity', pronunciation: '/ˈtʃærəti/', vietnamese: 'tổ chức từ thiện' },
                        { term: 'poverty', pronunciation: '/ˈpɑːvərti/', vietnamese: 'nghèo đói' },
                        { term: 'impact', pronunciation: '/ˈɪmpækt/', vietnamese: 'tác động' },
                    ],
                    grammar: [{ title: { en: 'Review: Passive Voice (Simple Present/Past)', vi: 'Ôn tập: Câu bị động (Hiện tại đơn/Quá khứ đơn)' }, explanation: { en: ['Use the passive voice to focus on the action or receiver rather than the doer. Example: The money is donated by the local people. The event was organized last month.'], vi: ['Dùng câu bị động để nhấn mạnh hành động hoặc đối tượng nhận hành động hơn là người thực hiện. Ví dụ: Số tiền được quyên góp bởi người dân địa phương. Sự kiện được tổ chức vào tháng trước.'] } }],
                    activities: [
                        { type: 'Writing', description: { en: ['Write a short article about a social issue (e.g., plastic waste, noise pollution) and how people can get involved in solving it.'], vi: ['Viết một bài báo ngắn về một vấn đề xã hội (ví dụ: rác thải nhựa, ô nhiễm tiếng ồn) và đề xuất các cách mọi người có thể tham gia giải quyết.'] } }
                    ],
                },
            ],
        },

        // --- UNIT 5: THE MEDIA ---
        {
            id: 805,
            title: { en: 'Unit 5: The Media', vi: 'Bài 5: Truyền thông' },
            lessons: [
                {
                    id: 80501,
                    title: { en: 'Lesson 1: Media Types and Genres', vi: 'Bài học 1: Loại hình và Thể loại Truyền thông' },
                    aims: {
                        en: ['Talk about different types of media (print, social, broadcast) and program genres.', 'Use "be going to" to talk about future intentions and plans with media consumption.'],
                        vi: ['Nói về các loại hình truyền thông (truyền thông in ấn, xã hội, phát sóng) và thể loại chương trình.', 'Sử dụng "be going to" để nói về dự định và kế hoạch xem/tiêu thụ nội dung truyền thông.'],
                    },
                    vocabulary: [
                        { term: 'print media', pronunciation: '/prɪnt ˈmiːdiə/', vietnamese: 'truyền thông in ấn (báo in)' },
                        { term: 'social media', pronunciation: '/ˈsoʊʃl ˈmiːdiə/', vietnamese: 'truyền thông xã hội' },
                        { term: 'broadcast', pronunciation: '/ˈbrɔːdkæst/', vietnamese: 'phát sóng' },
                        { term: 'podcast', pronunciation: '/ˈpɑːdkæst/', vietnamese: 'kênh âm thanh (chương trình phát thanh kỹ thuật số)' },
                        { term: 'streaming service', pronunciation: '/ˈstriːmɪŋ ˈsɜːrvɪs/', vietnamese: 'dịch vụ phát trực tuyến' },
                        { term: 'documentary', pronunciation: '/ˌdɑːkjuˈmentri/', vietnamese: 'phim tài liệu' },
                        { term: 'talk show', pronunciation: '/tɔːk ʃoʊ/', vietnamese: 'chương trình đối thoại' },
                        { term: 'reality TV', pronunciation: '/riˈæləti ˌtiː ˈviː/', vietnamese: 'chương trình truyền hình thực tế' },
                        { term: 'news report', pronunciation: '/nuːz rɪˈpɔːrt/', vietnamese: 'bản tin thời sự' },
                        { term: 'sitcom', pronunciation: '/ˈsɪtkɑːm/', vietnamese: 'phim hài tình huống' },
                    ],
                    grammar: [{ title: { en: 'Be going to (to express future plans/intentions)', vi: 'Be going to (diễn tả kế hoạch/dự định tương lai)' }, explanation: { en: ['Use be going to + base verb to express planned future actions or intentions. Example: I am going to watch a documentary about space tonight. She is going to read a magazine after dinner.'], vi: ['Dùng be going to + động từ nguyên mẫu để diễn tả các hành động dự định trong tương lai. Ví dụ: Tối nay tôi sẽ xem một phim tài liệu về không gian. Cô ấy sẽ đọc một tạp chí sau bữa tối.'] } }],
                    activities: [
                        { type: 'Discussion', description: { en: ['Discuss the types of media you use and the specific TV shows/movies you are going to watch this weekend.'], vi: ['Thảo luận về các loại hình truyền thông bạn sử dụng và các chương trình TV/phim cụ thể bạn dự định xem vào cuối tuần này.'] } }
                    ],
                },
                {
                    id: 80502,
                    title: { en: 'Lesson 2: Reliability of Information', vi: 'Bài học 2: Độ tin cậy của thông tin' },
                    aims: {
                        en: ['Express opinions on the reliability of information from various sources.', 'Use modals to express varying degrees of certainty, possibility, and uncertainty (must, may, might, can\'t).'],
                        vi: ['Đưa ra quan điểm về độ tin cậy của thông tin từ các nguồn khác nhau.', 'Diễn tả các mức độ chắc chắn, khả năng có thể và sự không chắc chắn bằng động từ khuyết thiếu (must, may, might, could, can’t).'],
                    },
                    vocabulary: [
                        { term: 'reliable', pronunciation: '/rɪˈlaɪəbl/', vietnamese: 'đáng tin cậy' },
                        { term: 'trustworthy', pronunciation: '/ˈtrʌstwɜːrði/', vietnamese: 'xứng đáng tin cậy' },
                        { term: 'fake news', pronunciation: '/feɪk nuːz/', vietnamese: 'tin giả' },
                        { term: 'source', pronunciation: '/sɔːrs/', vietnamese: 'nguồn (thông tin)' },
                        { term: 'bias', pronunciation: '/ˈbaɪəs/', vietnamese: 'sự thiên vị' },
                        { term: 'sensationalism', pronunciation: '/senˈseɪʃənəlɪzəm/', vietnamese: 'tính giật gân, câu khách' },
                        { term: 'misinformation', pronunciation: '/ˌmɪsɪnfərˈmeɪʃən/', vietnamese: 'thông tin sai lệch' },
                        { term: 'verify', pronunciation: '/ˈverɪfaɪ/', vietnamese: 'xác minh' },
                        { term: 'evidence', pronunciation: '/ˈevɪdəns/', vietnamese: 'bằng chứng' },
                    ],
                    grammar: [
                        { title: { en: 'Modals for probability and certainty (must, may, might, could, can\'t)', vi: 'Động từ khuyết thiếu diễn tả xác suất và độ chắc chắn' }, explanation: { en: ['Use modals to express degrees of probability and certainty: must, may, might, could, can\'t. Example: That must be true. It might be fake news. It can\'t be right.'], vi: ['Dùng các động từ khuyết thiếu để diễn tả mức độ khả năng và chắc chắn: must, may, might, could, can\'t. Ví dụ: Điều đó hẳn là đúng. Có thể là tin giả. Không thể đúng.'] } }
                    ],
                    activities: [
                        { type: 'Speaking', description: { en: ['Evaluate the reliability of 3 different sources of information (e.g., official press, social media post, expert website) and justify your opinion using modals of certainty.'], vi: ['Đánh giá độ tin cậy của 3 nguồn tin khác nhau (ví dụ: báo chí chính thống, bài đăng trên mạng xã hội, trang web chuyên gia) và giải thích lý do, sử dụng các động từ khuyết thiếu.'] } }
                    ],
                },
                {
                    id: 80503,
                    title: { en: 'Lesson 3: Social Media Impact', vi: 'Bài học 3: Ảnh hưởng của Mạng xã hội' },
                    aims: {
                        en: ['Talk about the positive and negative influence of social media on young people.', 'Write a short presentation or essay (150 words) about a media topic.'],
                        vi: ['Nói về ảnh hưởng tích cực và tiêu cực của mạng xã hội đến giới trẻ.', 'Viết một bài thuyết trình hoặc bài luận ngắn (150 từ) về chủ đề truyền thông hoặc mạng xã hội.'],
                    },
                    vocabulary: [
                        { term: 'influence', pronunciation: '/ˈɪnfluəns/', vietnamese: 'sự ảnh hưởng' },
                        { term: 'digital footprint', pronunciation: '/ˈdɪdʒɪtl ˈfʊtprɪnt/', vietnamese: 'dấu chân kỹ thuật số' },
                        { term: 'privacy', pronunciation: '/ˈpraɪvəsi/', vietnamese: 'quyền riêng tư' },
                        { term: 'cyberbullying', pronunciation: '/ˈsaɪbərbʊliɪŋ/', vietnamese: 'bắt nạt trên mạng' },
                        { term: 'mental health', pronunciation: '/ˈmentl helθ/', vietnamese: 'sức khỏe tinh thần' },
                        { term: 'engagement', pronunciation: '/ɪnˈɡeɪdʒmənt/', vietnamese: 'tương tác' },
                        { term: 'overuse', pronunciation: '/ˌoʊvərˈjuːs/', vietnamese: 'lạm dụng' },
                        { term: 'positive impact', pronunciation: '/ˈpɑːzətɪv ˈɪmpækt/', vietnamese: 'ảnh hưởng tích cực' },
                    ],
                    grammar: [{ title: { en: 'Review: Conditional Sentences Type 1 (If... will...)', vi: 'Ôn tập: Câu điều kiện loại 1 (If... will...)' }, explanation: { en: ['Use Type 1 conditionals to talk about likely future outcomes: If + Present Simple, will + verb. Example: If you post too much personal information, you will reduce your privacy.'], vi: ['Dùng câu điều kiện loại 1 để nói về kết quả rất có khả năng xảy ra trong tương lai: If + Hiện tại đơn, will + động từ. Ví dụ: Nếu bạn đăng quá nhiều thông tin cá nhân, bạn sẽ giảm bớt quyền riêng tư.'] } }],
                    activities: [
                        { type: 'Presentation', description: { en: ['Prepare slides and present (150 words) on the benefits and harms of a specific type of media (e.g., TikTok, YouTube) on teenagers.'], vi: ['Chuẩn bị slide và thuyết trình (150 từ) về lợi ích và tác hại của một loại hình truyền thông cụ thể (ví dụ: TikTok, YouTube) đối với thanh thiếu niên.'] } }
                    ],
                },
            ],
        },

        // --- UNIT 6: CULTURES OF THE WORLD ---
        {
            id: 806,
            title: { en: 'Unit 6: Cultures of the World', vi: 'Bài 6: Văn hóa thế giới' },
            lessons: [
                {
                    id: 80601,
                    title: { en: 'Lesson 1: Cultural Aspects', vi: 'Bài học 1: Khía cạnh Văn hóa' },
                    aims: {
                        en: ['Talk about cultural aspects (Festivals, Clothes, Food, Rituals).', 'Use "Used to" to talk about past habits, states, and traditions that are no longer true.'],
                        vi: ['Nói về các khía cạnh văn hóa (Lễ hội, Trang phục, Ẩm thực, Nghi lễ).', 'Sử dụng "Used to" để nói về thói quen, trạng thái, hoặc truyền thống trong quá khứ đã kết thúc.'],
                    },
                    vocabulary: [
                        { term: 'tradition', pronunciation: '/trəˈdɪʃən/', vietnamese: 'truyền thống' },
                        { term: 'custom', pronunciation: '/ˈkʌstəm/', vietnamese: 'phong tục' },
                        { term: 'festival', pronunciation: '/ˈfestɪvl/', vietnamese: 'lễ hội' },
                        { term: 'costume', pronunciation: '/ˈkɑːstuːm/', vietnamese: 'trang phục (truyền thống, lễ hội)' },
                        { term: 'ritual', pronunciation: '/ˈrɪtʃuəl/', vietnamese: 'nghi lễ' },
                        { term: 'cuisine', pronunciation: '/kwɪˈziːn/', vietnamese: 'ẩm thực' },
                        { term: 'superstition', pronunciation: '/ˌsuːpərˈstɪʃən/', vietnamese: 'mê tín' },
                        { term: 'ancestor', pronunciation: '/ˈænsestər/', vietnamese: 'tổ tiên' },
                        { term: 'celebration', pronunciation: '/ˌselɪˈbreɪʃən/', vietnamese: 'sự kỷ niệm, lễ kỷ niệm' },
                    ],
                    grammar: [
                        { title: { en: 'Used to / Didn\'t use to + V (past habits and states)', vi: 'Used to / Didn\'t use to + V (thói quen và trạng thái trong quá khứ)' }, explanation: { en: ['Use used to + base verb to describe past habits and states that are no longer true. Example: People used to wear traditional costumes every day. I used to live in Hue.'], vi: ['Dùng used to + động từ để mô tả thói quen và trạng thái trong quá khứ mà hiện tại không còn nữa. Ví dụ: Người ta từng mặc trang phục truyền thống hàng ngày. Tôi đã từng sống ở Huế.'] } }
                    ],
                    activities: [
                        { type: 'Discussion', description: { en: ['Discuss how a Vietnamese traditional custom (e.g., Tet) has changed over the last 20 years using "used to" and "now".'], vi: ['Thảo luận về cách một phong tục truyền thống của Việt Nam (ví dụ: Tết) đã thay đổi như thế nào trong 20 năm qua, so sánh bằng "used to" và hiện tại.'] } }
                    ],
                },
                {
                    id: 80602,
                    title: { en: 'Lesson 2: Cultural Do\'s and Don\'ts', vi: 'Bài học 2: Nên và Không nên trong Văn hóa' },
                    aims: {
                        en: ['Describe necessary/unnecessary actions, cultural norms, and taboos.', 'Use defining and non-defining relative clauses to provide detailed information about people and things.'],
                        vi: ['Mô tả hành động cần thiết/không cần thiết, quy tắc văn hóa và điều cấm kỵ.', 'Dùng mệnh đề quan hệ xác định (defining) và không xác định (non-defining) để cung cấp thông tin chi tiết.'],
                    },
                    vocabulary: [
                        { term: 'behave', pronunciation: '/bɪˈheɪv/', vietnamese: 'hành xử' },
                        { term: 'manners', pronunciation: '/ˈmænərz/', vietnamese: 'cách cư xử' },
                        { term: 'greeting', pronunciation: '/ˈɡriːtɪŋ/', vietnamese: 'lời chào' },
                        { term: 'bow', pronunciation: '/baʊ/', vietnamese: 'cúi chào' },
                        { term: 'shaking hands', pronunciation: '/ˈʃeɪkɪŋ hændz/', vietnamese: 'bắt tay' },
                        { term: 'taboo', pronunciation: '/tæˈbuː/', vietnamese: 'điều cấm kỵ' },
                        { term: 'polite', pronunciation: '/pəˈlaɪt/', vietnamese: 'lịch sự' },
                        { term: 'respectful', pronunciation: '/rɪˈspektfl/', vietnamese: 'tôn trọng' },
                        { term: 'etiquette', pronunciation: '/ˈeɪtɪkɪt/', vietnamese: 'nghi thức, phép xã giao' },
                    ],
                    grammar: [
                        { title: { en: 'Relative Clauses with who, which, that (Defining/Non-defining)', vi: 'Mệnh đề quan hệ với who, which, that (xác định/không xác định)' }, explanation: { en: ['Use relative clauses to add essential or extra information about people and things. Example: The person who is bowing is showing respect. Vietnam, which has a rich culture, attracts many tourists.'], vi: ['Dùng mệnh đề quan hệ để thêm thông tin chính hoặc bổ sung về người và vật. Ví dụ: Người cúi chào đang thể hiện sự tôn kính. Việt Nam, vốn có nền văn hóa phong phú, thu hút nhiều du khách.'] } },
                        { title: { en: 'Modals for obligation/prohibition (must, mustn\'t, should, shouldn\'t)', vi: 'Động từ khuyết thiếu biểu thị nghĩa vụ/cấm đoán' }, explanation: { en: ['Use modals like must, mustn\'t, should to express obligation or advice. Example: You must not wear shoes inside the house. You should bring a gift.'], vi: ['Dùng các động từ khuyết thiếu như must, mustn\'t, should để diễn tả nghĩa vụ hoặc lời khuyên. Ví dụ: Bạn không được mang giày vào nhà. Bạn nên mang một món quà.'] } }
                    ],
                    activities: [
                        { type: 'Role-play', description: { en: ['Role-play a foreigner asking about the do\'s and don\'ts when visiting a Vietnamese family during Tet, using specific relative clauses.'], vi: ['Đóng vai người nước ngoài hỏi về những điều nên/không nên làm khi đến thăm một gia đình Việt Nam vào dịp Tết, sử dụng mệnh đề quan hệ để mô tả các đối tượng.'] } }
                    ],
                },
                {
                    id: 80603,
                    title: { en: 'Lesson 3: World Heritage', vi: 'Bài học 3: Di sản Thế giới' },
                    aims: {
                        en: ['Talk about an important world heritage site, focusing on its history and conservation.', 'Write a detailed tourism leaflet (100-120 words).'],
                        vi: ['Nói về một di sản thế giới (world heritage) quan trọng, tập trung vào lịch sử và công tác bảo tồn.', 'Viết một bài thuyết minh du lịch (tourism leaflet) chi tiết (100-120 từ).'],
                    },
                    vocabulary: [
                        { term: 'heritage site', pronunciation: '/ˈherɪtɪdʒ saɪt/', vietnamese: 'di sản' },
                        { term: 'monument', pronunciation: '/ˈmɑːnjumənt/', vietnamese: 'đài tưởng niệm, công trình kỷ niệm' },
                        { term: 'ancient', pronunciation: '/ˈeɪnʃənt/', vietnamese: 'cổ xưa' },
                        { term: 'preservation', pronunciation: '/ˌprezərˈveɪʃən/', vietnamese: 'sự bảo tồn' },
                        { term: 'restoration', pronunciation: '/ˌrestəˈreɪʃən/', vietnamese: 'sự phục hồi' },
                        { term: 'symbolize', pronunciation: '/ˈsɪmbəlaɪz/', vietnamese: 'tượng trưng cho' },
                        { term: 'architectural', pronunciation: '/ˌɑːrkɪˈtektʃərəl/', vietnamese: 'thuộc về kiến trúc' },
                        { term: 'historical value', pronunciation: '/hɪˈstɔːrɪkl ˈvæljuː/', vietnamese: 'giá trị lịch sử' },
                        { term: 'recognize', pronunciation: '/ˈrekəɡnaɪz/', vietnamese: 'công nhận' },
                    ],
                    grammar: [{ title: { en: 'Review: Adverbs of Manner (quickly, carefully, well)', vi: 'Ôn tập: Trạng từ chỉ cách thức (quickly, carefully, well)' }, explanation: { en: ['Use adverbs of manner to describe how actions are performed. Example: The workers carefully restored the ancient temple. They rebuilt the roof slowly.'], vi: ['Dùng trạng từ chỉ cách thức để mô tả cách hành động được thực hiện. Ví dụ: Công nhân đã cẩn thận phục hồi ngôi đền cổ. Họ đã dựng lại mái nhà từ từ.'] } }],
                    activities: [
                        { type: 'Writing', description: { en: ['Write a leaflet (100-120 words) for a world heritage site (e.g., Ha Long Bay, Hoi An), focusing on its history, importance, and visitor information.'], vi: ['Viết một đoạn thuyết minh (100-120 từ) cho một di sản thế giới, tập trung vào lịch sử, tầm quan trọng và thông tin du lịch.'] } }
                    ],
                },
            ],
        },

        // --- UNIT 7: DISASTERS ---
        {
            id: 807,
            title: { en: 'Unit 7: Disasters', vi: 'Bài 7: Thảm họa' },
            lessons: [
                {
                    id: 80701,
                    title: { en: 'Lesson 1: Natural Disasters', vi: 'Bài học 1: Thiên tai' },
                    aims: {
                        en: ['Talk about types of natural disasters and their immediate effects.', 'Use the Past Continuous to talk about an event happening when another event interrupted (using when/while).'],
                        vi: ['Nói về các loại thiên tai (earthquake, tsunami, flood, v.v.) và ảnh hưởng trực tiếp của chúng.', 'Sử dụng thì Quá khứ tiếp diễn để kể về sự kiện đang xảy ra khi một sự kiện khác chen vào (dùng when/while).'],
                    },
                    vocabulary: [
                        { term: 'earthquake', pronunciation: '/ˈɜːrθkweɪk/', vietnamese: 'động đất' },
                        { term: 'tsunami', pronunciation: '/tsuːˈnɑːmi/', vietnamese: 'sóng thần' },
                        { term: 'volcanic eruption', pronunciation: '/vɑːlˈkænɪk ɪˈrʌpʃən/', vietnamese: 'phun trào núi lửa' },
                        { term: 'flood', pronunciation: '/flʌd/', vietnamese: 'lũ lụt' },
                        { term: 'drought', pronunciation: '/draʊt/', vietnamese: 'hạn hán' },
                        { term: 'wildfire', pronunciation: '/ˈwaɪldfaɪər/', vietnamese: 'cháy rừng' },
                        { term: 'landslide', pronunciation: '/ˈlændslaɪd/', vietnamese: 'sạt lở đất' },
                        { term: 'hurricane/typhoon', pronunciation: '/ˈhɜːrəkeɪn/ /taɪˈfuːn/', vietnamese: 'bão (Đại Tây Dương/Thái Bình Dương)' },
                        { term: 'magnitude', pronunciation: '/ˈmæɡnɪtuːd/', vietnamese: 'cường độ (động đất)' },
                    ],
                    grammar: [
                        { title: { en: 'Past Continuous & Combining Past Simple and Past Continuous (while, when)', vi: 'Quá khứ tiếp diễn & kết hợp với Quá khứ đơn (while, when)' }, explanation: { en: ['Use Past Continuous to set the background action and Past Simple for the interrupting action. Example: While people were sleeping, the earthquake struck. The lights went out when I was watching TV.'], vi: ['Dùng Quá khứ tiếp diễn để đặt cảnh nền và Quá khứ đơn cho hành động cắt ngang. Ví dụ: Trong khi mọi người đang ngủ thì động đất xảy ra. Đèn tắt khi tôi đang xem TV.'] } }
                    ],
                    activities: [
                        { type: 'Storytelling', description: { en: ['Narrate a simulated disaster event, describing what people were doing while the disaster occurred (using both Past Simple and Past Continuous).'], vi: ['Kể lại một sự kiện thảm họa giả định, mô tả những gì mọi người đang làm "while" thảm họa xảy ra (sử dụng kết hợp hai thì).'] } }
                    ],
                },
                {
                    id: 80702,
                    title: { en: 'Lesson 2: Disaster Prevention', vi: 'Bài học 2: Phòng ngừa Thảm họa' },
                    aims: {
                        en: ['Talk about disaster prevention and preparedness measures.', 'Use Conditional Sentences Type 0 to talk about facts and automatic results.'],
                        vi: ['Nói về các biện pháp phòng ngừa và chuẩn bị đối phó với thảm họa.', 'Dùng câu điều kiện loại 0 (If + Present Simple, Present Simple) để nói về sự thật, quy tắc, và kết quả tự động.'],
                    },
                    vocabulary: [
                        { term: 'evacuate', pronunciation: '/ɪˈvækjueɪt/', vietnamese: 'sơ tán' },
                        { term: 'shelter', pronunciation: '/ˈʃeltər/', vietnamese: 'nơi trú ẩn' },
                        { term: 'first aid kit', pronunciation: '/ˌfɜːrst ˈeɪd kɪt/', vietnamese: 'hộp sơ cứu' },
                        { term: 'emergency plan', pronunciation: '/ɪˈmɜːrdʒənsi plæn/', vietnamese: 'kế hoạch khẩn cấp' },
                        { term: 'warning system', pronunciation: '/ˈwɔːrnɪŋ ˈsɪstəm/', vietnamese: 'hệ thống cảnh báo' },
                        { term: 'precaution', pronunciation: '/prɪˈkɔːʃən/', vietnamese: 'biện pháp phòng ngừa' },
                        { term: 'survival', pronunciation: '/sərˈvaɪvl/', vietnamese: 'sự sống sót' },
                        { term: 'disaster relief', pronunciation: '/dɪˈzæstər rɪˈliːf/', vietnamese: 'cứu trợ thảm họa' },
                        { term: 'stock up', pronunciation: '/stɑːk ʌp/', vietnamese: 'tích trữ (đồ ăn, nước uống)' },
                    ],
                    grammar: [
                        { title: { en: 'Conditional Sentences Type 0 (If + Present Simple, Present Simple)', vi: 'Câu điều kiện loại 0 (If + Hiện tại đơn, Hiện tại đơn)' }, explanation: { en: ['Use Type 0 to talk about general truths and automatic results. Example: If the siren goes off, people evacuate immediately. If you mix water and oil, they don\'t mix.'], vi: ['Dùng câu điều kiện loại 0 để nói về chân lý chung hoặc kết quả tự động. Ví dụ: Nếu còi báo vang lên thì mọi người sơ tán ngay. Nếu bạn trộn nước và dầu thì chúng không trộn lẫn.'] } }
                    ],
                    activities: [
                        { type: 'Discussion', description: { en: ['Discuss the necessary preparation steps for a family before a major storm hits, using the Type 0 Conditional to express guaranteed results.'], vi: ['Thảo luận về các bước chuẩn bị cần thiết cho một gia đình trước khi một cơn bão lớn ập đến, sử dụng Câu điều kiện loại 0 để diễn tả kết quả chắc chắn.'] } }
                    ],
                },
                {
                    id: 80703,
                    title: { en: 'Lesson 3: Human Impact', vi: 'Bài học 3: Tác động của Con người' },
                    aims: {
                        en: ['Talk about the human role in causing and mitigating environmental disasters.', 'Write a report (120-150 words) analyzing a disaster, its causes, and consequences.'],
                        vi: ['Nói về vai trò của con người trong việc gây ra và giảm thiểu các thảm họa môi trường.', 'Viết một bài báo cáo (report) (120-150 từ) phân tích nguyên nhân và hậu quả của một thảm họa.'],
                    },
                    vocabulary: [
                        { term: 'conserve', pronunciation: '/kənˈsɜːrv/', vietnamese: 'bảo tồn' },
                        { term: 'mitigation', pronunciation: '/ˌmɪtɪˈɡeɪʃən/', vietnamese: 'sự giảm nhẹ, làm dịu' },
                        { term: 'deforestation', pronunciation: '/diːˌfɔːrɪˈsteɪʃən/', vietnamese: 'nạn phá rừng' },
                        { term: 'climate change', pronunciation: '/ˈklaɪmət tʃeɪndʒ/', vietnamese: 'biến đổi khí hậu' },
                        { term: 'sustainable', pronunciation: '/səˈsteɪnəbl/', vietnamese: 'bền vững' },
                        { term: 'human-made disaster', pronunciation: '/ˈhjuːmən meɪd dɪˈzæstər/', vietnamese: 'thảm họa do con người gây ra' },
                        { term: 'greenhouse gas', pronunciation: '/ˈɡriːnhaʊs ɡæs/', vietnamese: 'khí nhà kính' },
                        { term: 'consequence', pronunciation: '/ˈkɑːnsəkwens/', vietnamese: 'hậu quả' },
                        { term: 'contribute to', pronunciation: '/kənˈtrɪbjuːt tuː/', vietnamese: 'đóng góp vào, góp phần gây ra' },
                    ],
                    grammar: [{ title: { en: 'Review: Passive Voice (Present/Past Perfect)', vi: 'Ôn tập: Câu bị động (Hiện tại hoàn thành/Quá khứ hoàn thành)' }, explanation: { en: ['Use passive voice in Present/Past Perfect to emphasize consequences and causes: The forests have been cut down. The area had been severely damaged before the rescue began.'], vi: ['Dùng câu bị động ở Hiện tại hoàn thành/Quá khứ hoàn thành để nhấn mạnh hậu quả và nguyên nhân: Rừng đã bị chặt phá. Khu vực đã bị tàn phá nghiêm trọng trước khi cứu hộ bắt đầu.'] } }],
                    activities: [
                        { type: 'Writing', description: { en: ['Write a report (120-150 words) analyzing the causes and consequences of a specific human-impact disaster (e.g., historical flooding, pollution event), proposing solutions.'], vi: ['Viết một báo cáo (120-150 từ) phân tích nguyên nhân và hậu quả của một thảm họa do con người gây ra, đồng thời đề xuất giải pháp.'] } }
                    ],
                },
            ],
        },

        // --- UNIT 8: TECHNOLOGY ---
        {
            id: 808,
            title: { en: 'Unit 8: Technology', vi: 'Bài 8: Công nghệ' },
            lessons: [
                {
                    id: 80801,
                    title: { en: 'Lesson 1: Tech Gadgets', vi: 'Bài học 1: Thiết bị Công nghệ' },
                    aims: {
                        en: ['Talk about tech gadgets and their functions using the Passive Voice.', 'Compare devices using comparative and superlative adjectives effectively.'],
                        vi: ['Nói về các thiết bị công nghệ và chức năng của chúng, sử dụng Thể bị động (Passive Voice).', 'So sánh các thiết bị (comparative and superlative adjectives) một cách hiệu quả.'],
                    },
                    vocabulary: [
                        { term: 'virtual reality (VR)', pronunciation: '/ˌvɜːrtʃuəl riˈæləti/', vietnamese: 'thực tế ảo' },
                        { term: 'artificial intelligence (AI)', pronunciation: '/ˌɑːrtɪfɪʃl ɪnˈtelɪdʒəns/', vietnamese: 'trí tuệ nhân tạo' },
                        { term: 'smartwatch', pronunciation: '/ˈsmɑːrtwɑːtʃ/', vietnamese: 'đồng hồ thông minh' },
                        { term: 'drone', pronunciation: '/droʊn/', vietnamese: 'máy bay không người lái' },
                        { term: 'robotics', pronunciation: '/roʊˈbɑːtɪks/', vietnamese: 'ngành robot học' },
                        { term: 'gadget', pronunciation: '/ˈɡædʒɪt/', vietnamese: 'thiết bị (công nghệ)' },
                        { term: 'application (app)', pronunciation: '/ˌæplɪˈkeɪʃən/', vietnamese: 'ứng dụng' },
                        { term: 'software', pronunciation: '/ˈsɔːftwer/', vietnamese: 'phần mềm' },
                        { term: 'hardware', pronunciation: '/ˈhɑːrdwer/', vietnamese: 'phần cứng' },
                        { term: 'portable', pronunciation: '/ˈpɔːrtəbl/', vietnamese: 'di động, xách tay' },
                    ],
                    grammar: [
                        { title: { en: 'Comparative/Superlative Adjectives', vi: 'Tính từ so sánh hơn/nhất' }, explanation: { en: ['Use comparative and superlative forms to compare devices: A laptop is more powerful than a tablet. The phone is the smallest gadget.'], vi: ['Dùng dạng so sánh hơn và nhất để so sánh các thiết bị: Máy tính xách tay mạnh hơn máy tính bảng. Điện thoại là thiết bị nhỏ nhất.'] } },
                        { title: { en: 'Passive Voice (Simple Present) to describe function', vi: 'Câu bị động (Hiện tại đơn) để mô tả chức năng' }, explanation: { en: ['Use the passive to describe how devices are used or controlled: The robot is controlled by an app. Information is stored in the cloud.'], vi: ['Dùng câu bị động để mô tả cách thức các thiết bị được sử dụng hoặc điều khiển: Robot được điều khiển bởi một ứng dụng. Thông tin được lưu trữ trên đám mây.'] } }
                    ],
                    activities: [
                        { type: 'Debate', description: { en: ['Debate which technology (e.g., Smartphone vs. VR Headset) is the most beneficial for education, using comparisons and justifications.'], vi: ['Tranh luận công nghệ nào (ví dụ: Điện thoại thông minh vs. Kính VR) là có lợi nhất cho giáo dục, sử dụng so sánh và lập luận thuyết phục.'] } }
                    ],
                },
                {
                    id: 80802,
                    title: { en: 'Lesson 2: Future Technology', vi: 'Bài học 2: Công nghệ Tương lai' },
                    aims: {
                        en: ['Describe and predict future actions and possibilities related to technology (Future Simple).', 'Discuss potential impacts of new technologies on daily life.'],
                        vi: ['Mô tả và dự đoán các hành động và khả năng trong tương lai liên quan đến công nghệ (Thì Tương lai đơn - will/won’t).', 'Thảo luận về tác động tiềm tàng của công nghệ mới đối với đời sống hàng ngày.'],
                    },
                    vocabulary: [
                        { term: 'innovative', pronunciation: '/ˈɪnəveɪtɪv/', vietnamese: 'sáng tạo, đổi mới' },
                        { term: 'automate', pronunciation: '/ˈɔːtəmeɪt/', vietnamese: 'tự động hóa' },
                        { term: 'futuristic', pronunciation: '/ˌfjuːtʃəˈrɪstɪk/', vietnamese: 'tương lai' },
                        { term: 'breakthrough', pronunciation: '/ˈbreɪkθruː/', vietnamese: 'bước đột phá' },
                        { term: 'high-tech', pronunciation: '/ˌhaɪ ˈtek/', vietnamese: 'công nghệ cao' },
                        { term: 'develop', pronunciation: '/dɪˈveləp/', vietnamese: 'phát triển' },
                        { term: 'research', pronunciation: '/rɪˈsɜːrtʃ/', vietnamese: 'nghiên cứu' },
                        { term: 'efficiency', pronunciation: '/ɪˈfɪʃənsi/', vietnamese: 'hiệu quả' },
                        { term: 'self-driving car', pronunciation: '/self ˈdraɪvɪŋ kɑːr/', vietnamese: 'xe tự lái' },
                    ],
                    grammar: [{ title: { en: 'Future Simple (will/won\'t) and Questions with will', vi: 'Thì Tương lai đơn (will/won\'t) và câu hỏi với will' }, explanation: { en: ['Use Future Simple to make predictions and spontaneous decisions: Robots will clean our houses. Will AI replace all jobs? I think I will buy a new phone tomorrow.'], vi: ['Dùng Thì Tương lai đơn để dự đoán và quyết định ngẫu hứng: Robot sẽ dọn nhà cho chúng ta. Liệu AI có thay thế tất cả công việc? Tôi nghĩ tôi sẽ mua điện thoại mới ngày mai.'] } }],
                    activities: [
                        { type: 'Speaking', description: { en: ['Discuss how technology (e.g., robots, AI) will change household chores and workplaces in the next 10 years, using Future Simple.'], vi: ['Thảo luận về cách công nghệ (ví dụ: robot, AI) sẽ thay đổi công việc nhà và nơi làm việc trong 10 năm tới, sử dụng Thì Tương lai đơn.'] } }
                    ],
                },
                {
                    id: 80803,
                    title: { en: 'Lesson 3: A Tech Invention', vi: 'Bài học 3: Một phát minh Công nghệ' },
                    aims: {
                        en: ['Talk about an important technological invention and its inventor.', 'Write a formal email requesting technical support for a device issue.'],
                        vi: ['Nói về một phát minh công nghệ quan trọng, bao gồm người phát minh và tác động của nó.', 'Viết một email trang trọng yêu cầu hỗ trợ kỹ thuật cho một sự cố thiết bị.'],
                    },
                    vocabulary: [
                        { term: 'invention', pronunciation: '/ɪnˈvenʃən/', vietnamese: 'phát minh' },
                        { term: 'inventor', pronunciation: '/ɪnˈventər/', vietnamese: 'nhà phát minh' },
                        { term: 'patent', pronunciation: '/ˈpætnt/', vietnamese: 'bằng sáng chế' },
                        { term: 'malfunction', pronunciation: '/ˌmælfʌŋkʃən/', vietnamese: 'trục trặc, hỏng hóc' },
                        { term: 'troubleshoot', pronunciation: '/ˈtrʌblʃuːt/', vietnamese: 'khắc phục sự cố' },
                        { term: 'technical support', pronunciation: '/ˈteknɪkl səˈpɔːrt/', vietnamese: 'hỗ trợ kỹ thuật' },
                        { term: 'warranty', pronunciation: '/ˈwɔːrənti/', vietnamese: 'bảo hành' },
                        { term: 'upgrade', pronunciation: '/ʌpˈɡreɪd/', vietnamese: 'nâng cấp' },
                        { term: 'pioneer', pronunciation: '/ˌpaɪəˈnɪr/', vietnamese: 'người tiên phong' },
                    ],
                    grammar: [{ title: { en: 'Review: Direct/Indirect Speech', vi: 'Ôn tập: Lời nói trực tiếp và gián tiếp' }, explanation: { en: ['Use reported speech to report statements or questions: She said, "The drone is broken." -> She reported that the drone was broken. In formal emails adjust tense and pronouns accordingly.'], vi: ['Dùng lời nói gián tiếp để tường thuật câu nói hoặc câu hỏi: Cô ấy nói, "Máy bay không người lái bị hỏng." -> Cô ấy báo rằng máy bay không người lái đã hỏng. Trong email trang trọng điều chỉnh thì và đại từ phù hợp.'] } }],
                    activities: [
                        { type: 'Writing', description: { en: ['Write a formal email (100 words) requesting technical support for an issue with a newly purchased tech device, clearly stating the problem and expectation.'], vi: ['Viết một email trang trọng (100 từ) yêu cầu hỗ trợ kỹ thuật cho một sự cố với thiết bị công nghệ mới mua, nêu rõ vấn đề và mong muốn.'] } }
                    ],
                },
            ],
        },
    ],
};

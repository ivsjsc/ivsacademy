import { CurriculumLevel } from '../types';

export const sw9Data: CurriculumLevel = {
    level: 9,
    title: { en: 'i-Learn Smart World 9', vi: 'i-Learn Smart World 9' },
    subtitle: { en: 'Secondary School - Grade 9', vi: 'Trung học cơ sở - Lớp 9' },
    ebookPdfUrl: 'https://drive.google.com/file/d/1JjhpMFkgdbwHBa6ZI_uoKdPdqONS8Q2I/view?usp=drive_link', // i-Learn Smart World 9 ebook PDF
    units: [
        {
            id: 901,
            title: { en: 'Unit 1: English in the World', vi: 'Bài 1: Tiếng Anh trên Thế giới' },
            lessons: [
                {
                    id: 90101,
                    title: { en: 'Lesson 1: Learning Methods', vi: 'Bài học 1: Phương pháp học' },
                    aims: {
                        en: ['Discuss different ways to learn English', 'Use to-infinitives to express purpose and phrasal verbs'],
                        vi: ['Nói về các cách khác nhau để học tiếng Anh', 'Sử dụng động từ nguyên mẫu có "to" để diễn tả mục đích và cụm động từ'],
                    },
                    vocabulary: [
                        { term: 'look up', pronunciation: '/lʊk ʌp/', vietnamese: 'tra cứu (từ)' },
                        { term: 'come across', pronunciation: '/kʌm əˈkrɔːs/', vietnamese: 'tình cờ thấy' },
                        { term: 'go over', pronunciation: '/ɡoʊ ˈoʊvər/', vietnamese: 'ôn lại/xem lại' },
                        { term: 'note down', pronunciation: '/noʊt daʊn/', vietnamese: 'ghi chép lại' },
                        { term: 'subtitles', pronunciation: '/ˈsʌbtaɪtlz/', vietnamese: 'phụ đề' },
                        { term: 'lyrics', pronunciation: '/ˈlɪrɪks/', vietnamese: 'lời bài hát' },
                        { term: 'turn on', pronunciation: '/tɜːrn ɑːn/', vietnamese: 'bật (thiết bị)' },
                        // Advanced / extension vocabulary (from Grade 9 doc)
                        { term: 'immerse oneself', pronunciation: '/ɪˈmɜːrs wʌnˈsɛlf/', vietnamese: 'đắm mình vào (ngôn ngữ) / học thẩm thấu' },
                        { term: 'grasp the meaning', pronunciation: '/ɡræsp ðə ˈmiːnɪŋ/', vietnamese: 'hiểu được ý nghĩa' },
                        { term: 'repetition', pronunciation: '/rɪˈpɛtɪʃən/', vietnamese: 'sự lặp lại' },
                        { term: 'flashcards', pronunciation: '/ˈflæʃkɑːrdz/', vietnamese: 'thẻ học (flashcards)' },
                        { term: 'retain vocabulary', pronunciation: '/rɪˈteɪn ˌvoʊˈkæbjələri/', vietnamese: 'giữ được từ vựng' },
                        { term: 'passive listening', pronunciation: '/ˈpæsɪv ˈlɪsənɪŋ/', vietnamese: 'nghe thụ động' },
                        { term: 'active recall', pronunciation: '/ˈæktɪv rɪˈkɔːl/', vietnamese: 'gợi nhớ chủ động' },
                        { term: 'challenging material', pronunciation: '/ˈtʃælɪndʒɪŋ məˈtɪəriəl/', vietnamese: 'tài liệu thách thức' }
                    ],
                    grammar: [
                        { title: { en: 'To-infinitives to express purpose', vi: 'Động từ nguyên mẫu có "to" chỉ mục đích' }, explanation: { en: ['We use **to-infinitive** to say why we do something.', 'I watch English movies **to practice** listening. You should look up new words **to improve** your vocabulary.'], vi: ['Chúng ta dùng **to-infinitive** để nói về mục đích của một hành động.', 'Tôi xem phim tiếng Anh **để luyện tập** nghe. Bạn nên tra từ mới **để cải thiện** từ vựng.'] } },
                        { title: { en: 'Phrasal verbs', vi: 'Cụm động từ' }, explanation: { en: ['Reviewing the meaning and usage of common phrasal verbs related to studying (**look up, come across, go over, note down, turn on**).'], vi: ['Ôn tập nghĩa và cách dùng của các cụm động từ thông dụng liên quan đến việc học.'] } }
                    ],
                    activities: [
                        { type: 'Reading', description: { en: ['Read an online article about English learning methods, answer main questions and fill in the blanks.'], vi: ['Đọc bài báo trực tuyến về các phương pháp học tiếng Anh, trả lời câu hỏi chính và điền từ vào chỗ trống.'] } },
                        { type: 'Speaking', description: { en: ['Work in pairs, ask and answer about the best ways to learn English.'], vi: ['Luyện tập nói theo cặp, hỏi và trả lời về các phương pháp học tiếng Anh.'] } },
                        { type: 'Pronunciation', description: { en: ['Rhythm practice: mark content words and read sentences aloud focusing on stress (content words) and natural rhythm.'], vi: ['Luyện nhịp điệu: đánh dấu các content words và đọc to câu, chú ý trọng âm và nhịp điệu tự nhiên.'] } }
                    ],
                },
                {
                    id: 90102,
                    title: { en: 'Lesson 2: Reasons to Learn English', vi: 'Bài học 2: Lý do học Tiếng Anh' },
                    aims: {
                        en: ['Talk about reasons for learning English', 'Use adverbial clauses/phrases of reason (as, since, because, because of)'],
                        vi: ['Nói về lý do tại sao bạn học tiếng Anh', 'Sử dụng mệnh đề/cụm trạng từ chỉ lý do (as, since, because, because of)'],
                    },
                    vocabulary: [
                        { term: 'essential', pronunciation: '/ɪˈsɛnʃl/', vietnamese: 'thiết yếu' },
                        { term: 'international', pronunciation: '/ˌɪntərˈnæʃnəl/', vietnamese: 'quốc tế' },
                        { term: 'overseas', pronunciation: '/ˌoʊvərˈsiːz/', vietnamese: 'hải ngoại/ở nước ngoài' },
                        { term: 'foreign', pronunciation: '/ˈfɔːrən/', vietnamese: 'nước ngoài' },
                        { term: 'worldwide', pronunciation: '/ˈwɜːrldwaɪd/', vietnamese: 'toàn thế giới' },
                        { term: 'opportunity', pronunciation: '/ˌɑːpərˈtuːnəti/', vietnamese: 'cơ hội' },
                        { term: 'content', pronunciation: '/ˈkɑːntent/', vietnamese: 'nội dung' },
                        { term: 'career', pronunciation: '/kəˈrɪr/', vietnamese: 'sự nghiệp' },
                    ],
                    grammar: [
                        { title: { en: 'Adverbial clauses/phrases of reason', vi: 'Mệnh đề/cụm trạng từ chỉ lý do' }, explanation: { en: ['We use **as, since, because** + clause (S + V) and **because of** + Noun/V-ing to state the reason.', 'I want to travel, **so I learn** English. **Because of** the internet, learning English is easy.'], vi: ['Chúng ta dùng **as, since, because** + mệnh đề (Chủ ngữ + Động từ) và **because of** + Danh từ/V-ing để nêu lý do.', 'Tôi muốn đi du lịch, **vì vậy tôi học** tiếng Anh. **Vì** có internet, việc học tiếng Anh trở nên dễ dàng.'] } },
                    ],
                    activities: [
                        { type: 'Listening', description: { en: ['Listen to a conversation about reasons for learning English, answer comprehension questions and fill in the blanks.'], vi: ['Nghe đoạn hội thoại giữa hai người bạn về lý do họ học tiếng Anh, sau đó trả lời câu hỏi và điền từ.'] } },
                        { type: 'Speaking', description: { en: ['Discuss the top 3 reasons for learning English in groups, practicing asking for reasons in conversation.'], vi: ['Thảo luận về 3 lý do hàng đầu để học tiếng Anh và luyện kỹ năng hỏi lý do trong hội thoại.'] } }
                    ],
                },
                {
                    id: 90103,
                    title: { en: 'Lesson 3: Writing an Advice Email', vi: 'Bài học 3: Kỹ năng Viết Email Khuyên bảo' },
                    aims: {
                        en: ['Write a reply email giving advice on how to learn English', 'Use sequence words to structure ideas'],
                        vi: ['Viết một email trả lời để đưa ra lời khuyên cho một người bạn về cách học tiếng Anh', 'Sử dụng từ nối tuần tự để sắp xếp ý tưởng'],
                    },
                    vocabulary: [
                        { term: 'pen pal', pronunciation: '/ˈpen pæl/', vietnamese: 'bạn qua thư' },
                        { term: 'advice', pronunciation: '/ədˈvaɪs/', vietnamese: 'lời khuyên' },
                        { term: 'sequence words', pronunciation: '/ˈsiːkwəns wɜːrdz/', vietnamese: 'từ nối tuần tự' },
                        { term: 'practise', pronunciation: '/ˈpræktɪs/', vietnamese: 'luyện tập' }
                    ],
                    grammar: [
                        {
                            title: { en: 'Sequence words & email structure', vi: 'Từ nối tuần tự & cấu trúc email' },
                            explanation: { en: ['Using sequence words (First, Second, Finally, Next) to organize ideas and an email structure (Subject, Opening, Body, Closing).'], vi: ['Sử dụng từ nối tuần tự để sắp xếp ý và bố cục email (Tiêu đề, Mở bài, Thân bài, Kết luận).'] }
                        }
                    ],
                    activities: [
                        { type: 'Reading', description: { en: ['Read an email from a pen pal seeking advice and choose the most suitable subject line.'], vi: ['Đọc một email giữa hai người bạn qua thư, chọn tiêu đề phù hợp nhất.'] } },
                        { type: 'Writing Tip', description: { en: ['Using sequence words (**First, Second, Finally**) to organize ideas in a logical order.'], vi: ['Hướng dẫn sử dụng từ nối tuần tự (**Đầu tiên, Thứ hai, Cuối cùng**) để sắp xếp ý tưởng một cách logic.'] } },
                        { type: 'Writing', description: { en: ['Write a complete email (100-120 words) to a pen pal giving advice on how to practice English, using sequence words.'], vi: ['Viết một email hoàn chỉnh (100-120 từ) cho bạn qua thư để đưa ra lời khuyên về cách luyện tập tiếng Anh.'] } }
                    ],
                    // (sequence words grammar already present above)
                }
            ]
        },
        {
            id: 902,
            title: { en: 'Unit 2: Life in the Past', vi: 'Bài 2: Cuộc sống trong Quá khứ' },
            lessons: [
                {
                    id: 90201,
                    title: { en: 'Lesson 1: Family Life in the Past', vi: 'Bài học 1: Cuộc sống gia đình trong quá khứ' },
                    aims: {
                        en: ['Talk about family traditions and customs in the past', 'Use "would" for repeated actions in the past'],
                        vi: ['Nói về truyền thống và phong tục gia đình ngày xưa và bây giờ', 'Sử dụng "would" để nói về các hành động lặp đi lặp lại trong quá khứ'],
                    },
                    vocabulary: [
                        { term: 'nuclear family', pronunciation: '/ˌnuːkliər ˈfæməli/', vietnamese: 'gia đình hạt nhân' },
                        { term: 'extended family', pronunciation: '/ɪkˌstendɪd ˈfæməli/', vietnamese: 'đại gia đình' },
                        { term: 'relative', pronunciation: '/ˈrelətɪv/', vietnamese: 'họ hàng' },
                        { term: 'single', pronunciation: '/ˈsɪŋɡl/', vietnamese: 'độc thân' },
                        { term: 'housewife', pronunciation: '/ˈhaʊswaɪf/', vietnamese: 'người nội trợ (vợ)' },
                        { term: 'house husband', pronunciation: '/ˈhaʊs hʌzbənd/', vietnamese: 'người nội trợ (chồng)' },
                        { term: 'breadwinner', pronunciation: '/ˈbredwɪnər/', vietnamese: 'người trụ cột' },
                        { term: 'marriage', pronunciation: '/ˈmærɪdʒ/', vietnamese: 'hôn nhân' },
                        { term: 'divorce', pronunciation: '/dɪˈvɔːrs/', vietnamese: 'ly hôn' },
                        { term: 'generation', pronunciation: '/ˌdʒenəˈreɪʃn/', vietnamese: 'thế hệ' },
                        // Advanced / extension vocabulary (from Grade 9 doc)
                        { term: 'patriarchal', pronunciation: '/ˌpeɪtriˈɑːrkəl/', vietnamese: 'gia trưởng' },
                        { term: 'chores', pronunciation: '/tʃɔːrz/', vietnamese: 'việc vặt' },
                        { term: 'reunion', pronunciation: '/riːˈjuːniən/', vietnamese: 'cuộc họp mặt' },
                        { term: 'community', pronunciation: '/kəˈmjuːnəti/', vietnamese: 'cộng đồng' },
                        { term: 'societal norms', pronunciation: '/səˈsaɪətəl nɔːrmz/', vietnamese: 'chuẩn mực xã hội' },
                        { term: 'upbringing', pronunciation: '/ˈʌpbrɪŋɪŋ/', vietnamese: 'sự nuôi dưỡng (thể hiện tính cách)' },
                        { term: 'generational gap', pronunciation: '/ˌdʒɛnəˈreɪʃənəl ɡæp/', vietnamese: 'khoảng cách thế hệ' }
                    ],
                    grammar: [
                        { title: { en: '"Would" for repeated actions in the past', vi: '"Would" cho các hành động lặp lại trong quá khứ' }, explanation: { en: ['We use **would** + bare infinitive to talk about actions that happened repeatedly in the past (similar to used to), but not for states.', 'My grandfather **would take** me fishing every weekend. He **would tell** stories.'], vi: ['Chúng ta dùng **would** + động từ nguyên mẫu để nói về các hành động lặp lại trong quá khứ (tương tự used to), nhưng không dùng cho trạng thái.', 'Ông tôi **thường dẫn** tôi đi câu cá mỗi cuối tuần. Ông **thường kể** chuyện.'] } },
                    ],
                    activities: [
                        { type: 'Reading', description: { en: ['Read an interview about family life in the past, determine true/false/not mentioned statements.'], vi: ['Đọc một bài phỏng vấn về cuộc sống gia đình trong quá khứ, xác định các câu đúng/sai/không được đề cập.'] } },
                        { type: 'Speaking', description: { en: ['Discuss family traditions and customs, contrasting the past and present.'], vi: ['Nói về truyền thống và phong tục gia đình, đối chiếu giữa ngày xưa và bây giờ.'] } }
                    ],
                },
                {
                    id: 90202,
                    title: { en: 'Lesson 2: Memorable Past Events', vi: 'Bài học 2: Những kỷ niệm đáng nhớ trong quá khứ' },
                    aims: {
                        en: ['Talk about memorable past events', 'Use "used to" for past situations and habits'],
                        vi: ['Nói về một ngày đáng nhớ trong quá khứ', 'Sử dụng "used to" để nói về các tình huống và thói quen trong quá khứ'],
                    },
                    vocabulary: [
                        { term: 'bake', pronunciation: '/beɪk/', vietnamese: 'nướng bánh' },
                        { term: 'sketch', pronunciation: '/sketʃ/', vietnamese: 'phác thảo' },
                        { term: 'tuk-tuk', pronunciation: '/ˈtʊk tʊk/', vietnamese: 'xe tuk-tuk' },
                        { term: 'clay pot', pronunciation: '/kleɪ pɑːt/', vietnamese: 'nồi đất' },
                        { term: 'stall', pronunciation: '/stɔːl/', vietnamese: 'quầy hàng' },
                        { term: 'nephew', pronunciation: '/ˈnɛfjuː/', vietnamese: 'cháu trai (của chú, bác, cô, dì)' },
                        { term: 'niece', pronunciation: '/niːs/', vietnamese: 'cháu gái (của chú, bác, cô, dì)' },
                        { term: 'cottage', pronunciation: '/ˈkɑːtɪdʒ/', vietnamese: 'nhà tranh/nhà nhỏ' },
                    ],
                    grammar: [
                        { title: { en: '"Used to" for past situations and habits', vi: '"Used to" cho các tình huống và thói quen trong quá khứ' }, explanation: { en: ['We use **used to** + bare infinitive to talk about past habits or states that are no longer true.', 'I **used to bake** cakes when I was young. Did you **use to have** a cottage?'], vi: ['Chúng ta dùng **used to** + động từ nguyên mẫu để nói về các thói quen hoặc trạng thái trong quá khứ mà hiện tại không còn nữa.', 'Tôi **đã từng nướng** bánh khi còn nhỏ. Bạn **đã từng có** một ngôi nhà nhỏ không?'] } },
                    ],
                    activities: [
                        { type: 'Listening', description: { en: ['Listen to a person narrating a memory, answer comprehension questions and fill in the blanks.'], vi: ['Nghe một người kể chuyện về những kỷ niệm, trả lời câu hỏi và điền từ.'] } },
                        { type: 'Speaking', description: { en: ['Practice storytelling and expressing interest/concern in conversation.'], vi: ['Luyện tập kể chuyện, kể lại một ngày đáng nhớ và thể hiện sự quan tâm trong hội thoại.'] } }
                    ],
                },
                {
                    id: 90203,
                    title: { en: 'Lesson 3: Writing about a Family Member\'s Life', vi: 'Bài học 3: Kỹ năng Viết về cuộc đời một thành viên trong gia đình' },
                    aims: {
                        en: ['Write a paragraph about a family member\'s life story', 'Use time connectors (afterwards, meanwhile, eventually)'],
                        vi: ['Viết một đoạn văn về cuộc đời của một thành viên trong gia đình', 'Sử dụng từ nối thời gian'],
                    },
                    vocabulary: [
                        { term: 'afterwards', pronunciation: '/ˈæftərwərdz/', vietnamese: 'sau đó' },
                        { term: 'meanwhile', pronunciation: '/ˈmiːnwaɪl/', vietnamese: 'trong khi đó' },
                        { term: 'eventually', pronunciation: '/ɪˈventʃuəli/', vietnamese: 'cuối cùng' },
                        { term: 'life story', pronunciation: '/laɪf ˈstɔːri/', vietnamese: 'câu chuyện cuộc đời' }
                    ],
                    grammar: [
                        { title: { en: 'Time connectors', vi: 'Từ nối thời gian' }, explanation: { en: ['Using afterwards, meanwhile, eventually, subsequently to sequence events.'], vi: ['Sử dụng afterwards, meanwhile, eventually, subsequently để sắp xếp các sự kiện.'] } }
                    ],
                    activities: [
                        { type: 'Reading', description: { en: ['Read a narrative paragraph about a family member\'s life (e.g., Lan\'s grandmother) and analyze its flow.'], vi: ['Đọc một đoạn văn về cuộc đời bà của Lan.'] } },
                        { type: 'Writing Tip', description: { en: ['Using time connectors (**afterwards, meanwhile, eventually**) to logically sequence events in a story.'], vi: ['Hướng dẫn sử dụng các từ nối thời gian (**afterwards, meanwhile, eventually**) để sắp xếp các sự kiện một cách logic.'] } },
                        { type: 'Writing', description: { en: ['Write a complete paragraph (100-120 words) about the life story of a family member.'], vi: ['Viết một đoạn văn hoàn chỉnh (100-120 từ) về cuộc đời một thành viên trong gia đình.'] } }
                    ],
                }
            ]
        },
        {
            id: 903,
            title: { en: 'Unit 3: Living Environment', vi: 'Bài 3: Môi trường Sống' },
            lessons: [
                {
                    id: 90301,
                    title: {en: 'Lesson 1: Smart Homes', vi: 'Bài học 1: Ngôi nhà thông minh'},
                    aims: {
                        en: ['Talk about smart home features', 'Use defining relative clauses (that, who, which, whose)'],
                        vi: ['Nói về các đặc điểm của một ngôi nhà thông minh', 'Sử dụng mệnh đề quan hệ xác định'],
                    },
                    vocabulary: [
                        {term: 'elevator', pronunciation: '/ˈelɪveɪtər/', vietnamese: 'thang máy'},
                        {term: 'generate', pronunciation: '/ˈdʒenəreɪt/', vietnamese: 'tạo ra'},
                        {term: 'furniture', pronunciation: '/ˈfɜːrnɪtʃər/', vietnamese: 'đồ nội thất'},
                        {term: 'appliance', pronunciation: '/əˈplaɪəns/', vietnamese: 'thiết bị (gia dụng)'},
                        {term: 'system', pronunciation: '/ˈsɪstəm/', vietnamese: 'hệ thống'},
                        {term: 'voice assistant', pronunciation: '/vɔɪs əˈsɪstənt/', vietnamese: 'trợ lý giọng nói'},
                        {term: 'sensor', pronunciation: '/ˈsensər/', vietnamese: 'cảm biến'},
                        {term: 'monitor', pronunciation: '/ˈmɑːnɪtər/', vietnamese: 'theo dõi/giám sát'},
                        // Advanced / extension vocabulary (from Grade 9 doc)
                        { term: 'remote control', pronunciation: '/rɪˈmoʊt kənˈtroʊl/', vietnamese: 'điều khiển từ xa' },
                        { term: 'energy efficiency', pronunciation: '/ˈɛnərdʒi ɪˈfɪʃənsi/', vietnamese: 'hiệu quả năng lượng' },
                        { term: 'automated', pronunciation: '/ˈɔːtəmeɪtɪd/', vietnamese: 'tự động hóa' },
                        { term: 'security system', pronunciation: '/sɪˈkjʊrəti ˈsɪstəm/', vietnamese: 'hệ thống an ninh' },
                        { term: 'smart grid', pronunciation: '/smɑːrt ɡrɪd/', vietnamese: 'lưới điện thông minh' },
                        { term: 'thermal insulation', pronunciation: '/ˈθɜːrməl ˌɪnsəˈleɪʃən/', vietnamese: 'cách nhiệt' },
                        { term: 'integrated sensors', pronunciation: '/ˈɪntɪɡreɪtɪd ˈsɛnsərz/', vietnamese: 'cảm biến tích hợp' },
                        { term: 'biometric access', pronunciation: '/baɪəˈmɛtrɪk ˈæksɛs/', vietnamese: 'truy cập bằng sinh trắc học' }
                    ],
                    grammar: [{
                        title: {en: 'Defining relative clauses', vi: 'Mệnh đề quan hệ xác định'},
                        explanation: {en: ['We use relative clauses (with **that, who, which, whose**) to define or specify the noun they refer to. They are essential to the meaning of the sentence.', 'A smart home is a house **that** uses technology. The woman **who** created this lives next door.'], vi: ['Chúng ta dùng mệnh đề quan hệ (**that, who, which, whose**) để xác định hoặc làm rõ danh từ mà chúng bổ nghĩa. Chúng là phần thiết yếu của câu.', 'Ngôi nhà thông minh là ngôi nhà **mà** sử dụng công nghệ. Người phụ nữ **mà** tạo ra cái này sống bên cạnh.']}
                    }],
                    activities: [
                        { type: 'Reading', description: { en: ['Read an article about smart homes and complete a table about their features.'], vi: ['Đọc bài báo về các ngôi nhà thông minh, hoàn thành bảng về các đặc điểm của chúng.'] } },
                        { type: 'Speaking', description: { en: ['Discuss devices and home items you would like to have in the future.'], vi: ['Thảo luận về các thiết bị và đồ dùng trong nhà mà học sinh muốn có trong tương lai.'] } }
                    ]
                },
                {
                    id: 90302,
                    title: {en: 'Lesson 2: Desired Changes', vi: 'Bài học 2: Điều bạn muốn thay đổi về môi trường sống'},
                    aims: {
                        en: ['Talk about things you want to change in your living environment', 'Use "wish" with Past Simple for present unreal desires'],
                        vi: ['Nói về những điều bạn muốn thay đổi trong môi trường sống', 'Sử dụng "wish" với Thì Quá khứ đơn cho mong muốn không có thật ở hiện tại'],
                    },
                    vocabulary: [
                        {term: 'bunk beds', pronunciation: '/bʌŋk bedz/', vietnamese: 'giường tầng'},
                        {term: 'neighborhood', pronunciation: '/ˈneɪbərhʊd/', vietnamese: 'khu phố'},
                        {term: 'curtain', pronunciation: '/ˈkɜːrtn/', vietnamese: 'rèm cửa'},
                        {term: 'nearby', pronunciation: '/ˌnɪrˈbaɪ/', vietnamese: 'gần đó'},
                        {term: 'spa', pronunciation: '/spɑː/', vietnamese: 'spa/dịch vụ thư giãn'},
                        {term: 'flat-screen', pronunciation: '/flæt skriːn/', vietnamese: 'màn hình phẳng'},
                        {term: 'air conditioner', pronunciation: '/ɛr kənˈdɪʃənər/', vietnamese: 'máy điều hòa'},
                        {term: 'game console', pronunciation: '/ɡeɪm ˈkɑːnsoʊl/', vietnamese: 'máy chơi game'}
                    ],
                    grammar: [{
                        title: {en: '"Wish" with Past Simple', vi: '"Wish" với Thì Quá khứ đơn'},
                        explanation: {en: ['We use **I wish** + Past Simple to express a desire for things to be different in the present (an unreal situation).', 'I **wish** I **had** a bigger room. He **wishes** his neighborhood **were** quieter.'], vi: ['Chúng ta dùng **I wish** + Quá khứ đơn để diễn tả mong muốn mọi thứ khác đi ở hiện tại (một tình huống không có thật).', 'Tôi **ước** tôi **có** một căn phòng lớn hơn. Anh ấy **ước** khu phố của anh ấy **yên tĩnh hơn**.' ]}
                    }],
                    activities: [
                        { type: 'Listening', description: { en: ['Listen to a conversation about home dislikes, assess the speaker\'s feelings, and determine true/false statements.'], vi: ['Nghe một đoạn hội thoại về những điều không thích ở nhà, đánh giá cảm xúc và xác định đúng/sai.'] } },
                        { type: 'Speaking', description: { en: ['Discuss what you wish were different about your house or neighborhood, practicing asking a similar question back.'], vi: ['Thảo luận về những điều bạn ước khác đi trong ngôi nhà hoặc khu phố của mình.'] } }
                    ]
                },
                {
                    id: 90303,
                    title: {en: 'Lesson 3: Writing about a Dream House', vi: 'Bài học 3: Kỹ năng Viết về ngôi nhà mơ ước'},
                    aims: {
                        en: ['Write a paragraph describing your dream house', 'Use parallel structures'],
                        vi: ['Viết một đoạn văn về ngôi nhà mơ ước của bạn', 'Sử dụng cấu trúc song song'],
                    },
                    vocabulary: [
                        { term: 'spacious', pronunciation: '/ˈspeɪʃəs/', vietnamese: 'rộng rãi' },
                        { term: 'stylish', pronunciation: '/ˈstaɪlɪʃ/', vietnamese: 'phong cách' },
                        { term: 'parallel structure', pronunciation: '/ˈpærəlel ˈstrʌktʃər/', vietnamese: 'cấu trúc song song' },
                        { term: 'luxurious', pronunciation: '/lʌɡˈʒʊriəs/', vietnamese: 'sang trọng' }
                    ],
                    grammar: [
                        { title: { en: 'Parallel structures', vi: 'Cấu trúc song song' }, explanation: { en: ['Using parallel structures in lists and comparisons to improve clarity and rhythm.'], vi: ['Sử dụng cấu trúc song song khi liệt kê và so sánh để tăng tính rõ ràng.'] } }
                    ],
                    activities: [
                        { type: 'Reading', description: { en: ['Read a blog post about a dream house and answer comprehension questions.'], vi: ['Đọc một bài blog về ngôi nhà mơ ước, trả lời các câu hỏi.'] } },
                        { type: 'Writing Tip', description: { en: ['Using **parallel structures** (e.g., listing items using the same grammatical form) to make descriptions clear and balanced.'], vi: ['Hướng dẫn sử dụng **cấu trúc song song** để liệt kê các ý tưởng một cách rõ ràng và cân đối.'] } },
                        { type: 'Writing', description: { en: ['Write a complete paragraph (100-120 words) describing your dream house.'], vi: ['Viết một đoạn văn hoàn chỉnh (100-120 từ) về ngôi nhà mơ ước của bạn.'] } }
                    ]
                }
            ]
        },
        {
            id: 904,
            title: { en: 'Unit 4: Tourism', vi: 'Bài 4: Du lịch' },
            lessons: [
                {
                    id: 90401,
                    title: {en: 'Lesson 1: Travel Suggestions', vi: 'Bài học 1: Đề xuất du lịch'},
                    aims: {
                        en: ['Make and discuss travel suggestions', 'Use reported speech for suggestions'],
                        vi: ['Đưa ra và thảo luận các gợi ý du lịch', 'Sử dụng câu tường thuật cho các lời đề nghị'],
                    },
                    vocabulary: [
                        {term: 'pastry', pronunciation: '/ˈpeɪstri/', vietnamese: 'bánh ngọt/bánh nướng'},
                        {term: 'dumpling', pronunciation: '/ˈdʌmplɪŋ/', vietnamese: 'bánh bao/bánh há cảo'},
                        {term: 'bakery', pronunciation: '/ˈbeɪkəri/', vietnamese: 'tiệm bánh'},
                        {term: 'monument', pronunciation: '/ˈmɑːnjumənt/', vietnamese: 'đài tưởng niệm'},
                        {term: 'socket adapter', pronunciation: '/ˈsɑːkɪt əˌdæptər/', vietnamese: 'bộ chuyển đổi ổ cắm'},
                        {term: 'fanny pack', pronunciation: '/ˈfæni pæk/', vietnamese: 'túi đeo hông'},
                        {term: 'sunblock', pronunciation: '/ˈsʌnblɑːk/', vietnamese: 'kem chống nắng'},
                        {term: 'hostel', pronunciation: '/ˈhɑːstl/', vietnamese: 'nhà trọ/khách sạn bình dân'},
                        {term: 'bed and breakfast', pronunciation: '/ˌbed ən ˈbrekfəst/', vietnamese: 'nhà nghỉ B&B'}
                    ],
                    grammar: [{
                        title: {en: 'Reported speech for suggestions', vi: 'Câu tường thuật cho các lời đề nghị'},
                        explanation: {en: ['We use reported speech (with verbs like **suggested** or **recommended**) to report suggestions made by others.', 'He **suggested going** to the museum. She **recommended that** I **visit** the bakery.'], vi: ['Chúng ta dùng câu tường thuật (với các động từ như **suggested** hoặc **recommended**) để tường thuật lại các đề nghị của người khác.', 'Anh ấy **đề nghị đi** đến bảo tàng. Cô ấy **khuyên rằng** tôi **nên ghé thăm** tiệm bánh.']}
                    }],
                    activities: [
                        { type: 'Reading', description: { en: ['Read an email with travel tips, choose the best topic, and answer short questions.'], vi: ['Đọc email với các lời khuyên du lịch, chọn chủ đề phù hợp và trả lời các câu hỏi ngắn.'] } },
                        { type: 'Speaking', description: { en: ['Discuss travel suggestions you have received, practicing reporting them to others.'], vi: ['Thảo luận về những lời khuyên du lịch mà bạn nhận được.'] } }
                    ]
                },
                {
                    id: 90402,
                    title: {en: 'Lesson 2: Asking for Information and Directions', vi: 'Bài học 2: Hỏi thông tin và chỉ đường'},
                    aims: {
                        en: ['Ask for information and directions politely', 'Use "could" for polite requests and wh-words before to-infinitives'],
                        vi: ['Hỏi thông tin và chỉ đường', 'Sử dụng "could" để đưa ra yêu cầu lịch sự và từ để hỏi trước động từ nguyên mẫu có to'],
                    },
                    vocabulary: [
                        {term: 'SIM card', pronunciation: '/sɪm kɑːrd/', vietnamese: 'thẻ SIM'},
                        {term: 'convenience store', pronunciation: '/kənˈviːniəns stɔːr/', vietnamese: 'cửa hàng tiện lợi'},
                        {term: 'pharmacy', pronunciation: '/ˈfɑːrməsi/', vietnamese: 'hiệu thuốc'},
                        {term: 'gallery', pronunciation: '/ˈɡælərɪ/', vietnamese: 'phòng trưng bày nghệ thuật'},
                        {term: 'top up', pronunciation: '/tɑːp ʌp/', vietnamese: 'nạp tiền/làm đầy'},
                        {term: 'embassy', pronunciation: '/ˈembəsi/', vietnamese: 'đại sứ quán'}
                    ],
                    grammar: [
                        { title: {en: '"Could" for polite requests', vi: '"Could" cho yêu cầu lịch sự'}, explanation: {en: ['We use **Could** + S + V + ...? for polite requests, especially when talking to strangers in a new place.', 'Could you tell me how to get to the embassy?'], vi: ['Chúng ta dùng **Could** + Chủ ngữ + Động từ + ...? cho các yêu cầu lịch sự, đặc biệt khi nói chuyện với người lạ ở một nơi mới.', 'Bạn có thể cho tôi biết làm thế nào để đến đại sứ quán không?']}},
                        { title: {en: 'Wh-words before to-infinitives', vi: 'Từ để hỏi trước động từ nguyên mẫu có to'}, explanation: {en: ['We use question words (**what, where, how**) followed by **to-infinitive** to ask for information or instructions.', 'I don\'t know **where to buy** a SIM card. Could you tell me **how to get** there?'], vi: ['Chúng ta dùng từ để hỏi (**what, where, how**) theo sau là **to-infinitive** để hỏi thông tin hoặc hướng dẫn.', 'Tôi không biết **mua** thẻ SIM **ở đâu**. Bạn có thể cho tôi biết **làm thế nào để đến** đó không?']} }
                    ],
                    activities: [
                        { type: 'Listening', description: { en: ['Listen to a conversation asking for directions, identify the character\'s first destination, and determine true/false statements.'], vi: ['Nghe một đoạn hội thoại hỏi chỉ đường, xác định nơi nhân vật sẽ đi đầu tiên và trả lời các câu đúng/sai.'] } },
                        { type: 'Speaking', description: { en: ['Practice asking for and giving directions and information about your city, using polite language.'], vi: ['Hỏi và trả lời các câu hỏi về chỉ đường và thông tin trong thành phố của bạn.'] } }
                    ],
                },
                {
                    id: 90403,
                    title: {en: 'Lesson 3: Writing a Tourist Guide', vi: 'Bài học 3: Kỹ năng Viết hướng dẫn du lịch'},
                    aims: {
                        en: ['Write a short tourist guide', 'Use descriptive language'],
                        vi: ['Viết một hướng dẫn du lịch ngắn', 'Sử dụng ngôn ngữ miêu tả'],
                    },
                    vocabulary: [
                        { term: 'descriptive language', pronunciation: '/dɪˈskrɪptɪv ˈlæŋɡwɪdʒ/', vietnamese: 'ngôn ngữ miêu tả' },
                        { term: 'breathtaking', pronunciation: '/ˈbreθˌteɪkɪŋ/', vietnamese: 'ngoạn mục' },
                        { term: 'vibrant', pronunciation: '/ˈvaɪbrənt/', vietnamese: 'sôi động' },
                        { term: 'historic', pronunciation: '/hɪˈstɔːrɪk/', vietnamese: 'có tính lịch sử' }
                        ,
                        // Advanced tourism vocab from Grade 9 doc
                        { term: 'itinerary', pronunciation: '/aɪˈtɪnərəri/', vietnamese: 'hành trình' },
                        { term: 'currency', pronunciation: '/ˈkɜːrənsi/', vietnamese: 'tiền tệ' },
                        { term: 'local cuisine', pronunciation: '/ˈloʊkəl kwɪˈziːn/', vietnamese: 'ẩm thực địa phương' },
                        { term: 'passport control', pronunciation: '/ˈpæspɔːrt kənˈtroʊl/', vietnamese: 'cửa khẩu/hải quan' },
                        { term: 'travel insurance', pronunciation: '/ˈtrævəl ɪnˈʃʊərəns/', vietnamese: 'bảo hiểm du lịch' },
                        { term: 'essential gear', pronunciation: '/ɪˈsɛnʃəl ɡɪr/', vietnamese: 'đồ dùng cần thiết' },
                        { term: 'cultural sensitivity', pronunciation: '/ˈkʌltʃərəl sənsɪˈtɪvɪti/', vietnamese: 'sự nhạy cảm văn hóa' }
                    ],
                    grammar: [
                        { title: { en: 'Non-defining relative clauses & descriptive language', vi: 'Mệnh đề quan hệ không xác định & ngôn ngữ miêu tả' }, explanation: { en: ['Using non-defining relative clauses and vivid descriptive language to enrich tourist guides.'], vi: ['Sử dụng mệnh đề quan hệ không xác định và ngôn ngữ miêu tả để làm phong phú hướng dẫn du lịch.'] } }
                    ],
                    activities: [
                        { type: 'Reading', description: { en: ['Read a tourist guide (e.g., about Mexico) and answer comprehension questions.'], vi: ['Đọc hướng dẫn du lịch về Mexico, trả lời các câu hỏi.'] } },
                        { type: 'Writing Tip', description: { en: ['Using **descriptive language** (strong adjectives, vivid verbs, and precise nouns) to vividly describe locations, food, and activities.'], vi: ['Hướng dẫn sử dụng **ngôn ngữ miêu tả** để miêu tả địa điểm, đồ ăn và hoạt động một cách sinh động.'] } },
                        { type: 'Writing', description: { en: ['Write a short tourist guide (100-120 words) about a destination in Vietnam.'], vi: ['Viết một hướng dẫn du lịch ngắn (100-120 từ) về một điểm đến đã thảo luận.'] } }
                    ],
                }
            ]
        },
        {
            id: 905,
            title: { en: 'Unit 5: Healthy Living', vi: 'Bài 5: Lối sống Khỏe mạnh' },
            lessons: [
                {
                    id: 90501,
                    title: {en: 'Lesson 1: Health Myths', vi: 'Bài học 1: Những lầm tưởng về sức khỏe'},
                    aims: {
                        en: ['Discuss health myths and expert advice', 'Use "suggest + gerund"'],
                        vi: ['Nói về các lầm tưởng sức khỏe và lời khuyên của bác sĩ', 'Sử dụng "suggest + gerund"'],
                    },
                    vocabulary: [
                        {term: 'nutrient', pronunciation: '/ˈnuːtriənt/', vietnamese: 'chất dinh dưỡng'},
                        {term: 'calorie', pronunciation: '/ˈkæləri/', vietnamese: 'calo'},
                        {term: 'fat', pronunciation: '/fæt/', vietnamese: 'chất béo'},
                        {term: 'organ', pronunciation: '/ˈɔːrɡən/', vietnamese: 'cơ quan'},
                        {term: 'bone', pronunciation: '/boʊn/', vietnamese: 'xương'},
                        {term: 'virus', pronunciation: '/ˈvaɪrəs/', vietnamese: 'vi-rút'},
                        {term: 'chemical', pronunciation: '/ˈkemɪkl/', vietnamese: 'hóa chất'},
                        {term: 'detox', pronunciation: '/ˈdiːtɑːks/', vietnamese: 'thải độc'},
                        { term: 'myth', pronunciation: '/mɪθ/', vietnamese: 'lầm tưởng' },
                        { term: 'harmful', pronunciation: '/ˈhɑːrmfl/', vietnamese: 'có hại' },
                        { term: 'harmless', pronunciation: '/ˈhɑːrmləs/', vietnamese: 'vô hại' },
                        { term: 'balanced diet', pronunciation: '/ˈbælənst ˈdaɪət/', vietnamese: 'chế độ ăn cân bằng' },
                        { term: 'metabolism', pronunciation: '/məˈtæbəlɪzəm/', vietnamese: 'sự chuyển hóa' },
                        { term: 'passive listening', pronunciation: '/ˈpæsɪv ˈlɪsnɪŋ/', vietnamese: 'lắng nghe thụ động' },
                        { term: 'coping mechanism', pronunciation: '/ˈkoʊpɪŋ ˈmekənɪzəm/', vietnamese: 'cơ chế đối phó' }
                    ],
                    grammar: [{
                        title: {en: '"Suggest + gerund"', vi: '"Suggest + gerund"'},
                        explanation: {en: ['We use **suggest** followed by a **gerund** (V-ing) to propose an action, often for advice.', 'The doctor **suggested exercising** regularly. I **suggest looking up** health myths.'], vi: ['Chúng ta dùng **suggest** theo sau là **danh động từ** (V-ing) để đề xuất một hành động, thường dùng để đưa ra lời khuyên.', 'Bác sĩ **đề nghị tập thể dục** thường xuyên. Tôi **đề nghị tra cứu** các lầm tưởng sức khỏe.']}
                    }],
                    activities: [
                        { type: 'Reading', description: { en: ['Read an article about common health myths and determine true/false/not mentioned statements.'], vi: ['Đọc một bài báo về các lầm tưởng sức khỏe và xác định các câu đúng/sai/không được đề cập.'] } },
                        { type: 'Speaking', description: { en: ['Discuss healthy advice received from parents, teachers, or doctors.'], vi: ['Thảo luận về các lời khuyên khỏe mạnh nhận được từ bố mẹ, thầy cô hoặc bác sĩ.'] } }
                    ]
                },
                {
                    id: 90502,
                    title: {en: 'Lesson 2: Teen Health Issues', vi: 'Bài học 2: Vấn đề sức khỏe của thanh thiếu niên'},
                    aims: {
                        en: ['Discuss health issues faced by teenagers', 'Use adverbial clauses/phrases of concession (although, though, despite, in spite of)'],
                        vi: ['Nói về các vấn đề sức khỏe của thanh thiếu niên', 'Sử dụng mệnh đề/cụm trạng từ nhượng bộ'],
                    },
                    vocabulary: [
                        {term: 'obese', pronunciation: '/oʊˈbiːs/', vietnamese: 'béo phì'},
                        {term: 'nourishing', pronunciation: '/ˈnɜːrɪʃɪŋ/', vietnamese: 'bổ dưỡng'},
                        {term: 'cafeteria', pronunciation: '/ˌkæfəˈtɪəriə/', vietnamese: 'căng-tin'},
                        {term: 'risk', pronunciation: '/rɪsk/', vietnamese: 'rủi ro'},
                        {term: 'promote', pronunciation: '/prəˈmoʊt/', vietnamese: 'thúc đẩy'},
                        {term: 'addicted', pronunciation: '/əˈdɪktɪd/', vietnamese: 'nghiện'},
                        {term: 'access', pronunciation: '/ˈækses/', vietnamese: 'tiếp cận'},
                        {term: 'maintain', pronunciation: '/meɪnˈteɪn/', vietnamese: 'duy trì'}
                    ],
                    grammar: [{
                        title: {en: 'Adverbial clauses/phrases of concession', vi: 'Mệnh đề/cụm trạng từ nhượng bộ'},
                        explanation: {en: ['We use **although/though** + clause and **despite/in spite of** + Noun/V-ing to express contrast or concession.', '**Although** she ate well, she still felt weak. **Despite** the advice, many teens eat junk food.'], vi: ['Chúng ta dùng **although/though** + mệnh đề và **despite/in spite of** + Danh từ/V-ing để diễn tả sự tương phản hoặc nhượng bộ.', '**Mặc dù** cô ấy ăn uống tốt, cô ấy vẫn cảm thấy yếu. **Bất chấp** lời khuyên, nhiều thanh thiếu niên vẫn ăn đồ ăn vặt.']}
                    }],
                    activities: [
                        { type: 'Listening', description: { en: ['Listen to a conversation about teen health issues and fill in the blanks.'], vi: ['Nghe một đoạn hội thoại về các vấn đề sức khỏe của thanh thiếu niên và điền từ vào chỗ trống.'] } },
                        { type: 'Speaking', description: { en: ['Discuss whether teenagers follow health advice and suggest solutions to promote healthy habits, practicing ending the discussion politely.'], vi: ['Thảo luận xem thanh thiếu niên có tuân thủ lời khuyên sức khỏe không và đưa ra giải pháp.'] } }
                    ]
                },
                {
                    id: 90503,
                    title: {en: 'Lesson 3: Writing a Summary', vi: 'Bài học 3: Kỹ năng Tóm tắt văn bản'},
                    aims: {
                        en: ['Summarize a text effectively', 'Use effective steps for summarizing'],
                        vi: ['Tóm tắt một văn bản', 'Sử dụng các bước tóm tắt hiệu quả'],
                    },
                    vocabulary: [
                        { term: 'summarize', pronunciation: '/ˈsʌməraɪz/', vietnamese: 'tóm tắt' },
                        { term: 'main idea', pronunciation: '/meɪn aɪˈdiːə/', vietnamese: 'ý chính' },
                        { term: 'supporting detail', pronunciation: '/səˈpɔːrtɪŋ ˈdiːteɪl/', vietnamese: 'chi tiết hỗ trợ' },
                        { term: 'paraphrase', pronunciation: '/ˈpærəfreɪz/', vietnamese: 'diễn giải' }
                    ],
                    grammar: [
                        { title: { en: 'Summarizing: linking words & structure', vi: 'Kỹ năng tóm tắt: từ nối & cấu trúc' }, explanation: { en: ['Steps to summarise: identify main ideas, group supporting details, paraphrase and use linking words (Firstly, In addition, Finally, To conclude).', 'Practice limiting direct copying: avoid using more than three consecutive words from the original text.'], vi: ['Các bước tóm tắt: xác định ý chính, gom các chi tiết hỗ trợ, diễn giải và dùng các từ nối (Đầu tiên, Thêm vào đó, Cuối cùng, Kết luận).', 'Luyện hạn chế sao chép trực tiếp: không dùng quá ba từ liên tiếp từ văn bản gốc.'] } }
                    ],
                    activities: [
                        { type: 'Reading', description: { en: ['Read a sample summary, answer comprehension questions and discuss.'], vi: ['Đọc một bản tóm tắt mẫu, trả lời câu hỏi và thảo luận.'] } },
                        { type: 'Writing Tip', description: { en: ['Guiding students through the steps of effective summarizing (highlighting main ideas, grouping details, paraphrasing).'], vi: ['Hướng dẫn các bước tóm tắt hiệu quả (gạch chân ý chính, phân nhóm, diễn giải).'] } },
                        { type: 'Writing', description: { en: ['Write a complete summary (100-120 words) based on a text from the textbook.'], vi: ['Viết một bản tóm tắt hoàn chỉnh (100-120 từ) dựa trên bài đọc.'] } }
                    ],
                }
            ]
        },
        {
            id: 906,
            title: { en: 'Unit 6: Natural Wonders', vi: 'Bài 6: Các Kỳ quan Thiên nhiên' },
            lessons: [
                {
                    id: 90601,
                    title: {en: 'Lesson 1: Natural Wonders', vi: 'Bài học 1: Các kỳ quan thiên nhiên'},
                    aims: {
                        en: ['Describe and compare natural wonders', 'Use comparative structures with intensifiers (a bit, much, far)'],
                        vi: ['Mô tả và so sánh các kỳ quan thiên nhiên', 'Sử dụng cấu trúc so sánh với các từ nhấn mạnh'],
                    },
                    vocabulary: [
                        {term: 'rainforest', pronunciation: '/ˈreɪnfɔːrɪst/', vietnamese: 'rừng nhiệt đới'},
                        {term: 'scenic', pronunciation: '/ˈsiːnɪk/', vietnamese: 'có phong cảnh đẹp'},
                        {term: 'Mount', pronunciation: '/maʊnt/', vietnamese: 'núi (ví dụ: Mount Everest)'},
                        {term: 'formation', pronunciation: '/fɔːrˈmeɪʃn/', vietnamese: 'sự hình thành/địa hình'},
                        {term: 'spectacular', pronunciation: '/spekˈtækjələr/', vietnamese: 'ngoạn mục'},
                        {term: 'outcrop', pronunciation: '/ˈaʊtkrɑːp/', vietnamese: 'vách đá lộ thiên'},
                        {term: 'accessible', pronunciation: '/əkˈsesəbl/', vietnamese: 'có thể tiếp cận'},
                        {term: 'summit', pronunciation: '/ˈsʌmɪt/', vietnamese: 'đỉnh (núi)'}
                    ],
                    grammar: [{
                        title: {en: 'Comparative structures with intensifiers', vi: 'Cấu trúc so sánh với các từ nhấn mạnh'},
                        explanation: {en: ['We use intensifiers (**a bit, much, far**) before comparative adjectives to show a small or large difference.', 'It is **much larger** than I thought. This cave is **a bit more accessible**.'], vi: ['Chúng ta dùng các từ nhấn mạnh (**a bit, much, far**) trước tính từ so sánh hơn để thể hiện sự khác biệt lớn hoặc nhỏ.', 'Nó **lớn hơn nhiều** so với tôi nghĩ. Hang động này **dễ tiếp cận hơn một chút**.' ]}
                    }],
                    activities: [
                        { type: 'Reading', description: { en: ['Read an article about famous caves and match descriptions to the correct caves.'], vi: ['Đọc một bài báo về các hang động nổi tiếng, ghép các mô tả với hang động tương ứng.'] } },
                        { type: 'Speaking', description: { en: ['Discuss and compare two given natural locations using comparative structures and intensifiers.'], vi: ['Thảo luận và so sánh hai địa điểm đã cho.'] } }
                    ]
                },
                {
                    id: 90602,
                    title: {en: 'Lesson 2: Protecting Natural Wonders', vi: 'Bài học 2: Bảo vệ các kỳ quan thiên nhiên'},
                    aims: {
                        en: ['Discuss ways to protect and conserve natural wonders', 'Use "verb + gerund"'],
                        vi: ['Thảo luận các cách bảo vệ và bảo tồn', 'Sử dụng "verb + gerund"'],
                    },
                    vocabulary: [
                        {term: 'litter', pronunciation: '/ˈlɪtər/', vietnamese: 'xả rác'},
                        {term: 'fine', pronunciation: '/faɪn/', vietnamese: 'tiền phạt'},
                        {term: 'consider', pronunciation: '/kənˈsɪdər/', vietnamese: 'cân nhắc'},
                        {term: 'spoil', pronunciation: '/spɔɪl/', vietnamese: 'làm hỏng'},
                        {term: 'disturb', pronunciation: '/dɪˈstɜːrb/', vietnamese: 'làm phiền'},
                        {term: 'hunt', pronunciation: '/hʌnt/', vietnamese: 'săn bắn'},
                        {term: 'ranger', pronunciation: '/ˈreɪndʒər/', vietnamese: 'kiểm lâm'},
                        {term: 'government', pronunciation: '/ˈɡʌvərnmənt/', vietnamese: 'chính phủ'}
                    ],
                    grammar: [{
                        title: {en: '"Verb + gerund"', vi: '"Verb + gerund"'},
                        explanation: {en: ['Reviewing common verbs that are followed by a **gerund** (V-ing), especially in the context of environment and rules (e.g., avoid, enjoy, finish, mind, suggest).', 'I **suggest putting** trash in the bin. They **avoid hunting** wildlife.'], vi: ['Ôn tập các động từ thường theo sau là **danh động từ** (V-ing), đặc biệt trong ngữ cảnh về môi trường và quy tắc.', 'Tôi **đề nghị bỏ** rác vào thùng. Họ **tránh săn bắn** động vật hoang dã.']}
                    }],
                    activities: [
                        { type: 'Listening', description: { en: ['Listen to a conversation about a problem at a park and identify the best solution.'], vi: ['Nghe đoạn hội thoại về một vấn đề ở công viên, xác định ý tưởng tốt nhất.'] } },
                        { type: 'Speaking', description: { en: ['Discuss your feelings about actions at natural wonders and suggest solutions, practicing politely disagreeing.'], vi: ['Thảo luận về các hành động tại các kỳ quan thiên nhiên và đưa ra giải pháp.'] } }
                    ]
                },
                {
                    id: 90603,
                    title: {en: 'Lesson 3: Writing an Article about a Natural Wonder', vi: 'Bài học 3: Kỹ năng Viết bài báo về kỳ quan thiên nhiên'},
                    aims: {
                        en: ['Write an article about a natural wonder', 'Use non-defining relative clauses'],
                        vi: ['Viết một bài báo về một kỳ quan thiên nhiên', 'Sử dụng mệnh đề quan hệ không xác định'],
                    },
                    vocabulary: [
                        { term: 'non-defining relative clause', pronunciation: '/ˌnɑːn dɪˈfaɪnɪŋ ˈrelətɪv ˌklɔːz/', vietnamese: 'mệnh đề quan hệ không xác định' },
                        { term: 'fascinating', pronunciation: '/ˈfæsɪneɪtɪŋ/', vietnamese: 'hấp dẫn' },
                        { term: 'remote', pronunciation: '/rɪˈmoʊt/', vietnamese: 'hẻo lánh' },
                        { term: 'explore', pronunciation: '/ɪkˈsplɔːr/', vietnamese: 'khám phá' }
                    ],
                    grammar: [{
                        title: {en: 'Non-defining relative clauses', vi: 'Mệnh đề quan hệ không xác định'},
                        explanation: {en: ['We use non-defining relative clauses to add extra, non-essential information about a noun. They are separated by commas.', 'Son Doong Cave, **which is the largest cave in the world**, is a spectacular sight.'], vi: ['Chúng ta dùng mệnh đề quan hệ không xác định để thêm thông tin phụ, không thiết yếu về một danh từ. Chúng được ngăn cách bằng dấu phẩy.', 'Hang Sơn Đoòng, **vốn là hang động lớn nhất thế giới**, là một cảnh tượng ngoạn mục.']}
                    }],
                    activities: [
                        { type: 'Reading', description: { en: ['Read an article about Son Doong Cave and answer comprehension questions.'], vi: ['Đọc bài báo về hang Sơn Đoòng, trả lời các câu hỏi.'] } },
                        { type: 'Writing Tip', description: { en: ['Using non-defining relative clauses to enrich the text with extra details.'], vi: ['Hướng dẫn sử dụng mệnh đề quan hệ không xác định để làm phong phú bài viết bằng các chi tiết phụ.'] } },
                        { type: 'Writing', description: { en: ['Write a complete article (100-120 words) about a chosen natural wonder.'], vi: ['Viết một bài báo hoàn chỉnh (100-120 từ) về một kỳ quan thiên nhiên.'] } }
                    ],
                }
            ]
        },
        {
            id: 907,
            title: { en: 'Unit 7: Urban Life', vi: 'Bài 7: Cuộc sống Đô thị' },
            lessons: [
                {
                    id: 90701,
                    title: {en: 'Lesson 1: City Problems and Solutions', vi: 'Bài học 1: Vấn đề và giải pháp ở thành phố'},
                    aims: {
                        en: ['Narrate a story about a city problem', 'Use the Past Continuous to set the scene'],
                        vi: ['Kể một câu chuyện và thảo luận về các vấn đề trong thành phố', 'Sử dụng Thì Quá khứ tiếp diễn để đặt ngữ cảnh'],
                    },
                    vocabulary: [
                        {term: 'traffic jam', pronunciation: '/ˈtræfɪk dʒæm/', vietnamese: 'tắc đường'},
                        {term: 'struggle', pronunciation: '/ˈstrʌɡl/', vietnamese: 'chật vật'},
                        {term: 'pedestrian', pronunciation: '/pəˈdestriən/', vietnamese: 'người đi bộ'},
                        {term: 'sidewalk', pronunciation: '/ˈsaɪdwɔːk/', vietnamese: 'vỉa hè'},
                        {term: 'crosswalk', pronunciation: '/ˈkrɔːswɔːk/', vietnamese: 'vạch sang đường'},
                        {term: 'accident', pronunciation: '/ˈæksɪdənt/', vietnamese: 'tai nạn'},
                        {term: 'public transportation', pronunciation: '/ˌpʌblɪk ˌtrænspɔːrˈteɪʃn/', vietnamese: 'giao thông công cộng'},
                        {term: 'ban', pronunciation: '/bæn/', vietnamese: 'cấm'}
                    ],
                    grammar: [{
                        title: {en: 'Past Continuous', vi: 'Thì Quá khứ tiếp diễn'},
                        explanation: {en: ['We use the **Past Continuous** (S + was/were + V-ing) to set the context or background action for a story.', 'I **was walking** to school when I saw a big traffic jam. It **was raining** heavily.'], vi: ['Chúng ta dùng **Thì Quá khứ tiếp diễn** (Chủ ngữ + was/were + V-ing) để đặt ngữ cảnh hoặc hành động nền cho một câu chuyện.', 'Tôi **đang đi bộ** đến trường thì thấy một vụ tắc đường lớn. Trời **đang mưa** to.'] }
                    }],
                    activities: [
                        { type: 'Reading', description: { en: ['Read a blog about creative solutions to city problems and fill in the blanks.'], vi: ['Đọc một bài blog về các giải pháp sáng tạo cho vấn đề thành phố, điền từ vào chỗ trống.'] } },
                        { type: 'Speaking', description: { en: ['Tell a story about a city problem you witnessed, including the issue and its solution.'], vi: ['Kể một câu chuyện về một sự kiện đã xảy ra, đưa ra vấn đề và giải pháp.'] } }
                    ]
                },
                {
                    id: 90702,
                    title: {en: 'Lesson 2: Future Impact of City Problems', vi: 'Bài học 2: Tác động trong tương lai của các vấn đề thành phố'},
                    aims: {
                        en: ['Describe city problems and their future impact', 'Use adverbial clauses of result (so...that and such...that)'],
                        vi: ['Mô tả các vấn đề và tác động trong tương lai', 'Sử dụng mệnh đề trạng từ chỉ kết quả'],
                    },
                    vocabulary: [
                        {term: 'rise', pronunciation: '/raɪz/', vietnamese: 'tăng lên'},
                        {term: 'drop', pronunciation: '/drɑːp/', vietnamese: 'giảm xuống'},
                        {term: 'homeless', pronunciation: '/ˈhoʊmləs/', vietnamese: 'vô gia cư'},
                        {term: 'owner', pronunciation: '/ˈoʊnər/', vietnamese: 'chủ sở hữu'},
                        {term: 'attract', pronunciation: '/əˈtrækt/', vietnamese: 'thu hút'},
                        {term: 'direct', pronunciation: '/dəˈrekt/', vietnamese: 'trực tiếp'},
                        {term: 'crop', pronunciation: '/krɑːp/', vietnamese: 'mùa màng'},
                        {term: 'congested', pronunciation: '/kənˈdʒestɪd/', vietnamese: 'tắc nghẽn'}
                    ],
                    grammar: [{
                        title: {en: 'Adverbial clauses of result (so...that and such...that)', vi: 'Mệnh đề trạng từ chỉ kết quả'},
                        explanation: {en: ['We use **so...that** and **such...that** to show the result of a particular quality or state.', 'The city is **so polluted that** people are getting sick. There is **such heavy traffic that** nobody can move.'], vi: ['Chúng ta dùng **so...that** và **such...that** để chỉ kết quả của một phẩm chất hoặc trạng thái cụ thể.', 'Thành phố **ô nhiễm đến mức** mọi người bị bệnh. Có **tắc đường nặng đến mức** không ai di chuyển được.'] }
                    }],
                    activities: [
                        { type: 'Listening', description: { en: ['Listen to a conversation about a presentation on city problems, fill in the blanks, and practice asking for clarification.'], vi: ['Nghe một đoạn hội thoại về một bài thuyết trình, điền từ vào chỗ trống và luyện kỹ năng hỏi để làm rõ.'] } },
                        { type: 'Speaking', description: { en: ['Discuss city problems and predict their future consequences, using clauses of result.'], vi: ['Thảo luận về các vấn đề trong thành phố và dự đoán kết quả trong tương lai.'] } }
                    ]
                },
                {
                    id: 90703,
                    title: {en: 'Lesson 3: Writing a Problem and Solution Paragraph', vi: 'Bài học 3: Kỹ năng Viết đoạn văn về vấn đề và giải pháp'},
                    aims: {
                        en: ['Write a problem and solution paragraph about city issues', 'Use a clear problem-solution structure'],
                        vi: ['Viết một đoạn văn về các vấn đề của một thành phố và giải pháp', 'Sử dụng cấu trúc vấn đề-giải pháp rõ ràng'],
                    },
                    vocabulary: [
                        { term: 'overcrowding', pronunciation: '/ˌoʊvərˈkraʊdɪŋ/', vietnamese: 'quá tải dân số' },
                        { term: 'infrastructure', pronunciation: '/ˈɪnfrəstrʌktʃər/', vietnamese: 'cơ sở hạ tầng' },
                        { term: 'consequence', pronunciation: '/ˈkɑːnsəkwens/', vietnamese: 'hậu quả' },
                        { term: 'solution', pronunciation: '/səˈluːʃn/', vietnamese: 'giải pháp' }
                    ],
                    grammar: [],
                    activities: [
                        { type: 'Reading', description: { en: ['Read a problem and solution paragraph (e.g., about Johannesburg) and identify its structure.'], vi: ['Đọc đoạn văn về thành phố Johannesburg và xác định các phần trong đoạn văn mẫu.'] } },
                        { type: 'Writing Tip', description: { en: ['Guiding students on how to write a clear problem-solution paragraph (introducing the problem, discussing consequences, presenting solutions).'], vi: ['Hướng dẫn cách viết đoạn văn về chuỗi vấn đề giải pháp.'] } },
                        { type: 'Writing', description: { en: ['Write a complete paragraph (100-120 words) about the problems and solutions for a chosen city.'], vi: ['Viết một đoạn văn hoàn chỉnh (100-120 từ) về các vấn đề và giải pháp cho một thành phố.'] } }
                    ],
                }
            ]
        },
        {
            id: 908,
            title: { en: 'Unit 8: Jobs in the Future', vi: 'Bài 8: Các Công việc trong Tương lai' },
            lessons: [
                {
                    id: 90801,
                    title: {en: 'Lesson 1: Future Job Search', vi: 'Bài học 1: Cách tìm việc trong tương lai'},
                    aims: {
                        en: ['Discuss how to get future jobs', 'Use the First Conditional with modals (can, could, should, must, may, might)'],
                        vi: ['Nói về cách để có được các công việc đó', 'Sử dụng câu điều kiện loại 1 với động từ khiếm khuyết'],
                    },
                    vocabulary: [
                        {term: 'plumber', pronunciation: '/ˈplʌmər/', vietnamese: 'thợ sửa ống nước'},
                        {term: 'mechanic', pronunciation: '/mɪˈkænɪk/', vietnamese: 'thợ máy'},
                        {term: 'psychologist', pronunciation: '/saɪˈkɑːlədʒɪst/', vietnamese: 'nhà tâm lý học'},
                        {term: 'skincare specialist', pronunciation: '/ˈskɪnker ˈspeʃəlɪst/', vietnamese: 'chuyên gia chăm sóc da'},
                        {term: 'tutor', pronunciation: '/ˈtuːtər/', vietnamese: 'gia sư'},
                        {term: 'apprenticeship', pronunciation: '/əˈprentɪʃɪp/', vietnamese: 'việc học nghề'},
                        {term: 'research', pronunciation: '/rɪˈsɜːrtʃ/', vietnamese: 'nghiên cứu'}
                    ],
                    grammar: [{
                        title: {en: 'First Conditional with modals', vi: 'Câu điều kiện loại 1 với động từ khiếm khuyết'},
                        explanation: {en: ['We use the First Conditional (If + Present Simple, S + modal + V) to give advice, express possibility, or suggest necessity for a future outcome.', 'If you **study** hard, you **can get** a good job. If you **want** a job, you **must apply**.'], vi: ['Chúng ta dùng Câu điều kiện loại 1 (If + Hiện tại đơn, Chủ ngữ + động từ khiếm khuyết + V) để đưa ra lời khuyên, bày tỏ khả năng hoặc gợi ý sự cần thiết cho một kết quả tương lai.', 'Nếu bạn **học** chăm chỉ, bạn **có thể có** một công việc tốt. Nếu bạn **muốn** có việc, bạn **phải nộp đơn**.' ]}
                    }],
                    activities: [
                        { type: 'Listening', description: { en: ['Listen to a conversation about future jobs and answer comprehension questions, practicing expressing thanks.'], vi: ['Nghe một đoạn hội thoại về các công việc tương lai, trả lời câu hỏi và luyện kỹ năng bày tỏ sự cảm ơn.'] } },
                        { type: 'Speaking', description: { en: ['Give advice and suggestions for future jobs using the conditional structure.'], vi: ['Đưa ra lời khuyên và gợi ý cho các công việc trong tương lai.'] } }
                    ]
                },
                {
                    id: 90802,
                    title: {en: 'Lesson 2: Media and Entertainment Jobs', vi: 'Bài học 2: Công việc trong ngành truyền thông giải trí'},
                    aims: {
                        en: ['Discuss jobs in the media and entertainment industry', 'Use "verb + to-infinitive" to talk about future changes'],
                        vi: ['Nói về các loại công việc này', 'Sử dụng "verb + to-infinitive" để nói về những thay đổi trong tương lai'],
                    },
                    vocabulary: [
                        {term: 'innovation', pronunciation: '/ˌɪnəˈveɪʃn/', vietnamese: 'sự đổi mới'},
                        {term: 'personalized', pronunciation: '/ˈpɜːrsənəlaɪzd/', vietnamese: 'cá nhân hóa'},
                        {term: 'video producer', pronunciation: '/ˈvɪdioʊ prəˈduːsər/', vietnamese: 'nhà sản xuất video'},
                        {term: 'podcast', pronunciation: '/ˈpɑːdkæst/', vietnamese: 'chương trình phát thanh kỹ thuật số'},
                        {term: 'demand', pronunciation: '/dɪˈmænd/', vietnamese: 'nhu cầu'},
                        {term: 'virtual reality', pronunciation: '/ˈvɜːrtʃuəl riˈæləti/', vietnamese: 'thực tế ảo'},
                        {term: 'media', pronunciation: '/ˈmiːdiə/', vietnamese: 'truyền thông'},
                        {term: 'audience', pronunciation: '/ˈɔːdiəns/', vietnamese: 'khán giả/người xem'}
                    ],
                    grammar: [{
                        title: {en: '"Verb + to-infinitive"', vi: '"Verb + to-infinitive"'},
                        explanation: {en: ['Reviewing verbs followed by a **to-infinitive** (e.g., hope, plan, expect, decide) to talk about future plans or expectations.', 'I **hope to become** a video producer. We **expect to see** more virtual reality.'], vi: ['Ôn tập các động từ theo sau là **to-infinitive** (ví dụ: hope, plan, expect, decide) để nói về kế hoạch hoặc kỳ vọng trong tương lai.', 'Tôi **hy vọng trở thành** nhà sản xuất video. Chúng tôi **kỳ vọng thấy** nhiều thực tế ảo hơn.'] }
                    }],
                    activities: [
                        { type: 'Reading', description: { en: ['Read an article about jobs in the media and entertainment industry and answer comprehension questions.'], vi: ['Đọc bài báo về công việc trong ngành truyền thông giải trí, trả lời các câu hỏi.'] } },
                        { type: 'Speaking', description: { en: ['Discuss jobs you would like to do in media and what you expect from future media products.'], vi: ['Thảo luận về các công việc bạn muốn làm trong ngành truyền thông và những gì bạn mong đợi ở các sản phẩm truyền thông tương lai.'] } }
                    ]
                },
                {
                    id: 90803,
                    title: {en: 'Lesson 3: Writing an Article about Popular Future Jobs', vi: 'Bài học 3: Kỹ năng Viết bài báo về công việc phổ biến trong tương lai'},
                    aims: {
                        en: ['Write an article about popular future jobs', 'Use phrases to highlight important ideas and information'],
                        vi: ['Viết một bài báo về các công việc sẽ phổ biến trong tương lai', 'Sử dụng các cụm từ để nhấn mạnh các ý tưởng và thông tin quan trọng'],
                    },
                    vocabulary: [
                        { term: 'in particular', pronunciation: '/ɪn pərˈtɪkjələr/', vietnamese: 'đặc biệt là' },
                        { term: 'especially', pronunciation: '/ɪˈspeʃəli/', vietnamese: 'đặc biệt' },
                        { term: 'mainly', pronunciation: '/ˈmeɪnli/', vietnamese: 'chủ yếu' },
                        { term: 'trend', pronunciation: '/trend/', vietnamese: 'xu hướng' }
                    ],
                    grammar: [],
                    activities: [
                        { type: 'Reading', description: { en: ['Read an article about future jobs and answer comprehension questions.'], vi: ['Đọc bài báo về các công việc trong tương lai, trả lời câu hỏi.'] } },
                        { type: 'Writing Tip', description: { en: ['Using highlighting phrases (**in particular, especially, mainly**) to draw attention to important points in an article.'], vi: ['Hướng dẫn cách sử dụng các cụm từ nhấn mạnh (**in particular, especially, mainly**) để làm nổi bật các ý tưởng và thông tin quan trọng.'] } },
                        { type: 'Writing', description: { en: ['Write a complete article (100-120 words) about the most popular future jobs and the reasons why.'], vi: ['Viết một bài báo hoàn chỉnh (100-120 từ) về các công việc sẽ phổ biến trong tương lai và lý do.'] } }
                    ],
                }
            ]
        }
    ],
    // Append merged curriculum summary lessons (Parts A,B,C) as final unit (id:909)
};

// NOTE: The data model expects units inside sw9Data.units. We will append a summary unit dynamically
// below by mutating the exported object so it's discoverable both as a standalone export and inside sw9Data.
const summaryUnit = {
    id: 909,
    title: { en: 'Summary: Core Grammar & Integrated Practice', vi: 'Tổng hợp: Ngữ pháp & Luyện tập tích hợp' },
    lessons: [
        {
            id: 90901,
            title: { en: 'Part A: Core Grammar & Advanced Vocabulary', vi: 'Phần A: Ngữ pháp cốt lõi & Từ vựng nâng cao' },
            aims: { en: ['Review core grammar points across Units 1-8', 'Present advanced vocabulary lists by topic'], vi: ['Ôn lại các điểm ngữ pháp chính trong toàn khóa', 'Trình bày danh sách từ vựng nâng cao theo chủ đề'] },
            vocabulary: [
                { term: 'look up', pronunciation: '/lʊk ʌp/', vietnamese: 'tra cứu (từ)' },
                { term: 'immersive learning', pronunciation: '/ɪˈmɜːrsɪv ˈlɜːrnɪŋ/', vietnamese: 'học thẩm thấu' },
                { term: 'generational gap', pronunciation: '/ˌdʒɛnəˈreɪʃən ɡæp/', vietnamese: 'khoảng cách thế hệ' },
                { term: 'biometric access', pronunciation: '/baɪəˈmetrɪk ˈæksɛs/', vietnamese: 'truy cập sinh trắc học' },
                { term: 'cultural sensitivity', pronunciation: '/ˈkʌltʃərəl sənsɪˈtɪvɪti/', vietnamese: 'nhạy cảm văn hóa' },
                { term: 'itinerary', pronunciation: '/aɪˈtɪnərəri/', vietnamese: 'hành trình' },
                { term: 'detox', pronunciation: '/ˈdiːtɑːks/', vietnamese: 'thải độc' }
            ],
            grammar: [
                { title: { en: 'To-infinitives for purpose & Phrasal Verbs', vi: 'To-infinitive cho mục đích & Cụm động từ' }, explanation: { en: ['Review use across contexts.'], vi: ['Ôn tập cách dùng trong nhiều ngữ cảnh.'] } },
                { title: { en: 'Would / Used to / Past structures', vi: 'Would / Used to / Các thì quá khứ' }, explanation: { en: ['Compare usage for habits and states in the past across Units 2 and 7.'], vi: ['So sánh cách dùng cho thói quen và trạng thái trong quá khứ.'] } }
            ],
            activities: [ { type: 'Review', description: { en: ['Teacher-led review and matching exercises for grammar and vocabulary.'], vi: ['Ôn tập có hướng dẫn và các bài tập ghép từ/ghép ý.'] } } ]
        },
        {
            id: 90902,
            title: { en: 'Part B: Integrated Speaking & Grammar Synthesis', vi: 'Phần B: Luyện nói tích hợp & Tổng hợp ngữ pháp' },
            aims: { en: ['Clause synthesis, sentence transformation and advanced gap-fill exercises'], vi: ['Tổng hợp mệnh đề, chuyển đổi câu và bài tập nâng cao điền chỗ trống'] },
            vocabulary: [],
            grammar: [],
            activities: [ { type: 'Activity', description: { en: ['Clause Synthesis (combine sentences using relative clauses, result clauses, time clauses and reason clauses).'], vi: ['Kết hợp mệnh đề (dùng mệnh đề quan hệ, mệnh đề kết quả, mệnh đề thời gian và mệnh đề lý do).'] } } ]
        },
        {
            id: 90903,
            title: { en: 'Part C: Integrated Writing & Speaking Tasks', vi: 'Phần C: Viết & Nói tích hợp' },
            aims: { en: ['Integrated writing assignments and speaking role-plays that combine Units 3,4,6 and 8 skills'], vi: ['Bài viết và đóng vai tích hợp các kỹ năng từ nhiều Unit'] },
            vocabulary: [],
            grammar: [],
            activities: [ { type: 'Assessment', description: { en: ['Opinion article, Travel guide and Future Jobs writing tasks with peer review.'], vi: ['Bài viết quan điểm, hướng dẫn du lịch và việc làm tương lai kèm phản biện bạn cùng lớp.'] } } ]
        }
    ]
};

// Append to sw9Data.units if not present
try {
    // @ts-ignore - mutate exported object for convenience
    const s: any = (exports as any).sw9Data;
    if (s && Array.isArray(s.units)) {
        s.units.push(summaryUnit as any);
    }
} catch (e) {
    // safe noop
}


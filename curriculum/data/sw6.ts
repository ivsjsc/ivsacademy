import { CurriculumLevel } from '../types';

export const sw6Data: CurriculumLevel = {
    level: 6,
    title: { en: 'i-Learn Smart World 6', vi: 'i-Learn Smart World 6' },
    subtitle: { en: 'Secondary School - Grade 6', vi: 'Trung học cơ sở - Lớp 6' },
    ebookPdfUrl: 'https://drive.google.com/file/d/1d2FOa20bf6nNhl3cASbnlgwSWcWIqX_u/view?usp=drive_link',
    units: [
      {
        id: 601,
        title: { en: 'Unit 1: Home', vi: 'Bài 1: Nhà cửa' },
        lessons: [
          {
            id: 60101,
            title: { en: 'Lesson 1: My Home', vi: 'Bài học 1: Nhà của tôi' },
            aims: {
              en: ['Ask about people\'s homes', 'Use the Present Simple with Yes/No questions', 'Use the conversation skill of getting someone\'s attention'],
              vi: ['Hỏi về nhà của mọi người', 'Sử dụng thì Hiện tại đơn với câu hỏi Yes/No', 'Sử dụng kỹ năng hội thoại để thu hút sự chú ý'],
            },
            vocabulary: [
              { term: 'pool', pronunciation: '/puːl/', vietnamese: 'hồ bơi' },
              { term: 'balcony', pronunciation: '/ˈbælkəni/', vietnamese: 'ban công' },
              { term: 'garage', pronunciation: '/ɡəˈrɑːʒ/', vietnamese: 'nhà để xe' },
              { term: 'yard', pronunciation: '/jɑːrd/', vietnamese: 'sân' },
              { term: 'gym', pronunciation: '/dʒɪm/', vietnamese: 'phòng tập thể dục' },
              { term: 'apartment', pronunciation: '/əˈpɑːrtmənt/', vietnamese: 'căn hộ' },
            ],
            grammar: [
              { title: { en: 'Present Simple', vi: 'Thì Hiện tại đơn' }, explanation: { en: ['We use the Present Simple to talk about things that are facts or are true for a long time.', 'I/You/We/They live in an apartment.', 'He/She/It lives in a house.', 'Do you live in a house? (Yes, I do./No, I don\'t.)', 'Does she live in a house? (Yes, she does./No, she doesn\'t.)'], vi: ['Chúng ta dùng thì Hiện tại đơn để nói về những sự thật hoặc những điều đúng trong một thời gian dài.', 'Tôi/Bạn/Chúng tôi/Họ sống trong một căn hộ.', 'Anh ấy/Cô ấy/Nó sống trong một ngôi nhà.', 'Bạn có sống trong một ngôi nhà không? (Có./Không.)', 'Cô ấy có sống trong một ngôi nhà không? (Có./Không.)'] } },
            ],
            activities: [
              { type: 'Conversation Skill', description: { en: ["Getting someone's attention: 'Excuse me.'"], vi: ["Thu hút sự chú ý của ai đó: 'Xin lỗi.'"]}},
              { type: 'Practice', description: { en: ['Work in pairs. Ask your partner questions about their home using "Do you live in...?" and "Does your house have...?"'], vi: ['Làm việc theo cặp. Hỏi bạn của bạn về nhà của họ, sử dụng "Do you live in...?" và "Does your house have...?"']}}
            ],
          },
          {
            id: 60102,
            title: { en: 'Lesson 2: Housework', vi: 'Bài học 2: Việc nhà' },
            aims: {
                en: ['Talk about family members and housework', 'Use the Present Simple with Wh-questions'],
                vi: ['Nói về các thành viên trong gia đình và công việc nhà', 'Sử dụng thì Hiện tại đơn với câu hỏi Wh-'],
            },
            vocabulary: [
                { term: 'do the laundry', pronunciation: '/duː ðə ˈlɔːndri/', vietnamese: 'giặt giũ' },
                { term: 'make dinner', pronunciation: '/meɪk ˈdɪnər/', vietnamese: 'nấu bữa tối' },
                { term: 'make the bed', pronunciation: '/meɪk ðə bed/', vietnamese: 'dọn giường' },
                { term: 'do the shopping', pronunciation: '/duː ðə ˈʃɑːpɪŋ/', vietnamese: 'đi mua sắm' },
                { term: 'do the dishes', pronunciation: '/duː ðə ˈdɪʃɪz/', vietnamese: 'rửa chén' },
                { term: 'clean the kitchen', pronunciation: '/kliːn ðə ˈkɪtʃɪn/', vietnamese: 'dọn dẹp nhà bếp' },
            ],
            grammar: [
                { title: { en: 'Present Simple with Wh-questions', vi: 'Thì Hiện tại đơn với câu hỏi Wh-' }, explanation: { en: ['What housework do you do? - I make breakfast.', 'Who does the dishes? - My sister does.'], vi: ['Bạn làm công việc nhà gì? - Tôi làm bữa sáng.', 'Ai rửa chén? - Chị tôi rửa.'] } },
                { title: { en: "Possessive 's", vi: 'Sở hữu cách \'s' }, explanation: { en: ['You can add \'s onto a noun or proper noun to show possession.', 'E.g., Ken\'s father cleans the kitchen.'], vi: ['Bạn có thể thêm \'s vào sau một danh từ hoặc danh từ riêng để thể hiện sự sở hữu.', 'Ví dụ: Bố của Ken dọn dẹp nhà bếp.'] } },
            ],
            activities: [
              { type: 'Pronunciation', description: { en: ['Focus on the /ɪ/ sound in words like "dishes" and "live".'], vi: ['Tập trung vào âm /ɪ/ trong các từ như "dishes" và "live".']}},
              { type: 'Speaking', description: { en: ["Survey housework your family members do."], vi: ["Khảo sát công việc nhà các thành viên trong gia đình bạn làm."]}},
            ],
          },
          {
            id: 60103,
            title: { en: 'Lesson 3: Geography', vi: 'Bài học 3: Địa lý' },
            aims: {
                en: ['Ask about villages, towns, and cities', 'Read a paragraph about a city in Vietnam', 'Write a paragraph about your hometown'],
                vi: ['Hỏi về làng, thị trấn và thành phố', 'Đọc một đoạn văn về một thành phố ở Việt Nam', 'Viết một đoạn văn về quê hương của bạn'],
            },
            vocabulary: [
                { term: 'south', pronunciation: '/saʊθ/', vietnamese: 'phía nam' },
                { term: 'west', pronunciation: '/west/', vietnamese: 'phía tây' },
                { term: 'north', pronunciation: '/nɔːrθ/', vietnamese: 'phía bắc' },
                { term: 'east', pronunciation: '/iːst/', vietnamese: 'phía đông' },
                { term: 'center', pronunciation: '/ˈsentər/', vietnamese: 'trung tâm' },
                { term: 'village', pronunciation: '/ˈvɪlɪdʒ/', vietnamese: 'làng' },
                { term: 'town', pronunciation: '/taʊn/', vietnamese: 'thị trấn' },
                { term: 'city', pronunciation: '/ˈsɪti/', vietnamese: 'thành phố' },
            ],
            grammar: [],
            activities: [
              { type: 'Useful Language', description: { en: ["Where's Vancouver? It's in the west of Canada. What's it famous for? It's famous for its big buildings and beautiful parks."], vi: ["Vancouver ở đâu? Nó ở phía tây Canada. Nó nổi tiếng vì điều gì? Nó nổi tiếng với những tòa nhà lớn và công viên đẹp."]}},
              { type: 'Writing', description: { en: ['Fill in notes about your hometown and then write a 40-50 word paragraph.'], vi: ['Điền vào ghi chú về quê hương của bạn và sau đó viết một đoạn văn 40-50 từ.']}}
            ],
          }
        ],
      },
      {
        id: 602,
        title: { en: 'Unit 2: School', vi: 'Bài 2: Trường học' },
        lessons: [
            {
                id: 60201,
                title: { en: 'Lesson 1: Subjects', vi: 'Bài học 1: Môn học' },
                aims: {
                    en: ["Talk about school subjects you like or don't like", "Use 'and' and 'or' for positive and negative statements", 'Use Possessive Pronouns'],
                    vi: ['Nói về các môn học bạn thích hoặc không thích', 'Sử dụng "and" và "or" cho câu khẳng định và phủ định', 'Sử dụng Đại từ sở hữu'],
                },
                vocabulary: [
                    { term: 'history', pronunciation: '/ˈhɪstəri/', vietnamese: 'lịch sử' },
                    { term: 'P.E. (physical education)', pronunciation: '/ˌpiː ˈiː/', vietnamese: 'thể dục' },
                    { term: 'I.T. (information technology)', pronunciation: '/ˌaɪ ˈtiː/', vietnamese: 'tin học' },
                    { term: 'music', pronunciation: '/ˈmjuːzɪk/', vietnamese: 'âm nhạc' },
                    { term: 'geography', pronunciation: '/dʒiˈɑːɡrəfi/', vietnamese: 'địa lý' },
                    { term: 'literature', pronunciation: '/ˈlɪtərətʃər/', vietnamese: 'văn học' },
                    { term: 'physics', pronunciation: '/ˈfɪzɪks/', vietnamese: 'vật lý' },
                    { term: 'biology', pronunciation: '/baɪˈɑːlədʒi/', vietnamese: 'sinh học' },
                ],
                grammar: [
                    { title: { en: "Using 'and' / 'or'", vi: 'Sử dụng "and" / "or"' }, explanation: { en: ["Use 'and' to join two or more nouns in a positive sentence. (I like math and biology.)", "Use 'or' to join two or more nouns in a negative sentence. (I don't like math or biology.)"], vi: ['Sử dụng "and" để nối hai hoặc nhiều danh từ trong câu khẳng định. (Tôi thích toán và sinh học.)', 'Sử dụng "or" để nối hai hoặc nhiều danh từ trong câu phủ định. (Tôi không thích toán hay sinh học.)'] } },
                    { title: { en: "Possessive Pronouns", vi: 'Đại từ sở hữu' }, explanation: { en: ["Use possessive pronouns (mine/yours) so we don't say the same words again. (My favorite subject's physics. What's yours?)"], vi: ['Sử dụng đại từ sở hữu (của tôi/của bạn) để không phải lặp lại từ. (Môn học yêu thích của tôi là vật lý. Của bạn là gì?)'] } },
                ],
                activities: [
                  { type: 'Conversation Skill', description: { en: ["Passing your turn: 'How about you?', 'What do you think?'"], vi: ["Chuyển lượt của bạn: 'Còn bạn thì sao?', 'Bạn nghĩ gì?'"]}},
                  { type: 'Pronunciation', description: { en: ['Intonation for lists goes up, up, then down.'], vi: ['Ngữ điệu cho danh sách đi lên, lên, rồi xuống.']}}
                ],
            },
            {
                id: 60202,
                title: { en: 'Lesson 2: School Clubs', vi: 'Bài học 2: Câu lạc bộ ở trường' },
                aims: {
                    en: ['Talk about school activities', 'Use "like + verb-ing"'],
                    vi: ['Nói về các hoạt động ở trường', 'Sử dụng "like + động từ-ing"'],
                },
                vocabulary: [
                    { term: 'indoor activities', pronunciation: '/ˈɪndɔːr ækˈtɪvətiz/', vietnamese: 'hoạt động trong nhà' },
                    { term: 'outdoor activities', pronunciation: '/ˈaʊtdɔːr ækˈtɪvətiz/', vietnamese: 'hoạt động ngoài trời' },
                    { term: 'arts and crafts', pronunciation: '/ɑːrts ænd kræfts/', vietnamese: 'nghệ thuật và thủ công' },
                    { term: 'drama club', pronunciation: '/ˈdrɑːmə klʌb/', vietnamese: 'câu lạc bộ kịch' },
                    { term: 'sign up', pronunciation: '/saɪn ʌp/', vietnamese: 'đăng ký' },
                ],
                grammar: [
                    { title: { en: 'like + verb-ing', vi: 'like + động từ-ing' }, explanation: { en: ["We use like + verb-ing to talk about things we like to do often. (Do you like reading books?)", "Spelling rules: making, swimming, playing"], vi: ['Chúng ta sử dụng like + động từ-ing để nói về những việc chúng ta thích làm thường xuyên. (Bạn có thích đọc sách không?)', 'Quy tắc chính tả: making, swimming, playing'] } },
                ],
                activities: [
                    { type: 'Pronunciation', description: { en: ['Intonation for positive answers goes up. Intonation for negative answers goes down.'], vi: ['Ngữ điệu cho câu trả lời khẳng định đi lên. Ngữ điệu cho câu trả lời phủ định đi xuống.']}},
                    { type: 'Speaking', description: { en: ['Discuss which club to join for the next school year.'], vi: ['Thảo luận về việc tham gia câu lạc bộ nào cho năm học tới.']}}
                ],
            },
            {
                id: 60203,
                title: { en: 'Lesson 3: Literature', vi: 'Bài học 3: Văn học' },
                aims: {
                    en: ['Talk about different kinds of books', 'Read a book review about a Vietnamese book', 'Write a book review'],
                    vi: ['Nói về các loại sách khác nhau', 'Đọc bài bình luận về một cuốn sách Việt Nam', 'Viết một bài bình luận sách'],
                },
                vocabulary: [
                    { term: 'fantasy', pronunciation: '/ˈfæntəsi/', vietnamese: 'truyện giả tưởng' },
                    { term: 'novel', pronunciation: '/ˈnɑːvl/', vietnamese: 'tiểu thuyết' },
                    { term: 'adventure', pronunciation: '/ədˈventʃər/', vietnamese: 'phiêu lưu' },
                    { term: 'mystery', pronunciation: '/ˈmɪstəri/', vietnamese: 'bí ẩn' },
                    { term: 'author', pronunciation: '/ˈɔːθər/', vietnamese: 'tác giả' },
                ],
                grammar: [],
                activities: [
                    { type: 'Useful Language', description: { en: ["What's your favorite book? I like Harry Potter. What kind of book is it? It's a fantasy novel."], vi: ["Cuốn sách yêu thích của bạn là gì? Tôi thích Harry Potter. Đó là loại sách gì? Đó là một cuốn tiểu thuyết giả tưởng."]}},
                    { type: 'Writing Tip', description: { en: ['Punctuation: Use capital letters at the beginning of all sentences, for names of people, places, books, etc., for the subject pronoun "I", and for days and months.'], vi: ['Dấu câu: Sử dụng chữ in hoa ở đầu tất cả các câu, cho tên người, địa điểm, sách, v.v., cho đại từ chủ ngữ "I", và cho các ngày và tháng.']}}
                ],
            }
        ],
      },
      {
        id: 603,
        title: { en: 'Unit 3: Friends', vi: 'Bài 3: Bạn bè' },
        lessons: [
            {
                id: 60301,
                title: { en: 'Lesson 1: Appearance', vi: 'Bài học 1: Ngoại hình' },
                aims: {
                    en: ["Describe someone's personal appearance", "Use the Present Simple and the Present Continuous", "End a friendly conversation"],
                    vi: ['Miêu tả ngoại hình của một người', 'Sử dụng thì Hiện tại đơn và Hiện tại tiếp diễn', 'Kết thúc một cuộc trò chuyện thân mật'],
                },
                vocabulary: [
                    { term: 'tall', pronunciation: '/tɔːl/', vietnamese: 'cao' },
                    { term: 'blue', pronunciation: '/bluː/', vietnamese: 'màu xanh da trời' },
                    { term: 'long', pronunciation: '/lɔːŋ/', vietnamese: 'dài' },
                    { term: 'glasses', pronunciation: '/ˈɡlæsɪz/', vietnamese: 'kính' },
                    { term: 'red', pronunciation: '/red/', vietnamese: 'màu đỏ' },
                    { term: 'blond', pronunciation: '/blɑːnd/', vietnamese: 'vàng hoe (tóc)' },
                    { term: 'slim', pronunciation: '/slɪm/', vietnamese: 'mảnh khảnh' },
                    { term: 'short', pronunciation: '/ʃɔːrt/', vietnamese: 'ngắn, thấp' },
                ],
                grammar: [
                    { title: { en: 'Present Continuous', vi: 'Thì Hiện tại tiếp diễn' }, explanation: { en: ["We use the Present Continuous to talk about ongoing actions. We use the verb be + verb-ing.", "I am wearing a green dress.", "He/She is wearing a yellow shirt.", "What are you wearing? Is she wearing glasses? (Yes, she is./No, she isn't.)"], vi: ['Chúng ta dùng thì Hiện tại tiếp diễn để nói về các hành động đang diễn ra. Chúng ta dùng động từ be + động từ-ing.', 'Tôi đang mặc một chiếc váy màu xanh.', 'Anh ấy/Cô ấy đang mặc một chiếc áo sơ mi màu vàng.', 'Bạn đang mặc gì? Cô ấy có đang đeo kính không? (Có./Không.)'] } },
                ],
                activities: [
                    { type: 'Conversation Skill', description: { en: ["Ending a friendly conversation: 'See you soon.', 'Talk to you later.'"], vi: ["Kết thúc một cuộc trò chuyện thân mật: 'Hẹn gặp lại.', 'Nói chuyện sau nhé.'"]}},
                    { type: 'Pronunciation', description: { en: ['Focus on the /bl/ sound in words like "black", "blond", "blue".'], vi: ['Tập trung vào âm /bl/ trong các từ như "black", "blond", "blue".']}}
                ],
            },
            {
                id: 60302,
                title: { en: 'Lesson 2: Activities', vi: 'Bài học 2: Hoạt động' },
                aims: {
                    en: ['Invite someone to do an activity', 'Use the Present Continuous for future use'],
                    vi: ['Mời ai đó làm một hoạt động', 'Sử dụng thì Hiện tại tiếp diễn cho tương lai'],
                },
                vocabulary: [
                    { term: 'go shopping', pronunciation: '/ɡoʊ ˈʃɑːpɪŋ/', vietnamese: 'đi mua sắm' },
                    { term: 'have a movie', pronunciation: '/hæv ə ˈmuːvi/', vietnamese: 'xem phim' },
                    { term: 'have a party', pronunciation: '/hæv ə ˈpɑːrti/', vietnamese: 'tổ chức tiệc' },
                    { term: 'go swimming', pronunciation: '/ɡoʊ ˈswɪmɪŋ/', vietnamese: 'đi bơi' },
                    { term: 'play badminton', pronunciation: '/pleɪ ˈbædmɪntən/', vietnamese: 'chơi cầu lông' },
                    { term: 'make a cake', pronunciation: '/meɪk ə keɪk/', vietnamese: 'làm bánh' },
                ],
                grammar: [
                    { title: { en: 'Present Continuous for future', vi: 'Thì Hiện tại tiếp diễn cho tương lai' }, explanation: { en: ["We can use the Present Continuous tense for fixed future plans. We usually use future time expressions such as this weekend, on Saturday, tomorrow, tonight, etc.", "I'm having a party tonight.", "What are you doing tomorrow night?"], vi: ['Chúng ta có thể dùng thì Hiện tại tiếp diễn cho các kế hoạch tương lai đã được ấn định. Chúng ta thường dùng các cụm từ chỉ thời gian tương lai như cuối tuần này, vào thứ Bảy, ngày mai, tối nay, v.v.', 'Tôi sẽ xem phim tối nay.', 'Bạn sẽ làm gì vào tối mai?'] } },
                ],
                activities: [
                    { type: 'Pronunciation', description: { en: ['"What are you doing...?" often sounds like /wɒdədʒəduːɪn/.'], vi: ['"What are you doing...?" thường nghe giống như /wɒdədʒəduːɪn/.']}},
                    { type: 'Speaking', description: { en: ['You want to invite your friend out. Stay on this page. Student B, choose an activity from your calendar and ask your partner to join you.'], vi: ['Bạn muốn mời bạn mình đi chơi. Ở lại trang này. Học sinh B, chọn một hoạt động từ lịch của bạn và rủ bạn cặp cùng tham gia.']}}
                ],
            },
            {
                id: 60303,
                title: { en: 'Lesson 3: Character', vi: 'Bài học 3: Tính cách' },
                aims: {
                    en: ["Describe someone's character", "Read an article about two sisters from Vietnamese folklore", "Write an email about your best friend"],
                    vi: ['Miêu tả tính cách của một người', 'Đọc một bài báo về hai chị em trong truyện cổ tích Việt Nam', 'Viết một email về người bạn thân nhất của bạn'],
                },
                vocabulary: [
                    { term: 'helpful', pronunciation: '/ˈhɛlpfəl/', vietnamese: 'hay giúp đỡ' },
                    { term: 'selfish', pronunciation: '/ˈsɛlfɪʃ/', vietnamese: 'ích kỷ' },
                    { term: 'kind', pronunciation: '/kaɪnd/', vietnamese: 'tốt bụng' },
                    { term: 'funny', pronunciation: '/ˈfʌni/', vietnamese: 'vui tính' },
                    { term: 'lazy', pronunciation: '/ˈleɪzi/', vietnamese: 'lười biếng' },
                    { term: 'friendly', pronunciation: '/ˈfrɛndli/', vietnamese: 'thân thiện' },
                ],
                grammar: [
                    { title: { en: "Review: What's he/she like?", vi: 'Ôn tập: Anh ấy/Cô ấy như thế nào?' }, explanation: { en: ["This question is used to ask about someone's personality/character.", "What's he like? He's very kind but a little lazy. What's she like? She's friendly and funny."], vi: ['Câu hỏi này dùng để hỏi về tính cách của một người.', 'Anh ấy như thế nào? Anh ấy rất tốt bụng nhưng hơi lười. Cô ấy như thế nào? Cô ấy thân thiện và vui tính.']}},
                ],
                activities: [
                    { type: 'Useful Language', description: { en: ["What's he like? He's very kind but a little lazy. What's she like? She's friendly and funny."], vi: ["Anh ấy như thế nào? Anh ấy rất tốt bụng nhưng hơi lười. Cô ấy như thế nào? Cô ấy thân thiện và vui tính."]}},
                    { type: 'Writing', description: { en: ['Write an email about your best friend (40-50 words).'], vi: ['Viết một email về người bạn thân nhất của bạn (40-50 từ).']}}
                ],
            }
        ],
      },
      {
        id: 604,
        title: { en: 'Unit 4: Festivals and Free Time', vi: 'Bài 4: Lễ hội và Thời gian rảnh' },
        lessons: [
          {
            id: 60401,
            title: { en: 'Lesson 1: Frequency', vi: 'Bài học 1: Tần suất' },
            aims: { 
                en: ['Talk about how often you do activities in your free time', 'Use adverbs of frequency'], 
                vi: ['Nói về tần suất bạn làm các hoạt động trong thời gian rảnh', 'Sử dụng trạng từ chỉ tần suất'] 
            },
            vocabulary: [
              { term: 'often', pronunciation: '/ˈɔːfn/', vietnamese: 'thường' },
              { term: 'never', pronunciation: '/ˈnevər/', vietnamese: 'không bao giờ' },
              { term: 'sometimes', pronunciation: '/ˈsʌmtaɪmz/', vietnamese: 'thỉnh thoảng' },
              { term: 'always', pronunciation: '/ˈɔːlweɪz/', vietnamese: 'luôn luôn' },
              { term: 'rarely', pronunciation: '/ˈrerli/', vietnamese: 'hiếm khi' },
              { term: 'usually', pronunciation: '/ˈjuːʒuəli/', vietnamese: 'thường xuyên' },
            ],
            grammar: [{ title: { en: 'Adverbs of Frequency', vi: 'Trạng từ chỉ tần suất' }, explanation: { en: ['We use adverbs of frequency to talk about how often things happen. Position: after "to be" and before a main verb.', 'I usually play soccer on the weekends. He is often late.'], vi: ['Chúng ta sử dụng trạng từ chỉ tần suất để nói về mức độ thường xuyên của sự việc. Vị trí: sau động từ "to be" và trước động từ thường.', 'Tôi thường chơi bóng đá vào cuối tuần. Anh ấy thường đến muộn.'] } }],
            activities: [
                { type: 'Speaking', description: { en: ['Discuss how often you do free time activities using "How often...?"'], vi: ['Thảo luận về tần suất bạn làm các hoạt động thời gian rảnh bằng cách dùng "How often...?"'] } }
            ],
          },
          {
            id: 60402,
            title: { en: 'Lesson 2: Future Events', vi: 'Bài học 2: Sự kiện tương lai' },
            aims: { 
                en: ['Talk about future events', 'Use the Present Simple for future use'], 
                vi: ['Nói về các sự kiện trong tương lai', 'Sử dụng thì Hiện tại đơn cho tương lai'] 
            },
            vocabulary: [
              { term: '(music) performance', pronunciation: '/(ˈmjuːzɪk) pərˈfɔːrməns/', vietnamese: 'buổi biểu diễn (âm nhạc)' },
              { term: '(food) stand', pronunciation: '/(fuːd) stænd/', vietnamese: 'quầy (thức ăn)' },
              { term: 'fashion show', pronunciation: '/ˈfæʃn ʃoʊ/', vietnamese: 'buổi trình diễn thời trang' },
              { term: 'puppet show', pronunciation: '/ˈpʌpɪt ʃoʊ/', vietnamese: 'múa rối' },
              { term: 'tug of war', pronunciation: '/tʌɡ əv wɔːr/', vietnamese: 'kéo co' },
              { term: 'talent show', pronunciation: '/ˈtælənt ʃoʊ/', vietnamese: 'buổi biểu diễn tài năng' },
            ],
            grammar: [{ title: { en: 'Present Simple for future use', vi: 'Hiện tại đơn cho tương lai' }, explanation: { en: ['We use the Present Simple to talk about things we know will definitely happen in the future, such as timetables or programs for shops, movie theaters, restaurants, or public transport, etc.', 'The festival starts at 6 p.m. The bus leaves at 8 a.m.'], vi: ['Chúng ta sử dụng thì Hiện tại đơn để nói về những điều chúng ta biết chắc chắn sẽ xảy ra trong tương lai, chẳng hạn như lịch trình hoặc chương trình của cửa hàng, rạp chiếu phim, nhà hàng, hoặc phương tiện công cộng, v.v.', 'Lễ hội bắt đầu lúc 6 giờ tối. Xe buýt khởi hành lúc 8 giờ sáng.'] } }],
            activities: [
                { type: 'Speaking', description: { en: ['Plan a visit to a festival using the timetable.'], vi: ['Lên kế hoạch tham quan một lễ hội sử dụng lịch trình có sẵn.'] } }
            ],
          },
          {
            id: 60403,
            title: { en: 'Lesson 3: Traditional Festivals', vi: 'Bài học 3: Lễ hội truyền thống' },
            aims: { 
                en: ['Talk about a Vietnamese festival (Tet/Mid-Autumn)', 'Read an article about a festival in Vietnam', 'Write messages about a festival'], 
                vi: ['Nói về một lễ hội truyền thống của Việt Nam (Tết/Trung Thu)', 'Đọc một bài báo về một lễ hội ở Việt Nam', 'Viết tin nhắn về một lễ hội'] 
            },
            vocabulary: [
              { term: 'watch fireworks', pronunciation: '/wɑːtʃ ˈfaɪərwɜːrks/', vietnamese: 'xem pháo hoa' },
              { term: 'decorate a house or tree', pronunciation: '/ˈdekəreɪt ə haʊs ɔːr triː/', vietnamese: 'trang trí nhà cửa hoặc cây cối' },
              { term: 'visit family and friends', pronunciation: '/ˈvɪzɪt ˈfæməli ænd frendz/', vietnamese: 'thăm gia đình và bạn bè' },
              { term: 'get lucky money, candy, or gifts', pronunciation: '/ɡet ˈlʌki ˈmʌni, ˈkændi, ɔːr ɡɪfts/', vietnamese: 'nhận tiền lì xì, kẹo, hoặc quà' },
              { term: 'play games or music', pronunciation: '/pleɪ ɡeɪmz ɔːr ˈmjuːzɪk/', vietnamese: 'chơi game hoặc nhạc' },
              { term: 'buy fruits or flowers', pronunciation: '/baɪ fruːts ɔːr ˈflaʊərz/', vietnamese: 'mua trái cây hoặc hoa' },
              { term: 'watch parades', pronunciation: '/wɑːtʃ pəˈreɪdz/', vietnamese: 'xem diễu hành' },
              { term: 'eat traditional food', pronunciation: '/iːt trəˈdɪʃənl fuːd/', vietnamese: 'ăn món ăn truyền thống' },
            ],
            grammar: [],
            activities: [
                { type: 'Reading', description: { en: ['Read about Tet and discuss activities done before and during the festival.'], vi: ['Đọc về Tết và thảo luận về các hoạt động được thực hiện trước và trong lễ hội.'] } },
                { type: 'Writing', description: { en: ['Write a short message about a festival (Mid-Autumn Festival).'], vi: ['Viết một tin nhắn ngắn về một lễ hội (Tết Trung Thu).'] } }
            ],
          },
        ]
      },
      {
        id: 605,
        title: { en: 'Unit 5: Around Town', vi: 'Bài 5: Quanh thị trấn' },
        lessons: [
            {
                id: 60501,
                title: { en: 'Lesson 1: Shopping', vi: 'Bài học 1: Mua sắm' },
                aims: {
                    en: ['Buy clothes in a clothing store', 'Use demonstratives and object pronouns'],
                    vi: ['Mua quần áo trong cửa hàng', 'Sử dụng đại từ chỉ định và đại từ tân ngữ']
                },
                vocabulary: [
                    { term: 'large', pronunciation: '/lɑːrdʒ/', vietnamese: 'lớn' },
                    { term: 'extra large', pronunciation: '/ˈekstrə lɑːrdʒ/', vietnamese: 'cực lớn' },
                    { term: 'jeans', pronunciation: '/dʒiːnz/', vietnamese: 'quần jean' },
                    { term: 'changing room', pronunciation: '/ˈtʃeɪndʒɪŋ ruːm/', vietnamese: 'phòng thay đồ' },
                    { term: 'medium', pronunciation: '/ˈmiːdiəm/', vietnamese: 'cỡ vừa' },
                    { term: 'sweater', pronunciation: '/ˈswetər/', vietnamese: 'áo len' },
                    { term: 'customer', pronunciation: '/ˈkʌstəmər/', vietnamese: 'khách hàng' },
                    { term: 'sales assistant', pronunciation: '/seɪlz əˈsɪstənt/', vietnamese: 'nhân viên bán hàng' },
                ],
                grammar: [
                    { title: { en: 'Demonstratives', vi: 'Đại từ chỉ định' }, explanation: { en: ["Use this/that/these/those to show which things we are talking about. 'This' and 'These' for close items; 'That' and 'Those' for far items.", 'How much is this T-shirt? How much are those shoes over there?'], vi: ['Sử dụng this/that/these/those để chỉ những thứ chúng ta đang nói đến. "This" và "These" cho vật ở gần; "That" và "Those" cho vật ở xa.', 'Cái áo phông này giá bao nhiêu? Đôi giày kia giá bao nhiêu?'] } },
                    { title: { en: 'Object Pronouns', vi: 'Đại từ tân ngữ' }, explanation: { en: ["Use object pronouns (it/them) after a verb or a preposition.", 'I like this jacket. Do you have it in blue?'], vi: ['Sử dụng đại từ tân ngữ (it/them) sau một động từ hoặc một giới từ.', 'Tôi thích cái áo khoác này. Bạn có nó màu xanh không?'] } },
                ],
                activities: [
                    { type: 'Role-play', description: { en: ['Work in pairs to role-play a conversation between a customer and a sales assistant.'], vi: ['Làm việc theo cặp, đóng vai cuộc hội thoại giữa khách hàng và nhân viên bán hàng.'] } }
                ],
            },
            {
                id: 60502,
                title: { en: 'Lesson 2: Ordering Food', vi: 'Bài học 2: Gọi món' },
                aims: {
                    en: ['Order food and drinks in a restaurant', 'Use quantifiers', 'Use countable and uncountable nouns'],
                    vi: ['Gọi đồ ăn và thức uống trong nhà hàng', 'Sử dụng các từ chỉ số lượng', 'Sử dụng danh từ đếm được và không đếm được']
                },
                vocabulary: [
                    { term: 'order', pronunciation: '/ˈɔːrdər/', vietnamese: 'gọi món' },
                    { term: 'dessert', pronunciation: '/dɪˈzɜːrt/', vietnamese: 'tráng miệng' },
                    { term: 'tip', pronunciation: '/tɪp/', vietnamese: 'tiền boa' },
                    { term: 'check', pronunciation: '/tʃek/', vietnamese: 'hóa đơn' },
                    { term: 'change', pronunciation: '/tʃeɪndʒ/', vietnamese: 'tiền thối' },
                    { term: 'menu', pronunciation: '/ˈmenjuː/', vietnamese: 'thực đơn' },
                ],
                grammar: [
                    { title: { en: 'Countable and uncountable nouns', vi: 'Danh từ đếm được và không đếm được' }, explanation: { en: ["Use 'a/an' before singular countable nouns. Use 'some' with uncountable nouns and plural countable nouns in positive sentences and offers. Use 'any' in questions and negative sentences.", "I'd like a cookie. I'd like some milk. Do you have any chocolate cake?"], vi: ['Sử dụng "a/an" trước danh từ đếm được số ít. Sử dụng "some" với danh từ không đếm được và danh từ đếm được số nhiều trong câu khẳng định và lời mời. Sử dụng "any" trong câu hỏi và câu phủ định.', 'Tôi muốn một cái bánh quy. Tôi muốn một ít sữa. Bạn có bánh sô cô la không?'] } },
                ],
                activities: [
                    { type: 'Role-play', description: { en: ['Work in pairs to role-play ordering food at a restaurant.'], vi: ['Làm việc theo cặp, đóng vai gọi món tại nhà hàng.'] } }
                ],
            },
            {
                id: 60503,
                title: { en: 'Lesson 3: Food', vi: 'Bài học 3: Ẩm thực' },
                aims: {
                    en: ['Talk about food from around the world', 'Read an article about Vietnamese food', 'Write a paragraph about two famous dishes'],
                    vi: ['Nói về ẩm thực từ khắp nơi trên thế giới', 'Đọc một bài báo về ẩm thực Việt Nam', 'Viết một đoạn văn về hai món ăn nổi tiếng']
                },
                vocabulary: [
                    { term: 'fish sauce', pronunciation: '/fɪʃ sɔːs/', vietnamese: 'nước mắm' },
                    { term: 'fry', pronunciation: '/fraɪ/', vietnamese: 'chiên' },
                    { term: 'noodles', pronunciation: '/ˈnuːdlz/', vietnamese: 'mì' },
                    { term: 'grill', pronunciation: '/ɡrɪl/', vietnamese: 'nướng' },
                    { term: 'beef', pronunciation: '/biːf/', vietnamese: 'thịt bò' },
                    { term: 'seafood', pronunciation: '/ˈsiːfuːd/', vietnamese: 'hải sản' },
                    { term: 'lamb', pronunciation: '/læm/', vietnamese: 'thịt cừu' },
                    { term: 'herbs', pronunciation: '/ɜːrbz/', vietnamese: 'rau thơm' },
                    { term: 'pork', pronunciation: '/pɔːrk/', vietnamese: 'thịt lợn' },
                ],
                grammar: [],
                activities: [
                    { type: 'Reading', description: { en: ['Read an article about Pho and Com Tam.'], vi: ['Đọc một bài báo về Phở và Cơm Tấm.'] } },
                    { type: 'Writing', description: { en: ['Write a 50-60 word paragraph about two famous Vietnamese dishes.'], vi: ['Viết một đoạn văn 50-60 từ về hai món ăn Việt Nam nổi tiếng.'] } }
                ],
            },
        ]
      },
      {
        id: 606,
        title: { en: 'Unit 6: Community Services', vi: 'Bài 6: Dịch vụ cộng đồng' },
        lessons: [
            {
                id: 60601,
                title: { en: 'Lesson 1: Public Services', vi: 'Bài học 1: Dịch vụ công cộng' },
                aims: {
                    en: ['Talk about public services in your town', 'Use definite and indefinite articles', 'Use prepositions of place'],
                    vi: ['Nói về các dịch vụ công cộng trong thị trấn của bạn', 'Sử dụng mạo từ xác định và không xác định', 'Sử dụng giới từ chỉ nơi chốn']
                },
                vocabulary: [
                    { term: 'police station', pronunciation: '/pəˈliːs ˈsteɪʃn/', vietnamese: 'đồn cảnh sát' },
                    { term: 'library', pronunciation: '/ˈlaɪbreri/', vietnamese: 'thư viện' },
                    { term: 'hospital', pronunciation: '/ˈhɑːspɪtl/', vietnamese: 'bệnh viện' },
                    { term: 'train station', pronunciation: '/treɪn ˈsteɪʃn/', vietnamese: 'ga tàu' },
                    { term: 'post office', pronunciation: '/poʊst ˈɔːfɪs/', vietnamese: 'bưu điện' },
                    { term: 'bus station', pronunciation: '/bʌs ˈsteɪʃn/', vietnamese: 'bến xe buýt' },
                ],
                grammar: [
                    { title: { en: 'Articles', vi: 'Mạo từ' }, explanation: { en: ['Use "a/an" for a singular noun when we talk about it for the first time. Use "the" when it\'s clear from the situation which one we\'re talking about.', 'Is there a train station near here? The train station is on Queen\'s Street.'], vi: ['Sử dụng "a/an" cho danh từ số ít khi chúng ta nói về nó lần đầu tiên. Sử dụng "the" khi rõ ràng từ tình huống chúng ta đang nói về cái nào.', 'Có ga tàu nào gần đây không? Ga tàu ở trên Phố Queen.'] } },
                    { title: { en: 'Prepositions of Place', vi: 'Giới từ chỉ nơi chốn' }, explanation: { en: ['We use prepositions of place to say where things are (next to, between, opposite).', 'It\'s next to the park. It\'s between the police station and the hospital.'], vi: ['Chúng ta sử dụng giới từ chỉ nơi chốn để nói vị trí của sự vật (cạnh, giữa, đối diện).', 'Nó ở cạnh công viên. Nó ở giữa đồn cảnh sát và bệnh viện.'] } },
                ],
                activities: [
                    { type: 'Speaking', description: { en: ['Work in pairs, ask for and give directions on a map.'], vi: ['Làm việc theo cặp, hỏi và chỉ đường trên bản đồ.'] } }
                ],
            },
            {
                id: 60602,
                title: { en: 'Lesson 2: Saving the Environment', vi: 'Bài học 2: Bảo vệ Môi trường' },
                aims: { 
                    en: ['Give tips on saving the environment', 'Use imperatives (affirmative and negative)'], 
                    vi: ['Đưa ra lời khuyên về cách bảo vệ môi trường', 'Sử dụng câu mệnh lệnh (khẳng định và phủ định)'] 
                },
                vocabulary: [
                    { term: 'recycle', pronunciation: '/ˌriːˈsaɪkl/', vietnamese: 'tái chế' },
                    { term: 'throw away', pronunciation: '/ˌθroʊ əˈweɪ/', vietnamese: 'vứt đi' },
                    { term: 'reuse', pronunciation: '/ˌriːˈjuːz/', vietnamese: 'tái sử dụng' },
                    { term: 'pick up', pronunciation: '/pɪk ʌp/', vietnamese: 'nhặt lên' },
                    { term: 'trash', pronunciation: '/træʃ/', vietnamese: 'rác' },
                    { term: 'plastic bottle', pronunciation: '/ˈplæstɪk ˈbɑːtl/', vietnamese: 'chai nhựa' },
                    { term: 'can', pronunciation: '/kæn/', vietnamese: 'lon, hộp' },
                    { term: 'plastic bag', pronunciation: '/ˈplæstɪk bæɡ/', vietnamese: 'túi nhựa' },
                    { term: 'glass jar', pronunciation: '/ɡlæs dʒɑːr/', vietnamese: 'lọ thủy tinh' },
                ],
                grammar: [
                    { title: { en: 'Imperatives', vi: 'Câu mệnh lệnh' }, explanation: { en: ['We use imperatives to give instructions or advice. Use the base form of the verb for affirmative and "Don\'t + base form" for negative.', 'E.g., Recycle bottles. Don\'t throw away old glass.'], vi: ['Chúng ta sử dụng câu mệnh lệnh để đưa ra hướng dẫn hoặc lời khuyên. Sử dụng dạng nguyên thể của động từ cho câu khẳng định và "Don\'t + nguyên thể" cho câu phủ định.', 'Ví dụ: Tái chế chai. Đừng vứt bỏ thủy tinh cũ.'] } },
                ],
                activities: [
                    { type: 'Discussion', description: { en: ['Discuss and choose tips to help save the Earth.'], vi: ['Thảo luận và chọn ra các mẹo để giúp bảo vệ Trái đất.'] } }
                ],
            },
            {
                id: 60603,
                title: { en: 'Lesson 3: Charities', vi: 'Bài học 3: Tổ chức từ thiện' },
                aims: { 
                    en: ['Talk about environmental charities', 'Read about a charity organization', 'Write a paragraph about a charity'], 
                    vi: ['Nói về các tổ chức từ thiện vì môi trường', 'Đọc về một tổ chức từ thiện', 'Viết một đoạn văn về một tổ chức từ thiện'] 
                },
                vocabulary: [
                    { term: 'charity', pronunciation: '/ˈtʃærəti/', vietnamese: 'tổ chức từ thiện' },
                    { term: 'protect', pronunciation: '/prəˈtekt/', vietnamese: 'bảo vệ' },
                    { term: 'for free', pronunciation: '/fɔːr friː/', vietnamese: 'miễn phí' },
                    { term: 'wildlife', pronunciation: '/ˈwaɪldlaɪf/', vietnamese: 'động vật hoang dã' },
                    { term: 'donate', pronunciation: '/ˈdoʊneɪt/', vietnamese: 'quyên góp' },
                ],
                grammar: [],
                activities: [
                    { type: 'Reading', description: { en: ['Read an article about "Act Green Vietnam".'], vi: ['Đọc một bài báo về "Act Green Vietnam".'] } },
                    { type: 'Writing', description: { en: ['Write a 50-60 word paragraph about WWF (World Wildlife Fund).'], vi: ['Viết một đoạn văn 50-60 từ về WWF (Quỹ Động vật Hoang dã Thế giới).'] } }
                ],
            },
        ]
      },
      { 
        id: 607, 
        title: { en: 'Unit 7: Movies', vi: 'Bài 7: Phim ảnh' }, 
        lessons: [
            {
                id: 60701,
                title: { en: 'Lesson 1: Kinds of Movies', vi: 'Bài học 1: Các loại phim' },
                aims: { 
                    en: ['Make and respond to movie suggestions', 'Use prepositions of time'], 
                    vi: ['Đưa ra và phản hồi lời đề nghị đi xem phim', 'Sử dụng giới từ chỉ thời gian'] 
                },
                vocabulary: [
                    { term: 'comedy', pronunciation: '/ˈkɑːmədi/', vietnamese: 'phim hài' },
                    { term: 'science fiction (sci-fi)', pronunciation: '/ˌsaɪəns ˈfɪkʃn/', vietnamese: 'phim khoa học viễn tưởng' },
                    { term: 'horror', pronunciation: '/ˈhɔːrər/', vietnamese: 'phim kinh dị' },
                    { term: 'action', pronunciation: '/ˈækʃn/', vietnamese: 'phim hành động' },
                    { term: 'drama', pronunciation: '/ˈdrɑːmə/', vietnamese: 'phim tâm lý/chính kịch' },
                    { term: 'animated', pronunciation: '/ˈænɪmeɪtɪd/', vietnamese: 'phim hoạt hình' },
                ],
                grammar: [
                    { title: { en: 'Prepositions of Time', vi: 'Giới từ chỉ thời gian' }, explanation: { en: ['Use "on" for days and dates. Use "at" for specific times. Use "in" for months, seasons, and general times of day.', 'E.g., The movie starts at 7 p.m. on Monday.'], vi: ['Sử dụng "on" cho ngày và thứ. Sử dụng "at" cho giờ cụ thể. Sử dụng "in" cho tháng, mùa và các buổi trong ngày.', 'Ví dụ: Bộ phim bắt đầu lúc 7 giờ tối vào thứ Hai.'] } },
                ],
                activities: [
                    { type: 'Speaking', description: { en: ['Role-play making and responding to movie suggestions.'], vi: ['Đóng vai rủ bạn đi xem phim và sắp xếp thời gian.'] } }
                ],
            },
            {
                id: 60702,
                title: { en: 'Lesson 2: Movie Reviews', vi: 'Bài học 2: Bình luận phim' },
                aims: { 
                    en: ['Express opinions about a movie', 'Use the Past Simple with "to be"'], 
                    vi: ['Bày tỏ quan điểm về một bộ phim', 'Sử dụng thì Quá khứ đơn với động từ "to be"'] 
                },
                vocabulary: [
                    { term: 'fantastic', pronunciation: '/fænˈtæstɪk/', vietnamese: 'tuyệt vời' },
                    { term: 'terrible', pronunciation: '/ˈterəbl/', vietnamese: 'kinh khủng' },
                    { term: 'funny', pronunciation: '/ˈfʌni/', vietnamese: 'hài hước' },
                    { term: 'great', pronunciation: '/ɡreɪt/', vietnamese: 'tuyệt' },
                    { term: 'sad', pronunciation: '/sæd/', vietnamese: 'buồn' },
                    { term: 'exciting', pronunciation: '/ɪkˈsaɪtɪŋ/', vietnamese: 'thú vị' },
                    { term: 'awful', pronunciation: '/ˈɔːfl/', vietnamese: 'tồi tệ' },
                    { term: 'boring', pronunciation: '/ˈbɔːrɪŋ/', vietnamese: 'nhàm chán' },
                ],
                grammar: [
                    { title: { en: 'Past Simple with "to be"', vi: 'Thì Quá khứ đơn với "to be"' }, explanation: { en: ['Affirmative: I/He/She/It was; You/We/They were. Negative: was not (wasn\'t); were not (weren\'t).', 'E.g., The movie was great. Was it good? Yes, it was./No, it wasn\'t.'], vi: ['Khẳng định: I/He/She/It là was; You/We/They là were. Phủ định: wasn\'t; weren\'t.', 'Ví dụ: Bộ phim rất tuyệt. Nó có hay không? Có./Không.'] } },
                ],
                activities: [
                    { type: 'Speaking', description: { en: ['Ask and answer questions about a movie you have watched.'], vi: ['Hỏi và trả lời về một bộ phim đã xem.'] } }
                ],
            },
            {
                id: 60703,
                title: { en: 'Lesson 3: Historical Movies', vi: 'Bài học 3: Phim lịch sử' },
                aims: { 
                    en: ['Talk about famous historical figures in movies', 'Review the Past Simple tense', 'Write a paragraph about a historical movie'], 
                    vi: ['Nói về các nhân vật lịch sử nổi tiếng trong phim', 'Ôn tập thì Quá khứ đơn', 'Viết đoạn văn về một bộ phim lịch sử'] 
                },
                vocabulary: [
                    { term: 'army', pronunciation: '/ˈɑːrmi/', vietnamese: 'quân đội' },
                    { term: 'king', pronunciation: '/kɪŋ/', vietnamese: 'vua' },
                    { term: 'queen', pronunciation: '/kwiːn/', vietnamese: 'hoàng hậu' },
                    { term: 'soldier', pronunciation: '/ˈsoʊldʒər/', vietnamese: 'người lính' },
                    { term: 'battle', pronunciation: '/ˈbætl/', vietnamese: 'trận chiến' },
                    { term: 'general', pronunciation: '/ˈdʒenrəl/', vietnamese: 'tướng' },
                    { term: 'win', pronunciation: '/wɪn/', vietnamese: 'chiến thắng' },
                    { term: 'invader', pronunciation: '/ɪnˈveɪdər/', vietnamese: 'kẻ xâm lược' },
                ],
                grammar: [
                    { title: { en: 'Review: Past Simple', vi: 'Ôn tập: Thì Quá khứ đơn' }, explanation: { en: ['Reviewing the use of Past Simple for completed actions in the past.'], vi: ['Ôn tập cách sử dụng Quá khứ đơn cho các hành động đã hoàn thành trong quá khứ.'] } }
                ],
                activities: [
                    { type: 'Reading', description: { en: ['Read a movie review about King Quang Trung.'], vi: ['Đọc bài bình luận phim về vua Quang Trung.'] } },
                    { type: 'Writing', description: { en: ['Write a 50-60 word movie review about a historical movie.'], vi: ['Viết một bài bình luận phim ngắn 50-60 từ về một bộ phim lịch sử.'] } }
                ],
            }
        ] 
      },
      { 
        id: 608, 
        title: { en: 'Unit 8: The World around Us', vi: 'Bài 8: Thế giới quanh ta' }, 
        lessons: [
            {
                id: 60801,
                title: { en: 'Lesson 1: Planning a Trip', vi: 'Bài học 1: Lên kế hoạch cho chuyến đi' },
                aims: { 
                    en: ['Discuss travel plans', 'Use modals "should" and "can"'], 
                    vi: ['Thảo luận kế hoạch cho một chuyến đi', 'Sử dụng động từ khuyết thiếu "should" và "can"'] 
                },
                vocabulary: [
                    { term: 'rafting', pronunciation: '/ˈræftɪŋ/', vietnamese: 'chèo bè' },
                    { term: 'canyon', pronunciation: '/ˈkænjən/', vietnamese: 'hẻm núi' },
                    { term: 'cave', pronunciation: '/keɪv/', vietnamese: 'hang động' },
                    { term: 'hiking', pronunciation: '/ˈhaɪkɪŋ/', vietnamese: 'đi bộ đường dài' },
                    { term: 'kayaking', pronunciation: '/ˈkaɪækɪŋ/', vietnamese: 'chèo thuyền kayak' },
                    { term: 'campsite', pronunciation: '/ˈkæmpsaɪt/', vietnamese: 'khu cắm trại' },
                ],
                grammar: [
                    { title: { en: 'Modals: should and can', vi: 'Động từ khuyết thiếu: should và can' }, explanation: { en: ['Use "should/shouldn\'t" for advice. Use "can/can\'t" for ability or possibility.', 'E.g., We should go hiking. We can go kayaking there.'], vi: ['Sử dụng "should/shouldn\'t" để đưa ra lời khuyên. Sử dụng "can/can\'t" cho khả năng hoặc sự cho phép.', 'Ví dụ: Chúng ta nên đi bộ đường dài. Chúng ta có thể chèo thuyền kayak ở đó.'] } }
                ],
                activities: [
                    { type: 'Speaking', description: { en: ['Plan a class trip, compare locations, and make a decision.'], vi: ['Lên kế hoạch cho chuyến đi của lớp, so sánh địa điểm và đưa ra quyết định.'] } }
                ],
            },
            {
                id: 60802,
                title: { en: 'Lesson 2: What to Bring', vi: 'Bài học 2: Mang theo gì' },
                aims: { 
                    en: ['Talk about essential items for a trip', 'Use compound sentences with "so"'], 
                    vi: ['Nói về những vật dụng cần thiết cho một chuyến đi', 'Sử dụng câu ghép với "so"'] 
                },
                vocabulary: [
                    { term: 'sleeping bag', pronunciation: '/ˈsliːpɪŋ bæɡ/', vietnamese: 'túi ngủ' },
                    { term: 'flashlight', pronunciation: '/ˈflæʃlaɪt/', vietnamese: 'đèn pin' },
                    { term: 'bottled water', pronunciation: '/ˌbɑːtld ˈwɔːtər/', vietnamese: 'nước đóng chai' },
                    { term: 'tent', pronunciation: '/tent/', vietnamese: 'lều' },
                    { term: 'battery', pronunciation: '/ˈbætəri/', vietnamese: 'pin' },
                    { term: 'pillow', pronunciation: '/ˈpɪloʊ/', vietnamese: 'gối' },
                    { term: 'towel', pronunciation: '/ˈtaʊəl/', vietnamese: 'khăn tắm' },
                ],
                grammar: [
                    { title: { en: 'Compound sentences with "so"', vi: 'Câu ghép với "so"' }, explanation: { en: ['Use "so" to connect two independent clauses where the second clause is the result or purpose of the first.', 'E.g., We need a tent, so we can sleep. It’s dark, so we need a flashlight.'], vi: ['Sử dụng "so" để nối hai mệnh đề độc lập, trong đó mệnh đề thứ hai là kết quả hoặc mục đích của mệnh đề thứ nhất.', 'Ví dụ: Chúng ta cần một cái lều, vì vậy chúng ta có thể ngủ. Trời tối, nên chúng ta cần đèn pin.'] } }
                ],
                activities: [
                    { type: 'Speaking', description: { en: ['Prepare for a camping trip: select 5 essential items and explain why.'], vi: ['Chuẩn bị cho chuyến đi cắm trại: chọn 5 vật dụng quan trọng nhất và giải thích lý do.'] } }
                ],
            },
            {
                id: 60803,
                title: { en: 'Lesson 3: Natural Wonders', vi: 'Bài học 3: Kỳ quan thiên nhiên' },
                aims: { 
                    en: ['Give advice about visiting natural wonders', 'Write a postcard'], 
                    vi: ['Đưa ra lời khuyên khi đến thăm các kỳ quan thiên nhiên', 'Viết một tấm bưu thiếp'] 
                },
                vocabulary: [
                    { term: 'highland', pronunciation: '/ˈhaɪlənd/', vietnamese: 'cao nguyên' },
                    { term: 'beach', pronunciation: '/biːtʃ/', vietnamese: 'bãi biển' },
                    { term: 'mountain', pronunciation: '/ˈmaʊntən/', vietnamese: 'núi' },
                    { term: 'waterfall', pronunciation: '/ˈwɔːtərfɔːl/', vietnamese: 'thác nước' },
                    { term: 'bay', pronunciation: '/beɪ/', vietnamese: 'vịnh' },
                    { term: 'forest', pronunciation: '/ˈfɔːrɪst/', vietnamese: 'rừng' },
                    { term: 'island', pronunciation: '/ˈaɪlənd/', vietnamese: 'hòn đảo' },
                ],
                grammar: [],
                activities: [
                    { type: 'Writing', description: { en: ['Write a 50-60 word postcard to a friend, recommending a place to visit in Vietnam.'], vi: ['Viết một tấm bưu thiếp 50-60 từ cho bạn bè, khuyên họ nên đến thăm một nơi ở Việt Nam.'] } }
                ],
            },
        ] 
      },
      { 
        id: 609, 
        title: { en: 'Unit 9: Houses in the Future', vi: 'Bài 9: Ngôi nhà trong tương lai' }, 
        lessons: [
            {
                id: 60901,
                title: { en: 'Lesson 1: Future Homes', vi: 'Bài học 1: Ngôi nhà tương lai' },
                aims: { 
                    en: ['Compare present and future homes', 'Use the Future Simple tense'], 
                    vi: ['So sánh nhà ở hiện tại và tương lai', 'Sử dụng thì Tương lai đơn'] 
                },
                vocabulary: [
                    { term: 'under the sea', pronunciation: '/ˈʌndər ðə siː/', vietnamese: 'dưới biển' },
                    { term: 'underground', pronunciation: '/ˌʌndərˈɡraʊnd/', vietnamese: 'ngầm' },
                    { term: 'smart home', pronunciation: '/smɑːrt hoʊm/', vietnamese: 'nhà thông minh' },
                    { term: 'megacity', pronunciation: '/ˈmeɡəsɪti/', vietnamese: 'siêu thành phố' },
                    { term: 'earthscraper', pronunciation: '/ˈɜːrθskreɪpər/', vietnamese: 'tòa nhà chọc đất' },
                    { term: 'eco-friendly home', pronunciation: '/ˌiːkoʊ ˈfrendli hoʊm/', vietnamese: 'nhà thân thiện với môi trường' },
                ],
                grammar: [
                    { title: { en: 'Future Simple (will/won\'t)', vi: 'Thì Tương lai đơn (will/won\'t)' }, explanation: { en: ['We use the Future Simple with "will/won\'t" to make predictions about the future.', 'E.g., I think people will live in megacities. We won\'t have private cars.'], vi: ['Chúng ta sử dụng thì Tương lai đơn với "will/won\'t" để đưa ra dự đoán về tương lai.', 'Ví dụ: Tôi nghĩ mọi người sẽ sống ở siêu thành phố. Chúng ta sẽ không có ô tô riêng.'] } }
                ],
                activities: [
                    { type: 'Speaking', description: { en: ['Interview an "expert" about future homes and technology.'], vi: ['Phỏng vấn một "chuyên gia" về nhà ở trong tương lai.'] } }
                ],
            },
            {
                id: 60902,
                title: { en: 'Lesson 2: Future Technology', vi: 'Bài học 2: Công nghệ tương lai' },
                aims: { 
                    en: ['Describe similarities and differences between present and future homes', 'Use "might" for future possibility'], 
                    vi: ['Mô tả sự giống và khác nhau giữa nhà ở hiện tại và tương lai', 'Sử dụng "might" để nói về khả năng trong tương lai'] 
                },
                vocabulary: [
                    { term: 'smart device', pronunciation: '/smɑːrt dɪˈvaɪs/', vietnamese: 'thiết bị thông minh' },
                    { term: 'drone', pronunciation: '/droʊn/', vietnamese: 'máy bay không người lái' },
                    { term: 'touch screen', pronunciation: '/tʌtʃ skriːn/', vietnamese: 'màn hình cảm ứng' },
                    { term: '3D printer', pronunciation: '/ˌθriː diː ˈprɪntər/', vietnamese: 'máy in 3D' },
                    { term: 'automatic food machine', pronunciation: '/ˌɔːtəˈmætɪk fuːd məˈʃiːn/', vietnamese: 'máy làm đồ ăn tự động' },
                    { term: 'robot helper', pronunciation: '/ˈroʊbɑːt ˈhelpər/', vietnamese: 'người máy trợ giúp' },
                ],
                grammar: [
                    { title: { en: 'might for future possibilities', vi: 'might cho khả năng trong tương lai' }, explanation: { en: ['We use "might/might not" to talk about things that are possible, but not certain, in the future.', 'E.g., We might have robot helpers. People might not need to drive cars.'], vi: ['Chúng ta sử dụng "might/might not" để nói về những điều có thể xảy ra, nhưng không chắc chắn, trong tương lai.', 'Ví dụ: Chúng ta có thể có người máy trợ giúp. Mọi người có thể sẽ không cần lái xe.'] } }
                ],
                activities: [
                    { type: 'Discussion', description: { en: ['Discuss future changes in homes and technology.'], vi: ['Thảo luận về những thay đổi của nhà ở và công nghệ trong tương lai.'] } }
                ],
            },
            {
                id: 60903,
                title: { en: 'Lesson 3: Life in Space', vi: 'Bài học 3: Cuộc sống trong không gian' },
                aims: { 
                    en: ['Talk about life on the Moon', 'Write a paragraph about life in space'], 
                    vi: ['Nói về cuộc sống trên Mặt Trăng', 'Viết một đoạn văn về cuộc sống trong không gian'] 
                },
                vocabulary: [
                    { term: 'gravity', pronunciation: '/ˈɡrævəti/', vietnamese: 'trọng lực' },
                    { term: 'spacesuit', pronunciation: '/ˈspeɪssuːt/', vietnamese: 'đồ du hành vũ trụ' },
                    { term: 'float', pronunciation: '/floʊt/', vietnamese: 'lơ lửng' },
                    { term: 'space station', pronunciation: '/ˈspeɪs ˈsteɪʃn/', vietnamese: 'trạm không gian' },
                    { term: 'the Moon', pronunciation: '/ðə muːn/', vietnamese: 'Mặt Trăng' },
                    { term: 'astronaut', pronunciation: '/ˈæstrəˌnɔːt/', vietnamese: 'phi hành gia' },
                ],
                grammar: [],
                activities: [
                    { type: 'Reading', description: { en: ['Read about the daily life of an astronaut.'], vi: ['Đọc về cuộc sống hàng ngày của một phi hành gia.'] } },
                    { type: 'Writing', description: { en: ['Write a 50-60 word paragraph about what life on the Moon would be like.'], vi: ['Viết đoạn văn 50-60 từ về cuộc sống trên Mặt Trăng sẽ như thế nào.'] } }
                ],
            },
        ] 
      },
      { 
        id: 610, 
        title: { en: 'Unit 10: Cities around the World', vi: 'Bài 10: Các thành phố trên thế giới' }, 
        lessons: [
            {
                id: 61001,
                title: { en: 'Lesson 1: Landmarks', vi: 'Bài học 1: Danh lam thắng cảnh' },
                aims: { 
                    en: ['Identify landmarks in cities around the world', 'Use the First Conditional'], 
                    vi: ['Nhận biết các địa danh ở các thành phố trên thế giới', 'Sử dụng câu điều kiện loại 1'] 
                },
                vocabulary: [
                    { term: 'statue', pronunciation: '/ˈstætʃuː/', vietnamese: 'tượng' },
                    { term: 'museum', pronunciation: '/mjuːˈziːəm/', vietnamese: 'bảo tàng' },
                    { term: 'palace', pronunciation: '/ˈpæləs/', vietnamese: 'cung điện' },
                    { term: 'tower', pronunciation: '/ˈtaʊər/', vietnamese: 'tháp' },
                    { term: 'opera house', pronunciation: '/ˈɑːprə haʊs/', vietnamese: 'nhà hát opera' },
                    { term: 'cathedral', pronunciation: '/kəˈθiːdrəl/', vietnamese: 'nhà thờ lớn' },
                    { term: 'bridge', pronunciation: '/brɪdʒ/', vietnamese: 'cầu' },
                    { term: 'park', pronunciation: '/pɑːrk/', vietnamese: 'công viên' },
                ],
                grammar: [
                    { title: { en: 'First Conditional', vi: 'Câu điều kiện loại 1' }, explanation: { en: ['We use the First Conditional (If + Present Simple, S + will/won\'t + V) to talk about possible future situations and their results.', 'E.g., If the weather\'s bad, I\'ll watch a ballet.'], vi: ['Chúng ta sử dụng Câu điều kiện loại 1 (If + Hiện tại đơn, S + will/won\'t + V) để nói về các tình huống có thể xảy ra trong tương lai và kết quả của chúng.', 'Ví dụ: Nếu thời tiết xấu, tôi sẽ xem múa ballet.'] } }
                ],
                activities: [
                    { type: 'Speaking', description: { en: ['Plan a visit to London, discuss alternatives based on time or weather.'], vi: ['Lên kế hoạch tham quan London, thảo luận các lựa chọn thay thế dựa trên thời gian hoặc thời tiết.'] } }
                ],
            },
            {
                id: 61002,
                title: { en: 'Lesson 2: Comparing Cities', vi: 'Bài học 2: So sánh các thành phố' },
                aims: { 
                    en: ['Compare features of different cities', 'Use comparative and superlative adjectives'], 
                    vi: ['So sánh các đặc điểm của các thành phố', 'Sử dụng tính từ so sánh hơn và so sánh nhất'] 
                },
                vocabulary: [
                    { term: 'modern', pronunciation: '/ˈmɑːdərn/', vietnamese: 'hiện đại' },
                    { term: 'crowded', pronunciation: '/ˈkraʊdɪd/', vietnamese: 'đông đúc' },
                    { term: 'peaceful', pronunciation: '/ˈpiːsfl/', vietnamese: 'yên bình' },
                    { term: 'noisy', pronunciation: '/ˈnɔɪzi/', vietnamese: 'ồn ào' },
                ],
                grammar: [
                    { title: { en: 'Comparative and Superlative Adjectives', vi: 'Tính từ so sánh hơn và so sánh nhất' }, explanation: { en: ['We use comparative adjectives to compare two things (New York is noisier than Bali). We use superlative adjectives to compare three or more things (Hanoi is the most crowded city).'], vi: ['Chúng ta sử dụng tính từ so sánh hơn để so sánh hai vật (New York ồn ào hơn Bali). Chúng ta sử dụng tính từ so sánh nhất để so sánh ba vật trở lên (Hà Nội là thành phố đông đúc nhất).'] } }
                ],
                activities: [
                    { type: 'Discussion', description: { en: ['Discuss whether to travel to New York or Bali based on comparative criteria.'], vi: ['Thảo luận để quyết định đi du lịch New York hay Bali dựa trên tiêu chí so sánh.'] } }
                ],
            },
            {
                id: 61003,
                title: { en: 'Lesson 3: City Features', vi: 'Bài học 3: Đặc điểm thành phố' },
                aims: { 
                    en: ['Compare cities using superlative forms', 'Write a paragraph about a city'], 
                    vi: ['So sánh các thành phố sử dụng dạng so sánh nhất', 'Viết một đoạn văn về một thành phố'] 
                },
                vocabulary: [
                    { term: 'polluted', pronunciation: '/pəˈluːtɪd/', vietnamese: 'ô nhiễm' },
                    { term: 'clean', pronunciation: '/kliːn/', vietnamese: 'sạch sẽ' },
                    { term: 'expensive', pronunciation: '/ɪkˈspensɪv/', vietnamese: 'đắt đỏ' },
                    { term: 'cheap', pronunciation: '/tʃiːp/', vietnamese: 'rẻ' },
                    { term: 'populated', pronunciation: '/ˈpɑːpjuleɪtɪd/', vietnamese: 'đông dân' },
                    { term: 'temperature', pronunciation: '/ˈtemprətʃər/', vietnamese: 'nhiệt độ' },
                ],
                grammar: [
                    { title: { en: 'Review: Superlative Adjectives', vi: 'Ôn tập: Tính từ so sánh nhất' }, explanation: { en: ['Reviewing the use of superlative adjectives in comparing city features.'], vi: ['Ôn tập việc sử dụng tính từ so sánh nhất trong việc so sánh các đặc điểm của thành phố.'] } }
                ],
                activities: [
                    { type: 'Writing', description: { en: ['Write a 50-60 word paragraph about Seoul or another city you know.'], vi: ['Viết đoạn văn 50-60 từ về Seoul hoặc một thành phố khác mà bạn biết.'] } }
                ],
            },
        ] 
      }
    ]
};

import { CurriculumLevel, Unit } from '../types';

const sm3Units: Unit[] = [
    {
        id: 300,
        title: { en: 'Meet The Explorers', vi: 'Gặp gỡ các nhà thám hiểm' },
        lessons: [
            {
                id: 30001,
                title: { en: 'Vocabulary and Grammar', vi: 'Từ vựng và Ngữ pháp' },
                aims: {
                    en: ['Review numbers and rooms', 'Use "good at + -ing"'],
                    vi: ['Ôn tập số đếm và các phòng', 'Sử dụng "giỏi về + -ing"']
                },
                vocabulary: [
                    { term: 'upstairs', pronunciation: '/ˌʌpˈstɛəz/', vietnamese: 'tầng trên' },
                    { term: 'downstairs', pronunciation: '/ˌdaʊnˈstɛəz/', vietnamese: 'tầng dưới' },
                    { term: 'cellar', pronunciation: '/ˈsɛlər/', vietnamese: 'hầm' },
                    { term: 'twenty-one', pronunciation: '/ˌtwɛntiˈwʌn/', vietnamese: 'hai mươi mốt' },
                    { term: 'fifty', pronunciation: '/ˈfɪfti/', vietnamese: 'năm mươi' },
                    { term: 'one hundred', pronunciation: '/wʌn ˈhʌndrəd/', vietnamese: 'một trăm' },
                ],
                grammar: [{
                    title: { en: 'Good at + verb-ing', vi: 'Giỏi về + động từ-ing' },
                    explanation: {
                        en: ["Use 'good at' followed by a verb in the -ing form to talk about skills.", "Example: I'm good at painting. She isn't good at riding bikes."],
                        vi: ["Sử dụng 'good at' theo sau là một động từ ở dạng -ing để nói về kỹ năng.", "Ví dụ: Tôi giỏi vẽ. Cô ấy không giỏi đi xe đạp."]
                    }
                }],
                activities: [{
                    type: 'Practice',
                    description: {
                        en: ['Listen and say the numbers and room names.', 'Play a memory game with the vocabulary.', 'Read the story "The Old Book" and discuss courage.'],
                        vi: ['Nghe và nói các số và tên phòng.', 'Chơi trò chơi trí nhớ với từ vựng.', 'Đọc truyện "Quyển sách cũ" và thảo luận về lòng dũng cảm.']
                    }
                }]
            }
        ]
    },
    {
        id: 301,
        title: { en: 'Our School', vi: 'Trường của chúng tôi' },
        lessons: [
            {
                id: 30101,
                title: { en: 'Subjects and Rules', vi: 'Môn học và Nội quy' },
                aims: {
                    en: ['Talk about school subjects', 'Use "like / don\'t like + -ing"', 'Use "have to" for rules'],
                    vi: ['Nói về các môn học', 'Sử dụng "thích / không thích + -ing"', 'Sử dụng "phải" cho các quy tắc']
                },
                vocabulary: [
                    { term: 'English', pronunciation: '/ˈɪŋɡlɪʃ/', vietnamese: 'Tiếng Anh' },
                    { term: 'Geography', pronunciation: '/dʒiˈɒɡrəfi/', vietnamese: 'Địa lý' },
                    { term: 'Music', pronunciation: '/ˈmjuːzɪk/', vietnamese: 'Âm nhạc' },
                    { term: 'I.T.', pronunciation: '/ˌaɪˈtiː/', vietnamese: 'Tin học' },
                    { term: 'History', pronunciation: '/ˈhɪstəri/', vietnamese: 'Lịch sử' },
                    { term: 'Maths', pronunciation: '/mæθs/', vietnamese: 'Toán học' },
                    { term: 'Science', pronunciation: '/ˈsaɪəns/', vietnamese: 'Khoa học' },
                    { term: 'Art', pronunciation: '/ɑːt/', vietnamese: 'Mỹ thuật' },
                    { term: 'P.E.', pronunciation: '/ˌpiːˈiː/', vietnamese: 'Thể dục' }
                ],
                grammar: [
                    {
                        title: { en: 'like / don\'t like + -ing', vi: 'thích / không thích + động từ-ing' },
                        explanation: {
                            en: ['Use "like + -ing" to express enjoyment.', 'Example: I like listening to music.'],
                            vi: ['Sử dụng "like + -ing" để diễn tả sự yêu thích.', 'Ví dụ: Tôi thích nghe nhạc.']
                        }
                    },
                    {
                        title: { en: 'have to + infinitive', vi: 'phải + động từ nguyên mẫu' },
                        explanation: {
                            en: ['Use "have to" to express obligation.', 'Example: You have to wear a school uniform.'],
                            vi: ['Sử dụng "have to" để diễn tả nghĩa vụ.', 'Ví dụ: Bạn phải mặc đồng phục.']
                        }
                    }
                ],
                activities: [{
                    type: 'Practice',
                    description: {
                        en: ['Ask and answer about your favorite subjects.', 'Play a game about what you like and don\'t like doing.'],
                        vi: ['Hỏi và trả lời về môn học yêu thích của bạn.', 'Chơi một trò chơi về những gì bạn thích và không thích làm.']
                    }
                }]
            }
        ]
    },
    {
        id: 302,
        title: { en: 'The Picnic', vi: 'Chuyến dã ngoại' },
        lessons: [
            {
                id: 30201,
                title: { en: 'Food and Suggestions', vi: 'Thức ăn và Gợi ý' },
                aims: {
                    en: ['Talk about picnic food', 'Use "some" and "any"', 'Make suggestions with "Shall we...?"'],
                    vi: ['Nói về đồ ăn dã ngoại', 'Sử dụng "some" và "any"', 'Đưa ra gợi ý với "Shall we...?"']
                },
                vocabulary: [
                    { term: 'rolls', pronunciation: '/roʊlz/', vietnamese: 'bánh mì cuộn' },
                    { term: 'lemonade', pronunciation: '/ˌlɛməˈneɪd/', vietnamese: 'nước chanh' },
                    { term: 'cheese', pronunciation: '/tʃiːz/', vietnamese: 'phô mai' },
                    { term: 'apple juice', pronunciation: '/ˈæpəl dʒuːs/', vietnamese: 'nước táo' },
                    { term: 'water', pronunciation: '/ˈwɔːtər/', vietnamese: 'nước' },
                    { term: 'soup', pronunciation: '/suːp/', vietnamese: 'súp' },
                    { term: 'vegetables', pronunciation: '/ˈvɛdʒtəbəlz/', vietnamese: 'rau củ' },
                    { term: 'salad', pronunciation: '/ˈsæləd/', vietnamese: 'salad' }
                ],
                grammar: [
                    {
                        title: { en: 'Some and Any', vi: 'Some và Any' },
                        explanation: {
                            en: ['Use "some" in positive sentences. Use "any" in questions and negative sentences.', 'Example: Is there any cheese? Yes, there is some cheese.'],
                            vi: ['Sử dụng "some" trong câu khẳng định. Sử dụng "any" trong câu hỏi và câu phủ định.', 'Ví dụ: Có phô mai không? Có, có một ít phô mai.']
                        }
                    },
                    {
                        title: { en: 'Suggestions with "Shall we...?"', vi: 'Gợi ý với "Shall we...?"' },
                        explanation: {
                            en: ['Use "Shall we...?" and "How about...?" to make suggestions.', 'Example: Shall we make some soup? Good idea!'],
                            vi: ['Sử dụng "Shall we...?" và "How about...?" để đưa ra gợi ý.', 'Ví dụ: Chúng ta làm một ít súp nhé? Ý kiến hay!']
                        }
                    }
                ],
                activities: [{
                    type: 'Practice',
                    description: {
                        en: ['Role-play planning a picnic.', 'Decide what food to bring using "some" and "any".'],
                        vi: ['Đóng vai lên kế hoạch cho một chuyến dã ngoại.', 'Quyết định mang theo thức ăn gì bằng cách sử dụng "some" và "any".']
                    }
                }]
            }
        ]
    },
    {
        id: 303,
        title: { en: 'Daily Tasks', vi: 'Công việc hàng ngày' },
        lessons: [
            {
                id: 30301,
                title: { en: 'Chores and Time', vi: 'Việc vặt và Thời gian' },
                aims: {
                    en: ['Talk about daily tasks and chores', 'Tell the time', 'Use adverbs of frequency'],
                    vi: ['Nói về công việc hàng ngày và việc vặt', 'Nói giờ', 'Sử dụng trạng từ chỉ tần suất']
                },
                vocabulary: [
                    { term: 'tidy up', pronunciation: '/ˈtaɪdi ʌp/', vietnamese: 'dọn dẹp' },
                    { term: 'do the shopping', pronunciation: '/duː ðə ˈʃɒpɪŋ/', vietnamese: 'đi mua sắm' },
                    { term: 'walk the dog', pronunciation: '/wɔːk ðə dɒɡ/', vietnamese: 'dắt chó đi dạo' },
                    { term: 'wash up', pronunciation: '/wɒʃ ʌp/', vietnamese: 'rửa bát' },
                    { term: 'sweep', pronunciation: '/swiːp/', vietnamese: 'quét nhà' },
                    { term: 'cook', pronunciation: '/kʊk/', vietnamese: 'nấu ăn' },
                    { term: 'dry the dishes', pronunciation: '/draɪ ðə ˈdɪʃɪz/', vietnamese: 'lau khô bát đĩa' },
                    { term: 'feed the dog', pronunciation: '/fiːd ðə dɒɡ/', vietnamese: 'cho chó ăn' }
                ],
                grammar: [
                    {
                        title: { en: 'Telling the Time', vi: 'Nói giờ' },
                        explanation: {
                            en: ['Learn to say the time using o\'clock, half past, quarter past, and quarter to.', 'Example: It\'s a quarter to one (12:45).'],
                            vi: ['Học cách nói giờ sử dụng o\'clock, half past, quarter past, và quarter to.', 'Ví dụ: Bây giờ là một giờ kém mười lăm (12:45).']
                        }
                    },
                    {
                        title: { en: 'Adverbs of Frequency', vi: 'Trạng từ chỉ tần suất' },
                        explanation: {
                            en: ['Use always, usually, sometimes, never to describe how often you do something.', 'Example: Amy sometimes walks her dog after school.'],
                            vi: ['Sử dụng always, usually, sometimes, never để mô tả tần suất bạn làm việc gì đó.', 'Ví dụ: Amy thỉnh thoảng dắt chó đi dạo sau giờ học.']
                        }
                    }
                ],
                activities: [{
                    type: 'Practice',
                    description: {
                        en: ['Play a game about telling time.', 'Talk about how often you do different chores.'],
                        vi: ['Chơi trò chơi về nói giờ.', 'Nói về tần suất bạn làm các công việc nhà khác nhau.']
                    }
                }]
            }
        ]
    },
    {
        id: 304,
        title: { en: 'Around Town', vi: 'Quanh thị trấn' },
        lessons: [
            {
                id: 30401,
                title: { en: 'Places and Purpose', vi: 'Địa điểm và Mục đích' },
                aims: {
                    en: ['Talk about places in town', 'Use prepositions of place', 'Use "going to" for purpose'],
                    vi: ['Nói về các địa điểm trong thị trấn', 'Sử dụng giới từ chỉ nơi chốn', 'Sử dụng "going to" để chỉ mục đích']
                },
                vocabulary: [
                    { term: 'bank', pronunciation: '/bæŋk/', vietnamese: 'ngân hàng' },
                    { term: 'tower', pronunciation: '/ˈtaʊər/', vietnamese: 'tòa tháp' },
                    { term: 'library', pronunciation: '/ˈlaɪbrəri/', vietnamese: 'thư viện' },
                    { term: 'market square', pronunciation: '/ˈmɑːkɪt skwɛər/', vietnamese: 'quảng trường chợ' },
                    { term: 'supermarket', pronunciation: '/ˈsuːpəmɑːkɪt/', vietnamese: 'siêu thị' },
                    { term: 'bus station', pronunciation: '/bʌs ˈsteɪʃən/', vietnamese: 'bến xe buýt' },
                    { term: 'sports centre', pronunciation: '/spɔːts ˈsɛntər/', vietnamese: 'trung tâm thể thao' },
                    { term: 'map', pronunciation: '/mæp/', vietnamese: 'bản đồ' }
                ],
                grammar: [
                    {
                        title: { en: 'Prepositions of Place', vi: 'Giới từ chỉ nơi chốn' },
                        explanation: {
                            en: ['Use opposite, above, near, below to describe locations.', 'Example: The school is opposite the park.'],
                            vi: ['Sử dụng opposite, above, near, below để mô tả vị trí.', 'Ví dụ: Trường học đối diện công viên.']
                        }
                    },
                    {
                        title: { en: 'going to + infinitive of purpose', vi: 'going to + động từ nguyên mẫu chỉ mục đích' },
                        explanation: {
                            en: ['Use "going to" to explain why you are going somewhere.', 'Example: I\'m going to the shop to buy some bread.'],
                            vi: ['Sử dụng "going to" để giải thích tại sao bạn đi đến một nơi nào đó.', 'Ví dụ: Tôi đi đến cửa hàng để mua một ít bánh mì.']
                        }
                    }
                ],
                activities: [{
                    type: 'Practice',
                    description: {
                        en: ['Describe locations on a map.', 'Ask and answer about why people are going to different places.'],
                        vi: ['Mô tả các vị trí trên bản đồ.', 'Hỏi và trả lời về lý do tại sao mọi người đi đến những nơi khác nhau.']
                    }
                }]
            }
        ]
    },
    {
        id: 305,
        title: { en: 'Under the Sea', vi: 'Dưới đáy biển' },
        lessons: [
            {
                id: 30501,
                title: { en: 'Sea Creatures and the Past', vi: 'Sinh vật biển và Quá khứ' },
                aims: {
                    en: ['Talk about sea creatures', 'Use "was/were" for the past', 'Ask questions with "Was/Were"'],
                    vi: ['Nói về các sinh vật biển', 'Sử dụng "was/were" cho quá khứ', 'Đặt câu hỏi với "Was/Were"']
                },
                vocabulary: [
                    { term: 'dolphin', pronunciation: '/ˈdɒlfɪn/', vietnamese: 'cá heo' },
                    { term: 'turtle', pronunciation: '/ˈtɜːtl/', vietnamese: 'rùa biển' },
                    { term: 'anchor', pronunciation: '/ˈæŋkər/', vietnamese: 'mỏ neo' },
                    { term: 'octopus', pronunciation: '/ˈɒktəpəs/', vietnamese: 'bạch tuộc' },
                    { term: 'seahorse', pronunciation: '/ˈsiːhɔːs/', vietnamese: 'cá ngựa' },
                    { term: 'seal', pronunciation: '/siːl/', vietnamese: 'hải cẩu' },
                    { term: 'starfish', pronunciation: '/ˈstɑːfɪʃ/', vietnamese: 'sao biển' },
                    { term: 'shell', pronunciation: '/ʃɛl/', vietnamese: 'vỏ sò' }
                ],
                grammar: [{
                    title: { en: 'Simple Past with was/were', vi: 'Thì Quá khứ đơn với was/were' },
                    explanation: {
                        en: ['Use "was" for singular subjects (I, he, she, it) and "were" for plural subjects (we, you, they).', 'Example: Baijis were river dolphins. Were you in the sea? Yes, I was.'],
                        vi: ['Sử dụng "was" cho chủ ngữ số ít (I, he, she, it) và "were" cho chủ ngữ số nhiều (we, you, they).', 'Ví dụ: Baijis là cá heo sông. Bạn có ở biển không? Có, tôi có.']
                    }
                }],
                activities: [{
                    type: 'Practice',
                    description: {
                        en: ['Talk about extinct animals using "was/were".', 'Play a guessing game about where you were yesterday.'],
                        vi: ['Nói về các loài động vật đã tuyệt chủng bằng cách sử dụng "was/were".', 'Chơi trò chơi đoán về nơi bạn đã ở ngày hôm qua.']
                    }
                }]
            }
        ]
    },
    {
        id: 306,
        title: { en: 'Gadgets', vi: 'Thiết bị điện tử' },
        lessons: [
            {
                id: 30601,
                title: { en: 'Comparing Gadgets', vi: 'So sánh các thiết bị' },
                aims: {
                    en: ['Talk about electronic gadgets', 'Use comparatives and superlatives'],
                    vi: ['Nói về các thiết bị điện tử', 'Sử dụng so sánh hơn và so sánh nhất']
                },
                vocabulary: [
                    { term: 'lift', pronunciation: '/lɪft/', vietnamese: 'thang máy' },
                    { term: 'walkie-talkie', pronunciation: '/ˌwɔːki ˈtɔːki/', vietnamese: 'bộ đàm' },
                    { term: 'torch', pronunciation: '/tɔːtʃ/', vietnamese: 'đèn pin' },
                    { term: 'CD player', pronunciation: '/ˌsiːˈdiː ˈpleɪər/', vietnamese: 'máy nghe đĩa CD' },
                    { term: 'laptop', pronunciation: '/ˈlæptɒp/', vietnamese: 'máy tính xách tay' },
                    { term: 'games console', pronunciation: '/ɡeɪmz ˈkɒnsəʊl/', vietnamese: 'máy chơi game' }
                ],
                grammar: [
                    {
                        title: { en: 'Comparatives', vi: 'So sánh hơn' },
                        explanation: {
                            en: ['Use "-er than" for short adjectives and "more ... than" for long adjectives.', 'Example: The DX24 is bigger than the DX32.'],
                            vi: ['Sử dụng "-er than" cho tính từ ngắn và "more ... than" cho tính từ dài.', 'Ví dụ: DX24 lớn hơn DX32.']
                        }
                    },
                    {
                        title: { en: 'Superlatives', vi: 'So sánh nhất' },
                        explanation: {
                            en: ['Use "the -est" for short adjectives and "the most ..." for long adjectives.', 'Example: The Airbus A380 is the biggest plane in the world.'],
                            vi: ['Sử dụng "the -est" cho tính từ ngắn và "the most ..." cho tính từ dài.', 'Ví dụ: Airbus A380 là chiếc máy bay lớn nhất thế giới.']
                        }
                    }
                ],
                activities: [{
                    type: 'Practice',
                    description: {
                        en: ['Play a game: "Which is more expensive?".', 'Create an animal quiz using superlatives.'],
                        vi: ['Chơi trò chơi: "Cái nào đắt hơn?".', 'Tạo một bài đố về động vật sử dụng so sánh nhất.']
                    }
                }]
            }
        ]
    },
    {
        id: 307,
        title: { en: 'In the Hospital', vi: 'Trong bệnh viện' },
        lessons: [
            {
                id: 30701,
                title: { en: 'Health and Past Actions', vi: 'Sức khỏe và Hành động quá khứ' },
                aims: {
                    en: ['Talk about health problems', 'Use the Simple Past (regular and irregular verbs)'],
                    vi: ['Nói về các vấn đề sức khỏe', 'Sử dụng thì Quá khứ đơn (động từ có quy tắc và bất quy tắc)']
                },
                vocabulary: [
                    { term: 'earache', pronunciation: '/ˈɪəreɪk/', vietnamese: 'đau tai' },
                    { term: 'headache', pronunciation: '/ˈhɛdeɪk/', vietnamese: 'đau đầu' },
                    { term: 'cold', pronunciation: '/kəʊld/', vietnamese: 'cảm lạnh' },
                    { term: 'doctor', pronunciation: '/ˈdɒktər/', vietnamese: 'bác sĩ' },
                    { term: 'toothache', pronunciation: '/ˈtuːθeɪk/', vietnamese: 'đau răng' },
                    { term: 'nurse', pronunciation: '/nɜːs/', vietnamese: 'y tá' },
                    { term: 'stomach-ache', pronunciation: '/ˈstʌmək-eɪk/', vietnamese: 'đau bụng' },
                    { term: 'cough', pronunciation: '/kɒf/', vietnamese: 'ho' }
                ],
                grammar: [{
                    title: { en: 'Simple Past', vi: 'Thì Quá khứ đơn' },
                    explanation: {
                        en: ['For regular verbs, add "-ed". For irregular verbs, use the past form.', 'Example (regular): I jumped yesterday.', 'Example (irregular): I went to the doctor.'],
                        vi: ['Đối với động từ có quy tắc, thêm "-ed". Đối với động từ bất quy tắc, sử dụng dạng quá khứ.', 'Ví dụ (có quy tắc): Tôi đã nhảy ngày hôm qua.', 'Ví dụ (bất quy tắc): Tôi đã đi khám bác sĩ.']
                    }
                }],
                activities: [{
                    type: 'Practice',
                    description: {
                        en: ['Mime a health problem for a partner to guess.', 'Create a story about what you did yesterday.'],
                        vi: ['Diễn tả một vấn đề sức khỏe để bạn đoán.', 'Tạo một câu chuyện về những gì bạn đã làm ngày hôm qua.']
                    }
                }]
            }
        ]
    },
    {
        id: 308,
        title: { en: 'Around the World', vi: 'Vòng quanh thế giới' },
        lessons: [
            {
                id: 30801,
                title: { en: 'Countries and Past Trips', vi: 'Các quốc gia và Chuyến đi quá khứ' },
                aims: {
                    en: ['Talk about countries', 'Use Simple Past negatives and questions'],
                    vi: ['Nói về các quốc gia', 'Sử dụng câu phủ định và câu hỏi thì Quá khứ đơn']
                },
                vocabulary: [
                    { term: 'Egypt', pronunciation: '/ˈiːdʒɪpt/', vietnamese: 'Ai Cập' },
                    { term: 'China', pronunciation: '/ˈtʃaɪnə/', vietnamese: 'Trung Quốc' },
                    { term: 'Spain', pronunciation: '/speɪn/', vietnamese: 'Tây Ban Nha' },
                    { term: 'Brazil', pronunciation: '/brəˈzɪl/', vietnamese: 'Brazil' },
                    { term: 'Australia', pronunciation: '/ɒˈstreɪliə/', vietnamese: 'Úc' },
                    { term: 'India', pronunciation: '/ˈɪndiə/', vietnamese: 'Ấn Độ' }
                ],
                grammar: [{
                    title: { en: 'Simple Past (Negatives and Questions)', vi: 'Thì Quá khứ đơn (Phủ định và Câu hỏi)' },
                    explanation: {
                        en: ["Use 'didn't + verb' for negatives. Use 'Did ... + verb?' for questions.", 'Example: Molly didn\'t see the lion. Did you go shopping? Yes, I did.'],
                        vi: ["Sử dụng 'didn't + động từ' cho câu phủ định. Sử dụng 'Did ... + động từ?' cho câu hỏi.", 'Ví dụ: Molly đã không nhìn thấy con sư tử. Bạn có đi mua sắm không? Có, tôi có.']
                    }
                }],
                activities: [{
                    type: 'Practice',
                    description: {
                        en: ['Play a flag game.', 'Interview an "astronaut" about their trip to space.'],
                        vi: ['Chơi trò chơi về cờ.', 'Phỏng vấn một "phi hành gia" về chuyến đi vào không gian của họ.']
                    }
                }]
            }
        ]
    }
];

export const sm3Data: CurriculumLevel = {
    level: 4, // Grade 4
    title: { en: 'Super Minds 3', vi: 'Super Minds 3' },
    subtitle: { en: 'Primary School - Grade 4', vi: 'Tiểu học - Lớp 4' },
    ebookPdfUrl: 'https://drive.google.com/file/d/14gY5Jvoch8uOtDKzWzU_EToeCrUTtAcs/view?usp=sharing',
    units: sm3Units
};

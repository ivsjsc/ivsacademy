import { CurriculumLevel, Unit } from '../types';

const sm4Units: Unit[] = [
    {
        id: 400,
        title: { en: 'Well done, Ben and Lucy!', vi: 'Làm tốt lắm, Ben và Lucy!' },
        lessons: [
            {
                id: 40001,
                title: { en: 'Town Events', vi: 'Sự kiện trong thị trấn' },
                aims: {
                    en: ['Talk about town events', 'Review Simple Present questions'],
                    vi: ['Nói về các sự kiện trong thị trấn', 'Ôn tập câu hỏi thì Hiện tại đơn']
                },
                vocabulary: [
                    { term: 'big wheel', pronunciation: '/bɪɡ wiːl/', vietnamese: 'vòng quay lớn' },
                    { term: 'rollercoaster', pronunciation: '/ˈrəʊləkəʊstər/', vietnamese: 'tàu lượn siêu tốc' },
                    { term: 'mayor', pronunciation: '/mɛər/', vietnamese: 'thị trưởng' },
                    { term: 'microphone', pronunciation: '/ˈmaɪkrəfəʊn/', vietnamese: 'micrô' },
                    { term: 'band', pronunciation: '/bænd/', vietnamese: 'ban nhạc' },
                    { term: 'photographer', pronunciation: '/fəˈtɒɡrəfər/', vietnamese: 'nhiếp ảnh gia' },
                    { term: 'journalist', pronunciation: '/ˈdʒɜːnəlɪst/', vietnamese: 'nhà báo' },
                ],
                grammar: [{
                    title: { en: 'Simple Present Questions', vi: 'Câu hỏi thì Hiện tại đơn' },
                    explanation: {
                        en: ["Review asking questions with 'Do/Does...'.", "Example: Do you like going on adventures?"],
                        vi: ["Ôn tập cách đặt câu hỏi với 'Do/Does...'.", "Ví dụ: Bạn có thích đi phiêu lưu không?"]
                    }
                }],
                activities: [{
                    type: 'Practice',
                    description: {
                        en: ['Play a secret word game.', 'Interview a friend to find out four new things.'],
                        vi: ['Chơi trò chơi từ bí mật.', 'Phỏng vấn một người bạn để tìm ra bốn điều mới.']
                    }
                }]
            }
        ]
    },
    {
        id: 401,
        title: { en: 'In the Museum', vi: 'Trong bảo tàng' },
        lessons: [
            {
                id: 40101,
                title: { en: 'Knights, Queens, and Rules', vi: 'Hiệp sĩ, Nữ hoàng và Quy tắc' },
                aims: {
                    en: ['Talk about historical items', 'Use "must/mustn\'t" for rules', 'Understand direct and indirect objects'],
                    vi: ['Nói về các vật phẩm lịch sử', 'Sử dụng "must/mustn\'t" cho các quy tắc', 'Hiểu về tân ngữ trực tiếp và gián tiếp']
                },
                vocabulary: [
                    { term: 'queen', pronunciation: '/kwiːn/', vietnamese: 'nữ hoàng' },
                    { term: 'knight', pronunciation: '/naɪt/', vietnamese: 'hiệp sĩ' },
                    { term: 'crown', pronunciation: '/kraʊn/', vietnamese: 'vương miện' },
                    { term: 'helmet', pronunciation: '/ˈhɛlmɪt/', vietnamese: 'mũ sắt' },
                    { term: 'necklace', pronunciation: '/ˈnɛkləs/', vietnamese: 'vòng cổ' },
                    { term: 'shield', pronunciation: '/ʃiːld/', vietnamese: 'khiên' },
                    { term: 'sword', pronunciation: '/sɔːd/', vietnamese: 'gươm' },
                ],
                grammar: [
                    {
                        title: { en: 'must/mustn\'t', vi: 'phải/không được phép' },
                        explanation: {
                            en: ["Use 'must' for obligations and 'mustn't' for prohibitions.", 'Example: You must speak quietly. You mustn\'t touch the exhibits.'],
                            vi: ["Sử dụng 'must' cho nghĩa vụ và 'mustn't' cho sự cấm đoán.", 'Ví dụ: Bạn phải nói nhỏ. Bạn không được chạm vào các vật trưng bày.']
                        }
                    },
                    {
                        title: { en: 'Direct and Indirect Objects', vi: 'Tân ngữ Trực tiếp và Gián tiếp' },
                        explanation: {
                            en: ['Some verbs can have two objects. The indirect object is usually a person.', 'Example: Give me (indirect) the book (direct).'],
                            vi: ['Một số động từ có thể có hai tân ngữ. Tân ngữ gián tiếp thường là một người.', 'Ví dụ: Đưa cho tôi (gián tiếp) cuốn sách (trực tiếp).']
                        }
                    }
                ],
                activities: [{
                    type: 'Practice',
                    description: {
                        en: ['Play a game "mustn\'t forget".', 'Practice making sentences with two objects.'],
                        vi: ['Chơi trò chơi "không được quên".', 'Thực hành đặt câu với hai tân ngữ.']
                    }
                }]
            }
        ]
    },
    {
        id: 402,
        title: { en: 'The World Around Us', vi: 'Thế giới quanh ta' },
        lessons: [
            {
                id: 40201,
                title: { en: 'Countryside and Abilities', vi: 'Nông thôn và Khả năng' },
                aims: {
                    en: ['Talk about the countryside', 'Use connectors (but, and, because, so)', 'Use "could/couldn\'t" for past ability'],
                    vi: ['Nói về vùng nông thôn', 'Sử dụng các từ nối (but, and, because, so)', 'Sử dụng "could/couldn\'t" cho khả năng trong quá khứ']
                },
                vocabulary: [
                    { term: 'mountain', pronunciation: '/ˈmaʊntɪn/', vietnamese: 'núi' },
                    { term: 'forest', pronunciation: '/ˈfɒrɪst/', vietnamese: 'rừng' },
                    { term: 'village', pronunciation: '/ˈvɪlɪdʒ/', vietnamese: 'làng' },
                    { term: 'lake', pronunciation: '/leɪk/', vietnamese: 'hồ' },
                    { term: 'island', pronunciation: '/ˈaɪlənd/', vietnamese: 'đảo' },
                    { term: 'field', pronunciation: '/fiːld/', vietnamese: 'cánh đồng' },
                    { term: 'river', pronunciation: '/ˈrɪvər/', vietnamese: 'sông' },
                    { term: 'path', pronunciation: '/pɑːθ/', vietnamese: 'con đường' },
                ],
                grammar: [{
                    title: { en: 'could/couldn\'t', vi: 'có thể/không thể (quá khứ)' },
                    explanation: {
                        en: ["Use 'could/couldn't' to talk about ability in the past.", 'Example: When I was a baby, I couldn\'t walk.'],
                        vi: ["Sử dụng 'could/couldn't' để nói về khả năng trong quá khứ.", 'Ví dụ: Khi tôi còn là một đứa bé, tôi không thể đi được.']
                    }
                }],
                activities: [{
                    type: 'Practice',
                    description: {
                        en: ['Play "I spy" with countryside vocabulary.', 'Talk about what your grandparents could do when they were young.'],
                        vi: ['Chơi trò "Tôi thấy" với từ vựng về nông thôn.', 'Nói về những gì ông bà của bạn có thể làm khi họ còn trẻ.']
                    }
                }]
            }
        ]
    },
    {
        id: 403,
        title: { en: 'Danger!', vi: 'Nguy hiểm!' },
        lessons: [
            {
                id: 40301,
                title: { en: 'Emergencies and Past Actions', vi: 'Tình huống khẩn cấp và Hành động quá khứ' },
                aims: {
                    en: ['Talk about emergencies', 'Use the Past Continuous', 'Ask questions in the Past Continuous'],
                    vi: ['Nói về các tình huống khẩn cấp', 'Sử dụng thì Quá khứ tiếp diễn', 'Đặt câu hỏi ở thì Quá khứ tiếp diễn']
                },
                vocabulary: [
                    { term: 'fire', pronunciation: '/faɪər/', vietnamese: 'lửa' },
                    { term: 'flood', pronunciation: '/flʌd/', vietnamese: 'lũ lụt' },
                    { term: 'police car', pronunciation: '/pəˈliːs kɑːr/', vietnamese: 'xe cảnh sát' },
                    { term: 'fire engine', pronunciation: '/ˈfaɪər ˈɛndʒɪn/', vietnamese: 'xe cứu hỏa' },
                    { term: 'ambulance', pronunciation: '/ˈæmbjələns/', vietnamese: 'xe cứu thương' },
                    { term: 'paramedic', pronunciation: '/ˌpærəˈmɛdɪk/', vietnamese: 'nhân viên cấp cứu' },
                ],
                grammar: [{
                    title: { en: 'Past Continuous', vi: 'Thì Quá khứ tiếp diễn' },
                    explanation: {
                        en: ['Use "was/were + verb-ing" to talk about an action in progress in the past.', 'Example: When the phone rang, I was reading a book.'],
                        vi: ['Sử dụng "was/were + động từ-ing" để nói về một hành động đang diễn ra trong quá khứ.', 'Ví dụ: Khi điện thoại reo, tôi đang đọc sách.']
                    }
                }],
                activities: [{
                    type: 'Practice',
                    description: {
                        en: ['Create short dialogues about emergencies.', 'Ask and answer about what you were doing yesterday at a specific time.'],
                        vi: ['Tạo các đoạn hội thoại ngắn về các tình huống khẩn cấp.', 'Hỏi và trả lời về những gì bạn đang làm vào một thời điểm cụ thể ngày hôm qua.']
                    }
                }]
            }
        ]
    },
    {
        id: 404,
        title: { en: 'Two Return Tickets', vi: 'Hai vé khứ hồi' },
        lessons: [
            {
                id: 40401,
                title: { en: 'At the Station', vi: 'Tại nhà ga' },
                aims: {
                    en: ['Talk about being at a train station', 'Use prepositions of time (at/in/on)', 'Combine Past Continuous and Simple Past'],
                    vi: ['Nói về việc ở nhà ga', 'Sử dụng giới từ chỉ thời gian (at/in/on)', 'Kết hợp thì Quá khứ tiếp diễn và Quá khứ đơn']
                },
                vocabulary: [
                    { term: 'station', pronunciation: '/ˈsteɪʃən/', vietnamese: 'nhà ga' },
                    { term: 'platform', pronunciation: '/ˈplætfɔːm/', vietnamese: 'sân ga' },
                    { term: 'escalator', pronunciation: '/ˈɛskəleɪtər/', vietnamese: 'thang cuốn' },
                    { term: 'ticket office', pronunciation: '/ˈtɪkɪt ˈɒfɪs/', vietnamese: 'phòng vé' },
                    { term: 'train driver', pronunciation: '/treɪn ˈdraɪvər/', vietnamese: 'lái tàu' },
                    { term: 'rucksack', pronunciation: '/ˈrʌksæk/', vietnamese: 'ba lô' },
                    { term: 'suitcase', pronunciation: '/ˈsuːtkeɪs/', vietnamese: 'vali' },
                ],
                grammar: [
                    {
                        title: { en: 'Prepositions of Time (at, in, on)', vi: 'Giới từ chỉ thời gian (at, in, on)' },
                        explanation: {
                            en: ['Use "at" for specific times, "on" for days and dates, "in" for months, years, and seasons.', 'Example: The train leaves at 3pm on Saturday in September.'],
                            vi: ['Sử dụng "at" cho thời gian cụ thể, "on" cho ngày và ngày tháng, "in" cho tháng, năm và mùa.', 'Ví dụ: Chuyến tàu khởi hành lúc 3 giờ chiều vào thứ Bảy trong tháng Chín.']
                        }
                    },
                    {
                        title: { en: 'Past Continuous and Simple Past', vi: 'Thì Quá khứ tiếp diễn và Quá khứ đơn' },
                        explanation: {
                            en: ['Use the Past Continuous for a background action and the Simple Past for a shorter, interrupting action.', 'Example: A man was reading a paper when the train arrived.'],
                            vi: ['Sử dụng thì Quá khứ tiếp diễn cho một hành động nền và thì Quá khứ đơn cho một hành động ngắn hơn, xen vào.', 'Ví dụ: Một người đàn ông đang đọc báo thì tàu đến.']
                        }
                    }
                ],
                activities: [{
                    type: 'Practice',
                    description: {
                        en: ['Play a price game about tickets.', 'Create sentences combining past actions.'],
                        vi: ['Chơi trò chơi về giá vé.', 'Tạo câu kết hợp các hành động trong quá khứ.']
                    }
                }]
            }
        ]
    },
    {
        id: 405,
        title: { en: 'Police!', vi: 'Cảnh sát!' },
        lessons: [
            {
                id: 40501,
                title: { en: 'Descriptions and Past Habits', vi: 'Miêu tả và Thói quen quá khứ' },
                aims: {
                    en: ['Describe people\'s hair and face', 'Use "used to" for past habits', 'Use "had to" for past obligations'],
                    vi: ['Miêu tả tóc và khuôn mặt của mọi người', 'Sử dụng "used to" cho thói quen trong quá khứ', 'Sử dụng "had to" cho nghĩa vụ trong quá khứ']
                },
                vocabulary: [
                    { term: 'dark', pronunciation: '/dɑːk/', vietnamese: 'tối màu' },
                    { term: 'blonde', pronunciation: '/blɒnd/', vietnamese: 'vàng hoe' },
                    { term: 'fair', pronunciation: '/fɛər/', vietnamese: 'sáng màu' },
                    { term: 'moustache', pronunciation: '/məˈstɑːʃ/', vietnamese: 'ria mép' },
                    { term: 'curly', pronunciation: '/ˈkɜːli/', vietnamese: 'xoăn' },
                    { term: 'beard', pronunciation: '/bɪəd/', vietnamese: 'râu' },
                    { term: 'scar', pronunciation: '/skɑːr/', vietnamese: 'sẹo' },
                    { term: 'straight', pronunciation: '/streɪt/', vietnamese: 'thẳng' },
                ],
                grammar: [
                    {
                        title: { en: 'used to', vi: 'đã từng' },
                        explanation: {
                            en: ["Use 'used to' to talk about past habits or states that are no longer true.", 'Example: He used to be a police officer.'],
                            vi: ["Sử dụng 'used to' để nói về các thói quen hoặc trạng thái trong quá khứ không còn đúng nữa.", 'Ví dụ: Ông ấy đã từng là một cảnh sát.']
                        }
                    },
                    {
                        title: { en: 'had to', vi: 'đã phải' },
                        explanation: {
                            en: ["Use 'had to' to talk about obligation in the past.", 'Example: He had to do the washing up.'],
                            vi: ["Sử dụng 'had to' để nói về nghĩa vụ trong quá khứ.", 'Ví dụ: Anh ấy đã phải rửa bát.']
                        }
                    }
                ],
                activities: [{
                    type: 'Practice',
                    description: {
                        en: ['Play a description game.', 'Talk about what you used to do when you were younger.'],
                        vi: ['Chơi trò chơi miêu tả.', 'Nói về những gì bạn đã từng làm khi còn nhỏ.']
                    }
                }]
            }
        ]
    },
    {
        id: 406,
        title: { en: 'Mythical Beasts', vi: 'Quái vật thần thoại' },
        lessons: [
            {
                id: 40601,
                title: { en: 'Animal Bodies and Comparisons', vi: 'Cơ thể động vật và So sánh' },
                aims: {
                    en: ['Talk about animal body parts', 'Review comparatives and superlatives', 'Ask what something looks like'],
                    vi: ['Nói về các bộ phận cơ thể động vật', 'Ôn tập so sánh hơn và so sánh nhất', 'Hỏi xem cái gì đó trông như thế nào']
                },
                vocabulary: [
                    { term: 'tail', pronunciation: '/teɪl/', vietnamese: 'đuôi' },
                    { term: 'horn', pronunciation: '/hɔːn/', vietnamese: 'sừng' },
                    { term: 'back', pronunciation: '/bæk/', vietnamese: 'lưng' },
                    { term: 'scales', pronunciation: '/skeɪlz/', vietnamese: 'vảy' },
                    { term: 'wing', pronunciation: '/wɪŋ/', vietnamese: 'cánh' },
                    { term: 'neck', pronunciation: '/nɛk/', vietnamese: 'cổ' },
                    { term: 'feathers', pronunciation: '/ˈfɛðəz/', vietnamese: 'lông vũ' },
                    { term: 'tongue', pronunciation: '/tʌŋ/', vietnamese: 'lưỡi' },
                ],
                grammar: [{
                    title: { en: 'What does it look like?', vi: 'Nó trông như thế nào?' },
                    explanation: {
                        en: ["Use 'What does it look like?' to ask for a description.", 'Example: What does a unicorn look like? It looks like a white horse with a horn.'],
                        vi: ["Sử dụng 'What does it look like?' để hỏi về mô tả.", 'Ví dụ: Kỳ lân trông như thế nào? Nó trông giống một con ngựa trắng có sừng.']
                    }
                }],
                activities: [{
                    type: 'Practice',
                    description: {
                        en: ['Play an animal game.', 'Create a mythical beast and describe it.'],
                        vi: ['Chơi một trò chơi về động vật.', 'Tạo ra một con quái vật thần thoại và miêu tả nó.']
                    }
                }]
            }
        ]
    },
    {
        id: 407,
        title: { en: 'Orchestra Practice', vi: 'Buổi tập của dàn nhạc' },
        lessons: [
            {
                id: 40701,
                title: { en: 'Instruments and Possession', vi: 'Nhạc cụ và Sở hữu' },
                aims: {
                    en: ['Talk about musical instruments', 'Use possessive pronouns', 'Use relative clauses (who, which, where)'],
                    vi: ['Nói về các nhạc cụ', 'Sử dụng đại từ sở hữu', 'Sử dụng mệnh đề quan hệ (who, which, where)']
                },
                vocabulary: [
                    { term: 'tambourine', pronunciation: '/ˌtæmbəˈriːn/', vietnamese: 'trống lục lạc' },
                    { term: 'triangle', pronunciation: '/ˈtraɪæŋɡl/', vietnamese: 'kẻng tam giác' },
                    { term: 'trumpet', pronunciation: '/ˈtrʌmpɪt/', vietnamese: 'kèn trumpet' },
                    { term: 'drums', pronunciation: '/drʌmz/', vietnamese: 'trống' },
                    { term: 'harp', pronunciation: '/hɑːp/', vietnamese: 'đàn hạc' },
                    { term: 'saxophone', pronunciation: '/ˈsæksəfəʊn/', vietnamese: 'kèn saxophone' },
                    { term: 'keyboard', pronunciation: '/ˈkiːbɔːd/', vietnamese: 'đàn organ' },
                    { term: 'violin', pronunciation: '/ˌvaɪəˈlɪn/', vietnamese: 'đàn vi-ô-lông' },
                ],
                grammar: [
                    {
                        title: { en: 'Possessive Pronouns', vi: 'Đại từ sở hữu' },
                        explanation: {
                            en: ['Use mine, yours, his, hers, ours, theirs to show possession.', 'Example: Is this yours? Yes, it\'s mine.'],
                            vi: ['Sử dụng mine, yours, his, hers, ours, theirs để chỉ sự sở hữu.', 'Ví dụ: Cái này có phải của bạn không? Vâng, nó là của tôi.']
                        }
                    },
                    {
                        title: { en: 'Relative Clauses', vi: 'Mệnh đề quan hệ' },
                        explanation: {
                            en: ["Use 'who' for people, 'which' for things, and 'where' for places.", 'Example: Connor\'s the boy who plays the recorder.'],
                            vi: ["Sử dụng 'who' cho người, 'which' cho vật, và 'where' cho nơi chốn.", 'Ví dụ: Connor là cậu bé chơi sáo recorder.']
                        }
                    }
                ],
                activities: [{
                    type: 'Practice',
                    description: {
                        en: ['Play a mime game with instruments.', 'Play "Whose is it?" game.'],
                        vi: ['Chơi trò diễn tả với các nhạc cụ.', 'Chơi trò "Của ai?".']
                    }
                }]
            }
        ]
    },
    {
        id: 408,
        title: { en: 'In the Planetarium', vi: 'Trong nhà mô hình vũ trụ' },
        lessons: [
            {
                id: 40801,
                title: { en: 'Space and the Future', vi: 'Không gian và Tương lai' },
                aims: {
                    en: ['Talk about space', 'Use "will" for the future', 'Use adverbs'],
                    vi: ['Nói về không gian', 'Sử dụng "will" cho tương lai', 'Sử dụng trạng từ']
                },
                vocabulary: [
                    { term: 'planet', pronunciation: '/ˈplænɪt/', vietnamese: 'hành tinh' },
                    { term: 'rocket', pronunciation: '/ˈrɒkɪt/', vietnamese: 'tên lửa' },
                    { term: 'UFO', pronunciation: '/ˌjuː ɛf ˈəʊ/', vietnamese: 'Vật thể bay không xác định' },
                    { term: 'star', pronunciation: '/stɑːr/', vietnamese: 'ngôi sao' },
                    { term: 'comet', pronunciation: '/ˈkɒmɪt/', vietnamese: 'sao chổi' },
                    { term: 'telescope', pronunciation: '/ˈtɛlɪskəʊp/', vietnamese: 'kính thiên văn' },
                    { term: 'astronaut', pronunciation: '/ˈæstrənɔːt/', vietnamese: 'phi hành gia' },
                    { term: 'space station', pronunciation: '/speɪs ˈsteɪʃən/', vietnamese: 'trạm vũ trụ' },
                ],
                grammar: [
                    {
                        title: { en: 'Future with "will"', vi: 'Tương lai với "will"' },
                        explanation: {
                            en: ['Use "will" to make predictions about the future.', 'Example: What will you be when you grow up? I\'ll be an astronaut.'],
                            vi: ['Sử dụng "will" để đưa ra dự đoán về tương lai.', 'Ví dụ: Bạn sẽ làm gì khi lớn lên? Tôi sẽ là một phi hành gia.']
                        }
                    },
                    {
                        title: { en: 'Adverbs', vi: 'Trạng từ' },
                        explanation: {
                            en: ['Adverbs describe verbs. Many end in "-ly".', 'Example: He hurt his head badly.'],
                            vi: ['Trạng từ mô tả động từ. Nhiều trạng từ kết thúc bằng "-ly".', 'Ví dụ: Anh ấy bị đau đầu nặng.']
                        }
                    }
                ],
                activities: [{
                    type: 'Practice',
                    description: {
                        en: ['Describe and guess space objects.', 'Give instructions to a friend using adverbs.'],
                        vi: ['Mô tả và đoán các vật thể trong không gian.', 'Đưa ra hướng dẫn cho một người bạn bằng cách sử dụng trạng từ.']
                    }
                }]
            }
        ]
    }
];

export const sm4Data: CurriculumLevel = {
    level: 5, // Grade 5
    title: { en: 'Super Minds 4', vi: 'Super Minds 4' },
    subtitle: { en: 'Primary School - Grade 5', vi: 'Tiểu học - Lớp 5' },
    ebookPdfUrl: 'https://drive.google.com/file/d/1oD4Z-xEK_aA2Q6gblJLbL26g5hnoHaQ7/view?usp=sharing',
    units: sm4Units
};

import { CurriculumLevel } from '../types';

// Base URL for Super Minds 2 images
const SM_BASE = 'https://storage.googleapis.com/maker-suite-project-files-prod/upload/flashcard_images/superminds_';

export const sm2Data: CurriculumLevel = {
    level: 3, // Grade 3
    title: { en: 'Super Minds 2', vi: 'Super Minds 2' },
    subtitle: { en: 'Primary School - Grade 3', vi: 'Tiểu học - Lớp 3' },
    ebookPdfUrl: 'https://drive.google.com/file/d/1FrJIjWL7T39vqqb_1EXt_YGD5Z21Heyt/view?usp=drive_link',
    units: [
        {
            id: 200,
            title: { en: 'Back to school', vi: 'Trở lại trường học' },
            lessons: [
                {
                    id: 20001,
                    title: { en: 'The classroom', vi: 'Lớp học' },
                    aims: {
                        en: ['Identify classroom objects.', 'Use "There is/There are".', 'Understand and use imperatives.'],
                        vi: ['Nhận biết các đồ vật trong lớp học.', 'Sử dụng "There is/There are".', 'Hiểu và sử dụng câu mệnh lệnh.']
                    },
                    vocabulary: [
                        { term: 'door', pronunciation: '/dɔːr/', vietnamese: 'cửa ra vào', imageUrl: `${SM_BASE}door.png` },
                        { term: 'bookcase', pronunciation: '/ˈbʊkkeɪs/', vietnamese: 'tủ sách', imageUrl: `${SM_BASE}bookcase.png` },
                        { term: 'wall', pronunciation: '/wɔːl/', vietnamese: 'bức tường', imageUrl: `${SM_BASE}wall.png` },
                        { term: 'clock', pronunciation: '/klɒk/', vietnamese: 'đồng hồ', imageUrl: `${SM_BASE}clock.png` },
                        { term: 'window', pronunciation: '/ˈwɪndoʊ/', vietnamese: 'cửa sổ', imageUrl: `${SM_BASE}window.png` },
                        { term: 'board', pronunciation: '/bɔːrd/', vietnamese: 'bảng', imageUrl: `${SM_BASE}board.png` },
                        { term: 'cupboard', pronunciation: '/ˈkʌbərd/', vietnamese: 'tủ chén', imageUrl: `${SM_BASE}cupboard.png` },
                        { term: 'chair', pronunciation: '/tʃer/', vietnamese: 'ghế', imageUrl: `${SM_BASE}chair.png` },
                        { term: 'floor', pronunciation: '/flɔːr/', vietnamese: 'sàn nhà', imageUrl: `${SM_BASE}floor.png` },
                    ],
                    grammar: [
                        { title: { en: 'There is / There are', vi: 'Có / Có những' }, explanation: { en: ["Use 'There's a (car).' for singular.", "Use 'There are some (balls).' for plural."], vi: ["Sử dụng 'There's a (car).' cho số ít.", "Sử dụng 'There are some (balls).' cho số nhiều."] } },
                        { title: { en: 'Imperatives', vi: 'Câu mệnh lệnh' }, explanation: { en: ["Use 'Stand up.' for commands.", "Use 'Don't stand up.' for negative commands."], vi: ["Sử dụng 'Stand up.' cho câu ra lệnh.", "Sử dụng 'Don't stand up.' cho câu ra lệnh phủ định."] } }
                    ],
                    activities: [{
                        type: 'Practice',
                        description: { 
                            en: ['Listen and point to the classroom objects.', 'Play a game with "There is/There are".'],
                            vi: ['Nghe và chỉ vào các đồ vật trong lớp.', 'Chơi trò chơi với "There is/There are".']
                        }
                    }]
                }
            ]
        },
        {
            id: 201,
            title: { en: 'Unit 1: My day', vi: 'Bài 1: Ngày của tôi' },
            lessons: [
                {
                    id: 20101,
                    title: { en: 'Daily routines', vi: 'Hoạt động hàng ngày' },
                    aims: {
                        en: ['Talk about daily activities.', 'Tell the time.', 'Use the present simple for routines.'],
                        vi: ['Nói về các hoạt động hàng ngày.', 'Nói giờ.', 'Sử dụng thì hiện tại đơn cho các thói quen.']
                    },
                    vocabulary: [
                        { term: 'get up', pronunciation: '/ɡɛt ʌp/', vietnamese: 'thức dậy' },
                        { term: 'get dressed', pronunciation: '/ɡɛt drɛst/', vietnamese: 'mặc quần áo' },
                        { term: 'have breakfast', pronunciation: '/hæv ˈbrɛkfəst/', vietnamese: 'ăn sáng' },
                        { term: 'brush your teeth', pronunciation: '/brʌʃ jɔːr tiːθ/', vietnamese: 'đánh răng' },
                        { term: 'go to school', pronunciation: '/ɡoʊ tuː skuːl/', vietnamese: 'đi học' },
                        { term: 'have lunch', pronunciation: '/hæv lʌntʃ/', vietnamese: 'ăn trưa' },
                        { term: 'play in the park', pronunciation: '/pleɪ ɪn ðə pɑːrk/', vietnamese: 'chơi ở công viên' },
                        { term: 'have dinner', pronunciation: '/hæv ˈdɪnər/', vietnamese: 'ăn tối' },
                        { term: 'go to bed', pronunciation: '/ɡoʊ tuː bɛd/', vietnamese: 'đi ngủ' },
                    ],
                    grammar: [
                        { title: { en: 'Telling the time', vi: 'Nói giờ' }, explanation: { en: ["What's the time? It's (nine) o'clock.", "When do you (have lunch)? At (one) o'clock."], vi: ["Mấy giờ rồi? Bây giờ là (chín) giờ.", "Bạn (ăn trưa) khi nào? Vào lúc (một) giờ."] } },
                        { title: { en: 'Present Simple (3rd person)', vi: 'Thì hiện tại đơn (ngôi thứ 3)' }, explanation: { en: ["She gets up at eight o'clock."], vi: ["Cô ấy thức dậy lúc tám giờ."] } }
                    ],
                    activities: [{
                        type: 'Practice',
                        description: { 
                            en: ['Listen and chant about daily routines.', 'Ask and answer about your day.'],
                            vi: ['Nghe và đọc theo vần về các hoạt động hàng ngày.', 'Hỏi và trả lời về ngày của bạn.']
                        }
                    }]
                }
            ]
        },
        {
            id: 202,
            title: { en: 'Unit 2: The zoo', vi: 'Bài 2: Sở thú' },
            lessons: [
                {
                    id: 20201,
                    title: { en: 'Animals', vi: 'Động vật' },
                    aims: {
                        en: ['Identify zoo animals.', 'Talk about likes and dislikes.'],
                        vi: ['Nhận biết các loài động vật trong sở thú.', 'Nói về sở thích và không thích.']
                    },
                    vocabulary: [
                        { term: 'zebra', pronunciation: '/ˈziːbrə/', vietnamese: 'ngựa vằn', imageUrl: `${SM_BASE}zebra.png` },
                        { term: 'monkey', pronunciation: '/ˈmʌŋki/', vietnamese: 'khỉ', imageUrl: `${SM_BASE}monkey.png` },
                        { term: 'hippo', pronunciation: '/ˈhɪpoʊ/', vietnamese: 'hà mã', imageUrl: `${SM_BASE}hippo.png` },
                        { term: 'parrot', pronunciation: '/ˈpærət/', vietnamese: 'con vẹt', imageUrl: `${SM_BASE}parrot.png` },
                        { term: 'snake', pronunciation: '/sneɪk/', vietnamese: 'con rắn', imageUrl: `${SM_BASE}snake.png` },
                        { term: 'bear', pronunciation: '/ber/', vietnamese: 'con gấu', imageUrl: `${SM_BASE}bear.png` },
                        { term: 'tiger', pronunciation: '/ˈtaɪɡər/', vietnamese: 'con hổ', imageUrl: `${SM_BASE}tiger.png` },
                        { term: 'crocodile', pronunciation: '/ˈkrɒkədaɪl/', vietnamese: 'cá sấu', imageUrl: `${SM_BASE}crocodile.png` },
                    ],
                    grammar: [
                        { title: { en: 'Likes and dislikes', vi: 'Sở thích và không thích' }, explanation: { en: ["He likes spiders.", "He doesn't like apples.", "Does she like bananas? Yes, she does. / No, she doesn't."], vi: ["Anh ấy thích nhện.", "Anh ấy không thích táo.", "Cô ấy có thích chuối không? Có. / Không."] } }
                    ],
                    activities: [{
                        type: 'Practice',
                        description: { 
                            en: ["Talk about which zoo animals you like and don't like."],
                            vi: ['Nói về những loài động vật trong sở thú mà bạn thích và không thích.']
                        }
                    }]
                }
            ]
        },
        {
            id: 203,
            title: { en: 'Unit 3: Where we live', vi: 'Bài 3: Nơi chúng ta sống' },
            lessons: [
                {
                    id: 20301,
                    title: { en: 'Places in a town', vi: 'Các địa điểm trong thị trấn' },
                    aims: {
                        en: ['Identify places in a town.', 'Ask and answer about places.', 'Use prepositions of place.'],
                        vi: ['Nhận biết các địa điểm trong thị trấn.', 'Hỏi và trả lời về các địa điểm.', 'Sử dụng giới từ chỉ nơi chốn.']
                    },
                    vocabulary: [
                        { term: 'playground', pronunciation: '/ˈpleɪɡraʊnd/', vietnamese: 'sân chơi', imageUrl: `${SM_BASE}playground.png` },
                        { term: 'cinema', pronunciation: '/ˈsɪnəmə/', vietnamese: 'rạp chiếu phim', imageUrl: `${SM_BASE}cinema.png` },
                        { term: 'swimming pool', pronunciation: '/ˈswɪmɪŋ puːl/', vietnamese: 'hồ bơi', imageUrl: `${SM_BASE}swimming_pool.png` },
                        { term: 'park', pronunciation: '/pɑːrk/', vietnamese: 'công viên', imageUrl: `${SM_BASE}park.png` },
                        { term: 'hospital', pronunciation: '/ˈhɒspɪtl/', vietnamese: 'bệnh viện', imageUrl: `${SM_BASE}hospital.png` },
                        { term: 'bus stop', pronunciation: '/bʌs stɒp/', vietnamese: 'trạm xe buýt', imageUrl: `${SM_BASE}bus_stop.png` },
                        { term: 'shop', pronunciation: '/ʃɒp/', vietnamese: 'cửa hàng', imageUrl: `${SM_BASE}shop.png` },
                        { term: 'street', pronunciation: '/striːt/', vietnamese: 'đường phố', imageUrl: `${SM_BASE}street.png` },
                        { term: 'café', pronunciation: '/ˈkæfeɪ/', vietnamese: 'quán cà phê', imageUrl: `${SM_BASE}cafe.png` },
                        { term: 'train station', pronunciation: '/treɪn ˈsteɪʃn/', vietnamese: 'nhà ga', imageUrl: `${SM_BASE}train_station.png` },
                    ],
                    grammar: [
                        { title: { en: 'Has got', vi: 'Có' }, explanation: { en: ["Has your town got a swimming pool? Yes, it has. / No, it hasn't."], vi: ["Thị trấn của bạn có hồ bơi không? Có. / Không."] } },
                        { title: { en: 'Prepositions', vi: 'Giới từ' }, explanation: { en: ["The café is between the school and the cinema.", "The tree is behind the cinema."], vi: ["Quán cà phê ở giữa trường học và rạp chiếu phim.", "Cái cây ở phía sau rạp chiếu phim."] } }
                    ],
                    activities: [{
                        type: 'Practice',
                        description: { 
                            en: ['Describe where places are in your town using prepositions.'],
                            vi: ['Mô tả vị trí các địa điểm trong thị trấn của bạn bằng giới từ.']
                        }
                    }]
                }
            ]
        },
        {
            id: 204,
            title: { en: 'Unit 4: The market', vi: 'Bài 4: Chợ' },
            lessons: [
                {
                    id: 20401,
                    title: { en: 'Food', vi: 'Thức ăn' },
                    aims: {
                        en: ['Identify different types of food.', 'Offer and ask for food politely.'],
                        vi: ['Nhận biết các loại thực phẩm khác nhau.', 'Mời và yêu cầu đồ ăn một cách lịch sự.']
                    },
                    vocabulary: [
                        { term: 'grapes', pronunciation: '/ɡreɪps/', vietnamese: 'nho', imageUrl: `${SM_BASE}grapes.png` },
                        { term: 'beans', pronunciation: '/biːnz/', vietnamese: 'đậu', imageUrl: `${SM_BASE}beans.png` },
                        { term: 'bread', pronunciation: '/brɛd/', vietnamese: 'bánh mì', imageUrl: `${SM_BASE}bread.png` },
                        { term: 'lemons', pronunciation: '/ˈlɛmənz/', vietnamese: 'chanh vàng', imageUrl: `${SM_BASE}lemons.png` },
                        { term: 'tomatoes', pronunciation: '/təˈmɑːtoʊz/', vietnamese: 'cà chua', imageUrl: `${SM_BASE}tomatoes.png` },
                        { term: 'fish', pronunciation: '/fɪʃ/', vietnamese: 'cá', imageUrl: `${SM_BASE}fish.png` },
                        { term: 'eggs', pronunciation: '/ɛɡz/', vietnamese: 'trứng', imageUrl: `${SM_BASE}eggs.png` },
                        { term: 'mangos', pronunciation: '/ˈmæŋɡoʊz/', vietnamese: 'xoài', imageUrl: `${SM_BASE}mangos.png` },
                        { term: 'watermelons', pronunciation: '/ˈwɔːtərmɛlənz/', vietnamese: 'dưa hấu', imageUrl: `${SM_BASE}watermelons.png` },
                        { term: 'potatoes', pronunciation: '/pəˈteɪtoʊz/', vietnamese: 'khoai tây', imageUrl: `${SM_BASE}potatoes.png` },
                    ],
                    grammar: [
                        { title: { en: 'Would you like...?', vi: 'Bạn có muốn...?' }, explanation: { en: ["Would you like a tomato? Yes, please. / No, thank you.", "Would you like some bread?"], vi: ["Bạn có muốn một quả cà chua không? Vâng, làm ơn. / Không, cảm ơn.", "Bạn có muốn một ít bánh mì không?"] } },
                        { title: { en: 'some / any', vi: 'một vài / bất kỳ' }, explanation: { en: ["Are there any pears? Yes, there are.", "Is there any bread? No, there isn't any."], vi: ["Có quả lê nào không? Có.", "Có bánh mì không? Không, không có."] } }
                    ],
                    activities: [{
                        type: 'Practice',
                        description: { 
                            en: ['Role-play offering and asking for food at a market.'],
                            vi: ['Đóng vai mời và yêu cầu đồ ăn tại một khu chợ.']
                        }
                    }]
                }
            ]
        },
        {
            id: 205,
            title: { en: 'Unit 5: My bedroom', vi: 'Bài 5: Phòng ngủ của tôi' },
            lessons: [
                {
                    id: 20501,
                    title: { en: 'Furniture', vi: 'Nội thất' },
                    aims: {
                        en: ['Identify furniture in a bedroom.', 'Use demonstrative pronouns.', 'Ask about possessions.'],
                        vi: ['Nhận biết đồ đạc trong phòng ngủ.', 'Sử dụng đại từ chỉ định.', 'Hỏi về sự sở hữu.']
                    },
                    vocabulary: [
                        { term: 'lamp', pronunciation: '/læmp/', vietnamese: 'đèn', imageUrl: `${SM_BASE}lamp.png` },
                        { term: 'mirror', pronunciation: '/ˈmɪrər/', vietnamese: 'gương', imageUrl: `${SM_BASE}mirror.png` },
                        { term: 'armchair', pronunciation: '/ˈɑːrmtʃer/', vietnamese: 'ghế bành', imageUrl: `${SM_BASE}armchair.png` },
                        { term: 'wardrobe', pronunciation: '/ˈwɔːrdroʊb/', vietnamese: 'tủ quần áo', imageUrl: `${SM_BASE}wardrobe.png` },
                        { term: 'sofa', pronunciation: '/ˈsoʊfə/', vietnamese: 'ghế sofa', imageUrl: `${SM_BASE}sofa.png` },
                        { term: 'bed', pronunciation: '/bɛd/', vietnamese: 'giường', imageUrl: `${SM_BASE}bed.png` },
                        { term: 'table', pronunciation: '/ˈteɪbl/', vietnamese: 'bàn', imageUrl: `${SM_BASE}table.png` },
                        { term: 'mat', pronunciation: '/mæt/', vietnamese: 'thảm', imageUrl: `${SM_BASE}mat.png` },
                    ],
                    grammar: [
                        { title: { en: 'this, that, these, those', vi: 'đây, đó, những cái này, những cái kia' }, explanation: { en: ["I like this book (near).", "I like that book (far).", "I like these books (near, plural).", "I like those books (far, plural)."], vi: ["Tôi thích cuốn sách này (gần).", "Tôi thích cuốn sách đó (xa).", "Tôi thích những cuốn sách này (gần, số nhiều).", "Tôi thích những cuốn sách kia (xa, số nhiều)."] } },
                        { title: { en: 'Possessive with Whose', vi: 'Sở hữu với Whose' }, explanation: { en: ["Whose socks are these? They're Fred's.", "Whose hat is this? It's May's."], vi: ["Những chiếc tất này của ai? Chúng là của Fred.", "Cái mũ này của ai? Nó là của May."] } }
                    ],
                    activities: [{
                        type: 'Practice',
                        description: { 
                            en: ['Play a "Whose is it?" game with classroom objects.'],
                            vi: ['Chơi trò chơi "Cái này của ai?" với các đồ vật trong lớp.']
                        }
                    }]
                }
            ]
        },
        {
            id: 206,
            title: { en: 'Unit 6: People', vi: 'Bài 6: Con người' },
            lessons: [
                {
                    id: 20601,
                    title: { en: 'The face and feelings', vi: 'Khuôn mặt và cảm xúc' },
                    aims: {
                        en: ['Describe people\'s faces.', 'Talk about feelings and emotions.'],
                        vi: ['Mô tả khuôn mặt của mọi người.', 'Nói về cảm xúc.']
                    },
                    vocabulary: [
                        { term: 'eyes', pronunciation: '/aɪz/', vietnamese: 'mắt' },
                        { term: 'hair', pronunciation: '/her/', vietnamese: 'tóc' },
                        { term: 'ears', pronunciation: '/ɪərz/', vietnamese: 'tai' },
                        { term: 'nose', pronunciation: '/noʊz/', vietnamese: 'mũi' },
                        { term: 'mouth', pronunciation: '/maʊθ/', vietnamese: 'miệng' },
                        { term: 'happy', pronunciation: '/ˈhæpi/', vietnamese: 'vui vẻ', imageUrl: `${SM_BASE}happy.png` },
                        { term: 'sad', pronunciation: '/sæd/', vietnamese: 'buồn', imageUrl: `${SM_BASE}sad.png` },
                        { term: 'angry', pronunciation: '/ˈæŋɡri/', vietnamese: 'tức giận', imageUrl: `${SM_BASE}angry.png` },
                        { term: 'tired', pronunciation: '/ˈtaɪərd/', vietnamese: 'mệt mỏi' },
                        { term: 'scared', pronunciation: '/skerd/', vietnamese: 'sợ hãi' },
                    ],
                    grammar: [
                        { title: { en: 'Adjectives for feelings', vi: 'Tính từ chỉ cảm xúc' }, explanation: { en: ["Are you angry? Yes, I am. / No, I'm tired."], vi: ["Bạn có tức giận không? Có. / Không, tôi mệt."] } },
                        { title: { en: 'Possessive adjectives: our, their', vi: 'Tính từ sở hữu: của chúng tôi, của họ' }, explanation: { en: ["Our birthdays are in May.", "Their birthdays are in November."], vi: ["Sinh nhật của chúng tôi vào tháng Năm.", "Sinh nhật của họ vào tháng Mười Một."] } }
                    ],
                    activities: [{
                        type: 'Practice',
                        description: { 
                            en: ['Describe a friend\'s face and guess their feelings.'],
                            vi: ['Mô tả khuôn mặt của một người bạn và đoán cảm xúc của họ.']
                        }
                    }]
                }
            ]
        },
        {
            id: 207,
            title: { en: 'Unit 7: Off we go!', vi: 'Bài 7: Lên đường nào!' },
            lessons: [
                {
                    id: 20701,
                    title: { en: 'Transport', vi: 'Giao thông' },
                    aims: {
                        en: ['Identify different means of transport.', 'Talk about future plans with "I\'d like to".', 'Use the present continuous tense.'],
                        vi: ['Nhận biết các phương tiện giao thông khác nhau.', 'Nói về kế hoạch tương lai với "I\'d like to".', 'Sử dụng thì hiện tại tiếp diễn.']
                    },
                    vocabulary: [
                        { term: 'helicopter', pronunciation: '/ˈhɛlɪkɒptər/', vietnamese: 'máy bay trực thăng', imageUrl: `${SM_BASE}helicopter.png` },
                        { term: 'boat', pronunciation: '/boʊt/', vietnamese: 'thuyền', imageUrl: `${SM_BASE}boat.png` },
                        { term: 'lorry', pronunciation: '/ˈlɒri/', vietnamese: 'xe tải', imageUrl: `${SM_BASE}lorry.png` },
                        { term: 'scooter', pronunciation: '/ˈskuːtər/', vietnamese: 'xe tay ga', imageUrl: `${SM_BASE}scooter.png` },
                        { term: 'bus', pronunciation: '/bʌs/', vietnamese: 'xe buýt', imageUrl: `${SM_BASE}bus.png` },
                        { term: 'skateboard', pronunciation: '/ˈskeɪtbɔːrd/', vietnamese: 'ván trượt', imageUrl: `${SM_BASE}skateboard.png` },
                        { term: 'taxi', pronunciation: '/ˈtæksi/', vietnamese: 'taxi', imageUrl: `${SM_BASE}taxi.png` },
                        { term: 'motorbike', pronunciation: '/ˈmoʊtərbaɪk/', vietnamese: 'xe máy', imageUrl: `${SM_BASE}motorbike.png` },
                        { term: 'plane', pronunciation: '/pleɪn/', vietnamese: 'máy bay', imageUrl: `${SM_BASE}plane.png` },
                    ],
                    grammar: [
                        { title: { en: 'I\'d like to...', vi: 'Tôi muốn...' }, explanation: { en: ["I'd like to go to Africa by plane."], vi: ["Tôi muốn đến Châu Phi bằng máy bay."] } },
                        { title: { en: 'Present Continuous', vi: 'Thì Hiện tại tiếp diễn' }, explanation: { en: ["What are you doing? I'm flying a plane."], vi: ["Bạn đang làm gì vậy? Tôi đang lái máy bay."] } }
                    ],
                    activities: [{
                        type: 'Practice',
                        description: { 
                            en: ["Talk about how you'd like to travel to different places."],
                            vi: ['Nói về cách bạn muốn đi du lịch đến những nơi khác nhau.']
                        }
                    }]
                }
            ]
        },
        {
            id: 208,
            title: { en: 'Unit 8: Sports club', vi: 'Bài 8: Câu lạc bộ thể thao' },
            lessons: [
                {
                    id: 20801,
                    title: { en: 'Sports', vi: 'Thể thao' },
                    aims: {
                        en: ['Identify different sports.', 'Express opinions about activities.', 'Talk about sports preferences.'],
                        vi: ['Nhận biết các môn thể thao khác nhau.', 'Bày tỏ ý kiến về các hoạt động.', 'Nói về sở thích thể thao.']
                    },
                    vocabulary: [
                        { term: 'badminton', pronunciation: '/ˈbædmɪntən/', vietnamese: 'cầu lông' },
                        { term: 'baseball', pronunciation: '/ˈbeɪsbɔːl/', vietnamese: 'bóng chày' },
                        { term: 'basketball', pronunciation: '/ˈbɑːskɪtbɔːl/', vietnamese: 'bóng rổ' },
                        { term: 'football', pronunciation: '/ˈfʊtbɔːl/', vietnamese: 'bóng đá' },
                        { term: 'hockey', pronunciation: '/ˈhɒki/', vietnamese: 'khúc côn cầu' },
                        { term: 'table tennis', pronunciation: '/ˈteɪbl ˈtɛnɪs/', vietnamese: 'bóng bàn' },
                        { term: 'tennis', pronunciation: '/ˈtɛnɪs/', vietnamese: 'quần vợt' },
                        { term: 'swimming', pronunciation: '/ˈswɪmɪŋ/', vietnamese: 'bơi lội' },
                        { term: 'athletics', pronunciation: '/æθˈlɛtɪks/', vietnamese: 'điền kinh' },
                        { term: 'volleyball', pronunciation: '/ˈvɒlibɔːl/', vietnamese: 'bóng chuyền' },
                    ],
                    grammar: [
                        { title: { en: 'Verb + ing as noun', vi: 'Động từ + ing làm danh từ' }, explanation: { en: ["Flying a kite's difficult.", "Swimming is fun."], vi: ["Thả diều thì khó.", "Bơi lội thì vui."] } },
                        { title: { en: 'like + ing', vi: 'thích làm gì' }, explanation: { en: ["What sport do you like doing? I like swimming.", "So do I. / I don't."], vi: ["Bạn thích chơi môn thể thao nào? Tôi thích bơi.", "Tôi cũng vậy. / Tôi thì không."] } }
                    ],
                    activities: [{
                        type: 'Practice',
                        description: { 
                            en: ['Discuss which sports are fun or difficult.'],
                            vi: ['Thảo luận xem môn thể thao nào vui hoặc khó.']
                        }
                    }]
                }
            ]
        },
        {
            id: 209,
            title: { en: 'Unit 9: Holiday plans', vi: 'Bài 9: Kế hoạch cho kỳ nghỉ' },
            lessons: [
                {
                    id: 20901,
                    title: { en: 'Holiday activities', vi: 'Hoạt động trong kỳ nghỉ' },
                    aims: {
                        en: ['Talk about holiday activities.', 'Ask for permission.'],
                        vi: ['Nói về các hoạt động trong kỳ nghỉ.', 'Xin phép.']
                    },
                    vocabulary: [
                        { term: 'go horse riding', pronunciation: '/ɡoʊ hɔːrs ˈraɪdɪŋ/', vietnamese: 'cưỡi ngựa' },
                        { term: 'go swimming', pronunciation: '/ɡoʊ ˈswɪmɪŋ/', vietnamese: 'đi bơi' },
                        { term: 'go fishing', pronunciation: '/ɡoʊ ˈfɪʃɪŋ/', vietnamese: 'đi câu cá' },
                        { term: 'go camping', pronunciation: '/ɡoʊ ˈkæmpɪŋ/', vietnamese: 'đi cắm trại' },
                        { term: 'visit family', pronunciation: '/ˈvɪzɪt ˈfæməli/', vietnamese: 'thăm gia đình' },
                        { term: 'go to the beach', pronunciation: '/ɡoʊ tuː ðə biːtʃ/', vietnamese: 'đi biển' },
                    ],
                    grammar: [
                        { title: { en: 'Asking for permission', vi: 'Xin phép' }, explanation: { en: ["Can I go horse riding tomorrow morning?", "Can we go to the beach?"], vi: ["Con có thể đi cưỡi ngựa vào sáng mai không?", "Chúng ta có thể đi biển không?"] } }
                    ],
                    activities: [{
                        type: 'Practice',
                        description: { 
                            en: ['Plan a holiday and role-play asking for permission to do different activities.'],
                            vi: ['Lên kế hoạch cho một kỳ nghỉ và đóng vai xin phép để thực hiện các hoạt động khác nhau.']
                        }
                    }]
                }
            ]
        }
    ]
};

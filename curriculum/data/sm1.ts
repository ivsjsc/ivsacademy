import { CurriculumLevel } from '../types';

const SM_BASE = 'https://storage.googleapis.com/maker-suite-project-files-prod/upload/flashcard_images/superminds_';

export const sm1Data: CurriculumLevel = {
    level: 2,
    title: { en: 'Super Minds 1', vi: 'Super Minds 1' },
    subtitle: { en: 'Primary School - Grade 2', vi: 'Tiểu học - Lớp 2' },
    ebookPdfUrl: 'https://drive.google.com/file/d/1wUw0aGEa5dTA6KzezWMjMtZpXj_1TLZl/view?usp=drive_link',
    units: [
        {
            id: 0,
            title: { en: 'Friends', vi: 'Bạn bè' },
            lessons: [
                {
                    id: 101,
                    title: { en: 'Greetings and Numbers', vi: 'Chào hỏi và Số đếm' },
                    aims: {
                        en: ['Introduce yourself and others.', 'Ask and answer about names and ages.', 'Count from 1 to 10.'],
                        vi: ['Giới thiệu bản thân và người khác.', 'Hỏi và trả lời về tên và tuổi.', 'Đếm từ 1 đến 10.']
                    },
                    vocabulary: [
                        { term: 'Whisper', pronunciation: '/ˈwɪspər/', vietnamese: 'Whisper' },
                        { term: 'Thunder', pronunciation: '/ˈθʌndər/', vietnamese: 'Thunder' },
                        { term: 'Misty', pronunciation: '/ˈmɪsti/', vietnamese: 'Misty' },
                        { term: 'Flash', pronunciation: '/flæʃ/', vietnamese: 'Flash' },
                        { term: 'one', pronunciation: '/wʌn/', vietnamese: 'một' },
                        { term: 'two', pronunciation: '/tuː/', vietnamese: 'hai' },
                        { term: 'three', pronunciation: '/θriː/', vietnamese: 'ba' },
                        { term: 'four', pronunciation: '/fɔːr/', vietnamese: 'bốn' },
                        { term: 'five', pronunciation: '/faɪv/', vietnamese: 'năm' },
                        { term: 'six', pronunciation: '/sɪks/', vietnamese: 'sáu' },
                        { term: 'seven', pronunciation: '/ˈsɛvən/', vietnamese: 'bảy' },
                        { term: 'eight', pronunciation: '/eɪt/', vietnamese: 'tám' },
                        { term: 'nine', pronunciation: '/naɪn/', vietnamese: 'chín' },
                        { term: 'ten', pronunciation: '/tɛn/', vietnamese: 'mười' },
                    ],
                    grammar: [
                        { title: { en: 'Greetings and Introductions', vi: 'Chào hỏi và Giới thiệu' }, explanation: { en: ["Use 'What's your name?' and 'How old are you?' to ask personal information.", "Respond with 'I'm [name]' and 'I'm [age].'"], vi: ['Sử dụng "Tên bạn là gì?" và "Bạn bao nhiêu tuổi?" để hỏi thông tin cá nhân.', 'Trả lời bằng "Tôi là [tên]" và "Tôi [tuổi]".'] } }
                    ],
                    activities: [
                        { type: 'Practice', description: { en: ['Listen and chant names.', 'Listen, point and write numbers.'], vi: ['Nghe và đọc theo vần các tên.', 'Nghe, chỉ và viết các số.'] } }
                    ]
                },
                {
                    id: 102,
                    title: { en: 'Alphabet and Colors', vi: 'Bảng chữ cái và Màu sắc' },
                    aims: {
                        en: ['Sing the alphabet song.', 'Identify and name colors.'],
                        vi: ['Hát bài hát chữ cái.', 'Nhận biết và gọi tên các màu sắc.']
                    },
                    vocabulary: [
                        { term: 'red', pronunciation: '/rɛd/', vietnamese: 'màu đỏ' },
                        { term: 'yellow', pronunciation: '/ˈjɛloʊ/', vietnamese: 'màu vàng' },
                        { term: 'purple', pronunciation: '/ˈpɜːrpəl/', vietnamese: 'màu tím' },
                        { term: 'blue', pronunciation: '/bluː/', vietnamese: 'màu xanh dương' },
                        { term: 'orange', pronunciation: '/ˈɔːrɪndʒ/', vietnamese: 'màu cam' },
                        { term: 'green', pronunciation: '/ɡriːn/', vietnamese: 'màu xanh lá' },
                    ],
                    grammar: [],
                    activities: [
                        { type: 'Practice', description: { en: ['Listen and sing the ABC song.', 'Listen and point to the balloons.'], vi: ['Nghe và hát bài hát ABC.', 'Nghe và chỉ vào các quả bóng bay.'] } }
                    ]
                }
            ]
        },
        {
            id: 1,
            title: { en: 'At school', vi: 'Ở trường học' },
            lessons: [
                {
                    id: 101,
                    title: { en: 'Classroom Objects', vi: 'Đồ dùng học tập' },
                    aims: {
                        en: ['Identify and name classroom objects.', 'Ask "What\'s this?"'],
                        vi: ['Nhận biết và gọi tên đồ dùng học tập.', 'Hỏi "Đây là cái gì?"']
                    },
                    vocabulary: [
                        { term: 'pen', pronunciation: '/pɛn/', vietnamese: 'bút mực' },
                        { term: 'rubber', pronunciation: '/ˈrʌbər/', vietnamese: 'cục tẩy' },
                        { term: 'pencil', pronunciation: '/ˈpɛnsəl/', vietnamese: 'bút chì' },
                        { term: 'book', pronunciation: '/bʊk/', vietnamese: 'sách' },
                        { term: 'notebook', pronunciation: '/ˈnoʊtbʊk/', vietnamese: 'vở' },
                        { term: 'bag', pronunciation: '/bæɡ/', vietnamese: 'cặp' },
                        { term: 'desk', pronunciation: '/dɛsk/', vietnamese: 'bàn học' },
                        { term: 'ruler', pronunciation: '/ˈruːlər/', vietnamese: 'thước kẻ' },
                        { term: 'pencil case', pronunciation: '/ˈpɛnsəl keɪs/', vietnamese: 'hộp bút' },
                    ],
                    grammar: [
                        { title: { en: 'Asking about objects', vi: 'Hỏi về đồ vật' }, explanation: { en: ["Use 'What's this? It's a (pencil).'", "Use 'Is it a pen? Yes, it is. / No, it isn't.'"], vi: ['Sử dụng "Đây là cái gì? Đó là một (bút chì)."', 'Sử dụng "Đây có phải là bút mực không? Vâng, phải. / Không, không phải."'] } }
                    ],
                    activities: [
                        { type: 'Practice', description: { en: ['Play the guessing game.', 'Listen and chant about classroom objects.'], vi: ['Chơi trò chơi đoán đồ vật.', 'Nghe và đọc theo vần về đồ dùng học tập.'] } }
                    ]
                },
                {
                    id: 102,
                    title: { en: 'Imperatives', vi: 'Câu mệnh lệnh' },
                    aims: {
                        en: ['Understand and use simple classroom commands.'],
                        vi: ['Hiểu và sử dụng các câu mệnh lệnh đơn giản trong lớp học.']
                    },
                    vocabulary: [
                         { term: 'Sit at your desk', pronunciation: '/sɪt æt jʊər dɛsk/', vietnamese: 'Ngồi vào bàn' },
                         { term: 'Open your book', pronunciation: '/ˈoʊpən jʊər bʊk/', vietnamese: 'Mở sách ra' },
                         { term: 'Close your bag', pronunciation: '/kloʊz jʊər bæɡ/', vietnamese: 'Đóng cặp lại' },
                         { term: 'Pass me a ruler', pronunciation: '/pæs mi ə ˈruːlər/', vietnamese: 'Chuyền cho tôi cây thước' },
                    ],
                    grammar: [
                        { title: { en: 'Classroom commands', vi: 'Mệnh lệnh trong lớp học' }, explanation: { en: ["'Open your book, please.'", "'Close your bag, please.'"], vi: ['"Làm ơn mở sách ra."', '"Làm ơn đóng cặp lại."'] } }
                    ],
                    activities: [
                        { type: 'Practice', description: { en: ['Listen, stick, and write the words.', 'Play the chain game.'], vi: ['Nghe, dán và viết từ.', 'Chơi trò chơi nối tiếp.'] } }
                    ]
                }
            ]
        },
        {
            id: 2,
            title: { en: 'Let\'s play!', vi: 'Cùng chơi nào!' },
            lessons: [
                 {
                    id: 201,
                    title: { en: 'Toys', vi: 'Đồ chơi' },
                    aims: {
                        en: ['Identify and name different toys.', 'Ask and answer about names, age, and favorite toys.'],
                        vi: ['Nhận biết và gọi tên các loại đồ chơi khác nhau.', 'Hỏi và trả lời về tên, tuổi và đồ chơi yêu thích.']
                    },
                    vocabulary: [
                        { term: 'kite', pronunciation: '/kaɪt/', vietnamese: 'cái diều' },
                        { term: 'doll', pronunciation: '/dɒl/', vietnamese: 'búp bê' },
                        { term: 'monster', pronunciation: '/ˈmɒnstər/', vietnamese: 'quái vật' },
                        { term: 'plane', pronunciation: '/pleɪn/', vietnamese: 'máy bay' },
                        { term: 'computer game', pronunciation: '/kəmˈpjuːtər ɡeɪm/', vietnamese: 'trò chơi điện tử' },
                        { term: 'train', pronunciation: '/treɪn/', vietnamese: 'tàu hỏa' },
                        { term: 'car', pronunciation: '/kɑːr/', vietnamese: 'ô tô' },
                        { term: 'bike', pronunciation: '/baɪk/', vietnamese: 'xe đạp' },
                        { term: 'ball', pronunciation: '/bɔːl/', vietnamese: 'quả bóng' },
                        { term: 'go-kart', pronunciation: '/ˈɡoʊ kɑːrt/', vietnamese: 'xe đua go-kart' },
                    ],
                    grammar: [
                        { title: { en: 'Asking about others', vi: 'Hỏi về người khác' }, explanation: { en: ["Use 'What's his/her name? His/Her name's (Ben/Sue).'", "Use 'What's his/her favourite toy?'", "Use 'How old is he/she?'"], vi: ['Sử dụng "Tên của anh ấy/cô ấy là gì? Tên của anh ấy/cô ấy là (Ben/Sue)."', 'Sử dụng "Đồ chơi yêu thích của anh ấy/cô ấy là gì?"', 'Sử dụng "Anh ấy/cô ấy bao nhiêu tuổi?"'] } }
                    ],
                    activities: [
                        { type: 'Practice', description: { en: ['Listen and stick the names.', 'Ask and answer about the children in the pictures.'], vi: ['Nghe và dán tên.', 'Hỏi và trả lời về các bạn nhỏ trong tranh.'] } }
                    ]
                },
                {
                    id: 202,
                    title: { en: 'Adjectives', vi: 'Tính từ' },
                    aims: {
                        en: ['Describe toys using adjectives.'],
                        vi: ['Mô tả đồ chơi bằng tính từ.']
                    },
                    vocabulary: [
                        { term: 'long', pronunciation: '/lɒŋ/', vietnamese: 'dài' },
                        { term: 'short', pronunciation: '/ʃɔːrt/', vietnamese: 'ngắn' },
                        { term: 'big', pronunciation: '/bɪɡ/', vietnamese: 'to' },
                        { term: 'small', pronunciation: '/smɔːl/', vietnamese: 'nhỏ' },
                        { term: 'ugly', pronunciation: '/ˈʌɡli/', vietnamese: 'xấu xí' },
                        { term: 'beautiful', pronunciation: '/ˈbjuːtɪfəl/', vietnamese: 'xinh đẹp' },
                        { term: 'old', pronunciation: '/oʊld/', vietnamese: 'cũ' },
                        { term: 'new', pronunciation: '/njuː/', vietnamese: 'mới' },
                    ],
                    grammar: [
                        { title: { en: 'Describing with adjectives', vi: 'Mô tả bằng tính từ' }, explanation: { en: ["Use 'It's a/an...' with an adjective before the noun.", "Example: It's a new kite. It's an ugly monster."], vi: ['Sử dụng "Nó là một..." với một tính từ đứng trước danh từ.', 'Ví dụ: Nó là một cái diều mới. Nó là một con quái vật xấu xí.'] } }
                    ],
                    activities: [
                        { type: 'Practice', description: { en: ['Listen and number the pictures.', 'Draw a toy and describe it to a partner.'], vi: ['Nghe và đánh số các bức tranh.', 'Vẽ một món đồ chơi và mô tả nó cho bạn của bạn.'] } }
                    ]
                }
            ]
        },
        {
            id: 3,
            title: { en: 'Pet show', vi: 'Buổi biểu diễn thú cưng' },
            lessons: [
                {
                    id: 301,
                    title: { en: 'Animals and Prepositions', vi: 'Động vật và Giới từ' },
                    aims: {
                        en: ['Identify and name animals.', 'Use prepositions of place: in, on, under.'],
                        vi: ['Nhận biết và gọi tên các loài động vật.', 'Sử dụng giới từ chỉ nơi chốn: in, on, under.']
                    },
                    vocabulary: [
                        { term: 'elephant', pronunciation: '/ˈɛlɪfənt/', vietnamese: 'con voi' },
                        { term: 'rat', pronunciation: '/ræt/', vietnamese: 'con chuột' },
                        { term: 'lizard', pronunciation: '/ˈlɪzərd/', vietnamese: 'con thằn lằn' },
                        { term: 'frog', pronunciation: '/frɒɡ/', vietnamese: 'con ếch' },
                        { term: 'spider', pronunciation: '/ˈspaɪdər/', vietnamese: 'con nhện' },
                        { term: 'duck', pronunciation: '/dʌk/', vietnamese: 'con vịt' },
                        { term: 'dog', pronunciation: '/dɒɡ/', vietnamese: 'con chó' },
                        { term: 'cat', pronunciation: '/kæt/', vietnamese: 'con mèo' },
                    ],
                    grammar: [
                        { title: { en: 'Prepositions of place', vi: 'Giới từ chỉ nơi chốn' }, explanation: { en: ["Use 'in', 'on', 'under' to describe location.", "Example: The lizard is in the bag."], vi: ['Sử dụng "in", "on", "under" để mô tả vị trí.', 'Ví dụ: Con thằn lằn ở trong túi.'] } }
                    ],
                    activities: [
                        { type: 'Practice', description: { en: ['Play the description game.', 'Count the animals in the picture.'], vi: ['Chơi trò chơi mô tả.', 'Đếm số động vật trong tranh.'] } }
                    ]
                },
                {
                    id: 302,
                    title: { en: 'Likes and Dislikes', vi: 'Thích và không thích' },
                    aims: {
                        en: ['Talk about likes and dislikes.'],
                        vi: ['Nói về những điều thích và không thích.']
                    },
                    vocabulary: [],
                    grammar: [
                        { title: { en: 'Likes and dislikes', vi: 'Thích và không thích' }, explanation: { en: ["Use 'I like (cats).' and 'I don't like (spiders).'", "Ask 'I like... What about you?'"], vi: ['Sử dụng "Tôi thích (mèo)." và "Tôi không thích (nhện)."', 'Hỏi "Tôi thích... Còn bạn thì sao?"'] } }
                    ],
                    activities: [
                        { type: 'Practice', description: { en: ['Ask and answer with a partner about what animals you like.'], vi: ['Hỏi và trả lời với bạn cặp về loài động vật bạn thích.'] } }
                    ]
                }
            ]
        },
        {
            id: 4,
            title: { en: 'Lunchtime', vi: 'Giờ ăn trưa' },
            lessons: [
                 {
                    id: 401,
                    title: { en: 'Food and Possession', vi: 'Thức ăn và Sở hữu' },
                    aims: {
                        en: ['Identify and name different food items.', "Talk about what you have and don't have."],
                        vi: ['Nhận biết và gọi tên các loại thức ăn khác nhau.', 'Nói về những gì bạn có và không có.']
                    },
                    vocabulary: [
                        { term: 'banana', pronunciation: '/bəˈnænə/', vietnamese: 'chuối' },
                        { term: 'cake', pronunciation: '/keɪk/', vietnamese: 'bánh ngọt' },
                        { term: 'cheese sandwich', pronunciation: '/tʃiːz ˈsænwɪdʒ/', vietnamese: 'bánh sandwich phô mai' },
                        { term: 'apple', pronunciation: '/ˈæpəl/', vietnamese: 'táo' },
                        { term: 'pizza', pronunciation: '/ˈpiːtsə/', vietnamese: 'pizza' },
                        { term: 'sausage', pronunciation: '/ˈsɒsɪdʒ/', vietnamese: 'xúc xích' },
                        { term: 'chicken', pronunciation: '/ˈtʃɪkɪn/', vietnamese: 'thịt gà' },
                        { term: 'steak', pronunciation: '/steɪk/', vietnamese: 'bít tết' },
                        { term: 'peas', pronunciation: '/piːz/', vietnamese: 'đậu Hà Lan' },
                        { term: 'carrots', pronunciation: '/ˈkærəts/', vietnamese: 'cà rốt' },
                    ],
                    grammar: [
                        { title: { en: "I've got / I haven't got", vi: 'Tôi có / Tôi không có' }, explanation: { en: ["Use 'I've got a...' to talk about possessions.", "Example: I've got a sandwich and an apple. I haven't got a banana."], vi: ['Sử dụng "Tôi có một..." để nói về sự sở hữu.', 'Ví dụ: Tôi có một cái bánh sandwich và một quả táo. Tôi không có một quả chuối.'] } }
                    ],
                    activities: [
                        { type: 'Practice', description: { en: ['Read and draw lines to match the food.', 'Choose your lunch and find a friend with the same lunch.'], vi: ['Đọc và kẻ đường nối với đồ ăn.', 'Chọn bữa trưa của bạn và tìm một người bạn có bữa trưa giống bạn.'] } }
                    ]
                },
                {
                    id: 402,
                    title: { en: 'Have we got...?', vi: 'Chúng ta có... không?' },
                    aims: {
                        en: ['Ask and answer questions about having something.'],
                        vi: ['Hỏi và trả lời các câu hỏi về việc có thứ gì đó.']
                    },
                    vocabulary: [],
                    grammar: [
                        { title: { en: 'Have we got any...?', vi: 'Chúng ta có... nào không?' }, explanation: { en: ["Ask with 'Have we got any (cheese)?'", "Answer with 'Yes, we have.' or 'No, we haven't.'"], vi: ['Hỏi với "Chúng ta có (phô mai) nào không?"', 'Trả lời bằng "Có, chúng ta có." hoặc "Không, chúng ta không có."'] } }
                    ],
                    activities: [
                        { type: 'Practice', description: { en: ['Ask and answer about the food in the fridge.'], vi: ['Hỏi và trả lời về đồ ăn trong tủ lạnh.'] } }
                    ]
                }
            ]
        },
        {
            id: 5,
            title: { en: 'Free time', vi: 'Thời gian rảnh' },
            lessons: [
                 {
                    id: 501,
                    title: { en: 'Days of the Week', vi: 'Các ngày trong tuần' },
                    aims: {
                        en: ['Identify the days of the week.', 'Talk about weekly activities.'],
                        vi: ['Nhận biết các ngày trong tuần.', 'Nói về các hoạt động hàng tuần.']
                    },
                    vocabulary: [
                        { term: 'Monday', pronunciation: '/ˈmʌndeɪ/', vietnamese: 'Thứ Hai' },
                        { term: 'Tuesday', pronunciation: '/ˈtjuːzdeɪ/', vietnamese: 'Thứ Ba' },
                        { term: 'Wednesday', pronunciation: '/ˈwɛnzdeɪ/', vietnamese: 'Thứ Tư' },
                        { term: 'Thursday', pronunciation: '/ˈθɜːzdeɪ/', vietnamese: 'Thứ Năm' },
                        { term: 'Friday', pronunciation: '/ˈfraɪdeɪ/', vietnamese: 'Thứ Sáu' },
                        { term: 'Saturday', pronunciation: '/ˈsætədeɪ/', vietnamese: 'Thứ Bảy' },
                        { term: 'Sunday', pronunciation: '/ˈsʌndeɪ/', vietnamese: 'Chủ Nhật' },
                    ],
                    grammar: [
                        { title: { en: 'Simple Present with days', vi: 'Thì Hiện tại đơn với các ngày' }, explanation: { en: ["Use 'on' with days of the week.", "Example: I go swimming on Mondays. I play football on Saturdays."], vi: ['Sử dụng "on" với các ngày trong tuần.', 'Ví dụ: Tôi đi bơi vào các ngày thứ Hai. Tôi chơi bóng đá vào các ngày thứ Bảy.'] } }
                    ],
                    activities: [
                        { type: 'Practice', description: { en: ['Listen and chant the days of the week.', 'Ask and answer about what you do on different days.'], vi: ['Nghe và đọc theo vần các ngày trong tuần.', 'Hỏi và trả lời về những gì bạn làm vào các ngày khác nhau.'] } }
                    ]
                },
                {
                    id: 502,
                    title: { en: 'Weekend Activities', vi: 'Hoạt động cuối tuần' },
                    aims: {
                        en: ['Ask and answer about weekend activities.'],
                        vi: ['Hỏi và trả lời về các hoạt động cuối tuần.']
                    },
                    vocabulary: [
                        { term: 'watch TV', pronunciation: '/wɒtʃ ˌtiːˈviː/', vietnamese: 'xem TV' },
                        { term: 'play computer games', pronunciation: '/pleɪ kəmˈpjuːtər ɡeɪmz/', vietnamese: 'chơi game trên máy tính' },
                    ],
                    grammar: [
                        { title: { en: 'Questions with "Do you...?"', vi: 'Câu hỏi với "Bạn có...?"' }, explanation: { en: ["Ask with 'Do you (watch TV) at the weekend?'", "Answer with 'Yes, I do.' or 'No, I don't.'"], vi: ['Hỏi với "Bạn có (xem TV) vào cuối tuần không?"', 'Trả lời bằng "Có, tôi có." hoặc "Không, tôi không."'] } }
                    ],
                    activities: [
                        { type: 'Practice', description: { en: ['Play the question game about weekend activities.'], vi: ['Chơi trò chơi hỏi về các hoạt động cuối tuần.'] } }
                    ]
                }
            ]
        },
        {
            id: 6,
            title: { en: 'The old house', vi: 'Ngôi nhà cũ' },
            lessons: [
                {
                    id: 601,
                    title: { en: 'Parts of a House', vi: 'Các bộ phận của ngôi nhà' },
                    aims: {
                        en: ['Identify parts of a house.', "Use 'There's' and 'There are'."],
                        vi: ['Nhận biết các bộ phận của một ngôi nhà.', 'Sử dụng "Có một" và "Có nhiều".']
                    },
                    vocabulary: [
                        { term: 'bathroom', pronunciation: '/ˈbæθruːm/', vietnamese: 'phòng tắm' },
                        { term: 'bedroom', pronunciation: '/ˈbɛdruːm/', vietnamese: 'phòng ngủ' },
                        { term: 'living room', pronunciation: '/ˈlɪvɪŋ ruːm/', vietnamese: 'phòng khách' },
                        { term: 'hall', pronunciation: '/hɔːl/', vietnamese: 'hành lang' },
                        { term: 'dining room', pronunciation: '/ˈdaɪnɪŋ ruːm/', vietnamese: 'phòng ăn' },
                        { term: 'kitchen', pronunciation: '/ˈkɪtʃɪn/', vietnamese: 'nhà bếp' },
                        { term: 'stairs', pronunciation: '/stɛərz/', vietnamese: 'cầu thang' },
                        { term: 'cellar', pronunciation: '/ˈsɛlər/', vietnamese: 'hầm' },
                    ],
                    grammar: [
                        { title: { en: "There's / There are", vi: 'Có một / Có nhiều' }, explanation: { en: ["Use 'There's a...' for singular nouns.", "Use 'There are...' for plural nouns.", "Example: There's a monster. There are four cats."], vi: ['Sử dụng "Có một..." cho danh từ số ít.', 'Sử dụng "Có nhiều..." cho danh từ số nhiều.', 'Ví dụ: Có một con quái vật. Có bốn con mèo.'] } }
                    ],
                    activities: [
                        { type: 'Practice', description: { en: ['Listen and match the monsters with their bedrooms.', 'Play the description game about rooms.'], vi: ['Nghe và nối các con quái vật với phòng ngủ của chúng.', 'Chơi trò chơi mô tả về các căn phòng.'] } }
                    ]
                },
                 {
                    id: 602,
                    title: { en: 'Questions with There is/are', vi: 'Câu hỏi với Có/Không' },
                    aims: {
                        en: ['Ask and answer questions using "Is there...?" and "Are there...?"'],
                        vi: ['Hỏi và trả lời câu hỏi sử dụng "Có... không?"']
                    },
                    vocabulary: [],
                    grammar: [
                        { title: { en: 'Questions with There is/are', vi: 'Câu hỏi với Có/Không' }, explanation: { en: ["Ask with 'Is there a (plane)?'", "Answer with 'Yes, there is.' / 'No, there isn't.'", "Ask with 'Are there any (rats)?'", "Answer with 'Yes, there are.' / 'No, there aren't.'", "Ask with 'How many (cars) are there?'"], vi: ['Hỏi với "Có một (cái máy bay) không?"', 'Trả lời "Vâng, có." / "Không, không có."', 'Hỏi với "Có con chuột nào không?"', 'Trả lời "Vâng, có." / "Không, không có."', 'Hỏi với "Có bao nhiêu (chiếc ô tô)?"'] } }
                    ],
                    activities: [
                        { type: 'Practice', description: { en: ['Look at the picture and ask/answer questions.'], vi: ['Nhìn vào tranh và hỏi/trả lời câu hỏi.'] } }
                    ]
                }
            ]
        },
        {
            id: 7,
            title: { en: 'Get dressed!', vi: 'Mặc quần áo vào!' },
            lessons: [
                 {
                    id: 701,
                    title: { en: 'Clothes', vi: 'Quần áo' },
                    aims: {
                        en: ['Identify and name different items of clothing.', 'Use "this" and "these" with clothes.'],
                        vi: ['Nhận biết và gọi tên các loại quần áo khác nhau.', 'Sử dụng "cái này" và "những cái này" với quần áo.']
                    },
                    vocabulary: [
                        { term: 'jeans', pronunciation: '/dʒiːnz/', vietnamese: 'quần jean' },
                        { term: 'sweater', pronunciation: '/ˈswɛtər/', vietnamese: 'áo len' },
                        { term: 'jacket', pronunciation: '/ˈdʒækɪt/', vietnamese: 'áo khoác' },
                        { term: 'skirt', pronunciation: '/skɜːrt/', vietnamese: 'chân váy' },
                        { term: 'shorts', pronunciation: '/ʃɔːrts/', vietnamese: 'quần soóc' },
                        { term: 'cap', pronunciation: '/kæp/', vietnamese: 'mũ lưỡi trai' },
                        { term: 'shoes', pronunciation: '/ʃuːz/', vietnamese: 'giày' },
                        { term: 'socks', pronunciation: '/sɒks/', vietnamese: 'tất' },
                        { term: 'T-shirt', pronunciation: '/ˈtiː ʃɜːrt/', vietnamese: 'áo phông' },
                        { term: 'trousers', pronunciation: '/ˈtraʊzərz/', vietnamese: 'quần dài' },
                    ],
                    grammar: [
                        { title: { en: 'Demonstratives this/these', vi: 'Đại từ chỉ định này/những cái này' }, explanation: { en: ["Use 'this' for singular items.", "Use 'these' for plural items (like shoes, trousers).", "Example: Do you like this hat? Do you like these shoes?"], vi: ['Sử dụng "this" cho đồ vật số ít.', 'Sử dụng "these" cho đồ vật số nhiều (như giày, quần).', 'Ví dụ: Bạn có thích cái mũ này không? Bạn có thích đôi giày này không?'] } }
                    ],
                    activities: [
                        { type: 'Practice', description: { en: ['Look at the clothes and ask/answer questions.'], vi: ['Nhìn vào quần áo và hỏi/trả lời câu hỏi.'] } }
                    ]
                },
                 {
                    id: 702,
                    title: { en: 'Present Continuous (Wearing)', vi: 'Thì Hiện tại tiếp diễn (Mặc)' },
                    aims: {
                        en: ["Talk about what people are wearing using Present Continuous."],
                        vi: ["Nói về những gì mọi người đang mặc bằng thì Hiện tại tiếp diễn."]
                    },
                    vocabulary: [],
                    grammar: [
                        { title: { en: 'Present Continuous for clothes', vi: 'Thì Hiện tại tiếp diễn cho quần áo' }, explanation: { en: ["Use 'is/are wearing' to describe what someone has on.", "Example: Olivia's wearing a red sweater.", "Ask with 'Is he/she wearing...?'", "Answer with 'Yes, he/she is.' / 'No, he/she isn't.'"], vi: ['Sử dụng "đang mặc" để mô tả ai đó đang mặc gì.', 'Ví dụ: Olivia đang mặc một chiếc áo len màu đỏ.', 'Hỏi với "Anh ấy/cô ấy có đang mặc... không?"', 'Trả lời với "Vâng, đúng vậy." / "Không, không phải."'] } }
                    ],
                    activities: [
                        { type: 'Practice', description: { en: ['Listen and write the names.', 'Play the guessing game about clothes.'], vi: ['Nghe và viết tên.', 'Chơi trò chơi đoán về quần áo.'] } }
                    ]
                }
            ]
        },
        {
            id: 8,
            title: { en: 'The robot', vi: 'Người máy' },
            lessons: [
                {
                    id: 801,
                    title: { en: 'Body Parts and Ability', vi: 'Các bộ phận cơ thể và Khả năng' },
                    aims: {
                        en: ['Identify parts of the body.', 'Talk about abilities using "can" and "can\'t".'],
                        vi: ['Nhận biết các bộ phận của cơ thể.', 'Nói về khả năng sử dụng "có thể" và "không thể".']
                    },
                    vocabulary: [
                        { term: 'head', pronunciation: '/hɛd/', vietnamese: 'đầu' },
                        { term: 'arm', pronunciation: '/ɑːrm/', vietnamese: 'cánh tay' },
                        { term: 'fingers', pronunciation: '/ˈfɪŋɡərz/', vietnamese: 'ngón tay' },
                        { term: 'hand', pronunciation: '/hænd/', vietnamese: 'bàn tay' },
                        { term: 'knee', pronunciation: '/niː/', vietnamese: 'đầu gối' },
                        { term: 'leg', pronunciation: '/lɛɡ/', vietnamese: 'chân' },
                        { term: 'toes', pronunciation: '/toʊz/', vietnamese: 'ngón chân' },
                        { term: 'foot', pronunciation: '/fʊt/', vietnamese: 'bàn chân' },
                    ],
                    grammar: [
                        { title: { en: 'Abilities with can/can\'t', vi: 'Khả năng với có thể/không thể' }, explanation: { en: ["Use 'can' for ability and 'can't' for inability.", "Example: I can stand on one leg. He can't skip."], vi: ['Sử dụng "can" cho khả năng và "can\'t" cho việc không có khả năng.', 'Ví dụ: Tôi có thể đứng bằng một chân. Anh ấy không thể nhảy dây.'] } }
                    ],
                    activities: [
                        { type: 'Practice', description: { en: ['Listen and chant about body parts.', 'Make sentences about what Anna and Pete can do.'], vi: ['Nghe và đọc theo vần về các bộ phận cơ thể.', 'Đặt câu về những gì Anna và Pete có thể làm.'] } }
                    ]
                },
                {
                    id: 802,
                    title: { en: 'Asking about Ability', vi: 'Hỏi về Khả năng' },
                    aims: {
                        en: ['Ask and answer questions about ability.'],
                        vi: ['Hỏi và trả lời các câu hỏi về khả năng.']
                    },
                    vocabulary: [
                        { term: 'swim', pronunciation: '/swɪm/', vietnamese: 'bơi' },
                        { term: 'ride a horse', pronunciation: '/raɪd ə hɔːrs/', vietnamese: 'cưỡi ngựa' },
                        { term: 'ride a bike', pronunciation: '/raɪd ə baɪk/', vietnamese: 'đi xe đạp' },
                        { term: 'play tennis', pronunciation: '/pleɪ ˈtɛnɪs/', vietnamese: 'chơi quần vợt' },
                        { term: 'dance', pronunciation: '/dæns/', vietnamese: 'nhảy' },
                    ],
                    grammar: [
                        { title: { en: 'Questions with "Can you...?"', vi: 'Câu hỏi với "Bạn có thể...?"' }, explanation: { en: ["Ask with 'Can you (swim)?'", "Answer with 'Yes, I can.' or 'No, I can't.'"], vi: ['Hỏi với "Bạn có thể (bơi) không?"', 'Trả lời với "Vâng, tôi có thể." hoặc "Không, tôi không thể."'] } }
                    ],
                    activities: [
                        { type: 'Practice', description: { en: ['Look and say, then tick or cross the box.', 'Play the action game.'], vi: ['Nhìn và nói, sau đó đánh dấu tick hoặc chéo vào ô.', 'Chơi trò chơi hành động.'] } }
                    ]
                }
            ]
        },
        {
            id: 9,
            title: { en: 'At the beach', vi: 'Ở bãi biển' },
            lessons: [
                {
                    id: 901,
                    title: { en: 'Holiday Activities and Suggestions', vi: 'Hoạt động kỳ nghỉ và Gợi ý' },
                    aims: {
                        en: ['Talk about holiday activities.', 'Make suggestions and respond to them.'],
                        vi: ['Nói về các hoạt động trong kỳ nghỉ.', 'Đưa ra gợi ý và phản hồi lại.']
                    },
                    vocabulary: [
                        { term: 'catch a fish', pronunciation: '/kætʃ ə fɪʃ/', vietnamese: 'bắt cá' },
                        { term: 'paint a picture', pronunciation: '/peɪnt ə ˈpɪktʃər/', vietnamese: 'vẽ một bức tranh' },
                        { term: 'eat ice cream', pronunciation: '/iːt aɪs kriːm/', vietnamese: 'ăn kem' },
                        { term: 'take a photo', pronunciation: '/teɪk ə ˈfoʊtoʊ/', vietnamese: 'chụp ảnh' },
                        { term: 'listen to music', pronunciation: '/ˈlɪsən tu ˈmjuːzɪk/', vietnamese: 'nghe nhạc' },
                        { term: 'look for shells', pronunciation: '/lʊk fər ʃɛlz/', vietnamese: 'tìm vỏ sò' },
                        { term: 'read a book', pronunciation: '/riːd ə bʊk/', vietnamese: 'đọc sách' },
                        { term: 'make a sandcastle', pronunciation: '/meɪk ə ˈsændˌkæsəl/', vietnamese: 'xây lâu đài cát' },
                    ],
                    grammar: [
                        { title: { en: 'Suggestions with Let\'s', vi: 'Gợi ý với "Hãy cùng..."' }, explanation: { en: ["Use 'Let's...' to make a suggestion.", "Respond with 'Good idea.', 'I'm not sure.', or 'Sorry, I don't want to.'", "Example: Let's play the guitar."], vi: ['Sử dụng "Let\'s..." để đưa ra gợi ý.', 'Phản hồi bằng "Ý kiến hay.", "Tôi không chắc.", hoặc "Xin lỗi, tôi không muốn."', 'Ví dụ: Hãy chơi đàn guitar nào.'] } }
                    ],
                    activities: [
                        { type: 'Practice', description: { en: ['Listen and chant about beach activities.', 'Look and act out making suggestions.'], vi: ['Nghe và đọc theo vần về các hoạt động ở bãi biển.', 'Nhìn và diễn tả việc đưa ra gợi ý.'] } }
                    ]
                },
                {
                    id: 902,
                    title: { en: 'Asking for Location', vi: 'Hỏi vị trí' },
                    aims: {
                        en: ["Ask and answer where things are using 'Where's...?' and 'Where are...?'"],
                        vi: ["Hỏi và trả lời về vị trí của đồ vật bằng cách sử dụng '... ở đâu?'"]
                    },
                    vocabulary: [
                         { term: 'shell', pronunciation: '/ʃɛl/', vietnamese: 'vỏ sò' },
                         { term: 'sandcastle', pronunciation: '/ˈsændˌkæsəl/', vietnamese: 'lâu đài cát' },
                         { term: 'kites', pronunciation: '/kaɪts/', vietnamese: 'những cái diều' },
                         { term: 'toy box', pronunciation: '/tɔɪ bɒks/', vietnamese: 'hộp đồ chơi' },
                    ],
                    grammar: [
                        { title: { en: "Where's / Where are...?", vi: '... ở đâu?' }, explanation: { en: ["Use 'Where's...?' for singular items.", "Use 'Where are...?' for plural items.", "Example: Where's the blue book? It's in the green bag.", "Example: Where are the orange books? They're in the black bag."], vi: ['Sử dụng "Where\'s...?" cho đồ vật số ít.', 'Sử dụng "Where are...?" cho đồ vật số nhiều.', 'Ví dụ: Quyển sách màu xanh ở đâu? Nó ở trong cái túi màu xanh lá.', 'Ví dụ: Những quyển sách màu cam ở đâu? Chúng ở trong cái túi màu đen.'] } }
                    ],
                    activities: [
                        { type: 'Practice', description: { en: ['Play the question game about where things are.'], vi: ['Chơi trò chơi hỏi về vị trí của đồ vật.'] } }
                    ]
                }
            ]
        }
    ]
};

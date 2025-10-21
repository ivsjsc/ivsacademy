import { CurriculumLevel } from '../types';

/**
 * Dữ liệu chương trình Tiếng Anh Lớp 10 - Global Success (Đã được sửa chi tiết từ vựng)
 * Cấu trúc: 10 Units (Mỗi Unit 5 bài học) + 3 Bài Ôn tập (Reviews)
 */
export const g10Data: CurriculumLevel = {
    "level": 10,
    "title": {
        "en": "Grade 10",
        "vi": "Lớp 10"
    },
    "subtitle": {
        "en": "Global Success",
        "vi": "Tiếng Anh 10 - Global Success"
    },
    // URL PDF Sách giáo khoa (cần cập nhật URL thực tế)
    "ebookPdfUrl": "https://drive.google.com/file/d/1uEKt91RasMcOCybqfc6KpoDKve9X8cV2/view?usp=drive_link",
    "units": [
        // --- UNIT 1: FAMILY LIFE ---
        {
            "id": 1001,
            "title": {
                "en": "Unit 1: Family Life",
                "vi": "Bài 1: Cuộc sống gia đình"
            },
            "lessons": [
                {
                    "id": 100101,
                    "title": {
                        "en": "Getting Started & Language: Household Chores",
                        "vi": "Bắt đầu & Ngôn ngữ: Công việc nhà"
                    },
                    "aims": {
                        "en": [
                            "Introduce and practice vocabulary related to household chores and family responsibilities",
                            "Practice pronunciation of consonant clusters /br/, /kr/, /tr/",
                            "Review and differentiate between the Present Simple and Present Continuous tenses"
                        ],
                        "vi": [
                            "Giới thiệu và thực hành từ vựng về công việc nhà và trách nhiệm gia đình",
                            "Luyện phát âm các cụm phụ âm /br/, /kr/, /tr/",
                            "Ôn tập và phân biệt thì Hiện tại đơn và Hiện tại tiếp diễn"
                        ]
                    },
                    "vocabulary": [
                        { "term": "household chores", "pronunciation": "/ˈhaʊshəʊld tʃɔːz/", "vietnamese": "công việc nhà" },
                        { "term": "divide", "pronunciation": "/dɪˈvaɪd/", "vietnamese": "chia, phân chia" },
                        { "term": "homemaker", "pronunciation": "/ˈhəʊmmeɪkə(r)/", "vietnamese": "người nội trợ" },
                        { "term": "breadwinner", "pronunciation": "/ˈbredwɪnə(r)/", "vietnamese": "trụ cột gia đình (người kiếm tiền)" },
                        { "term": "heavy lifting", "pronunciation": "/ˈhevi ˈlɪftɪŋ/", "vietnamese": "việc nặng" },
                        { "term": "laundry", "pronunciation": "/ˈlɔːndri/", "vietnamese": "quần áo bẩn, việc giặt giũ" },
                        { "term": "washing-up", "pronunciation": "/ˌwɒʃɪŋ ˈʌp/", "vietnamese": "rửa chén bát" },
                        { "term": "rubbish", "pronunciation": "/ˈrʌbɪʃ/", "vietnamese": "rác" },
                        { "term": "groceries", "pronunciation": "/ˈɡrəʊsəriz/", "vietnamese": "thực phẩm và hàng tạp hóa" }
                    ],
                    "grammar": [
        { "title": { "en": "Present simple vs. present continuous (for habits", "vi": "" }, "explanation": { "en": [""], "vi": [""] } },
        { "title": { "en": "facts", "vi": "" }, "explanation": { "en": [""], "vi": [""] } },
        { "title": { "en": "and ongoing actions)", "vi": "" }, "explanation": { "en": [""], "vi": [""] } }
      ],
                    "activities": []
                },
                {
                    "id": 100102,
                    "title": {
                        "en": "Communication: Giving Advice",
                        "vi": "Giao tiếp: Đưa ra lời khuyên"
                    },
                    "aims": {
                        "en": ["Practice structures for giving and asking for advice"],
                        "vi": ["Thực hành các cấu trúc đưa ra và hỏi xin lời khuyên"]
                    },
                    "vocabulary": [
                        { "term": "nurture", "pronunciation": "", "vietnamese": "nuôi dưỡng, ấp ủ" },
                        { "term": "cooperate", "pronunciation": "", "vietnamese": "hợp tác" },
                        { "term": "recreational", "pronunciation": "", "vietnamese": "giải trí" }
                    ],
                    "grammar": [
        { "title": { "en": "Giving advice (should", "vi": "" }, "explanation": { "en": [""], "vi": [""] } },
        { "title": { "en": "shouldnt", "vi": "" }, "explanation": { "en": [""], "vi": [""] } },
        { "title": { "en": "ought to", "vi": "" }, "explanation": { "en": [""], "vi": [""] } },
        { "title": { "en": "had better)", "vi": "" }, "explanation": { "en": [""], "vi": [""] } }
      ],
                    "activities": []
                },
                {
                    "id": 100103,
                    "title": {
                        "en": "Skills 1: Reading & Speaking (Sharing Chores)",
                        "vi": "Kỹ năng 1: Đọc & Nói (Chia sẻ việc nhà)"
                    },
                    "aims": {
                        "en": ["Read a text about family rules", "Discuss the importance and ways of sharing household chores"],
                        "vi": ["Đọc bài về các quy tắc gia đình", "Thảo luận về tầm quan trọng và cách chia sẻ công việc nhà"]
                    },
                    "vocabulary": [
                        { "term": "family rules", "pronunciation": "", "vietnamese": "các quy tắc gia đình" },
                        { "term": "share housework", "pronunciation": "", "vietnamese": "chia sẻ việc nhà" },
                        { "term": "responsibility", "pronunciation": "", "vietnamese": "trách nhiệm" },
                        { "term": "tidy up", "pronunciation": "", "vietnamese": "dọn dẹp ngăn nắp" }
                    ],
                    "grammar": [
        
      ],
                    "activities": []
                },
                {
                    "id": 100104,
                    "title": {
                        "en": "Skills 2: Listening & Writing (Benefits of Chores)",
                        "vi": "Kỹ năng 2: Nghe & Viết (Lợi ích của việc nhà)"
                    },
                    "aims": {
                        "en": ["Listen for main ideas and details about the benefits of doing chores", "Write a paragraph about how to share household chores fairly"],
                        "vi": ["Nghe ý chính và chi tiết về lợi ích của việc nhà", "Viết một đoạn văn về cách chia sẻ công việc nhà một cách công bằng"]
                    },
                    "vocabulary": [
                        { "term": "benefit", "pronunciation": "", "vietnamese": "lợi ích" },
                        { "term": "fairly", "pronunciation": "", "vietnamese": "một cách công bằng" },
                        { "term": "contribute", "pronunciation": "", "vietnamese": "đóng góp" },
                        { "term": "independent", "pronunciation": "", "vietnamese": "độc lập" }
                    ],
                    "grammar": [
        
      ],
                    "activities": []
                },
                {
                    "id": 100105,
                    "title": {
                        "en": "Looking Back & Project: Family Survey",
                        "vi": "Ôn tập & Dự án: Thăm dò ý kiến gia đình"
                    },
                    "aims": {
                        "en": ["Review vocabulary and grammar from Unit 1", "Plan and conduct a survey on household chores"],
                        "vi": ["Ôn tập từ vựng và ngữ pháp từ Bài 1", "Lên kế hoạch và thực hiện khảo sát về công việc nhà"]
                    },
                    "vocabulary": [],
                    "grammar": [
        
      ],
                    "activities": []
                }
            ]
        },
        // --- UNIT 2: CLIMATE CHANGE ---
        {
            "id": 1002,
            "title": {
                "en": "Unit 2: Climate Change",
                "vi": "Bài 2: Biến đổi khí hậu"
            },
            "lessons": [
                {
                    "id": 100201,
                    "title": {
                        "en": "Getting Started & Language: Vocabulary on Climate Change",
                        "vi": "Bắt đầu & Ngôn ngữ: Từ vựng về Biến đổi Khí hậu"
                    },
                    "aims": {
                        "en": ["Introduce and practice vocabulary related to climate change", "Practice the Future Simple tense and the Passive Voice (Present Simple)"],
                        "vi": ["Giới thiệu và thực hành từ vựng liên quan đến biến đổi khí hậu", "Thực hành thì Tương lai đơn và Thể Bị động (Hiện tại đơn)"]
                    },
                    "vocabulary": [
                        { "term": "climate change", "pronunciation": "", "vietnamese": "biến đổi khí hậu" },
                        { "term": "global warming", "pronunciation": "", "vietnamese": "nóng lên toàn cầu" },
                        { "term": "carbon footprint", "pronunciation": "", "vietnamese": "dấu chân carbon" },
                        { "term": "greenhouse gas", "pronunciation": "", "vietnamese": "khí nhà kính" },
                        { "term": "drought", "pronunciation": "", "vietnamese": "hạn hán" },
                        { "term": "flood", "pronunciation": "", "vietnamese": "lũ lụt" },
                        { "term": "emission", "pronunciation": "", "vietnamese": "sự phát thải" },
                        { "term": "sea level rise", "pronunciation": "", "vietnamese": "nước biển dâng" },
                        { "term": "deforestation", "pronunciation": "", "vietnamese": "nạn phá rừng" }
                    ],
                    "grammar": [
        { "title": { "en": "Future simple tense", "vi": "" }, "explanation": { "en": [""], "vi": [""] } },
        { "title": { "en": "Passive voice (Present simple)", "vi": "" }, "explanation": { "en": [""], "vi": [""] } }
      ],
                    "activities": []
                },
                {
                    "id": 100202,
                    "title": {
                        "en": "Communication: Making and Responding to Suggestions",
                        "vi": "Giao tiếp: Đề nghị giúp đỡ và phản hồi"
                    },
                    "aims": {
                        "en": ["Practice structures for making and responding to suggestions"],
                        "vi": ["Thực hành các cấu trúc đưa ra và phản hồi đề xuất"]
                    },
                    "vocabulary": [
                        { "term": "renewable energy", "pronunciation": "", "vietnamese": "năng lượng tái tạo" },
                        { "term": "eco-friendly", "pronunciation": "", "vietnamese": "thân thiện với môi trường" },
                        { "term": "solar power", "pronunciation": "", "vietnamese": "năng lượng mặt trời" }
                    ],
                    "grammar": [
        { "title": { "en": "Making and responding to suggestions (How about...?", "vi": "" }, "explanation": { "en": [""], "vi": [""] } },
        { "title": { "en": "What if...?", "vi": "" }, "explanation": { "en": [""], "vi": [""] } },
        { "title": { "en": "Lets...)", "vi": "" }, "explanation": { "en": [""], "vi": [""] } }
      ],
                    "activities": []
                },
                {
                    "id": 100203,
                    "title": {
                        "en": "Skills 1: Reading & Speaking (Causes and Solutions)",
                        "vi": "Kỹ năng 1: Đọc & Nói (Nguyên nhân/Giải pháp)"
                    },
                    "aims": {
                        "en": ["Read a text about causes of climate change", "Discuss solutions to environmental problems"],
                        "vi": ["Đọc bài về nguyên nhân của biến đổi khí hậu", "Thảo luận các giải pháp cho các vấn đề môi trường"]
                    },
                    "vocabulary": [
                        { "term": "cause", "pronunciation": "", "vietnamese": "nguyên nhân" },
                        { "term": "solution", "pronunciation": "", "vietnamese": "giải pháp" },
                        { "term": "mitigation", "pronunciation": "", "vietnamese": "sự giảm nhẹ" },
                        { "term": "adaptation", "pronunciation": "", "vietnamese": "sự thích nghi" },
                        { "term": "fossil fuel", "pronunciation": "", "vietnamese": "nhiên liệu hóa thạch" }
                    ],
                    "grammar": [
        
      ],
                    "activities": []
                },
                {
                    "id": 100204,
                    "title": {
                        "en": "Skills 2: Listening & Writing (Mitigation Measures)",
                        "vi": "Kỹ năng 2: Nghe & Viết (Các biện pháp giảm thiểu)"
                    },
                    "aims": {
                        "en": ["Listen for specific information about ways to reduce carbon footprint", "Write a paragraph about actions to mitigate climate change"],
                        "vi": ["Nghe thông tin chi tiết về cách giảm dấu chân carbon", "Viết một đoạn văn về các hành động giảm thiểu biến đổi khí hậu"]
                    },
                    "vocabulary": [
                        { "term": "carbon footprint", "pronunciation": "", "vietnamese": "dấu chân carbon" },
                        { "term": "reduce", "pronunciation": "", "vietnamese": "giảm bớt" },
                        { "term": "reuse", "pronunciation": "", "vietnamese": "tái sử dụng" },
                        { "term": "recycle", "pronunciation": "", "vietnamese": "tái chế" },
                        { "term": "insulation", "pronunciation": "", "vietnamese": "sự cách nhiệt" }
                    ],
                    "grammar": [
        
      ],
                    "activities": []
                },
                {
                    "id": 100205,
                    "title": {
                        "en": "Looking Back & Project: Designing a Poster",
                        "vi": "Ôn tập & Dự án: Thiết kế áp phích"
                    },
                    "aims": {
                        "en": ["Review Unit 2 content", "Design a poster about protecting the environment"],
                        "vi": ["Ôn tập nội dung Bài 2", "Thiết kế áp phích về bảo vệ môi trường"]
                    },
                    "vocabulary": [],
                    "grammar": [
        
      ],
                    "activities": []
                }
            ]
        },
        // --- UNIT 3: MUSIC ---
        {
            "id": 1003,
            "title": {
                "en": "Unit 3: Music",
                "vi": "Bài 3: Âm nhạc"
            },
            "lessons": [
                {
                    "id": 100301,
                    "title": {
                        "en": "Getting Started & Language: Music Genres",
                        "vi": "Bắt đầu & Ngôn ngữ: Thể loại âm nhạc"
                    },
                    "aims": {
                        "en": ["Introduce and practice vocabulary related to music genres and instruments", "Practice using Gerunds and Infinitives after certain verbs and adjectives"],
                        "vi": ["Giới thiệu và thực hành từ vựng về thể loại và nhạc cụ", "Thực hành sử dụng Danh động từ và Động từ nguyên mẫu sau động từ và tính từ"]
                    },
                    "vocabulary": [
                        { "term": "genre", "pronunciation": "", "vietnamese": "thể loại" },
                        { "term": "pop", "pronunciation": "", "vietnamese": "nhạc pop" },
                        { "term": "rock", "pronunciation": "", "vietnamese": "nhạc rock" },
                        { "term": "folk music", "pronunciation": "", "vietnamese": "nhạc dân ca" },
                        { "term": "classical music", "pronunciation": "", "vietnamese": "nhạc cổ điển" },
                        { "term": "jazz", "pronunciation": "", "vietnamese": "nhạc jazz" },
                        { "term": "composer", "pronunciation": "", "vietnamese": "nhà soạn nhạc" },
                        { "term": "melody", "pronunciation": "", "vietnamese": "giai điệu" },
                        { "term": "rhythm", "pronunciation": "", "vietnamese": "nhịp điệu" }
                    ],
                    "grammar": [
        { "title": { "en": "Gerunds and infinitives (after V/Adj)", "vi": "" }, "explanation": { "en": [""], "vi": [""] } }
      ],
                    "activities": []
                },
                {
                    "id": 100302,
                    "title": {
                        "en": "Communication: Expressing Preferences",
                        "vi": "Giao tiếp: Bày tỏ sở thích"
                    },
                    "aims": {
                        "en": ["Practice structures for expressing preferences about music"],
                        "vi": ["Thực hành các cấu trúc bày tỏ sở thích về âm nhạc"]
                    },
                    "vocabulary": [
                        { "term": "preference", "pronunciation": "", "vietnamese": "sở thích" },
                        { "term": "upbeat", "pronunciation": "", "vietnamese": "vui vẻ, lạc quan" },
                        { "term": "soothing", "pronunciation": "", "vietnamese": "dịu êm" }
                    ],
                    "grammar": [
        { "title": { "en": "Expressing preferences (I like... better than...", "vi": "" }, "explanation": { "en": [""], "vi": [""] } },
        { "title": { "en": "Id rather...", "vi": "" }, "explanation": { "en": [""], "vi": [""] } },
        { "title": { "en": "prefer... to...)", "vi": "" }, "explanation": { "en": [""], "vi": [""] } }
      ],
                    "activities": []
                },
                {
                    "id": 100303,
                    "title": {
                        "en": "Skills 1: Reading & Speaking (Artists and Songs)",
                        "vi": "Kỹ năng 1: Đọc & Nói (Nghệ sĩ và Bài hát)"
                    },
                    "aims": {
                        "en": ["Read a text about a famous artist or song", "Talk about a favourite piece of music and why it is appealing"],
                        "vi": ["Đọc bài về một nghệ sĩ hoặc bài hát nổi tiếng", "Nói về một tác phẩm âm nhạc yêu thích và lý do nó hấp dẫn"]
                    },
                    "vocabulary": [
                        { "term": "hit song", "pronunciation": "", "vietnamese": "bài hát nổi tiếng" },
                        { "term": "album", "pronunciation": "", "vietnamese": "album ca nhạc" },
                        { "term": "lyrics", "pronunciation": "", "vietnamese": "lời bài hát" },
                        { "term": "musician", "pronunciation": "", "vietnamese": "nhạc sĩ" },
                        { "term": "vocalist", "pronunciation": "", "vietnamese": "ca sĩ" }
                    ],
                    "grammar": [
        
      ],
                    "activities": []
                },
                {
                    "id": 100304,
                    "title": {
                        "en": "Skills 2: Listening & Writing (Music Review)",
                        "vi": "Kỹ năng 2: Nghe & Viết (Bài đánh giá âm nhạc)"
                    },
                    "aims": {
                        "en": ["Listen for information in a conversation about music", "Write a short music review or a paragraph about the role of music in life"],
                        "vi": ["Nghe thông tin trong một cuộc trò chuyện về âm nhạc", "Viết một bài đánh giá âm nhạc ngắn hoặc đoạn văn về vai trò của âm nhạc trong cuộc sống"]
                    },
                    "vocabulary": [
                        { "term": "review", "pronunciation": "", "vietnamese": "bài đánh giá" },
                        { "term": "entertaining", "pronunciation": "", "vietnamese": "có tính giải trí" },
                        { "term": "relaxing", "pronunciation": "", "vietnamese": "thư giãn" },
                        { "term": "uplifting", "pronunciation": "", "vietnamese": "nâng cao tinh thần" }
                    ],
                    "grammar": [
        
      ],
                    "activities": []
                },
                {
                    "id": 100305,
                    "title": {
                        "en": "Looking Back & Project: Music Blog",
                        "vi": "Ôn tập & Dự án: Viết blog âm nhạc"
                    },
                    "aims": {
                        "en": ["Review Unit 3 content", "Create a music blog post about a favourite band or genre"],
                        "vi": ["Ôn tập nội dung Bài 3", "Viết một bài blog âm nhạc về một ban nhạc hoặc thể loại yêu thích"]
                    },
                    "vocabulary": [],
                    "grammar": [
        
      ],
                    "activities": []
                }
            ]
        },
        // --- UNIT 4: FOR A BETTER COMMUNITY ---
        {
            "id": 1004,
            "title": {
                "en": "Unit 4: For a Better Community",
                "vi": "Bài 4: Vì một cộng đồng tốt đẹp hơn"
            },
            "lessons": [
                {
                    "id": 100401,
                    "title": {
                        "en": "Getting Started & Language: Community Activities",
                        "vi": "Bắt đầu & Ngôn ngữ: Hoạt động cộng đồng"
                    },
                    "aims": {
                        "en": ["Introduce and practice vocabulary related to community service and volunteering", "Practice the Present Perfect and Present Perfect Continuous tenses"],
                        "vi": ["Giới thiệu và thực hành từ vựng liên quan đến dịch vụ cộng đồng và tình nguyện", "Thực hành thì Hiện tại Hoàn thành và Hiện tại Hoàn thành Tiếp diễn"]
                    },
                    "vocabulary": [
                        { "term": "charity", "pronunciation": "", "vietnamese": "tổ chức từ thiện" },
                        { "term": "volunteer", "pronunciation": "", "vietnamese": "tình nguyện viên" },
                        { "term": "donate", "pronunciation": "", "vietnamese": "quyên góp, ủng hộ" },
                        { "term": "community service", "pronunciation": "", "vietnamese": "dịch vụ cộng đồng" },
                        { "term": "raise funds", "pronunciation": "", "vietnamese": "gây quỹ" },
                        { "term": "disadvantaged people", "pronunciation": "", "vietnamese": "người có hoàn cảnh khó khăn" },
                        { "term": "shelter", "pronunciation": "", "vietnamese": "nơi trú ẩn" },
                        { "term": "elderly", "pronunciation": "", "vietnamese": "người cao tuổi" },
                        { "term": "recycling centre", "pronunciation": "", "vietnamese": "trung tâm tái chế" }
                    ],
                    "grammar": [
        { "title": { "en": "Present Perfect (for/since) and Present Perfect Continuous", "vi": "" }, "explanation": { "en": [""], "vi": [""] } }
      ],
                    "activities": []
                },
                {
                    "id": 100402,
                    "title": {
                        "en": "Communication: Talking about Charity Work",
                        "vi": "Giao tiếp: Hỏi và trả lời về hoạt động từ thiện"
                    },
                    "aims": {
                        "en": ["Practice asking and answering about volunteer experiences"],
                        "vi": ["Thực hành hỏi và trả lời về kinh nghiệm tình nguyện"]
                    },
                    "vocabulary": [
                        { "term": "impact", "pronunciation": "", "vietnamese": "tác động" },
                        { "term": "meaningful", "pronunciation": "", "vietnamese": "có ý nghĩa" },
                        { "term": "make a difference", "pronunciation": "", "vietnamese": "tạo sự khác biệt" }
                    ],
                    "grammar": [
        { "title": { "en": "Asking about and responding to volunteer experience", "vi": "" }, "explanation": { "en": [""], "vi": [""] } }
      ],
                    "activities": []
                },
                {
                    "id": 100403,
                    "title": {
                        "en": "Skills 1: Reading & Speaking (Volunteer Activities)",
                        "vi": "Kỹ năng 1: Đọc & Nói (Các hoạt động tình nguyện)"
                    },
                    "aims": {
                        "en": ["Read a text about different volunteer activities", "Discuss suitable volunteer work for teenagers"],
                        "vi": ["Đọc bài về các hoạt động tình nguyện khác nhau", "Thảo luận về công việc tình nguyện phù hợp cho thanh thiếu niên"]
                    },
                    "vocabulary": [
                        { "term": "take part in", "pronunciation": "", "vietnamese": "tham gia vào" },
                        { "term": "make a difference", "pronunciation": "", "vietnamese": "tạo nên sự khác biệt" },
                        { "term": "local authority", "pronunciation": "", "vietnamese": "chính quyền địa phương" },
                        { "term": "campaign", "pronunciation": "", "vietnamese": "chiến dịch" }
                    ],
                    "grammar": [
        
      ],
                    "activities": []
                },
                {
                    "id": 100404,
                    "title": {
                        "en": "Skills 2: Listening & Writing (Thank-you Letter/Proposal)",
                        "vi": "Kỹ năng 2: Nghe & Viết (Thư cảm ơn/đề xuất)"
                    },
                    "aims": {
                        "en": ["Listen for specific information about a community project", "Write a thank-you note or a proposal for a community event"],
                        "vi": ["Nghe thông tin chi tiết về một dự án cộng đồng", "Viết thư cảm ơn hoặc đề xuất cho một sự kiện cộng đồng"]
                    },
                    "vocabulary": [
                        { "term": "proposal", "pronunciation": "", "vietnamese": "đề xuất" },
                        { "term": "appreciate", "pronunciation": "", "vietnamese": "đánh giá cao, cảm kích" },
                        { "term": "organise", "pronunciation": "", "vietnamese": "tổ chức" },
                        { "term": "fundraiser", "pronunciation": "", "vietnamese": "người gây quỹ" }
                    ],
                    "grammar": [
        
      ],
                    "activities": []
                },
                {
                    "id": 100405,
                    "title": {
                        "en": "Looking Back & Project: Volunteer Plan",
                        "vi": "Ôn tập & Dự án: Lên kế hoạch hoạt động tình nguyện"
                    },
                    "aims": {
                        "en": ["Review Unit 4 content", "Plan a voluntary activity for the school or local community"],
                        "vi": ["Ôn tập nội dung Bài 4", "Lên kế hoạch một hoạt động tình nguyện cho trường hoặc cộng đồng địa phương"]
                    },
                    "vocabulary": [],
                    "grammar": [
        
      ],
                    "activities": []
                }
            ]
        },
        // --- UNIT 5: TECHNOLOGY AND YOU ---
        {
            "id": 1005,
            "title": {
                "en": "Unit 5: Technology and You",
                "vi": "Bài 5: Công nghệ và bạn"
            },
            "lessons": [
                {
                    "id": 100501,
                    "title": {
                        "en": "Getting Started & Language: Technological Gadgets",
                        "vi": "Bắt đầu & Ngôn ngữ: Các tiện ích công nghệ"
                    },
                    "aims": {
                        "en": ["Introduce and practice vocabulary related to modern technology and devices", "Practice using compound sentences with coordinating conjunctions (FANBOYS)"],
                        "vi": ["Giới thiệu và thực hành từ vựng về công nghệ và thiết bị hiện đại", "Thực hành sử dụng câu ghép với các liên từ kết hợp (FANBOYS)"]
                    },
                    "vocabulary": [
                        { "term": "gadget", "pronunciation": "", "vietnamese": "tiện ích, thiết bị" },
                        { "term": "device", "pronunciation": "", "vietnamese": "thiết bị" },
                        { "term": "application (app)", "pronunciation": "", "vietnamese": "ứng dụng" },
                        { "term": "access", "pronunciation": "", "vietnamese": "truy cập" },
                        { "term": "social media", "pronunciation": "", "vietnamese": "mạng xã hội" },
                        { "term": "search engine", "pronunciation": "", "vietnamese": "công cụ tìm kiếm" },
                        { "term": "artificial intelligence (AI)", "pronunciation": "", "vietnamese": "trí tuệ nhân tạo" },
                        { "term": "virtual reality (VR)", "pronunciation": "", "vietnamese": "thực tế ảo" },
                        { "term": "convenient", "pronunciation": "", "vietnamese": "tiện lợi" }
                    ],
                    "grammar": [
        { "title": { "en": "Compound sentences (coordinating conjunctions: for", "vi": "" }, "explanation": { "en": [""], "vi": [""] } },
        { "title": { "en": "and", "vi": "" }, "explanation": { "en": [""], "vi": [""] } },
        { "title": { "en": "nor", "vi": "" }, "explanation": { "en": [""], "vi": [""] } },
        { "title": { "en": "but", "vi": "" }, "explanation": { "en": [""], "vi": [""] } },
        { "title": { "en": "or", "vi": "" }, "explanation": { "en": [""], "vi": [""] } },
        { "title": { "en": "yet", "vi": "" }, "explanation": { "en": [""], "vi": [""] } },
        { "title": { "en": "so)", "vi": "" }, "explanation": { "en": [""], "vi": [""] } }
      ],
                    "activities": []
                },
                {
                    "id": 100502,
                    "title": {
                        "en": "Communication: Asking about Tech Use and Preferences",
                        "vi": "Giao tiếp: Hỏi về công dụng và sở thích công nghệ"
                    },
                    "aims": {
                        "en": ["Practice structures for asking and talking about how and why people use technology"],
                        "vi": ["Thực hành các cấu trúc hỏi và nói về cách thức và lý do mọi người sử dụng công nghệ"]
                    },
                    "vocabulary": [
                        { "term": "user-friendly", "pronunciation": "", "vietnamese": "thân thiện với người dùng" },
                        { "term": "portable", "pronunciation": "", "vietnamese": "di động, có thể mang theo" },
                        { "term": "innovative", "pronunciation": "", "vietnamese": "đổi mới" }
                    ],
                    "grammar": [
        
      ],
                    "activities": []
                },
                {
                    "id": 100503,
                    "title": {
                        "en": "Skills 1: Reading & Speaking (Pros and Cons of Technology)",
                        "vi": "Kỹ năng 1: Đọc & Nói (Lợi ích và tác hại của công nghệ)"
                    },
                    "aims": {
                        "en": ["Read an article about the advantages and disadvantages of technology", "Discuss the positive and negative effects of technology on daily life"],
                        "vi": ["Đọc bài báo về ưu và nhược điểm của công nghệ", "Thảo luận về các tác động tích cực và tiêu cực của công nghệ đối với đời sống"]
                    },
                    "vocabulary": [
                        { "term": "advantage", "pronunciation": "", "vietnamese": "lợi thế" },
                        { "term": "disadvantage", "pronunciation": "", "vietnamese": "bất lợi" },
                        { "term": "impact", "pronunciation": "", "vietnamese": "tác động" },
                        { "term": "addiction", "pronunciation": "", "vietnamese": "sự nghiện" },
                        { "term": "distraction", "pronunciation": "", "vietnamese": "sự xao nhãng" }
                    ],
                    "grammar": [
        
      ],
                    "activities": []
                },
                {
                    "id": 100504,
                    "title": {
                        "en": "Skills 2: Listening & Writing (A Tech Gadget Paragraph)",
                        "vi": "Kỹ năng 2: Nghe & Viết (Đoạn văn về tiện ích công nghệ)"
                    },
                    "aims": {
                        "en": ["Listen to a discussion about a popular gadget", "Write a paragraph describing a favourite technological device and its uses"],
                        "vi": ["Nghe một cuộc thảo luận về một tiện ích phổ biến", "Viết một đoạn văn mô tả thiết bị công nghệ yêu thích và công dụng của nó"]
                    },
                    "vocabulary": [
                        { "term": "portable", "pronunciation": "", "vietnamese": "di động" },
                        { "term": "function", "pronunciation": "", "vietnamese": "chức năng" },
                        { "term": "stream", "pronunciation": "", "vietnamese": "phát trực tuyến" },
                        { "term": "wireless", "pronunciation": "", "vietnamese": "không dây" }
                    ],
                    "grammar": [
        
      ],
                    "activities": []
                },
                {
                    "id": 100505,
                    "title": {
                        "en": "Looking Back & Project: Designing a New Gadget",
                        "vi": "Ôn tập & Dự án: Thiết kế một tiện ích mới"
                    },
                    "aims": {
                        "en": ["Review Unit 5 content", "Work in groups to design and present a new technological gadget"],
                        "vi": ["Ôn tập nội dung Bài 5", "Làm việc nhóm để thiết kế và trình bày một tiện ích công nghệ mới"]
                    },
                    "vocabulary": [],
                    "grammar": [
        
      ],
                    "activities": []
                }
            ]
        },
        // --- UNIT 6: ANCIENT CIVILISATIONS ---
        {
            "id": 1006,
            "title": {
                "en": "Unit 6: Ancient Civilisations",
                "vi": "Bài 6: Các nền văn minh cổ đại"
            },
            "lessons": [
                {
                    "id": 100601,
                    "title": {
                        "en": "Getting Started & Language: Vocabulary on Ancient History",
                        "vi": "Bắt đầu & Ngôn ngữ: Từ vựng về Lịch sử Cổ đại"
                    },
                    "aims": {
                        "en": ["Introduce and practice vocabulary related to ancient civilisations and history", "Practice the Past Simple tense and the Past Perfect tense"],
                        "vi": ["Giới thiệu và thực hành từ vựng về các nền văn minh và lịch sử cổ đại", "Thực hành thì Quá khứ đơn và Quá khứ hoàn thành"]
                    },
                    "vocabulary": [
                        { "term": "civilisation", "pronunciation": "", "vietnamese": "nền văn minh" },
                        { "term": "archaeology", "pronunciation": "", "vietnamese": "khảo cổ học" },
                        { "term": "dynasty", "pronunciation": "", "vietnamese": "triều đại" },
                        { "term": "pyramid", "pronunciation": "", "vietnamese": "kim tự tháp" },
                        { "term": "temple", "pronunciation": "", "vietnamese": "đền thờ" },
                        { "term": "relic", "pronunciation": "", "vietnamese": "di vật" },
                        { "term": "discovery", "pronunciation": "", "vietnamese": "sự khám phá" },
                        { "term": "hieroglyphics", "pronunciation": "", "vietnamese": "chữ tượng hình" },
                        { "term": "empire", "pronunciation": "", "vietnamese": "đế chế" }
                    ],
                    "grammar": [
        { "title": { "en": "The past simple vs. the past perfect", "vi": "" }, "explanation": { "en": [""], "vi": [""] } }
      ],
                    "activities": []
                },
                {
                    "id": 100602,
                    "title": {
                        "en": "Communication: Expressing Surprise and Interest",
                        "vi": "Giao tiếp: Bày tỏ ngạc nhiên/Quan tâm"
                    },
                    "aims": {
                        "en": ["Practice structures for expressing surprise and deep interest in historical facts"],
                        "vi": ["Thực hành các cấu trúc bày tỏ sự ngạc nhiên và quan tâm sâu sắc về các sự kiện lịch sử"]
                    },
                    "vocabulary": [
                        { "term": "astonishing", "pronunciation": "", "vietnamese": "đáng kinh ngạc" },
                        { "term": "ancient", "pronunciation": "", "vietnamese": "cổ đại" },
                        { "term": "legend", "pronunciation": "", "vietnamese": "huyền thoại" }
                    ],
                    "grammar": [
        { "title": { "en": "Expressing surprise and interest (e.g.", "vi": "" }, "explanation": { "en": [""], "vi": [""] } },
        { "title": { "en": "Wow! That’s incredible! You dont say!)", "vi": "" }, "explanation": { "en": [""], "vi": [""] } }
      ],
                    "activities": []
                },
                {
                    "id": 100603,
                    "title": {
                        "en": "Skills 1: Reading & Speaking (Ancient Achievements)",
                        "vi": "Kỹ năng 1: Đọc & Nói (Thành tựu của văn minh cổ đại)"
                    },
                    "aims": {
                        "en": ["Read a text about the achievements of an ancient civilisation", "Discuss the importance and legacy of ancient discoveries"],
                        "vi": ["Đọc bài về các thành tựu của một nền văn minh cổ đại", "Thảo luận về tầm quan trọng và di sản của các khám phá cổ đại"]
                    },
                    "vocabulary": [
                        { "term": "achievement", "pronunciation": "", "vietnamese": "thành tựu" },
                        { "term": "legacy", "pronunciation": "", "vietnamese": "di sản" },
                        { "term": "ruins", "pronunciation": "", "vietnamese": "tàn tích" },
                        { "term": "monument", "pronunciation": "", "vietnamese": "đài kỷ niệm, công trình kiến trúc" },
                        { "term": "invention", "pronunciation": "", "vietnamese": "phát minh" }
                    ],
                    "grammar": [
        
      ],
                    "activities": []
                },
                {
                    "id": 100604,
                    "title": {
                        "en": "Skills 2: Listening & Writing (Archaeological Discovery)",
                        "vi": "Kỹ năng 2: Nghe & Viết (Đoạn văn về một khám phá khảo cổ)"
                    },
                    "aims": {
                        "en": ["Listen to a presentation about an archaeological find", "Write a paragraph describing an important archaeological discovery"],
                        "vi": ["Nghe một bài thuyết trình về một phát hiện khảo cổ", "Viết một đoạn văn mô tả một khám phá khảo cổ quan trọng"]
                    },
                    "vocabulary": [
                        { "term": "dig", "pronunciation": "", "vietnamese": "đào bới" },
                        { "term": "excavate", "pronunciation": "", "vietnamese": "khai quật" },
                        { "term": "site", "pronunciation": "", "vietnamese": "địa điểm" },
                        { "term": "preservation", "pronunciation": "", "vietnamese": "sự bảo tồn" },
                        { "term": "artifact", "pronunciation": "", "vietnamese": "hiện vật" }
                    ],
                    "grammar": [
        
      ],
                    "activities": []
                },
                {
                    "id": 100605,
                    "title": {
                        "en": "Looking Back & Project: Researching a Wonder",
                        "vi": "Ôn tập & Dự án: Nghiên cứu về một kỳ quan"
                    },
                    "aims": {
                        "en": ["Review Unit 6 content", "Research and present a report about one of the ancient wonders of the world"],
                        "vi": ["Ôn tập nội dung Bài 6", "Nghiên cứu và trình bày báo cáo về một trong các kỳ quan cổ đại"]
                    },
                    "vocabulary": [],
                    "grammar": [
        
      ],
                    "activities": []
                }
            ]
        },
        // --- UNIT 7: TRAFFIC ---
        {
            "id": 1007,
            "title": {
                "en": "Unit 7: Traffic",
                "vi": "Bài 7: Giao thông"
            },
            "lessons": [
                {
                    "id": 100701,
                    "title": {
                        "en": "Getting Started & Language: Traffic Problems",
                        "vi": "Bắt đầu & Ngôn ngữ: Các vấn đề giao thông"
                    },
                    "aims": {
                        "en": ["Introduce and practice vocabulary related to traffic, road safety, and transport", "Practice using connectors of purpose (to, so as to, in order to, so that)"],
                        "vi": ["Giới thiệu và thực hành từ vựng liên quan đến giao thông, an toàn đường bộ và vận tải", "Thực hành sử dụng các liên từ chỉ mục đích"]
                    },
                    "vocabulary": [
                        { "term": "traffic jam", "pronunciation": "", "vietnamese": "ùn tắc giao thông" },
                        { "term": "rush hour", "pronunciation": "", "vietnamese": "giờ cao điểm" },
                        { "term": "public transport", "pronunciation": "", "vietnamese": "phương tiện giao thông công cộng" },
                        { "term": "pedestrian", "pronunciation": "", "vietnamese": "người đi bộ" },
                        { "term": "cyclist", "pronunciation": "", "vietnamese": "người đi xe đạp" },
                        { "term": "traffic rule", "pronunciation": "", "vietnamese": "luật giao thông" },
                        { "term": "fine", "pronunciation": "", "vietnamese": "tiền phạt" },
                        { "term": "overload", "pronunciation": "", "vietnamese": "quá tải" },
                        { "term": "congestion", "pronunciation": "", "vietnamese": "sự tắc nghẽn" }
                    ],
                    "grammar": [
        { "title": { "en": "Connectors of purpose (to", "vi": "" }, "explanation": { "en": [""], "vi": [""] } },
        { "title": { "en": "so as to", "vi": "" }, "explanation": { "en": [""], "vi": [""] } },
        { "title": { "en": "in order to", "vi": "" }, "explanation": { "en": [""], "vi": [""] } },
        { "title": { "en": "so that)", "vi": "" }, "explanation": { "en": [""], "vi": [""] } }
      ],
                    "activities": []
                },
                {
                    "id": 100702,
                    "title": {
                        "en": "Communication: Talking about Means of Transport",
                        "vi": "Giao tiếp: Hỏi và nói về phương tiện giao thông"
                    },
                    "aims": {
                        "en": ["Practice asking and talking about means of transport and traffic problems in cities"],
                        "vi": ["Thực hành hỏi và nói về các phương tiện giao thông và vấn đề giao thông ở thành phố"]
                    },
                    "vocabulary": [
                        { "term": "convenient", "pronunciation": "", "vietnamese": "thuận tiện" },
                        { "term": "accessible", "pronunciation": "", "vietnamese": "có thể tiếp cận" },
                        { "term": "eco-friendly", "pronunciation": "", "vietnamese": "thân thiện với môi trường" }
                    ],
                    "grammar": [
        
      ],
                    "activities": []
                },
                {
                    "id": 100703,
                    "title": {
                        "en": "Skills 1: Reading & Speaking (Traffic Safety)",
                        "vi": "Kỹ năng 1: Đọc & Nói (An toàn giao thông)"
                    },
                    "aims": {
                        "en": ["Read a text about traffic safety rules", "Discuss ways to improve traffic safety and reduce accidents"],
                        "vi": ["Đọc bài về các quy tắc an toàn giao thông", "Thảo luận các cách để cải thiện an toàn giao thông và giảm tai nạn"]
                    },
                    "vocabulary": [
                        { "term": "obey the rule", "pronunciation": "", "vietnamese": "tuân thủ luật" },
                        { "term": "helmet", "pronunciation": "", "vietnamese": "mũ bảo hiểm" },
                        { "term": "seat belt", "pronunciation": "", "vietnamese": "dây an toàn" },
                        { "term": "speed limit", "pronunciation": "", "vietnamese": "giới hạn tốc độ" },
                        { "term": "signal", "pronunciation": "", "vietnamese": "ra tín hiệu" }
                    ],
                    "grammar": [
        
      ],
                    "activities": []
                },
                {
                    "id": 100704,
                    "title": {
                        "en": "Skills 2: Listening & Writing (Traffic Incident Report)",
                        "vi": "Kỹ năng 2: Nghe & Viết (Báo cáo về một tai nạn/sự cố)"
                    },
                    "aims": {
                        "en": ["Listen to a report or announcement about a traffic incident", "Write a report about a traffic accident or problem"],
                        "vi": ["Nghe một bản tin hoặc thông báo về sự cố giao thông", "Viết báo cáo về một vụ tai nạn hoặc vấn đề giao thông"]
                    },
                    "vocabulary": [
                        { "term": "accident", "pronunciation": "", "vietnamese": "tai nạn" },
                        { "term": "incident", "pronunciation": "", "vietnamese": "sự cố" },
                        { "term": "report", "pronunciation": "", "vietnamese": "báo cáo" },
                        { "term": "witness", "pronunciation": "", "vietnamese": "nhân chứng" },
                        { "term": "collision", "pronunciation": "", "vietnamese": "va chạm" }
                    ],
                    "grammar": [
        
      ],
                    "activities": []
                },
                {
                    "id": 100705,
                    "title": {
                        "en": "Looking Back & Project: Traffic Safety Handbook",
                        "vi": "Ôn tập & Dự án: Làm sổ tay an toàn giao thông"
                    },
                    "aims": {
                        "en": ["Review Unit 7 content", "Create a traffic safety handbook for young people"],
                        "vi": ["Ôn tập nội dung Bài 7", "Tạo sổ tay an toàn giao thông cho giới trẻ"]
                    },
                    "vocabulary": [],
                    "grammar": [
        
      ],
                    "activities": []
                }
            ]
        },
        // --- UNIT 8: FILMS ---
        {
            "id": 1008,
            "title": {
                "en": "Unit 8: Films",
                "vi": "Bài 8: Phim ảnh"
            },
            "lessons": [
                {
                    "id": 100801,
                    "title": {
                        "en": "Getting Started & Language: Film Genres and Adjectives",
                        "vi": "Bắt đầu & Ngôn ngữ: Thể loại phim và tính từ mô tả"
                    },
                    "aims": {
                        "en": ["Introduce and practice vocabulary for film genres and descriptive adjectives", "Practice using defining relative clauses"],
                        "vi": ["Giới thiệu và thực hành từ vựng về thể loại phim và tính từ mô tả", "Thực hành sử dụng Mệnh đề quan hệ xác định"]
                    },
                    "vocabulary": [
                        { "term": "action film", "pronunciation": "", "vietnamese": "phim hành động" },
                        { "term": "comedy", "pronunciation": "", "vietnamese": "phim hài" },
                        { "term": "horror film", "pronunciation": "", "vietnamese": "phim kinh dị" },
                        { "term": "documentary", "pronunciation": "", "vietnamese": "phim tài liệu" },
                        { "term": "thriller", "pronunciation": "", "vietnamese": "phim giật gân" },
                        { "term": "director", "pronunciation": "", "vietnamese": "đạo diễn" },
                        { "term": "script", "pronunciation": "", "vietnamese": "kịch bản" },
                        { "term": "star", "pronunciation": "", "vietnamese": "ngôi sao (diễn viên chính)" },
                        { "term": "review", "pronunciation": "", "vietnamese": "bài đánh giá" },
                        { "term": "fascinating", "pronunciation": "", "vietnamese": "hấp dẫn" },
                        { "term": "boring", "pronunciation": "", "vietnamese": "nhàm chán" }
                    ],
                    "grammar": [
        { "title": { "en": "Defining relative clauses", "vi": "" }, "explanation": { "en": [""], "vi": [""] } }
      ],
                    "activities": []
                },
                {
                    "id": 100802,
                    "title": {
                        "en": "Communication: Suggesting Films",
                        "vi": "Giao tiếp: Đề xuất xem phim và phản hồi"
                    },
                    "aims": {
                        "en": ["Practice structures for making and responding to suggestions for watching films"],
                        "vi": ["Thực hành các cấu trúc đưa ra và phản hồi đề xuất xem phim"]
                    },
                    "vocabulary": [
                        { "term": "highly recommended", "pronunciation": "", "vietnamese": "rất đáng xem" },
                        { "term": "must-see", "pronunciation": "", "vietnamese": "buộc phải xem" },
                        { "term": "box office hit", "pronunciation": "", "vietnamese": "phim bom tấn" }
                    ],
                    "grammar": [
        { "title": { "en": "Making and responding to suggestions (e.g.", "vi": "" }, "explanation": { "en": [""], "vi": [""] } },
        { "title": { "en": "Why dont we...?", "vi": "" }, "explanation": { "en": [""], "vi": [""] } },
        { "title": { "en": "How about...?)", "vi": "" }, "explanation": { "en": [""], "vi": [""] } }
      ],
                    "activities": []
                },
                {
                    "id": 100803,
                    "title": {
                        "en": "Skills 1: Reading & Speaking (Films and Actors)",
                        "vi": "Kỹ năng 1: Đọc & Nói (Các bộ phim và diễn viên)"
                    },
                    "aims": {
                        "en": ["Read an article about a popular film or actor", "Talk about a memorable film and its main characters"],
                        "vi": ["Đọc bài báo về một bộ phim hoặc diễn viên nổi tiếng", "Nói về một bộ phim đáng nhớ và các nhân vật chính"]
                    },
                    "vocabulary": [
                        { "term": "plot", "pronunciation": "", "vietnamese": "cốt truyện" },
                        { "term": "cast", "pronunciation": "", "vietnamese": "dàn diễn viên" },
                        { "term": "special effects", "pronunciation": "", "vietnamese": "hiệu ứng đặc biệt" },
                        { "term": "performance", "pronunciation": "", "vietnamese": "diễn xuất" },
                        { "term": "soundtrack", "pronunciation": "", "vietnamese": "nhạc phim" }
                    ],
                    "grammar": [
        
      ],
                    "activities": []
                },
                {
                    "id": 100804,
                    "title": {
                        "en": "Skills 2: Listening & Writing (Film Review)",
                        "vi": "Kỹ năng 2: Nghe & Viết (Bài đánh giá phim)"
                    },
                    "aims": {
                        "en": ["Listen to a film review or an interview with a director", "Write a short film review, giving opinions and recommendations"],
                        "vi": ["Nghe một bài đánh giá phim hoặc phỏng vấn đạo diễn", "Viết một bài đánh giá phim ngắn, đưa ra ý kiến và đề xuất"]
                    },
                    "vocabulary": [
                        { "term": "must-see", "pronunciation": "", "vietnamese": "buộc phải xem" },
                        { "term": "disappointing", "pronunciation": "", "vietnamese": "gây thất vọng" },
                        { "term": "recommend", "pronunciation": "", "vietnamese": "giới thiệu, đề xuất" },
                        { "term": "critics", "pronunciation": "", "vietnamese": "các nhà phê bình" }
                    ],
                    "grammar": [
        
      ],
                    "activities": []
                },
                {
                    "id": 100805,
                    "title": {
                        "en": "Looking Back & Project: Organizing a Film Night",
                        "vi": "Ôn tập & Dự án: Tổ chức đêm phim"
                    },
                    "aims": {
                        "en": ["Review Unit 8 content", "Plan and organize a school film night, including choosing a film and preparing publicity"],
                        "vi": ["Ôn tập nội dung Bài 8", "Lên kế hoạch và tổ chức đêm chiếu phim ở trường"]
                    },
                    "vocabulary": [],
                    "grammar": [
        
      ],
                    "activities": []
                }
            ]
        },
        // --- UNIT 9: PROTECTING THE ENVIRONMENT ---
        {
            "id": 1009,
            "title": {
                "en": "Unit 9: Protecting the Environment",
                "vi": "Bài 9: Bảo vệ Môi trường"
            },
            "lessons": [
                {
                    "id": 100901,
                    "title": {
                        "en": "Getting Started & Language: Vocabulary on Environmental Protection",
                        "vi": "Bắt đầu & Ngôn ngữ: Từ vựng về Bảo vệ Môi trường"
                    },
                    "aims": {
                        "en": ["Introduce and practice vocabulary related to environmental issues and conservation", "Practice using Reported Speech (statements)"],
                        "vi": ["Giới thiệu và thực hành từ vựng về các vấn đề và bảo tồn môi trường", "Thực hành sử dụng Câu tường thuật (câu trần thuật)"]
                    },
                    "vocabulary": [
                        { "term": "ecology", "pronunciation": "", "vietnamese": "sinh thái học" },
                        { "term": "habitat", "pronunciation": "", "vietnamese": "môi trường sống" },
                        { "term": "wildlife", "pronunciation": "", "vietnamese": "động vật hoang dã" },
                        { "term": "preserve", "pronunciation": "", "vietnamese": "bảo tồn, giữ gìn" },
                        { "term": "conserve", "pronunciation": "", "vietnamese": "bảo tồn" },
                        { "term": "ecosystem", "pronunciation": "", "vietnamese": "hệ sinh thái" },
                        { "term": "natural resources", "pronunciation": "", "vietnamese": "tài nguyên thiên nhiên" },
                        { "term": "pollution", "pronunciation": "", "vietnamese": "ô nhiễm" },
                        { "term": "disposal", "pronunciation": "", "vietnamese": "sự thải bỏ" }
                    ],
                    "grammar": [
        { "title": { "en": "Reported speech (Câu tường thuật)", "vi": "" }, "explanation": { "en": [""], "vi": [""] } }
      ],
                    "activities": []
                },
                {
                    "id": 100902,
                    "title": {
                        "en": "Communication: Discussing Eco-friendly Actions",
                        "vi": "Giao tiếp: Thảo luận về hành động thân thiện với môi trường"
                    },
                    "aims": {
                        "en": ["Practice discussing and agreeing/disagreeing on actions to protect the environment"],
                        "vi": ["Thực hành thảo luận và đồng tình/phản đối về các hành động bảo vệ môi trường"]
                    },
                    "vocabulary": [
                        { "term": "go green", "pronunciation": "", "vietnamese": "sống xanh" },
                        { "term": "sustainable", "pronunciation": "", "vietnamese": "bền vững" },
                        { "term": "carbon neutral", "pronunciation": "", "vietnamese": "trung hòa carbon" }
                    ],
                    "grammar": [
        { "title": { "en": "Discussing eco-friendly actions", "vi": "" }, "explanation": { "en": [""], "vi": [""] } }
      ],
                    "activities": []
                },
                {
                    "id": 100903,
                    "title": {
                        "en": "Skills 1: Reading & Speaking (Environmental Issues)",
                        "vi": "Kỹ năng 1: Đọc & Nói (Các vấn đề môi trường)"
                    },
                    "aims": {
                        "en": ["Read a text about a major environmental issue (e.g., plastic waste, air pollution)", "Discuss a plan to solve an environmental problem in the community"],
                        "vi": ["Đọc bài về một vấn đề môi trường lớn (ví dụ: rác thải nhựa, ô nhiễm không khí)", "Thảo luận kế hoạch giải quyết một vấn đề môi trường trong cộng đồng"]
                    },
                    "vocabulary": [
                        { "term": "plastic waste", "pronunciation": "", "vietnamese": "rác thải nhựa" },
                        { "term": "air pollution", "pronunciation": "", "vietnamese": "ô nhiễm không khí" },
                        { "term": "solution", "pronunciation": "", "vietnamese": "giải pháp" },
                        { "term": "initiative", "pronunciation": "", "vietnamese": "sáng kiến" },
                        { "term": "contamination", "pronunciation": "", "vietnamese": "sự ô nhiễm" }
                    ],
                    "grammar": [
        
      ],
                    "activities": []
                },
                {
                    "id": 100904,
                    "title": {
                        "en": "Skills 2: Listening & Writing (Action Email)",
                        "vi": "Kỹ năng 2: Nghe & Viết (Viết email kêu gọi hành động)"
                    },
                    "aims": {
                        "en": ["Listen to a talk about an environmental campaign", "Write an email to a friend or organization, calling for action on an environmental problem"],
                        "vi": ["Nghe một buổi nói chuyện về một chiến dịch môi trường", "Viết email kêu gọi hành động về một vấn đề môi trường"]
                    },
                    "vocabulary": [
                        { "term": "campaign", "pronunciation": "", "vietnamese": "chiến dịch" },
                        { "term": "call for action", "pronunciation": "", "vietnamese": "kêu gọi hành động" },
                        { "term": "suggest", "pronunciation": "", "vietnamese": "đề xuất" },
                        { "term": "urgent", "pronunciation": "", "vietnamese": "khẩn cấp" }
                    ],
                    "grammar": [
        
      ],
                    "activities": []
                },
                {
                    "id": 100905,
                    "title": {
                        "en": "Looking Back & Project: 'Go Green' Campaign",
                        "vi": "Ôn tập & Dự án: Chiến dịch 'Go Green'"
                    },
                    "aims": {
                        "en": ["Review Unit 9 content", "Plan and present a 'Go Green' campaign for the school"],
                        "vi": ["Ôn tập nội dung Bài 9", "Lên kế hoạch và trình bày chiến dịch 'Go Green' cho trường"]
                    },
                    "vocabulary": [],
                    "grammar": [
        
      ],
                    "activities": []
                }
            ]
        },
        // --- UNIT 10: ECOTOURISM ---
        {
            "id": 1010,
            "title": {
                "en": "Unit 10: Ecotourism",
                "vi": "Bài 10: Du lịch sinh thái"
            },
            "lessons": [
                {
                    "id": 101001,
                    "title": {
                        "en": "Getting Started & Language: Vocabulary on Ecotourism",
                        "vi": "Bắt đầu & Ngôn ngữ: Từ vựng về Du lịch sinh thái"
                    },
                    "aims": {
                        "en": ["Introduce and practice vocabulary related to ecotourism and sustainable travel", "Practice using Conditional Sentences Type 1 and 2"],
                        "vi": ["Giới thiệu và thực hành từ vựng về du lịch sinh thái và du lịch bền vững", "Thực hành sử dụng Câu điều kiện loại 1 và loại 2"]
                    },
                    "vocabulary": [
                        { "term": "ecotourism", "pronunciation": "", "vietnamese": "du lịch sinh thái" },
                        { "term": "sustainable", "pronunciation": "", "vietnamese": "bền vững" },
                        { "term": "preserve", "pronunciation": "", "vietnamese": "bảo tồn" },
                        { "term": "local community", "pronunciation": "", "vietnamese": "cộng đồng địa phương" },
                        { "term": "impact", "pronunciation": "", "vietnamese": "tác động" },
                        { "term": "attraction", "pronunciation": "", "vietnamese": "điểm thu hút" },
                        { "term": "wildlife", "pronunciation": "", "vietnamese": "động vật hoang dã" },
                        { "term": "responsible", "pronunciation": "", "vietnamese": "có trách nhiệm" },
                        { "term": "itinerary", "pronunciation": "", "vietnamese": "lịch trình chuyến đi" }
                    ],
                    "grammar": [
        { "title": { "en": "Conditional sentences type 1 and 2 (Câu điều kiện loại 1 & 2)", "vi": "" }, "explanation": { "en": [""], "vi": [""] } }
      ],
                    "activities": []
                },
                {
                    "id": 101002,
                    "title": {
                        "en": "Communication: Asking for and Giving Advice",
                        "vi": "Giao tiếp: Hỏi và đưa ra lời khuyên du lịch"
                    },
                    "aims": {
                        "en": ["Practice asking for and giving advice related to traveling and ecotourism"],
                        "vi": ["Thực hành hỏi và đưa ra lời khuyên liên quan đến du lịch và du lịch sinh thái"]
                    },
                    "vocabulary": [
                        { "term": "adventure", "pronunciation": "", "vietnamese": "chuyến phiêu lưu" },
                        { "term": "eco-friendly tourism", "pronunciation": "", "vietnamese": "du lịch thân thiện với môi trường" },
                        { "term": "culture", "pronunciation": "", "vietnamese": "văn hóa" }
                    ],
                    "grammar": [
        { "title": { "en": "Asking for and giving advice (What should I do?", "vi": "" }, "explanation": { "en": [""], "vi": [""] } },
        { "title": { "en": "You should...)", "vi": "" }, "explanation": { "en": [""], "vi": [""] } }
      ],
                    "activities": []
                },
                {
                    "id": 101003,
                    "title": {
                        "en": "Skills 1: Reading & Speaking (Impact of Tourism)",
                        "vi": "Kỹ năng 1: Đọc & Nói (Tác động của du lịch)"
                    },
                    "aims": {
                        "en": ["Read a CLIL article about the negative impacts of tourism and solutions", "Discuss ideas for sustainable ecotourism activities"],
                        "vi": ["Đọc bài CLIL về tác động tiêu cực của du lịch và các giải pháp", "Thảo luận các ý tưởng cho hoạt động du lịch sinh thái bền vững"]
                    },
                    "vocabulary": [
                        { "term": "negative impact", "pronunciation": "", "vietnamese": "tác động tiêu cực" },
                        { "term": "sustainable tourism", "pronunciation": "", "vietnamese": "du lịch bền vững" },
                        { "term": "conservation", "pronunciation": "", "vietnamese": "bảo tồn" },
                        { "term": "visitor", "pronunciation": "", "vietnamese": "du khách" },
                        { "term": "local economy", "pronunciation": "", "vietnamese": "kinh tế địa phương" }
                    ],
                    "grammar": [
        
      ],
                    "activities": []
                },
                {
                    "id": 101004,
                    "title": {
                        "en": "Skills 2: Listening & Writing (Travel Proposal Email)",
                        "vi": "Kỹ năng 2: Nghe & Viết (Viết email đề xuất chuyến đi)"
                    },
                    "aims": {
                        "en": ["Listen to a discussion about a planned ecotour", "Write an email proposing an ecotour trip to a local destination"],
                        "vi": ["Nghe một cuộc thảo luận về một chuyến du lịch sinh thái được lên kế hoạch", "Viết email đề xuất chuyến du lịch sinh thái đến một địa điểm địa phương"]
                    },
                    "vocabulary": [
                        { "term": "proposal", "pronunciation": "", "vietnamese": "đề xuất" },
                        { "term": "destination", "pronunciation": "", "vietnamese": "điểm đến" },
                        { "term": "itinerary", "pronunciation": "", "vietnamese": "lịch trình" },
                        { "term": "local guide", "pronunciation": "", "vietnamese": "hướng dẫn viên địa phương" }
                    ],
                    "grammar": [
        
      ],
                    "activities": []
                },
                {
                    "id": 101005,
                    "title": {
                        "en": "Looking Back & Project: Designing an Ecotour",
                        "vi": "Ôn tập & Dự án: Thiết kế tour du lịch sinh thái"
                    },
                    "aims": {
                        "en": ["Review Unit 10 content", "Design and present an ecotour to a local destination"],
                        "vi": ["Ôn tập nội dung Bài 10", "Thiết kế và trình bày một tour du lịch sinh thái đến một địa điểm địa phương"]
                    },
                    "vocabulary": [],
                    "grammar": [
        
      ],
                    "activities": []
                }
            ]
        },
        // --- REVIEW 1-4 (HỌC KỲ I) ---
        {
            "id": 1011,
            "title": {
                "en": "Review 1-4 (Mid-term 1)",
                "vi": "Ôn tập 1-4 (Giữa Học kỳ I)"
            },
            "lessons": [
                {
                    "id": 101101,
                    "title": {
                        "en": "Language Review (Units 1-4)",
                        "vi": "Ôn tập Ngôn ngữ (Bài 1-4)"
                    },
                    "aims": {
                        "en": [
                            "Review pronunciation, vocabulary, and grammar from Units 1 to 4",
                            "Practice identifying and using Present Simple/Continuous, Future Simple, Passive Voice, Gerunds/Infinitives, Present Perfect/Continuous"
                        ],
                        "vi": [
                            "Ôn tập phát âm, từ vựng và ngữ pháp từ Bài 1 đến 4",
                            "Thực hành nhận biết và sử dụng Hiện tại đơn/tiếp diễn, Tương lai đơn, Bị động, Danh động từ/Nguyên mẫu, Hiện tại hoàn thành/tiếp diễn"
                        ]
                    },
                    "vocabulary": [
                        { "term": "Household Chores", "pronunciation": "", "vietnamese": "Công việc nhà" },
                        { "term": "Climate Change terms", "pronunciation": "", "vietnamese": "Thuật ngữ Biến đổi khí hậu" },
                        { "term": "Music Genres", "pronunciation": "", "vietnamese": "Thể loại Âm nhạc" },
                        { "term": "Community Service", "pronunciation": "", "vietnamese": "Dịch vụ Cộng đồng" }
                    ],
                    "grammar": [
        { "title": { "en": "Grammar points from Units 1", "vi": "" }, "explanation": { "en": [""], "vi": [""] } },
        { "title": { "en": "2", "vi": "" }, "explanation": { "en": [""], "vi": [""] } },
        { "title": { "en": "3", "vi": "" }, "explanation": { "en": [""], "vi": [""] } },
        { "title": { "en": "4", "vi": "" }, "explanation": { "en": [""], "vi": [""] } }
      ],
                    "activities": []
                },
                {
                    "id": 101102,
                    "title": {
                        "en": "Skills Review (Units 1-4)",
                        "vi": "Ôn tập Kỹ năng (Bài 1-4)"
                    },
                    "aims": {
                        "en": [
                            "Review reading, writing, listening, and speaking skills related to family, climate change, music, and community",
                            "Practice integrated skills through typical test formats"
                        ],
                        "vi": [
                            "Ôn tập kỹ năng đọc, viết, nghe và nói liên quan đến gia đình, biến đổi khí hậu, âm nhạc và cộng đồng",
                            "Thực hành kỹ năng tổng hợp thông qua các dạng bài kiểm tra điển hình"
                        ]
                    },
                    "vocabulary": [],
                    "grammar": [
        
      ],
                    "activities": []
                }
            ]
        },
        // --- REVIEW 5-8 (HỌC KỲ I - CUỐI KỲ) ---
        {
            "id": 1012,
            "title": {
                "en": "Review 5-8 (End-of-term 1)",
                "vi": "Ôn tập 5-8 (Cuối Học kỳ I)"
            },
            "lessons": [
                {
                    "id": 101201,
                    "title": {
                        "en": "Language Review (Units 5-8)",
                        "vi": "Ôn tập Ngôn ngữ (Bài 5-8)"
                    },
                    "aims": {
                        "en": [
                            "Review pronunciation, vocabulary, and grammar from Units 5 to 8",
                            "Practice using Compound Sentences, Past Simple/Perfect, Connectors of Purpose, and Relative Clauses"
                        ],
                        "vi": [
                            "Ôn tập phát âm, từ vựng và ngữ pháp từ Bài 5 đến 8",
                            "Thực hành sử dụng Câu ghép, Quá khứ đơn/hoàn thành, Liên từ chỉ mục đích và Mệnh đề quan hệ"
                        ]
                    },
                    "vocabulary": [
                        { "term": "Technology vocabulary", "pronunciation": "", "vietnamese": "Từ vựng Công nghệ" },
                        { "term": "Ancient Civilisations vocabulary", "pronunciation": "", "vietnamese": "Từ vựng Văn minh cổ đại" },
                        { "term": "Traffic vocabulary", "pronunciation": "", "vietnamese": "Từ vựng Giao thông" },
                        { "term": "Film vocabulary", "pronunciation": "", "vietnamese": "Từ vựng Phim ảnh" }
                    ],
                    "grammar": [
        { "title": { "en": "Grammar points from Units 5", "vi": "" }, "explanation": { "en": [""], "vi": [""] } },
        { "title": { "en": "6", "vi": "" }, "explanation": { "en": [""], "vi": [""] } },
        { "title": { "en": "7", "vi": "" }, "explanation": { "en": [""], "vi": [""] } },
        { "title": { "en": "8", "vi": "" }, "explanation": { "en": [""], "vi": [""] } }
      ],
                    "activities": []
                },
                {
                    "id": 101202,
                    "title": {
                        "en": "Skills Review (Units 5-8)",
                        "vi": "Ôn tập Kỹ năng (Bài 5-8)"
                    },
                    "aims": {
                        "en": [
                            "Review reading, writing, listening, and speaking skills related to technology, ancient civilisations, traffic, and films",
                            "Prepare for the final assessment of the first semester"
                        ],
                        "vi": [
                            "Ôn tập kỹ năng đọc, viết, nghe và nói liên quan đến công nghệ, văn minh cổ đại, giao thông và phim ảnh",
                            "Chuẩn bị cho bài đánh giá cuối học kỳ I"
                        ]
                    },
                    "vocabulary": [],
                    "grammar": [
        
      ],
                    "activities": []
                }
            ]
        },
        // --- REVIEW 9-10 (CUỐI KỲ II) ---
        {
            "id": 1013,
            "title": {
                "en": "Review 9-10 (End-of-term 2)",
                "vi": "Ôn tập 9-10 (Cuối Học kỳ II)"
            },
            "lessons": [
                {
                    "id": 101301,
                    "title": {
                        "en": "Language Review (Units 9-10)",
                        "vi": "Ôn tập Ngôn ngữ (Bài 9-10)"
                    },
                    "aims": {
                        "en": [
                            "Review pronunciation, vocabulary, and grammar from Units 9 and 10",
                            "Practice using Reported Speech and Conditional Sentences Type 1 and 2"
                        ],
                        "vi": [
                            "Ôn tập phát âm, từ vựng và ngữ pháp từ Bài 9 và 10",
                            "Thực hành sử dụng Câu tường thuật và Câu điều kiện loại 1 và loại 2"
                        ]
                    },
                    "vocabulary": [
                        { "term": "Protecting the environment vocabulary", "pronunciation": "", "vietnamese": "Từ vựng Bảo vệ môi trường" },
                        { "term": "Ecotourism vocabulary", "pronunciation": "", "vietnamese": "Từ vựng Du lịch sinh thái" }
                    ],
                    "grammar": [
        { "title": { "en": "Reported speech", "vi": "" }, "explanation": { "en": [""], "vi": [""] } },
        { "title": { "en": "Conditional sentences type 1 and 2", "vi": "" }, "explanation": { "en": [""], "vi": [""] } }
      ],
                    "activities": []
                },
                {
                    "id": 101302,
                    "title": {
                        "en": "Skills Review (Units 9-10)",
                        "vi": "Ôn tập Kỹ năng (Bài 9-10)"
                    },
                    "aims": {
                        "en": [
                            "Review reading, writing, listening, and speaking skills related to environmental protection and ecotourism",
                            "Prepare for the final assessment of the school year"
                        ],
                        "vi": [
                            "Ôn tập kỹ năng đọc, viết, nghe và nói liên quan đến bảo vệ môi trường và du lịch sinh thái",
                            "Chuẩn bị cho bài đánh giá cuối năm học"
                        ]
                    },
                    "vocabulary": [],
                    "grammar": [
        
      ],
                    "activities": []
                }
            ]
        }
    ]
};

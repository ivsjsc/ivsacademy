// Demo data for premium lesson features
export const lessonPremiumDemos = {
  en: {
    quickQuiz: {
      title: '🎯 Quick Quiz Generated',
      subtitle: 'AI has analyzed this lesson and created a personalized quiz for you!',
      questions: [
        {
          question: 'Which phrase is correct when ordering at a restaurant?',
          options: [
            'I want a coffee',
            'I\'d like a coffee, please',
            'Give me coffee',
            'Coffee for me'
          ],
          correctAnswer: 1,
          explanation: '"I\'d like..." is the most polite way to order in English. It shows good manners and is commonly used in restaurants.'
        },
        {
          question: 'Complete: "_____ I have the menu, please?"',
          options: [
            'Should',
            'Must',
            'Could',
            'Would'
          ],
          correctAnswer: 2,
          explanation: '"Could I have...?" is a polite way to request something. It\'s more formal than "Can I have...?"'
        },
        {
          question: 'What does "for here or to go" mean?',
          options: [
            'Asking about payment method',
            'Asking if you\'ll eat here or take away',
            'Asking about table location',
            'Asking about drink choice'
          ],
          correctAnswer: 1,
          explanation: '"For here or to go" is a common question in restaurants/cafes asking if you want to eat inside or take the food away.'
        },
        {
          question: 'Which is NOT appropriate when ordering?',
          options: [
            'May I have the chicken, please?',
            'I\'ll have the fish',
            'Gimme that burger',
            'Could I get the salad?'
          ],
          correctAnswer: 2,
          explanation: '"Gimme" (give me) is too informal/rude for a restaurant setting. Always use polite phrases when ordering.'
        },
        {
          question: 'How do you politely ask for the bill?',
          options: [
            'Bill now!',
            'Could we have the check, please?',
            'Where\'s my bill?',
            'I need bill'
          ],
          correctAnswer: 1,
          explanation: '"Could we have the check/bill, please?" is the standard polite way to request the bill in English-speaking countries.'
        }
      ],
      premiumFeatures: [
        '✨ Adaptive difficulty based on your level',
        '📊 Detailed progress tracking',
        '🎯 Unlimited quiz generations',
        '💡 AI explanations for each answer',
        '🔄 Quiz variations for practice'
      ]
    },
    conversationPractice: {
      title: '💬 Conversation Practice',
      subtitle: 'AI creates realistic dialogues based on lesson content',
      scenarios: [
        {
          name: 'Restaurant Ordering',
          icon: '🍽️',
          dialogue: [
            { speaker: 'Waiter', text: 'Good evening! Are you ready to order?' },
            { speaker: 'You', text: 'Yes, I\'d like the grilled chicken, please.' },
            { speaker: 'Waiter', text: 'Great choice! And would you like any sides with that?' },
            { speaker: 'You', text: 'Could I have the mixed vegetables?' },
            { speaker: 'Waiter', text: 'Of course! Anything to drink?' },
            { speaker: 'You', text: 'Just water, please.' },
            { speaker: 'Waiter', text: 'Perfect! I\'ll get that started for you.' }
          ],
          practicePoints: [
            'Using "I\'d like..." for polite requests',
            'Asking questions with "Could I...?"',
            'Responding to service staff appropriately'
          ]
        },
        {
          name: 'Making a Complaint',
          icon: '😐',
          dialogue: [
            { speaker: 'You', text: 'Excuse me, there seems to be an issue with my order.' },
            { speaker: 'Waiter', text: 'Oh, I\'m sorry to hear that. What\'s wrong?' },
            { speaker: 'You', text: 'I ordered the chicken, but I received fish instead.' },
            { speaker: 'Waiter', text: 'I apologize for the mistake. I\'ll fix that right away.' },
            { speaker: 'You', text: 'Thank you, I appreciate it.' },
            { speaker: 'Waiter', text: 'Of course! Your correct order will be out shortly.' }
          ],
          practicePoints: [
            'Politely expressing complaints',
            'Using "Excuse me" to get attention',
            'Accepting apologies gracefully'
          ]
        },
        {
          name: 'Asking for Recommendations',
          icon: '🤔',
          dialogue: [
            { speaker: 'You', text: 'What do you recommend for someone who likes seafood?' },
            { speaker: 'Waiter', text: 'Our grilled salmon is excellent today!' },
            { speaker: 'You', text: 'That sounds delicious. Is it spicy?' },
            { speaker: 'Waiter', text: 'It has a mild seasoning, not spicy at all.' },
            { speaker: 'You', text: 'Perfect! I\'ll have that, please.' },
            { speaker: 'Waiter', text: 'Excellent choice!' }
          ],
          practicePoints: [
            'Asking for recommendations',
            'Making follow-up questions',
            'Making final decisions'
          ]
        }
      ],
      premiumFeatures: [
        '🎙️ AI voice conversation partner',
        '🎭 Multiple scenario variations',
        '📝 Real-time pronunciation feedback',
        '⭐ Personalized difficulty levels',
        '🔄 Unlimited practice sessions'
      ]
    },
    lessonContent: {
      title: '📚 AI Lesson Assistant',
      subtitle: 'Get instant help with any part of this lesson',
      capabilities: [
        {
          icon: '❓',
          title: 'Explain Grammar Points',
          description: 'Get detailed explanations for any grammar concept in this lesson',
          example: 'AI: "The present perfect is used here because..."'
        },
        {
          icon: '💭',
          title: 'Create More Examples',
          description: 'Generate additional sentences using lesson vocabulary',
          example: 'AI generates 10 new example sentences with your target words'
        },
        {
          icon: '🎯',
          title: 'Simplify Complex Ideas',
          description: 'Break down difficult concepts into easier explanations',
          example: 'AI: "Think of it like this: when you say..."'
        },
        {
          icon: '🔍',
          title: 'Answer Your Questions',
          description: 'Ask anything about the lesson content and get instant answers',
          example: 'You: "Why do we use \'the\' here?" AI: "Because..."'
        },
        {
          icon: '📖',
          title: 'Real-world Usage',
          description: 'See how lesson content is used in real situations',
          example: 'AI shows you examples from movies, news, daily conversations'
        },
        {
          icon: '✍️',
          title: 'Practice Exercises',
          description: 'Get custom exercises tailored to this lesson',
          example: 'AI creates fill-in-blanks, rewrite sentences, etc.'
        }
      ],
      premiumFeatures: [
        '💬 Unlimited questions about the lesson',
        '🎨 Creative practice activities',
        '📊 Learning progress analysis',
        '🎯 Personalized study recommendations',
        '⚡ Instant AI responses'
      ]
    }
  },
  vi: {
    quickQuiz: {
      title: '🎯 Quiz Nhanh Được Tạo',
      subtitle: 'AI đã phân tích bài học và tạo quiz cá nhân hóa cho bạn!',
      questions: [
        {
          question: 'Cụm từ nào đúng khi gọi món ở nhà hàng?',
          options: [
            'I want a coffee',
            'I\'d like a coffee, please',
            'Give me coffee',
            'Coffee for me'
          ],
          correctAnswer: 1,
          explanation: '"I\'d like..." là cách lịch sự nhất để gọi món trong tiếng Anh. Nó thể hiện phép lịch sự và thường được dùng ở nhà hàng.'
        },
        {
          question: 'Hoàn thành: "_____ I have the menu, please?"',
          options: [
            'Should',
            'Must',
            'Could',
            'Would'
          ],
          correctAnswer: 2,
          explanation: '"Could I have...?" là cách lịch sự để yêu cầu điều gì đó. Nó trang trọng hơn "Can I have...?"'
        },
        {
          question: '"For here or to go" có nghĩa là gì?',
          options: [
            'Hỏi về phương thức thanh toán',
            'Hỏi bạn sẽ ăn tại chỗ hay mang đi',
            'Hỏi về vị trí bàn',
            'Hỏi về lựa chọn đồ uống'
          ],
          correctAnswer: 1,
          explanation: '"For here or to go" là câu hỏi phổ biến ở nhà hàng/quán cà phê hỏi bạn muốn ăn bên trong hay mang thức ăn đi.'
        },
        {
          question: 'Cách nào KHÔNG phù hợp khi gọi món?',
          options: [
            'May I have the chicken, please?',
            'I\'ll have the fish',
            'Gimme that burger',
            'Could I get the salad?'
          ],
          correctAnswer: 2,
          explanation: '"Gimme" (give me) quá thô lỗ/thiếu lịch sự trong bối cảnh nhà hàng. Luôn dùng cụm từ lịch sự khi gọi món.'
        },
        {
          question: 'Cách lịch sự để xin hóa đơn?',
          options: [
            'Bill now!',
            'Could we have the check, please?',
            'Where\'s my bill?',
            'I need bill'
          ],
          correctAnswer: 1,
          explanation: '"Could we have the check/bill, please?" là cách chuẩn và lịch sự để xin hóa đơn ở các nước nói tiếng Anh.'
        }
      ],
      premiumFeatures: [
        '✨ Độ khó thích ứng theo trình độ',
        '📊 Theo dõi tiến độ chi tiết',
        '🎯 Tạo quiz không giới hạn',
        '💡 Giải thích AI cho mỗi câu trả lời',
        '🔄 Biến thể quiz để luyện tập'
      ]
    },
    conversationPractice: {
      title: '💬 Luyện Tập Hội Thoại',
      subtitle: 'AI tạo hội thoại thực tế dựa trên nội dung bài học',
      scenarios: [
        {
          name: 'Gọi Món Ở Nhà Hàng',
          icon: '🍽️',
          dialogue: [
            { speaker: 'Phục vụ', text: 'Good evening! Are you ready to order?' },
            { speaker: 'Bạn', text: 'Yes, I\'d like the grilled chicken, please.' },
            { speaker: 'Phục vụ', text: 'Great choice! And would you like any sides with that?' },
            { speaker: 'Bạn', text: 'Could I have the mixed vegetables?' },
            { speaker: 'Phục vụ', text: 'Of course! Anything to drink?' },
            { speaker: 'Bạn', text: 'Just water, please.' },
            { speaker: 'Phục vụ', text: 'Perfect! I\'ll get that started for you.' }
          ],
          practicePoints: [
            'Dùng "I\'d like..." cho yêu cầu lịch sự',
            'Đặt câu hỏi với "Could I...?"',
            'Phản hồi phù hợp với nhân viên phục vụ'
          ]
        },
        {
          name: 'Phản Ánh Vấn Đề',
          icon: '😐',
          dialogue: [
            { speaker: 'Bạn', text: 'Excuse me, there seems to be an issue with my order.' },
            { speaker: 'Phục vụ', text: 'Oh, I\'m sorry to hear that. What\'s wrong?' },
            { speaker: 'Bạn', text: 'I ordered the chicken, but I received fish instead.' },
            { speaker: 'Phục vụ', text: 'I apologize for the mistake. I\'ll fix that right away.' },
            { speaker: 'Bạn', text: 'Thank you, I appreciate it.' },
            { speaker: 'Phục vụ', text: 'Of course! Your correct order will be out shortly.' }
          ],
          practicePoints: [
            'Phản ánh lịch sự',
            'Dùng "Excuse me" để thu hút sự chú ý',
            'Chấp nhận lời xin lỗi một cách khéo léo'
          ]
        },
        {
          name: 'Hỏi Gợi Ý',
          icon: '🤔',
          dialogue: [
            { speaker: 'Bạn', text: 'What do you recommend for someone who likes seafood?' },
            { speaker: 'Phục vụ', text: 'Our grilled salmon is excellent today!' },
            { speaker: 'Bạn', text: 'That sounds delicious. Is it spicy?' },
            { speaker: 'Phục vụ', text: 'It has a mild seasoning, not spicy at all.' },
            { speaker: 'Bạn', text: 'Perfect! I\'ll have that, please.' },
            { speaker: 'Phục vụ', text: 'Excellent choice!' }
          ],
          practicePoints: [
            'Hỏi gợi ý',
            'Đặt câu hỏi tiếp theo',
            'Đưa ra quyết định cuối cùng'
          ]
        }
      ],
      premiumFeatures: [
        '🎙️ Đối tác hội thoại giọng nói AI',
        '🎭 Nhiều biến thể kịch bản',
        '📝 Phản hồi phát âm theo thời gian thực',
        '⭐ Mức độ khó cá nhân hóa',
        '🔄 Phiên luyện tập không giới hạn'
      ]
    },
    lessonContent: {
      title: '📚 Trợ Lý AI Bài Học',
      subtitle: 'Nhận trợ giúp tức thì với bất kỳ phần nào của bài học',
      capabilities: [
        {
          icon: '❓',
          title: 'Giải Thích Ngữ Pháp',
          description: 'Nhận giải thích chi tiết cho bất kỳ khái niệm ngữ pháp nào',
          example: 'AI: "Hiện tại hoàn thành được dùng ở đây vì..."'
        },
        {
          icon: '💭',
          title: 'Tạo Thêm Ví Dụ',
          description: 'Tạo thêm câu sử dụng từ vựng bài học',
          example: 'AI tạo 10 câu ví dụ mới với từ mục tiêu của bạn'
        },
        {
          icon: '🎯',
          title: 'Đơn Giản Hóa Ý Tưởng',
          description: 'Chia nhỏ khái niệm khó thành giải thích dễ hơn',
          example: 'AI: "Hãy nghĩ như thế này: khi bạn nói..."'
        },
        {
          icon: '🔍',
          title: 'Trả Lời Câu Hỏi',
          description: 'Hỏi bất cứ điều gì về nội dung bài học',
          example: 'Bạn: "Tại sao dùng \'the\' ở đây?" AI: "Vì..."'
        },
        {
          icon: '📖',
          title: 'Sử Dụng Thực Tế',
          description: 'Xem cách nội dung được dùng trong tình huống thực',
          example: 'AI cho bạn ví dụ từ phim, tin tức, hội thoại hàng ngày'
        },
        {
          icon: '✍️',
          title: 'Bài Tập Luyện',
          description: 'Nhận bài tập tùy chỉnh cho bài học này',
          example: 'AI tạo điền từ, viết lại câu, v.v.'
        }
      ],
      premiumFeatures: [
        '💬 Hỏi không giới hạn về bài học',
        '🎨 Hoạt động luyện tập sáng tạo',
        '📊 Phân tích tiến độ học tập',
        '🎯 Gợi ý học tập cá nhân hóa',
        '⚡ Phản hồi AI tức thì'
      ]
    }
  },
  // Grade-specific quiz demos
  gradeSpecificQuizzes: {
    elementary: {
      en: {
        title: '🎯 Elementary Quiz',
        subtitle: 'Simple questions for young learners!',
        questions: [
          {
            question: 'What color is the sun?',
            options: ['Blue', 'Yellow', 'Green', 'Red'],
            correctAnswer: 1,
            explanation: 'The sun looks yellow in the sky during the day!'
          },
          {
            question: 'How many days are in a week?',
            options: ['5', '6', '7', '8'],
            correctAnswer: 2,
            explanation: 'A week has 7 days: Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, and Sunday.'
          },
          {
            question: 'Complete: "I ___ a student."',
            options: ['is', 'am', 'are', 'be'],
            correctAnswer: 1,
            explanation: 'We use "am" with "I". I am a student. ✓'
          }
        ]
      },
      vi: {
        title: '🎯 Quiz Tiểu Học',
        subtitle: 'Câu hỏi đơn giản cho các em nhỏ!',
        questions: [
          {
            question: 'Mặt trời có màu gì?',
            options: ['Xanh dương', 'Vàng', 'Xanh lá', 'Đỏ'],
            correctAnswer: 1,
            explanation: 'Mặt trời có màu vàng trên bầu trời vào ban ngày!'
          },
          {
            question: 'Một tuần có bao nhiêu ngày?',
            options: ['5', '6', '7', '8'],
            correctAnswer: 2,
            explanation: 'Một tuần có 7 ngày: Thứ Hai, Ba, Tư, Năm, Sáu, Bảy và Chủ Nhật.'
          },
          {
            question: 'Hoàn thành: "I ___ a student."',
            options: ['is', 'am', 'are', 'be'],
            correctAnswer: 1,
            explanation: 'Chúng ta dùng "am" với "I". I am a student. ✓'
          }
        ]
      }
    },
    middleSchool: {
      en: {
        title: '🎯 Middle School Quiz',
        subtitle: 'Intermediate level questions',
        questions: [
          {
            question: 'Which sentence uses the present perfect correctly?',
            options: [
              'I have saw that movie',
              'I have seen that movie',
              'I has seen that movie',
              'I am seen that movie'
            ],
            correctAnswer: 1,
            explanation: 'Present perfect: have/has + past participle. "Seen" is the past participle of "see".'
          },
          {
            question: 'Choose the correct comparative form:',
            options: [
              'This test is more easy than the last one',
              'This test is easier than the last one',
              'This test is more easier than the last one',
              'This test is easyer than the last one'
            ],
            correctAnswer: 1,
            explanation: 'Short adjectives (1-2 syllables) add -er for comparative. Easy → easier.'
          },
          {
            question: 'What does "break a leg" mean?',
            options: [
              'To hurt yourself',
              'Good luck',
              'To be clumsy',
              'To run fast'
            ],
            correctAnswer: 1,
            explanation: '"Break a leg" is an idiom meaning "good luck", especially used before performances!'
          }
        ]
      },
      vi: {
        title: '🎯 Quiz THCS',
        subtitle: 'Câu hỏi trình độ trung bình',
        questions: [
          {
            question: 'Câu nào dùng thì hiện tại hoàn thành đúng?',
            options: [
              'I have saw that movie',
              'I have seen that movie',
              'I has seen that movie',
              'I am seen that movie'
            ],
            correctAnswer: 1,
            explanation: 'Hiện tại hoàn thành: have/has + quá khứ phân từ. "Seen" là quá khứ phân từ của "see".'
          },
          {
            question: 'Chọn dạng so sánh hơn đúng:',
            options: [
              'This test is more easy than the last one',
              'This test is easier than the last one',
              'This test is more easier than the last one',
              'This test is easyer than the last one'
            ],
            correctAnswer: 1,
            explanation: 'Tính từ ngắn (1-2 âm tiết) thêm -er cho so sánh hơn. Easy → easier.'
          },
          {
            question: '"Break a leg" có nghĩa là gì?',
            options: [
              'Bị thương',
              'Chúc may mắn',
              'Vụng về',
              'Chạy nhanh'
            ],
            correctAnswer: 1,
            explanation: '"Break a leg" là thành ngữ có nghĩa "chúc may mắn", đặc biệt dùng trước buổi biểu diễn!'
          }
        ]
      }
    },
    highSchool: {
      en: {
        title: '🎯 High School Quiz',
        subtitle: 'Advanced level challenges',
        questions: [
          {
            question: 'Identify the literary device: "The wind whispered through the trees."',
            options: [
              'Metaphor',
              'Personification',
              'Simile',
              'Hyperbole'
            ],
            correctAnswer: 1,
            explanation: 'Personification gives human qualities (whispering) to non-human things (wind).'
          },
          {
            question: 'Which sentence demonstrates correct use of subjunctive mood?',
            options: [
              'If I was you, I would study more',
              'If I were you, I would study more',
              'If I am you, I would study more',
              'If I be you, I would study more'
            ],
            correctAnswer: 1,
            explanation: 'Subjunctive mood uses "were" for all subjects in hypothetical situations.'
          },
          {
            question: 'What is the meaning of "eschew obfuscation"?',
            options: [
              'Embrace complexity',
              'Avoid being unclear',
              'Seek confusion',
              'Accept mystery'
            ],
            correctAnswer: 1,
            explanation: '"Eschew" means avoid, "obfuscation" means making something unclear. The phrase ironically means "don\'t be confusing" using complex words!'
          }
        ]
      },
      vi: {
        title: '🎯 Quiz THPT',
        subtitle: 'Thử thách trình độ nâng cao',
        questions: [
          {
            question: 'Xác định biện pháp tu từ: "The wind whispered through the trees."',
            options: [
              'Ẩn dụ',
              'Nhân hóa',
              'So sánh',
              'Cường điệu'
            ],
            correctAnswer: 1,
            explanation: 'Nhân hóa gán phẩm chất con người (thì thầm) cho vật vô tri (gió).'
          },
          {
            question: 'Câu nào dùng đúng thức giả định?',
            options: [
              'If I was you, I would study more',
              'If I were you, I would study more',
              'If I am you, I would study more',
              'If I be you, I would study more'
            ],
            correctAnswer: 1,
            explanation: 'Thức giả định dùng "were" cho tất cả chủ ngữ trong tình huống giả định.'
          },
          {
            question: '"Eschew obfuscation" có nghĩa là gì?',
            options: [
              'Ôm lấy sự phức tạp',
              'Tránh không rõ ràng',
              'Tìm kiếm sự rối bời',
              'Chấp nhận bí ẩn'
            ],
            correctAnswer: 1,
            explanation: '"Eschew" nghĩa là tránh, "obfuscation" nghĩa là làm điều gì đó không rõ. Cụm từ này mỉa mai có nghĩa "đừng gây khó hiểu" nhưng lại dùng từ phức tạp!'
          }
        ]
      }
    }
  }
};

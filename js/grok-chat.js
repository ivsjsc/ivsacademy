// Grok AI Chat Integration
class GrokChat {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        this.options = {
            initialMessage: 'Xin chào! Tôi là IVS AI Assistant. Tôi có thể giúp gì cho bạn?',
            placeholder: 'Hỏi về sản phẩm và dịch vụ...',
            ...options
        };
        this.init();
    }

    init() {
        this.createChatUI();
        this.attachEventListeners();
        this.addMessage(this.options.initialMessage, false);
    }

    createChatUI() {
        this.container.innerHTML = `
            <div class="max-w-2xl mx-auto">
                <div id="chat-messages" class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 mb-4 h-96 overflow-y-auto space-y-4">
                </div>
                <div class="flex gap-2">
                    <input type="text" id="user-input" 
                        class="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="${this.options.placeholder}"
                    >
                    <button id="send-message" 
                        class="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                    >
                        <i class="fas fa-paper-plane mr-2"></i>Gửi
                    </button>
                </div>
            </div>
        `;

        this.chatMessages = this.container.querySelector('#chat-messages');
        this.userInput = this.container.querySelector('#user-input');
        this.sendButton = this.container.querySelector('#send-message');
    }

    attachEventListeners() {
        this.sendButton.addEventListener('click', () => this.handleSend());
        this.userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleSend();
            }
        });
    }

    addMessage(content, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `flex ${isUser ? 'justify-end' : 'justify-start'}`;
        
        const messageBubble = document.createElement('div');
        messageBubble.className = `max-w-[80%] rounded-lg p-3 ${
            isUser 
                ? 'bg-indigo-600 text-white' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white'
        }`;
        messageBubble.textContent = content;
        
        messageDiv.appendChild(messageBubble);
        this.chatMessages.appendChild(messageDiv);
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    async sendToGrok(message) {
        try {
            const response = await fetch('/api/grok', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    messages: [{
                        role: 'user',
                        content: message
                    }]
                })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            return data.choices[0]?.message?.content || 'Xin lỗi, tôi không thể xử lý yêu cầu của bạn lúc này.';
        } catch (error) {
            console.error('Error:', error);
            return 'Đã có lỗi xảy ra. Vui lòng thử lại sau.';
        }
    }

    async handleSend() {
        const message = this.userInput.value.trim();
        if (!message) return;

        // Clear input
        this.userInput.value = '';

        // Add user message
        this.addMessage(message, true);

        // Show typing indicator
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'flex justify-start';
        loadingDiv.innerHTML = '<div class="bg-gray-200 dark:bg-gray-700 rounded-lg p-3"><i class="fas fa-ellipsis-h"></i></div>';
        this.chatMessages.appendChild(loadingDiv);

        // Get AI response
        const response = await this.sendToGrok(message);
        
        // Remove typing indicator
        this.chatMessages.removeChild(loadingDiv);
        
        // Add AI response
        this.addMessage(response);
    }
}

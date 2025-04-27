// Google AI API 金鑰
const API_KEY = 'AIzaSyCK4BvP93-uppDkJJUMeHCud30PGYfn9Ic';
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

let chatBox = document.getElementById('chatBox');
let userInput = document.getElementById('userInput');

// 監聽 Enter 鍵
userInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    // 顯示用戶訊息
    appendMessage('user', message);
    userInput.value = '';

    try {
        // 發送請求到 Google AI API
        const response = await fetch(`${API_URL}?key=${API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: message
                    }]
                }]
            })
        });

        const data = await response.json();
        
        // 檢查是否有回應
        if (data.candidates && data.candidates[0].content.parts[0].text) {
            const aiResponse = data.candidates[0].content.parts[0].text;
            appendMessage('ai', aiResponse);
        } else {
            appendMessage('ai', '抱歉，我現在無法回應。請稍後再試。');
        }
    } catch (error) {
        console.error('Error:', error);
        appendMessage('ai', '發生錯誤，請稍後再試。');
    }
}

function appendMessage(sender, content) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.textContent = content;
    
    messageDiv.appendChild(contentDiv);
    chatBox.appendChild(messageDiv);
    
    // 自動滾動到最新訊息
    chatBox.scrollTop = chatBox.scrollHeight;
}

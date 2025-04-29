document.addEventListener('DOMContentLoaded', function () {
    const chatMessages = document.getElementById('chatMessages');
    const questionButtons = document.getElementById('questionButtons');

    const botName = "Pantera";
    const botAvatar = "P";
    const userAvatar = "F";

    // Detecta o idioma da página
    const lang = document.documentElement.lang || 'pt';

    const messages = {
        pt: {
            welcome: "Olá! Eu sou o Pantera, assistente oficial da FURIA. Escolha uma pergunta abaixo para começarmos!",
            questions: [
                { text: "Qual o próximo jogo?", response: "Nosso próximo jogo está marcado para 29 de abril, contra a MIBR no campeonato ESL Pro League. Uma partida que promete muita emoção!" },
                { text: "Quem são os jogadores?", response: "Nosso lineup atual de CS conta com: arT, KSCERATO, yuurih, drop e saffee. Uma equipe de estrelas comandada pelo IGL arT!" },
                { text: "Qual a história da FURIA?", response: "A FURIA foi fundada em 2017 e rapidamente se tornou uma das principais organizações de esports da América Latina." },
                { text: "Quais são as conquistas da FURIA?", response: "Entre nossas principais conquistas estão: o ESEA S31 Premier (2019), ESL Pro League S12 NA (2020) e BLAST Premier Fall (2023)." },
                { text: "Qual é o estilo de jogo da FURIA?", response: "Somos conhecidos pelo estilo agressivo e imprevisível, baseado em timing e decisões rápidas!" },
                { text: "Redes sociais da FURIA", response: "Você pode seguir a FURIA em todas as redes sociais como @FURIA!" }
            ]
        },
        en: {
            welcome: "Hi! I'm Pantera, the official FURIA assistant. Choose a question below to get started!",
            questions: [
                { text: "When is the next match?", response: "Our next match is on April 29th against MIBR in the ESL Pro League. It’s going to be an exciting one!" },
                { text: "Who are the players?", response: "Our current CS lineup includes: arT, KSCERATO, yuurih, drop and saffee. A star-studded team led by IGL arT!" },
                { text: "What is FURIA’s history?", response: "FURIA was founded in 2017 and quickly became one of the top esports organizations in Latin America." },
                { text: "What are FURIA’s achievements?", response: "Our top achievements include: ESEA S31 Premier (2019), ESL Pro League S12 NA (2020), and BLAST Premier Fall (2023)." },
                { text: "What is FURIA’s playstyle?", response: "We're known for our aggressive and unpredictable style, based on timing and quick decisions!" },
                { text: "FURIA's social media", response: "You can follow FURIA on all social media as @FURIA!" }
            ]
        },
        es: {
            welcome: "¡Hola! Soy Pantera, el asistente oficial de FURIA. ¡Elige una pregunta para comenzar!",
            questions: [
                { text: "¿Cuál es el próximo partido?", response: "Nuestro próximo partido es el 29 de abril contra MIBR en la ESL Pro League. ¡Una partida que promete emociones!" },
                { text: "¿Quiénes son los jugadores?", response: "Nuestra alineación actual de CS incluye: arT, KSCERATO, yuurih, drop y saffee. ¡Un equipo estelar liderado por el IGL arT!" },
                { text: "¿Cuál es la historia de FURIA?", response: "FURIA fue fundada en 2017 y rápidamente se convirtió en una de las principales organizaciones de esports en América Latina." },
                { text: "¿Cuáles son los logros de FURIA?", response: "Nuestros principales logros incluyen: ESEA S31 Premier (2019), ESL Pro League S12 NA (2020) y BLAST Premier Fall (2023)." },
                { text: "¿Cuál es el estilo de juego de FURIA?", response: "¡Somos conocidos por nuestro estilo agresivo e impredecible, basado en el timing y decisiones rápidas!" },
                { text: "Redes sociales de FURIA", response: "¡Puedes seguir a FURIA en todas las redes sociales como @FURIA!" }
            ]
        }
    };

    const content = messages[lang] || messages['pt'];
    addBotMessage(content.welcome);
    renderQuestionButtons(content.questions);

    function renderQuestionButtons(questions) {
        questionButtons.innerHTML = '';
        questions.forEach((q) => {
            const button = document.createElement('button');
            button.textContent = q.text;
            button.className = 'question-button';
            button.addEventListener('click', () => handleQuestionClick(q));
            questionButtons.appendChild(button);
        });
    }

    function handleQuestionClick(question) {
        addUserMessage(question.text);
        showTypingIndicator();

        setTimeout(() => {
            removeTypingIndicator();
            addBotMessage(question.response);
        }, getRandomResponseTime(1000, 2500));
    }

    function addUserMessage(text) {
        const currentTime = getCurrentTime();
        const messageHTML = `
            <div class="message user">
                <div class="message-avatar">${userAvatar}</div>
                <div class="message-content">
                    <div class="message-text">${text}</div>
                    <div class="message-time">${currentTime}</div>
                </div>
            </div>
        `;
        chatMessages.innerHTML += messageHTML;
        scrollToBottom();
    }

    function addBotMessage(text) {
        const currentTime = getCurrentTime();
        const messageHTML = `
            <div class="message">
                <div class="message-avatar">${botAvatar}</div>
                <div class="message-content">
                    <div class="message-text">${text}</div>
                    <div class="message-time">${currentTime}</div>
                </div>
            </div>
        `;
        chatMessages.innerHTML += messageHTML;
        scrollToBottom();
    }

    function showTypingIndicator() {
        const typingHTML = `
            <div class="typing-indicator" id="typingIndicator">
                <div class="message-avatar">${botAvatar}</div>
                <div class="typing-dots">
                    <span></span><span></span><span></span>
                </div>
            </div>
        `;
        chatMessages.innerHTML += typingHTML;
        scrollToBottom();
    }

    function removeTypingIndicator() {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    function getRandomResponseTime(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function getCurrentTime() {
        const now = new Date();
        return now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
    }

    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
});

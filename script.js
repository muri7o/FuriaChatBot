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
                { text: "Quem são os jogadores?", response: "Nosso lineup atual de CS conta com: FalleN, yuurih, YEKINDAR, KSCERATO e molodoy!" },
                { text: "Qual a história da FURIA?", response: "A FURIA é uma organização de esports brasileira que começou no CS com o objetivo de representar o país e se tornou um movimento sociocultural. Com foco em performance, lifestyle, conteúdo, negócios, tecnologia e impacto social, une pessoas e inspira sonhos dentro e fora dos jogos." },
                { text: "Quais são as conquistas da FURIA?", response: "Entre as principais conquistas da FURIA no CS estão: Elisa Masters Espoo 2023, Elisa Invitational Summer 2021, ESL Pro League Season 12: North America, DreamHack Masters Spring 2020: North America, Arctic Invitational 2019, EMF CS:GO World Invitational 2019 e ESEA Season 31: Global Challenge. Cada título representa a garra e a evolução da nossa história!" },
                { text: "Quem fundou a FURIA?", response: "A FURIA foi fundada por Jaime Pádua, André Akkari e Cris Guedes, com o propósito de transformar o cenário brasileiro de esports e levar a paixão competitiva para o mundo." },
                { text: "Onde posso assistir aos jogos?", response: "Você pode acompanhar os jogos da FURIA ao vivo nos canais oficiais da ESL, Blast, Twitch e YouTube, além das redes sociais da organização!" },
                { text: "Redes sociais da FURIA", response: "Você pode seguir a FURIA em todas as redes sociais como @FURIA ou @FURIAGG!" }
            ]
        },
        en: {
            welcome: "Hi! I'm Pantera, the official FURIA assistant. Choose a question below to get started!",
            questions: [
                { text: "Who are the players?", response: "Our current CS lineup includes: FalleN, yuurih, YEKINDAR, KSCERATO and molodoy!" },
                { text: "What is FURIA’s history?", response: "FURIA is a Brazilian esports organization that started in CS with the goal of representing the country and became a sociocultural movement. Focused on performance, lifestyle, content, business, technology, and social impact, it brings people together and inspires dreams both in and out of the game." },
                { text: "What are FURIA’s achievements?", response: "FURIA’s top CS achievements include: Elisa Masters Espoo 2023, Elisa Invitational Summer 2021, ESL Pro League Season 12: North America, DreamHack Masters Spring 2020: North America, Arctic Invitational 2019, EMF CS:GO World Invitational 2019, and ESEA Season 31: Global Challenge. Each trophy marks a chapter in our fierce and proud journey!" },
                { text: "Who founded FURIA?", response: "FURIA was founded by Jaime Pádua, André Akkari, and Cris Guedes, with the goal of transforming the Brazilian esports scene and spreading competitive passion worldwide."},
                { text: "Where can I watch the matches?", response: "You can watch FURIA’s matches live on official ESL and BLAST streams, Twitch, YouTube, and also stay tuned via our social media!" },
                { text: "FURIA's social media", response: "You can follow FURIA on all social media as @FURIA or @FURIAGG!" }
            ]
        },
        es: {
            welcome: "¡Hola! Soy Pantera, el asistente oficial de FURIA. ¡Elige una pregunta para comenzar!",
            questions: [
                { text: "¿Quiénes son los jugadores?", response: "Nuestra alineación actual de CS incluye: FalleN, yuurih, YEKINDAR, KSCERATO y molodoy." },
                { text: "¿Cuál es la historia de FURIA?", response: "FURIA es una organización brasileña de esports que comenzó en CS con el objetivo de representar al país y se convirtió en un movimiento sociocultural. Con enfoque en rendimiento, estilo de vida, contenido, negocios, tecnología e impacto social, une personas e inspira sueños dentro y fuera del juego." },
                { text: "¿Cuáles son los logros de FURIA?", response: "Entre los logros más importantes de FURIA en CS se encuentran: Elisa Masters Espoo 2023, Elisa Invitational Summer 2021, ESL Pro League Season 12: North America, DreamHack Masters Spring 2020: North America, Arctic Invitational 2019, EMF CS:GO World Invitational 2019 y ESEA Season 31: Global Challenge. ¡Cada título refleja la pasión y crecimiento de nuestra historia!" },
                { text: "¿Quiénes fundaron FURIA?", response: "FURIA fue fundada por Jaime Pádua, André Akkari y Cris Guedes, con el propósito de transformar el escenario brasileño de los esports y llevar la pasión competitiva al mundo."},
                { text: "¿Dónde puedo ver los partidos?", response: "Puedes ver los partidos de FURIA en vivo en los canales oficiales de ESL, BLAST, Twitch y YouTube, además de seguirnos en las redes sociales." },
                { text: "Redes sociales de FURIA", response: "¡Puedes seguir a FURIA en todas las redes sociales como @FURIA o @FURIAGG!" }
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

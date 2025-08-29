// Quiz Application State
class QuizApp {
    constructor() {
        this.currentScreen = 'splash';
        this.questions = [];
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.userAnswers = [];
        this.timer = null;
        this.timeLeft = 10;
        this.isAnswered = false;
        
        // Indian GK Questions - Since Open Trivia DB doesn't have Indian GK category
        this.indianGKQuestions = [
            {
                question: "What is the capital of India?",
                options: ["Mumbai", "New Delhi", "Kolkata", "Chennai"],
                correct: 1,
                explanation: "New Delhi is the capital of India."
            },
            {
                question: "Which river is known as the 'Ganga of the South'?",
                options: ["Krishna", "Godavari", "Kaveri", "Narmada"],
                correct: 2,
                explanation: "Kaveri river is known as the 'Ganga of the South'."
            },
            {
                question: "Who was the first Prime Minister of India?",
                options: ["Mahatma Gandhi", "Jawaharlal Nehru", "Sardar Patel", "Dr. APJ Abdul Kalam"],
                correct: 1,
                explanation: "Jawaharlal Nehru was the first Prime Minister of India."
            },
            {
                question: "In which year did India gain independence?",
                options: ["1945", "1946", "1947", "1948"],
                correct: 2,
                explanation: "India gained independence on August 15, 1947."
            },
            {
                question: "Which is the largest state in India by area?",
                options: ["Rajasthan", "Uttar Pradesh", "Madhya Pradesh", "Maharashtra"],
                correct: 0,
                explanation: "Rajasthan is the largest state in India by area."
            },
            {
                question: "What is the national flower of India?",
                options: ["Rose", "Jasmine", "Lotus", "Sunflower"],
                correct: 2,
                explanation: "Lotus is the national flower of India."
            },
            {
                question: "Which mountain range separates India from China?",
                options: ["Himalayas", "Western Ghats", "Eastern Ghats", "Aravalli"],
                correct: 0,
                explanation: "The Himalayas separate India from China."
            },
            {
                question: "Who wrote the Indian National Anthem?",
                options: ["Bankim Chandra Chatterjee", "Rabindranath Tagore", "Sarojini Naidu", "Subhas Chandra Bose"],
                correct: 1,
                explanation: "Rabindranath Tagore wrote the Indian National Anthem 'Jana Gana Mana'."
            },
            {
                question: "Which Indian city is known as the 'Silicon Valley of India'?",
                options: ["Mumbai", "Chennai", "Bangalore", "Hyderabad"],
                correct: 2,
                explanation: "Bangalore is known as the 'Silicon Valley of India'."
            },
            {
                question: "What is the currency of India?",
                options: ["Dollar", "Pound", "Rupee", "Yen"],
                correct: 2,
                explanation: "Indian Rupee (INR) is the currency of India."
            },
            {
                question: "Which festival is known as the 'Festival of Lights'?",
                options: ["Holi", "Diwali", "Dussehra", "Eid"],
                correct: 1,
                explanation: "Diwali is known as the 'Festival of Lights'."
            },
            {
                question: "Who is known as the 'Father of the Nation' in India?",
                options: ["Nehru", "Gandhi", "Patel", "Bose"],
                correct: 1,
                explanation: "Mahatma Gandhi is known as the 'Father of the Nation' in India."
            },
            {
                question: "Which is the highest mountain peak in India?",
                options: ["K2", "Kangchenjunga", "Nanda Devi", "Mount Everest"],
                correct: 1,
                explanation: "Kangchenjunga is the highest mountain peak entirely in India."
            },
            {
                question: "In which state is the famous Taj Mahal located?",
                options: ["Rajasthan", "Uttar Pradesh", "Madhya Pradesh", "Delhi"],
                correct: 1,
                explanation: "The Taj Mahal is located in Agra, Uttar Pradesh."
            },
            {
                question: "Which Indian space organization successfully launched the Mars Orbiter Mission?",
                options: ["DRDO", "ISRO", "BARC", "CSIR"],
                correct: 1,
                explanation: "ISRO (Indian Space Research Organisation) successfully launched the Mars Orbiter Mission."
            }
        ];
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.showSplashScreen();
    }
    
    bindEvents() {
        // Start screen events
        document.getElementById('start-quiz-btn').addEventListener('click', () => this.startQuiz());
        document.getElementById('how-it-works-btn').addEventListener('click', () => this.showHowItWorks());
        document.getElementById('close-modal').addEventListener('click', () => this.closeModal());
        
        // Quiz events
        document.getElementById('next-question-btn').addEventListener('click', () => this.nextQuestion());
        
        // Results events
        document.getElementById('retry-quiz-btn').addEventListener('click', () => this.restartQuiz());
        document.getElementById('home-btn').addEventListener('click', () => this.goHome());
        
        // Error screen events
        document.getElementById('retry-btn').addEventListener('click', () => this.startQuiz());
        
        // Modal events
        window.addEventListener('click', (e) => {
            const modal = document.getElementById('how-it-works-modal');
            if (e.target === modal) {
                this.closeModal();
            }
        });
        
        // Keyboard events
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });
    }
    
    showScreen(screenId) {
        // Hide all screens
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        
        // Show target screen
        document.getElementById(screenId).classList.add('active');
        this.currentScreen = screenId;
    }
    
    showSplashScreen() {
        this.showScreen('splash-screen');
        
        // Auto transition to start screen after 3 seconds
        setTimeout(() => {
            this.showStartScreen();
        }, 3000);
    }
    
    showStartScreen() {
        this.showScreen('start-screen');
    }
    
    showHowItWorks() {
        document.getElementById('how-it-works-modal').classList.add('active');
    }
    
    closeModal() {
        document.getElementById('how-it-works-modal').classList.remove('active');
    }
    
    async startQuiz() {
        this.showScreen('loading-screen');
        
        try {
            // Simulate loading time and prepare questions
            await this.loadQuestions();
            this.resetQuiz();
            this.showQuizScreen();
            this.displayQuestion();
            this.startTimer();
        } catch (error) {
            console.error('Failed to start quiz:', error);
            this.showError('Failed to load quiz questions. Please try again.');
        }
    }
    
    async loadQuestions() {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Shuffle and select 10 questions from the Indian GK collection
        const shuffled = this.shuffleArray([...this.indianGKQuestions]);
        this.questions = shuffled.slice(0, 10);
        
        // Alternative: Try to fetch from Open Trivia DB as fallback
        // This will be used if we want to mix with general knowledge questions
        try {
            const response = await fetch('https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple');
            if (response.ok) {
                const data = await response.json();
                if (data.results && data.results.length > 0) {
                    const apiQuestions = data.results.map(q => ({
                        question: this.decodeHtml(q.question),
                        options: this.shuffleArray([
                            this.decodeHtml(q.correct_answer),
                            ...q.incorrect_answers.map(ans => this.decodeHtml(ans))
                        ]),
                        correct: 0, // Will be set after shuffling
                        explanation: `The correct answer is: ${this.decodeHtml(q.correct_answer)}`
                    }));
                    
                    // Find correct answer index after shuffling
                    apiQuestions.forEach(q => {
                        q.correct = q.options.findIndex(opt => opt === this.decodeHtml(data.results[apiQuestions.indexOf(q)].correct_answer));
                    });
                    
                    // Mix API questions with Indian GK questions
                    this.questions = [...this.questions.slice(0, 7), ...apiQuestions.slice(0, 3)];
                    this.questions = this.shuffleArray(this.questions);
                }
            }
        } catch (apiError) {
            console.warn('API fetch failed, using local questions only:', apiError);
        }
    }
    
    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }
    
    decodeHtml(html) {
        const txt = document.createElement('textarea');
        txt.innerHTML = html;
        return txt.value;
    }
    
    resetQuiz() {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.userAnswers = [];
        this.timeLeft = 10;
        this.isAnswered = false;
        this.clearTimer();
    }
    
    showQuizScreen() {
        this.showScreen('quiz-screen');
    }
    
    displayQuestion() {
        const question = this.questions[this.currentQuestionIndex];
        
        // Update progress
        const progress = ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
        document.getElementById('progress-fill').style.width = `${progress}%`;
        document.getElementById('question-counter').textContent = `${this.currentQuestionIndex + 1} / ${this.questions.length}`;
        
        // Display question
        document.getElementById('question-text').textContent = question.question;
        
        // Display options
        const optionsContainer = document.getElementById('options-container');
        optionsContainer.innerHTML = '';
        
        question.options.forEach((option, index) => {
            const optionElement = document.createElement('button');
            optionElement.className = 'option';
            optionElement.textContent = option;
            optionElement.addEventListener('click', () => this.selectAnswer(index));
            optionsContainer.appendChild(optionElement);
        });
        
        // Hide feedback
        document.getElementById('feedback-container').classList.add('hidden');
        document.getElementById('question-container').style.display = 'block';
        
        this.isAnswered = false;
        this.timeLeft = 10;
    }
    
    selectAnswer(selectedIndex) {
        if (this.isAnswered) return;
        
        this.isAnswered = true;
        this.clearTimer();
        
        const question = this.questions[this.currentQuestionIndex];
        const isCorrect = selectedIndex === question.correct;
        
        // Update score
        if (isCorrect) {
            this.score++;
        }
        
        // Store answer
        this.userAnswers.push({
            question: question.question,
            selectedAnswer: question.options[selectedIndex],
            correctAnswer: question.options[question.correct],
            isCorrect: isCorrect,
            explanation: question.explanation
        });
        
        // Show feedback
        this.showFeedback(isCorrect, question.options[question.correct]);
        
        // Update option styles
        const options = document.querySelectorAll('.option');
        options.forEach((option, index) => {
            option.classList.add('disabled');
            if (index === question.correct) {
                option.classList.add('correct');
            } else if (index === selectedIndex && !isCorrect) {
                option.classList.add('incorrect');
            }
        });
    }
    
    showFeedback(isCorrect, correctAnswer) {
        const feedbackContainer = document.getElementById('feedback-container');
        const feedbackMessage = document.getElementById('feedback-message');
        
        feedbackMessage.textContent = isCorrect 
            ? '🎉 Correct! Well done!' 
            : `❌ Incorrect! The correct answer is: ${correctAnswer}`;
        
        feedbackMessage.className = `feedback-message ${isCorrect ? 'correct' : 'incorrect'}`;
        
        document.getElementById('question-container').style.display = 'none';
        feedbackContainer.classList.remove('hidden');
        
        // Update next button text
        const nextBtn = document.getElementById('next-question-btn');
        nextBtn.textContent = this.currentQuestionIndex === this.questions.length - 1 ? 'View Results' : 'Next Question';
    }
    
    nextQuestion() {
        this.currentQuestionIndex++;
        
        if (this.currentQuestionIndex < this.questions.length) {
            this.displayQuestion();
            this.startTimer();
        } else {
            this.showResults();
        }
    }
    
    startTimer() {
        this.timeLeft = 10;
        this.updateTimerDisplay();
        
        this.timer = setInterval(() => {
            this.timeLeft--;
            this.updateTimerDisplay();
            
            if (this.timeLeft <= 10) {
                document.getElementById('timer').classList.add('warning');
            }
            
            if (this.timeLeft <= 0) {
                this.timeUp();
            }
        }, 1000);
    }
    
    updateTimerDisplay() {
        document.getElementById('timer').textContent = this.timeLeft;
    }
    
    timeUp() {
        if (this.isAnswered) return;
        
        this.isAnswered = true;
        this.clearTimer();
        
        const question = this.questions[this.currentQuestionIndex];
        
        // Store answer as incorrect
        this.userAnswers.push({
            question: question.question,
            selectedAnswer: 'Time Up - No Answer',
            correctAnswer: question.options[question.correct],
            isCorrect: false,
            explanation: question.explanation
        });
        
        // Show feedback
        this.showFeedback(false, question.options[question.correct]);
        
        // Highlight correct answer
        const options = document.querySelectorAll('.option');
        options.forEach((option, index) => {
            option.classList.add('disabled');
            if (index === question.correct) {
                option.classList.add('correct');
            }
        });
    }
    
    clearTimer() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
        document.getElementById('timer').classList.remove('warning');
    }
    
    showResults() {
        this.showScreen('results-screen');
        
        const percentage = Math.round((this.score / this.questions.length) * 100);
        
        // Update score display
        document.getElementById('score-percentage').textContent = `${percentage}%`;
        document.getElementById('score-text').textContent = `You scored ${this.score} out of ${this.questions.length}`;
        
        // Display detailed results
        const resultsDetails = document.getElementById('results-details');
        resultsDetails.innerHTML = '';
        
        this.userAnswers.forEach((answer, index) => {
            const resultItem = document.createElement('div');
            resultItem.className = 'result-item';
            
            resultItem.innerHTML = `
                <div class="result-question">${index + 1}. ${answer.question}</div>
                <div class="result-answer ${answer.isCorrect ? 'correct' : 'incorrect'}">
                    Your answer: ${answer.selectedAnswer}
                </div>
                ${!answer.isCorrect ? `<div class="result-answer correct">Correct answer: ${answer.correctAnswer}</div>` : ''}
                <div class="result-answer">${answer.explanation}</div>
            `;
            
            resultsDetails.appendChild(resultItem);
        });
        
        // Store results in localStorage
        this.saveResults();
    }
    
    saveResults() {
        const results = {
            score: this.score,
            totalQuestions: this.questions.length,
            percentage: Math.round((this.score / this.questions.length) * 100),
            answers: this.userAnswers,
            date: new Date().toISOString()
        };
        
        try {
            localStorage.setItem('quizResults', JSON.stringify(results));
        } catch (error) {
            console.warn('Failed to save results to localStorage:', error);
        }
    }
    
    restartQuiz() {
        this.startQuiz();
    }
    
    goHome() {
        this.showStartScreen();
    }
    
    showError(message) {
        document.getElementById('error-message').textContent = message;
        this.showScreen('error-screen');
    }
}

// Initialize the quiz app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.quizApp = new QuizApp();
});

// Add some utility functions for enhanced user experience
window.addEventListener('beforeunload', (e) => {
    if (window.quizApp && window.quizApp.currentScreen === 'quiz-screen' && !window.quizApp.isAnswered) {
        e.preventDefault();
        e.returnValue = 'Are you sure you want to leave? Your quiz progress will be lost.';
    }
});

// Service Worker registration for offline support (optional enhancement)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Note: Service worker file would need to be created separately
        // navigator.serviceWorker.register('/sw.js').catch(err => console.log('SW registration failed'));
    });
}

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (window.quizApp && window.quizApp.currentScreen === 'quiz-screen') {
        const options = document.querySelectorAll('.option:not(.disabled)');
        
        if (e.key >= '1' && e.key <= '4') {
            const index = parseInt(e.key) - 1;
            if (options[index] && !window.quizApp.isAnswered) {
                options[index].click();
            }
        }
        
        if (e.key === 'Enter' && window.quizApp.isAnswered) {
            document.getElementById('next-question-btn').click();
        }
    }
});

// Add smooth scrolling for better UX
document.documentElement.style.scrollBehavior = 'smooth';

// Performance monitoring
console.log('BeQuizy Quiz App initialized successfully! 🚀');

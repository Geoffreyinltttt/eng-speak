// ===== 全域變數 =====
let currentCategory = 'words';
let currentCard = 0;
let currentWordIndex = 0;
let recognition = null;
let isRecording = false;
let audioContext = null;
let analyser = null;
let waveformBars = [];
let animationFrameId = null;
let touchStartX = 0;
let touchEndX = 0;

// ===== 詞彙資料 =====
const vocabularyData = {
    words: [
        {
            word: "exciting",
            meaning: "adj. 令人興奮的；刺激的",
            example: "Tony watched an exciting live basketball game last night.",
            translation: "Tony昨晚看了一場令人興奮的籃球現場直播。",
            syllables: ["ex", "ci", "ting"],
            pronunciationGuide: ["ɪk", "saɪ", "tɪŋ"],
            image: "https://hackmd.io/_uploads/BJSVVGtLkg.png"
        },
        {
            word: "excited",
            meaning: "adj. 興奮的",
            example: "All the students are excited about the field trip.",
            translation: "所有的學生都對這次校外教學感到興奮。",
            syllables: ["ex", "ci", "ted"],
            pronunciationGuide: ["ɪk", "saɪ", "tɪd"],
            image: "https://hackmd.io/_uploads/ryzF9zFIkg.png"
        },
        {
            word: "proud",
            meaning: "adj. 驕傲的",
            example: "",
            translation: "",
            syllables: ["proud"],
            pronunciationGuide: ["praʊd"],
            image: "https://hackmd.io/_uploads/Bkl3cMF8yg.png"
        },
        {
            word: "challenge",
            meaning: "n. [C] 挑戰",
            example: "Henry always faces challenges in a brave way.",
            translation: "Henry總是勇敢地面對挑戰。",
            syllables: ["chal", "lenge"],
            pronunciationGuide: ["tʃæ", "lɪndʒ"],
            image: "https://hackmd.io/_uploads/r1N1oGtLkl.png"
        },
        {
            word: "nervous",
            meaning: "adj. 緊張的",
            example: "Tom is nervous about the final exam.",
            translation: "Tom對期末考試感到緊張。",
            syllables: ["ner", "vous"],
            pronunciationGuide: ["nɝ", "vəs"],
            image: "https://hackmd.io/_uploads/ryNGjMF8Jx.png"
        },
        {
            word: "different",
            meaning: "adj. 不同的",
            example: "Asian elephants are different from African elephants.",
            translation: "亞洲象和非洲象是不同的。",
            syllables: ["dif", "fer", "ent"],
            pronunciationGuide: ["dɪ", "fər", "ənt"],
            image: "https://hackmd.io/_uploads/r1NBjzKLyx.png"
        },
        {
            word: "difference",
            meaning: "n. [U, C] 差異",
            example: "There is little difference in looks between the two sisters.",
            translation: "這兩姊妹的長相幾乎沒有差異。",
            syllables: ["dif", "fer", "ence"],
            pronunciationGuide: ["dɪ", "fər", "əns"],
            image: "https://hackmd.io/_uploads/S1nPsfKI1e.png"
        },
        {
            word: "awesome",
            meaning: "adj. 很棒的；令人驚歎的",
            example: "The magic show was awesome. I enjoyed it a lot.",
            translation: "這場魔術表演很精彩。我很享受。",
            syllables: ["awe", "some"],
            pronunciationGuide: ["ɔ", "səm"],
            image: "https://hackmd.io/_uploads/BJ6KszYI1e.png"
        },
        {
            word: "surprised",
            meaning: "adj. 驚訝的",
            example: "The fans were surprised at the famous singer's sudden marriage.",
            translation: "粉絲們對這位著名歌手突然結婚感到驚訝。",
            syllables: ["sur", "prised"],
            pronunciationGuide: ["sə", "praɪzd"],
            image: "https://hackmd.io/_uploads/S1XTjGFUJg.png"
        },
        {
            word: "surprise",
            meaning: "n. [C] 驚訝",
            example: "To our surprise, Andy won first place in the race.",
            translation: "令我們驚訝的是，Andy在比賽中獲得第一名。",
            syllables: ["sur", "prise"],
            pronunciationGuide: ["sɚ", "praɪz"],
            image: "https://hackmd.io/_uploads/rynBgXt8Jx.png"
        },
        {
            word: "interested",
            meaning: "adj. 有興趣的",
            example: "Steve is interested in playing the guitar.",
            translation: "Steve對彈吉他很有興趣。",
            syllables: ["in", "ter", "est", "ed"],
            pronunciationGuide: ["ɪn", "tər", "ɪs", "tɪd"],
            image: "https://hackmd.io/_uploads/HkWdemKIkl.png"
        },
        {
            word: "interesting",
            meaning: "adj. 有趣的",
            example: "Ms. White told the kids an interesting story.",
            translation: "White小姐給孩子們講了一個有趣的故事。",
            syllables: ["in", "ter", "est", "ing"],
            pronunciationGuide: ["ɪn", "tər", "ɪs", "tɪŋ"],
            image: "https://hackmd.io/_uploads/S1_5gQtU1l.png"
        },
        {
            word: "decision",
            meaning: "n. [C] 決定",
            example: "Before Judy makes a decision, she talks about it with her parents.",
            translation: "在Judy做決定之前，她會和父母討論。",
            syllables: ["de", "ci", "sion"],
            pronunciationGuide: ["dɪ", "sɪ", "ʒən"],
            image: "https://hackmd.io/_uploads/ry4agXFI1g.png"
        },
        {
            word: "decide",
            meaning: "vi. vt. 決定",
            example: "Stacy decided not to buy the dress because it was too expensive.",
            translation: "Stacy決定不買那件洋裝因為太貴了。",
            syllables: ["de", "cide"],
            pronunciationGuide: ["dɪ", "saɪd"],
            image: "https://hackmd.io/_uploads/H1-E-7F8kg.png"
        },
        {
            word: "upset",
            meaning: "adj. 難過的",
            example: "Hanna's cat died a few days ago, so she was quite upset.",
            translation: "Hanna的貓幾天前死了，所以她很難過。",
            syllables: ["up", "set"],
            pronunciationGuide: ["ʌp", "sɛt"],
            image: "https://hackmd.io/_uploads/rJSU-mtIyx.png"
        },
        {
            word: "trust",
            meaning: "vt. 相信；信任",
            example: "We can't trust Ben because he likes to tell lies.",
            translation: "我們無法相信Ben因為他愛說謊。",
            syllables: ["trust"],
            pronunciationGuide: ["trʌst"],
            image: "https://hackmd.io/_uploads/BkeK-QKL1x.png"
        },
        {
            word: "believe",
            meaning: "vt. 相信",
            example: "I can't believe it! I just took a picture with my favorite actor.",
            translation: "我不敢相信！我剛剛和我最喜歡的演員合照了。",
            syllables: ["be", "lieve"],
            pronunciationGuide: ["bɪ", "liv"],
            image: "https://hackmd.io/_uploads/SJvsZ7FIJe.png"
        },
        {
            word: "perfect",
            meaning: "adj. 完美的",
            example: "The weather today is perfect. Let's go to the beach!",
            translation: "今天的天氣很完美。讓我們去海灘吧！",
            syllables: ["per", "fect"],
            pronunciationGuide: ["pɝ", "fɪkt"],
            image: "https://hackmd.io/_uploads/SyWpb7KLyl.png"
        },
        {
            word: "certainly",
            meaning: "adv. 必定",
            example: "Joe studies very hard, so he will certainly pass the exam.",
            translation: "Joe很用功讀書，所以他一定會通過考試。",
            syllables: ["cer", "tain", "ly"],
            pronunciationGuide: ["sɝ", "tən", "lɪ"],
            image: "https://hackmd.io/_uploads/rky1M7t8yx.png"
        },
        {
            word: "unforgettable",
            meaning: "adj. 令人難忘的",
            example: "My one-month trip to Italy on my own was unforgettable.",
            translation: "我獨自一人在義大利的一個月旅行令人難忘。",
            syllables: ["un", "for", "get", "ta", "ble"],
            pronunciationGuide: ["ʌn", "fɚ", "gɛt", "ə", "bḷ"],
            image: "https://hackmd.io/_uploads/S1yzMmKL1l.png"
        },
        {
            word: "memory",
            meaning: "n. [C] 回憶；記憶",
            example: "Every time Anna looks at those photos, she thinks of the sweet memories of her high school life.",
            translation: "每當Anna看著那些照片，她就會想起高中生活的美好回憶。",
            syllables: ["mem", "o", "ry"],
            pronunciationGuide: ["mɛm", "ə", "rɪ"],
            image: "https://hackmd.io/_uploads/HJDEMQtLyx.png"
        }
    ],
    idioms: [
        {
            word: "be in the same boat",
            meaning: "處在相同困境",
            example: "The traffic is terrible, but since we all are in the same boat, we should not get angry.",
            translation: "雖然交通很糟糕，但既然我們都處在相同的困境，就不應該生氣。",
            image: "https://hackmd.io/_uploads/H1tH1l5I1e.png"
        },
        {
            word: "make a/the difference",
            meaning: "帶來不同；造成影響",
            example: "A good teacher can make a difference in her or his students' lives.",
            translation: "一個好老師能在學生的生命中帶來改變。",
            image: "https://hackmd.io/_uploads/rkX_JxcLkg.png"
        },
        {
            word: "go for sth.",
            meaning: "努力爭取某事物",
            example: "Every swimmer went for first prize in the swimming race.",
            translation: "每個游泳選手都在為游泳比賽的第一名努力。",
            image: "https://hackmd.io/_uploads/HyZsyl5L1x.png"
        },
        {
            word: "give up",
            meaning: "放棄",
            example: "Although the job is not easy, John never gives up.",
            translation: "雖然這份工作並不容易，但John從未放棄。",
            image: "https://hackmd.io/_uploads/HJRvMlcUkx.png"
        },
        {
            word: "have one's back",
            meaning: "支持某人",
            example: "Nancy decided to study in France, and her parents had her back.",
            translation: "Nancy決定到法國讀書，她的父母支持她。",
            image: "https://hackmd.io/_uploads/ByA9Ml5Uye.png"
        },
        {
            word: "all the time",
            meaning: "一直；總是",
            example: "Stacy asks questions all the time because she wants to know more about the world.",
            translation: "Stacy總是問問題，因為她想更了解這個世界。",
            image: "https://hackmd.io/_uploads/S1mCfl9I1e.png"
        }
    ]
};

// ===== 音素相似度映射表 =====
const phoneticSimilarityMap = {
    // 元音相似組
    'a': ['æ', 'ɑ', 'ʌ', 'ə'],
    'e': ['ɛ', 'ɪ', 'i'],
    'i': ['ɪ', 'i:', 'aɪ'],
    'o': ['ɔ', 'o', 'ʊ', 'u'],
    'u': ['ʊ', 'u:', 'ju:'],
    
    // 輔音相似組
    'th': ['ð', 'θ', 'd', 't', 'f'],
    's': ['z', 'ʃ', 'ʒ'],
    'v': ['f', 'b'],
    'b': ['p', 'v'],
    'r': ['l', 'w'],
    'n': ['m', 'ŋ']
};

// ===== 初始化函數 =====
function initializeFlashcards() {
    updateCardVisibility();
    updateCardContent();
    updateCardIndicators();
    playCardAudio();
}

function initializeSpeech() {
    // 載入語音合成引擎
    if (window.speechSynthesis) {
        if (speechSynthesis.getVoices().length === 0) {
            speechSynthesis.onvoiceschanged = function() {
                console.log('語音合成引擎已初始化');
            };
        }
    } else {
        console.warn('瀏覽器不支援語音合成');
    }
    
    // 檢查麥克風
    checkMicrophoneAccess();
}

function checkMicrophoneAccess() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        console.error('瀏覽器不支援 getUserMedia API');
        showBrowserCompatibilityWarning();
        return Promise.reject(new Error('瀏覽器不支援媒體設備訪問'));
    }
    
    console.log('檢查麥克風權限和瀏覽器支援...');
    
    return navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            console.log('成功獲取麥克風權限');
            stream.getTracks().forEach(track => track.stop());
            
            // 檢查語音識別支援
            if (initializeSpeechRecognition()) {
                console.log('語音辨識已初始化');
                return true;
            } else {
                throw new Error('語音識別初始化失敗');
            }
        })
        .catch(err => {
            console.error('麥克風權限或語音識別檢查失敗:', err);
            if (err.name === 'NotAllowedError') {
                alert('需要麥克風權限才能使用語音功能，請允許後重新載入頁面。');
            }
            showBrowserCompatibilityWarning();
            throw err;
        });
}

function requestMicrophonePermission() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        return Promise.reject(new Error('瀏覽器不支援獲取媒體設備'));
    }
    
    return navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            stream.getTracks().forEach(track => track.stop());
            return true;
        });
}

// ===== 卡片控制函數 =====
function getTotalCards(category) {
    if (category === 'recognition') {
        return 2;
    }
    return 3;
}

function changeCard(direction) {
    stopSpeaking();
    const flashcard = document.getElementById('flashcard');
    
    const totalCards = getTotalCards(currentCategory);
    const newCardIndex = (currentCard + direction + totalCards) % totalCards;
    
    console.log('切換卡片: 從', currentCard, '到', newCardIndex);
    
    flashcard.classList.remove('flip-right', 'flip-left');
    void flashcard.offsetWidth;
    flashcard.classList.add(direction > 0 ? 'flip-right' : 'flip-left');
    
    setTimeout(() => {
        currentCard = newCardIndex;
        updateCardVisibility();
        updateCardContent();
        updateCardIndicators();
        
        document.querySelectorAll('.translation-container').forEach(container => {
            container.classList.remove('show');
        });
        
        flashcard.classList.remove('flip-right', 'flip-left');
        
        setTimeout(() => {
            playCardAudio();
        }, 100);
    }, 300);
}

function changeWord(direction) {
    stopSpeaking();
    const categoryWords = vocabularyData[currentCategory];
    const flashcard = document.getElementById('flashcard');
    flashcard.classList.remove('flip-right', 'flip-left');
    void flashcard.offsetWidth;
    flashcard.classList.add(direction > 0 ? 'flip-right' : 'flip-left');

    setTimeout(() => {
        currentWordIndex = (currentWordIndex + direction + categoryWords.length) % categoryWords.length;
        currentCard = 0;
        updateCardVisibility();
        updateCardContent();
        updateCardIndicators();
        flashcard.classList.remove('flip-right', 'flip-left');
        
        document.querySelectorAll('.translation-container').forEach(container => {
            container.classList.remove('show');
        });
        
        setTimeout(() => {
            playCardAudio();
        }, 100);
    }, 300);
}

function updateCardVisibility() {
    console.log('更新卡片可見性: 當前卡片索引 =', currentCard);
    
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.classList.add('back');
    });
    
    if (currentCard >= 0 && currentCard < cards.length) {
        cards[currentCard].classList.remove('back');
        console.log('顯示卡片:', currentCard);
    } else {
        console.error('無效的卡片索引:', currentCard);
    }
}

function updateCardIndicators() {
    const indicators = document.querySelectorAll('.indicator');
    const totalCards = getTotalCards(currentCategory);
    
    indicators.forEach((indicator, index) => {
        if (index < totalCards) {
            indicator.style.display = 'block';
            indicator.classList.toggle('active', index === currentCard);
        } else {
            indicator.style.display = 'none';
        }
    });
}

function updateCardContent() {
    const currentWord = vocabularyData[currentCategory][currentWordIndex];
    const wordDisplay = document.getElementById('wordDisplay');
    const wordBack = document.getElementById('wordBack');
    const meaningDisplay = document.getElementById('meaningDisplay');
    const exampleDisplay = document.getElementById('exampleDisplay');
    const exampleDisplay2 = document.getElementById('exampleDisplay2');
    const exampleTextContainer = document.querySelector('#card3 .example-text');
    const exampleTextContainer2 = document.querySelector('#card4 .example-text');
    const imageContainer = document.getElementById('imageContainer');
    const imageContainer2 = document.getElementById('imageContainer2');

    imageContainer.innerHTML = '圖片預留區';
    imageContainer2.innerHTML = '圖片預留區';

    requestAnimationFrame(() => {
        wordDisplay.textContent = currentWord.word;
        wordBack.textContent = currentWord.word;
        meaningDisplay.textContent = currentWord.meaning;

        if (currentWord.examples) {
            if (currentWord.examples.length > 0) {
                const example1 = currentWord.examples[0];
                exampleDisplay.innerHTML = processExampleText(example1.sentence, currentWord.word);
                
                const oldTranslation = exampleTextContainer.querySelector('.translation-container');
                if (oldTranslation) {
                    oldTranslation.remove();
                }
                
                const translationContainer1 = createTranslationContainer(example1.translation);
                exampleTextContainer.appendChild(translationContainer1);

                if (example1.image) {
                    imageContainer.innerHTML = `<img src="${example1.image}" alt="${currentWord.word}" style="max-width: 100%; max-height: 100%; object-fit: contain;">`;
                }
            }

            if (currentWord.examples.length > 1) {
                const example2 = currentWord.examples[1];
                exampleDisplay2.innerHTML = processExampleText(example2.sentence, currentWord.word);
                
                const oldTranslation2 = exampleTextContainer2.querySelector('.translation-container');
                if (oldTranslation2) {
                    oldTranslation2.remove();
                }
                
                const translationContainer2 = createTranslationContainer(example2.translation);
                exampleTextContainer2.appendChild(translationContainer2);

                if (example2.image) {
                    imageContainer2.innerHTML = `<img src="${example2.image}" alt="${currentWord.word}" style="max-width: 100%; max-height: 100%; object-fit: contain;">`;
                }
            }
        } else if (currentWord.example) {
            exampleDisplay.innerHTML = processExampleText(currentWord.example, currentWord.word);
            
            const oldTranslation = exampleTextContainer.querySelector('.translation-container');
            if (oldTranslation) {
                oldTranslation.remove();
            }
            
            const translationContainer = createTranslationContainer(currentWord.translation);
            exampleTextContainer.appendChild(translationContainer);

            if (currentWord.image) {
                imageContainer.innerHTML = `<img src="${currentWord.image}" alt="${currentWord.word}" style="max-width: 100%; max-height: 100%; object-fit: contain;">`;
            }
        }

        updateCardIndicators();
        
        setTimeout(() => {
            const cards = document.querySelectorAll('.card');
            cards.forEach((card, index) => {
                const existingButton = card.querySelector('.speech-icon');
                if (existingButton) {
                    existingButton.remove();
                }
                
                if (index === 0) return;
                
                const speechButton = document.createElement('div');
                speechButton.className = 'speech-icon';
                speechButton.innerHTML = '🎤';
                speechButton.title = '練習發音';
                
                speechButton.addEventListener('click', (e) => {
                    e.stopPropagation();
                    showSpeechRecognitionModal();
                });

                speechButton.addEventListener('touchstart', (e) => {
                    e.stopPropagation();
                    e.preventDefault();
                }, { passive: false });

                speechButton.addEventListener('touchmove', (e) => {
                    e.stopPropagation();
                    e.preventDefault();
                }, { passive: false });

                speechButton.addEventListener('touchend', (e) => {
                    e.stopPropagation();
                    showSpeechRecognitionModal();
                }, { passive: false });
                
                card.appendChild(speechButton);
            });
            
            adjustWordDisplay();
        }, 50);
    });
}

function createTranslationContainer(translation) {
    const container = document.createElement('div');
    container.className = 'translation-container';
    container.innerHTML = `
        <div class="translation-hint">
            <svg class="translation-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
        </div>
        <div class="translation">${translation}</div>
    `;
    
    container.addEventListener('click', function() {
        this.classList.toggle('show');
    });
    
    container.addEventListener('touchstart', function(event) {
        event.stopPropagation();
    });
    
    container.addEventListener('touchmove', function(event) {
        event.stopPropagation();
    });
    
    container.addEventListener('touchend', function(event) {
        event.stopPropagation();
    });
    
    return container;
}

function adjustWordDisplay() {
    const wordElements = document.querySelectorAll('.word');
    
    wordElements.forEach(element => {
        element.style.transform = 'scale(1)';
        element.style.fontSize = '';
        
        const maxWidth = element.parentElement.offsetWidth - 40;
        const maxHeight = element.parentElement.offsetHeight / 3;
        
        const isOverflowing = element.scrollWidth > maxWidth || 
                            element.scrollHeight > maxHeight;
        
        if (isOverflowing) {
            const widthRatio = maxWidth / element.scrollWidth;
            const heightRatio = maxHeight / element.scrollHeight;
            const scale = Math.min(widthRatio, heightRatio, 1) * 0.95;
            
            element.style.transform = `scale(${scale})`;
            element.classList.add('auto-scale');
            
            element.style.height = `${maxHeight}px`;
            element.style.display = 'flex';
            element.style.alignItems = 'center';
            element.style.justifyContent = 'center';
        }
    });
}

function showWordList() {
    const modal = document.getElementById('wordListModal');
    const wordList = document.getElementById('wordListItems');
    wordList.innerHTML = '';
    vocabularyData[currentCategory].forEach((word, index) => {
        const li = document.createElement('li');
        li.textContent = word.word;
        li.onclick = () => {
            stopSpeaking();
            currentWordIndex = index;
            currentCard = 0;
            updateCardVisibility();
            updateCardContent();
            updateCardIndicators();
            modal.style.display = 'none';
            setTimeout(() => {
                playCardAudio();
            }, 100);
        };
        wordList.appendChild(li);
    });
    modal.style.display = 'block';
}

// ===== UI 輔助函數 =====
function showGuide() {
    document.getElementById('guideModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function hideGuide() {
    document.getElementById('guideModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// ===== 文字處理函數 =====
function processExampleText(text, targetWord) {
    const isPhrase = targetWord.includes(' ');
    
    if (isPhrase) {
        return processExampleWithPhrase(text, targetWord);
    } else {
        const words = text.match(/[\w']+|[.,!?;]|\s+/g) || [];
        
        return words.map((word, index) => {
            const cleanWord = word.trim().toLowerCase().replace(/[.,!?;]$/, '');
            const isTargetWord = cleanWord === targetWord.toLowerCase();
            const isPunctuation = /^[.,!?;]$/.test(word);
            const isSpace = /^\s+$/.test(word);
            
            if (isSpace) {
                return ' ';
            }
            
            return `<span 
                data-index="${index}" 
                class="${isTargetWord ? 'highlight-word' : ''}"
                ${isPunctuation ? 'style="margin-left: -2px;"' : ''}
            >${word}</span>`;
        }).join('');
    }
}

function processExampleWithPhrase(text, targetPhrase) {
    function getPhraseVariations(phrase) {
        let variations = [phrase.toLowerCase()];
        let originalPhrase = phrase.toLowerCase();
        let words = originalPhrase.split(/\s+/);
        
        if (originalPhrase.includes("a/the")) {
            const withA = originalPhrase.replace("a/the", "a");
            const withThe = originalPhrase.replace("a/the", "the");
            variations.push(withA, withThe);
            variations.push(originalPhrase.replace("a/the ", ""));
        }
        
        if (words[0] === 'be') {
            const beVariations = ['am', 'is', 'are', 'was', 'were', 'been', 'being'];
            beVariations.forEach(verb => {
                variations.push(originalPhrase.replace(/^be\s/, verb + ' '));
            });
        } else if (words[0] === 'have') {
            const haveVariations = ['has', 'had', 'having'];
            haveVariations.forEach(verb => {
                variations.push(originalPhrase.replace(/^have\s/, verb + ' '));
            });
        } else if (words[0] === 'give' || words[0] === 'go' || words[0] === 'make') {
            const verbForms = {
                'give': ['gives', 'gave', 'giving', 'given'],
                'go': ['goes', 'went', 'going', 'gone'],
                'make': ['makes', 'made', 'making']
            };
            
            if (verbForms[words[0]]) {
                verbForms[words[0]].forEach(verb => {
                    variations.push(originalPhrase.replace(new RegExp(`^${words[0]}\\s`), verb + ' '));
                });
            }
        }
        
        if (originalPhrase.includes("one's")) {
            const pronouns = ['my', 'your', 'his', 'her', 'its', 'our', 'their'];
            pronouns.forEach(pronoun => {
                variations.push(originalPhrase.replace("one's", pronoun));
            });
        }
        
        if (originalPhrase.includes("sth.")) {
            variations.push(originalPhrase.replace(" sth.", ""));
            variations.push(originalPhrase.replace("sth.", "something"));
            variations.push(originalPhrase.replace("sth.", ""));
        }
        
        if (originalPhrase === "all the time") {
            variations.push("all the time");
            variations.push("all times");
        }
        
        return variations;
    }
    
    const phraseVariations = getPhraseVariations(targetPhrase);
    const lowerText = text.toLowerCase();
    
    let bestMatch = null;
    let bestMatchIndex = -1;
    let bestMatchLength = 0;
    
    for (const variation of phraseVariations) {
        const index = lowerText.indexOf(variation);
        if (index !== -1 && variation.length > bestMatchLength) {
            bestMatch = variation;
            bestMatchIndex = index;
            bestMatchLength = variation.length;
        }
    }
    
    if (bestMatchIndex === -1) {
        const originalWords = targetPhrase.toLowerCase().split(/\s+/);
        
        if (targetPhrase.toLowerCase() === "all the time") {
            const allTimeRegex = /\ball\s+the\s+time\b/i;
            const match = allTimeRegex.exec(text);
            if (match) {
                bestMatch = match[0];
                bestMatchIndex = match.index;
                bestMatchLength = match[0].length;
            }
        }
        
        if (targetPhrase.toLowerCase().includes("make a/the difference")) {
            const differenceRegex = /\bmake\s+a\s+difference\b|\bmake\s+the\s+difference\b|\bmakes?\s+a\s+difference\b|\bmakes?\s+the\s+difference\b|\bmade\s+a\s+difference\b|\bmade\s+the\s+difference\b/i;
            const match = differenceRegex.exec(text);
            if (match) {
                bestMatch = match[0];
                bestMatchIndex = match.index;
                bestMatchLength = match[0].length;
            }
        }
        
        if (targetPhrase.toLowerCase().includes("be in the same boat")) {
            const boatRegex = /\b(?:am|is|are|was|were|been|being)\s+in\s+the\s+same\s+boat\b/i;
            const match = boatRegex.exec(text);
            if (match) {
                bestMatch = match[0];
                bestMatchIndex = match.index;
                bestMatchLength = match[0].length;
            }
        }
        
        if (targetPhrase.toLowerCase().includes("go for")) {
            const goForRegex = /\b(?:go|goes|went|going|gone)\s+for\b/i;
            const match = goForRegex.exec(text);
            if (match) {
                bestMatch = match[0];
                bestMatchIndex = match.index;
                bestMatchLength = match[0].length;
            }
        }
        
        if (targetPhrase.toLowerCase().includes("have one's back")) {
            const haveBackRegex = /\b(?:have|has|had|having)\s+(?:my|your|his|her|its|our|their)\s+back\b/i;
            const match = haveBackRegex.exec(text);
            if (match) {
                bestMatch = match[0];
                bestMatchIndex = match.index;
                bestMatchLength = match[0].length;
            }
        }
        
        if (bestMatchIndex === -1 && originalWords.length >= 2 && 
            (originalWords[originalWords.length-1] === 'up' || 
             originalWords[originalWords.length-1] === 'down' ||
             originalWords[originalWords.length-1] === 'in' ||
             originalWords[originalWords.length-1] === 'out' ||
             originalWords[originalWords.length-1] === 'off' ||
             originalWords[originalWords.length-1] === 'on')) {
            
            const verb = originalWords[0];
            const particle = originalWords[originalWords.length-1];
            
            const verbIndex = lowerText.indexOf(verb);
            const particleIndex = lowerText.indexOf(particle, verbIndex + 1);
            
            if (verbIndex !== -1 && particleIndex !== -1 && 
                particleIndex - verbIndex < 30) {
                return processTextWithSeparatedPhraseVerb(text, verb, particle, verbIndex, particleIndex);
            }
        }
    }
    
    if (bestMatchIndex === -1) {
        return processWithKeywordHighlighting(text, targetPhrase);
    }
    
    const actualPhrase = text.substring(bestMatchIndex, bestMatchIndex + bestMatchLength);
    const beforePhrase = text.substring(0, bestMatchIndex);
    const afterPhrase = text.substring(bestMatchIndex + bestMatchLength);
    
    let beforeHtml = '';
    if (beforePhrase) {
        const beforeWords = beforePhrase.match(/[\w']+|[.,!?;]|\s+/g) || [];
        beforeHtml = beforeWords.map((word, index) => {
            const isSpace = /^\s+$/.test(word);
            if (isSpace) return ' ';
            return `<span data-index="${index}">${word}</span>`;
        }).join('');
    }
    
    const phraseHtml = `<span class="highlight-word" style="font-weight: 700;">${actualPhrase}</span>`;
    
    let afterHtml = '';
    if (afterPhrase) {
        const afterWords = afterPhrase.match(/[\w']+|[.,!?;]|\s+/g) || [];
        
        afterHtml = afterWords.map((word, index) => {
            const isSpace = /^\s+$/.test(word);
            if (isSpace) return ' ';
            return `<span data-index="${index + beforePhrase.split(/\s+/).length + actualPhrase.split(/\s+/).length}">${word}</span>`;
        }).join('');
    }
    
    return beforeHtml + phraseHtml + afterHtml;
}

function processTextWithSeparatedPhraseVerb(text, verb, particle, verbIndex, particleIndex) {
    const words = text.match(/[\w']+|[.,!?;]|\s+/g) || [];
    let result = '';
    let currentIndex = 0;
    let verbHighlighted = false;
    let particleHighlighted = false;
    
    words.forEach((word, index) => {
        const cleanWord = word.trim().toLowerCase().replace(/[.,!?;]$/, '');
        const isPunctuation = /^[.,!?;]$/.test(word);
        const isSpace = /^\s+$/.test(word);
        
        if (isSpace) {
            result += ' ';
            return;
        }
        
        const wordStartIndex = text.toLowerCase().indexOf(cleanWord, currentIndex);
        const isVerb = !verbHighlighted && 
                       cleanWord === verb.toLowerCase() && 
                       Math.abs(wordStartIndex - verbIndex) < 3;
        
        const isParticle = !particleHighlighted && 
                         cleanWord === particle.toLowerCase() && 
                         Math.abs(wordStartIndex - particleIndex) < 3;
        
        if (isVerb) {
            result += `<span data-index="${index}" class="highlight-word">${word}</span>`;
            verbHighlighted = true;
        } else if (isParticle) {
            result += `<span data-index="${index}" class="highlight-word">${word}</span>`;
            particleHighlighted = true;
        } else {
            result += `<span data-index="${index}">${word}</span>`;
        }
        
        if (!isSpace) {
            currentIndex = wordStartIndex + cleanWord.length;
        }
    });
    
    return result;
}

function processWithKeywordHighlighting(text, targetPhrase) {
    const words = text.match(/[\w']+|[.,!?;]|\s+/g) || [];
    let phraseWords = targetPhrase.toLowerCase()
                      .replace(/a\/the/g, '')
                      .replace(/sth\./g, '')
                      .replace(/one's/g, '')
                      .replace(/\s+/g, ' ')
                      .trim()
                      .split(/\s+/)
                      .filter(word => word.length > 0);
    
    const keywordsMap = {
        "be in the same boat": ["boat", "same"],
        "make a/the difference": ["difference"],
        "go for sth": ["went", "for"],
        "give up": ["give", "gives", "giving", "gave", "up"],
        "have one's back": ["back"],
        "all the time": ["time"]
    };
    
    let keywordsToHighlight = [];
    for (const [phrase, keywords] of Object.entries(keywordsMap)) {
        if (targetPhrase.toLowerCase().includes(phrase) || 
            phrase.includes(targetPhrase.toLowerCase())) {
            keywordsToHighlight = keywords;
            break;
        }
    }
    
    if (keywordsToHighlight.length === 0) {
        keywordsToHighlight = phraseWords.filter(word => 
            word.length > 3 || 
            ['up', 'in', 'on', 'for', 'the', 'off', 'out', 'down'].includes(word)
        );
    }
    
    return words.map((word, index) => {
        const cleanWord = word.trim().toLowerCase().replace(/[.,!?;]$/, '');
        const isPunctuation = /^[.,!?;]$/.test(word);
        const isSpace = /^\s+$/.test(word);
        
        if (isSpace) return ' ';
        
        const isKeyword = keywordsToHighlight.includes(cleanWord);
        
        return `<span 
            data-index="${index}" 
            class="${isKeyword ? 'highlight-word' : ''}"
            ${isPunctuation ? 'style="margin-left: -2px;"' : ''}
        >${word}</span>`;
    }).join('');
}

// ===== 語音合成函數 =====
function getVoiceSettings() {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const voices = speechSynthesis.getVoices();
    
    const selectedVoice = isIOS ? 
        voices.find(voice => 
            voice.lang === 'en-US' && 
            (voice.name.includes('Samantha') || voice.name.includes('Karen'))
        ) || voices.find(voice => 
            voice.lang === 'en-US'
        ) :
        voices.find(voice => 
            voice.lang === 'en-US' && 
            voice.name.includes('Google')
        ) || voices.find(voice => 
            voice.lang === 'en-US'
        );

    return {
        voice: selectedVoice,
        lang: 'en-US',
        pitch: isIOS ? 1.1 : 1.0,
        rate: isIOS ? 0.9 : 0.8
    };
}

async function speak(text, options = {}) {
    return new Promise((resolve, reject) => {
        const utterance = new SpeechSynthesisUtterance(text);
        Object.assign(utterance, getVoiceSettings(), options);
        utterance.onend = resolve;
        utterance.onerror = reject;
        speechSynthesis.speak(utterance);
    });
}

function stopSpeaking() {
    window.speechSynthesis.cancel();
}

async function playCardAudio() {
    const currentWord = vocabularyData[currentCategory][currentWordIndex];
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const voiceSettings = getVoiceSettings();

    if (currentCard === 0) {
        return playAudio();
    } else if (currentCard === 1) {
        return speak(currentWord.word, voiceSettings);
    } else if (currentCard === 2 || currentCard === 3) {
        const exampleDisplay = currentCard === 2 ? 
            document.getElementById('exampleDisplay') : 
            document.getElementById('exampleDisplay2');
        
        let exampleText = '';
        
        if (currentWord.examples && currentWord.examples.length > 0) {
            const exampleIndex = currentCard === 2 ? 0 : 1;
            if (currentWord.examples.length > exampleIndex) {
                exampleText = currentWord.examples[exampleIndex].sentence;
            }
        } else if (currentCard === 2 && currentWord.example) {
            exampleText = currentWord.example;
        }
        
        if (!exampleText) return Promise.resolve();

        return new Promise((resolve) => {
            const utterance = new SpeechSynthesisUtterance(exampleText);
            Object.assign(utterance, voiceSettings);

            utterance.rate = isIOS ? 0.75 : 0.7;
            
            if (isIOS) {
                utterance.pitch = 1.1;
            }

            let lastHighlightedIndex = -1;
            let pendingHighlight = null;

            utterance.onboundary = function(event) {
                if (event.name === 'word') {
                    if (pendingHighlight) {
                        clearTimeout(pendingHighlight);
                    }
                    
                    pendingHighlight = setTimeout(() => {
                        requestAnimationFrame(() => {
                            if (lastHighlightedIndex >= 0) {
                                const prevWord = exampleDisplay.querySelector(`span[data-index="${lastHighlightedIndex}"]`);
                                if (prevWord && !prevWord.classList.contains('highlight-word')) {
                                    prevWord.classList.remove('highlight');
                                }
                            }

                            const spans = exampleDisplay.querySelectorAll('span');
                            let bestSpan = null;
                            let minDistance = Infinity;
                            let charCount = 0;
                            
                            for (let i = 0; i < spans.length; i++) {
                                const span = spans[i];
                                const spanLength = span.textContent.length;
                                
                                const startDist = Math.abs(charCount - event.charIndex);
                                const endDist = Math.abs(charCount + spanLength - event.charIndex);
                                
                                if (startDist < minDistance || endDist < minDistance) {
                                    minDistance = Math.min(startDist, endDist);
                                    bestSpan = span;
                                }
                                
                                charCount += spanLength + 1;
                            }

                            if (bestSpan) {
                                bestSpan.classList.add('highlight');
                                lastHighlightedIndex = bestSpan.dataset.index;
                                
                                if (exampleDisplay.scrollHeight > exampleDisplay.clientHeight) {
                                    bestSpan.scrollIntoView({
                                        behavior: 'smooth',
                                        block: 'center',
                                        inline: 'nearest'
                                    });
                                }
                            }
                        });
                    }, 50);
                }
            };

            utterance.onend = function() {
                exampleDisplay.querySelectorAll('span').forEach(span => {
                    if (!span.classList.contains('highlight-word')) {
                        span.classList.remove('highlight');
                    }
                });
                resolve();
            };

            utterance.onerror = function(event) {
                console.error('Speech synthesis error:', event);
                exampleDisplay.querySelectorAll('span:not(.highlight-word)').forEach(span => {
                    span.classList.remove('highlight');
                });
                resolve();
            };

            speechSynthesis.speak(utterance);
        });
    }
    
    return Promise.resolve();
}

async function playAudio() {
    const currentWord = vocabularyData[currentCategory][currentWordIndex];
    const wordDisplay = document.getElementById('wordDisplay');
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    
    const voices = speechSynthesis.getVoices();
    const selectedVoice = isIOS ? 
        voices.find(voice => 
            voice.lang === 'en-US' && 
            (voice.name.includes('Samantha') || voice.name.includes('Karen'))
        ) || voices.find(voice => 
            voice.lang === 'en-US'
        ) :
        voices.find(voice => 
            voice.lang === 'en-US' && 
            voice.name.includes('Google')
        ) || voices.find(voice => 
            voice.lang === 'en-US'
        );

    const voiceSettings = {
        voice: selectedVoice,
        lang: 'en-US',
        pitch: isIOS ? 1.1 : 1.0,
    };
    
    wordDisplay.textContent = currentWord.word;
    await speak(currentWord.word, { 
        ...voiceSettings, 
        rate: isIOS ? 0.9 : 0.8 
    });

    if (currentCategory === 'idioms') {
        wordDisplay.innerHTML = `
            <div class="syllables-container" style="
                display: flex;
                justify-content: center;
                align-items: center;
                flex-wrap: nowrap;
                width: 100%;
                padding: 0 10px;
                gap: 2px;
                height: 100%;
            ">
            </div>`;
        const container = wordDisplay.querySelector('.syllables-container');
        
        const words = currentWord.word.split(' ');
        words.forEach((word, index) => {
            container.innerHTML += `
                <span class="syllable" style="
                    display: inline-block;
                    white-space: nowrap;
                    text-align: center;
                    min-width: min-content;
                    flex: 0 1 auto;
                ">${word}</span>`;
            if (index < words.length - 1) {
                container.innerHTML += `
                    <span class="syllable-separator" style="
                        margin: 0 1px;
                        color: #666;
                        flex-shrink: 1;
                    "> </span>`;
            }
        });

        adjustFontSize(container);
        
        const syllables = container.querySelectorAll('.syllable');
        const baseDelay = isIOS ? 500 : 400;
        
        const slowSpeechPromise = new Promise(resolve => {
            const utterance = new SpeechSynthesisUtterance(currentWord.word);
            Object.assign(utterance, {
                ...voiceSettings,
                rate: isIOS ? 0.25 : 0.3,
                pitch: isIOS ? 1.1 : 1.0
            });
            utterance.onend = resolve;
            
            setTimeout(() => {
                speechSynthesis.speak(utterance);
            }, 100);
        });

        for (let i = 0; i < words.length; i++) {
            syllables.forEach((s, index) => {
                s.classList.toggle('highlight', index === i);
            });
            await new Promise(resolve => setTimeout(resolve, baseDelay));
        }

        await slowSpeechPromise;
        
        wordDisplay.textContent = currentWord.word;
        await speak(currentWord.word, { 
            ...voiceSettings, 
            rate: isIOS ? 0.9 : 0.8 
        });
        return;
    }
    
    wordDisplay.innerHTML = `
        <div class="syllables-container" style="
            display: flex;
            justify-content: center;
            align-items: center;
            flex-wrap: nowrap;
            width: 100%;
            padding: 0 10px;
            gap: 2px;
            height: 100%;
        ">
        </div>`;
    const container = wordDisplay.querySelector('.syllables-container');
    
    currentWord.syllables.forEach((syllable, index) => {
        container.innerHTML += `
            <span class="syllable" style="
                display: inline-block;
                white-space: nowrap;
                text-align: center;
                min-width: min-content;
                flex: 0 1 auto;
            ">${syllable}</span>`;
        if (index < currentWord.syllables.length - 1) {
            container.innerHTML += `
                <span class="syllable-separator" style="
                    margin: 0 1px;
                    color: #666;
                    flex-shrink: 1;
                ">．</span>`;
        }
    });

    adjustFontSize(container);
    
    const syllables = container.querySelectorAll('.syllable');
    
    const baseDelay = isIOS ? 500 : 400;
    const syllableDurations = currentWord.syllables.map(syllable => 
        Math.max(baseDelay, Math.round((syllable.length / currentWord.word.length) * baseDelay * 2))
    );
    
    const totalDuration = syllableDurations.reduce((sum, duration) => sum + duration, 0);
    const rateAdjustment = isIOS ? 0.25 : 0.3;
    
    const slowSpeechPromise = new Promise(resolve => {
        const utterance = new SpeechSynthesisUtterance(currentWord.word);
        Object.assign(utterance, {
            ...voiceSettings,
            rate: rateAdjustment,
            pitch: isIOS ? 1.1 : 1.0
        });
        utterance.onend = resolve;
        
        setTimeout(() => {
            speechSynthesis.speak(utterance);
        }, 100);
    });

    let currentDelay = 0;
    for (let i = 0; i < currentWord.syllables.length; i++) {
        syllables.forEach((s, index) => {
            s.classList.toggle('highlight', index === i);
        });
        
        await new Promise(resolve => setTimeout(resolve, syllableDurations[i]));
        currentDelay += syllableDurations[i];
    }

    await slowSpeechPromise;
    
    wordDisplay.textContent = currentWord.word;
    await speak(currentWord.word, { 
        ...voiceSettings, 
        rate: isIOS ? 0.9 : 0.8,
        pitch: isIOS ? 1.1 : 1.0 
    });
}

function adjustFontSize(container) {
    const maxFontSize = 36;
    const minFontSize = 16;
    let fontSize = maxFontSize;
    const syllables = container.querySelectorAll('.syllable');
    
    container.style.display = 'flex';
    container.style.justifyContent = 'center';
    container.style.alignItems = 'center';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.padding = '0 10px';
    container.style.boxSizing = 'border-box';
    container.style.margin = '0';
    container.style.overflow = 'hidden';
    
    container.style.fontSize = `${fontSize}px`;
    
    while (fontSize > minFontSize && 
           (container.scrollWidth > container.offsetWidth || 
            container.scrollHeight > container.offsetHeight)) {
        fontSize -= 1;
        container.style.fontSize = `${fontSize}px`;
    }
    
    syllables.forEach(syllable => {
        syllable.style.display = 'inline-block';
        syllable.style.padding = '0 2px';
        syllable.style.whiteSpace = 'nowrap';
        syllable.style.textAlign = 'center';
    });

    const separators = container.querySelectorAll('.syllable-separator');
    separators.forEach(separator => {
        separator.style.padding = '0';
        separator.style.margin = '0 1px';
    });

    if (container.scrollWidth > container.offsetWidth) {
        separators.forEach(separator => {
            separator.style.margin = '0';
        });
        container.style.letterSpacing = '-0.5px';
    }
}

// ===== 語音識別初始化 =====
function initializeSpeechRecognition() {
    try {
        // 檢查瀏覽器支援度
        window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        
        if (!window.SpeechRecognition) {
            console.error('此瀏覽器不支援語音識別 API');
            showBrowserCompatibilityWarning();
            return false;
        }

        // 停止現有的語音識別
        if (window.recognition) {
            try {
                window.recognition.abort();
                window.recognition = null;
            } catch (e) {
                console.warn('停止現有語音識別時出錯:', e);
            }
        }

        // 創建新的語音識別實例
        window.recognition = new window.SpeechRecognition();
        
        // 設定語音識別參數
        window.recognition.lang = 'en-US';
        window.recognition.interimResults = true;
        window.recognition.maxAlternatives = 3;
        window.recognition.continuous = false;
        
        let finalTranscript = '';
        let interimTranscript = '';
        
        // 設定事件處理器
        window.recognition.onstart = function() {
            console.log('語音識別已啟動');
            window.isRecording = true;
        };
        
        window.recognition.onresult = function(event) {
            console.log('收到語音識別結果', event);
            
            interimTranscript = '';
            
            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcript = event.results[i][0].transcript;
                
                if (event.results[i].isFinal) {
                    finalTranscript += transcript;
                    handleSpeechResult(event);
                } else {
                    interimTranscript += transcript;
                    updateInterimFeedback(interimTranscript);
                }
            }
        };
        
        window.recognition.onerror = function(error) {
            console.error('語音識別錯誤:', error);
            handleSpeechError(error);
        };
        
        window.recognition.onend = function() {
            console.log('語音識別結束');
            handleSpeechEnd();
        };
        
        console.log('語音識別引擎已成功初始化');
        return true;
        
    } catch (error) {
        console.error('初始化語音識別時發生錯誤:', error);
        showBrowserCompatibilityWarning();
        return false;
    }
}

function showBrowserCompatibilityWarning() {
    const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
    const isEdge = navigator.userAgent.toLowerCase().indexOf('edge') > -1;
    
    let message = '語音識別功能在此瀏覽器中不支援或有限制。\n\n';
    
    if (isFirefox) {
        message += '建議使用 Chrome 或 Safari 瀏覽器以獲得最佳體驗。';
    } else if (isEdge) {
        message += 'Microsoft Edge 的語音識別功能可能無法正常運作，建議使用 Chrome 瀏覽器。';
    } else {
        message += '請確認：\n1. 使用 Chrome 或 Safari 瀏覽器\n2. 網站使用 HTTPS 協定\n3. 已授予麥克風權限';
    }
    
    console.warn(message);
    
    // 隱藏語音練習按鈕
    const speechIcons = document.querySelectorAll('.speech-icon');
    speechIcons.forEach(icon => {
        icon.style.display = 'none';
    });
}


// ===== 語音識別控制函數 =====
function showSpeechRecognitionModal() {
    stopRecording();
    window.isRecording = false;
    window.isRecordingActive = false;
    window.isToggling = false;
    
    const modal = document.getElementById('speechRecognitionModal');
    const targetDisplay = modal.querySelector('.target-word');
    
    const resultDisplay = modal.querySelector('.recognition-result');
    const scoreDisplay = modal.querySelector('.accuracy-score');
    const oldSyllableFeedback = modal.querySelector('.syllable-feedback');
    
    resultDisplay.textContent = '';
    scoreDisplay.textContent = '';
    scoreDisplay.className = 'accuracy-score';
    
    if (oldSyllableFeedback) {
        oldSyllableFeedback.remove();
    }
    
    const recordButton = document.getElementById('recordButton');
    if (recordButton) {
        recordButton.classList.remove('recording');
        const textEl = recordButton.querySelector('.record-text');
        if (textEl) textEl.textContent = '點擊開始錄音';
    }
    
    let targetText = '';
    if (currentCard === 1) {
        targetText = vocabularyData[currentCategory][currentWordIndex].word;
    } else {
        if (vocabularyData[currentCategory][currentWordIndex].examples) {
            const exampleIndex = currentCard === 2 ? 0 : 1;
            if (vocabularyData[currentCategory][currentWordIndex].examples.length > exampleIndex) {
                targetText = vocabularyData[currentCategory][currentWordIndex].examples[exampleIndex].sentence;
            }
        } else if (currentCard === 2 && vocabularyData[currentCategory][currentWordIndex].example) {
            targetText = vocabularyData[currentCategory][currentWordIndex].example;
        }
    }
    
    targetDisplay.textContent = targetText;
    
    createWaveform();
    
    modal.style.display = 'block';
    
    setupModalCloseButton();
}

function toggleRecording(button) {
    if (window.isToggling) {
        console.log('正在處理中，忽略重複點擊');
        return;
    }
    
    window.isToggling = true;
    
    setTimeout(() => {
        window.isToggling = false;
    }, 300);
    
    if (!window.isRecordingActive) {
        console.log('開始錄音...');
        window.isRecordingActive = true;
        window.manualStop = false;
        
        button.classList.add('recording');
        const textEl = button.querySelector('.record-text');
        if (textEl) textEl.textContent = '點擊停止錄音';
        
        const resultDisplay = document.querySelector('.recognition-result');
        const scoreDisplay = document.querySelector('.accuracy-score');
        if (resultDisplay) resultDisplay.textContent = '請開始說話...';
        if (scoreDisplay) scoreDisplay.textContent = '';
        
        const oldSyllableFeedback = document.querySelector('.syllable-feedback');
        if (oldSyllableFeedback) {
            oldSyllableFeedback.remove();
        }
        
        if (initializeSpeechRecognition()) {
            startRecording();
        } else {
            console.error('無法初始化語音識別');
            window.isRecordingActive = false;
            window.isToggling = false;
            button.classList.remove('recording');
            if (textEl) textEl.textContent = '點擊開始錄音';
            alert('無法啟動語音識別，請確認瀏覽器支援此功能並授予麥克風權限');
        }
    } else {
        console.log('停止錄音...');
        window.isRecordingActive = false;
        button.classList.remove('recording');
        const textEl = button.querySelector('.record-text');
        if (textEl) textEl.textContent = '點擊開始錄音';
        
        window.manualStop = true;
        
        const resultDisplay = document.querySelector('.recognition-result');
        if (resultDisplay) {
            resultDisplay.textContent = '正在處理您的語音...';
        }
        
        stopRecording();
    }
}

function startRecording() {
    console.log('嘗試開始錄音...');
    
    if (!window.recognition) {
        console.error('語音辨識未初始化');
        alert('語音辨識未初始化，請重新載入頁面');
        window.isRecordingActive = false;
        window.isToggling = false;
        return;
    }
    
    window.isRecording = true;
    
    createWaveform();
    startWaveformAnimation();
    
    try {
        window.recognition.start();
        console.log('語音辨識已啟動');
} catch (error) {
    console.error('無法啟動語音辨識:', error);
    
    window.isRecording = false;
    window.isRecordingActive = false;
    window.isToggling = false;
    
    const speechBtn = document.getElementById('recordButton');
    if (speechBtn) {
        speechBtn.classList.remove('recording');
        const textEl = speechBtn.querySelector('.record-text');
        if (textEl) textEl.textContent = '點擊開始錄音';
    }
    
    stopWaveformAnimation();
    
    // 更詳細的錯誤處理
    if (error.name === 'NotAllowedError') {
        alert('請允許使用麥克風權限：\n1. 點擊網址列的麥克風圖示\n2. 選擇「允許」\n3. 重新載入頁面');
    } else if (error.name === 'NotSupportedError') {
        alert('您的瀏覽器不支援語音識別功能，請使用 Chrome 瀏覽器。');
    } else if (error.name === 'AbortError') {
        console.log('語音識別被中止');
    } else {
        alert('語音辨識啟動失敗：' + (error.message || '未知錯誤') + '\n\n請確認：\n1. 使用 Chrome 瀏覽器\n2. 網站使用 HTTPS\n3. 已授予麥克風權限');
    }
}
}

function stopRecording() {
    console.log('嘗試停止錄音...');
    
    if (window.recognition) {
        try {
            window.recognition.stop();
            console.log('語音識別已停止');
            
            window.manualStop = true;
            
            setTimeout(() => {
                if (window.manualStop) {
                    console.log('語音識別結果延遲，手動處理');
                    window.manualStop = false;
                    
                    const resultDisplay = document.querySelector('.recognition-result');
                    if (resultDisplay) {
                        resultDisplay.textContent = '正在處理您的語音...';
                    }
                }
            }, 1000);
            
        } catch (error) {
            console.warn('停止語音識別時出現警告:', error);
            
            try {
                window.recognition.abort();
            } catch (e) {
                console.warn('中止語音識別時出現警告:', e);
            }
        }
    }
    
    stopWaveformAnimation();
    window.isRecording = false;
}

// ===== 語音識別事件處理 =====
function handleSpeechResult(event) {
    window.manualStop = false;
    
    isRecording = false;
    stopWaveformAnimation();
    
    const speechBtn = document.getElementById('recordButton');
    speechBtn.classList.remove('recording');
    speechBtn.querySelector('.record-text').textContent = '點擊開始錄音';
    
    const resultDisplay = document.querySelector('.recognition-result');
    const scoreDisplay = document.querySelector('.accuracy-score');
    
    if (event.results && event.results.length > 0 && event.results[0].length > 0) {
        const transcript = event.results[0][0].transcript.toLowerCase().trim();
        const confidence = event.results[0][0].confidence;
        
        console.log('識別到的文字:', transcript);
        console.log('識別置信度:', confidence);
        
        resultDisplay.textContent = `您說的是: "${transcript}"`;
        
        let targetText = '';
        if (currentCard === 1) {
            targetText = vocabularyData[currentCategory][currentWordIndex].word.toLowerCase();
        } else {
            if (vocabularyData[currentCategory][currentWordIndex].examples) {
                const exampleIndex = currentCard === 2 ? 0 : 1;
                if (vocabularyData[currentCategory][currentWordIndex].examples.length > exampleIndex) {
                    targetText = vocabularyData[currentCategory][currentWordIndex].examples[exampleIndex].sentence.toLowerCase();
                }
            } else if (currentCard === 2 && vocabularyData[currentCategory][currentWordIndex].example) {
                targetText = vocabularyData[currentCategory][currentWordIndex].example.toLowerCase();
            }
        }
        
        const comprehensiveScore = calculateComprehensiveScore(transcript, targetText, confidence);
        const percentScore = Math.round(comprehensiveScore * 100);

        let scoreClass = 'low';
        let feedback = '';
        if (percentScore >= 85) {
            scoreClass = 'high';
            feedback = '太棒了！';
        } else if (percentScore >= 70) {
            scoreClass = 'medium';
            feedback = '不錯，再試一次！';
        } else {
            scoreClass = 'low';
            feedback = '繼續練習！';
        }

        scoreDisplay.innerHTML = `<div class="accuracy-score ${scoreClass}">${percentScore}%</div>
                                 <div class="score-feedback">${feedback}</div>`;
        
        addSyllableFeedback(transcript);
    } else {
        resultDisplay.textContent = '未能識別您的語音，請再試一次';
        scoreDisplay.textContent = '';
        scoreDisplay.className = 'accuracy-score';
    }
}

function handleSpeechError(event) {
    console.error('語音辨識錯誤:', event.error);
    
    window.isRecording = false;
    window.isRecordingActive = false;
    window.isToggling = false;
    
    stopWaveformAnimation();
    
    const speechBtn = document.getElementById('recordButton');
    if (speechBtn) {
        speechBtn.classList.remove('recording');
        const textEl = speechBtn.querySelector('.record-text');
        if (textEl) textEl.textContent = '點擊開始錄音';
    }
    
    const resultDisplay = document.querySelector('.recognition-result');
    if (resultDisplay) {
        resultDisplay.textContent = '無法辨識您的語音，請再試一次';
    }
}

function handleSpeechEnd() {
    console.log('語音識別自然結束');
    
    if (window.manualStop) {
        console.log('語音識別結束但沒有結果');
        
        const resultDisplay = document.querySelector('.recognition-result');
        if (resultDisplay) {
            resultDisplay.textContent = '沒有收到語音輸入，請再試一次';
        }
        
        window.manualStop = false;
    }
    
    window.isRecording = false;
    window.isRecordingActive = false;
    
    stopWaveformAnimation();
    
    const speechBtn = document.getElementById('recordButton');
    if (speechBtn) {
        speechBtn.classList.remove('recording');
        const textEl = speechBtn.querySelector('.record-text');
        if (textEl) textEl.textContent = '點擊開始錄音';
    }
}

function updateInterimFeedback(interimText) {
    const resultDisplay = document.querySelector('.recognition-result');
    if (resultDisplay && interimText) {
        resultDisplay.innerHTML = `<span style="opacity: 0.7">正在聆聽: "${interimText}"</span>`;
    }
}

// ===== 評分函數 =====
function calculateSimilarity(str1, str2) {
    const track = Array(str2.length + 1).fill(null).map(() => 
        Array(str1.length + 1).fill(null));
    
    for (let i = 0; i <= str1.length; i += 1) {
        track[0][i] = i;
    }
    
    for (let j = 0; j <= str2.length; j += 1) {
        track[j][0] = j;
    }
    
    for (let j = 1; j <= str2.length; j += 1) {
        for (let i = 1; i <= str1.length; i += 1) {
            const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
            track[j][i] = Math.min(
                track[j][i - 1] + 1,
                track[j - 1][i] + 1,
                track[j - 1][i - 1] + indicator,
            );
        }
    }
    
    const maxLength = Math.max(str1.length, str2.length);
    if (maxLength === 0) return 1.0;
    
    return 1 - (track[str2.length][str1.length] / maxLength);
}

function calculatePhoneticScore(recognized, target) {
    const recLower = recognized.toLowerCase();
    const tarLower = target.toLowerCase();
    
    if (recLower === tarLower) return 1.0;
    
    let phoneticBonus = 0;
    
    for (let i = 0; i < Math.min(recLower.length, tarLower.length); i++) {
        const recChar = recLower[i];
        const tarChar = tarLower[i];
        
        for (const [key, similar] of Object.entries(phoneticSimilarityMap)) {
            if (tarChar === key || similar.includes(tarChar)) {
                if (recChar === key || similar.includes(recChar)) {
                    phoneticBonus += 0.1;
                }
            }
        }
    }
    
    return Math.min(phoneticBonus, 0.3);
}

function calculateComprehensiveScore(recognized, target, confidence) {
    const textSimilarity = calculateSimilarity(target, recognized) * 0.4;
    const phoneticScore = calculatePhoneticScore(recognized, target) * 0.3;
    const confidenceScore = (confidence || 0.5) * 0.3;
    
    const lengthRatio = Math.min(recognized.length, target.length) / 
                       Math.max(recognized.length, target.length);
    const lengthPenalty = lengthRatio < 0.5 ? -0.1 : 0;
    
    const totalScore = textSimilarity + phoneticScore + confidenceScore + lengthPenalty;
    return Math.max(0, Math.min(1, totalScore));
}

function addSyllableFeedback(transcript) {
    const currentWord = vocabularyData[currentCategory][currentWordIndex];
    
    // 為單字卡片添加音節反饋
    if (currentCard === 1 && currentWord.syllables) {
        addWordSyllableFeedback(transcript, currentWord);
    } 
    // 為例句卡片添加單詞級別反饋
    else if (currentCard === 2 || currentCard === 3) {
        addSentenceFeedback(transcript, currentWord);
    }
}

function addWordSyllableFeedback(transcript, currentWord) {
    const syllablesContainer = document.createElement('div');
    syllablesContainer.className = 'syllable-feedback';
    
    const syllables = currentWord.syllables;
    const pronunciationGuide = currentWord.pronunciationGuide || [];
    
    const transcriptLower = transcript.toLowerCase();
    let matchResults = [];
    
    syllables.forEach((syllable, index) => {
        const syllableLower = syllable.toLowerCase();
        let matchScore = 0;
        
        if (transcriptLower.includes(syllableLower)) {
            matchScore = 1;
        } else {
            let matchCount = 0;
            for (let i = 0; i < syllableLower.length; i++) {
                if (transcriptLower.includes(syllableLower[i])) {
                    matchCount++;
                }
            }
            matchScore = matchCount / syllableLower.length;
        }
        
        matchResults.push(matchScore);
    });
    
    syllables.forEach((syllable, index) => {
        const syllableSpan = document.createElement('span');
        syllableSpan.className = 'syllable-item';
        syllableSpan.textContent = syllable;
        
        const score = matchResults[index];
        if (score >= 0.8) {
            syllableSpan.classList.add('correct');
        } else if (score >= 0.5) {
            syllableSpan.classList.add('partial');
        } else {
            syllableSpan.classList.add('incorrect');
        }
        
        if (pronunciationGuide[index]) {
            syllableSpan.title = `[${pronunciationGuide[index]}]`;
        }
        
        syllableSpan.style.animationDelay = `${index * 0.1}s`;
        syllableSpan.style.opacity = '0';
        
        syllablesContainer.appendChild(syllableSpan);
        
        setTimeout(() => {
            syllableSpan.style.opacity = '1';
            syllableSpan.style.transform = 'scale(1)';
        }, index * 100);
    });
    
    const oldSyllableFeedback = document.querySelector('.syllable-feedback');
    if (oldSyllableFeedback) {
        oldSyllableFeedback.remove();
    }
    
    document.querySelector('.speech-feedback').appendChild(syllablesContainer);
}

function addSentenceFeedback(transcript, currentWord) {
    // 獲取目標例句
    let targetSentence = '';
    if (currentWord.examples && currentWord.examples.length > 0) {
        const exampleIndex = currentCard === 2 ? 0 : 1;
        if (currentWord.examples.length > exampleIndex) {
            targetSentence = currentWord.examples[exampleIndex].sentence;
        }
    } else if (currentCard === 2 && currentWord.example) {
        targetSentence = currentWord.example;
    }
    
    if (!targetSentence) return;
    
    // 創建句子反饋容器
    const sentenceFeedbackContainer = document.createElement('div');
    sentenceFeedbackContainer.className = 'sentence-feedback';
    
    // 分析句子中的單詞
    const targetWords = targetSentence.toLowerCase()
        .replace(/[.,!?;]/g, '') // 移除標點符號
        .split(/\s+/)
        .filter(word => word.length > 0);
    
    const spokenWords = transcript.toLowerCase()
        .replace(/[.,!?;]/g, '')
        .split(/\s+/)
        .filter(word => word.length > 0);
    
    console.log('目標句子單詞:', targetWords);
    console.log('識別的單詞:', spokenWords);
    
    // 創建標題
    const feedbackTitle = document.createElement('div');
    feedbackTitle.className = 'feedback-title';
    feedbackTitle.textContent = '單詞發音分析：';
    sentenceFeedbackContainer.appendChild(feedbackTitle);
    
    // 創建單詞反饋容器
    const wordsContainer = document.createElement('div');
    wordsContainer.className = 'words-feedback-container';
    
    // 分析每個單詞的匹配度
    targetWords.forEach((targetWord, index) => {
        const wordSpan = document.createElement('span');
        wordSpan.className = 'word-feedback-item';
        wordSpan.textContent = targetWord;
        
        // 計算此單詞的匹配度
        let bestMatch = 0;
        let matchedSpokenWord = '';
        
        spokenWords.forEach(spokenWord => {
            const similarity = calculateWordSimilarity(targetWord, spokenWord);
            if (similarity > bestMatch) {
                bestMatch = similarity;
                matchedSpokenWord = spokenWord;
            }
        });
        
        // 根據匹配度設定樣式
        if (bestMatch >= 0.8) {
            wordSpan.classList.add('correct');
            wordSpan.title = `正確！(識別為: ${matchedSpokenWord})`;
        } else if (bestMatch >= 0.5) {
            wordSpan.classList.add('partial');
            wordSpan.title = `部分正確 (識別為: ${matchedSpokenWord})`;
        } else {
            wordSpan.classList.add('incorrect');
            wordSpan.title = bestMatch > 0 ? `需要改進 (識別為: ${matchedSpokenWord})` : '未識別到此單詞';
        }
        
        // 添加動畫延遲
        wordSpan.style.animationDelay = `${index * 0.1}s`;
        wordSpan.style.opacity = '0';
        
        wordsContainer.appendChild(wordSpan);
        
        // 動畫顯示
        setTimeout(() => {
            wordSpan.style.opacity = '1';
            wordSpan.style.transform = 'scale(1)';
        }, index * 150);
    });
    
    sentenceFeedbackContainer.appendChild(wordsContainer);
    
    // 移除舊的反饋
    const oldSentenceFeedback = document.querySelector('.sentence-feedback');
    if (oldSentenceFeedback) {
        oldSentenceFeedback.remove();
    }
    
    document.querySelector('.speech-feedback').appendChild(sentenceFeedbackContainer);
}

function calculateWordSimilarity(word1, word2) {
    if (word1 === word2) return 1.0;
    
    const len1 = word1.length;
    const len2 = word2.length;
    const maxLen = Math.max(len1, len2);
    
    if (maxLen === 0) return 1.0;
    
    // 使用編輯距離算法
    const matrix = [];
    
    for (let i = 0; i <= len1; i++) {
        matrix[i] = [i];
    }
    
    for (let j = 0; j <= len2; j++) {
        matrix[0][j] = j;
    }
    
    for (let i = 1; i <= len1; i++) {
        for (let j = 1; j <= len2; j++) {
            if (word1.charAt(i - 1) === word2.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j] + 1,    // 刪除
                    matrix[i][j - 1] + 1,    // 插入
                    matrix[i - 1][j - 1] + 1 // 替換
                );
            }
        }
    }
    
    const editDistance = matrix[len1][len2];
    return 1 - (editDistance / maxLen);
}


function splitTranscriptBySyllables(transcript, syllables) {
    const result = [];
    let transcriptLower = transcript.toLowerCase();
    
    for (let i = 0; i < syllables.length; i++) {
        const syllable = syllables[i].toLowerCase();
        const index = transcriptLower.indexOf(syllable);
        
        if (index !== -1) {
            result.push({
                syllable: syllable,
                match: true
            });
            transcriptLower = transcriptLower.substring(index + syllable.length);
        } else {
            result.push({
                syllable: syllable,
                match: false
            });
        }
    }
    
    return result;
}

// ===== 波形動畫函數 =====
function createWaveform() {
    const waveformElement = document.querySelector('.waveform');
    waveformElement.innerHTML = '';
    waveformBars = [];
    
    const barCount = 30;
    
    for (let i = 0; i < barCount; i++) {
        const bar = document.createElement('div');
        bar.className = 'wave-bar';
        waveformElement.appendChild(bar);
        waveformBars.push(bar);
    }
}

function startWaveformAnimation() {
    console.log('開始波形動畫');
    const waveformElement = document.querySelector('.waveform');
    if (!waveformElement) {
        console.error('找不到波形容器');
        return;
    }
    
    waveformElement.classList.add('active');
    
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                const analyser = audioContext.createAnalyser();
                const microphone = audioContext.createMediaStreamSource(stream);
                const dataArray = new Uint8Array(analyser.frequencyBinCount);
                
                microphone.connect(analyser);
                analyser.fftSize = 256;
                
                function updateWaveform() {
                    if (!window.isRecording) {
                        stream.getTracks().forEach(track => track.stop());
                        return;
                    }
                    
                    analyser.getByteFrequencyData(dataArray);
                    
                    for (let i = 0; i < window.waveformBars.length; i++) {
                        const barIndex = Math.floor(i * dataArray.length / window.waveformBars.length);
                        const height = Math.max(5, (dataArray[barIndex] / 255) * 40);
                        window.waveformBars[i].style.height = `${height}px`;
                    }
                    
                    window.animationFrameId = requestAnimationFrame(updateWaveform);
                }
                
                updateWaveform();
            })
            .catch(err => {
                console.error('無法獲取麥克風音量:', err);
                startFallbackWaveformAnimation();
            });
    } else {
        startFallbackWaveformAnimation();
    }
}

function startFallbackWaveformAnimation() {
    function updateWaveform() {
        if (!window.isRecording) return;
        
        if (window.waveformBars && window.waveformBars.length > 0) {
            for (let i = 0; i < window.waveformBars.length; i++) {
                const height = Math.floor(Math.random() * 25) + 5;
                window.waveformBars[i].style.height = `${height}px`;
            }
        }
        
        window.animationFrameId = requestAnimationFrame(updateWaveform);
    }
    
    updateWaveform();
}

function stopWaveformAnimation() {
    const waveformElement = document.querySelector('.waveform');
    waveformElement.classList.remove('active');
    
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
    }
    
    waveformBars.forEach(bar => {
        bar.style.height = '5px';
    });
}

function createRipple(event) {
    const button = event.currentTarget;
    
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    const clientX = event.type.includes('touch') ? 
        event.touches[0].clientX : event.clientX;
    const clientY = event.type.includes('touch') ? 
        event.touches[0].clientY : event.clientY;
    
    const rect = button.getBoundingClientRect();
    const left = clientX - rect.left - radius;
    const top = clientY - rect.top - radius;
    
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${left}px`;
    circle.style.top = `${top}px`;
    circle.classList.add('ripple');
    
    const ripple = button.getElementsByClassName('ripple')[0];
    
    if (ripple) {
        ripple.remove();
    }
    
    button.appendChild(circle);
}
// ===== Modal 控制函數 =====
function setupModalCloseButton() {
    const closeButton = document.querySelector('.speech-close');
    const modal = document.getElementById('speechRecognitionModal');
    
    if (closeButton && modal) {
        closeButton.removeEventListener('click', closeSpeechModal);
        closeButton.addEventListener('click', closeSpeechModal);
        console.log('語音模態框關閉按鈕已設置');
    } else {
        console.error('找不到語音模態框或關閉按鈕');
    }
    
    if (modal) {
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeSpeechModal();
            }
        });
    }
}

function closeSpeechModal() {
    const modal = document.getElementById('speechRecognitionModal');
    if (modal) {
        modal.style.display = 'none';
    }
    
    stopRecording();
    stopWaveformAnimation();
    
    const recordButton = document.getElementById('recordButton');
    if (recordButton) {
        recordButton.classList.remove('recording');
        const textEl = recordButton.querySelector('.record-text');
        if (textEl) textEl.textContent = '點擊開始錄音';
    }
    
    window.isRecording = false;
    window.isRecordingActive = false;
    window.isToggling = false;
    
    console.log('語音模態框已關閉');
}

// ===== 觸控事件處理 =====
function handleTouchStart(e) {
    if (e.target.closest('.translation-container')) {
        return;
    }
    touchStartX = e.touches[0].clientX;
}

function handleTouchMove(e) {
    if (e.target.closest('.translation-container')) {
        return;
    }
    touchEndX = e.touches[0].clientX;
}

function handleTouchEnd(e) {
    if (e.target.closest('.translation-container')) {
        return;
    }

    const totalCards = getTotalCards(currentCategory);
    if (touchStartX - touchEndX > 50) {
        if (currentCard < totalCards - 1) {
            changeCard(1);
        }
    }
    if (touchEndX - touchStartX > 50) {
        if (currentCard > 0) {
            changeCard(-1);
        }
    }
    touchStartX = 0;
    touchEndX = 0;
}

// ===== 語音識別按鈕設置 =====
function setupSpeechRecognitionButton() {
    const recordButton = document.getElementById('recordButton');
    if (!recordButton) {
        console.error('找不到錄音按鈕');
        return;
    }
    
    console.log('設置錄音按鈕事件');
    
    recordButton.removeEventListener('click', handleRecordButtonClick);
    recordButton.removeEventListener('mousedown', createRipple);
    recordButton.removeEventListener('touchstart', createRipple);
    
    recordButton.addEventListener('click', handleRecordButtonClick);
    recordButton.addEventListener('touchstart', handleButtonTouchStart, { passive: false });
    recordButton.addEventListener('mousedown', createRipple);
    recordButton.addEventListener('touchstart', createRipple, { passive: true });
    
    improveButtonStyles();
    
    console.log('錄音按鈕事件已設置');
}

function handleRecordButtonClick(e) {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('錄音按鈕被點擊');
    toggleRecording(this);
}

function handleButtonTouchStart(e) {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('錄音按鈕被觸摸');
    toggleRecording(this);
}

function improveButtonStyles() {
    const recordButton = document.getElementById('recordButton');
    if (!recordButton) return;
    
    recordButton.style.cursor = 'pointer';
    recordButton.style.userSelect = 'none';
    recordButton.style.webkitTapHighlightColor = 'rgba(0,0,0,0)';
    
    recordButton.classList.add('touch-feedback');
}

// ===== DOM事件監聽器設置 =====
document.addEventListener('DOMContentLoaded', function() {
    // 類別切換按鈕
    const categoryButtons = document.querySelectorAll('.category-btn');
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            stopSpeaking();
            
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const newCategory = button.dataset.category;
            currentCategory = newCategory;
            currentWordIndex = 0;
            currentCard = 0;
            
            if (currentCategory === 'recognition' && currentCard >= 2) {
                currentCard = 0;
            }
            
            updateCardVisibility();
            updateCardContent();
            updateCardIndicators();
            
            setTimeout(() => {
                playCardAudio();
            }, 100);
            
            adjustWordDisplay();
        });
    });

    // 導航按鈕
    document.getElementById('prevWord').onclick = () => changeWord(-1);
    document.getElementById('nextWord').onclick = () => changeWord(1);
    document.getElementById('wordListBtn').onclick = showWordList;

    // Modal關閉按鈕
    document.querySelector('.close').onclick = function() {
        document.getElementById('wordListModal').style.display = 'none';
    }

    // 觸控事件
    const flashcard = document.getElementById('flashcard');
    flashcard.addEventListener('touchstart', handleTouchStart, false);
    flashcard.addEventListener('touchmove', handleTouchMove, false);
    flashcard.addEventListener('touchend', handleTouchEnd, false);

    // 卡片指示器點擊事件
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            if (index !== currentCard) {
                changeCard(index - currentCard);
            }
        });
    });

    // 設置模態框關閉按鈕
    setupModalCloseButton();
    
    // 設置點擊模態框背景關閉
    const modal = document.getElementById('speechRecognitionModal');
    if (modal) {
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeSpeechModal();
            }
        });
    }
});

// ===== 全域點擊事件 =====
window.onclick = function(event) {
    const modal = document.getElementById('guideModal');
    if (event.target == modal) {
        hideGuide();
    }
}

// ===== 主初始化函數 =====
window.onload = function() {
    try {
        console.log('頁面載入完成');
        
        // 初始化單字卡
        initializeFlashcards();
        
        // 初始化語音合成引擎
        if (window.speechSynthesis) {
            if (speechSynthesis.getVoices().length === 0) {
                speechSynthesis.onvoiceschanged = function() {
                    console.log('語音合成引擎已初始化');
                };
            }
        } else {
            console.warn('瀏覽器不支援語音合成');
        }
        
        // 初始化全局變量
        window.isRecording = false;
        window.isRecordingActive = false;
        window.isToggling = false;
        
        // 請求麥克風權限並初始化語音識別
checkMicrophoneAccess()
    .then(() => {
        console.log('語音功能已準備就緒');
        setupSpeechRecognitionButton();
    })
    .catch(error => {
        console.error('語音功能初始化失敗:', error);
        // 即使語音功能失敗，其他功能仍可正常使用
    });

        // 設置預設分類按鈕
        const categoryButtons = document.querySelectorAll('.category-btn');
        categoryButtons[0].classList.add('active');
        
        // 初始化指示器
        updateCardIndicators();
        
        // 添加觸控事件監聽
        const flashcard = document.getElementById('flashcard');
        flashcard.addEventListener('touchstart', handleTouchStart, false);
        flashcard.addEventListener('touchmove', handleTouchMove, false);
        flashcard.addEventListener('touchend', handleTouchEnd, false);
        
        // 添加指示器點擊事件
        const indicators = document.querySelectorAll('.indicator');
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                if (index !== currentCard) {
                    changeCard(index - currentCard);
                }
            });
        });
        
        // 初始化語音練習按鈕
        setupSpeechRecognitionButton();
        console.log('語音按鈕已設置');
        
    } catch (error) {
        console.error('初始化錯誤:', error);
        alert('頁面初始化出錯: ' + error.message);
    }
};

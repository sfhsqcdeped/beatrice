// ========== PAGE NAVIGATION ==========

function goToPage(pageNumber) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    // Show the target page
    const targetPage = document.getElementById(`page${pageNumber}`);
    if (targetPage) {
        targetPage.classList.add('active');
        window.scrollTo(0, 0);

        // Trigger specific page actions
        if (pageNumber === 1) {
            startFloatingHearts();
        }
        if (pageNumber === 4) {
            playTypewriterEffect();
            letterAnimationEnabled = true;
            document.getElementById('envelopeClickHint').style.display = 'block';
        }
        if (pageNumber === 7) {
            createFloatingHearts();
        }
    }
}

// ========== FLOATING HEARTS ==========

function startFloatingHearts() {
    const container = document.querySelector('.floating-heart-bg');
    if (!container) return;

    // Clear previous hearts
    container.innerHTML = '';

    // Create hearts at intervals
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'heart-float';
        heart.innerHTML = '💜';

        const randomLeft = Math.random() * 100;
        const randomDuration = Math.random() * 3 + 4; 
        const randomDelay = Math.random() * 2;

        heart.style.left = randomLeft + '%';
        heart.style.animationDuration = randomDuration + 's';
        heart.style.animationDelay = randomDelay + 's';
        heart.style.animation = `floatHeart ${randomDuration}s linear ${randomDelay}s forwards`;

        container.appendChild(heart);

        setTimeout(() => heart.remove(), (randomDuration + randomDelay) * 1000);
    }, 500);
}

function createFloatingHearts() {
    const container = document.querySelector('.floating-heart-animation');
    if (!container) return;

    container.innerHTML = '';

    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart-float';
        heart.innerHTML = '💜';

        const randomLeft = Math.random() * 100;
        const randomDuration = Math.random() * 3 + 4;

        heart.style.left = randomLeft + '%';
        heart.style.animationDuration = randomDuration + 's';
        heart.style.animation = `floatHeart ${randomDuration}s linear forwards`;

        container.appendChild(heart);

        setTimeout(() => heart.remove(), randomDuration * 1000);
    }
}

// ========== PAGE 2: NO BUTTON MOVEMENT ==========

let noClickCount = 0;

function moveNoButton() {
    const noBtn = document.getElementById('noBtn');

    noClickCount++;

    // On small screens, don't move the button — make the YES button grow instead
    const isMobile = window.innerWidth <= 480;
    if (isMobile) {
        const yesBtn = document.querySelector('.yes-btn');
        if (!yesBtn) return;
        yesBtn.classList.add('grow');
        // brief grow effect
        setTimeout(() => yesBtn.classList.remove('grow'), 700);

        // small shake feedback on NO button
        if (noBtn) {
            noBtn.classList.add('shake');
            setTimeout(() => noBtn.classList.remove('shake'), 300);
        }
        return;
    }

    // Desktop/tablet behavior: move the NO button within safe viewport bounds
    const minX = 60;
    const maxX = Math.max(minX + 10, window.innerWidth - 60);
    const minY = 100;
    const maxY = Math.max(minY + 10, window.innerHeight - 100);

    // Calculate random position within safe bounds
    const randomX = Math.random() * (maxX - minX) + minX;
    const randomY = Math.random() * (maxY - minY) + minY;

    if (noBtn) {
        noBtn.classList.add('move');
        noBtn.style.left = randomX + 'px';
        noBtn.style.top = randomY + 'px';
    }

    // Make it slightly harder to catch each time
    if (noClickCount > 5 && noBtn) {
        setTimeout(() => {
            const newRandomX = Math.random() * (maxX - minX) + minX;
            const newRandomY = Math.random() * (maxY - minY) + minY;
            noBtn.style.left = newRandomX + 'px';
            noBtn.style.top = newRandomY + 'px';
        }, 100);
    }
}

// ========== PAGE 3: ENVELOPE PASSWORD ==========

let envelopeClickCount = 0;
let letterAnimationEnabled = false;

window.addEventListener('DOMContentLoaded', () => {
    const envelope = document.getElementById('envelope');
    
    if (envelope) {
        envelope.addEventListener('click', handleEnvelopeClick);
    }
});

function handleEnvelopeClick(e) {
    if (e.target.closest('.envelope')) {
        // If on page 4 and animation is enabled, show letter animation
        if (letterAnimationEnabled && document.getElementById('page4').classList.contains('active')) {
            openLetterAnimation();
            return;
        }
        
        // Otherwise handle envelope opening on page 3
        envelopeClickCount++;

        if (envelopeClickCount === 1) {
            // First click: open the envelope flap
            const flap = document.querySelector('.envelope-flap');
            flap.classList.add('open');
            
            // Show password input after a delay
            setTimeout(() => {
                document.getElementById('passwordSection').style.display = 'flex';
                document.querySelector('.envelope-hint').style.display = 'none';
            }, 600);
        }
    }
}

function checkPassword() {
    const passwordInput = document.getElementById('passwordInput');
    const correctPassword = 'beatrice';
    
    if (passwordInput.value.toLowerCase() === correctPassword) {
        // Correct password - show letter coming out animation
        passwordInput.classList.remove('shake');
        document.getElementById('passwordHint').textContent = '';
        
        // Hide password section
        document.getElementById('passwordSection').style.display = 'none';
        document.querySelector('.envelope-hint').style.display = 'none';
        
        // Show letter coming out of envelope
        document.getElementById('letterComingOut').style.display = 'block';
        
        // Start playing background music
        const bgMusic = document.getElementById('bgMusic');
        if (bgMusic) {
            isMusicPlaying = true;
            document.getElementById('musicBtn').classList.add('playing');
            document.getElementById('musicBtn').style.opacity = '1';
            bgMusic.play().catch(() => {
                console.log('Audio playback failed');
            });
        }
    } else {
        // Wrong password - show error with shake animation
        passwordInput.classList.add('shake');
        document.getElementById('passwordHint').textContent = 'Try again 💜';
        
        // Reset animation
        setTimeout(() => {
            passwordInput.classList.remove('shake');
        }, 400);
        
        // Clear input for retry
        passwordInput.value = '';
    }
}

function zoomInLetterPage3() {
    const slidingLetter = document.getElementById('slidingLetter');
    slidingLetter.classList.add('zooming');
    
    // After zoom animation, go to page 4
    setTimeout(() => {
        goToPage(4);
        envelopeClickCount = 0; // Reset for next visit
        // Reset animation containers
        document.getElementById('letterComingOut').style.display = 'none';
        slidingLetter.classList.remove('zooming');
    }, 800);
}

// Allow Enter key to submit password
document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('passwordInput');
    if (passwordInput) {
        passwordInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                checkPassword();
            }
        });
    }
});

// ========== PAGE 4: TYPEWRITER EFFECT ==========

let isTyping = false;

function playTypewriterEffect() {
    if (isTyping) return;
    
    isTyping = true;
    
    const letterContent = document.getElementById('letterContent');
    const fullHTML = letterContent.innerHTML;
    
    // Store original HTML and clear content
    letterContent.innerHTML = '';
    
    let htmlIndex = 0;
    const speed = 30; // milliseconds per character
    const sentencePauseTime = 400; // pause after sentence endings
    
    function typeNextCharacter() {
        if (htmlIndex >= fullHTML.length) {
            isTyping = false;
            // Show all pause spans are hidden
            const pauseSpans = letterContent.querySelectorAll('.pause');
            pauseSpans.forEach(span => span.style.display = 'none');
            return;
        }
        
        // Get character at current index
        const char = fullHTML[htmlIndex];
        
        // Check if we're at the start of an HTML tag
        if (char === '<') {
            // Find the end of the tag
            const endTag = fullHTML.indexOf('>', htmlIndex);
            if (endTag !== -1) {
                // Check if it's a pause span
                const tag = fullHTML.substring(htmlIndex, endTag + 1);
                if (tag.includes('class="pause"')) {
                    // Extract pause duration
                    const durationMatch = tag.match(/data-duration="(\d+)"/);
                    const duration = durationMatch ? parseInt(durationMatch[1]) : 1000;
                    
                    // Add the pause span to DOM (hidden)
                    letterContent.innerHTML += tag;
                    htmlIndex = endTag + 1;
                    
                    // Pause before continuing
                    setTimeout(typeNextCharacter, duration);
                    return;
                } else {
                    // Regular tag (like br)
                    letterContent.innerHTML += tag;
                    htmlIndex = endTag + 1;
                    typeNextCharacter();
                    return;
                }
            }
        }
        
        // Regular character
        letterContent.innerHTML += char;
        
        // Check if this is a sentence ending
        const isSentenceEnd = (char === '.' || char === '!' || char === '?');
        
        htmlIndex++;
        
        // Add pause after sentence endings
        if (isSentenceEnd) {
            setTimeout(typeNextCharacter, speed + sentencePauseTime);
        } else {
            setTimeout(typeNextCharacter, speed);
        }
    }
    
    typeNextCharacter();
}

// Add current date to letter
window.addEventListener('DOMContentLoaded', () => {
    const letterDate = document.getElementById('letterDate');
    if (letterDate) {
        // Use fixed date for the letter per request
        letterDate.textContent = 'February 11, 2026';
    }
});

// ========== MUSIC PLAYER (PAGE 5) ==========

let isPageMusicPlaying = false;

// Song list with file mappings and reasons
const songs = [
    { 
        name: 'Torpe', 
        file: 'torpe.mp3',
        reason: 'Nilagay ko to kasi sobrang akong ako yung kanta HAHA. Ilang beses akong nagkaroon ng chance makipag-usap pero laging nauunahan ng hiya. Gusto ko magsalita, gusto ko sabihin lahat, pero natatalo ako ng pagiging torpe ko. Parang theme song siya ng buong high school life ko pagdating sayo.'
    },
    { 
        name: 'RomCom', 
        file: 'romcom.mp3',
        reason: 'Nilagay ko to kasi parang romcom talaga yung story ko sayo. Yung hallway sightings, yung bestfriend mo naging kaklase ko, yung prom picture, yung sinabihan mo akong "snabber", parang mga eksena lang sa pelikula. Minsan feeling ko main character ako sa sarili kong love story… kaso di ko alam kung may happy ending nga ba.'
    },
    { 
        name: 'Fallen', 
        file: 'fallen.mp3',
        reason: 'Ito yung realization ko na hindi na lang to simpleng crush. Nahulog na talaga ako. Kahit anong gawin ko, kahit anong iwas ko, ikaw pa rin bumabalik sa isip ko. Dito ko inamin sa sarili ko na in love na talaga ako.'
    },
    { 
        name: 'Cant Take My Eyes off You', 
        file: 'cant-take-my-eyes-off-you.mp3',
        reason: 'Ito talaga ako tuwing nakikita kita sa hallway. Kahit kunwari busy ako o walang pake, hindi ko mapigilan tumingin. Parang automatic na hinahanap ka ng mata ko. Sobrang swak sa mga moment na lagi kitang nakikita sa building.'
    },
    { 
        name: 'Paninindigan Kita', 
        file: 'paninindigan-kita.mp3',
        reason: 'Nilagay ko to kasi kahit torpe ako, sa totoo lang handa akong panindigan yung nararamdaman ko. Ngayon lang ako nagkalakas ng loob magsabi kasi malapit na tayo grumaduate. Ayoko namang magsisi dahil hindi ko sinabi to.'
    },
    { 
        name: 'Made In Japan', 
        file: 'made-in-japan.mp3',
        reason: 'Eto pag naririnig ko to pero ikaw naaalala ko. Iba kasi yung aura mo. Parang ang classy mo, ang ganda mo, may sariling dating. Kaya siguro medyo nai-intimidate din ako sayo minsan. Ang taas kasi ng level mo tapos ako… eto, torpe.'
    },
    { 
        name: 'Pasilyo', 
        file: 'pasilyo.mp3',
        reason: 'Pinili ko to kasi narealize ko nararamdaman ko sayo hindi lang basta kilig. May lalim, pang-matagalan kahit wala namang "tayo." Almost four years kitang gusto, tahimik lang pero totoo. Parang handa na akong sumugal kung may chance.'
    }
];

function selectSong(index, songName) {
    const musicPlayer = document.getElementById('musicPlayer');
    const currentSongTitle = document.getElementById('currentSongTitle');
    const songSource = musicPlayer.querySelector('source');
    
    // Stop background romantic music when selecting a song
    const bgMusic = document.getElementById('bgMusic');
    if (bgMusic) {
        bgMusic.pause();
        bgMusic.currentTime = 0;
    }
    
    // Update the song source
    songSource.src = `assets/music/${songs[index].file}`;
    musicPlayer.load();
    
    // Update the song title in player
    currentSongTitle.textContent = songName;
    
    // Update the song card display with reason
    const selectedSongTitle = document.getElementById('selectedSongTitle');
    const selectedSongReason = document.getElementById('selectedSongReason');
    
    if (selectedSongTitle) selectedSongTitle.textContent = songs[index].name;
    if (selectedSongReason) selectedSongReason.textContent = songs[index].reason;
    
    // Update active button styling
    const songItems = document.querySelectorAll('.song-item');
    songItems.forEach((item, i) => {
        if (i === index) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
    
    // Reset player state
    isPageMusicPlaying = false;
    const playPauseBtn = document.getElementById('playPauseBtn');
    if (playPauseBtn) {
        playPauseBtn.querySelector('.play-icon').style.display = 'inline';
        playPauseBtn.querySelector('.pause-icon').style.display = 'none';
    }
    
    // Reset progress
    const progressFill = document.getElementById('progressFill');
    const currentTimeDisplay = document.getElementById('currentTime');
    if (progressFill) progressFill.style.width = '0%';
    if (currentTimeDisplay) currentTimeDisplay.textContent = '0:00';
}

function togglePlayPause() {
    const musicPlayer = document.getElementById('musicPlayer');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const playIcon = playPauseBtn.querySelector('.play-icon');
    const pauseIcon = playPauseBtn.querySelector('.pause-icon');

    if (!musicPlayer) return;

    if (isPageMusicPlaying) {
        musicPlayer.pause();
        isPageMusicPlaying = false;
        playIcon.style.display = 'inline';
        pauseIcon.style.display = 'none';
    } else {
        // Stop background romantic music when playing a song
        const bgMusic = document.getElementById('bgMusic');
        if (bgMusic && !bgMusic.paused) {
            bgMusic.pause();
            bgMusic.currentTime = 0;
        }
        
        musicPlayer.play().catch((error) => {
            console.log('Music playback failed:', error);
        });
        isPageMusicPlaying = true;
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'inline';
        
        // Show now playing notification
        const nowPlaying = document.getElementById('nowPlaying');
        const nowPlayingTitle = document.getElementById('nowPlayingTitle');
        if (nowPlaying && nowPlayingTitle) {
            nowPlayingTitle.textContent = document.getElementById('currentSongTitle').textContent;
            nowPlaying.style.display = 'block';
        }
    }
}

// Update progress bar and time display
window.addEventListener('DOMContentLoaded', () => {
    const musicPlayer = document.getElementById('musicPlayer');
    const progressBar = document.getElementById('progressBar');
    const progressFill = document.getElementById('progressFill');
    const currentTimeDisplay = document.getElementById('currentTime');
    const durationDisplay = document.getElementById('duration');

    if (musicPlayer) {
        // Update duration when metadata loads
        musicPlayer.addEventListener('loadedmetadata', () => {
            durationDisplay.textContent = formatTime(musicPlayer.duration);
        });

        // Update progress bar and current time
        musicPlayer.addEventListener('timeupdate', () => {
            const percent = (musicPlayer.currentTime / musicPlayer.duration) * 100;
            progressFill.style.width = percent + '%';
            currentTimeDisplay.textContent = formatTime(musicPlayer.currentTime);
        });

        // Hide notification when music ends
        musicPlayer.addEventListener('ended', () => {
            const nowPlaying = document.getElementById('nowPlaying');
            if (nowPlaying) {
                nowPlaying.style.display = 'none';
            }
        });        // Handle ended event
        musicPlayer.addEventListener('ended', () => {
            isPageMusicPlaying = false;
            const playPauseBtn = document.getElementById('playPauseBtn');
            if (playPauseBtn) {
                playPauseBtn.querySelector('.play-icon').style.display = 'inline';
                playPauseBtn.querySelector('.pause-icon').style.display = 'none';
            }
        });
    }

    // Click on progress bar to seek
    if (progressBar && musicPlayer) {
        progressBar.addEventListener('click', (e) => {
            const rect = progressBar.getBoundingClientRect();
            const percent = (e.clientX - rect.left) / rect.width;
            musicPlayer.currentTime = percent * musicPlayer.duration;
        });
    }
});

function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// ========== BACKGROUND MUSIC TOGGLE ==========

let isMusicPlaying = false;

function toggleMusic() {
    const musicBtn = document.getElementById('musicBtn');
    const bgMusic = document.getElementById('bgMusic');

    isMusicPlaying = !isMusicPlaying;

    if (isMusicPlaying) {
        musicBtn.classList.add('playing');
        musicBtn.style.opacity = '1';
        bgMusic.play().catch(() => {
            console.log('Music autoplay prevented by browser or file not found');
            isMusicPlaying = false;
            musicBtn.classList.remove('playing');
            musicBtn.style.opacity = '0.6';
        });
    } else {
        musicBtn.classList.remove('playing');
        musicBtn.style.opacity = '0.6';
        bgMusic.pause();
    }
}

// Update music button visual state on load
window.addEventListener('DOMContentLoaded', () => {
    const musicBtn = document.getElementById('musicBtn');
    const bgMusic = document.getElementById('bgMusic');
    if (musicBtn) {
        musicBtn.style.opacity = '0.6';
    }
    if (bgMusic) {
        bgMusic.volume = 0.3;
    }
});

// ========== INITIALIZATION ==========

window.addEventListener('DOMContentLoaded', () => {
    // Start on page 1
    goToPage(1);
    
    // Initialize floating hearts on page 1
    startFloatingHearts();
});

// ========== KEYBOARD SHORTCUTS ==========

document.addEventListener('keydown', (e) => {
    // Press 'Escape' to go back (on most pages)
    if (e.key === 'Escape') {
        const currentPage = document.querySelector('.page.active');
        if (currentPage) {
            const currentPageNumber = parseInt(currentPage.id.replace('page', ''));
            if (currentPageNumber > 1) {
                goToPage(currentPageNumber - 1);
            }
        }
    }

    // Press 'Spacebar' to go to next page
    if (e.code === 'Space') {
        const currentPage = document.querySelector('.page.active');
        if (currentPage && currentPage.id !== 'page3') {
            const currentPageNumber = parseInt(currentPage.id.replace('page', ''));
            if (currentPageNumber < 7) {
                e.preventDefault();
                goToPage(currentPageNumber + 1);
            }
        }
    }
});

// ========== SMOOTH PAGE TRANSITIONS ==========

// Add transition smooth behavior to all interactive elements
document.addEventListener('DOMContentLoaded', () => {
    // Enable smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth';

    // Add animation to buttons on hover
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.zIndex = '11';
        });

        btn.addEventListener('mouseleave', function() {
            this.style.zIndex = '10';
        });
    });
});

// ========== PREVENT TEXT SELECTION ON GIF HOVER ==========

window.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.cover-gif, .question-gif, .thank-you-gif');
    images.forEach(img => {
        img.style.userSelect = 'none';
    });
});

// ========== ADDITIONAL BUTTON IMPROVEMENTS ==========

document.addEventListener('DOMContentLoaded', () => {
    // Add ripple effect to buttons on click
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Optional: add visual feedback
            this.style.position = 'relative';
            this.style.overflow = 'visible';
        });
    });
});

// ========== MOBILE VIEWPORT FIX ==========

window.addEventListener('orientationchange', () => {
    window.scrollTo(0, 0);
});

// Prevent zoom on double tap input focus
document.addEventListener('touchstart', function(event) {
    if (event.touches.length > 1) {
        event.preventDefault();
    }
}, { passive: false });

// ========== ANIMATION PERFORMANCE OPTIMIZATION ==========

// Use requestAnimationFrame for smooth animations
let animationFrameId;

function optimizeAnimations() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
        // Reduce animation complexity for users who prefer reduced motion
        const styleSheet = document.createElement('style');
        styleSheet.innerHTML = `
            * {
                animation-duration: 0.1s !important;
            }
        `;
        document.head.appendChild(styleSheet);
    }
}

// ========== LETTER ANIMATION FUNCTIONS ==========

function openLetterAnimation() {
    const overlay = document.getElementById('letterOverlay');
    const letterContent = document.getElementById('letterContent');
    const fullText = letterContent.textContent;
    
    // Populate the overlay with letter content
    const overlayContent = overlay.querySelector('.letter-overlay-content');
    
    // Create letter structure inside overlay
    overlayContent.innerHTML = `
        <div class="letter-overlay-close" onclick="closeLetterAnimation()">✕</div>
        <div class="letter-header">
            <h2 class="letter-title">A Letter From My Heart</h2>
            <p class="letter-date" id="overlayLetterDate"></p>
        </div>
        <div class="letter-content" style="position: relative; z-index: 1; min-height: auto;">
            ${fullText}
        </div>
        <div class="letter-signature">
            With all my love,<br>
            ❤️
        </div>
    `;
    
    // Copy the date from the original letter
    const dateElement = document.getElementById('letterDate');
    if (dateElement) {
        document.getElementById('overlayLetterDate').textContent = dateElement.textContent;
    }
    
    // Show overlay with animation
    overlay.classList.add('active');
}

function closeLetterAnimation() {
    const overlay = document.getElementById('letterOverlay');
    overlay.classList.add('closing');
    
    setTimeout(() => {
        overlay.classList.remove('active', 'closing');
    }, 600);
}

window.addEventListener('DOMContentLoaded', optimizeAnimations);

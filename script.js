document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillBar = entry.target;
                    const width = skillBar.getAttribute('data-width');
                    skillBar.style.width = width;
                }
            });
        }, { threshold: 0.5 });

        skillBars.forEach(bar => {
            observer.observe(bar);
        });
    }

    function animateOnScroll() {
        const elements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.3 });

        elements.forEach(element => {
            observer.observe(element);
        });
    }

    function addScrollAnimations() {
        const aboutSection = document.querySelector('.about-content');
        const skillCategories = document.querySelectorAll('.skill-category');
        const timelineItems = document.querySelectorAll('.timeline-item');
        const contactInfo = document.querySelector('.contact-info');
        const contactForm = document.querySelector('.contact-form');

        if (aboutSection) {
            aboutSection.classList.add('fade-in');
        }

        skillCategories.forEach((category, index) => {
            category.classList.add('fade-in');
            category.style.transitionDelay = `${index * 0.2}s`;
        });

        timelineItems.forEach((item, index) => {
            if (index % 2 === 0) {
                item.classList.add('slide-in-left');
            } else {
                item.classList.add('slide-in-right');
            }
            item.style.transitionDelay = `${index * 0.1}s`;
        });

        if (contactInfo) {
            contactInfo.classList.add('slide-in-left');
        }
        if (contactForm) {
            contactForm.classList.add('slide-in-right');
        }
    }

    function smoothScroll() {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 70;
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    function handleContactForm() {
        // EmailJS初期化
        emailjs.init("iCeORWdojmPHJx0je");
        
        const form = document.getElementById('contact-form');
        
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const button = this.querySelector('button[type="submit"]');
                const originalText = button.textContent;
                
                // バリデーション
                const name = this.user_name.value.trim();
                const email = this.user_email.value.trim();
                const message = this.message.value.trim();
                
                if (!name || !email || !message) {
                    alert('すべての項目を入力してください。');
                    return;
                }
                
                // 送信中の表示
                button.textContent = '送信中...';
                button.disabled = true;
                
                // EmailJSで送信
                emailjs.sendForm('service_cm72dfl', 'template_ww5gsgz', this)
                    .then(() => {
                        // 成功時の処理
                        document.getElementById('form-success').style.display = 'block';
                        document.getElementById('form-error').style.display = 'none';
                        
                        // 5秒後にフォームを再表示
                        setTimeout(() => {
                            document.getElementById('form-success').style.display = 'none';
                            form.reset();
                            button.textContent = originalText;
                            button.disabled = false;
                        }, 5000);
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                        
                        // エラー時の処理
                        document.getElementById('form-error').style.display = 'block';
                        document.getElementById('form-success').style.display = 'none';
                        
                        // 5秒後にエラーメッセージを非表示
                        setTimeout(() => {
                            document.getElementById('form-error').style.display = 'none';
                            button.textContent = originalText;
                            button.disabled = false;
                        }, 5000);
                    });
            });
        }
    }

    function createParticles() {
        const hero = document.querySelector('.hero');
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                pointer-events: none;
                animation: float ${Math.random() * 10 + 5}s linear infinite;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation-delay: ${Math.random() * 5}s;
            `;
            hero.appendChild(particle);
        }
    }

    function addActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        window.addEventListener('scroll', function() {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (window.scrollY >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }

    function typewriterEffect() {
        const typingElement = document.querySelector('.typing-text');
        if (typingElement) {
            const text = typingElement.textContent;
            typingElement.textContent = '';
            typingElement.style.opacity = '1';
            
            let i = 0;
            const timer = setInterval(() => {
                if (i < text.length) {
                    typingElement.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(timer);
                }
            }, 100);
        }
    }

    function addHoverEffects() {
        const skillCategories = document.querySelectorAll('.skill-category');
        const timelineItems = document.querySelectorAll('.timeline-content');
        const techTags = document.querySelectorAll('.tech-tag');
        
        skillCategories.forEach((category, index) => {
            category.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-12px) scale(1.03)';
                // 各カテゴリに異なる色のシャドウを適用
                const colors = [
                    'rgba(139, 92, 246, 0.25)', // Purple for first
                    'rgba(16, 185, 129, 0.25)',  // Green for second
                    'rgba(245, 158, 11, 0.25)'   // Orange for third
                ];
                this.style.boxShadow = `0 20px 40px ${colors[index % 3]}`;
            });
            
            category.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = '0 8px 30px rgba(45, 74, 107, 0.08)';
            });
        });
        
        timelineItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px) scale(1.02)';
                this.style.boxShadow = '0 15px 40px rgba(245, 158, 11, 0.2)';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = '0 8px 30px rgba(45, 74, 107, 0.08)';
            });
        });

        // テックタグのインタラクション強化
        techTags.forEach(tag => {
            tag.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-3px) scale(1.05)';
            });
            
            tag.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    animateSkillBars();
    addScrollAnimations();
    animateOnScroll();
    smoothScroll();
    handleContactForm();
    createParticles();
    addActiveNavLink();
    typewriterEffect();
    addHoverEffects();
});

document.addEventListener('mousemove', function(e) {
    const cursor = document.querySelector('.cursor');
    if (!cursor) {
        const cursorElement = document.createElement('div');
        cursorElement.className = 'cursor';
        cursorElement.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: rgba(37, 99, 235, 0.3);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease;
            transform: translate(-50%, -50%);
        `;
        document.body.appendChild(cursorElement);
    }
    
    const cursorEl = document.querySelector('.cursor');
    cursorEl.style.left = e.clientX + 'px';
    cursorEl.style.top = e.clientY + 'px';
});

window.addEventListener('load', function() {
    const loader = document.createElement('div');
    loader.className = 'loader-overlay';
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(45, 74, 107, 0.95);
        backdrop-filter: blur(10px);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        transition: opacity 0.6s ease;
    `;
    
    const loaderContent = document.createElement('div');
    loaderContent.className = 'loader-content';
    loaderContent.style.cssText = `
        text-align: center;
        color: white;
    `;
    
    // 脳のネットワークをイメージしたSVGアイコン
    const loaderIcon = document.createElement('div');
    loaderIcon.innerHTML = `
        <svg width="120" height="120" viewBox="0 0 80 80">
            <g fill="none" stroke="#10B981" stroke-width="2">
                <!-- 脳の形状をイメージした曲線 -->
                <path d="M20 40 Q30 20, 50 25 Q70 30, 75 45 Q70 60, 50 55 Q30 60, 20 40" 
                      fill="rgba(16, 185, 129, 0.1)" class="brain-outline"/>
                
                <!-- ネットワーク接続点 -->
                <circle cx="25" cy="35" r="4" fill="#10B981" class="node node-1"/>
                <circle cx="40" cy="25" r="4" fill="#F59E0B" class="node node-2"/>
                <circle cx="55" cy="30" r="4" fill="#8B5CF6" class="node node-3"/>
                <circle cx="65" cy="45" r="4" fill="#10B981" class="node node-4"/>
                <circle cx="50" cy="50" r="4" fill="#F59E0B" class="node node-5"/>
                <circle cx="35" cy="45" r="4" fill="#8B5CF6" class="node node-6"/>
                
                <!-- 動的な接続線 -->
                <line x1="25" y1="35" x2="40" y2="25" class="connection conn-1"/>
                <line x1="40" y1="25" x2="55" y2="30" class="connection conn-2"/>
                <line x1="55" y1="30" x2="65" y2="45" class="connection conn-3"/>
                <line x1="65" y1="45" x2="50" y2="50" class="connection conn-4"/>
                <line x1="50" y1="50" x2="35" y2="45" class="connection conn-5"/>
                <line x1="35" y1="45" x2="25" y2="35" class="connection conn-6"/>
                <line x1="40" y1="25" x2="35" y2="45" class="connection conn-7"/>
                <line x1="55" y1="30" x2="50" y2="50" class="connection conn-8"/>
            </g>
        </svg>
    `;
    
    loaderContent.appendChild(loaderIcon);
    loader.appendChild(loaderContent);
    document.body.appendChild(loader);
    
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.remove();
        }, 600);
    }, 800);
});

const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
    }
    
    .nav-link.active {
        color: var(--primary-color);
    }
    
    .nav-link.active::after {
        width: 100%;
    }
    
    .particle {
        animation: floatParticle 15s linear infinite;
    }
    
    @keyframes floatParticle {
        0% {
            transform: translateY(100vh) translateX(0);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) translateX(100px);
            opacity: 0;
        }
    }
    
    /* ローディングアニメーション */
    .brain-outline {
        animation: brainPulse 2s ease-in-out infinite;
    }
    
    .node {
        animation: nodeGlow 1.5s ease-in-out infinite;
    }
    
    .node-1 { animation-delay: 0s; }
    .node-2 { animation-delay: 0.2s; }
    .node-3 { animation-delay: 0.4s; }
    .node-4 { animation-delay: 0.6s; }
    .node-5 { animation-delay: 0.8s; }
    .node-6 { animation-delay: 1.0s; }
    
    .connection {
        stroke-dasharray: 20;
        stroke-dashoffset: 20;
        animation: connectionFlow 2s linear infinite;
    }
    
    .conn-1 { animation-delay: 0s; }
    .conn-2 { animation-delay: 0.3s; }
    .conn-3 { animation-delay: 0.6s; }
    .conn-4 { animation-delay: 0.9s; }
    .conn-5 { animation-delay: 1.2s; }
    .conn-6 { animation-delay: 1.5s; }
    .conn-7 { animation-delay: 0.8s; }
    .conn-8 { animation-delay: 1.1s; }
    
    @keyframes brainPulse {
        0%, 100% {
            opacity: 0.3;
            transform: scale(1);
        }
        50% {
            opacity: 0.6;
            transform: scale(1.05);
        }
    }
    
    @keyframes nodeGlow {
        0%, 100% {
            opacity: 0.6;
            transform: scale(1);
        }
        50% {
            opacity: 1;
            transform: scale(1.3);
            filter: drop-shadow(0 0 8px currentColor);
        }
    }
    
    @keyframes connectionFlow {
        0% {
            stroke-dashoffset: 20;
            opacity: 0.3;
        }
        50% {
            stroke-dashoffset: 0;
            opacity: 1;
        }
        100% {
            stroke-dashoffset: -20;
            opacity: 0.3;
        }
    }
`;
document.head.appendChild(style);
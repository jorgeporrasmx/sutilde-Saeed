document.addEventListener('DOMContentLoaded', () => {
    // Animación de la intro
    const introAnimation = anime.timeline({
        easing: 'easeOutExpo'
    });

    // Crear grid items
    const grid = document.querySelector('.grid-transition .grid');
    if (grid) {
        const gridSize = { cols: 20, rows: 20 };
        const totalItems = gridSize.cols * gridSize.rows;

        for (let i = 0; i < totalItems; i++) {
            const item = document.createElement('div');
            item.classList.add('grid-item');
            // Posición y rotación inicial aleatoria
            const rotation = anime.random(0, 1) > 0.5 ? 45 : 0; // 50% de probabilidad de ser rombo
            const scale = anime.random(0.5, 1.5); // Tamaño inicial aleatorio
            item.style.transform = `translate(${anime.random(-500, 500)}px, ${anime.random(-500, 500)}px) rotate(${rotation}deg) scale(${scale})`;
            item.style.opacity = anime.random(0.1, 0.3); // Transparencia inicial muy sutil
            grid.appendChild(item);
        }

        // Secuencia de animación inicial
        introAnimation
        .add({
            targets: '.intro-logo',
            scale: [0.2, 2.5],
            opacity: [0, 1],
            duration: 400,
            easing: 'easeOutExpo',
            begin: function() {
                document.querySelector('.intro-animation').style.display = 'flex';
            }
        })
        .add({
            targets: '.grid-item',
            translateX: function() { return anime.random(-30, 30); },
            translateY: function() { return anime.random(-30, 30); },
            rotate: function(el) { 
                const baseRotation = el.style.transform.includes('rotate(45deg)') ? 45 : 0;
                return baseRotation + anime.random(-5, 5);
            },
            scale: function() { return anime.random(0.8, 1.2); },
            opacity: function() { return anime.random(0.05, 0.15); },
            delay: anime.stagger(5, {
                grid: [gridSize.cols, gridSize.rows],
                from: 'center'
            }),
            duration: 500,
            easing: 'easeOutQuad'
        }, '-=200')
        .add({
            targets: '.grid-item',
            translateX: function() { return anime.random(-100, 100); },
            translateY: function() { return anime.random(-100, 100); },
            scale: function() { return anime.random(0.2, 0.8); },
            rotate: function(el) {
                const currentRotation = el.style.transform.includes('rotate(45deg)') ? 45 : 0;
                return currentRotation + anime.random(-90, 90);
            },
            opacity: 0,
            duration: 400,
            delay: anime.stagger(3, {
                grid: [gridSize.cols, gridSize.rows],
                from: 'center'
            }),
            easing: 'easeInOutQuad'
        }, '+=50')
        .add({
            targets: '.intro-logo',
            scale: [2.5, 0],
            opacity: [1, 0],
            duration: 300,
            easing: 'easeInOutQuad'
        }, '-=200')
        .add({
            targets: '.intro-animation',
            opacity: 0,
            duration: 200,
            easing: 'easeInOutQuad',
            complete: function() {
                document.querySelector('.intro-animation').style.display = 'none';
            }
        });

        // Añadir efecto de hover a los elementos de la cuadrícula
        const gridItems = document.querySelectorAll('.grid-item');
        gridItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                anime({
                    targets: item,
                    scale: 1.2,
                    opacity: 0.3,
                    duration: 300,
                    easing: 'easeOutQuad'
                });
            });
            item.addEventListener('mouseleave', () => {
                anime({
                    targets: item,
                    scale: 1,
                    opacity: item.style.opacity,
                    duration: 500,
                    easing: 'easeOutElastic(1, .5)'
                });
            });
        });
    }

    // Animación de frases debajo del gancho
    const typingContainer = document.querySelector('.typing-container');
    if (typingContainer) {
        const texts = typingContainer.querySelectorAll('.typing-text');
        let currentIndex = 0;

        function showNextText() {
            const currentText = texts[currentIndex];
            const nextIndex = (currentIndex + 1) % texts.length;
            const nextText = texts[nextIndex];

            // Primero ocultar el texto actual
            anime({
                targets: currentText,
                opacity: [1, 0],
                translateY: [0, -20],
                duration: 400,
                easing: 'easeOutQuad',
                complete: () => {
                    currentText.classList.remove('active');
                    // Una vez que se ocultó, mostrar el siguiente
                    anime({
                        targets: nextText,
                        opacity: [0, 1],
                        translateY: [20, 0],
                        duration: 800,
                        easing: 'easeOutQuad',
                        begin: () => {
                            nextText.classList.add('active');
                        }
                    });
                }
            });

            currentIndex = nextIndex;
        }

        // Mostrar el primer texto
        texts[0].style.opacity = '1';
        texts[0].style.transform = 'translateY(0)';
        texts[0].classList.add('active');
        texts.forEach((text, i) => {
            if (i !== 0) {
                text.style.opacity = '0';
                text.style.transform = 'translateY(20px)';
            }
        });

        // Iniciar ciclo de textos con un intervalo más largo
        setInterval(showNextText, 5000);
    }

    // Animación de "Cómo trabajamos"
    const processSteps = document.querySelectorAll('.process-step');
    if (processSteps.length > 0) {
        const processObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const step = entry.target;
                    
                    anime.timeline({
                        targets: step,
                        duration: 800
                    })
                    .add({
                        opacity: [0, 1],
                        translateY: [20, 0],
                        easing: 'easeOutQuad'
                    })
                    .add({
                        targets: step.querySelector('.step-icon svg'),
                        scale: [0.5, 1],
                        rotate: [20, 0],
                        duration: 600,
                        easing: 'easeOutElastic(1, .5)'
                    }, '-=400')
                    .add({
                        targets: step.querySelector('.step-content'),
                        opacity: [0, 1],
                        translateY: [10, 0],
                        duration: 400,
                        easing: 'easeOutQuad'
                    }, '-=200');

                    // Animaciones específicas para cada ícono
                    const stepIcon = step.querySelector('.step-icon svg');
                    if (stepIcon) {
                        if (stepIcon.classList.contains('diagnostic-icon')) {
                            // Animación del check mark y pulso del círculo
                            anime({
                                targets: step.querySelector('.check-path'),
                                strokeDashoffset: [anime.setDashoffset, 0],
                                duration: 1500,
                                delay: 300,
                                easing: 'easeOutQuad',
                                loop: true
                            });
                            anime({
                                targets: step.querySelector('.pulse-circle'),
                                scale: [1, 1.2],
                                opacity: [0.8, 0],
                                duration: 2000,
                                easing: 'easeOutExpo',
                                loop: true
                            });
                        } else if (stepIcon.classList.contains('design-icon')) {
                            // Animación de dibujo del cuadrado y rombo
                            anime({
                                targets: [step.querySelector('.design-square'), step.querySelector('.design-path')],
                                strokeDashoffset: [anime.setDashoffset, 0],
                                duration: 2000,
                                delay: anime.stagger(300),
                                easing: 'easeInOutSine',
                                loop: true,
                                direction: 'alternate'
                            });
                        } else if (stepIcon.classList.contains('implementation-icon')) {
                            // Animación de dibujo de la cruz y círculo
                            anime({
                                targets: [step.querySelector('.implementation-circle'), step.querySelector('.implementation-path')],
                                strokeDashoffset: [anime.setDashoffset, 0],
                                duration: 2000,
                                delay: anime.stagger(300),
                                easing: 'easeInOutSine',
                                loop: true,
                                direction: 'alternate'
                            });
                        } else if (stepIcon.classList.contains('improvement-icon')) {
                            // Animación del triángulo y círculo
                            anime({
                                targets: step.querySelector('.improvement-path'),
                                translateY: [-5, 5],
                                duration: 2000,
                                direction: 'alternate',
                                easing: 'easeInOutQuad',
                                loop: true
                            });
                            anime({
                                targets: step.querySelector('.improvement-circle'),
                                scale: [1, 1.1],
                                opacity: [0.8, 0.4],
                                duration: 1500,
                                direction: 'alternate',
                                easing: 'easeInOutSine',
                                loop: true
                            });
                        }
                    }

                    processObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px'
        });

        processSteps.forEach(step => {
            processObserver.observe(step);
        });
    }

    // Animación de líneas
    anime({
        targets: '.lines-animation path',
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeInOutSine',
        duration: 2000,
        delay: function(el, i) { return i * 250 },
        direction: 'alternate',
        loop: true
    });

    // Animaciones de servicios
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            const service = card.dataset.service;
            
            if (service === 'automation') {
                anime({
                    targets: card.querySelector('.automation-icon rect'),
                    rotate: 360,
                    duration: 2000,
                    easing: 'linear',
                    loop: true
                });
            } else if (service === 'ai') {
                anime({
                    targets: card.querySelector('.brain-icon .energy-pulses circle'),
                    scale: [1, 1.5],
                    opacity: [0.8, 0],
                    duration: 1500,
                    easing: 'easeOutExpo',
                    delay: anime.stagger(200),
                    loop: true
                });
            } else if (service === 'integration') {
                anime({
                    targets: card.querySelector('.integration-icon path'),
                    strokeDashoffset: [anime.setDashoffset, 0],
                    duration: 1500,
                    easing: 'easeInOutSine',
                    delay: function(el, i) { return i * 250 },
                    loop: true
                });
            }
        });
    });

    // Animación de testimonios
    const testimonials = document.querySelectorAll('.testimonial-card');
    let currentTestimonial = 0;

    function showNextTestimonial() {
        testimonials[currentTestimonial].classList.remove('active');
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        testimonials[currentTestimonial].classList.add('active');
    }

    if (testimonials.length > 0) {
        testimonials[0].classList.add('active');
        setInterval(showNextTestimonial, 5000);
    }

    // Soporte para flip cards en móvil
    document.querySelectorAll('.flip-card').forEach(card => {
        let touchStartX = 0;
        let touchEndX = 0;

        card.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        });

        card.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            if (Math.abs(touchEndX - touchStartX) < 5) {
                card.classList.toggle('touched');
            }
        });

        document.addEventListener('touchstart', e => {
            if (!card.contains(e.target)) {
                card.classList.remove('touched');
            }
        });
    });
}); 
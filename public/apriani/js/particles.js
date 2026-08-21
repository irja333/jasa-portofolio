/**
 * Ambient Parallax Particles System
 * Apriani Portfolio
 */

(function () {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouse = {
        x: width / 2,
        y: height / 2,
        targetX: width / 2,
        targetY: height / 2,
        isHovered: false
    };

    const particleCount = Math.min(Math.floor((width * height) / 18000), 65);
    const particles = [];
    const colors = [
        'rgba(16, 185, 129, ',   // Emerald
        'rgba(6, 182, 212, ',    // Cyan
        'rgba(99, 102, 241, ',   // Indigo
        'rgba(245, 158, 11, '    // Amber
    ];

    class Particle {
        constructor() {
            this.reset(true);
        }

        reset(initial = false) {
            this.x = initial ? Math.random() * width : (Math.random() > 0.5 ? 0 : width);
            this.y = initial ? Math.random() * height : Math.random() * height;
            this.size = Math.random() * 2.2 + 0.8;
            this.baseSize = this.size;
            this.speedX = (Math.random() - 0.5) * 0.45;
            this.speedY = (Math.random() - 0.5) * 0.45;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.alpha = Math.random() * 0.5 + 0.15;
            this.depth = Math.random() * 0.8 + 0.2; // For parallax effect
            this.pulseSpeed = Math.random() * 0.02 + 0.008;
            this.pulseVal = Math.random() * Math.PI * 2;
        }

        update() {
            // Natural drift
            this.x += this.speedX;
            this.y += this.speedY;

            // Pulse opacity
            this.pulseVal += this.pulseSpeed;
            this.currentAlpha = this.alpha + Math.sin(this.pulseVal) * 0.15;

            // Mouse parallax influence
            const dx = mouse.x - width / 2;
            const dy = mouse.y - height / 2;
            const parallaxX = (dx * this.depth * 0.025);
            const parallaxY = (dy * this.depth * 0.025);

            // Screen wrap
            if (this.x < -20) this.x = width + 20;
            if (this.x > width + 20) this.x = -20;
            if (this.y < -20) this.y = height + 20;
            if (this.y > height + 20) this.y = -20;

            this.renderX = this.x + parallaxX;
            this.renderY = this.y + parallaxY;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.renderX, this.renderY, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color + Math.max(0.05, Math.min(0.8, this.currentAlpha)) + ')';
            ctx.shadowBlur = 12;
            ctx.shadowColor = this.color + '0.6)';
            ctx.fill();
            ctx.shadowBlur = 0;
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    // Connect close particles with subtle glow lines
    function drawConnections() {
        const maxDist = 130;
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].renderX - particles[j].renderX;
                const dy = particles[i].renderY - particles[j].renderY;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < maxDist) {
                    const lineAlpha = (1 - dist / maxDist) * 0.12;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].renderX, particles[i].renderY);
                    ctx.lineTo(particles[j].renderX, particles[j].renderY);
                    ctx.strokeStyle = `rgba(16, 185, 129, ${lineAlpha})`;
                    ctx.lineWidth = 0.75;
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        // Smooth mouse interpolate
        mouse.x += (mouse.targetX - mouse.x) * 0.05;
        mouse.y += (mouse.targetY - mouse.y) * 0.05;

        particles.forEach((p) => {
            p.update();
            p.draw();
        });

        drawConnections();

        requestAnimationFrame(animate);
    }

    window.addEventListener('mousemove', (e) => {
        mouse.targetX = e.clientX;
        mouse.targetY = e.clientY;
        mouse.isHovered = true;
    });

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    animate();
})();

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { portraitThumb } from '../../utils/image-path';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="hero" class="hero-section">
      <div class="aurora aurora-1"></div>
      <div class="aurora aurora-2"></div>
      <div class="aurora aurora-3"></div>

      <div class="particles-container">
        <div class="particle" *ngFor="let p of particles" [style]="p.style"></div>
      </div>

      <div class="floating-emoji" *ngFor="let e of floatingEmojis" [style]="e.style">{{ e.char }}</div>

      <div class="hero-overlay"></div>

      <div class="hero-content">
        <div class="hero-portrait-wrap">
          <img class="hero-portrait" [src]="portraitThumb" alt="Manammoo" width="150" height="150" loading="eager" fetchpriority="high" decoding="async">
          <span class="portrait-ring" aria-hidden="true"></span>
        </div>

        <div class="hero-badge">
          <span class="badge-spark">✨</span>
          <span class="badge-text">🎂 Happy Birthday Princess Manammoo 👑</span>
          <span class="badge-spark">✨</span>
        </div>

        <p class="hero-pre">Today the whole world celebrates</p>

        <h1 class="hero-title">
          <span class="title-line">Happy Birthday</span>
          <span class="hero-name gold-text">Manammoo</span>
        </h1>

        <p class="hero-subtitle">
          My beautiful Manammoo — every heartbeat, every smile, every moment with you
          is a gift I treasure forever. Today is all about <em>you</em>. 💕
        </p>

        <div class="hero-stats">
          <div class="stat-pill" *ngFor="let stat of stats">
            <span class="stat-icon">{{ stat.icon }}</span>
            <span class="stat-label">{{ stat.label }}</span>
          </div>
        </div>

        <div class="hero-actions">
          <button class="premium-btn hero-btn" (click)="scrollToSection('counter')">
            <span>💕</span>
            <span>Our Journey</span>
            <span class="btn-arrow">↓</span>
          </button>
          <button class="premium-btn hero-btn-secondary premium-btn-rose" (click)="scrollToSection('surprise')">
            <span>🎁</span>
            <span>Your Surprise</span>
          </button>
        </div>

        <div class="scroll-indicator">
          <span class="scroll-text">Scroll — a love story awaits</span>
          <div class="scroll-mouse"><div class="scroll-dot"></div></div>
        </div>
      </div>

      <div class="corner-deco top-left">🌸</div>
      <div class="corner-deco top-right">💖</div>
      <div class="corner-deco bottom-left">💝</div>
      <div class="corner-deco bottom-right">🌹</div>
    </section>
  `,
  styles: [`
    .hero-section {
      min-height: 100svh;
      min-height: 100dvh;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
      padding: clamp(80px, 12vw, 100px) var(--section-pad-x) clamp(32px, 5vw, 48px);
      background: var(--gradient-hero);
    }

    .aurora {
      position: absolute;
      border-radius: 50%;
      filter: blur(80px);
      pointer-events: none;
      animation: auroraDrift 12s ease-in-out infinite;
    }
    .aurora-1 { width: 60%; height: 50%; top: -10%; left: -10%; background: rgba(255,143,171,0.16); }
    .aurora-2 { width: 50%; height: 40%; bottom: 0; right: -5%; background: rgba(240,201,135,0.12); animation-delay: -4s; }
    .aurora-3 { width: 40%; height: 35%; top: 40%; left: 30%; background: rgba(212,165,245,0.1); animation-delay: -8s; }

    @keyframes auroraDrift {
      0%, 100% { transform: translate(0, 0) scale(1); }
      50% { transform: translate(20px, -15px) scale(1.08); }
    }

    .particles-container {
      position: absolute;
      inset: 0;
      pointer-events: none;
      z-index: 1;
    }

    .particle {
      position: absolute;
      background: var(--gold-light);
      border-radius: 50%;
      box-shadow: 0 0 8px rgba(212,175,55,0.5);
    }

    .floating-emoji {
      position: absolute;
      pointer-events: none;
      z-index: 1;
      opacity: 0.25;
      animation: floatSlow 5s ease-in-out infinite;
    }

    .hero-overlay {
      position: absolute;
      inset: 0;
      background: radial-gradient(ellipse at center, transparent 20%, rgba(0,0,0,0.35) 100%);
      z-index: 2;
    }

    .hero-content {
      text-align: center;
      position: relative;
      z-index: 3;
      width: 100%;
      max-width: 820px;
      animation: fadeInUp 1s ease-out;
    }

    .hero-portrait-wrap {
      position: relative;
      width: clamp(110px, 28vw, 150px);
      height: clamp(110px, 28vw, 150px);
      margin: 0 auto clamp(14px, 3vw, 22px);
    }

    .hero-portrait {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
      object-position: center;
      border: 3px solid rgba(255, 180, 200, 0.45);
      box-shadow: 0 12px 40px rgba(255, 143, 171, 0.28);
      position: relative;
      z-index: 1;
    }

    .portrait-ring {
      position: absolute;
      inset: -8px;
      border-radius: 50%;
      border: 2px solid rgba(240, 201, 135, 0.35);
      animation: pulseGlow 3s ease-in-out infinite;
    }

    @keyframes pulseGlow {
      0%, 100% { transform: scale(1); opacity: 0.6; }
      50% { transform: scale(1.06); opacity: 1; }
    }

    .hero-badge {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      background: rgba(255,255,255,0.06);
      backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 180, 200, 0.3);
      padding: 10px clamp(16px, 4vw, 28px);
      border-radius: var(--radius-xl);
      margin-bottom: clamp(16px, 3vw, 24px);
    }

    .badge-spark { animation: sparkle 2s ease-in-out infinite; }
    .badge-text {
      font-family: 'Playfair Display', serif;
      color: var(--blush-soft);
      font-size: clamp(0.85rem, 2.5vw, 1.05rem);
      letter-spacing: 1px;
    }

    .hero-pre {
      font-size: clamp(0.85rem, 2vw, 1rem);
      color: rgba(255,255,255,0.5);
      letter-spacing: 3px;
      text-transform: uppercase;
      margin-bottom: 8px;
    }

    .title-line {
      display: block;
      font-family: 'Playfair Display', serif;
      font-size: clamp(2rem, 7vw, 4rem);
      color: var(--white);
      line-height: 1.1;
      font-weight: 700;
    }

    .hero-name {
      display: block;
      font-family: 'Great Vibes', cursive;
      font-size: clamp(2.8rem, 10vw, 5.5rem);
      line-height: 1.15;
      margin: 4px 0 clamp(12px, 2vw, 20px);
      filter: drop-shadow(0 4px 24px rgba(212,175,55,0.35));
    }

    .hero-subtitle {
      font-size: clamp(0.95rem, 2.5vw, 1.1rem);
      color: rgba(255,255,255,0.72);
      line-height: 1.75;
      max-width: 580px;
      margin: 0 auto clamp(20px, 4vw, 32px);
      font-weight: 300;
    }
    .hero-subtitle em { color: var(--rose-gold); font-style: normal; font-weight: 500; }

    .hero-stats {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: var(--gap-sm);
      margin-bottom: clamp(20px, 4vw, 32px);
    }

    .stat-pill {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 8px 14px;
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 30px;
      font-size: clamp(0.75rem, 2vw, 0.85rem);
      color: rgba(255,255,255,0.65);
      animation: revealUp 0.6s ease-out both;
    }
    .stat-pill:nth-child(2) { animation-delay: 0.1s; }
    .stat-pill:nth-child(3) { animation-delay: 0.2s; }

    .hero-actions {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: var(--gap-md);
    }

    .hero-btn, .hero-btn-secondary {
      min-width: min(100%, 220px);
      justify-content: center;
    }

    .btn-arrow { animation: bounceArrow 2s ease-in-out infinite; }
    @keyframes bounceArrow {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(4px); }
    }

    .scroll-indicator {
      margin-top: clamp(28px, 5vw, 48px);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
    }

    .scroll-text {
      color: rgba(255,255,255,0.35);
      font-size: 0.7rem;
      letter-spacing: 2px;
      text-transform: uppercase;
    }

    .scroll-mouse {
      width: 24px;
      height: 38px;
      border: 2px solid rgba(255,255,255,0.2);
      border-radius: 12px;
      position: relative;
    }

    .scroll-dot {
      width: 3px;
      height: 8px;
      background: var(--gold);
      border-radius: 2px;
      position: absolute;
      top: 6px;
      left: 50%;
      transform: translateX(-50%);
      animation: scrollDot 2s ease-in-out infinite;
    }

    @keyframes scrollDot {
      0%, 100% { transform: translateX(-50%) translateY(0); opacity: 1; }
      50% { transform: translateX(-50%) translateY(14px); opacity: 0.2; }
    }

    .corner-deco {
      position: absolute;
      font-size: clamp(1.2rem, 3vw, 1.8rem);
      opacity: 0.2;
      z-index: 2;
      animation: floatSlow 4s ease-in-out infinite;
    }
    .top-left { top: 90px; left: 16px; }
    .top-right { top: 90px; right: 16px; animation-delay: 0.5s; }
    .bottom-left { bottom: 24px; left: 16px; animation-delay: 1s; }
    .bottom-right { bottom: 24px; right: 16px; animation-delay: 1.5s; }

    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(28px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class HeroComponent implements OnInit {
  portraitThumb = portraitThumb;
  particles: Array<{ style: Record<string, string> }> = [];
  floatingEmojis = ['💕','💖','🌸','✨','🎂','💗'].map((char, i) => ({
    char,
    style: {
      left: (8 + i * 15) + '%',
      top: (15 + (i % 3) * 28) + '%',
      fontSize: (1 + Math.random() * 0.8) + 'rem',
      animationDelay: (i * 0.4) + 's'
    }
  }));

  stats = [
    { icon: '💑', label: 'Forever Us' },
    { icon: '📸', label: 'Beautiful Memories' },
    { icon: '👑', label: 'My Queen Manammoo' }
  ];

  ngOnInit() {
    this.particles = Array.from({ length: 40 }, () => ({
      style: {
        left: Math.random() * 100 + '%',
        top: Math.random() * 100 + '%',
        width: (2 + Math.random() * 3) + 'px',
        height: (2 + Math.random() * 3) + 'px',
        animation: `floatSlow ${4 + Math.random() * 8}s ease-in-out infinite`,
        animationDelay: Math.random() * 4 + 's',
        opacity: String(0.3 + Math.random() * 0.5)
      }
    }));
  }

  scrollToSection(section: string) {
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

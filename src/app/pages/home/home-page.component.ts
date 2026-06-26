import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { HeroComponent } from '../../components/hero/hero.component';
import { LoveCounterComponent } from '../../components/love-counter/love-counter.component';
import { PhotoGalleryComponent } from '../../components/photo-gallery/photo-gallery.component';
import { TimelineComponentComponent } from '../../components/timeline-component/timeline-component.component';
import { LoveLetterComponent } from '../../components/love-letter/love-letter.component';
import { FooterComponent } from '../../components/footer/footer.component';

declare const confetti: {
  (options: Record<string, unknown>): void;
};

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    HeroComponent,
    LoveCounterComponent,
    PhotoGalleryComponent,
    TimelineComponentComponent,
    LoveLetterComponent,
    FooterComponent
  ],
  template: `
    <app-navbar></app-navbar>
    <app-hero></app-hero>

    <app-love-counter></app-love-counter>

    <app-photo-gallery></app-photo-gallery>

    <!-- Reasons -->
    <section id="reasons" class="reasons-section">
      <div class="section-container">
        <div class="section-header animate-on-scroll">
          <span class="section-emoji">💝</span>
          <h2 class="section-title gold-text">Why I Love Manammoo</h2>
          <p class="section-subtitle">Every reason my heart belongs to you</p>
        </div>
        <div class="reasons-grid">
          <div class="reason-card glass-card-premium animate-on-scroll-scale"
               *ngFor="let reason of reasons; let i = index"
               [style.transition-delay]="(i * 0.05) + 's'">
            <span class="reason-icon">{{ reason.icon }}</span>
            <p class="reason-text">{{ reason.text }}</p>
            <span class="reason-num">{{ (i + 1).toString().padStart(2, '0') }}</span>
          </div>
        </div>
      </div>
    </section>

    <app-timeline-component></app-timeline-component>
    <app-love-letter></app-love-letter>

    <!-- Videos -->
    <section id="video" class="video-section">
      <div class="cinema-glow cinema-glow-left"></div>
      <div class="cinema-glow cinema-glow-right"></div>
      <div class="section-container">
        <div class="section-header animate-on-scroll">
          <span class="section-emoji">🎬</span>
          <h2 class="section-title gold-text">Video Memories — Manammoo &amp; Ramees</h2>
          <p class="section-subtitle">Moments that make my heart overflow</p>
        </div>

        <div class="cinema-stage animate-on-scroll">
          <div class="film-reel-deco" aria-hidden="true">
            <span *ngFor="let s of filmHoles">■</span>
          </div>

          <div class="video-single">
            <article class="cinema-card special glass-card-premium animate-on-scroll-scale">
              <div class="exclusive-badge">✨ FOR MANAMMOO ONLY ✨</div>
              <div class="card-shine"></div>
              <header class="cinema-header">
                <span class="film-num rose">🎬</span>
                <div class="cinema-titles">
                  <h3>Our Love Story Video</h3>
                  <p>A beautiful video moment, just for you Manammoo</p>
                </div>
              </header>
              <div class="player-frame">
                <div class="player-glow rose"></div>
                <video class="cinema-player" controls playsinline preload="metadata">
                  <source src="/assets/manna.mp4" type="video/mp4">
                </video>
              </div>
            </article>
          </div>

          <div class="film-reel-deco bottom" aria-hidden="true">
            <span *ngFor="let s of filmHoles">■</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Wishes -->
    <section class="wishes-section">
      <div class="section-container">
        <div class="section-header animate-on-scroll">
          <span class="section-emoji">🌟</span>
          <h2 class="section-title gold-text">Wishes For Our Future, Manammoo</h2>
          <p class="section-subtitle">A beautiful forever awaits us</p>
        </div>
        <div class="wishes-grid">
          <div class="wish-card glass-card-premium animate-on-scroll-scale"
               *ngFor="let wish of futureWishes; let i = index"
               [style.transition-delay]="(i * 0.1) + 's'">
            <span class="wish-icon">{{ wish.icon }}</span>
            <p class="wish-text">{{ wish.text }}</p>
            <span class="wish-emoji">{{ wish.emoji }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Grand Surprise -->
    <section id="surprise" class="surprise-section">
      <div class="section-container">
        <div class="surprise-wrap animate-on-scroll-scale">
          <div class="surprise-pill">💝 Special Moment For Manammoo 💝</div>
          <div class="surprise-burst">🎉</div>
          <h2>Ready for Your Biggest Surprise?</h2>
          <p>Tap below — magic is waiting for you, Manammoo</p>

          <button class="surprise-btn" (click)="triggerSurprise()" [disabled]="surpriseTriggered">
            <span>{{ surpriseTriggered ? '🎉 Surprise Unlocked!' : '💝 Unlock Your Surprise' }}</span>
          </button>

          <div class="surprise-reveal" *ngIf="showSurprise">
            <div class="reveal-card glass-card-premium">
              <div class="crown">👑</div>
              <div class="reveal-badge">🎂 Happy Birthday Queen Manammoo 🎂</div>
              <h3 class="reveal-name gold-text">Manammoo</h3>
              <div class="heart-row">💖 💕 💗 💖 💕</div>
              <p class="reveal-msg">
                To the most beautiful soul — Manammoo, you are my sunshine, my joy, my everything.
                Today and always, I celebrate YOU. Thank you for being you. Thank you for loving me.
                You make my world infinitely more beautiful.
              </p>
              <p class="reveal-love">I Love You More Than Words Can Say ❤️</p>
              <p class="reveal-sign">Forever &amp; Always — Muhammed Ramees</p>
            </div>
            <div class="reveal-actions">
              <button class="action-chip" (click)="playRomanticMusic()">🎵 Our Song</button>
              <button class="action-chip" (click)="fireConfetti()">🎊 More Confetti</button>
              <button class="action-chip" (click)="scrollToTop()">💕 Start Again</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <app-footer></app-footer>
  `,
  styles: [`
    .reasons-section { background: var(--gradient-section); }

    .reasons-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(min(100%, 200px), 1fr));
      gap: var(--gap-md);
    }

    .reason-card {
      padding: clamp(16px, 3vw, 22px);
      text-align: center;
      position: relative;
      overflow: hidden;
    }

    .reason-icon { font-size: 1.8rem; display: block; margin-bottom: 8px; }
    .reason-text {
      font-family: 'Playfair Display', serif;
      font-size: clamp(0.85rem, 2.2vw, 0.95rem);
      color: rgba(255,245,248,0.85);
      line-height: 1.45;
    }
    .reason-num {
      position: absolute;
      top: 8px;
      right: 12px;
      font-size: 1.4rem;
      font-weight: 700;
      color: rgba(255, 143, 171, 0.12);
    }

    /* Cinema video section */
    .video-section {
      background: linear-gradient(180deg, var(--bg-2), var(--bg-1), var(--bg-0));
      overflow: hidden;
      position: relative;
    }

    .cinema-glow {
      position: absolute;
      width: 50%;
      height: 60%;
      border-radius: 50%;
      filter: blur(100px);
      pointer-events: none;
      opacity: 0.35;
    }
    .cinema-glow-left { top: 10%; left: -15%; background: rgba(255, 143, 171, 0.25); }
    .cinema-glow-right { bottom: 5%; right: -15%; background: rgba(240, 201, 135, 0.2); }

    .cinema-stage { position: relative; }

    .film-reel-deco {
      display: flex;
      justify-content: center;
      gap: 10px;
      padding: 8px 0;
      color: rgba(255, 180, 200, 0.15);
      font-size: 0.55rem;
      letter-spacing: 6px;
      animation: filmScroll 4s linear infinite;
      overflow: hidden;
    }
    .film-reel-deco.bottom { animation-direction: reverse; }

    .video-single {
      display: flex;
      justify-content: center;
      max-width: 720px;
      margin: 0 auto;
    }

    .video-single .cinema-card {
      width: 100%;
    }

    .cinema-card {
      display: flex;
      flex-direction: column;
      gap: 14px;
      padding: clamp(16px, 3vw, 22px);
    }

    .card-shine {
      position: absolute;
      top: 0;
      left: -100%;
      width: 60%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent);
      animation: shimmerSlide 6s ease-in-out infinite;
      pointer-events: none;
    }

    @keyframes shimmerSlide {
      0%, 100% { left: -100%; }
      50% { left: 150%; }
    }

    .cinema-header {
      display: flex;
      align-items: flex-start;
      gap: 14px;
    }

    .film-num {
      font-family: 'Playfair Display', serif;
      font-size: 2.2rem;
      font-weight: 900;
      line-height: 1;
      background: linear-gradient(135deg, rgba(240,201,135,0.35), rgba(255,179,198,0.25));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      flex-shrink: 0;
    }

    .film-num.rose {
      background: linear-gradient(135deg, rgba(255,143,171,0.45), rgba(212,165,245,0.3));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .cinema-titles h3 {
      font-family: 'Playfair Display', serif;
      font-size: clamp(1.05rem, 2.8vw, 1.25rem);
      color: var(--text);
      margin-bottom: 4px;
    }

    .cinema-titles p {
      color: var(--text-muted);
      font-size: 0.85rem;
    }

    .player-frame {
      position: relative;
      border-radius: var(--radius);
      overflow: hidden;
      background: #000;
      border: 1px solid rgba(255, 180, 200, 0.15);
    }

    .player-glow {
      position: absolute;
      inset: -1px;
      border-radius: var(--radius);
      background: linear-gradient(135deg, rgba(240,201,135,0.3), rgba(255,143,171,0.2));
      z-index: 0;
      opacity: 0.5;
      animation: pulseGlow 3s ease-in-out infinite;
    }

    .player-glow.rose {
      background: linear-gradient(135deg, rgba(255,143,171,0.35), rgba(212,165,245,0.25));
    }

    .cinema-player {
      width: 100%;
      display: block;
      aspect-ratio: 16 / 9;
      object-fit: contain;
      background: #000;
      position: relative;
      z-index: 1;
    }

    .exclusive-badge {
      position: absolute;
      top: 14px;
      right: 14px;
      background: var(--gradient-accent);
      color: var(--bg-0);
      padding: 6px 14px;
      border-radius: 20px;
      font-size: 0.62rem;
      font-weight: 800;
      letter-spacing: 1px;
      z-index: 3;
      animation: pulse 2s ease-in-out infinite;
      box-shadow: 0 4px 20px rgba(255, 143, 171, 0.35);
    }

    .wishes-section { background: var(--gradient-section); }

    .wishes-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(min(100%, 160px), 1fr));
      gap: var(--gap-md);
    }

    .wish-card {
      padding: clamp(20px, 4vw, 28px) clamp(14px, 3vw, 20px);
      text-align: center;
    }

    .wish-icon { font-size: 2rem; display: block; margin-bottom: 8px; }
    .wish-text {
      font-family: 'Playfair Display', serif;
      font-size: clamp(0.9rem, 2.5vw, 1rem);
      color: rgba(255,255,255,0.8);
      margin-bottom: 6px;
    }
    .wish-emoji { font-size: 1.5rem; }

    .surprise-section {
      background: linear-gradient(180deg, var(--bg-2), var(--bg-0));
      text-align: center;
      overflow: hidden;
    }

    .surprise-wrap { max-width: 640px; margin: 0 auto; }

    .surprise-pill {
      display: inline-block;
      padding: 8px 22px;
      border: 1px solid rgba(255, 180, 200, 0.25);
      border-radius: 30px;
      color: var(--blush-soft);
      font-size: 0.85rem;
      margin-bottom: 16px;
    }

    .surprise-burst {
      font-size: clamp(3rem, 10vw, 4.5rem);
      animation: floatSlow 3s ease-in-out infinite;
      filter: drop-shadow(0 0 24px rgba(255, 143, 171, 0.35));
      margin-bottom: 12px;
    }

    .surprise-wrap h2 {
      font-family: 'Playfair Display', serif;
      font-size: clamp(1.5rem, 5vw, 2.2rem);
      color: white;
      margin-bottom: 8px;
    }

    .surprise-wrap > p { color: var(--text-muted); margin-bottom: 24px; font-size: clamp(0.9rem, 2.5vw, 1rem); }

    .surprise-btn {
      padding: 16px 40px;
      border: none;
      border-radius: 40px;
      background: linear-gradient(135deg, var(--blush-deep), var(--blush), var(--champagne));
      color: var(--white);
      font-family: 'Playfair Display', serif;
      font-size: clamp(1rem, 2.8vw, 1.2rem);
      font-weight: 700;
      cursor: pointer;
      transition: var(--transition);
      box-shadow: var(--shadow-rose);
    }

    .surprise-btn:hover:not(:disabled) { transform: scale(1.04); }
    .surprise-btn:disabled { opacity: 0.75; cursor: default; }

    .surprise-reveal { margin-top: 28px; animation: fadeInUp 0.8s ease; }

    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(24px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .reveal-card {
      padding: clamp(32px, 5vw, 48px) clamp(20px, 4vw, 32px);
      position: relative;
    }

    .crown {
      font-size: 2.5rem;
      margin-bottom: 8px;
      animation: floatSlow 3s ease-in-out infinite;
    }

    .reveal-badge {
      display: inline-block;
      padding: 6px 18px;
      background: rgba(255, 143, 171, 0.12);
      border-radius: 20px;
      color: var(--blush-soft);
      font-size: 0.82rem;
      margin-bottom: 12px;
    }

    .reveal-name {
      font-family: 'Great Vibes', cursive;
      font-size: clamp(2.2rem, 8vw, 3.2rem);
      margin: 8px 0;
    }

    .heart-row { font-size: 1.4rem; letter-spacing: 6px; margin: 12px 0; }

    .reveal-msg {
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(1rem, 2.6vw, 1.1rem);
      line-height: 1.8;
      color: rgba(255,255,255,0.75);
      font-style: italic;
      margin: 16px 0;
    }

    .reveal-love {
      font-family: 'Dancing Script', cursive;
      font-size: clamp(1.2rem, 3.5vw, 1.5rem);
      color: var(--blush-soft);
    }

    .reveal-sign {
      margin-top: 16px;
      padding-top: 16px;
      border-top: 1px solid rgba(255, 180, 200, 0.15);
      font-family: 'Dancing Script', cursive;
      font-size: clamp(1.1rem, 3vw, 1.3rem);
      color: var(--text-muted);
    }

    .reveal-actions {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: var(--gap-sm);
      margin-top: 20px;
    }

    .action-chip {
      padding: 10px 20px;
      border-radius: 30px;
      border: 1px solid rgba(255, 180, 200, 0.22);
      background: rgba(255, 143, 171, 0.08);
      color: white;
      cursor: pointer;
      font-size: 0.88rem;
      transition: var(--transition);
    }

    .action-chip:hover {
      background: rgba(255, 143, 171, 0.18);
      border-color: var(--blush);
      transform: translateY(-2px);
    }
  `]
})
export class HomePageComponent implements OnInit, OnDestroy {
  filmHoles = Array(24).fill(0);

  surpriseTriggered = false;
  showSurprise = false;
  audio: HTMLAudioElement | null = null;

  reasons = [
    { icon: '😊', text: 'Your smile lights up my entire world, Manammoo' },
    { icon: '💝', text: 'Your kind heart — pure gold' },
    { icon: '🌹', text: 'You care so deeply for everyone' },
    { icon: '🎵', text: 'Your voice is music to my soul' },
    { icon: '💪', text: 'You always believe in me' },
    { icon: '😄', text: 'Your laughter is my favorite sound' },
    { icon: '👀', text: 'Your eyes — I get lost in them' },
    { icon: '🤗', text: 'Your hugs feel like home' },
    { icon: '🧠', text: 'Your intelligence inspires me' },
    { icon: '💪', text: 'Your strength through everything' },
    { icon: '🥰', text: 'Every touch melts my heart' },
    { icon: '🌟', text: 'You shine brighter than anyone' },
    { icon: '🎨', text: 'You see beauty in everything' },
    { icon: '☕', text: 'Simple moments feel magical with you' },
    { icon: '🌙', text: 'Your presence brings peace' },
    { icon: '🌈', text: 'You turn storms into rainbows' }
  ];

  futureWishes = [
    { icon: '✈️', text: 'More adventures with Manammoo', emoji: '🌍' },
    { icon: '📸', text: 'More memories to capture', emoji: '📖' },
    { icon: '😊', text: 'More laughter every day', emoji: '😂' },
    { icon: '❤️', text: 'Forever with you, Manammoo', emoji: '💑' }
  ];

  ngOnInit() {
    this.setupScrollAnimation();
  }

  ngOnDestroy() {
    this.audio?.pause();
  }

  triggerSurprise() {
    this.surpriseTriggered = true;
    this.fireConfetti();
    setTimeout(() => { this.showSurprise = true; }, 400);
    this.playRomanticMusic();
  }

  fireConfetti() {
    const colors = ['#ffb3c6', '#f0c987', '#ffe4a8', '#ff8fab', '#fff0f5'];
    const end = Date.now() + 5000;

    const frame = () => {
      confetti({ particleCount: 4, angle: 60, spread: 55, origin: { x: 0 }, colors });
      confetti({ particleCount: 4, angle: 120, spread: 55, origin: { x: 1 }, colors });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();

    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        confetti({ particleCount: 30, spread: 100, origin: { y: 0.6 }, shapes: ['heart'], colors: ['#ff6b6b', '#ff8e8e'] });
      }, i * 500);
    }
  }

  playRomanticMusic() {
    this.audio = new Audio('/assets/mu2.ogg');
    this.audio.loop = true;
    this.audio.volume = 0.35;
    this.audio.play().catch(() => {});
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  setupScrollAnimation() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.08 });

    setTimeout(() => {
      document.querySelectorAll('.animate-on-scroll, .animate-on-scroll-scale').forEach(el => observer.observe(el));
    }, 100);
  }
}

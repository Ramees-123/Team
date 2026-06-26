import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="footer-section">
      <div class="section-container">
        <div class="footer-stars">✨ ⭐ ✨ ⭐ ✨</div>
        <div class="footer-heart">💝</div>

        <div class="footer-card animate-on-scroll-scale glass-card-premium">
          <h2 class="footer-title">
            Thank You, Manammoo,<br>for being the most beautiful part of my life
          </h2>
          <div class="footer-divider"><span>💕</span><span class="line"></span><span>💕</span></div>
          <p class="footer-subtitle">Every love story is beautiful, but ours is my absolute favorite</p>
          <p class="footer-signature">— With infinite love, Muhammed Ramees</p>
          <div class="footer-hearts">❤️ 💕 💗 💖 💝</div>
        </div>

        <div class="footer-bottom">
          <p>Made with infinite love for <strong>Manammoo</strong> 👑</p>
          <p class="forever">Forever &amp; Always 💑</p>
          <p class="year">Manammoo &amp; Ramees • 2024 — ∞</p>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer-section {
      position: relative;
      z-index: 1;
      background: linear-gradient(180deg, var(--bg-1), #080308);
      padding: clamp(48px, 7vw, 72px) var(--section-pad-x) clamp(24px, 4vw, 36px);
      text-align: center;
    }

    .footer-section::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 2px;
      background: linear-gradient(90deg, transparent, var(--champagne), var(--blush), var(--champagne), transparent);
    }

    .footer-bottom {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 12px;
      margin-top: 18px;
    }

    .footer-stars {
      font-size: 1.3rem;
      letter-spacing: 12px;
      margin-bottom: 16px;
      animation: sparkle 2s ease-in-out infinite;
    }

    .footer-heart {
      font-size: clamp(3rem, 8vw, 4rem);
      margin-bottom: 24px;
      animation: heartbeat 1.5s ease-in-out infinite;
      filter: drop-shadow(0 0 24px rgba(255, 143, 171, 0.35));
    }

    .footer-card {
      max-width: 640px;
      margin: 0 auto clamp(32px, 5vw, 48px);
      padding: clamp(32px, 5vw, 48px) clamp(20px, 4vw, 32px);
    }

    .footer-title {
      font-family: 'Playfair Display', serif;
      font-size: clamp(1.4rem, 4.5vw, 2rem);
      color: var(--white);
      line-height: 1.4;
      margin-bottom: 16px;
    }

    .footer-divider {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      margin: 16px 0;
    }

    .line {
      width: 50px;
      height: 1px;
      background: linear-gradient(90deg, transparent, var(--gold), transparent);
    }

    .footer-subtitle {
      font-family: 'Cormorant Garamond', serif;
      font-style: italic;
      font-size: clamp(1rem, 2.8vw, 1.2rem);
      color: var(--text-muted);
      margin-bottom: 12px;
    }

    .footer-signature {
      font-family: 'Dancing Script', cursive;
      font-size: clamp(1.3rem, 4vw, 1.6rem);
      color: var(--blush-soft);
    }

    .footer-hearts {
      margin-top: 20px;
      font-size: 1.3rem;
      letter-spacing: 6px;
    }

    .footer-bottom p {
      color: rgba(255,255,255,0.3);
      font-size: 0.8rem;
      margin-bottom: 4px;
    }

    .footer-bottom strong { color: var(--gold-light); }

    .forever {
      font-family: 'Dancing Script', cursive;
      font-size: 1rem !important;
      color: var(--champagne) !important;
    }

    .year {
      letter-spacing: 2px;
      text-transform: uppercase;
      font-size: 0.7rem !important;
    }
  `]
})
export class FooterComponent {}

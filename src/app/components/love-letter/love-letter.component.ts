import { Component } from '@angular/core';

@Component({
  selector: 'app-love-letter',
  standalone: true,
  template: `
    <section id="letter" class="letter-section">
      <div class="section-container">
        <div class="section-header animate-on-scroll">
          <span class="section-emoji">💌</span>
          <h2 class="section-title gold-text">A Letter For Manammoo</h2>
          <p class="section-subtitle">Words from the deepest corner of my heart</p>
        </div>

        <div class="letter-card animate-on-scroll-scale">
          <div class="letter-seal">💝</div>
          <div class="letter-paper">
            <div class="letter-ornament">❤️ 💕 💗 💖 💝</div>
            <div class="letter-date">27 June 2026 — Your Birthday</div>

            <h3 class="letter-greeting">My Dearest Manammoo,</h3>

            <div class="letter-body">
              <p>
                On this beautiful day, as the world celebrates you, I want you to know that you are
                the most precious gift life has ever given me. Manammoo — your name alone makes my
                heart skip a beat.
              </p>
              <p>
                Your smile lights up the darkest days. Your kindness touches everyone around you.
                Your laughter is the melody I want to hear for the rest of my life. You are not just
                beautiful on the outside — your soul shines brighter than any star.
              </p>
              <p>
                Thank you for choosing me. Thank you for every hug, every laugh, every quiet moment
                together. You make ordinary days feel magical and hard days feel bearable. With you,
                I found home.
              </p>
              <p>
                Happy Birthday, my love. May this year bring you all the happiness you deserve and more.
                I promise to love you deeper, cherish you harder, and surprise you every single day —
                just like today.
              </p>
              <p class="letter-signature">
                Forever yours,<br>
                <span class="signature-name">— Muhammed Ramees</span>
              </p>
            </div>

            <div class="letter-ornament bottom">💝 💖 💗 💕 ❤️</div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .letter-section {
      background: linear-gradient(180deg, var(--bg-2), var(--bg-1));
    }

    .letter-card {
      max-width: 680px;
      margin: 0 auto;
      position: relative;
    }

    .letter-seal {
      position: absolute;
      top: -16px;
      right: 8px;
      font-size: 2.5rem;
      transform: rotate(12deg);
      z-index: 3;
      animation: floatSlow 4s ease-in-out infinite;
      filter: drop-shadow(0 4px 16px rgba(212,175,55,0.3));
    }

    .letter-paper {
      background: linear-gradient(145deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01));
      padding: clamp(28px, 5vw, 48px) clamp(22px, 4vw, 40px);
      border-radius: var(--radius-lg);
      border: 1px solid rgba(255, 180, 200, 0.18);
      box-shadow: 0 16px 60px rgba(0,0,0,0.3);
    }

    .letter-ornament {
      text-align: center;
      font-size: 1rem;
      letter-spacing: 8px;
      padding-bottom: 12px;
      border-bottom: 1px solid rgba(212,175,55,0.1);
      color: rgba(255,255,255,0.5);
    }

    .letter-ornament.bottom {
      border-bottom: none;
      border-top: 1px solid rgba(212,175,55,0.1);
      padding-bottom: 0;
      padding-top: 12px;
      margin-top: 8px;
    }

    .letter-date {
      font-size: 0.8rem;
      color: var(--text-muted);
      text-align: right;
      margin: 16px 0 12px;
      font-style: italic;
    }

    .letter-greeting {
      font-family: 'Dancing Script', cursive;
      font-size: clamp(1.6rem, 5vw, 2rem);
      color: var(--blush-soft);
      margin-bottom: 16px;
    }

    .letter-body p {
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(1rem, 2.6vw, 1.1rem);
      line-height: 1.85;
      color: rgba(255,255,255,0.78);
      margin-bottom: 14px;
      text-indent: 24px;
    }

    .letter-signature {
      text-align: right;
      text-indent: 0 !important;
      margin-top: 20px !important;
    }

    .signature-name {
      font-family: 'Dancing Script', cursive;
      font-size: clamp(1.4rem, 4vw, 1.7rem);
      color: var(--champagne);
    }
  `]
})
export class LoveLetterComponent {}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-love-counter',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="counter" class="counter-section">
      <div class="section-container">
        <div class="section-header animate-on-scroll">
          <div class="counter-rings">
            <div class="ring ring-1"></div>
            <div class="ring ring-2"></div>
            <span class="counter-heart">💕</span>
          </div>
          <h2 class="section-title gold-text">Manammoo &amp; Ramees — Together Since</h2>
          <p class="section-subtitle">10 April 2025 — the day we officially became us, Manammoo 💕</p>
        </div>

        <div class="counter-grid">
          <div class="counter-card glass-card-premium animate-on-scroll-scale"
               *ngFor="let item of timeUnits; let i = index"
               [style.transition-delay]="(i * 0.08) + 's'">
            <div class="counter-value">{{ item.value }}</div>
            <div class="counter-label">{{ item.label }}</div>
          </div>
        </div>

        <div class="counter-total animate-on-scroll">
          <span class="total-icon">❤️</span>
          <span class="total-text">{{ totalDays }} days of loving you, Manammoo</span>
        </div>

        <p class="counter-quote animate-on-scroll">
          "Every second with you, Manammoo, writes a new chapter in the most beautiful story ever told."
        </p>
      </div>
    </section>
  `,
  styles: [`
    .counter-section {
      background: var(--gradient-section);
      position: relative;
    }

    .counter-section::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(255,143,171,0.35), transparent);
    }

    .counter-rings {
      position: relative;
      width: 64px;
      height: 64px;
      margin: 0 auto 12px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .counter-heart {
      font-size: 2rem;
      animation: heartbeat 1.5s ease-in-out infinite;
      z-index: 2;
    }

    .ring {
      position: absolute;
      inset: 0;
      border-radius: 50%;
      border: 2px solid rgba(255, 143, 171, 0.3);
      animation: ringPulse 3s ease-out infinite;
    }
    .ring-2 { animation-delay: 1s; }

    @keyframes ringPulse {
      0% { transform: scale(1); opacity: 0.5; }
      100% { transform: scale(1.5); opacity: 0; }
    }

    .counter-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: var(--gap-md);
      max-width: 620px;
      margin: 0 auto clamp(20px, 3vw, 32px);
    }

    .counter-card {
      padding: clamp(20px, 4vw, 28px) clamp(10px, 2vw, 16px);
      text-align: center;
    }

    .counter-value {
      font-family: 'Playfair Display', serif;
      font-size: clamp(2rem, 6vw, 2.8rem);
      font-weight: 700;
      background: linear-gradient(135deg, var(--champagne), var(--blush-soft));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .counter-label {
      color: var(--text-muted);
      font-size: clamp(0.65rem, 1.8vw, 0.78rem);
      text-transform: uppercase;
      letter-spacing: 2px;
      margin-top: 4px;
    }

    .counter-total {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      padding: 14px clamp(20px, 4vw, 32px);
      background: rgba(255, 143, 171, 0.1);
      border: 1px solid rgba(255, 180, 200, 0.22);
      border-radius: var(--radius-xl);
      max-width: fit-content;
      margin: 0 auto clamp(16px, 3vw, 24px);
    }

    .total-icon { animation: heartbeat 1.5s ease-in-out infinite; }

    .total-text {
      font-family: 'Playfair Display', serif;
      font-size: clamp(0.95rem, 2.5vw, 1.15rem);
      color: var(--blush-soft);
      font-weight: 600;
    }

    .counter-quote {
      text-align: center;
      font-family: 'Cormorant Garamond', serif;
      font-style: italic;
      font-size: clamp(1rem, 2.8vw, 1.2rem);
      color: var(--text-muted);
      max-width: 480px;
      margin: 0 auto;
      line-height: 1.6;
    }

    @media (max-width: 520px) {
      .counter-grid { grid-template-columns: repeat(2, 1fr); }
    }
  `]
})
export class LoveCounterComponent implements OnInit, OnDestroy {
  timeUnits = [
    { label: 'Days', value: '00' },
    { label: 'Hours', value: '00' },
    { label: 'Minutes', value: '00' },
    { label: 'Seconds', value: '00' }
  ];
  totalDays = 0;
  private intervalId: ReturnType<typeof setInterval> | null = null;

  ngOnInit() {
    this.updateCounter();
    this.intervalId = setInterval(() => this.updateCounter(), 1000);
  }

  ngOnDestroy() {
    if (this.intervalId) clearInterval(this.intervalId);
  }

  updateCounter() {
    const startDate = new Date('2025-04-10T00:00:00');
    const diff = Date.now() - startDate.getTime();
    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    this.timeUnits = [
      { label: 'Days', value: this.pad(days) },
      { label: 'Hours', value: this.pad(hours) },
      { label: 'Minutes', value: this.pad(minutes) },
      { label: 'Seconds', value: this.pad(seconds) }
    ];
    this.totalDays = days;
  }

  pad(num: number): string {
    return num.toString().padStart(2, '0');
  }
}

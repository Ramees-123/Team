import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-timeline-component',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="timeline" class="timeline-section">
      <div class="section-container">
        <div class="section-header animate-on-scroll">
          <span class="section-emoji">📖</span>
          <h2 class="section-title gold-text">Manammoo — Our Love Story</h2>
          <p class="section-subtitle">Every chapter of us, written in golden ink</p>
        </div>

        <div class="timeline">
          <div class="timeline-line"></div>

          <div class="timeline-item animate-on-scroll"
               *ngFor="let event of timelineEvents; let i = index"
               [class.right]="i % 2 === 1">
            <div class="timeline-card glass-card-premium">
              <div class="timeline-dot"></div>
              <span class="timeline-date">{{ event.date }}</span>
              <h3 class="timeline-title">{{ event.title }}</h3>
              <p class="timeline-desc">{{ event.description }}</p>
              <span class="timeline-icon">{{ event.icon }}</span>
            </div>
          </div>
        </div>

        <div class="timeline-footer animate-on-scroll">
          <span>💑</span>
          <span class="footer-text">Manammoo &amp; Ramees — forever and always</span>
          <span>💕</span>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .timeline-section {
      background: linear-gradient(180deg, var(--bg-1), var(--bg-2), var(--bg-0));
    }

    .timeline {
      position: relative;
      max-width: 760px;
      margin: 0 auto;
    }

    .timeline-line {
      position: absolute;
      left: 50%;
      top: 0;
      bottom: 0;
      width: 2px;
      transform: translateX(-50%);
      background: linear-gradient(180deg, transparent, var(--champagne), var(--blush), var(--champagne), transparent);
    }

    .timeline-item {
      position: relative;
      margin-bottom: clamp(24px, 4vw, 36px);
    }

    .timeline-card {
      width: calc(50% - 36px);
      padding: clamp(18px, 3vw, 24px);
      position: relative;
    }

    .timeline-item:nth-child(odd) .timeline-card { margin-right: auto; }
    .timeline-item:nth-child(even) .timeline-card { margin-left: auto; }

    .timeline-dot {
      position: absolute;
      top: 20px;
      width: 14px;
      height: 14px;
      background: linear-gradient(135deg, var(--champagne), var(--blush-soft));
      border-radius: 50%;
      border: 2px solid var(--bg-0);
      box-shadow: 0 0 16px rgba(255, 143, 171, 0.45);
      animation: pulseGlow 2s ease-in-out infinite;
      z-index: 2;
    }

    .timeline-item:nth-child(odd) .timeline-dot { right: -43px; }
    .timeline-item:nth-child(even) .timeline-dot { left: -43px; }

    .timeline-date {
      display: inline-block;
      padding: 4px 12px;
      background: rgba(255, 143, 171, 0.12);
      border: 1px solid rgba(255, 180, 200, 0.22);
      border-radius: 16px;
      color: var(--blush-soft);
      font-size: 0.78rem;
      margin-bottom: 8px;
    }

    .timeline-title {
      font-size: clamp(1rem, 2.8vw, 1.2rem);
      color: var(--white);
      margin-bottom: 6px;
    }

    .timeline-desc {
      color: var(--text-muted);
      font-size: clamp(0.82rem, 2.2vw, 0.9rem);
      line-height: 1.65;
    }

    .timeline-icon {
      position: absolute;
      top: 14px;
      right: 16px;
      font-size: 1.4rem;
      opacity: 0.35;
      animation: floatSlow 4s ease-in-out infinite;
    }

    .timeline-item:nth-child(even) .timeline-icon { right: auto; left: 16px; }

    .timeline-footer {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      margin-top: clamp(24px, 4vw, 36px);
      font-size: 1.5rem;
    }

    .footer-text {
      font-family: 'Playfair Display', serif;
      font-size: clamp(1rem, 2.8vw, 1.2rem);
      color: var(--blush-soft);
    }

    @media (max-width: 700px) {
      .timeline-line { left: 20px; }
      .timeline-card { width: calc(100% - 52px); margin-left: 52px !important; margin-right: 0 !important; }
      .timeline-dot { left: -39px !important; right: auto !important; }
      .timeline-icon { right: 12px !important; left: auto !important; }
    }
  `]
})
export class TimelineComponentComponent {
  timelineEvents = [
    {
      date: '2024',
      title: 'First Meet at College 🎓',
      description: 'Manammoo, the day our paths crossed in college — I had no idea you would become my whole world.',
      icon: '💫'
    },
    {
      date: '2024',
      title: 'Slowly, We Became Friends 🤝',
      description: 'Day by day we talked, laughed, and grew closer. What started small became something beautiful.',
      icon: '💬'
    },
    {
      date: 'Early 2025',
      title: 'More Than Just Friends 💕',
      description: 'Somewhere between late-night talks and shared smiles, we quietly crossed the line from friends to something deeper.',
      icon: '🌸'
    },
    {
      date: '05-04-2025',
      title: 'We Both Said "I Love You" ❤️',
      description: 'April 5th — the day we finally spoke the words our hearts had been whispering all along. I love you, Manammoo.',
      icon: '💝'
    },
    {
      date: '10-04-2025',
      title: 'Officially Us 💑',
      description: 'April 10th — the day we confirmed what we already knew. You and me, together, officially and forever.',
      icon: '💑'
    },
    {
      date: '19-04-2025',
      title: 'Our First Date 🌹',
      description: 'April 19th — our first real date. A memory I will carry in my heart for the rest of my life.',
      icon: '🌹'
    },
    {
      date: '27-06-2026',
      title: 'Happy Birthday, My Queen 👑',
      description: 'Today we celebrate YOU — Manammoo, the most beautiful soul in my universe.',
      icon: '👑'
    }
  ];
}

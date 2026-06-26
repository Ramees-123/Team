import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="login-wrapper">
      <div class="login-bg-hearts">
        <span *ngFor="let h of hearts" [style.left]="h.left" [style.top]="h.top" [style.animation-delay]="h.delay">{{ h.char }}</span>
      </div>

      <div class="login-container glass-card">
        <div class="login-portrait-wrap">
          <img class="login-portrait" src="/assets/images/IMG-20241229-WA0067.webp" alt="Manammoo">
        </div>

        <div class="login-header">
          <div class="lock-icon">🔐</div>
          <h1 class="login-title">For Manammoo Only</h1>
          <p class="login-subtitle">Enter our special date to unlock your birthday surprise</p>
        </div>

        <div class="login-form">
          <div class="input-group">
            <input
              type="password"
              [(ngModel)]="password"
              (keyup.enter)="checkPassword()"
              placeholder="DD-MM-YY"
              class="premium-input"
              [class.error]="showError"
              [class.success]="isUnlocked"
              autocomplete="off"
            >
            <span class="input-icon">🔑</span>
          </div>

          <div *ngIf="showError" class="error-message">
            ❌ That's not it, my love — try our special date
          </div>

          <div *ngIf="isUnlocked" class="welcome-message">
            <div class="welcome-hearts">💖💕💗</div>
            <h2 class="welcome-text">Welcome, Manammoo! ❤️</h2>
            <p class="welcome-sub">Your surprise is ready...</p>
          </div>

          <button class="premium-btn enter-btn"
                  (click)="isUnlocked ? navigateToHome() : checkPassword()"
                  [class.unlocked]="isUnlocked"
                  [disabled]="isProcessing">
            <span *ngIf="!isUnlocked && !isProcessing">🎂 Open My Gift</span>
            <span *ngIf="!isUnlocked && isProcessing">🎵 One moment...</span>
            <span *ngIf="isUnlocked && !isProcessing">✨ Enter Your Story ✨</span>
            <span *ngIf="isUnlocked && isProcessing">🎵 Opening your surprise...</span>
          </button>
        </div>

        <div class="login-footer">
          <p>Made with infinite love for <strong>Manammoo</strong> 💝</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-wrapper {
      min-height: 100svh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--section-pad-x);
      position: relative;
      z-index: 1;
      background: linear-gradient(160deg, #0f0509, #2a1222, #3d1a32);
      overflow: hidden;
    }

    .login-bg-hearts span {
      position: absolute;
      font-size: 1.5rem;
      opacity: 0.15;
      animation: floatSlow 6s ease-in-out infinite;
      pointer-events: none;
    }

    .login-container {
      max-width: 420px;
      width: 100%;
      padding: clamp(32px, 6vw, 44px) clamp(24px, 5vw, 36px);
      text-align: center;
      position: relative;
      overflow: hidden;
      animation: fadeInScale 0.8s ease-out;
      border: 1px solid rgba(212,175,55,0.2);
    }

    .login-container::before {
      content: '';
      position: absolute;
      inset: -50%;
      background: conic-gradient(from 0deg, transparent, rgba(212,175,55,0.08), transparent);
      animation: rotate360 8s linear infinite;
    }

    @keyframes rotate360 { to { transform: rotate(360deg); } }

    .login-portrait-wrap {
      margin-bottom: 12px;
      position: relative;
      z-index: 1;
    }

    .login-portrait {
      width: clamp(96px, 24vw, 118px);
      height: clamp(96px, 24vw, 118px);
      border-radius: 50%;
      object-fit: cover;
      object-position: center;
      border: 3px solid rgba(255, 143, 171, 0.5);
      box-shadow: 0 8px 28px rgba(255, 143, 171, 0.25);
      animation: floatSlow 3s ease-in-out infinite;
    }

    .login-header { margin-bottom: 24px; position: relative; z-index: 1; }

    .lock-icon { font-size: 2rem; margin-bottom: 12px; }

    .login-title {
      font-family: 'Playfair Display', serif;
      font-size: clamp(1.5rem, 5vw, 1.9rem);
      background: linear-gradient(135deg, var(--gold), #FFD700, var(--rose));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 8px;
    }

    .login-subtitle {
      color: var(--text-muted);
      font-size: clamp(0.85rem, 2.2vw, 0.95rem);
    }

    .login-form { position: relative; z-index: 1; }

    .input-group { position: relative; margin-bottom: 16px; }

    .premium-input {
      width: 100%;
      padding: 14px 44px 14px 18px;
      border: 2px solid rgba(212,175,55,0.3);
      border-radius: var(--radius);
      font-size: 1rem;
      font-family: 'Poppins', sans-serif;
      background: rgba(255,255,255,0.06);
      color: var(--white);
      transition: var(--transition);
      outline: none;
    }

    .premium-input::placeholder { color: rgba(255,255,255,0.35); }
    .premium-input:focus { border-color: var(--gold); box-shadow: 0 0 20px rgba(212,175,55,0.2); }
    .premium-input.error { border-color: #ff5555; animation: shake 0.4s ease; }
    .premium-input.success { border-color: #4ade80; }

    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-8px); }
      75% { transform: translateX(8px); }
    }

    .input-icon {
      position: absolute;
      right: 16px;
      top: 50%;
      transform: translateY(-50%);
    }

    .error-message {
      color: #ff6b6b;
      font-size: 0.82rem;
      margin-bottom: 12px;
    }

    .welcome-message { margin-bottom: 16px; animation: fadeInUp 0.5s ease; }

    .welcome-hearts { font-size: 1.8rem; margin-bottom: 8px; }

    .welcome-text {
      font-family: 'Great Vibes', cursive;
      font-size: clamp(1.8rem, 6vw, 2.4rem);
      color: var(--rose);
    }

    .welcome-sub { color: var(--text-muted); font-size: 0.9rem; margin-top: 4px; }

    .enter-btn {
      width: 100%;
      justify-content: center;
    }

    .enter-btn.unlocked {
      background: linear-gradient(135deg, var(--rose-deep), var(--rose));
      color: white;
    }

    .enter-btn:disabled {
      opacity: 0.85;
      cursor: wait;
    }

    .login-footer {
      margin-top: 24px;
      color: var(--text-muted);
      font-size: 0.82rem;
      position: relative;
      z-index: 1;
    }

    .login-footer strong { color: var(--gold-light); }
  `]
})
export class LoginPageComponent implements OnDestroy {
  password = '';
  showError = false;
  isUnlocked = false;
  isProcessing = false;
  private loginAudio: HTMLAudioElement | null = null;

  hearts = ['💕','💖','🌸','✨','💗','🎂'].map((char, i) => ({
    char,
    left: (10 + i * 14) + '%',
    top: (15 + (i % 2) * 50) + '%',
    delay: (i * 0.5) + 's'
  }));

  constructor(private router: Router) {}

  checkPassword() {
    if (this.isProcessing) return;

    if (this.password === '27-06-22') {
      this.isUnlocked = true;
      this.showError = false;
      this.isProcessing = true;
      this.playSound('/assets/allow.ogg', () => {
        this.isProcessing = false;
        this.router.navigate(['/home']);
      });
    } else {
      this.showError = true;
      this.isUnlocked = false;
      this.isProcessing = true;
      this.playSound('/assets/notallow.ogg', () => {
        this.isProcessing = false;
      });
    }
  }

  playSound(src: string, onEnded?: () => void) {
    this.loginAudio?.pause();
    const audio = new Audio(src);
    this.loginAudio = audio;
    audio.volume = 0.85;
    audio.onended = () => onEnded?.();
    audio.onerror = () => onEnded?.();
    audio.play().catch(() => onEnded?.());
  }

  ngOnDestroy() {
    this.loginAudio?.pause();
    this.loginAudio = null;
  }

  navigateToHome() {
    if (this.isProcessing) return;
    this.router.navigate(['/home']);
  }
}

import { Component, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manna-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="modal-overlay" *ngIf="isOpen" (click)="closeModal()">
      <div class="modal-container" (click)="$event.stopPropagation()">
        <button class="close-btn" (click)="closeModal()">×</button>

        <div class="modal-header">
          <div class="sparkles">✨ 💕 ✨</div>
          <h2 class="modal-title">A Special Message For Manammoo 💌</h2>
          <p class="modal-subtitle">Press play — this is just for you, my love</p>
        </div>

        <div class="video-cinema">
          <div class="cinema-glow"></div>
          <video #videoPlayer class="modal-video" controls playsinline (click)="$event.stopPropagation()">
            <source src="/assets/manna.mp4" type="video/mp4">
          </video>
        </div>

        <div class="modal-footer">
          <p>Made with ❤️ for <strong>Manammoo</strong></p>
          <button class="close-modal-btn" (click)="closeModal()">
            Back to Your Story <span>💝</span>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.9);
      backdrop-filter: blur(12px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      padding: 12px;
      animation: fadeIn 0.4s ease;
    }

    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

    .modal-container {
      width: min(100%, 880px);
      max-height: 92vh;
      overflow: auto;
      background: linear-gradient(145deg, rgba(26,16,53,0.95), rgba(10,10,20,0.98));
      border: 1px solid rgba(212,175,55,0.25);
      border-radius: var(--radius-lg);
      padding: clamp(20px, 4vw, 32px);
      position: relative;
      animation: slideUp 0.5s cubic-bezier(0.34, 1.4, 0.64, 1);
      box-shadow: 0 24px 80px rgba(0,0,0,0.5), 0 0 40px rgba(212,175,55,0.1);
    }

    @keyframes slideUp {
      from { opacity: 0; transform: translateY(40px) scale(0.96); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }

    .close-btn {
      position: absolute;
      top: 12px;
      right: 12px;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: 1px solid rgba(212,175,55,0.3);
      background: rgba(255,255,255,0.06);
      color: var(--gold-light);
      font-size: 1.6rem;
      cursor: pointer;
      transition: var(--transition);
      z-index: 2;
    }

    .close-btn:hover { transform: rotate(90deg); background: rgba(212,175,55,0.2); }

    .modal-header { text-align: center; margin-bottom: 16px; }

    .sparkles {
      font-size: 1.2rem;
      letter-spacing: 12px;
      animation: sparkle 2s ease-in-out infinite;
    }

    .modal-title {
      font-family: 'Playfair Display', serif;
      font-size: clamp(1.3rem, 4vw, 1.8rem);
      background: linear-gradient(135deg, var(--gold), var(--rose));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin: 12px 0 6px;
    }

    .modal-subtitle {
      color: var(--text-muted);
      font-size: 0.88rem;
    }

    .video-cinema {
      position: relative;
      border-radius: var(--radius);
      overflow: hidden;
      background: #000;
      box-shadow: 0 16px 48px rgba(0,0,0,0.5);
    }

    .cinema-glow {
      position: absolute;
      inset: -2px;
      background: linear-gradient(135deg, rgba(212,175,55,0.3), rgba(255,107,157,0.2));
      border-radius: var(--radius);
      z-index: 0;
      animation: pulseGlow 3s ease-in-out infinite;
    }

    .modal-video {
      width: 100%;
      display: block;
      position: relative;
      z-index: 1;
      border-radius: var(--radius);
      max-height: 55vh;
      object-fit: contain;
      background: #000;
    }

    .modal-footer {
      text-align: center;
      margin-top: 16px;
    }

    .modal-footer p {
      color: var(--text-muted);
      font-size: 0.9rem;
      margin-bottom: 12px;
    }

    .modal-footer strong { color: var(--gold-light); }

    .close-modal-btn {
      background: linear-gradient(135deg, var(--gold), var(--rose));
      border: none;
      border-radius: 30px;
      padding: 12px 28px;
      font-weight: 700;
      color: #1a1a1a;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      transition: var(--transition);
    }

    .close-modal-btn:hover { transform: translateY(-3px); box-shadow: var(--shadow-gold); }
  `]
})
export class MannaModalComponent {
  @ViewChild('videoPlayer') videoPlayer?: ElementRef<HTMLVideoElement>;
  @Output() closeEvent = new EventEmitter<void>();
  isOpen = false;

  open() {
    this.isOpen = true;
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      const video = this.videoPlayer?.nativeElement;
      if (video) {
        video.muted = false;
        video.play().catch(() => {});
      }
    }, 300);
  }

  closeModal() {
    this.isOpen = false;
    document.body.style.overflow = '';
    this.videoPlayer?.nativeElement?.pause();
    this.closeEvent.emit();
  }
}

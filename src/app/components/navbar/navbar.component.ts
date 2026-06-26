import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="navbar" [class.scrolled]="isScrolled" [class.menu-open]="isMenuOpen">
      <div class="nav-container">
        <div class="nav-logo" (click)="scrollToTop()">
          <span class="logo-heart">💝</span>
          <span class="logo-text">Manammoo <span class="logo-amp">&</span> Ramees</span>
        </div>

        <button class="mobile-menu-btn" (click)="toggleMenu()" [class.active]="isMenuOpen" aria-label="Toggle menu">
          <span></span><span></span><span></span>
        </button>

        <div class="nav-links" [class.open]="isMenuOpen">
          <a *ngFor="let link of navLinks; let i = index"
             (click)="scrollTo(link.section)"
             class="nav-link"
             [class.active]="activeSection === link.section"
             [style.--i]="i">
            <span class="nav-icon">{{ link.icon }}</span>
            <span class="nav-label">{{ link.label }}</span>
          </a>
          <button class="audio-toggle-btn" (click)="toggleAudio()" [class.playing]="isAudioPlaying" aria-label="Toggle music">
            <span>{{ isAudioPlaying ? '🔊' : '🔇' }}</span>
          </button>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1100;
      padding: clamp(10px, 2vw, 14px) 0;
      transition: var(--transition);
    }

    .navbar.scrolled {
      background: rgba(15, 5, 9, 0.92);
      backdrop-filter: blur(20px) saturate(1.4);
      -webkit-backdrop-filter: blur(20px) saturate(1.4);
      box-shadow: 0 2px 24px rgba(0,0,0,0.35), 0 1px 0 rgba(255, 143, 171, 0.15);
      padding: 8px 0;
    }

    .nav-container {
      max-width: var(--content-max);
      margin: 0 auto;
      padding: 0 var(--section-pad-x);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }

    .nav-logo {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      flex-shrink: 0;
    }

    .logo-heart {
      font-size: clamp(1.2rem, 3vw, 1.5rem);
      animation: heartbeat 1.5s ease-in-out infinite;
    }

    .logo-text {
      font-family: 'Playfair Display', serif;
      font-size: clamp(1rem, 2.8vw, 1.25rem);
      background: linear-gradient(135deg, var(--gold), var(--gold-light));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-weight: 700;
    }

    .logo-amp {
      font-family: 'Great Vibes', cursive;
      -webkit-text-fill-color: var(--rose);
      font-size: 1.1em;
    }

    .nav-links {
      display: flex;
      align-items: center;
      gap: 2px;
      flex-wrap: wrap;
      justify-content: flex-end;
    }

    .nav-link {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 6px 10px;
      border-radius: 20px;
      cursor: pointer;
      color: rgba(255,255,255,0.55);
      font-size: clamp(0.72rem, 1.8vw, 0.8rem);
      transition: var(--transition);
      white-space: nowrap;
    }

    .nav-link:hover, .nav-link.active {
      background: rgba(255, 143, 171, 0.14);
      color: var(--blush-soft);
    }

    .nav-link.active { border: 1px solid rgba(255, 180, 200, 0.22); }

    .audio-toggle-btn {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 1px solid rgba(212,175,55,0.25);
      background: rgba(255,255,255,0.05);
      cursor: pointer;
      font-size: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: var(--transition);
      margin-left: 4px;
      flex-shrink: 0;
    }

    .audio-toggle-btn:hover, .audio-toggle-btn.playing {
      background: rgba(212,175,55,0.2);
      border-color: var(--gold);
      transform: scale(1.05);
    }

    .mobile-menu-btn {
      display: none;
      flex-direction: column;
      gap: 5px;
      background: none;
      border: none;
      cursor: pointer;
      padding: 6px;
      z-index: 1001;
    }

    .mobile-menu-btn span {
      width: 24px;
      height: 2px;
      background: var(--gold-light);
      border-radius: 2px;
      transition: var(--transition);
    }

    .mobile-menu-btn.active span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
    .mobile-menu-btn.active span:nth-child(2) { opacity: 0; }
    .mobile-menu-btn.active span:nth-child(3) { transform: rotate(-45deg) translate(5px, -5px); }

    @media (max-width: 900px) {
      .mobile-menu-btn { display: flex; }

      .nav-links {
        position: fixed;
        inset: 0;
        background: rgba(10, 10, 20, 0.97);
        backdrop-filter: blur(24px);
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 80px 20px;
        gap: 6px;
        transform: translateY(-100%);
        opacity: 0;
        pointer-events: none;
        transition: all 0.45s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .nav-links.open {
        transform: translateY(0);
        opacity: 1;
        pointer-events: all;
      }

      .nav-link {
        font-size: 1rem;
        padding: 12px 28px;
        width: min(100%, 280px);
        justify-content: center;
        opacity: 0;
        transform: translateY(16px);
        transition: all 0.3s ease calc(var(--i, 0) * 0.04s);
      }

      .nav-links.open .nav-link { opacity: 1; transform: translateY(0); }

      .audio-toggle-btn {
        width: 48px;
        height: 48px;
        font-size: 1.2rem;
        margin-top: 12px;
      }
    }
  `]
})
export class NavbarComponent implements OnInit {
  isScrolled = false;
  isMenuOpen = false;
  activeSection = 'hero';
  isAudioPlaying = false;
  private audio: HTMLAudioElement | null = null;

  navLinks = [
    { section: 'hero', label: 'Home', icon: '🏠' },
    { section: 'counter', label: 'Together', icon: '💕' },
    { section: 'gallery', label: 'Photos', icon: '📸' },
    { section: 'reasons', label: 'Why You', icon: '💝' },
    { section: 'timeline', label: 'Story', icon: '📖' },
    { section: 'letter', label: 'Letter', icon: '💌' },
    { section: 'video', label: 'Videos', icon: '🎥' },
    { section: 'surprise', label: 'Surprise', icon: '🎉' }
  ];

  ngOnInit() {
    window.addEventListener('scroll', this.onScroll.bind(this));
  }

  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled = window.scrollY > 60;

    for (const section of [...this.navLinks.map(l => l.section)].reverse()) {
      const el = document.getElementById(section);
      if (el && el.getBoundingClientRect().top <= 100) {
        this.activeSection = section;
        break;
      }
    }
  }

  scrollTo(section: string) {
    this.isMenuOpen = false;
    document.body.style.overflow = '';
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    document.body.style.overflow = this.isMenuOpen ? 'hidden' : '';
  }

  toggleAudio() {
    this.isAudioPlaying = !this.isAudioPlaying;
    if (this.isAudioPlaying) {
      this.audio = new Audio('assets/mu1.ogg');
      this.audio.loop = true;
      this.audio.volume = 0.35;
      this.audio.play().catch(() => { this.isAudioPlaying = false; });
    } else {
      this.audio?.pause();
      this.audio = null;
    }
  }
}

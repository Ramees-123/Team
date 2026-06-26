import { Component, OnInit, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="app-container">
      <div class="stars-bg" id="starsContainer"></div>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .app-container {
      position: relative;
      min-height: 100vh;
    }
  `]
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'birthday-love-story';

  ngOnInit() {
    this.createStars();
    this.createFloatingHearts();
  }

  ngAfterViewInit() {
    this.removeLoader();
  }

  private removeLoader() {
    const loader = document.getElementById('app-loading');
    if (loader) {
      loader.style.opacity = '0';
      loader.style.transition = 'opacity 0.5s ease';
      setTimeout(() => loader.remove(), 500);
    }
  }

  createStars() {
    const container = document.getElementById('starsContainer');
    if (!container) return;

    for (let i = 0; i < 100; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.left = Math.random() * 100 + '%';
      star.style.top = Math.random() * 100 + '%';
      star.style.setProperty('--duration', (2 + Math.random() * 3) + 's');
      star.style.animationDelay = Math.random() * 3 + 's';
      star.style.width = star.style.height = (1 + Math.random() * 3) + 'px';
      container.appendChild(star);
    }
  }

  createFloatingHearts() {
    const container = document.getElementById('starsContainer');
    if (!container) return;

    const hearts = ['❤️', '💕', '💗', '💖', '💝'];
    for (let i = 0; i < 8; i++) {
      const heart = document.createElement('div');
      heart.className = 'floating-heart';
      heart.textContent = hearts[i % hearts.length];
      heart.style.left = Math.random() * 100 + '%';
      heart.style.top = Math.random() * 100 + '%';
      heart.style.animationDelay = Math.random() * 6 + 's';
      heart.style.fontSize = (14 + Math.random() * 20) + 'px';
      container.appendChild(heart);
    }
  }
}
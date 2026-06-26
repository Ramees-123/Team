import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-photo-gallery',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="gallery" class="gallery-section">
      <div class="gallery-bg" aria-hidden="true">
        <div class="bg-orb o1"></div>
        <div class="bg-orb o2"></div>
        <div class="bg-sparkles"></div>
      </div>

      <div class="gallery-wrap">
        <header class="gallery-header">
          <span class="hdr-icon">📸</span>
          <h2 class="section-title gold-text">Manammoo — Our Beautiful Memories</h2>
          <p class="section-subtitle">{{ totalPhotoCount }} precious moments with you, my love</p>
        </header>

        <!-- Film strip — hero picks, full photo always visible -->
        <div class="film-strip" role="list">
          <article class="film-frame hero-frame"
                   role="listitem"
                   (click)="openLightbox(heroPhotos[0], 'Manammoo & Ramees', 1)">
            <img [src]="getImagePath(heroPhotos[0])"
                 alt="Manammoo"
                 loading="eager"
                 decoding="async"
                 (error)="onImgError($event)">
            <span class="film-label">👑 Manammoo</span>
          </article>
          <div class="film-thumbs">
            <article class="film-frame thumb"
                     *ngFor="let photo of heroPhotos.slice(1); let i = index"
                     role="listitem"
                     (click)="openLightbox(photo, 'Manammoo & Ramees', i + 2)">
              <img [src]="getImagePath(photo)"
                   [alt]="'Memory ' + (i + 2)"
                   loading="eager"
                   decoding="async"
                   (error)="onImgError($event)">
            </article>
          </div>
        </div>

        <!-- Category scrapbooks -->
        <div class="albums">
          <section class="album" *ngFor="let category of categories">
            <div class="album-bar" [style.background]="category.gradient">
              <span class="album-icon">{{ category.icon }}</span>
              <div>
                <h3>{{ category.name }}</h3>
                <span>{{ category.photos.length }} photos</span>
              </div>
            </div>
            <div class="scrapbook-grid">
              <article class="scrap-card"
                       *ngFor="let photo of category.photos; let i = index"
                       (click)="openLightbox(photo, category.name, i + 1)">
                <div class="scrap-img-wrap">
                  <img [src]="getImagePath(photo)"
                       [alt]="category.name + ' ' + (i + 1)"
                       loading="lazy"
                       decoding="async"
                       (error)="onImgError($event)">
                </div>
                <span class="scrap-tag">{{ i + 1 }}</span>
              </article>
            </div>
          </section>
        </div>

        <!-- Masonry memory wall — every photo, natural size -->
        <section class="memory-wall">
          <h3 class="wall-title">💎 Every Moment With Manammoo</h3>
          <div class="masonry">
            <article class="masonry-item"
                     *ngFor="let photo of uniquePhotos; let i = index"
                     (click)="openLightbox(photo, 'All Memories', i + 1)">
              <img [src]="getImagePath(photo)"
                   [alt]="'Memory ' + (i + 1)"
                   loading="lazy"
                   decoding="async"
                   (error)="onImgError($event)">
              <span class="masonry-badge">#{{ i + 1 }}</span>
            </article>
          </div>
        </section>
      </div>

      <div class="lightbox" *ngIf="lightboxImage" (click)="closeLightbox()">
        <div class="lb-backdrop"></div>
        <div class="lb-panel" (click)="$event.stopPropagation()">
          <div class="lb-top">
            <span>{{ lightboxCategory }} · {{ lightboxNum }} / {{ uniquePhotos.length }}</span>
            <button type="button" (click)="closeLightbox()" aria-label="Close">✕</button>
          </div>
          <div class="lb-body">
            <button type="button" class="lb-nav prev" (click)="prevImage()" *ngIf="uniquePhotos.length > 1">‹</button>
            <figure class="lb-figure">
              <img [src]="lightboxImage" alt="Manammoo memory" class="lb-img">
            </figure>
            <button type="button" class="lb-nav next" (click)="nextImage()" *ngIf="uniquePhotos.length > 1">›</button>
          </div>
          <p class="lb-caption">💖 Made for Manammoo 💖</p>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .gallery-section {
      position: relative;
      padding: var(--section-pad-y) 0;
      background: linear-gradient(180deg, var(--bg-1), var(--bg-2), var(--bg-0));
      overflow: hidden;
    }

    .gallery-bg { position: absolute; inset: 0; pointer-events: none; }
    .bg-orb {
      position: absolute;
      border-radius: 50%;
      filter: blur(90px);
      animation: orbDrift 16s ease-in-out infinite;
    }
    .o1 { width: 50%; height: 40%; top: 0; left: -10%; background: rgba(255,143,171,0.12); }
    .o2 { width: 45%; height: 35%; bottom: 5%; right: -8%; background: rgba(240,201,135,0.1); animation-delay: -6s; }
    .bg-sparkles {
      position: absolute;
      inset: 0;
      background-image: radial-gradient(rgba(255,200,215,0.06) 1px, transparent 1px);
      background-size: 28px 28px;
      opacity: 0.5;
    }

    @keyframes orbDrift {
      0%, 100% { transform: translate(0, 0); }
      50% { transform: translate(15px, -12px); }
    }

    .gallery-wrap {
      position: relative;
      z-index: 1;
      width: 100%;
      max-width: var(--content-max);
      margin: 0 auto;
      padding: 0 clamp(10px, 2.5vw, 24px);
    }

    .gallery-header {
      text-align: center;
      margin-bottom: clamp(20px, 4vw, 32px);
    }

    .hdr-icon {
      font-size: clamp(2rem, 5vw, 2.8rem);
      display: block;
      margin-bottom: 6px;
      animation: floatSlow 3s ease-in-out infinite;
    }

    /* ── Film strip spotlight ── */
    .film-strip {
      display: grid;
      grid-template-columns: 1.35fr 1fr;
      gap: clamp(8px, 2vw, 14px);
      margin-bottom: clamp(24px, 5vw, 40px);
      align-items: stretch;
    }

    .film-thumbs {
      display: grid;
      grid-template-rows: repeat(3, 1fr);
      gap: clamp(8px, 2vw, 14px);
    }

    .film-frame {
      position: relative;
      cursor: pointer;
      border-radius: var(--radius);
      overflow: hidden;
      background: linear-gradient(160deg, #1a0b14, #2a1222);
      border: 2px solid rgba(255, 180, 200, 0.22);
      box-shadow: 0 10px 32px rgba(0,0,0,0.35);
      transition: transform 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: clamp(6px, 1.2vw, 10px);
    }

    .film-frame:hover {
      transform: translateY(-4px);
      border-color: rgba(255, 143, 171, 0.5);
      box-shadow: 0 14px 40px rgba(255,143,171,0.18);
    }

    .film-frame img {
      width: 100%;
      height: auto;
      max-height: min(72vh, 520px);
      object-fit: contain;
      object-position: center;
      display: block;
      border-radius: clamp(4px, 1vw, 8px);
    }

    .hero-frame img {
      max-height: min(78vh, 560px);
    }

    .thumb img {
      max-height: clamp(90px, 18vw, 160px);
    }

    .film-label {
      display: block;
      width: 100%;
      text-align: center;
      padding: 10px 6px 4px;
      font-family: 'Great Vibes', cursive;
      font-size: clamp(1.2rem, 4vw, 1.85rem);
      color: var(--blush-soft);
    }

    /* ── Scrapbook albums ── */
    .albums {
      display: flex;
      flex-direction: column;
      gap: clamp(18px, 3.5vw, 28px);
      margin-bottom: clamp(28px, 5vw, 44px);
    }

    .album {
      border-radius: var(--radius);
      overflow: hidden;
      border: 1px solid rgba(255, 180, 200, 0.15);
      background: rgba(255,255,255,0.02);
    }

    .album-bar {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 16px;
    }

    .album-icon { font-size: 1.5rem; }

    .album-bar h3 {
      font-family: 'Playfair Display', serif;
      font-size: clamp(0.95rem, 2.8vw, 1.1rem);
      color: #fff;
      font-weight: 600;
    }

    .album-bar span {
      font-size: 0.75rem;
      color: rgba(255,255,255,0.6);
    }

    .scrapbook-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: clamp(8px, 2vw, 14px);
      padding: 0 clamp(10px, 2vw, 16px) clamp(12px, 2.5vw, 18px);
    }

    .scrap-card {
      position: relative;
      cursor: pointer;
      border-radius: clamp(10px, 2vw, 14px);
      padding: clamp(6px, 1.2vw, 9px);
      background: linear-gradient(165deg, rgba(255,240,245,0.14), rgba(255,180,200,0.05));
      border: 1px solid rgba(255, 200, 215, 0.2);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .scrap-card:hover {
      transform: translateY(-3px) scale(1.01);
      box-shadow: 0 10px 28px rgba(255,143,171,0.22);
    }

    .scrap-img-wrap {
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(145deg, #140810, #221018);
      border-radius: clamp(6px, 1.2vw, 10px);
      overflow: hidden;
      min-height: 120px;
    }

    .scrap-img-wrap img {
      width: 100%;
      height: auto;
      max-height: none;
      object-fit: contain;
      object-position: center;
      display: block;
      vertical-align: middle;
    }

    .scrap-tag {
      position: absolute;
      top: 14px;
      left: 14px;
      font-size: 0.65rem;
      font-weight: 700;
      color: #fff;
      background: rgba(255,143,171,0.65);
      padding: 3px 9px;
      border-radius: 12px;
      backdrop-filter: blur(4px);
    }

    /* ── Masonry wall ── */
    .memory-wall { padding-bottom: 16px; }

    .wall-title {
      text-align: center;
      font-family: 'Playfair Display', serif;
      font-size: clamp(1.1rem, 3.5vw, 1.5rem);
      color: var(--blush-soft);
      margin-bottom: clamp(16px, 3vw, 24px);
    }

    .masonry {
      column-count: 2;
      column-gap: clamp(8px, 2vw, 14px);
    }

    .masonry-item {
      position: relative;
      display: inline-block;
      width: 100%;
      margin: 0 0 clamp(8px, 2vw, 14px);
      break-inside: avoid;
      cursor: pointer;
      border-radius: var(--radius-sm);
      overflow: hidden;
      border: 1px solid rgba(255, 180, 200, 0.18);
      background: linear-gradient(160deg, #1a0b14, #2a1222);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .masonry-item:hover {
      transform: scale(1.02);
      box-shadow: 0 8px 24px rgba(255,143,171,0.2);
      z-index: 2;
    }

    .masonry-item img {
      width: 100%;
      height: auto;
      display: block;
      object-fit: contain;
      object-position: center;
    }

    .masonry-badge {
      position: absolute;
      bottom: 8px;
      right: 8px;
      font-size: 0.65rem;
      font-weight: 700;
      color: #fff;
      background: rgba(0,0,0,0.45);
      padding: 3px 9px;
      border-radius: 10px;
      border: 1px solid rgba(255,180,200,0.25);
    }

    /* ── Lightbox ── */
    .lightbox {
      position: fixed;
      inset: 0;
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: clamp(8px, 2vw, 16px);
    }

    .lb-backdrop {
      position: absolute;
      inset: 0;
      background: rgba(8, 3, 6, 0.97);
      backdrop-filter: blur(18px);
    }

    .lb-panel {
      position: relative;
      width: min(100%, 1000px);
      max-height: 96vh;
      display: flex;
      flex-direction: column;
    }

    .lb-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 4px 12px;
      color: var(--text-muted);
      font-size: 0.85rem;
      flex-shrink: 0;
    }

    .lb-top button {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      border: 1px solid rgba(255,180,200,0.25);
      background: rgba(255,143,171,0.15);
      color: #fff;
      cursor: pointer;
      font-size: 1.1rem;
    }

    .lb-body {
      display: flex;
      align-items: center;
      gap: clamp(6px, 1.5vw, 12px);
      flex: 1;
      min-height: 0;
    }

    .lb-figure {
      flex: 1;
      margin: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 45vh;
      max-height: 80vh;
      background: rgba(0,0,0,0.45);
      border-radius: var(--radius);
      border: 1px solid rgba(255,180,200,0.14);
      padding: clamp(8px, 2vw, 16px);
      overflow: hidden;
    }

    .lb-img {
      max-width: 100%;
      max-height: 76vh;
      width: auto;
      height: auto;
      object-fit: contain;
      display: block;
    }

    .lb-nav {
      flex-shrink: 0;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      border: 1px solid rgba(255,180,200,0.2);
      background: rgba(255,143,171,0.12);
      color: #fff;
      font-size: 1.6rem;
      cursor: pointer;
    }

    .lb-caption {
      text-align: center;
      padding: 12px 8px 4px;
      color: var(--blush-soft);
      font-size: 0.88rem;
      flex-shrink: 0;
    }

    @media (min-width: 600px) {
      .scrapbook-grid {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }

      .masonry { column-count: 3; }
    }

    @media (min-width: 900px) {
      .scrapbook-grid {
        grid-template-columns: repeat(4, minmax(0, 1fr));
      }

      .masonry { column-count: 4; }
    }

    @media (max-width: 599px) {
      .film-strip {
        grid-template-columns: 1fr;
      }

      .film-thumbs {
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: auto;
      }

      .thumb img {
        max-height: clamp(100px, 28vw, 140px);
      }
    }
  `]
})
export class PhotoGalleryComponent {
  lightboxImage: string | null = null;
  lightboxCategory = '';
  lightboxNum = 0;
  lightboxIndex = 0;

  heroPhotos = [
    'IMG-20241229-WA0067.webp',
    'WhatsApp_Image_2026-06-11_at_2.35.22_PM.webp',
    'WhatsApp_Image_2026-06-11_at_2.51.31_PM.webp',
    'WhatsApp_Image_2026-06-11_at_2.53.41_PM.webp'
  ];

  categories = [
    {
      name: '💑 Me & Manammoo',
      icon: '💑',
      gradient: 'linear-gradient(135deg, #2d1b3d, #4a1a3e)',
      photos: [
        'WhatsApp_Image_2026-06-11_at_2.35.22_PM.webp',
        'WhatsApp_Image_2026-06-11_at_2.35.24_PM.webp',
        'WhatsApp_Image_2026-06-11_at_2.37.35_PM.webp',
        'WhatsApp_Image_2026-06-11_at_2.51.31_PM.webp',
        'WhatsApp_Image_2026-06-11_at_2.52.00_PM.webp',
        'WhatsApp_Image_2026-06-11_at_2.53.41_PM.webp',
        'WhatsApp_Image_2026-06-11_at_2.53.44_PM.webp',
        'WhatsApp_Image_2026-06-11_at_2.54.53_PM.webp'
      ]
    },
    {
      name: '🎉 With Friends',
      icon: '🎉',
      gradient: 'linear-gradient(135deg, #3d1a2e, #4a1a2e)',
      photos: [
        'WhatsApp_Image_2026-06-11_at_2.33.00_PM.webp',
        'WhatsApp_Image_2026-06-11_at_2.33.19_PM.webp',
        'WhatsApp_Image_2026-06-11_at_2.37.31_PM.webp',
        'WhatsApp_Image_2026-06-11_at_2.52.13_PM.webp',
        'WhatsApp_Image_2026-06-11_at_2.52.20_PM.webp',
        'WhatsApp_Image_2026-06-11_at_2.53.48_PM.webp'
      ]
    },
    {
      name: '👨‍👩‍👧‍👦 Family',
      icon: '👨‍👩‍👧‍👦',
      gradient: 'linear-gradient(135deg, #1a2d3d, #1a3d3d)',
      photos: [
        'WhatsApp_Image_2026-06-11_at_2.35.20_PM.webp',
        'WhatsApp_Image_2026-06-11_at_2.37.36_PM.webp',
        'WhatsApp_Image_2026-06-11_at_2.51.42_PM.webp',
        'WhatsApp_Image_2026-06-11_at_2.52.07_PM.webp',
        'WhatsApp_Image_2026-06-11_at_2.53.43_PM.webp',
        'WhatsApp_Image_2026-06-11_at_2.54.47_PM.webp',
        'm1.webp', 'm2.webp', 'm3.webp'
      ]
    },
    {
      name: '✨ Good Memories',
      icon: '✨',
      gradient: 'linear-gradient(135deg, #1a3d2d, #1a3d1a)',
      photos: [
        'WhatsApp_Image_2026-06-11_at_2.37.41_PM.webp',
        'WhatsApp_Image_2026-06-11_at_2.50.53_PM.webp',
        'WhatsApp_Image_2026-06-11_at_2.50.54_PM.webp',
        'WhatsApp_Image_2026-06-11_at_2.51.14_PM.webp',
        'WhatsApp_Image_2026-06-11_at_2.52.18_PM.webp',
        'WhatsApp_Image_2026-06-11_at_2.53.19_PM.webp',
        'm4.webp', 'm5.webp', 'm6.webp'
      ]
    },
    {
      name: '✈️ Adventures',
      icon: '✈️',
      gradient: 'linear-gradient(135deg, #1a1a3d, #2d1a3d)',
      photos: [
        'WhatsApp_Image_2026-06-11_at_2.49.43_PM.webp',
        'WhatsApp_Image_2026-06-11_at_2.50.58_PM.webp',
        'WhatsApp_Image_2026-06-11_at_2.50.59_PM.webp',
        'WhatsApp_Image_2026-06-11_at_2.51.10_PM.webp',
        'WhatsApp_Image_2026-06-11_at_2.51.32_PM.webp',
        'WhatsApp_Image_2026-06-11_at_2.53.09_PM.webp',
        '20250603_171921.webp', '20250603_172359.webp', '20250218_173806.webp'
      ]
    },
    {
      name: '😆 Fun Moments',
      icon: '😆',
      gradient: 'linear-gradient(135deg, #3d2d1a, #3d1a1a)',
      photos: [
        'WhatsApp_Image_2026-06-11_at_2.51.12_PM.webp',
        'WhatsApp_Image_2026-06-11_at_2.51.18_PM.webp',
        'WhatsApp_Image_2026-06-11_at_2.51.19_PM.webp',
        'WhatsApp_Image_2026-06-11_at_2.51.20_PM.webp',
        'WhatsApp_Image_2026-06-11_at_2.51.30_PM.webp',
        'WhatsApp_Image_2026-06-11_at_2.53.47_PM.webp',
        '20250604_153017.webp', '20250604_153021.webp', '20250604_153119.webp'
      ]
    },
    {
      name: '🤳 Selfies',
      icon: '🤳',
      gradient: 'linear-gradient(135deg, #2d1a2d, #3d1a2d)',
      photos: [
        'WhatsApp_Image_2026-06-11_at_2.51.23_PM.webp',
        'WhatsApp_Image_2026-06-11_at_2.51.24_PM.webp',
        'WhatsApp_Image_2026-06-11_at_2.51.25_PM.webp',
        'WhatsApp_Image_2026-06-11_at_2.51.27_PM.webp',
        'WhatsApp_Image_2026-06-11_at_2.51.33_PM.webp',
        'WhatsApp_Image_2026-06-11_at_2.51.36_PM.webp',
        'WhatsApp_Image_2026-06-11_at_2.51.38_PM.webp',
        'WhatsApp_Image_2026-06-11_at_2.51.39_PM.webp',
        'WhatsApp_Image_2026-06-11_at_2.51.40_PM.webp',
        'WhatsApp_Image_2026-06-11_at_2.51.41_PM.webp',
        'WhatsApp_Image_2026-06-11_at_2.51.47_PM.webp',
        '20250603_171921(0).webp', 'm7.webp', 'm8.webp'
      ]
    },
    {
      name: '🌅 Golden Times',
      icon: '🌅',
      gradient: 'linear-gradient(135deg, #3d2d1a, #4a3010)',
      photos: [
        'WhatsApp_Image_2026-06-11_at_2.52.06_PM.webp',
        'WhatsApp_Image_2026-06-11_at_2.52.11_PM.webp',
        'WhatsApp_Image_2026-06-11_at_2.52.14_PM.webp',
        'WhatsApp_Image_2026-06-11_at_2.53.00_PM.webp',
        'WhatsApp_Image_2026-06-11_at_2.53.03_PM.webp',
        'WhatsApp_Image_2026-06-11_at_2.53.12_PM.webp',
        'WhatsApp_Image_2026-06-11_at_2.53.14_PM.webp',
        'WhatsApp_Image_2026-06-11_at_2.53.17_PM.webp',
        'WhatsApp_Image_2026-06-11_at_2.53.51_PM.webp',
        'WhatsApp_Image_2026-06-11_at_2.54.54_PM.webp',
        'm9.webp', 'm10.webp'
      ]
    },
    {
      name: '🌸 Beautiful',
      icon: '🌸',
      gradient: 'linear-gradient(135deg, #1a2d3d, #2d1a3d)',
      photos: ['20221121_174458.webp', 'IMG-20241229-WA0067.webp']
    }
  ];

  allPhotos: string[] = [];
  uniquePhotos: string[] = [];

  get totalPhotoCount(): number {
    return this.uniquePhotos.length;
  }

  constructor() {
    this.allPhotos = this.categories.flatMap(c => c.photos);
    this.uniquePhotos = [...new Set(this.allPhotos)];
  }

  getImagePath(photo: string): string {
    return '/assets/images/' + encodeURIComponent(photo);
  }

  openLightbox(photo: string, category: string, num: number) {
    this.lightboxIndex = this.uniquePhotos.indexOf(photo);
    if (this.lightboxIndex < 0) this.lightboxIndex = this.allPhotos.indexOf(photo);
    this.lightboxCategory = category;
    this.lightboxNum = num;
    this.lightboxImage = this.getImagePath(photo);
    document.body.style.overflow = 'hidden';
  }

  closeLightbox() {
    this.lightboxImage = null;
    document.body.style.overflow = '';
  }

  prevImage() {
    if (!this.uniquePhotos.length) return;
    this.lightboxIndex = (this.lightboxIndex - 1 + this.uniquePhotos.length) % this.uniquePhotos.length;
    const photo = this.uniquePhotos[this.lightboxIndex];
    this.lightboxImage = this.getImagePath(photo);
    this.lightboxNum = this.lightboxIndex + 1;
    this.lightboxCategory = this.getCategoryForPhoto(photo);
  }

  nextImage() {
    if (!this.uniquePhotos.length) return;
    this.lightboxIndex = (this.lightboxIndex + 1) % this.uniquePhotos.length;
    const photo = this.uniquePhotos[this.lightboxIndex];
    this.lightboxImage = this.getImagePath(photo);
    this.lightboxNum = this.lightboxIndex + 1;
    this.lightboxCategory = this.getCategoryForPhoto(photo);
  }

  private getCategoryForPhoto(photo: string): string {
    return this.categories.find(c => c.photos.includes(photo))?.name ?? 'All Memories';
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboard(event: KeyboardEvent) {
    if (!this.lightboxImage) return;
    if (event.key === 'Escape') this.closeLightbox();
    if (event.key === 'ArrowLeft') this.prevImage();
    if (event.key === 'ArrowRight') this.nextImage();
  }

  onImgError(event: Event) {
    const img = event.target as HTMLImageElement;
    if (img.dataset['failed']) return;
    img.dataset['failed'] = '1';
    img.style.minHeight = '80px';
    img.alt = '💝 Photo loading...';
  }
}

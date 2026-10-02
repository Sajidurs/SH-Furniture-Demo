/*
  SH Furniture – hero slider (sections/sh-hero-slider.liquid)

  The track already slides with CSS scroll-snap. This element adds:
  - arrows + dots, kept in sync while the visitor swipes
  - autoplay that pauses on hover, keyboard focus, hidden tab, or the pause button
    (skipped entirely for visitors who prefer reduced motion)
  - `inert` on off-screen slides so keyboard users only tab through the visible one
  - theme editor support: selecting a slide block shows that slide
*/
if (!customElements.get('sh-hero-slider')) {
  class ShHeroSlider extends HTMLElement {
    connectedCallback() {
      this.track = this.querySelector('.sh-hero__track');
      this.slides = Array.from(this.track.children);
      if (this.slides.length < 2) return;

      this.dots = Array.from(this.querySelectorAll('[data-hero-dot]'));
      this.playButton = this.querySelector('[data-hero-play]');
      this.index = 0;
      this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      this.autoplay = this.dataset.autoplay === 'true' && !this.reducedMotion;
      this.speed = (parseInt(this.dataset.speed, 10) || 6) * 1000;
      this.userPaused = false;

      // Controls
      this.querySelector('[data-hero-prev]')?.addEventListener('click', () => this.goTo(this.index - 1));
      this.querySelector('[data-hero-next]')?.addEventListener('click', () => this.goTo(this.index + 1));
      this.dots.forEach((dot) => dot.addEventListener('click', () => this.goTo(Number(dot.dataset.heroDot))));
      this.playButton?.addEventListener('click', () => this.togglePlay());
      if (this.playButton && !this.autoplay) this.playButton.hidden = true;

      // Keep dots in sync with swiping (throttled to one update per frame)
      this.track.addEventListener(
        'scroll',
        () => {
          if (this.ticking) return;
          this.ticking = true;
          requestAnimationFrame(() => {
            this.ticking = false;
            this.updateIndex();
          });
        },
        { passive: true }
      );

      // Pause while the visitor is reading or using the slider
      this.addEventListener('mouseenter', () => this.stop());
      this.addEventListener('mouseleave', () => this.start());
      this.addEventListener('focusin', () => this.stop());
      this.addEventListener('focusout', (event) => {
        if (!this.contains(event.relatedTarget)) this.start();
      });

      this.onVisibilityChange = () => (document.hidden ? this.stop() : this.start());
      document.addEventListener('visibilitychange', this.onVisibilityChange);

      // Theme editor: show the selected slide and hold it there
      this.onBlockSelect = (event) => {
        const slideIndex = this.slides.indexOf(event.target);
        if (slideIndex === -1) return;
        this.editorHold = true;
        this.stop();
        this.goTo(slideIndex, true);
      };
      this.onBlockDeselect = (event) => {
        if (this.slides.indexOf(event.target) === -1) return;
        this.editorHold = false;
        this.start();
      };
      document.addEventListener('shopify:block:select', this.onBlockSelect);
      document.addEventListener('shopify:block:deselect', this.onBlockDeselect);

      this.updateInert();
      this.classList.add('is-ready');
      this.start();
    }

    disconnectedCallback() {
      this.stop();
      document.removeEventListener('visibilitychange', this.onVisibilityChange);
      document.removeEventListener('shopify:block:select', this.onBlockSelect);
      document.removeEventListener('shopify:block:deselect', this.onBlockDeselect);
    }

    /** Scroll to a slide. Wraps around at both ends. */
    goTo(index, instant = false) {
      const count = this.slides.length;
      const target = (index + count) % count;
      this.track.scrollTo({
        left: target * this.track.clientWidth,
        behavior: instant || this.reducedMotion ? 'auto' : 'smooth',
      });
    }

    /** Work out the current slide from the scroll position. */
    updateIndex() {
      const index = Math.round(this.track.scrollLeft / this.track.clientWidth);
      if (index === this.index || !this.slides[index]) return;
      this.index = index;
      this.dots.forEach((dot, i) => dot.setAttribute('aria-current', i === index ? 'true' : 'false'));
      this.updateInert();
    }

    updateInert() {
      this.slides.forEach((slide, i) => (slide.inert = i !== this.index));
    }

    start() {
      if (!this.autoplay || this.userPaused || this.editorHold || this.timer) return;
      this.timer = setInterval(() => this.goTo(this.index + 1), this.speed);
    }

    stop() {
      clearInterval(this.timer);
      this.timer = null;
    }

    togglePlay() {
      this.userPaused = !this.userPaused;
      this.classList.toggle('is-paused', this.userPaused);
      const label = this.userPaused ? this.playButton.dataset.labelPlay : this.playButton.dataset.labelPause;
      this.playButton.setAttribute('aria-label', label);
      this.userPaused ? this.stop() : this.start();
    }
  }

  customElements.define('sh-hero-slider', ShHeroSlider);
}

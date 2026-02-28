import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initAnimations() {
  // ── Reveal: generic elements (skip hero — it has its own stagger) ─────
  const reveals = document.querySelectorAll('.reveal');
  reveals.forEach((el) => {
    if (el.closest('.hero')) return;
    gsap.fromTo(
      el,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      }
    );
  });

  // ── Hero: staggered entrance ──────────────────────────────────────────
  const heroElements = document.querySelectorAll('.hero .reveal');
  heroElements.forEach((el, i) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.15 + i * 0.14,
        ease: 'power3.out',
      }
    );
  });

  // ── Hero: stat counters ───────────────────────────────────────────────
  const statNums = document.querySelectorAll('.stat-num[data-target]');
  if (statNums.length > 0) {
    ScrollTrigger.create({
      trigger: statNums[0],
      start: 'top 90%',
      once: true,
      onEnter: () => {
        statNums.forEach((el) => {
          const target = parseInt(el.getAttribute('data-target') || '0', 10);
          const obj = { val: 0 };
          gsap.to(obj, {
            val: target,
            duration: 1.5,
            ease: 'power2.out',
            delay: 0.3,
            onUpdate: () => {
              el.textContent = Math.round(obj.val).toString();
            },
          });
        });
      },
    });
  }

  // ── Tech items: scale in with stagger ────────────────────────────────
  ScrollTrigger.batch('.tech-item', {
    onEnter: (elements) => {
      gsap.fromTo(
        elements,
        { opacity: 0, scale: 0.88, y: 10 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.045,
          ease: 'back.out(1.7)',
        }
      );
    },
    start: 'top 88%',
  });

  // ── Timeline items: slide from left ──────────────────────────────────
  ScrollTrigger.batch('.timeline-item', {
    onEnter: (elements) => {
      gsap.fromTo(
        elements,
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.85,
          stagger: 0.18,
          ease: 'power3.out',
        }
      );
    },
    start: 'top 88%',
  });

  // ── Project cards: staggered fade+scale ──────────────────────────────
  ScrollTrigger.batch('.project-card', {
    onEnter: (elements) => {
      gsap.fromTo(
        elements,
        { opacity: 0, y: 50, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.75,
          stagger: 0.1,
          ease: 'power3.out',
        }
      );
    },
    start: 'top 90%',
  });

  // ── Passion tags: pop in ──────────────────────────────────────────────
  const passionTags = document.querySelectorAll('.passion-tag');
  if (passionTags.length > 0) {
    gsap.fromTo(
      passionTags,
      { opacity: 0, scale: 0.7, y: 10 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'back.out(2)',
        delay: 1.2,
      }
    );
  }

  // ── Achievement card: float animation ────────────────────────────────
  const achievement = document.querySelector('.achievement-card');
  if (achievement) {
    gsap.to(achievement, {
      y: -8,
      duration: 2.5,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });
  }

  // ── Card hover micro-interactions ────────────────────────────────────
  document.querySelectorAll('.project-card').forEach((card) => {
    const cta = card.querySelector('.card-cta');
    card.addEventListener('mouseenter', () => {
      if (cta) {
        gsap.to(cta, { scale: 1.02, duration: 0.2, ease: 'power2.out' });
      }
    });
    card.addEventListener('mouseleave', () => {
      if (cta) {
        gsap.to(cta, { scale: 1, duration: 0.2, ease: 'power2.inOut' });
      }
    });
  });
}

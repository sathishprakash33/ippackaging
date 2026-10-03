import { Directive, ElementRef, OnDestroy, OnInit, inject, input } from '@angular/core';

@Directive({
  selector: '[appCountUp]',
})
export class CountUpDirective implements OnInit, OnDestroy {
  readonly appCountUp = input.required<number>();
  readonly duration = input(1400);

  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private observer?: IntersectionObserver;
  private frame = 0;

  ngOnInit(): void {
    const node = this.el.nativeElement;
    const target = this.appCountUp();
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    if (typeof IntersectionObserver === 'undefined' || reduceMotion) {
      node.textContent = String(target);
      return;
    }

    node.textContent = '0';
    this.observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) {
          return;
        }
        this.observer?.disconnect();

        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / this.duration(), 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          node.textContent = String(Math.round(target * eased));
          if (progress < 1) {
            this.frame = requestAnimationFrame(tick);
          }
        };
        this.frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    this.observer.observe(node);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    cancelAnimationFrame(this.frame);
  }
}

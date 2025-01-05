import { animate, group, query, style, transition, trigger } from '@angular/animations';

export const routeAnimations = trigger('routeAnimations', [
  transition('* <=> *', [
    query(':enter, :leave', style({ position: 'absolute', width: '100%' }), { optional: true }),
    group([
      query(':leave', [
        style({ transform: 'translateX(0)', opacity: 1 }),
        animate('500ms ease-out', style({ transform: 'translateX(-100%)', opacity: 0 })),
      ], { optional: true }),
      query(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('500ms ease-out', style({ transform: 'translateX(0)', opacity: 1 })),
      ], { optional: true }),
    ]),
  ]),
]);

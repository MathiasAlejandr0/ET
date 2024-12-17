import { 
    trigger, 
    state, 
    style, 
    transition, 
    animate 
  } from '@angular/animations';
  
  export const fadeInOut = trigger('fadeInOut', [
    transition(':enter', [
      style({ opacity: 0 }),
      animate('300ms', style({ opacity: 1 }))
    ]),
    transition(':leave', [
      animate('300ms', style({ opacity: 0 }))
    ])
  ]);
  
  export const slideInOut = trigger('slideInOut', [
    transition(':enter', [
      style({ 
        transform: 'translateX(-100%)', 
        opacity: 0 
      }),
      animate('300ms ease-out', style({ 
        transform: 'translateX(0)', 
        opacity: 1 
      }))
    ]),
    transition(':leave', [
      animate('300ms ease-in', style({ 
        transform: 'translateX(100%)', 
        opacity: 0 
      }))
    ])
  ]);
  
  export const scaleInOut = trigger('scaleInOut', [
    transition(':enter', [
      style({ 
        transform: 'scale(0.7)', 
        opacity: 0 
      }),
      animate('250ms ease-out', style({ 
        transform: 'scale(1)', 
        opacity: 1 
      }))
    ]),
    transition(':leave', [
      animate('250ms ease-in', style({ 
        transform: 'scale(0.7)', 
        opacity: 0 
      }))
    ])
  ]);
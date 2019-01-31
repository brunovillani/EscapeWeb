import { trigger, transition, style, animate, query, stagger, state } from '@angular/animations';

const animation = '.6s cubic-bezier(.25,.8,.25,1)';
const animation2 = '.4s cubic-bezier(.25,.8,.25,1)';

export const listFadeInOut = trigger('listFadeInOut', [
  transition('* => *', [
    query(':enter', style({ opacity: 0 })),
    query(
      ':enter',
      stagger(animation2, [animate(animation2, style({ opacity: 0 }))])
    )
  ])
]);

export const fadeInOut = trigger('fadeInOut', [
  state('in', style({ opacity: 1 })),
  transition('void => *', [
      style({ opacity: 0 }),
      animate(300)
  ]),
  transition('* => void', [
      animate(300, style({ opacity: 0 }))
  ])
]);

export const heightShrink = trigger('heightShrink', [
  state('in', style({ opacity: 1, height: 'auto' })),
  transition('void => *', [
    style({ opacity: 0, height: '0px' }),
    animate(animation2)
  ]),
  transition('* => void', [
    animate(animation2, style({ opacity: 0, height: '0px' }))
  ])
]);

export const flyInOut = trigger('flyInOut', [
  state('in', style({ transform: 'translateY(0)', opacity: 1 })),
  transition('void => *', [
    style({ transform: 'translateY(100%)', opacity: 0 }),
    animate(animation)
  ]),
  transition('* => void', [
    animate(animation, style({ transform: 'translateY(100%)', opacity: 0 }))
  ])
]);

export const flyInOutLeft = trigger('flyInOutLeft', [
  state('in', style({ transform: 'translateX(0)', opacity: 1 })),
  transition('void => *', [
    style({ transform: 'translateX(-100%)', opacity: 0 }),
    animate(animation)
  ]),
  transition('* => void', [
    animate(animation, style({ transform: 'translateX(-100%)', opacity: 0 }))
  ])
]);

export const flyInOutRight = trigger('flyInOutRight', [
  state('in', style({ transform: 'translateX(0)', opacity: 1 })),
  transition('void => *', [
    style({ transform: 'translateX(100%)', opacity: 0 }),
    animate(animation)
  ]),
  transition('* => void', [
    animate(animation, style({ transform: 'translateX(100%)', opacity: 0 }))
  ])
]);

export const flyInOutLeftCheckbox = trigger('flyInOutLeftCheckbox', [
  state('in', style({ transform: 'translateX(0)', opacity: 1, width: '16px', marginRight: '24px' })),
  transition('void => *', [
    style({ transform: 'translateX(-100%)', opacity: 0, width: 0, marginRight: 0 }),
    animate(animation)
  ]),
  transition('* => void', [
    animate(animation, style({ transform: 'translateX(-100%)', opacity: 0, width: 0, marginRight: 0 }))
  ])
]);

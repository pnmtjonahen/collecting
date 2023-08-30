import { HammerGestureConfig  } from '@angular/platform-browser';

export class HammerConfig extends HammerGestureConfig {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  overrides: any = <any>{
    'pinch': { enable: false },
    'rotate': { enable: false }
  };
}



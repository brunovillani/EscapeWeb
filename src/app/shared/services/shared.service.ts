import { Subject } from "rxjs";

export class SharedService {
  
  detailedStepper = {
    showDetails: new Subject<boolean>(),
    navigateTo: new Subject<{ stepNumber: number, prefix?: string, suffix?: string }>(),
    changeTo: new Subject<number>(),
  };

  introPage = {
    showContent: new Subject<boolean>(),
  };

  sidenav = {
    open: new Subject<boolean>(),
  };

  loading = {
    showLoading: new Subject<boolean>(),
  };
}

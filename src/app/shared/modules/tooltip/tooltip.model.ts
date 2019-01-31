
export class TooltipPosition {
  public arrowTop = 0;
  public arrowLeft = 0;
  public elementTop = 0;
  public elementLeft = 0;
}

export class ElementCoordinate {
  public width = 0;
  public height = 0;
  public top?: number;
  public left?: number;

  constructor() {
    this.top = 0;
    this.left = 0;
  }
}

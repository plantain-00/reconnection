export interface ReconnectorOption {
  startTimeout: number;
  increaseRate: number;
  endTimeout: number;
  maxTimes: number;
}

export abstract class ReconnectorBase {
  private startTimeout = 3000
  private increaseRate = 1.5
  private endTimeout = 30000
  private maxTimes = Infinity
  private timeout = 0
  private times = 0
  constructor(options?: Partial<ReconnectorOption>) {
    if (options) {
      if (typeof options.startTimeout === 'number') {
        this.startTimeout = options.startTimeout
      }
      if (typeof options.increaseRate === 'number') {
        this.increaseRate = options.increaseRate
      }
      if (typeof options.endTimeout === 'number') {
        this.endTimeout = options.endTimeout
      }
      if (typeof options.maxTimes === 'number') {
        this.maxTimes = options.maxTimes
      }
    }
    this.reset()
  }
  public reconnect() {
    if (this.times >= this.maxTimes) {
      return
    }
    this.times++
    setTimeout(() => {
      if (this.timeout > this.endTimeout) {
        this.timeout = this.endTimeout
      } else if (this.timeout < this.endTimeout) {
        this.timeout = Math.min(this.timeout * this.increaseRate, this.endTimeout)
      }
      this.dispatchReconnection()
    }, this.timeout)
  }
  public reset() {
    this.timeout = this.startTimeout
    this.times = 0
  }
  protected abstract dispatchReconnection(): void
}

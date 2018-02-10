import EventEmitter from 'events'
import { ReconnectorOption, ReconnectorBase } from './common'

/**
 * @public
 */
export default class Reconnector extends ReconnectorBase {
  private eventEmiter = new EventEmitter()
  constructor (action: () => void, options?: Partial<ReconnectorOption>) {
    super(options)
    this.eventEmiter.addListener('reconnect', action)
    action()
  }
  protected dispatchReconnection () {
    this.eventEmiter.emit('reconnect')
  }
}

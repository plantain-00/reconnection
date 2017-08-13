import { ReconnectorOption, ReconnectorBase } from "./common";

/**
 * @public
 */
export default class Reconnector extends ReconnectorBase {
    private eventTarget = document.createElement("div");
    constructor(action: () => void, options?: Partial<ReconnectorOption>) {
        super(options);
        this.eventTarget.addEventListener("reconnect", action);
        action();
    }
    protected dispatchReconnection() {
        const event = document.createEvent("CustomEvent");
        event.initCustomEvent("reconnect", false, false, undefined);
        this.eventTarget.dispatchEvent(event);
    }
}

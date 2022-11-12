/** @title My interpretation of the basic observer
 */

export class Observer {
  subscribers: any[];

  constructor() {
    this.subscribers = [];
  }

  subscribe(businessFn: Function) {
    this.subscribers.push(businessFn);
    const uniqueSubscribers = new Set(this.subscribers);
    this.subscribers = Array.from(uniqueSubscribers);
  }

  unsubscribe(businessFn: Function) {
    this.subscribers = this.subscribers.filter((fn) => fn !== businessFn);
  }

  broadCast(data: any) {
    this.subscribers.forEach((subscriber) => {
      subscriber(data);
    });
  }
}

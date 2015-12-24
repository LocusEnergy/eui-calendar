import Ember from 'ember';

export default class Interval {
  constructor(env, interval) {
    this.env = env;
    this.$ = this.env.$;
    let className = `eui-${interval}`;

    this['selector'] = () => this.$(`.${className}`);

    this[`${interval}Value`] = () => this.selector().text().trim();

    this[`${interval}Value`] = () => this.selector().text().trim();

    this['datetime'] = () => this.selector().attr('data-datetime');

    this['isSelected'] = () => this.selector().hasClass(`${className}--selected`);

    this['isNow'] = () => this.selector().hasClass(`${className}--now`);

    this[`select${Ember.String.capitalize(interval)}`] = () => this.selector().click();
  }
}

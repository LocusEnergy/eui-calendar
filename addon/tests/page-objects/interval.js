import Ember from 'ember';
import _merge from 'lodash/object/merge';

export default class Interval {
  constructor(env, interval) {
    this.env = env;
    this.$ = this.env.$;
    let className = `eui-${interval}`;

    _merge(this, {
      ['selector']() {
        return this.$(`.${className}`);
      },

      [`${interval}Value`]() {
        return this.selector().text().trim();
      },

      ['datetime']() {
        return this.selector().attr('data-datetime');
      },

      ['isSelected']() {
        return this.selector().hasClass(`${className}--selected`);
      },

      ['isNow']() {
        return this.selector().hasClass(`${className}--now`);
      },

      [`select${Ember.String.capitalize(interval)}`]() {
        return this.selector().click();
      }
    });
  }
}

import Ember from 'ember';
import { HTML5_DATETIME_FORMAT } from '../constants';

const { computed } = Ember;

function makeMixin(propName) {
  let className = `eui-${propName}`;

  return Ember.Mixin.create({
    attributeBindings: ['data-datetime'],
    classNames: [className],
    classNameBindings: [
      `is-selected:${className}--selected`,
      `is-disabled:${className}--disabled`,
      `is-now:${className}--now`,
      `is-empty:${className}--empty`
    ],

    now: computed(function(){
      return moment();
    }),

    'is-now': computed(propName, 'now', {
      get() {
        let value = this.get(propName);
        if (value) {
          return this.get(propName).isSame(this.get('now'), propName);
        }
      }
    }),

    'data-datetime': computed(propName, {
      get() {
        let value = this.get(propName);
        if (value) {
          return value.format(HTML5_DATETIME_FORMAT);
        }
      }
    }),

    'is-selected': computed(propName, 'selection', {
      get() {
        let value = this.get(propName);
        if (value) {
          return value.isSame(this.get('selection'), propName);
        }
      }
    })

  });
}

export let DayMixin = makeMixin('day');
export let MonthMixin = makeMixin('month');
export let YearMixin = makeMixin('year');

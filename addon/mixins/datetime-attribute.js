import Ember from 'ember';
import { HTML5_DATETIME_FORMAT } from '../constants';

function makeMixin(propName) {
  return Ember.Mixin.create({
    attributeBindings: ['data-datetime'],

    'data-datetime': Ember.computed(propName, {
      get() {
        let value = this.get(propName);
        if (value) {
          return value.format(HTML5_DATETIME_FORMAT);
        }
      }
    })
  });
}

export let DayDatetimeMixin = makeMixin('day');
export let MonthDatetimeMixin = makeMixin('month');

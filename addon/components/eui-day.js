import Ember from 'ember';
import moment from 'moment';

import layout from '../templates/components/eui-day';
import { DayDatetimeMixin } from '../mixins/datetime-attribute';

const { computed } = Ember;

export default Ember.Component.extend(DayDatetimeMixin, {
  layout: layout,
  classNames: ['eui-day'],
  classNameBindings: [
    'is-selected:eui-day--selected',
    'is-disabled:eui-day--disabled',
    'is-today:eui-day--today',
    'is-empty:eui-day--empty'
  ],

  today: computed(function(){
    return moment();
  }),

  'is-selected': computed('day', 'selection', {
    get() {
      let day = this.get('day');
      if (day) {
        return day.isSame(this.get('selection'), 'day');
      }
    }
  }),

  'is-today': computed('day', 'today', {
    get() {
      let day = this.get('day');
      if (day) {
        return this.get('day').isSame(this.get('today'), 'day');
      }
    }
  })
});

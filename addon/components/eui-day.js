import Ember from 'ember';
import layout from '../templates/components/eui-day';
import moment from 'moment';

const { computed } = Ember;
export const HTML5_DATETIME_FORMAT = 'YYYY-MM-DDTHH:mm:ssZ';

export default Ember.Component.extend({
  layout: layout,
  classNames: ['eui-day'],
  classNameBindings: [
    'is-selected:eui-day--selected',
    'is-disabled:eui-day--disabled',
    'is-today:eui-day--today',
    'is-empty:eui-day--empty'],
  attributeBindings: ['data-datetime'],

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
  }),

  'data-datetime': computed('day', {
    get() {
      let day = this.get('day');
      if (day) {
        return this.get('day').format(HTML5_DATETIME_FORMAT);
      }
    }
  })
});

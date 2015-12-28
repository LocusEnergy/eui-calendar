import Ember from 'ember';
import moment from 'moment';

import layout from '../templates/components/eui-interval';
import { HTML5_DATETIME_FORMAT } from '../constants';

const { computed } = Ember;

export default Ember.Component.extend({
  layout,
  attributeBindings: ['data-datetime'],
  classNameBindings: [
    `is-selected:--is-selected`,
    `is-disabled:--is-disabled`,
    `is-now:--is-now`,
    `is-empty:--is-empty`
  ],

  now: computed(function(){
    return moment();
  }),

  'data-datetime': computed('interval', {
    get() {
      let interval = this.get('interval');
      if (interval) {
        return interval.format(HTML5_DATETIME_FORMAT);
      }
    }
  }),

  'is-now': computed('interval', 'now', {
    get() {
      let interval = this.get('interval');
      if (interval) {
        return interval.isSame(this.get('now'), this.get('interval-type'));
      }
    }
  }),

  'is-selected': computed('interval', 'selection', {
    get() {
      let interval = this.get('interval');
      if (interval) {
        return interval.isSame(this.get('selection'), this.get('interval-type'));
      }
    }
  })
});

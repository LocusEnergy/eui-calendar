import Ember from 'ember';
import Moment from 'moment';

import layout from '../templates/components/eui-interval';
import { HTML5_DATETIME_FORMAT } from '../constants';

const { computed } = Ember;

const formatDictionary = {
  day: 'D',
  month: 'MMMM',
  year: 'YYYY'
};

export default Ember.Component.extend({
  layout,
  attributeBindings: ['data-datetime'],
  classNames: ['eui-interval'],
  classNameBindings: [
    `is-selected:--is-selected`,
    `is-disabled:--is-disabled`,
    `is-now:--is-now`,
    `is-empty:--is-empty`
  ],

  format: computed('interval', function() {
    return formatDictionary[this.get('interval')];
  }),

  now: computed(function(){
    return Moment();
  }),

  'data-datetime': computed('moment', {
    get() {
      let moment = this.get('moment');
      if (moment) {
        return moment.format(HTML5_DATETIME_FORMAT);
      }
    }
  }),

  'is-now': computed('moment', 'now', {
    get() {
      let moment = this.get('moment');
      if (moment) {
        return moment.isSame(this.get('now'), this.get('interval'));
      }
    }
  }),

  'is-selected': computed('moment', 'selection', {
    get() {
      let moment = this.get('moment');
      if (moment) {
        return moment.isSame(this.get('selection'), this.get('interval'));
      }
    }
  }),

  click() {
    this.sendAction('on-select', this.get('moment'));
  }
});

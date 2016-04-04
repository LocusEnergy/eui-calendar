import Ember from 'ember';
import layout from '../templates/components/eui-day-selector';
import Moment from 'moment';
import _range from 'lodash/utility/range';

const { computed } = Ember;
const DAY_COUNT = 42;

const DaySelector = Ember.Component.extend({
  layout,
  classNames: 'eui-day-selector',

  didReceiveAttrs() {
    this._super(...arguments);
    let month = this.get('month');
    this.set('_month', month || new Moment());
  },

  days: computed('_month', function() {
    let monthStart = new Moment(this.get('_month')).startOf('month');
    let dayOfWeek = monthStart.day();
    let dayRange = _range((-1)*dayOfWeek, DAY_COUNT - dayOfWeek);
    return dayRange.map(d => monthStart.clone().add(d, 'days'));
  }),

  actions: {
    selectDay(day) {
      this.set('selection', day);
      this.sendAction('on-select', day);
    }
  }
});

DaySelector.reopenClass({
  positionalParams: ['month']
});

export default DaySelector;

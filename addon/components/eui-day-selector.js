import Ember from 'ember';
import layout from '../templates/components/eui-day-selector';
import Moment from 'moment';
import _range from 'lodash/utility/range';

const { computed } = Ember;
const DAY_COUNT = 42;

const DaySelector = Ember.Component.extend({
  layout,
  classNames: 'eui-day-selector',

  days: computed('month', function() {
    let monthStart = Moment(this.get('month')).startOf('month');
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

import Ember from 'ember';
import layout from '../templates/components/eui-calendar';
import Moment from 'moment';
import _range from 'lodash/utility/range';

const { computed } = Ember;
const DAY_COUNT = 42;

export default Ember.Component.extend({
  layout,
  intervalSelector: 'days',
  // selected: Moment(),

  dayRange: computed('selected', function() {
    let monthStart = Moment(this.get('selected')).startOf('month');
    let dayOfWeek = monthStart.day();
    let dayRange = _range((-1)*dayOfWeek, DAY_COUNT - dayOfWeek);
    return dayRange.map(d => monthStart.clone().add(d, 'days'));
  }),

  monthRange: computed('selected', function() {
    let year = Moment(this.get('selected')).get('year');
    // ensures that we start with the correct month in the correct year
    let january = moment().year(year).month(0).startOf('month');
    return _range(12).map(m => january.clone().add(m, 'months'));
  }),

  yearRange: computed('selected', function() {
    let year = Moment(this.get('selected'));
    return _range(-6, 6).map(y => year.clone().add(y, 'years'));
  }),

  actions: {
    selectDays() {
      this.set('intervalSelector', 'days');
    },

    selectMonths() {
      this.set('intervalSelector', 'months');
    },

    selectYears() {
      this.set('intervalSelector', 'years');
    },

    nullAction() {
      Em.K
    }
  }
});

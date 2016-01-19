import Ember from 'ember';
import layout from '../templates/components/eui-calendar';
import Moment from 'moment';
import _range from 'lodash/utility/range';

const { computed } = Ember;
const DAY_COUNT = 42;

export default Ember.Component.extend({
  layout,
  intervalSelector: 'days',
  selection: Moment(),

  dayRange: computed('selection', function() {
    let monthStart = Moment(this.get('selection')).startOf('month');
    let dayOfWeek = monthStart.day();
    let dayRange = _range((-1)*dayOfWeek, DAY_COUNT - dayOfWeek);
    return dayRange.map(d => monthStart.clone().add(d, 'days'));
  }),

  monthRange: computed('selection', function() {
    let year = Moment(this.get('selection')).get('year');
    // ensures that we start with the correct month in the correct year
    let january = moment().year(year).month(0).startOf('month');
    return _range(12).map(m => january.clone().add(m, 'months'));
  }),

  yearRange: computed('selection', function() {
    let year = Moment(this.get('selection'));
    return _range(-6, 6).map(y => year.clone().add(y, 'years'));
  }),

  actions: {
    selectMoment(moment) {
      this.set('selection', Moment(moment));
    },

    selectDays(moment) {
      // this.send('selectMoment', moment);
      this.set('intervalSelector', 'days');
    },

    selectMonths(moment) {
      // this.send('selectMoment', moment);
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

import Ember from 'ember';
import layout from '../templates/components/eui-month-selector';
import _range from 'lodash/utility/range';
import Moment from 'moment';

const MonthSelector = Ember.Component.extend({
  layout,
  classNames: 'eui-month-selector',

  months: Ember.computed('year', function() {
    let year = this.get('year').get('year');
    // ensures that we start with the correct month in the correct year
    let january = Moment().year(year).month(0).startOf('month');
    return _range(12).map(m => january.clone().add(m, 'months'));
  }),

  actions: {
    selectMonth(month) {
      this.sendAction('select-moment', month);
    }
  }
});

MonthSelector.reopenClass({
  positionalParams: ['year', 'select-moment']
});

export default MonthSelector;

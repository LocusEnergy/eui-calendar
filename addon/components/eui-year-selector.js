import Ember from 'ember';
import layout from '../templates/components/eui-year-selector';
import momentDecade from 'eui-calendar/utils/moment-decade';

const YearSelector = Ember.Component.extend({
  layout,
  classNames: 'eui-year-selector',

  years: Ember.computed('decade', function() {
    return momentDecade(this.get('decade'), 'YYYY');
  }),

  actions: {
    selectYear(year) {
      this.sendAction('select-year', year);
    }
  }
});

YearSelector.reopenClass({
  positionalParams: ['decade']
});

export default YearSelector;

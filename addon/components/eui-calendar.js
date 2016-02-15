import Ember from 'ember';
import layout from '../templates/components/eui-calendar';
import Moment from 'moment';

const { computed } = Ember;


const EUICalendar = Ember.Component.extend({
  layout,

  interval: computed(function() {
    return 'month'
  }),

  selection: computed(function() {
    return Moment();
  }),

  date: computed({
    get() {
      return Moment();
    },
    set(key, value) {
      return value;
    }
  }),

  actions: {
    onZoom(interval) {
      if (interval === 'month') {
        this.set('interval', 'year')
      }

      if (interval === 'year') {
        this.set('interval', 'decade')
      }
    },

    setDate(date) {
      this.set('date', date)
    },

    selectDate(date) {
      this.sendAction('on-select', date)
    },

    chooseMonth() {
      this.set('interval', 'month')
    },

    chooseYear() {
      this.set('interval', 'year')
    },
  }
});

EUICalendar.reopenClass({
  positionalParams: ['date']
});

export default EUICalendar;

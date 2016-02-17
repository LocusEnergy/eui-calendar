import Ember from 'ember';
import layout from '../templates/components/eui-calendar';
import Moment from 'moment';

const { computed } = Ember;

const EUICalendar = Ember.Component.extend({
  layout,

  interval: 'month',

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
        this.set('interval', 'year');
      }

      if (interval === 'year') {
        this.set('interval', 'decade');
      }
    },

    setDate(date) {
      this.set('date', date);
    },

    selectDay(day) {
      this.sendAction('on-select', day);
    },

    selectMonth(month) {
      this.send('setDate', month);
      this.set('interval', 'month');
    },

    selectYear(year) {
      this.send('setDate', year);
      this.set('interval', 'year');
    },
  }
});

EUICalendar.reopenClass({
  positionalParams: ['date']
});

export default EUICalendar;

import Ember from 'ember';
import layout from '../templates/components/eui-calendar';
import Moment from 'moment';

const { computed } = Ember;

const EUICalendar = Ember.Component.extend({
  layout,
  classNames: ['eui-calendar'],

  // default interval
  interval: 'month',

  date: computed(function() {
    return Moment();
  }),

  actions: {
    zoomIn(interval, date) {
      this.setProperties({ interval, date });
    },

    zoomOut(interval) {
      this.set('interval', interval);
    },

    selectDay(day) {
      this.sendAction('on-select', day);
    }
  }
});

EUICalendar.reopenClass({
  positionalParams: ['date']
});

export default EUICalendar;

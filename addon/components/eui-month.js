import Ember from 'ember';
import layout from '../templates/components/eui-month';
import moment from 'moment';

export default Ember.Component.extend({
  layout: layout,
  tagName: 'ol',
  classNames: 'eui-month',
  //
  // month: null,
  //
  // selection: [],
  // disabledDates: [],
  // maxPastDate: null,
  // maxFutureDate: null,
  //
  // onSelect: null,
  //
  // setup: Ember.on('init', function() {
  //   Ember.assert('You must provide a month to eui-month', this.get('month'));
  // }),

  days: Ember.computed('month', function() {
    const monthStart = moment(this.get('month')).startOf('month');
    const monthEnd = moment(this.get('month')).endOf('month');
    const daysInMonth = monthStart.daysInMonth();
    const dayOfWeek = monthStart.day();
    const slots = [];

    const leftOver = 42 - daysInMonth - dayOfWeek;

    for (let i = 0; i < dayOfWeek; i++) {
      slots.push(monthStart.clone().subtract(dayOfWeek - i, 'days'));
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const slot = moment(monthStart).date(i);
      slots.push(slot);
    }

    for (let i = 0; i < leftOver; i++) {
      slots.push(monthEnd.clone().add(i + 1, 'days'));
    }

    return slots;
  })
});

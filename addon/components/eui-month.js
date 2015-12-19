import Ember from 'ember';
import layout from '../templates/components/eui-month';
import moment from 'moment';

const { computed } = Ember;
const DAY_COUNT = 42;

export default Ember.Component.extend({
  layout: layout,
  tagName: 'ol',
  classNames: 'eui-month',

  month: null,
  //
  // selection: [],
  // disabledDates: [],
  // maxPastDate: null,
  // maxFutureDate: null,
  //
  // onSelect: null,
  //
  setup: Ember.on('init', function() {
    Ember.assert('You must provide a month to eui-month', this.get('month'));
  }),

  days: computed('month', function() {
    const monthStart = moment(this.get('month')).startOf('month');
    const dayOfWeek = monthStart.day();
    const slots = [];

    for (let i = -dayOfWeek; i < DAY_COUNT - dayOfWeek; i++) {
      slots.push(monthStart.clone().add(i, 'days'));
    }

    return slots;
  }),

});

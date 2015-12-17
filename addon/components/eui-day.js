import Ember from 'ember';
import layout from '../templates/components/eui-day';
import moment from 'moment';

export default Ember.Component.extend({
  layout: layout,
  classNames: ['eui-day'],
  classNameBindings: [
    'is-selected:eui-day--selected',
    'is-disabled:eui-day--disabled',
    'is-today:eui-day--today',
    'is-empty:eui-day--empty'],

  'is-selected': Ember.computed('day', 'selection', {
    get() {
      let day = this.get('day') || moment();


      return day.isSame(this.get('selection'));
    }
  })

  // date: null,
  //
  // selection: [],
  // disabledDates: [],
  // maxPastDate: null,
  // maxFutureDate: null,
  //
  // today: moment(),

  // day: Ember.computed('date', function() {
  //   return this.get('date').format('D');
  // }),
  //
  // isSelected: Ember.computed('date', 'selection', function() {
  //   const date = this.get('date');
  //   const selection = this.get('selection');
  //
  //   return selection.find((selection) => {
  //     return selection.isSame(date, 'day');
  //   })
  // }),
  //
  // isDisabled: Ember.computed('date', 'disabledDates', 'maxPastDate', 'maxFutureDate', function() {
  //   const date = this.get('date');
  //   const disabledDates = this.get('disabledDates') || [];
  //
  //   const isDisabledDate = disabledDates.find((disabledDate) => {
  //     return disabledDate.isSame(date, 'day');
  //   });
  //
  //   if (isDisabledDate) { return true; }
  //
  //   const maxPastDate = this.get('maxPastDate');
  //   const maxFutureDate = this.get('maxFutureDate');
  //
  //   if (maxPastDate && date.isBefore(maxPastDate)) {
  //     return true;
  //   }
  //
  //   if (maxFutureDate && date.isAfter(maxFutureDate)) {
  //     return true;
  //   }
  // }),
  //
  // isToday: Ember.computed('date', 'today', function() {
  //   return this.get('date').isSame(this.get('today'), 'day');
  // })
});

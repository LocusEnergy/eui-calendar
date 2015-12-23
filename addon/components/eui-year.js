import Ember from 'ember';
import layout from '../templates/components/eui-year';

export default Ember.Component.extend({
  layout,
  months: Ember.computed('month', function() {
    let yearStart = moment(this.get('month')).startOf('year');
    let months = [];

    for (let i = 0; i < 12; i++) {
      months.push(yearStart.clone().add(i, 'months'));
    }

    return months;
  })
});

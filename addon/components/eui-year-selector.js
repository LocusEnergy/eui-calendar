import Ember from 'ember';
import layout from '../templates/components/eui-year-selector';

export default Ember.Component.extend({
  layout,

  months: Ember.computed('year', function() {
    let yearStart = moment(this.get('year')).startOf('year');
    return _range(12).map(m => yearStart.clone().add(m, 'months'));
  })

});

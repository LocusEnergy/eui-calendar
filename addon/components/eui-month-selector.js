import Ember from 'ember';
import layout from '../templates/components/eui-month-selector';
import _range from 'lodash/utility/range';
import moment from 'moment';

export default Ember.Component.extend({
  layout,
  classNames: 'eui-month-selector',

  months: Ember.computed('year', function() {
    let yearStart = moment(this.get('year')).startOf('year');
    return _range(12).map(m => yearStart.clone().add(m, 'months'));
  })
});

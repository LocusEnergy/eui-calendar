import Ember from 'ember';
import layout from '../templates/components/eui-calendar';

export default Ember.Component.extend({
  layout,
  selection: Em.A(),

  click(element) {
    let date = moment($(element.target).attr('data-datetime'));
    this.get('selection').addObject(date);
  }
});

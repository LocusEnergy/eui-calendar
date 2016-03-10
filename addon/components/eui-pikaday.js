import Ember from 'ember';
import layout from '../templates/components/eui-pikaday';

export default Ember.Component.extend({
  layout,
  actions: {
    open() {
      this.set('isOpen', true);
    }
  }
});

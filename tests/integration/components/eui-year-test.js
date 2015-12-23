import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('eui-year', 'Integration | Component | eui year', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +
  this.set('month', moment('August 2015'))
  this.render(hbs`{{eui-year month=month}}`);

  assert.deepEqual(this.$('.monthpicker-month').map(trimText).toArray(), [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ], 'shows all the months in the year');
});

// how to test month selection?
// test to show year?


function trimText() {
  return Ember.$(this).text().trim();
}

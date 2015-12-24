import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('eui-year', 'Integration | Component | eui year', {
  integration: true
});

// more accurate to have eui-month as a month
// rename eui-month => day-selector
// eui-year => month-selector
// eui-decade => year-selector

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +
  this.render(hbs`{{eui-year}}`);

  assert.deepEqual(this.$('.eui-year--months li').map(trimText).toArray(), [
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

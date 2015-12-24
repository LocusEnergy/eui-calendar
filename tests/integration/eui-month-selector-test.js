import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import moment from 'moment';
import MonthSelector from 'eui-calendar/tests/page-objects/month-selector';


moduleForComponent('eui-month-selector', 'Integration | Component | Selectors | eui month ', {
  integration: true,
  beforeEach() {
    this.set('month', moment('August 2015'));
    this.component = new MonthSelector(this);
  }
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{eui-month-selector}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:" + EOL +
  this.render(hbs`
    {{#eui-month-selector}}
      template block text
    {{/eui-month-selector}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});

//
// test('it renders', function(assert) {
//   // Set any properties with this.set('myProperty', 'value');
//   // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +
//   this.render(hbs`{{eui-year}}`);
//
//   assert.deepEqual(this.$('.eui-year--months li').map(trimText).toArray(), [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December"
//   ], 'shows all the months in the year');
// });
//
// // how to test month selection?
// // test to show year?
//
// function trimText() {
//   return Ember.$(this).text().trim();
// }
//

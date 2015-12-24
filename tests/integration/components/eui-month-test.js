import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import moment from 'moment';

import Month from 'eui-calendar/tests/page-objects/month';
import { HTML5_DATETIME_FORMAT } from 'eui-calendar/constants';

moduleForComponent('eui-month', 'Integration | Component | eui month', {
  integration: true,
  beforeEach() {
    this.set('month', moment('August 2015'));
    this.component = new Month(this);
  }
});

test('default behavior', function(assert) {
  this.render(hbs`
    {{eui-month month=month}}
  `);

  assert.equal(this.component.monthValue(), 'August', 'renders date');
  this.render(hbs`
    {{#eui-month
      month=month
      as |month|
    }}
      [{{moment-format month 'MMMM'}}]
    {{/eui-month}}
  `);

  assert.equal(this.$().text().trim(), '[August]', 'block parameter works');
});

test('data-datetime attribute', function(assert) {
  this.render(hbs`{{eui-month month=month}}`);
  assert.equal(this.component.datetime(), this.get('month').format(HTML5_DATETIME_FORMAT));
});

test('is-selected is false when no day has been defined', function(assert){
  this.render(hbs`{{eui-month}}`);
  assert.ok(!this.component.isSelected());
});

// test('is-selected is false when no selection has been defined', function(assert){
//   this.render(hbs`{{eui-day day=day}}`);
//   assert.ok(!this.component.isSelected());
// });
//
// test('is-selected is true when selection and day have been defined', function(assert){
//   this.render(hbs`{{eui-day day=day selection=day}}`);
//   assert.ok(this.component.isSelected());
// });
//
// test('can select day on click', function(assert) {
//   this.on('selectDay', (day) => {
//     this.set('selection', day);
//   });
//
//   this.render(hbs`{{eui-day
//     day=day
//     selection=selection
//     click=(action 'selectDay' day)
//   }}`);
//
//   assert.ok(!this.component.isSelected());
//   this.component.selectDay();
//   assert.ok(this.component.isSelected());
// });
//
// test('today class', function(assert){
//   this.render(hbs`
//     {{eui-day day=day}}
//   `);
//
//   assert.ok(!this.component.isToday(), '');
//   this.set('day', moment());
//   assert.ok(this.component.isToday());
// });
//
// test('recomputes today class if today property changes', function(assert) {
//   this.set('day', moment());
//   this.set('now', moment().subtract(1, 'day'));
//   this.render(hbs`
//     {{eui-day day=day now=now}}
//   `);
//   assert.ok(!this.component.isToday(), '');
//
//   this.set('now', moment());
//   assert.ok(this.component.isToday(), '');
// });

import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import moment from 'moment';

import Interval from 'eui-calendar/tests/page-objects/interval';
import { HTML5_DATETIME_FORMAT } from 'eui-calendar/constants';

moduleForComponent('eui-month', 'Integration | Component | Interval | eui month', {
  integration: true,
  beforeEach() {
    this.set('month', moment('August 2015').utc());
    this.component = new Interval(this, 'month');
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

test('is-selected is false when no month has been defined', function(assert){
  this.render(hbs`{{eui-month}}`);
  assert.ok(!this.component.isSelected());
});

test('is-selected is false when no selection has been defined', function(assert){
  this.render(hbs`{{eui-month month=month}}`);
  assert.ok(!this.component.isSelected());
});

test('is-selected is true when selection and month have been defined', function(assert){
  this.render(hbs`{{eui-month month=month selection=month}}`);
  assert.ok(this.component.isSelected());
});

test('can select month on click', function(assert) {
  this.on('selectMonth', (month) => {
    this.set('selection', month);
  });

  this.render(hbs`{{eui-month
    month=month
    selection=selection
    click=(action 'selectMonth' month)
  }}`);

  assert.ok(!this.component.isSelected(), 'is not initially selected');
  this.component.selectMonth();
  assert.ok(this.component.isSelected(), 'is selected after click');
});

test('is-now class', function(assert){
  this.render(hbs`
    {{eui-month month=month}}
  `);

  assert.ok(!this.component.isNow(), 'is not now');
  this.set('month', moment());
  assert.ok(this.component.isNow(), 'is now');
});

test('recomputes is-now class if now property changes', function(assert) {
  this.set('month', moment());
  this.set('now', moment().subtract(1, 'month'));
  this.render(hbs`
    {{eui-month month=month now=now}}
  `);
  assert.ok(!this.component.isNow(), 'is not now');

  this.set('now', moment());
  assert.ok(this.component.isNow(), 'is now after setting now property');
});

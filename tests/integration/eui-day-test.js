import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import moment from 'moment';

import Interval from 'eui-calendar/tests/page-objects/interval';
import { HTML5_DATETIME_FORMAT } from 'eui-calendar/constants';

moduleForComponent('eui-day', 'Integration | Component | Interval | eui day', {
  integration: true,
  beforeEach() {
    this.set('day', moment('January 21, 2015').utc());
    this.component = new Interval(this, 'day');
  }
});

test('default behavior', function(assert) {
  this.render(hbs`
    {{eui-day day=day}}
  `);

  assert.equal(this.component.dayValue(), '21', 'renders date');
  this.render(hbs`
    {{#eui-day
      day=day
      as |day|
    }}
      [{{moment-format day 'D'}}]
    {{/eui-day}}
  `);

  assert.equal(this.$().text().trim(), '[21]', 'block parameter works');
});

test('data-datetime attribute', function(assert) {
  this.render(hbs`{{eui-day day=day}}`);
  assert.equal(this.component.datetime(), this.get('day').utc().format(HTML5_DATETIME_FORMAT));
});

test('is-selected is false when no day has been defined', function(assert){
  this.render(hbs`{{eui-day}}`);
  assert.ok(!this.component.isSelected());
});

test('is-selected is false when no selection has been defined', function(assert){
  this.render(hbs`{{eui-day day=day}}`);
  assert.ok(!this.component.isSelected());
});

test('is-selected is true when selection and day have been defined', function(assert){
  this.render(hbs`{{eui-day day=day selection=day}}`);
  assert.ok(this.component.isSelected());
});

test('can select day on click', function(assert) {
  this.on('selectDay', (day) => {
    this.set('selection', day);
  });

  this.render(hbs`{{eui-day
    day=day
    selection=selection
    click=(action 'selectDay' day)
  }}`);

  assert.ok(!this.component.isSelected());
  this.component.selectDay();
  assert.ok(this.component.isSelected());
});

test('is-now class', function(assert){
  this.render(hbs`
    {{eui-day day=day}}
  `);

  assert.ok(!this.component.isNow(), '');
  this.set('day', moment());
  assert.ok(this.component.isNow());
});

test('recomputes is-now class if now property changes', function(assert) {
  this.set('day', moment());
  this.set('now', moment().subtract(1, 'day'));
  this.render(hbs`
    {{eui-day day=day now=now}}
  `);
  assert.ok(!this.component.isNow(), '');

  this.set('now', moment());
  assert.ok(this.component.isNow(), '');
});

import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import moment from 'moment';
import DayPageObject from 'eui-calendar/tests/day-page-object';
import { HTML5_DATETIME_FORMAT } from 'eui-calendar/components/eui-day';

moduleForComponent('eui-day', 'Integration | Component | eui day', {
  integration: true,
  beforeEach() {
    this.set('day', moment('January 21, 2015').utc());
    this.component = new DayPageObject(this);
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

test('today class', function(assert){
  this.render(hbs`
    {{eui-day day=day}}
  `);

  assert.ok(!this.component.isToday(), '');
  this.set('day', moment());
  assert.ok(this.component.isToday());
});

test('recomputes today class if today property changes', function(assert) {
  this.set('day', moment());
  this.set('today', moment().subtract(1, 'day'));
  this.render(hbs`
    {{eui-day day=day today=today}}
  `);
  assert.ok(!this.component.isToday(), '');

  this.set('today', moment());
  assert.ok(this.component.isToday(), '');
});

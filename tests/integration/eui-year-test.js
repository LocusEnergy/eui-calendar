import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import moment from 'moment';

import Interval from 'eui-calendar/tests/page-objects/interval';
import { HTML5_DATETIME_FORMAT } from 'eui-calendar/constants';

moduleForComponent('eui-year', 'Integration | Component | Interval | eui year', {
  integration: true,
  beforeEach() {
    this.set('year', moment('2014').utc());
    this.component = new Interval(this, 'year');
  }
});

test('default behavior', function(assert) {
  this.render(hbs`
    {{eui-year year=year}}
  `);

  assert.equal(this.component.yearValue(), '2014', 'renders date');
  this.render(hbs`
    {{#eui-year
      year=year
      as |year|
    }}
      [{{moment-format year 'YYYY'}}]
    {{/eui-year}}
  `);

  assert.equal(this.$().text().trim(), '[2014]', 'block parameter works');
});

test('data-datetime attribute', function(assert) {
  this.render(hbs`{{eui-year year=year}}`);
  assert.equal(this.component.datetime(), this.get('year').format(HTML5_DATETIME_FORMAT));
});

test('is-selected is false when no year has been defined', function(assert){
  this.render(hbs`{{eui-year}}`);
  assert.ok(!this.component.isSelected());
});

test('is-selected is false when no selection has been defined', function(assert){
  this.render(hbs`{{eui-year year=year}}`);
  assert.ok(!this.component.isSelected());
});

test('is-selected is true when selection and year have been defined', function(assert){
  this.render(hbs`{{eui-year year=year selection=year}}`);
  assert.ok(this.component.isSelected());
});

test('can select year on click', function(assert) {
  this.on('selectYear', (year) => {
    this.set('selection', year);
  });

  this.render(hbs`{{eui-year
    year=year
    selection=selection
    click=(action 'selectYear' year)
  }}`);

  assert.ok(!this.component.isSelected(), 'is not initially selected');
  this.component.selectYear();
  assert.ok(this.component.isSelected(), 'is selected after click');
});

test('is-now class', function(assert){
  this.render(hbs`
    {{eui-year year=year}}
  `);

  assert.ok(!this.component.isNow(), 'is not now');
  this.set('year', moment());
  assert.ok(this.component.isNow(), 'is now');
});

test('recomputes is-now class if now property changes', function(assert) {
  this.set('year', moment());
  this.set('now', moment().subtract(1, 'year'));
  this.render(hbs`
    {{eui-year year=year now=now}}
  `);
  assert.ok(!this.component.isNow(), 'is not now');

  this.set('now', moment());
  assert.ok(this.component.isNow(), 'is now after setting now property');
});

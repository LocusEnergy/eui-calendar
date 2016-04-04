import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import moment from 'moment';
import DaySelector from 'eui-calendar/tests/page-objects/day-selector';

moduleForComponent('eui-day-selector', 'Integration | Component | Selectors | eui day', {
  integration: true,
  beforeEach() {
    this.set('month', moment('August 2015'));
    this.component = new DaySelector(this);
  }
});

test('should render without month passed in', function (assert) {

  this.render(hbs`{{eui-day-selector}}`);
  assert.ok(this.$(), 'something is rendered');
});

test('should default to now when null is passed in as month', function (assert){

  this.render(hbs`{{eui-day-selector null}}`);

  assert.ok(this.$(), 'something is rendered');
});

test('should allow selection to be null', function(assert){

  this.set('month', undefined);
  this.set('selection', undefined);
  this.render(hbs`{{eui-day-selector month selection=selection}}`);

  assert.ok(this.component.notEmptyCount() > 27, 'should render atleast 27 days');
});

test('default behavior', function(assert) {
  this.render(hbs`{{eui-day-selector month}}`);

  assert.equal(this.component.notEmptyCount(), 31, 'Number of days in August 2015');
  assert.equal(this.component.emptyCount(), 11, 'The number of empty slots is 42 - 31');
  assert.deepEqual(this.component.days(), [
     '',    '',   '',   '',   '',  '',   '1',
    '2',   '3',  '4',  '5',  '6',  '7',  '8',
    '9',  '10', '11', '12', '13', '14', '15',
    '16', '17', '18', '19', '20', '21', '22',
    '23', '24', '25', '26', '27', '28', '29',
    '30',  '31', '',   '',    '',   '',  ''
  ], 'August 2015 calendar renders properly');
  assert.deepEqual(this.component.headers(), 	[
    'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'
  ], 'headers are present');
});

test('yields days as block parameter', function(assert) {
  this.render(hbs`
    {{#eui-day-selector month as |day|}}
      {{eui-interval day 'day'
        is-disabled=(not (moment-same month day 'month'))
      }}
    {{/eui-day-selector}}
  `);

  assert.equal(this.component.notDisabledCount(), 31, 'Number of days in August 2015');
  assert.equal(this.component.emptyCount(), 0, 'There are zero empty slots');
  assert.equal(this.component.disabledCount(), 11, 'There are 11 deactivated slots');
  assert.deepEqual(this.component.days(), [
    '26',  '27', '28', '29', '30',  '31', '1',
    '2',   '3',  '4',  '5',  '6',  '7',  '8',
    '9',  '10', '11', '12', '13', '14', '15',
    '16', '17', '18', '19', '20', '21', '22',
    '23', '24', '25', '26', '27', '28', '29',
    '30',  '31', '1',  '2',  '3',  '4',  '5'
  ], 'August 2015 calendar renders properly');
  assert.deepEqual(this.component.headers(), 	[
    'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'
  ], 'headers are present');
});


test('select-day action', function(assert) {
  const DAY = moment('August 18, 2015');
  let selectedDay;

  this.on('selectDay', function(day) {
    selectedDay = day;
  });

  this.render(hbs`{{eui-day-selector month on-select=(action 'selectDay')}}`);
  this.component.selectDay(DAY);
  assert.equal(selectedDay.format('YYYY-MM-DD'), '2015-08-18', 'day has been selected');
  assert.ok(this.component.isSelected(DAY), 'element has selected class');
});

test('it should accept a selection date attribute', function(assert){

  let date = moment('March 14, 2016');

  this.set('date', date);
  this.render(hbs`{{eui-day-selector date selection=date}}`);

  assert.ok(this.$('.--is-selected:contains(14)').length, '14th is selected');

});

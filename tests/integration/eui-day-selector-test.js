import Ember from 'ember';
import { moduleForComponent, test, only } from 'ember-qunit';
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

test('default behavior', function(assert) {
  this.render(hbs`{{eui-day-selector month=month}}`);

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

test('month yields days into block param with all days', function(assert) {
  this.render(hbs`
    {{#eui-day-selector month=month as |day|}}
      {{eui-interval tagName="li" moment=day interval='day' is-disabled=(not (moment-same-month month day))}}
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

test('selection array used to show days as selected', function(assert){
  const DATE1 = moment('August 1, 2015');
  const DATE2 = moment('August 5, 2015');
  this.set('selection', new Ember.A([ DATE1, DATE2 ]));
  this.render(hbs`{{eui-day-selector month=month selection=selection}}`);
  assert.ok(this.component.isSelected(DATE1));
  assert.ok(this.component.isSelected(DATE2));
  assert.ok(!this.component.isSelected(moment('August 10, 2015')));
});

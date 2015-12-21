import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import moment from 'moment';
import CalendarPageObject from 'eui-calendar/tests/calendar-page-object';

moduleForComponent('eui-calendar', 'Integration | Component | eui calendar', {
  integration: true,
  beforeEach() {
    this.set('month', moment('August 2015'));
    this.component = new CalendarPageObject(this);
  }
});

test('default behavior', function(assert) {
  this.render(hbs`{{eui-calendar month=month}}`);
  assert.deepEqual(this.component.calendar(), [
    '26',  '27', '28', '29', '30',  '31', '1',
    '2',   '3',  '4',  '5',  '6',  '7',  '8',
    '9',  '10', '11', '12', '13', '14', '15',
    '16', '17', '18', '19', '20', '21', '22',
    '23', '24', '25', '26', '27', '28', '29',
    '30',  '31', '1',  '2',  '3',  '4',  '5'
  ], 'August 2015 calendar renders properly');
});

test('yields block param', function(assert) {
  this.render(hbs`
    {{#eui-calendar month=month as |day|}}
      {{#if (moment-same-month month day)}}
        {{moment-format day 'D'}}
      {{/if}}
    {{/eui-calendar}}
  `);

  assert.deepEqual(this.component.calendar(), [
    '',    '',   '',   '',   '',  '',   '1',
    '2',   '3',  '4',  '5',  '6',  '7',  '8',
    '9',  '10', '11', '12', '13', '14', '15',
    '16', '17', '18', '19', '20', '21', '22',
    '23', '24', '25', '26', '27', '28', '29',
    '30',  '31', '',   '',    '',   '',  ''
  ], 'can pass template block');
});

test('can select day by clicking on it', function(assert) {
  const DATE1 = moment('August 1, 2015');
  this.render(hbs`{{eui-calendar month=month}}`);
  this.component.selectDate(DATE1);
  assert.ok(this.component.isSelected(DATE1));




});

// selecting day in prev/next month switches month appropriately

// can select prev/next month by clicking on prev/next buttons

// clicking on month name shows month switcher

// make sure you can actually select dates via month / year switcher

// test this in month-switcher tests:
// clicking on year name in month switcher shows year switcher

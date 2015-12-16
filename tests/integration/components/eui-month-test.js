import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import moment from 'moment';
import MonthPageObject from 'eui-calendar/tests/page-object';

moduleForComponent('eui-month', 'Integration | Component | eui month', {
  integration: true,
  beforeEach() {
    this.component = new MonthPageObject(this);
  }
});



test('default behavior', function(assert) {
  this.set('month', moment('August 2015'));
  this.render(hbs`{{eui-month month=month}}`);

  assert.equal(this.component.daysCount(), 31, 'Number of days in August 2015');
  assert.equal(this.component.slotCount(), 42, 'There are 6 weeks');
  assert.equal(this.component.emptySlotCount(), 11, 'The number of empty slots is 42 - 31');
  assert.deepEqual(this.component.calendar(), [
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
  this.set('month', moment('August 2015'));
  this.render(hbs
    `{{#eui-month month=month as |day|}}
        <li class="eui-month--slot {{if (moment-same-month month day) 'eui-month--day' 'eui-month--disabled'}}">
          {{moment-format day 'D'}}
        </li>
     {{/eui-month}}
    `
  );
  assert.equal(this.component.daysCount(), 31, 'Number of days in August 2015');
  assert.equal(this.component.slotCount(), 42, 'There are 6 weeks');
  assert.equal(this.component.emptySlotCount(), 0, 'There are zero empty slots');
  assert.equal(this.component.deactivatedSlotCount(), 11, 'There are 11 deactivated slots');
  assert.deepEqual(this.component.calendar(), [
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

//
// selectdate - side by side calendars
//   month
//   month
//
// // eui-selectdate.hbs
//
// {{#if hasBlock}}
//   {{#eui-month days=month as |day|}}
//     {{yield day}}
//   {{/eui-month}}
//   {{eui-month days=nextMonth as |day|}}
//     {{yield day}}
//   {{/eui-month}}
// {{else}}
//   {{eui-month days=month}}
//   {{eui-month days=nextMonth}}
// {{/if}}
//
// calendar
//   # previous days
//   month
//   # next days
//
// month
//
// {{#eui-selectdate
//   selected=selected
//   as |day|
// }}
//   {{day}}
// {{/eui-selectdate}}
//
// {{#eui-calendar
//   selected=selected
//   as |day|
// }}
//   {{day}}
// {{/eui-calendar}}
//
// // eui-calendar.hbs
// {{eui-month days=days}}
//
// // eui-month.hbs
// {{#each as |day|}}
//   {{#if hasBlock}}
//     {{yield day}}
//   {{else}}
//     {{eui-day
//
//     }}
//   {{/if}}
// {{/each}}
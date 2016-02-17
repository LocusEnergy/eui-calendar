import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import moment from 'moment';
import MonthSelector from 'eui-calendar/tests/page-objects/month-selector';


moduleForComponent('eui-month-selector', 'Integration | Component | Selectors | eui month ', {
  integration: true,
  beforeEach() {
    this.set('year', moment('August 2015'));
    this.component = new MonthSelector(this);
  }
});

test('default behavior', function(assert) {
  this.render(hbs`{{eui-month-selector year=year}}`);
  assert.equal(this.component.monthCount(), 12, 'number of months in a year');
  assert.deepEqual(this.component.months(), [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ], 'months selector renders properly');
});

test('yields months as block parameter', function(assert) {
  this.render(hbs`
    {{#eui-month-selector year=year as |month|}}
      {{eui-interval
        moment=month
        interval='month'
        format='MMM'
      }}
    {{/eui-month-selector}}
  `);

  assert.deepEqual(this.component.months(), [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ], 'month selector renders block parameter properly');
});

test('select-month action', function(assert) {
  const MONTH = moment('June 2015');
  let selectedMonth;

  this.on('selectMonth', function(month) {
    selectedMonth = month;
  });

  this.render(hbs`
    {{eui-month-selector
      year=year
      select-month=(action 'selectMonth')
    }}
  `);

  this.component.selectMonth(MONTH);
  assert.equal(selectedMonth.format('MMMM YYYY'), 'June 2015', 'month has been selected');
});

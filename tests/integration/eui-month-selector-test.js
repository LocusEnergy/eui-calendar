import { moduleForComponent, test, only } from 'ember-qunit';
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
        tagName="li"
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

test('selection array used to show months as selected', function(assert){
  const MONTH = moment('August 2015');
  this.set('selection', new Ember.A([ MONTH ]));
  this.render(hbs`{{eui-month-selector year=year selection=selection}}`);
  assert.ok(this.component.isSelected(MONTH), 'month is selected');
  assert.ok(!this.component.isSelected(moment('March 2015')));
});

import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import moment from 'moment';
import MonthSelector from 'eui-calendar/tests/page-objects/month-selector';


moduleForComponent('eui-month-selector', 'Integration | Component | Selectors | eui month ', {
  integration: true,
  beforeEach() {
    this.set('year', moment('2015'));
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
  ], 'year calendar renders properly');
});

test('selection array used to show months as selected', function(assert){
  const MONTH = moment('August 2014');
  this.set('selection', new Ember.A([ MONTH ]));
  this.render(hbs`{{eui-month-selector year=year selection=selection}}`);
  assert.ok(this.component.isSelected(MONTH), 'month is selected');
  assert.ok(!this.component.isSelected(moment('March 2014')));
});

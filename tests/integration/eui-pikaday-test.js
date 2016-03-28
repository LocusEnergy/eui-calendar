import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Moment from 'moment';

moduleForComponent('eui-pikaday', 'Integration | Component | eui pikaday', {
  integration: true
});

test('it should render on the page', function (assert) {
  
  this.render(hbs`{{eui-pikaday}}`);
  
  assert.ok(this.$('input').length, 'input field is visible');
  assert.notOk(isCalendarVisible(), 'calendar window should not be visible');
  
});

test('it should show the calendar when clicked on input field', function (assert) {
  
  this.render(hbs`{{eui-pikaday}}`);
  
  this.$('input').click();  
  assert.ok(isCalendarVisible(), 'calendar is visible');
  
});

test('it should show calendar when render with isOpen=true', function (assert){

  this.render(hbs`{{eui-pikaday isOpen=true}}`);
  assert.ok(isCalendarVisible(), 'calendar is visible');
});

test('it should go from monday through sunday', function (assert) {
  
  this.render(hbs`{{eui-pikaday isOpen=true}}`);

  ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].forEach(function(day){
    assert.ok(this.$(`:contains(${day})`).length, `${day} is visible`);
  });
});

test("it should show today's date as highlighted", function(assert) {
  
  let now = Moment();
  let day = now.date();
  
  this.render(hbs`{{eui-pikaday isOpen=true}}`);

  assert.ok(this.$(`.--is-now:contains(${day})`).length, "today's day has --is-now class");
});

test('it should show date provide via date attribute', function (assert) {
  
  let date = Moment('March 14, 2016');
  
  this.set('date', date);
  
  this.render(hbs`{{eui-pikaday date=date isOpen=true}}`);
  
  assert.equal(this.$('input').val(), 'Mon Mar 14 2016', 'input shows expected date');
  assert.ok(this.$('.--is-selected:contains(14)').length, '14 day is selected in the calendar');
  assert.ok(this.$('.eui-pikaday--month:contains(March 2016)').length, 'March 2016 is shown');

});

// test("it should show selected date in input box when the date is selected", function (assert){
  
//   this.render(hbs`{{eui-pikaday isOpen=true}}`);
  
//   assert.equal(this.$('input').val(), '', "input is empty");
  
//   this.$();
  
// });

function isCalendarVisible() {
  return !!this.$('.eui-pikaday--window').length;
}

// it should close calendar when day is selected
// it should close the calendar when clicked off the calendar
// it should change month to previous month when clicked on left arrow
// it should change month to next month when clicked on right arrow
// it should change the calendar is the date is changed in the input field
// it should show current month and current year
// it should show the correct calendar for current date
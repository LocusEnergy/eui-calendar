import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Moment from 'moment';
import CalendarPageObject from 'eui-calendar/tests/page-objects/calendar';

const FORMAT = 'MMMM YYYY';

moduleForComponent('eui-calendar', 'Integration | Component | eui calendar', {
  integration: true,
  beforeEach() {
    this.component = new CalendarPageObject(this);
  }
});

test('it should show month calendar by default', function(assert){
  assert.expect(3);
  let now = Moment().format(FORMAT);

  this.render(hbs`{{eui-calendar}}`);
  assert.ok(this.$('.eui-interval-selector').length, 'interval selector renders');
  assert.ok(this.component.getName(), now);
  assert.ok(this.$('.eui-day-selector').length, 'day selector renders');
});

test('it should zoomout when click on interval selector name', function(assert){
  assert.expect(5);
  let now = Moment('2012-02-14');
  this.set('date', now);

  this.render(hbs`{{eui-calendar date}}`);
  assert.equal(this.component.getName(), 'February 2012', 'interval name is February 2012');

  this.$(':contains("February 2012")').click();
  assert.ok(this.$('.eui-month-selector').length, 'month selector is visible');
  assert.equal(this.component.getName(), '2012', 'interval name became the year');

  this.$(':contains("2012")').click();
  assert.ok(this.$('.eui-year-selector').length, 'year selector is visible');
  assert.equal(this.component.getName(), '2010 - 2019', 'interval name is the decade');
});

test('it should show previous month in day selector mode', function(assert){
  assert.expect(1);
  let now = Moment('2012-02-14');
  this.set('date', now);

  this.render(hbs`{{eui-calendar date}}`);
  this.$('.eui-interval-selector--previous').click();
  assert.equal(this.component.getName(), 'January 2012', 'interval selector name changed to january after previous clicked');
});

test('it should show previous year in month selector mode', function(assert){
  assert.expect(1);
  let now = Moment('2012-02-14');
  this.set('date', now);

  this.render(hbs`{{eui-calendar date}}`);
  this.$(':contains("February")').click(); // zoom out
  this.$('.eui-interval-selector--previous').click();
  assert.equal(this.component.getName(), '2011', 'interval selector name changed to previous year');
});

test('it should show previous decade in year selector mode', function(assert){
  assert.expect(1);
  let now = Moment('2012-02-14');
  this.set('date', now);

  this.render(hbs`{{eui-calendar date}}`);

  this.$(':contains("February")').click(); // zoom out
  this.$(':contains("2012")').click(); // zoom out

  this.$('.eui-interval-selector--previous').click(); // previous

  assert.equal(this.component.getName(), '2000 - 2009', 'interval selctor name changed to previous decade');
});

test('it should show next month in day selector mode', function(assert){
  assert.expect(1);
  let now = Moment('2012-02-14');
  this.set('date', now);

  this.render(hbs`{{eui-calendar date}}`);

  this.$('.eui-interval-selector--next').click();

  assert.equal(this.component.getName(), 'March 2012', 'interval selector name changed to january after next clicked');
});

test('it should show next year in month selector mode', function(assert){
  assert.expect(1);
  let now = Moment('2012-02-14');
  this.set('date', now);

  this.render(hbs`{{eui-calendar date}}`);

  this.$(':contains("February")').click(); // zoom out

  this.$('.eui-interval-selector--next').click();

  assert.equal(this.component.getName(), '2013', 'interval selector name changed to next year');
});

test('it should show next decade in year selector mode', function(assert){
  assert.expect(1);
  let now = Moment('2012-02-14');

  this.set('date', now);
  this.render(hbs`{{eui-calendar date}}`);

  this.$(':contains("February")').click(); // zoom out
  this.$(':contains("2012")').click(); // zoom out

  this.$('.eui-interval-selector--next').click(); // next

  assert.equal(this.component.getName(), '2020 - 2029', 'interval selctor name changed to next decade');
});

test('it should trigger on-select action when item is clicked', function(assert){
  assert.expect(1);
  let now = Moment('2012-02-14');
  this.set('date', now);

  let lastDate;
  this.on('selection', function(date) {
    lastDate = date;
  });

  this.render(hbs`{{eui-calendar date on-select='selection'}}`);

  this.$('.eui-interval:contains("17")').click();

  assert.equal(lastDate.format('YYYY-MM-DD'), '2012-02-17', 'received selected date');
});

test('it should allow user to select a date from different month and year', function(assert){
  assert.expect(1);
  let now = Moment('2012-02-14');
  this.set('date', now);

  let lastDate;
  this.on('selection', function(date) {
    lastDate = date;
  });

  this.render(hbs`{{eui-calendar date on-select='selection'}}`);
  this.$(':contains(February 2012)').click(); // zoomout
  this.$(':contains(2012)').click(); // zoomout
  this.$('.eui-interval-selector--previous').click(); // go to 2000s
  this.$(':contains(2005)').click(); // zoom in to 2005
  this.$(':contains(May)').click(); // zoom in to May
  this.$('.eui-interval:contains(31)').click();
  assert.equal(lastDate.format('YYYY-MM-DD'), '2005-05-31', 'received selected date');
});

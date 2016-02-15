import { moduleForComponent, test, only } from 'ember-qunit';
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

  let now = Moment('2012-02-14');
  this.set('date', now);

  this.render(hbs`{{eui-calendar date}}`);
  this.$('.eui-interval-selector--previous').click();
  assert.equal(this.$('.eui-interval-selector--name').text().trim(), 'January', 'interval selector name changed to january after previous clicked');
});

test('it should show previous year in month selector mode', function(assert){

  let now = Moment('2012-02-14');

  this.render(hbs`{{eui-calendar date}}`);

  this.$(':contains("February")').click(); // zoom out

  this.$('.eui-interval-selector--prev').click();

  assert.equal(this.$('.eui-interval-selector--name').text().trim(), '2011', 'interval selector name changed to previous year');
});

test('it should show previous decade in year selector mode', function(assert){

  let now = Moment('2012-02-14');

  this.render(hbs`{{eui-calendar date}}`);

  this.$(':contains("February")').click(); // zoom out
  this.$(':contains("2012")').click(); // zoom out

  this.$('.eui-interval-selector--previous').click(); // previous

  assert.equal(this.$('.eui-interval-selector--name').text().trim(), '2000-2009', 'interval selctor name changed to previous decade');
});

test('it should show next month in day selector mode', function(assert){

  let now = Moment('2012-02-14');
  this.set('date', now);

  this.render(hbs`{{eui-calendar date}}`);

  this.$('.eui-interval-selector--next').click();

  assert.equal(this.$('.eui-interval-selector--name').text().trim(), 'March', 'interval selector name changed to january after next clicked');
});

test('it should show next year in month selector mode', function(assert){

  let now = Moment('2012-02-14');

  this.render(hbs`{{eui-calendar date}}`);

  this.$(':contains("February")').click(); // zoom out

  this.$('.eui-interval-selector--next').click();

  assert.equal(this.$('.eui-interval-selector--name').text().trim(), '2013', 'interval selector name changed to next year');
});

test('it should show next decade in year selector mode', function(assert){

  let now = Moment('2012-02-14');

  this.set('date', now);
  this.render(hbs`{{eui-calendar date}}`);

  this.$(':contains("February")').click(); // zoom out
  this.$(':contains("2012")').click(); // zoom out

  this.$('.eui-interval-selector--next').click(); // next

  assert.equal(this.$('.eui-interval-selector--name').text().trim(), '2020-2029', 'interval selctor name changed to next decade');
});

test('it should trigger on-select action when item is clicked', function(assert){

  let now = Moment('2012-02-14');
  this.set('date', now);

  let lastDate;
  this.on('selection', function(date) {
    lastDate = date;
  });

  this.render(hbs`{{eui-calendar date on-select='selection'}}`)

  this.$('.eui-interval:contains("17")').click();

  assert.equal(lastDate.format(FORMAT), '2012-02-17', 'received selected date');
});

test('it should allow user to select a date from different month and year', function(assert){

  let now = Moment('2012-02-14');
  this.set('date', now);

  let lastDate;
  this.on('selection', function(date) {
    lastDate = date;
  });

  this.render(hbs`{{eui-calendar date on-select='selection'}}`);

  this.$(':contains(February 2012)').click(); // zoomout
  this.$(':contains(2012)').click(); // zoomou
  this.$('.eui-interval-selector--prev').click(); // go to 2000s
  this.$('.eui-interval:contains(2005)').click(); // zoom in to 2005
  this.$('.eui-interval:contains(May)').click(); // zoom in to May
  this.$('.eui-interval:contains(3)').click();

  assert.equal(lastDate.format(FORMAT), '2005-05-03', 'received selected date');
});

// selecting day in prev/next month switches month appropriately

// can select prev/next month by clicking on prev/next buttons

// clicking on month name shows month switcher

// make sure you can actually select dates via month / year switcher

// test this in month-switcher tests:
// clicking on year name in month switcher shows year switcher

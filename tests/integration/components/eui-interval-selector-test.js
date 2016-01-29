import { moduleForComponent, test, only } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Moment from 'moment';
import IntervalSelector from 'eui-calendar/tests/page-objects/interval-selector';

moduleForComponent('eui-interval-selector', 'Integration | Component | eui interval selector', {
  integration: true,
  beforeEach() {
    this.component = new IntervalSelector(this);
  }
});

const FORMAT = 'YYYY-MM-DD';

test('it renders', function(assert) {
  assert.expect(3);
  this.render(hbs`{{eui-interval-selector}}`);
  const currentMonth = Moment().format('MMMM YYYY');

  assert.equal(this.component.getName(), currentMonth);
  assert.equal(this.$('.eui-interval-selector--previous').text().trim(), '<<');
  assert.equal(this.$('.eui-interval-selector--next').text().trim(), '>>');
});

test('it accepts date as 1st positional argument', function(assert){
  this.set('date', Moment('1997-12-02'));
  this.render(hbs`{{eui-interval-selector date}}`);

  assert.equal(this.component.getName(), 'December 1997');
});

test('it accepts interval as 2nd position argument', function(assert){
  this.set('date', Moment('2015-12-02'));
  this.render(hbs`{{eui-interval-selector date 'year'}}`);
  assert.equal(this.component.getName(), '2015');

  this.render(hbs`{{eui-interval-selector date 'decade'}}`);
  assert.equal(this.component.getName(), '2010 - 2019');
});

test('it triggers on-zoom action handler when interval name is clicked', function(assert) {
  assert.expect(3);

  this.set('date', Moment('2015-12-02'));

  let zoomout;
  this.on('zoom', (interval) => {
    zoomout = interval;
  });

  this.render(hbs`{{eui-interval-selector date on-zoom='zoom'}}`);
  this.$('.eui-interval-selector--name').click();
  assert.equal(zoomout, 'month');

  this.render(hbs`{{eui-interval-selector date 'year' on-zoom='zoom'}}`);
  this.$('.eui-interval-selector--name').click();
  assert.equal(zoomout, 'year');

  this.render(hbs`{{eui-interval-selector date 'decade' on-zoom='zoom'}}`);
  this.$('.eui-interval-selector--name').click();
  assert.equal(zoomout, 'decade');

});

test('it triggers prev action handler when right arrow is clicked', function(assert){
  assert.expect(3);
  this.set('date', Moment('2015-12-02'));

  let prevDate;
  this.on('prev', (prev) => {
    prevDate = prev;
  });

  this.render(hbs`{{eui-interval-selector date on-previous='prev'}}`);
  this.component.previous();
  assert.equal(prevDate.format(FORMAT), '2015-11-02');

  this.render(hbs`{{eui-interval-selector date 'year' on-previous='prev'}}`);
  this.component.previous();
  assert.equal(prevDate.format(FORMAT), '2014-12-02');

  this.render(hbs`{{eui-interval-selector date 'decade' on-previous='prev'}}`);
  this.component.previous();
  assert.equal(prevDate.format(FORMAT), '2005-12-02');
});

test('it triggers next action handler when left arrow is clicked', function(assert) {
  assert.expect(3);
  this.set('date', Moment('2015-12-02'));

  let nextDate;
  this.on('next', (next) => {
    nextDate = next;
  });

  this.render(hbs`{{eui-interval-selector date on-next='next'}}`);
  this.component.next();
  assert.equal(nextDate.format(FORMAT), '2016-01-02');

  this.render(hbs`{{eui-interval-selector date 'year' on-next='next'}}`);
  this.component.next();
  assert.equal(nextDate.format(FORMAT), '2016-12-02');

  this.render(hbs`{{eui-interval-selector date 'decade' on-next='next'}}`);
  this.component.next();
  assert.equal(nextDate.format(FORMAT), '2025-12-02');
});



/**
action previous < something action zoomout > action next
month:
  component: day-selector
  zoom: to year
  prev: -1 month
  next: +1 month
  format: October 1985 ( MMMM YYYY )
  template: {{eui-interval-selector moment 'month' on-zoom='zoom' on-next='next' on-previous='previous'}}

year:
  component: month-selector
  zoom: to decade
  prev: -1 year
  next: +1 year
  format: 1985 ( YYYY )
  template: {{eui-interval-selector moment 'year' on-zoom='zoom' on-next='next' on-previous='previous'}}


decade:
  component: year-selector
  zoom: null
  prev: -1 decade
  next: +1 decade
  format: 1980-1989 (YYYY - YYYY)
  template: {{eui-interval-selector moment 'decade' on-zoom='zoom' on-next='next' on-previous='previous

**/

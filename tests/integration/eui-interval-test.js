import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Moment from 'moment';

import Interval from 'eui-calendar/tests/page-objects/interval';
import { HTML5_DATETIME_FORMAT } from 'eui-calendar/constants';

moduleForComponent('eui-interval', 'Integration | Component | eui interval', {
  integration: true,
  beforeEach() {
    let moment = Moment('January 21, 2014').utc();
    this.set('moment', moment);
    this.set('datetime', moment.format(HTML5_DATETIME_FORMAT));
    this.component = new Interval(this);
  }
});

test('renders days with moment and interval as positional arguments', function(assert) {
  this.render(hbs`{{eui-interval moment 'day'}}`);

  assert.equal(this.component.value(), '21', 'renders content');
  assert.equal(this.component.datetime(), this.get('datetime'), 'has data-datetime attribute');
});

test('renders moment with block param', function(assert) {
  this.render(hbs`
    {{#eui-interval moment}}
      {{moment-format moment 'dddd'}}
    {{/eui-interval}}
  `);

  assert.equal(this.component.value(), 'Tuesday', 'renders content');
});

test('renders months', function(assert) {
  this.render(hbs`
    {{eui-interval moment 'month'}}
  `);

  assert.equal(this.component.value(), 'January', 'renders content');
  assert.equal(this.component.datetime(), this.get('datetime'), 'has data-datetime attribute');
});

test('renders year', function(assert) {
  this.render(hbs`{{eui-interval moment 'year'}}`);

  assert.equal(this.component.value(), '2014', 'renders content');
  assert.equal(this.component.datetime(), this.get('datetime'), 'has data-datetime attribute');
});

test('is-selected class', function(assert) {
  assert.expect(4);

  this.on('onSelect', (moment) => {
    this.set('selection', moment);
  });

  this.render(hbs`
    {{eui-interval moment 'day'
      selection=selection
      on-select=(action 'onSelect')
    }}
  `);
  assert.ok(!this.component.isSelected(), 'is not selected no selection has been defined');

  this.set('selection', this.get('moment'));
  assert.ok(this.component.isSelected(), 'is selected when selection is defined');

  this.set('selection', null);
  assert.ok(!this.component.isSelected(), 'is not selected before click');

  this.component.selectMoment();
  assert.ok(this.component.isSelected(), 'is selected on click');
});

test('is-now class', function(assert) {
  assert.expect(4);
  this.render(hbs`
    {{eui-interval moment 'day'}}
  `);
  assert.ok(!this.component.isNow(), 'a date in the past is not now');

  this.set('moment', Moment());
  assert.ok(this.component.isNow(), 'has is-now class when moment is now');

  this.render(hbs`{{eui-interval moment 'day' now=now}}`);

  this.set('now', Moment().subtract(1, 'day'));
  assert.ok(!this.component.isNow(), 'does not have is-now class when now property is not now');

  this.set('now', Moment());
  assert.ok(this.component.isNow(), 'has is-now class when now property is now');
});

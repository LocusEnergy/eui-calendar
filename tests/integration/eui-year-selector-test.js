import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Moment from 'moment';
import YearSelector from 'eui-calendar/tests/page-objects/year-selector';

moduleForComponent('eui-year-selector', 'Integration | Component | Selectors | eui year', {
  integration: true,
  beforeEach() {
    this.component = new YearSelector(this);
  }
});

test('it renders', function(assert) {
  this.set('decade', Moment('2016', 'YYYY'));
  this.render(hbs`{{eui-year-selector decade=decade}}`);
  assert.deepEqual(this.component.years(), [
    '2009',
    '2010',
    '2011',
    '2012',
    '2013',
    '2014',
    '2015',
    '2016',
    '2017',
    '2018',
    '2019',
    '2020'
  ], 'renders decade plus one year on either side');

  assert.equal(this.component.getDisabledCount(), 2, 'there are 2 years not in the decade');
});

test('yields years with block parameter', function(assert) {
  this.set('decade', Moment('2016', 'YYYY'));
  this.render(hbs`
    {{#eui-year-selector decade=decade as |year|}}
      {{#if (moment-same-decade decade year)}}
        {{eui-interval
          moment=year
          interval='year'
        }}
      {{else}}
        {{#eui-interval}}{{/eui-interval}}
      {{/if}}
    {{/eui-year-selector}}
  `);

  assert.deepEqual(this.component.years(), [
    '',
    '2010',
    '2011',
    '2012',
    '2013',
    '2014',
    '2015',
    '2016',
    '2017',
    '2018',
    '2019',
    ''
  ], 'renders decade only');
});


test('select-year action', function(assert) {
  this.set('decade', Moment('2016', 'YYYY'));
  const YEAR = Moment('2019', 'YYYY');
  let selectedYear;

  this.on('selectYear', function(year) {
    selectedYear = year;
  });

  this.render(hbs`
    {{eui-year-selector
      decade=decade
      select-year=(action 'selectYear')
    }}
  `);

  this.component.selectYear(YEAR);
  assert.equal(selectedYear.format('YYYY'), '2019', 'year has been selected');
});

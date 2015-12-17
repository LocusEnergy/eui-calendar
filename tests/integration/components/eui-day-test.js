import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('eui-day', 'Integration | Component | eui day', {
  integration: true,
  beforeEach() {
    this.set('day', moment('January 21, 2015'));
  }
});

test('default behavior', function(assert) {
  this.render(hbs`
    {{eui-day day=day}}
  `);

  assert.equal(this.$('.eui-day').text().trim(), '21', 'renders date');
  this.render(hbs`
    {{#eui-day
      day=day
      as |day|
    }}
      [{{moment-format day 'D'}}]
    {{/eui-day}}
  `);

  assert.equal(this.$().text().trim(), '[21]', 'block parameter works');
});
//
// test('is-selected calculated from day and selection', function(assert){
//   this.render(hbs`{{eui-day}}`)
//   assert.ok(!this.component.isSelected());
// });

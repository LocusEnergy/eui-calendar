import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('eui-year-selector', 'Integration | Component | Selectors | eui year', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{eui-year-selector}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:" + EOL +
  this.render(hbs`
    {{#eui-year-selector}}
      template block text
    {{/eui-year-selector}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});

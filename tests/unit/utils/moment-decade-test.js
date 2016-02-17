import momentDecade from '../../../utils/moment-decade';
import Moment from 'moment';
import { module, test } from 'qunit';

module('Unit | Utility | moment decade');

// Replace this with your real tests.
test('it works', function(assert) {
  let result = momentDecade(Moment('2016', 'YYYY'));
  assert.deepEqual(result.map(m => m.year()), [
    2009,
    2010,
    2011,
    2012,
    2013,
    2014,
    2015,
    2016,
    2017,
    2018,
    2019,
    2020
  ]);
});

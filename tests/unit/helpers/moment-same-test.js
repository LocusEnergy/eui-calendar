import { momentSame } from '../../../helpers/moment-same';
import { module, test } from 'qunit';
import moment from 'moment';

module('Unit | Helper | moment same');

// equivalent days are equal
test('equivalent days are equal', function(assert){
  
  let date1 = moment('2013-02-04T22:44:30.652Z');
  let date2 = moment('2013-02-04T22:22:30.652Z');
  let date3 = moment('2013-02-03T22:44:30.652Z');
  
  assert.ok(momentSame([date1, date2, 'day']));
  assert.notOk(momentSame([date1, date3, 'day']));  
  
  assert.notOk(momentSame([date1, null, 'day']));
  assert.notOk(momentSame([null, date2, 'day']));
  assert.notOk(momentSame([null, null, 'day']));
  
});

test('equivalent months are equal', function(assert){
  
  let date1 = moment('2013-02-04T22:44:30.652Z');
  let date2 = moment('2013-02-08T22:22:30.652Z');
  let date3 = moment('2013-01-03T22:44:30.652Z');
  
  assert.ok(momentSame([date1, date2, 'month']));
  assert.notOk(momentSame([date1, date3, 'month']));  
  
  assert.notOk(momentSame([date1, null, 'month']));
  assert.notOk(momentSame([null, date2, 'month']));
  assert.notOk(momentSame([null, null, 'month']));
  
});


// year month week day hour minute second
// TODO: equivalent years are equal
// TODO: equivalent months are equal
// TODO: equivalent week are equal

// TODO: equivalent hours are equal
// TODO: equivalent minutes are equal
// TODO: equivalent seconds are equal
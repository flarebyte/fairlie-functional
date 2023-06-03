import {test} from 'node:test';
import {bind1} from '../src/index.mjs';
import {min3char, valueifyShort} from './fixture.js';
import {assertSuccessfulResult} from './assert-utils.js';

test('bind two switch functions', () => {
  const f = bind1(min3char, valueifyShort);
  const text = 'short text';
  const actual = f(text);
  assertSuccessfulResult(actual, {value: text});
});

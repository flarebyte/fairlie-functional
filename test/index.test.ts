import {test} from 'node:test';
import {bind1, bind2, bindSimilar} from '../src/index.mjs';
import {max20char, min3char, notDot, valueifyShort} from './fixture.js';
import {assertFailedResult, assertSuccessfulResult} from './assert-utils.js';

test('bind two switch functions', () => {
  const f = bind1(min3char, valueifyShort);
  const text = 'short text';
  const actual = f(text);
  assertSuccessfulResult(actual, {value: text});
});

test('bind two switch functions and fail at first', () => {
  const f = bind1(min3char, valueifyShort);
  const text = 'o';
  const actual = f(text);
  assertFailedResult(actual, 'At least 3 characters');
});

test('bind three switch functions', () => {
  const f = bind2(min3char, max20char, valueifyShort);
  const text = 'short text';
  const actual = f(text);
  assertSuccessfulResult(actual, {value: text});
});

test('bind three switch functions and fail at first', () => {
  const f = bind2(min3char, max20char, valueifyShort);
  const text = 'way to many characters in this sentence';
  const actual = f(text);
  assertFailedResult(actual, 'Not more than 20 characters');
});

test('bind three similar switch functions', () => {
  const f = bindSimilar([min3char, max20char, notDot]);
  const text = 'short text';
  const actual = f(text);
  assertSuccessfulResult(actual, 'short text');
});

test('bind two similar switch functions and fail with too many chars', () => {
  const f = bindSimilar([min3char, max20char]);
  const text = 'way to many characters in this sentence';
  const actual = f(text);
  assertFailedResult(actual, 'Not more than 20 characters');
});

test('bind three similar switch functions and fail with too many chars', () => {
  const f = bindSimilar([min3char, max20char, notDot]);
  const text = 'way to many characters in this sentence';
  const actual = f(text);
  assertFailedResult(actual, 'Not more than 20 characters');
});

test('bind three similar switch functions and fail at dot', () => {
  const f = bindSimilar([min3char, max20char, notDot]);
  const text = 'escape with dot .';
  const actual = f(text);
  assertFailedResult(actual, 'Should not have any dots');
});

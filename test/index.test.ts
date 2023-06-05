import {test} from 'node:test';
import assert from 'node:assert/strict';
import {
  bindTwo,
  bindThree,
  bindSimilar,
  bypass,
  recover,
  orFallback,
  withDefault,
  bindTwoAsync,
  bindThreeAsync,
  bindSimilarAsync,
  bypassAsync,
  recoverAsync,
  orFallbackAsync,
  transformToSwitch,
  transformToAsyncSwitch,
} from '../src/index.mjs';
import {
  addContextToError,
  asyncAddContextToError,
  asyncFallbackToUppercase,
  asyncMax20char,
  asyncMin3char,
  asyncNotDot,
  asyncRecoverToGood,
  asyncValueifyShort,
  fallbackToUppercase,
  max20char,
  min3char,
  notDot,
  recoverToGood,
  valueifyShort,
} from './fixture.js';
import {assertFailedResult, assertSuccessfulResult} from './assert-utils.js';

test('withDefault should return the successful value', () => {
  const text = 'many chars';
  const actual = withDefault('default')(min3char(text));
  assert.equal(actual, text);
});

test('withDefault should fallback to default if an error', () => {
  const text = 'o';
  const actual = withDefault('default')(min3char(text));
  assert.equal(actual, 'default');
});

test('bind two switch functions', () => {
  const f = bindTwo(min3char, valueifyShort);
  const text = 'short text';
  const actual = f(text);
  assertSuccessfulResult(actual, {value: text});
});

test('bind two switch functions asynchronously', async () => {
  const f = bindTwoAsync(asyncMin3char, asyncValueifyShort);
  const text = 'short text';
  const actual = await f(text);
  assertSuccessfulResult(actual, {value: text});
});

test('bind two switch functions and fail at first', () => {
  const f = bindTwo(min3char, valueifyShort);
  const text = 'o';
  const actual = f(text);
  assertFailedResult(actual, 'At least 3 characters');
});

test('bind two switch functions and fail at first asynchronously', async () => {
  const f = bindTwoAsync(asyncMin3char, asyncValueifyShort);
  const text = 'o';
  const actual = await f(text);
  assertFailedResult(actual, 'At least 3 characters');
});

test('bind three switch functions', () => {
  const f = bindThree(min3char, max20char, valueifyShort);
  const text = 'short text';
  const actual = f(text);
  assertSuccessfulResult(actual, {value: text});
});

test('bind three switch functions asynchronously', async () => {
  const f = bindThreeAsync(asyncMin3char, asyncMax20char, asyncValueifyShort);
  const text = 'short text';
  const actual = await f(text);
  assertSuccessfulResult(actual, {value: text});
});

test('bind three switch functions and fail at first asynchronously', async () => {
  const f = bindThreeAsync(asyncMin3char, asyncMax20char, asyncValueifyShort);
  const text = 'way to many characters in this sentence';
  const actual = await f(text);
  assertFailedResult(actual, 'Not more than 20 characters');
});

test('bind three switch functions and fail at first', () => {
  const f = bindThree(min3char, max20char, valueifyShort);
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

test('bind three similar switch functions asynchronously', async () => {
  const f = bindSimilarAsync([asyncMin3char, asyncMax20char, asyncNotDot]);
  const text = 'short text';
  const actual = await f(text);
  assertSuccessfulResult(actual, 'short text');
});

test('bind two similar switch functions and fail with too many chars', () => {
  const f = bindSimilar([min3char, max20char]);
  const text = 'way to many characters in this sentence';
  const actual = f(text);
  assertFailedResult(actual, 'Not more than 20 characters');
});

test('bind two similar switch functions and fail with too many chars asynchronously', async () => {
  const f = bindSimilarAsync([asyncMin3char, asyncMax20char]);
  const text = 'way to many characters in this sentence';
  const actual = await f(text);
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

test('bypass should be triggered by an error', () => {
  const f = bypass(addContextToError);
  const text = 'o';
  const actual = f(min3char(text));
  assertFailedResult(actual, 'Account 123. London. At least 3 characters');
});

test('bypass should be triggered by an error asynchronously', async () => {
  const f = bypassAsync(asyncAddContextToError);
  const text = 'o';
  const actual = await f(await asyncMin3char(text));
  assertFailedResult(actual, 'Account 123. London. At least 3 characters');
});

test('bypass should ignore success', () => {
  const f = bypass(addContextToError);
  const text = 'a great story';
  const actual = f(min3char(text));
  assertSuccessfulResult(actual, 'a great story');
});

test('bypass should ignore success asynchronously', async () => {
  const f = bypassAsync(asyncAddContextToError);
  const text = 'a great story';
  const actual = await f(await asyncMin3char(text));
  assertSuccessfulResult(actual, 'a great story');
});

test('recover should be triggered by an error and recover with valid result', () => {
  const f = recover(recoverToGood);
  const text = 'o';
  const actual = f(min3char(text));
  assertSuccessfulResult(actual, 'good');
});

test('recover should be triggered by an error and recover with valid result asynchronously', async () => {
  const f = recoverAsync(asyncRecoverToGood);
  const text = 'o';
  const actual = await f(await asyncMin3char(text));
  assertSuccessfulResult(actual, 'good');
});

test('recover should ignore success', () => {
  const f = recover(recoverToGood);
  const text = 'a great story';
  const actual = f(min3char(text));
  assertSuccessfulResult(actual, 'a great story');
});

test('recover should ignore success asynchronously', async () => {
  const f = recoverAsync(asyncRecoverToGood);
  const text = 'a great story';
  const actual = await f(await asyncMin3char(text));
  assertSuccessfulResult(actual, 'a great story');
});

test('fallback should be triggered by an error and retry with fallback function', () => {
  const f = orFallback(min3char, fallbackToUppercase);
  const text = 'z';
  const actual = f(text);
  assertSuccessfulResult(actual, 'Z');
});

test('fallback should be triggered by an error and retry with fallback function asynchronously', async () => {
  const f = orFallbackAsync(asyncMin3char, asyncFallbackToUppercase);
  const text = 'z';
  const actual = await f(text);
  assertSuccessfulResult(actual, 'Z');
});

test('transform to switch', () => {
  const multiplyByTwo = (value: number) => value * 2;
  const f = transformToSwitch(multiplyByTwo);
  const actual = f(3);
  assertSuccessfulResult(actual, 6);
});

test('transform to switch asynchronous', async () => {
  const multiplyByTwo = (value: number) => value * 2;
  const f = transformToAsyncSwitch(multiplyByTwo);
  const actual = await f(3);
  assertSuccessfulResult(actual, 6);
});

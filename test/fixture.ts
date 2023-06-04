import {type Result, willFail, succeed, type Success} from '../src/index.mjs';

export const min3char = (text: string): Result<string, string> => {
  if (text.length < 3) {
    return willFail('At least 3 characters');
  }

  return succeed(text);
};

export const max20char = (text: string): Result<string, string> => {
  if (text.length > 20) {
    return willFail('Not more than 20 characters');
  }

  return succeed(text);
};

export const notDot = (text: string): Result<string, string> => {
  if (text.includes('.')) {
    return willFail('Should not have any dots');
  }

  return succeed(text);
};

export const valueifyShort = (
  value: string
): Result<{value: string}, string> => {
  if (value.length > 15) {
    return willFail('At least 15 characters');
  }

  return succeed({value});
};

export const addContextToError = (message: string): Result<string, string> => {
  return willFail(`Account 123. London. ${message}`);
};

export const recoverToGood = (_message: string): Success<string> => {
  return succeed('good');
};

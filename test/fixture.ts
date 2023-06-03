import {type Result, willFail, succeed} from '../src/index.mjs';

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

export const valueifyShort = (
  value: string
): Result<{value: string}, string> => {
  if (value.length > 15) {
    return willFail('At least 15 characters');
  }

  return succeed({value});
};
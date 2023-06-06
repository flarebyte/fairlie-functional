import {type Result, failWith, succeed, type Success} from '../src/index.mjs';

export const min3char = (text: string): Result<string, string> => {
  if (text.length < 3) {
    return failWith('At least 3 characters');
  }

  return succeed(text);
};

export const asyncMin3char = async (text: string) => {
  if (text.length < 3) {
    return failWith('At least 3 characters');
  }

  return succeed(text);
};

export const max20char = (text: string): Result<string, string> => {
  if (text.length > 20) {
    return failWith('Not more than 20 characters');
  }

  return succeed(text);
};

export const asyncMax20char = async (text: string) => {
  if (text.length > 20) {
    return failWith('Not more than 20 characters');
  }

  return succeed(text);
};

export const notDot = (text: string): Result<string, string> => {
  if (text.includes('.')) {
    return failWith('Should not have any dots');
  }

  return succeed(text);
};

export const asyncNotDot = async (text: string) => {
  if (text.includes('.')) {
    return failWith('Should not have any dots');
  }

  return succeed(text);
};

export const valueifyShort = (
  value: string
): Result<{value: string}, string> => {
  if (value.length > 15) {
    return failWith('At least 15 characters');
  }

  return succeed({value});
};

export const asyncValueifyShort = async (value: string) => {
  if (value.length > 15) {
    return failWith('At least 15 characters');
  }

  return succeed({value});
};

export const addContextToError = (message: string): Result<string, string> => {
  return failWith(`Account 123. London. ${message}`);
};

export const asyncAddContextToError = async (message: string) => {
  return failWith(`Account 123. London. ${message}`);
};

export const recoverToGood = (_message: string): Success<string> => {
  return succeed('good');
};

export const asyncRecoverToGood = async (_message: string) => {
  return succeed('good');
};

export const fallbackToUppercase = (text: string): Result<string, string> => {
  return succeed(text.toUpperCase());
};

export const asyncFallbackToUppercase = async (text: string) => {
  return succeed(text.toUpperCase());
};

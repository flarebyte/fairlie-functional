/** Represent a successful result */
export type Success<A> = {
    status: 'success';
    value: A;
  };
  
  /** Represent a failed result */
export type Failure<E> = {
    status: 'failure';
    error: E;
  };
  
  export type Result<A, E> = Success<A> | Failure<E>;
  
  /**
   * Return a successful response
   * @param value a successful value
   */
  export const succeed = <A,>(value: A): Success<A> => ({
    status: 'success',
    value,
  });
  
  /**
   * Return a failure result
   * @param error an error value
   */
  export const willFail = <E,>(error: E): Failure<E> => ({
    status: 'failure',
    error,
  });
  
  /**
   * Return the successful value otherwise a default value
   * @param defaultValue the defauly
   * @returns 
   */
  export const withDefault =
    <A, E>(defaultValue: A) =>
    (result: Result<A, E>): A=>
      result.status === 'success' ? result.value : defaultValue;
  
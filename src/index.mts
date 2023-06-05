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
 * A function that has one input and a success/failure output.
 * It can be seen as a railway switch that directs the input to either the success track or the failure track.
 */
export type SwitchFunction<V, A, E> = (value: V) => Result<A, E>;

/**
 * An asynchronous function that has one input and a success/failure output.
 * It can be seen as a railway switch that directs the input to either the success track or the failure track.
 */
export type AsyncSwitchFunction<V, A, E> = (value: V) => Promise<Result<A, E>>;


/**
 * A function that has one input and a success/failure output.
 * It can be seen as a railway switch that directs the input to either the success track or the failure track.
 */
export type RecoverSwitchFunction<A, E> = (error: E) => Success<A>;

/**
 * An asynchronous function that has one input and a success/failure output.
 * It can be seen as a railway switch that directs the input to either the success track or the failure track.
 */
export type AsyncRecoverSwitchFunction<A, E> = (error: E) => Promise<Success<A>>;

/**
 * Return a successful response
 * @param value a successful value
 */
export const succeed = <A>(value: A): Success<A> => ({
  status: 'success',
  value,
});

/**
 * Return a failure result
 * @param error an error value
 */
export const willFail = <E>(error: E): Failure<E> => ({
  status: 'failure',
  error,
});

/**
 * Return the successful value otherwise a default value
 * @param defaultValue the default value
 * @returns the successful otherwise the default value
 */
export const withDefault =
  <A, E>(defaultValue: A) =>
  (result: Result<A, E>): A =>
    result.status === 'success' ? result.value : defaultValue;

/**
 * A function that connects two switch functions
   together, passing the success output of the first function to the input
   of the second function, and propagating the failure output to the error
   track.
 * @param f1 the first switch function
 * @param f2 the second switch function
 * @returns a composite switch function
 */
export function bindTwo<V, A, B, E>(
  f1: SwitchFunction<V, A, E>,
  f2: SwitchFunction<A, B, E>
): SwitchFunction<V, B, E> {
  return (value: V) => {
    const result1 = f1(value);
    if (result1.status === 'success') {
      const result2 = f2(result1.value);
      return result2;
    } else {
      return result1;
    }
  };
}

/**
 * A function that connects two asynchronous switch functions
   together, passing the success output of the first function to the input
   of the second function, and propagating the failure output to the error
   track.
 * @param f1 the first asynchronous switch function
 * @param f2 the second asynchronous switch function
 * @returns a composite async switch function
 */
   export function bindTwoAsync<V, A, B, E>(
    f1: AsyncSwitchFunction<V, A, E>,
    f2: AsyncSwitchFunction<A, B, E>
  ): AsyncSwitchFunction<V, B, E> {
    return async (value: V) => {
      const result1 = await f1(value);
      if (result1.status === 'success') {
        const result2 = await f2(result1.value);
        return result2;
      } else {
        return result1;
      }
    };
  }

/**
 * A function that connects three switch functions
   together, passing the success output of the first function to the input
   of the second function, and then passing the success output of the second function
   to the third function and propagating the failure output to the error
   track.
 * @param f1 the first switch function
 * @param f2 the second switch function
 * @param f3 the third switch function
 * @returns a successful result or a failure
 */
export function bindThree<V, A, B, C, E>(
  f1: SwitchFunction<V, A, E>,
  f2: SwitchFunction<A, B, E>,
  f3: SwitchFunction<B, C, E>
): SwitchFunction<V, C, E> {
  return (input: V) => {
    const result1 = f1(input);
    if (result1.status === 'success') {
      const result2 = f2(result1.value);
      if (result2.status === 'success') {
        const result3 = f3(result2.value);
        return result3;
      }
      return result2;
    } else {
      return result1;
    }
  };
}

/**
 * A function that connects three switch functions asynchronously
   together, passing the success output of the first function to the input
   of the second function, and then passing the success output of the second function
   to the third function and propagating the failure output to the error
   track.
 * @param f1 the first switch function
 * @param f2 the second switch function
 * @param f3 the third switch function
 * @returns a successful result or a failure
 */
   export function bindThreeAsync<V, A, B, C, E>(
    f1: AsyncSwitchFunction<V, A, E>,
    f2: AsyncSwitchFunction<A, B, E>,
    f3: AsyncSwitchFunction<B, C, E>
  ): AsyncSwitchFunction<V, C, E> {
    return async (input: V) => {
      const result1 = await f1(input);
      if (result1.status === 'success') {
        const result2 = await f2(result1.value);
        if (result2.status === 'success') {
          const result3 = await f3(result2.value);
          return result3;
        }
        return result2;
      } else {
        return result1;
      }
    };
  }


  /**
 * A function that connects multiple switch functions
   together, passing the success output of the current function to the input
   of the next function, and propagating the failure output to the error
   track.
 * @param functions the first switch function
 * @returns a successful result or a failure
 */
   export function bindSimilar<A, E>(
    functions: [
      SwitchFunction<A, A, E>,
      SwitchFunction<A, A, E>,
      ...SwitchFunction<A, A, E>[]
    ]
  ): SwitchFunction<A, A, E> {
    return (value: A) => {
      let valueResult: Result<A, E> = succeed(value);
      for (const f of functions) {
        if (valueResult.status === 'success') {
          valueResult = f(valueResult.value);
        } else {
          return valueResult;
        }
      }
      return valueResult;
    };
  }

/**
 * A function that connects multiple switch functions asynchronously
   together, passing the success output of the current function to the input
   of the next function, and propagating the failure output to the error
   track.
 * @param functions the first switch function
 * @returns a successful result or a failure
 */
export function bindSimilarAsync<A, E>(
  functions: [
    AsyncSwitchFunction<A, A, E>,
    AsyncSwitchFunction<A, A, E>,
    ...AsyncSwitchFunction<A, A, E>[]
  ]
): AsyncSwitchFunction<A, A, E> {
  return async (value: A) => {
    let valueResult: Result<A, E> = succeed(value);
    for (const f of functions) {
      if (valueResult.status === 'success') {
        valueResult = await f(valueResult.value);
      } else {
        return valueResult;
      }
    }
    return valueResult;
  };
}

/**
 * The bypass function takes a switch function that expects a failure value as an input 
 * and returns a success or failure value as an output
 * @param altFunc the first switch function
 * @returns a successful result or a failure
 */
   export function bypass<V, A, E>(
    altFunc: SwitchFunction<E, A, E>,
  ): (value: Result<V, E>) => Result<V | A, E> {
    return (result: Result<V, E>) => {
      if (result.status === 'success') {
        return result;
      } else {
        return altFunc(result.error);
      }
    };
  }

  /**
 * The bypass function takes an asynchronous switch function that expects a failure value as an input 
 * and returns a success or failure value as an output
 * @param altFunc the first switch function
 * @returns a successful result or a failure
 */
  export function bypassAsync<V, A, E>(
    altFunc: AsyncSwitchFunction<E, A, E>,
  ): (value: Result<V, E>) => Promise<Result<V | A, E>> {
    return async (result: Result<V, E>) => {
      if (result.status === 'success') {
        return result;
      } else {
        return await altFunc(result.error);
      }
    };
  }

/**
 * The recover function takes a recovery function that expects a failure value as an input
 * and returns only a success value as an output
 * @param altFunc the first switch function
 * @returns a successful result or a failure
 */
  export function recover<V, A, E>(
    altFunc: RecoverSwitchFunction<A, E>,
  ): (value: Result<V, E>) => Result<V | A, E> {
    return (result: Result<V, E>) => {
      if (result.status === 'success') {
        return result;
      } else {
        return altFunc(result.error);
      }
    };
  }

  /**
 * The recover function takes a asynchronous recovery function that expects a failure value as an input
 * and returns only a success value as an output
 * @param altFunc the first switch function
 * @returns a successful result or a failure
 */
  export function recoverAsync<V, A, E>(
    altFunc: AsyncRecoverSwitchFunction<A, E>,
  ): (value: Result<V, E>) => Promise<Result<V | A, E>> {
    return async (result: Result<V, E>) => {
      if (result.status === 'success') {
        return result;
      } else {
        return await altFunc(result.error);
      }
    };
  }

  /**
 * The fallback function takes a switch function that expects the input value as an input 
 * and returns a success or failure value as an output. In short, it will fallback to that
 * function if the first fail
 * @param f1 the first switch function
 * @param fallbackF2 the fallback function
 * @returns a successful result or a failure
 */
  export function orFallback<V, A, E>(
    f1: SwitchFunction<V, A, E>,
    fallbackF2: SwitchFunction<V, A, E>
  ): SwitchFunction<V, A, E> {
    return (value: V) => {
      const result1 = f1(value);
      if (result1.status === 'success') {
        return result1;
      } else {
        const resultFallback = fallbackF2(value)
        return resultFallback;
      }
    };
  }

  /**
 * The fallback function takes an asynchronous switch function that expects the input value as an input 
 * and returns a success or failure value as an output. In short, it will fallback to that
 * function if the first fail
 * @param f1 the first switch function
 * @param fallbackF2 the fallback function
 * @returns a successful result or a failure
 */
  export function orFallbackAsync<V, A, E>(
    f1: AsyncSwitchFunction<V, A, E>,
    fallbackF2: AsyncSwitchFunction<V, A, E>
  ): AsyncSwitchFunction<V, A, E> {
    return async (value: V) => {
      const result1 = await f1(value);
      if (result1.status === 'success') {
        return result1;
      } else {
        const resultFallback = await fallbackF2(value)
        return resultFallback;
      }
    };
  }
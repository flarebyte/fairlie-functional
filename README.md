# fairlie-functional

![npm](https://img.shields.io/npm/v/fairlie-functional) ![Build status](https://github.com/flarebyte/fairlie-functional/actions/workflows/main.yml/badge.svg) ![npm bundle size](https://img.shields.io/bundlephobia/min/fairlie-functional)

![npm type definitions](https://img.shields.io/npm/types/fairlie-functional) ![node-current](https://img.shields.io/node/v/fairlie-functional) ![NPM](https://img.shields.io/npm/l/fairlie-functional)

![Experimental](https://img.shields.io/badge/status-experimental-blue)

> A lightweight functional library in typescript that helps dealing with failures the rail way

A lightweight functional library in typescript that helps dealing with failures the rail way

![Hero image for fairlie-functional](fairlie-functional-hero-512.jpeg)

Highlights:

* A take on Railway Oriented Programming (ROP) in typescript
* Each function will always yield a failure or a success
* You can easily combine multiple functions into a single unit using operators
* Support for promises



A few examples of commands:

Bind two switch functions:
```typescript
bindTwo(min3char, valueifyShort)('some text')

```
Bind three switch functions:
```typescript
bindThree(min3char, max20char, valueifyShort)('some text')

```
Bind three similar switch functions:
```typescript
bindSimilar([min3char, max20char, notDot])('some text')

```
Bypass a function if it fails:
```typescript
bypass(addContextToError)(min3char('some text'))

```
Recovers a function if it fails:
```typescript
recover(recoverToGood)(min3char('some text'))

```
Fallback to a different function if the first fail:
```typescript
orFallback(min3char, fallbackToUppercase)('some text')

```
Convert a simple transformer to a switch function:
```typescript
transformToSwitch((value: number) => value * 2)(17)

```

## Documentation and links

* [Code Maintenance :wrench:](MAINTENANCE.md)
* [Code Of Conduct](CODE_OF_CONDUCT.md)
* [Api for fairlie-functional](API.md)
* [Contributing :busts_in_silhouette: :construction:](CONTRIBUTING.md)
* [Diagram for the code base :triangular_ruler:](INTERNAL.md)
* [Vocabulary used in the code base :book:](CODE_VOCABULARY.md)
* [Architectural Decision Records :memo:](DECISIONS.md)
* [Contributors :busts_in_silhouette:](https://github.com/flarebyte/fairlie-functional/graphs/contributors)
* [Dependencies](https://github.com/flarebyte/fairlie-functional/network/dependencies)
* [Glossary :book:](https://github.com/flarebyte/overview/blob/main/GLOSSARY.md)
* [Software engineering principles :gem:](https://github.com/flarebyte/overview/blob/main/PRINCIPLES.md)
* [Overview of Flarebyte.com ecosystem :factory:](https://github.com/flarebyte/overview)
* [Npm dependencies](DEPENDENCIES.md)

## Related


## Installation

This package is [ESM only](https://blog.sindresorhus.com/get-ready-for-esm-aa53530b3f77).

```bash
yarn add fairlie-functional
```

[license-img]: http://img.shields.io/badge/license-MIT-green.svg
[license-url]: http://opensource.org/licenses/MIT
[node-image]: https://img.shields.io/badge/node.js-v10.0.0-blue.svg
[node-url]: http://nodejs.org/download/
[npm-img]: https://img.shields.io/npm/v/ajv-oai.svg
[npm-url]: https://npmjs.org/package/ajv-oai
[travis-img]: https://travis-ci.org/oaijs/ajv-oai.svg
[travis-url]: https://travis-ci.org/oaijs/ajv-oai
[coveralls-img]: https://coveralls.io/repos/github/oaijs/ajv-oai/badge.svg
[coveralls-url]: https://coveralls.io/github/oaijs/ajv-oai
[downloads-image]: https://img.shields.io/npm/dm/ajv-oai.svg
[downloads-url]: https://npmjs.org/package/ajv-oai
[david-img]: https://img.shields.io/david/oaijs/ajv-oai.svg
[david-url]: https://david-dm.org/oaijs/ajv-oai
[router]: https://github.com/oaijs/koa-oai-router

[![License][license-img]][license-url]
[![Node Version][node-image]][node-url]
[![NPM Version][npm-img]][npm-url]
[![Build Status][travis-img]][travis-url]
[![Test Coverage][coveralls-img]][coveralls-url]
[![Downloads][downloads-image]][downloads-url]
[![Dependency Status][david-img]][david-url]

# Ajv-OAI

OpenAPI's JsonSchema validator, Powered by [Ajv](https://github.com/epoberezkin/ajv).

Support formats in [dataTypeFormat](http://swagger.io/specification/#dataTypeFormat), except **binary** format.

# Installation

```
npm install ajv-oai --save
```

# Usage

## OpenAPI v3.1

```js
const ajv = new AjvOAI({ oasVer: '3.1' });
```

## OpenAPI v3.0 or v2.0
```js
const ajv = new AjvOAI();

// OR
const ajv = new AjvOAI({oasVer: '2.0'});
```

## Default Options
`ajv-oai` sets followings as ajv's default options, you can override this options as need.
```js
{
  coerceTypes: false,
  useDefaults: true,
}
```

## Tips

`BigInt` is not supported by `ajv`, so `int64` validation will be invalid when value is too big or too small. You can get more info from [Should 'integer' type validate bigint ? ](https://github.com/ajv-validator/ajv/issues/1116)


# Example

```js
const ajv = new AjvOAI();

console.log(ajv.compile({ type: 'integer', format: 'int32' })(2147483648));
console.log(ajv.compile({ type: 'integer', format: 'int32' })(-2147483649));
console.log(ajv.compile({ type: 'integer', format: 'int32' })(1.23));
console.log(ajv.compile({ type: 'integer', format: 'int32' })(123));
> false
> false
> false
> true

console.log(ajv.compile({ type: 'integer', format: 'int64' })(Number.MAX_VALUE));
console.log(ajv.compile({ type: 'integer', format: 'int64' })(Number.MIN_VALUE));
console.log(ajv.compile({ type: 'integer', format: 'int64' })(1.23));
console.log(ajv.compile({ type: 'integer', format: 'int64' })(123));
> false
> false
> false
> true

console.log(ajv.compile({ type: 'number', format: 'float' })(Number.MAX_VALUE));
console.log(ajv.compile({ type: 'number', format: 'float' })(Number.MIN_VALUE));
console.log(ajv.compile({ type: 'number', format: 'float' })(1.23));
console.log(ajv.compile({ type: 'number', format: 'float' })(123));
> false
> false
> true
> true

console.log(ajv.compile({ type: 'number', format: 'double' })(Number.MAX_VALUE));
console.log(ajv.compile({ type: 'number', format: 'double' })(Number.MIN_VALUE));
console.log(ajv.compile({ type: 'number', format: 'double' })(1.23));
console.log(ajv.compile({ type: 'number', format: 'double' })(123));
> true
> true
> true
> true

console.log(ajv.compile({ type: 'string', format: 'byte' })('MTIz'));
console.log(ajv.compile({ type: 'string', format: 'byte' })('abc'));
console.log(ajv.compile({ type: 'string', format: 'byte' })(1));
console.log(ajv.compile({ type: 'string', format: 'byte' })('5L2g5aW95ZWK'));
> true
> false
> false
> true
```

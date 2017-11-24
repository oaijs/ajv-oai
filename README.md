OpenAPI's JsonSchema validator, Powered by [Ajv](https://github.com/epoberezkin/ajv).

Support formats in [dataTypeFormat](http://swagger.io/specification/#dataTypeFormat), except **binary** format.

# Installation
```
npm install ajv-oai --save
```

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
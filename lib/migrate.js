const migrate = require("json-schema-migrate");


function draft2019(oldSchema) {
  const newSchema = Object.assign({}, oldSchema)

  migrate.draft2019(newSchema)

  return newSchema;
}

module.exports = draft2019;

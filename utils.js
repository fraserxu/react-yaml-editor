var ReactForms = require('react-forms')
var Schema = ReactForms.schema.Schema
var Property = ReactForms.schema.Property
var Form = ReactForms.Form
var React = require('react')

/**
 * Text field builder
 * @param {String} name of the input filed
 * @param {String} value default value of the input
 */
function TextField(name, value) {
  return (
    <Property
    name={name}
    label={name}
    defaultValue={value}
    input={<input type="text" />}
    />
  )
}

/**
 * Property builder
 * @param {Object} data object
 */
function PropertyBuilder(data) {
  return Object.keys(data).map(function(key) {
    if(typeof data[key] == 'string') {
      return TextField(key, data[key])
    } else if (typeof data[key] == 'object') {
      var properties = PropertyBuilder(data[key])
      return SubSchemaBuilder(properties, key)
    }
  })
}

/**
 * Root Schema builder
 * @param {Obejct} properties component
 */
function SchemaBuilder(properties) {
  return (
    <Schema>
      {properties}
    </Schema>
  )
}

/**
 * Sub Schema builder
 * @param {Obejct} properties object
 * @param {String} name       for the sub schema
 */
function SubSchemaBuilder(properties, name) {
  return (
    <Schema name={name} label={name} >
      {properties}
    </Schema>
  )
}

module.exports = {
  TextField: TextField,
  PropertyBuilder: PropertyBuilder,
  SchemaBuilder: SchemaBuilder,
  SubSchemaBuilder: SubSchemaBuilder
}
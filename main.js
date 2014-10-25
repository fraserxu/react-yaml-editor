/**
 * @jsx React.DOM
 */

var yamljs = require('yamljs')
var React = require('react')
var ReactForms = require('react-forms')
var Schema = ReactForms.schema.Schema
var Property = ReactForms.schema.Property
var Form = ReactForms.Form

var YamlReader  = React.createClass({

  displayName: 'yamlEditor',

  getInitialState: function() {
    return {
      data: {}
    };
  },

  componentWillMount: function() {
    yamljs.load('devops.yml', function(result) {
      this.setState({data: result})
    }.bind(this))
  },

  render: function() {
    var str = JSON.stringify(this.state.data, null, 4)
    var properties = PropertyBuilder(this.state.data)
    var schema = SchemaBuilder(properties)
    return (
      <div>
        <div className='code'>
          <pre>{str}</pre>
        </div>

        <div className='form'>
          <MyForm schema={schema} />
        </div>
      </div>
    )
  }

})


// text filed builder
function TextField(name, value) {
  console.log('value', value)
  return (
    <Property
    name={name}
    label={name}
    defaultValue={value}
    input={<input type="text" />}
    />
  )
}

// property builder
function PropertyBuilder(data) {
  return Object.keys(data).map(function(key) {
    if(typeof data[key] == 'string') {
      return TextField(key, data[key])
    } else if (typeof data[key] == 'object') {
      // fieldSet
    }
  })
}

// schema builder
function SchemaBuilder(properties) {
  return (
    <Schema>
      {properties}
    </Schema>
  )
}

var MyForm = React.createClass({
  render: function() {

    // render Form as <div /> and transfer all props to it
    var form = this.transferPropsTo(
      <Form ref="form" component={React.DOM.div} />
    )

    // return <form /> component with rendered form and a submit button
    return (
        <form onSubmit={this.onSubmit} className="MyForm">
          {form}
          <button type="submit">Submit</button>
        </form>
    )
  },

  onSubmit: function(e) {
    e.preventDefault()

    // check if form is valid
    var validation = this.refs.form.value().validation
    if (ReactForms.validation.isFailure(validation)) {
      console.log('invalid form')
      return
    }

    alert('form submitted!')
  }
})


React.renderComponent(<YamlReader />, document.body)
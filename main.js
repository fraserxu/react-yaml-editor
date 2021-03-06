/**
 * @jsx React.DOM
 */
var ReactForms = require('react-forms')
var Form = ReactForms.Form
var yamljs = require('yamljs')
var React = require('react')
var Utils = require('./utils')

// Exprot the Yaml editor
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
    var properties = Utils.PropertyBuilder(this.state.data)
    var schema = Utils.SchemaBuilder(properties)
    return (
      <div>

        <h2>React Yaml editor</h2>

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

// form builder
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
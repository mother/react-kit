import React, { Component } from 'react'

export default class Form extends Component {
   static propTypes = {
      children: React.PropTypes.node,
      initialValues: React.PropTypes.object,
      onError: React.PropTypes.func,
      onSubmit: React.PropTypes.func,
      validation: React.PropTypes.object
   }

   constructor(props) {
      super(props)

      this.handleSubmit = this.handleSubmit.bind(this)

      // Set initialValues
      this.state = {}
      props.children.forEach((child) => {
         if (this.childIsRelevant(child)) {
            this.state[child.props.name] = {
               value: props.initialValues[child.props.name] || '',
               meta: {
                  touched: false,
                  error: ''
               }
            }
         }
      })
   }

   setError(name, message) {
      const errors = {}
      errors[name] = message
      this.setState({
         errors: {
            ...this.state.errors,
            ...errors
         }
      })
   }

   clearError(name) {
      const newState = this.state
      delete newState.errors[name]
      this.setState(newState)
   }

   checkErrors(child, value) {
      const valueActual = value || this.state[child.props.name].value

      return (
         this.props.validation[child.props.name] &&
         !this.props.validation[child.props.name].check(valueActual)
      )
         ? this.props.validation[child.props.name].message
         : ''
   }

   childIsRelevant(child) {
      const types = ['input', 'textarea']
      return types.indexOf(child.type.type) !== -1
   }

   handleBlur(event, child) {
      const newState = {}
      newState[child.props.name] = {
         ...this.state[child.props.name],
         meta: {
            error: this.checkErrors(child),
            touched: true
         }
      }

      this.setState(newState)
   }

   handleChange(event, child) {
      const value = event.target.value

      const newState = {}
      newState[child.props.name] = {
         ...this.state[child.props.name],
         value,
         meta: {
            error: this.checkErrors(child, value),
            touched: true
         }
      }

      this.setState(newState)
   }

   handleSubmit(event) {
      event.preventDefault()

      const data = {}
      Object.keys(this.state).forEach((key) => { data[key] = this.state[key].value })

      const errors = {}
      Object.keys(this.state).forEach((key) => {
         if (this.state[key].meta.error) errors[key] = this.state[key].meta.error
      })
      const errorsExist = Object.keys(errors).length > 0

      if (errorsExist) this.props.onError(errors)
      else this.props.onSubmit(data)
   }

   render() {
      const childrenNew = []
      let counter = 1
      this.props.children.forEach((child) => {
         if (this.childIsRelevant(child)) {
            const childNew = React.cloneElement(child, {
               key: counter,
               meta: this.state[child.props.name].meta || {},
               onBlur: (event) => { this.handleBlur(event, child) },
               onChange: (event) => { this.handleChange(event, child) },
               value: this.state[child.props.name].value || ''
            })
            childrenNew.push(childNew)
         } else {
            childrenNew.push(child)
         }
         counter += 1
      })

      return (
         <form
            onSubmit={this.handleSubmit}>
            {childrenNew}
         </form>
      )
   }
}

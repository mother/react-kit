import React, { Component } from 'react'
import dot from 'dot-object'

export default class Form extends Component {
   static propTypes = {
      children: React.PropTypes.node,
      onError: React.PropTypes.func,
      onSubmit: React.PropTypes.func
   }

   constructor(props) {
      super(props)

      this.handleSubmit = this.handleSubmit.bind(this)

      this.initialValuesLoaded = false

      // Setup state
      this.state = {}
      props.children.forEach((child) => {
         if (this.childIsRelevant(child)) {
            this.state[child.props.name] = {
               value: '',
               meta: {}
            }
         }
      })
   }

   componentWillReceiveProps(props) {
      let initialValues = props.initialValues

      if (initialValues && !this.initialValuesLoaded) {
         const newState = {}

         initialValues = dot.dot(initialValues)

         props.children.forEach((child) => {
            if (this.childIsRelevant(child)) {
               const value = initialValues
                  ? initialValues[child.props.name] || ''
                  : ''
               newState[child.props.name] = {
                  value,
                  meta: {
                     touched: false,
                     error: this.checkError(child, value, props)
                  }
               }
            }
         })

         this.initialValuesLoaded = true
         this.setState(newState)
      }
   }

   checkError(child, initialValue, initialProps) {
      const value = initialValue && typeof initialValue === 'string'
         ? initialValue
         : (this.state[child.props.name] && this.state[child.props.name].value) || ''
      const props = initialProps || this.props

      return (
         props.validation &&
         props.validation[child.props.name] &&
         !props.validation[child.props.name].test(value)
      )
         ? props.validation[child.props.name].message
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
            error: this.checkError(child),
            touched: true
         }
      }

      this.setState(newState)
   }

   handleChange(event, child) {
      const value = event.target.value

      const newState = {}
      newState[child.props.name] = {
         value,
         meta: {
            error: this.checkError(child, value),
            touched: true
         }
      }

      this.setState(newState)
   }

   handleSubmit(event) {
      event.preventDefault()

      const data = {}
      const errors = {}
      Object.keys(this.state).forEach((key) => {
         data[key] = this.state[key].value
         if (this.state[key].meta.error) errors[key] = this.state[key].meta.error
      })
      const errorsExist = Object.keys(errors).length > 0

      if (errorsExist) {
         // Blur all to show errors
         const newState = {}
         this.props.children.forEach((child) => {
            if (this.childIsRelevant(child)) {
               newState[child.props.name] = {
                  ...this.state[child.props.name],
                  meta: {
                     ...this.state[child.props.name].meta,
                     touched: true
                  }
               }
            }
         })
         this.setState(newState)

         if (this.props.onError) this.props.onError(dot.object(errors))
      } else if (this.props.onSubmit) this.props.onSubmit(dot.object(data))
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

import React, { Component } from 'react'
import Icon from '../../Icon'
import Text from '../../Text'
import View from '../../View'
import style from './style.less'

export default class Checkbox extends Component {
   static propTypes = {
      checked: React.PropTypes.bool,
      children: React.PropTypes.node,
      id: React.PropTypes.string,
      label: React.PropTypes.string,
      name: React.PropTypes.string,
      onChange: React.PropTypes.func,
      value: React.PropTypes.string
   }

   static defaultProps = {
      checked: false
   }

   static contextTypes = {
      OIOFormCheckbox: React.PropTypes.object,
      OIOStyles: React.PropTypes.object
   }

   constructor(props) {
      super(props)

      this.handleChange = this.handleChange.bind(this)

      this.state = {
         checked: props.checked
      }
   }

   componentWillReceiveProps(nextProps) {
      let checked = nextProps.checked

      if (this.context.OIOFormCheckbox) {
         checked = this.context.OIOFormCheckbox.getValue().includes(nextProps.value)
      }

      this.setState({ checked })
   }

   handleChange(event) {
      this.setState({ checked: event.target.checked })

      if (this.props.onChange) {
         this.props.onChange(event, event.target.checked)
      }
   }

   render() {
      const name = this.context.OIOFormCheckbox
         ? this.context.OIOFormCheckbox.name
         : this.props.name

      const primaryColor = this.context.OIOStyles.primaryColor
      let checkboxIcon = 'ion-ios-circle-outline'
      let checkboxIconStyle = {}

      if (this.state.checked) {
         checkboxIcon = 'ion-ios-checkmark'
         checkboxIconStyle = {
            color: primaryColor
         }
      }

      return (
         <View width="100%">
            <label className={style.checkboxLabel} htmlFor={this.props.id}>
               <input
                  type="checkbox"
                  id={this.props.id}
                  checked={this.state.checked}
                  name={name}
                  value={this.props.value}
                  onChange={this.handleChange}
               />
               <Icon name={checkboxIcon} className={style.icon} style={checkboxIconStyle} />
               <Text size="3" weight="normal">
                  {this.props.label}
               </Text>
               {this.props.children}
            </label>
         </View>
      )
   }
}

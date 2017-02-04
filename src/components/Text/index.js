import React, { Component } from 'react'
import classNames from 'classnames'

import Button from '../Button'
import ButtonGroup from '../ButtonGroup'
import Textarea from '../Form/Textarea'
import style from './style.less'
import colors from '../../foundation/colors.less'

export default class Text extends Component {
   static propTypes = {
      body: React.PropTypes.string,
      children: React.PropTypes.node,
      className: React.PropTypes.string,
      color: React.PropTypes.string,
      editable: React.PropTypes.bool,
      editing: React.PropTypes.bool,
      editLoading: React.PropTypes.bool,
      onEditCancel: React.PropTypes.func,
      onEditDone: React.PropTypes.func,
      showEditButton: React.PropTypes.bool,
      size: React.PropTypes.string,
      uppercase: React.PropTypes.bool,
      weight: React.PropTypes.string
   }

   static defaultProps = {
      weight: 'normal'
   }

   static contextTypes = {
      OIOStyles: React.PropTypes.object
   }

   constructor(props) {
      super(props)

      this.handleChange = this.handleChange.bind(this)
      this.handleEditCancel = this.handleEditCancel.bind(this)
      this.handleEditClick = this.handleEditClick.bind(this)
      this.handleEditDone = this.handleEditDone.bind(this)

      this.state = {
         editing: props.editing,
         inputBody: props.body
      }
   }

   componentWillReceiveProps(nextProps) {
      const newState = { editing: nextProps.editing }

      // Update inputBody if different from body and not loading
      if (nextProps.body !== this.state.inputBody && !nextProps.editLoading) {
         newState.inputBody = nextProps.body
      }

      this.setState(newState)
   }

   componentDidUpdate() {
      if (this.editor) {
         const textarea = this.editor.parentNode.getElementsByTagName('textarea')[0]
         this.adjustTextareaHeight(textarea)
      }
   }

   adjustTextareaHeight(textarea) {
      if (textarea) {
         textarea.style.height = 'auto'
         textarea.style.height = `${textarea.scrollHeight + 5}px`
      }
   }

   handleChange(event) {
      this.adjustTextareaHeight(event.target)
      let value = event.target.value
      value = value.replace(/\n/g, '')
      this.setState({ inputBody: value })
   }

   handleEditCancel() {
      if (this.props.onEditCancel) this.props.onEditCancel(this.state.inputBody)

      this.setState({ inputBody: this.props.body })
   }

   handleEditClick(event) {
      this.setState({
         inputBody: this.props.body,
         editing: true
      })
   }

   handleEditDone() {
      if (this.props.onEditDone) this.props.onEditDone(this.state.inputBody)
   }

   render() {
      const fontSize = this.props.size ? `textSize${this.props.size}` : 'textSize3'
      const textStyle = {}

      const classes = [
         style.editContainer,
         style[fontSize],
         style[this.props.weight],
         colors[this.props.color],
         this.props.className
      ]

      if (this.props.uppercase) {
         classes.push(style.uppercase)
      }

      const showEditButton = (
         !this.props.children &&
         !this.state.editing &&
         this.props.editable &&
         this.props.showEditButton
      )

      const editActionButtons = this.props.editLoading
         ? (<ButtonGroup align="right">
            <Button
               onClick={this.handleEditDone}
               name="Done"
               size="tiny"
               mode="loading"
            />
         </ButtonGroup>)
         : (<ButtonGroup align="right">
            <Button
               onClick={this.handleEditCancel}
               name="Cancel"
               size="tiny"
               color="#CCC"
            />
            <Button
               onClick={this.handleEditDone}
               name="Done"
               size="tiny"
            />
         </ButtonGroup>)

      return (
         <div className={classNames(classes)} style={textStyle}>
            {showEditButton && (
               <Button
                  onClick={this.handleEditClick}
                  className={style.editButton}
                  icon="ion-edit"
                  size="tiny"
               />
            )}
            {!this.props.children && !this.state.editing && (
               <span>{this.props.body}</span>
            )}
            {!this.props.editable && this.props.children}
            {this.state.editing && this.props.editable && (
               <div ref={(editor) => { this.editor = editor }}>
                  <Textarea
                     className={style.editTextarea}
                     onChange={this.handleChange}
                     value={this.state.inputBody}
                     placeholder="Add text..."
                  />
                  {editActionButtons}
               </div>
            )}
         </div>
      )
   }
}

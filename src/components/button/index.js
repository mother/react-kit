import React from 'react'
import classNames from 'classnames'

import UIIcon from '../Icon'

import styles from './styles.less'

const Button = ({ className, icon, name, onClick, outline, rounded, size }, context) => {
   const buttonClasses = [className]
   const buttonName = name
   const style = {}

   buttonClasses.push(styles[size])

   if (icon && name) {
      buttonClasses.push(styles[`${size}IconAndText`])
   }

   if (icon && !name) {
      buttonClasses.push(styles[`${size}IconOnly`])
   }

   if (rounded) {
      buttonClasses.push(styles[`${size}Rounded`])
   }

   if (outline) {
      buttonClasses.push(styles.outline)
   }

   // If Buttons are part of a Button Group
   if (context.buttonGroupStyle) {
      const buttonGroup = context.buttonGroupStyle
      style.float = 'left'
      if (buttonGroup.align === 'left') {
         style.marginRight = buttonGroup.spacing
      } else if (buttonGroup.align === 'right') {
         style.marginLeft = buttonGroup.spacing
      }
   }

   return (
      <span className={classNames(buttonClasses)} onClick={onClick} style={style}>
         <UIIcon className={styles.icon} name={icon} />
         <span className={styles.text}>{buttonName}</span>
      </span>
   )
}

Button.propTypes = {
   className: React.PropTypes.string,
   icon: React.PropTypes.string,
   name: React.PropTypes.string,
   onClick: React.PropTypes.func,
   outline: React.PropTypes.bool,
   rounded: React.PropTypes.bool,
   size: React.PropTypes.string
}

Button.defaultProps = {
   size: 'medium'
}

Button.contextTypes = {
   buttonGroupStyle: React.PropTypes.object
}

export default Button

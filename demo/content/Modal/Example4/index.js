import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Modal, View } from '../../../../src'

export default class DemoContentModalExample3 extends Component {
   static propTypes = {
      history: PropTypes.object
   }

   hideModal(closeURL) {
      this.props.history.push(closeURL)
   }

   render() {
      const closeURL = '/modal'
      // eslint-disable-next-line react/jsx-no-bind
      const hideModal = this.hideModal.bind(this, closeURL)

      return (
         <Modal
            width="900px[c] 1200px[d-e]"
            height="1800px"
            mode="fill[a-b] fixed[c-e]"
            windowMargin="0px[a-b] 30px[c-e]"
            onClose={hideModal}
            closeURL={closeURL}>
            <View width="100%" padding="30px" height="300px">
               Standard Modal Window
            </View>
         </Modal>
      )
   }
}

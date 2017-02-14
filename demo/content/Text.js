import React, { Component } from 'react'
import {
   Grid,
   GridCell,
   Spacer,
   Text,
   Title,
   TitleBar,
   View
} from '../../src'
import style from '../style.less'

export default class DemoContentText extends Component {
   static propTypes = {
      contents: React.PropTypes.array
   }

   constructor(props) {
      super(props)

      this.handleCancel = this.handleCancel.bind(this)
      this.handleDone = this.handleDone.bind(this)

      this.state = {
         value: 'Flexitarian biodiesel kale chips, hoodie lumbersexual food truck keffiyeh umami single-origin coffee franzen. Celiac viral put a bird on it, farm-to-table heirloom everyday carry before they sold out locavore listicle stumptown. Cold-pressed single-origin coffee seitan, next level biodiesel vinyl synth chia pop-up sartorial ugh post-ironic. Hella bitters cardigan affogato selfies thundercats gentrify, man braid schlitz normcore banjo umami messenger bag sartorial. Humblebrag freegan offal, mumblecore tote bag mustache venmo meditation lumbersexual. Put a bird on it intelligentsia lomo gluten-free bitters marfa. Meh literally try-hard ugh everyday carry.',
         editing: false,
         editLoading: false
      }
   }

   handleCancel(value) {
      this.setState({ editing: false })
   }

   handleDone(value) {
      this.setState({ editing: true, editLoading: true })
      setTimeout(() => {
         this.setState({
            value,
            editing: false,
            editLoading: false
         })
      }, 1000)
   }

   render() {
      return (
         <View width="100%" className={style.docs}>
            <TitleBar title="Text" flush />
            <Spacer size="9" />
            <Grid columns="1[a] 2[b] 4[c-e]" gutter="60px">
               <GridCell>
                  <Title>Text</Title>
                  <Text size="2" color="gray50">
                     <p>A standard block of text content.</p>
                  </Text>
               </GridCell>
               <GridCell colspan="3">
                  <Text>
                     <p>Flexitarian biodiesel kale chips, hoodie lumbersexual
                     food truck keffiyeh umami single-origin coffee franzen.
                     Celiac viral put a bird on it, farm-to-table
                     heirloom everyday carry before they sold out locavore
                     listicle stumptown.</p>
                  </Text>
               </GridCell>
            </Grid>
            <Grid columns="1[a] 2[b] 4[c-e]" gutter="60px">
               <GridCell>
                  <Title>Text (editable)</Title>
                  <Text size="2" color="gray50">
                     <p>With the <code>editable</code> prop,<code>Text</code>
                     can be modified in place.</p>
                  </Text>
               </GridCell>
               <GridCell colspan="3">
                  <Text
                     editable
                     showEditButton
                     editing={this.state.editing}
                     editLoading={this.state.editLoading}
                     onCancel={this.handleCancel}
                     onDone={this.handleDone}
                     value={this.state.value}
                  />
               </GridCell>
            </Grid>
            <Grid columns="1[a] 2[b] 4[c-e]" gutter="60px">
               <GridCell>
                  <Title>Text Configurations</Title>
                  <Text size="2" color="gray50">
                     Props for using the <code>Modal</code> component
                  </Text>
               </GridCell>
               <GridCell colspan="3">
                  <table className={style.table}>
                     <thead>
                        <tr>
                           <th width="150px">Prop</th>
                           <th width="90px">Prop Type</th>
                           <th width="120px">Default Value</th>
                           <th>Description/Options</th>
                        </tr>
                     </thead>
                     <tbody>
                        <tr>
                           <td><b>children</b></td>
                           <td>Node</td>
                           <td>-</td>
                           <td>Children if <code>editable === false</code></td>
                        </tr>
                        <tr>
                           <td><b>color</b></td>
                           <td>String</td>
                           <td>-</td>
                           <td>CSS color (e.g. #CCC)</td>
                        </tr>
                        <tr>
                           <td><b>size</b></td>
                           <td>String</td>
                           <td>-</td>
                           <td>Set content size <code>1 - 10</code></td>
                        </tr>
                        <tr>
                           <td><b>uppercase</b></td>
                           <td>Boolean</td>
                           <td>-</td>
                           <td>Make content uppercase</td>
                        </tr>
                        <tr>
                           <td><b>weight</b></td>
                           <td>String</td>
                           <td><code>normal</code></td>
                           <td>Set content font-weight</td>
                        </tr>
                        <tr>
                           <td><b>editable</b></td>
                           <td>Boolean</td>
                           <td><code>false</code></td>
                           <td>Makes Text component editable</td>
                        </tr>
                        <tr>
                           <td><b>body</b></td>
                           <td>String</td>
                           <td>-</td>
                           <td>Initial and editable body content (replaces children)</td>
                        </tr>
                        <tr>
                           <td><b>onEditCancel</b></td>
                           <td>Function</td>
                           <td>-</td>
                           <td>Returns <code>body</code> text to use.</td>
                        </tr>
                        <tr>
                           <td><b>onEditDone</b></td>
                           <td>Function</td>
                           <td>-</td>
                           <td>Returns <code>body</code> text to use.</td>
                        </tr>
                        <tr>
                           <td><b>showEditButton</b></td>
                           <td>Boolean</td>
                           <td><code>false</code></td>
                           <td>Show edit button at top right of text.</td>
                        </tr>
                     </tbody>
                  </table>
               </GridCell>
            </Grid>
         </View>
      )
   }
}

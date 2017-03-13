import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  Dimensions
} from 'react-native';
import SocketIOClient from 'socket.io-client';
var CircularProgressDisplay = require('react-native-progress-circular')
var width = Dimensions.get('window').width;
var checks = [
{ name: 'Jone', type: 'man', age: '24', date: 1489426098251 },
{ name: 'Willian', type: 'women', 'age': '22', date: 1489426100918 },
{ name: 'Katy', type: 'child', age: '9', date: 1489426102508 },
]

export default class real_time_communication extends Component {
  constructor(props) {
    super(props);
    const ds1 = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      checked:ds1.cloneWithRows(checks),
      progressM:0,
      progressW:0,
      progressC:0,
      amout:0
    };
  
  this.socket = SocketIOClient('http://192.168.1.72:8080');
  this.socket.on('checked', (message) => {
  checks.unshift(message)
  this.setState({ checked: ds1.cloneWithRows(checks)});
  this._calculate(checks)
  });

    
  }
  componentDidMount(){
    var w = 0;
    var m = 0;
    var c = 0;
    var amout = 0;

    for (var i = 0; i < checks.length; i++) {
      if(checks[i].type == 'women'){
        w = w + 1
        amout = amout + 40
      }
       if(checks[i].type == 'man'){
        m = m + 1
         amout = amout + 60
      }
       if(checks[i].type == 'child'){
        c = c + 1
         amout = amout + 20
      }
    
    }
    this.setState({
      progressM: (m * 100) / checks.length,
      progressW: (w * 100) / checks.length,
      progressC: (c * 100) / checks.length,
      amout: amout
    })
  }

  _calculate(checks){
     var w = 0;
    var m = 0;
    var c = 0;
    var amout = 0;

    for (var i = 0; i < checks.length; i++) {
      if(checks[i].type == 'women'){
        w = w + 1
        amout = amout + 40
      }
       if(checks[i].type == 'man'){
        m = m + 1
         amout = amout + 60
      }
       if(checks[i].type == 'child'){
        c = c + 1
         amout = amout + 20
      }
    
    }
    this.setState({
      progressM: (m * 100) / checks.length,
      progressW: (w * 100) / checks.length,
      progressC: (c * 100) / checks.length,
      amout: amout
    })
  }
  _renderRow(rowData, rowID, sectionID, highlightRow){
    return(
        <View style={styles.item}>
          <Text style={styles.itemText}><Text style={styles.itemName}>{rowData.name}</Text> has been registered</Text>
           <Text style={styles.date}>{(new Date(rowData.date)).toUTCString()}</Text>
        </View>
      )
    

  }
  render() {

    var progressM = this.state.progressM;
    var progressW = this.state.progressW;
    var progressC = this.state.progressC;

    console.log(this.state.progressM)
    // displayed inside of the component 
    var Mens = (
      <View style={{width: 200, height: 200, flex:1, justifyContent: 'center',
      alignItems: 'center', backgroundColor: '#036282'}}>
        <Text style={{fontSize: 15, color:'#fff'}}>Men</Text>
        <Text style={{fontSize: 15, color:'#fff'}}>{Math.round(progressM) + "%"}</Text>
      </View>
    );
     var Women = (
      <View style={{width: 200, height: 200, flex:1, justifyContent: 'center',
      alignItems: 'center', backgroundColor: '#036282'}}>
         <Text style={{fontSize: 15, color:'#fff' }}>Women</Text>
        <Text style={{fontSize: 15, color:'#fff'}}>{Math.round(progressW) + "%"}</Text>
      </View>
    );
      var Childs = (
      <View style={{width: 200, height: 200, flex:1, justifyContent: 'center',
      alignItems: 'center', backgroundColor: '#036282'}}>
        <Text style={{fontSize: 15, color:'#fff'}}>Childs</Text>
        <Text style={{fontSize: 15, color:'#fff'}}>{Math.round(progressC) + "%"}</Text>
      </View>
    );


    return (
      <View style={{flex:1, backgroundColor:'#f0f0f0'}}>

          <View style={styles.stats}>
            <View style={styles.stat}>
              <CircularProgressDisplay.Hollow size={width/3 - 15} 
              progressBarWidth={10} outlineWidth={0} outlineColor={'#0277BD'}
              backgroundColor={'#f0f0f0'} progressBarColor={'#0277BD'}
              innerComponent={Mens} rotate={((progressM/100)*360)}/>
            </View>

             <View style={styles.stat}>
              <CircularProgressDisplay.Hollow size={width/3- 15} 
              progressBarWidth={10} outlineWidth={0} outlineColor={'#7E57C2'}
              backgroundColor={'#f0f0f0'} progressBarColor={'#7E57C2'}
              innerComponent={Women}  rotate={((progressW/100)*360)}/>
            </View>
              <View style={styles.stat}>
              <CircularProgressDisplay.Hollow size={width/3-15} 
              progressBarWidth={10} outlineWidth={0} outlineColor={'#FF9100'}
              backgroundColor={'#f0f0f0'} progressBarColor={'#FF9100'}
              innerComponent={Childs} rotate={((progressC/100)*360)}/>
              </View>
            </View>


        
           <View style={styles.amout}>
             <Text style={styles.amoutText}>Amount rate:</Text>
             <Text style={styles.amoutA}>${this.state.amout}.00</Text>
           </View> 




      <ListView
            style={styles.listView}
            enableEmptySections={true}
            dataSource={this.state.checked}
            renderRow={this._renderRow.bind(this)}
            automaticallyAdjustContentInsets={false}
        />

        

      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  listView:{
    marginTop:0,
    backgroundColor:'#FFF'
  },
  item:{
    justifyContent:'center',
    padding:10,
    width:width,
    height:60,
    borderWidth:1,
    borderTopColor:'#FFF',
    borderRightColor:'#FFF',
    borderLeftColor:'#FFF',
    borderBottomColor:'#f2f2f2',
  },
  stats:{
    marginTop:30,
    flexDirection:'row',
    padding:10,
    backgroundColor:'#f0f0f0'
  },
  stat:{
    margin:5
  },
  amout:{
    height:80,
    backgroundColor:'#66BB6A',
    alignItems:'center',
    justifyContent:'center'
  },
  amoutText:{
    color:'#FFF',
    fontSize:15
  },
  amoutA:{
     color:'#FFF',
    fontSize:35
  },
  itemText:{
    color:'#333',
    fontSize:16
  },
  itemName:{
    color:'#036282',
    fontWeight:'bold'
  },
  date:{
    padding:8,
    color:'#888',
    fontSize:12
  }

});

AppRegistry.registerComponent('real_time_communication', () => real_time_communication);

/**
 * Created by abhisheksingh on 03/06/16.
 */


import React , {Component} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
  BackAndroid,
  TouchableHighlight,
  TouchableOpacity,
  Alert,
  Animated,
  Platform
} from 'react-native';
import { connect } from 'react-redux';
import MenuButton from 'MenuButton';

function getWidth() {
  const { width } = Dimensions.get('window');
  return width;
}
function getHeight() {
  const { height } = Dimensions.get('window');
  return height;
}

const width = getWidth();
const NAV_HEIGHT = (Platform.OS === 'android' ? 48 : 44);
const STATUSBAR_HEIGHT = (Platform.OS === 'android' ? 0 : 20);

export function getNavbarHeight() {
  return (Platform.OS === 'android' ? 48 : 44) + (Platform.OS === 'android' ? 0 : 20);
}

class Navbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      backOpacity: new Animated.Value(0),
      showMenu: false
    };
  }

  static propTypes = {
    navigator: React.PropTypes.object.isRequired,
    backPressed: React.PropTypes.func.isRequired,
    hasBack: React.PropTypes.bool.isRequired,
    logout: React.PropTypes.func.isRequired,
    show: React.PropTypes.bool,
    openMenu: React.PropTypes.func.isRequired
  };

  componentDidMount = () => {
    if (StatusBar && Platform.OS === 'ios') {
      StatusBar.setBarStyle('default', true);
    }
    if (BackAndroid) {
      BackAndroid.addEventListener('hardwareBackPress', () => {
        if (this.props.hasBack) {
          this.props.backPressed();
          return true;
        } else {
          return false;
        }
      });
    }
  };

  componentWillUpdate = (nextProps) => {
    if (!this.props.hasBack && nextProps && nextProps.hasBack) {
      Animated.timing(this.state.backOpacity, {
        toValue: 1,
        duration: 100
      }).start();
    }
    if (this.props.hasBack && !nextProps.hasBack) {
      console.log('should animate out');
      Animated.timing(this.state.backOpacity, {
        toValue: 0,
        duration: 200
      }).start();
    }
  };

  _backPressed = () => {
    if(this.props.backPressed()){
      Animated.timing(this.state.backOpacity, {
        toValue: 0,
        duration: 200
      }).start();
    }
  };

  _openMenu = (event) => {
    event.stopPropagation();
    setTimeout(() => this.props.openMenu(), 0);
  };

  render() {
    return (
      <View style={[styles.wrapper, {opacity: this.props.show ? 1 : 0}]}>
        <View style={styles.main}>
          <View style={styles.backgroundWrapper}>
            <Text style={styles.title}>Sales App</Text>
          </View>
          <View style={styles.buttonWrapper}>
            { Platform.OS === 'ios' ?
              <TouchableOpacity
                style={styles.menuWrapper}
                onPress={this._backPressed}
                accessible = {true}
                accessibilityLabel={'backButton'}>
                <Animated.Image
                  style={[styles.back, {opacity: this.state.backOpacity}]}
                  source={require('../../../assets/images/ic_back_arrow.png')}/>
              </TouchableOpacity> : <View /> }

            <MenuButton style={styles.menuWrapper} show={this.props.show} onPress={this._openMenu}/>

          </View>
        </View>
      </View>);
  }
}

const styles = StyleSheet.create({
  back: {
    width: 14,
    height: 20,
    marginHorizontal: 10
  },
  buttonWrapper: {
    width,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  menuWrapper: {
    height: NAV_HEIGHT,
    width: 50,
    justifyContent: 'center',
    overflow: 'visible'
  },
  menuOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: getWidth(),
    height: getHeight()
  },
  wrapper: {
    position: 'absolute',
    top: 0,
    overflow: 'visible',
    backgroundColor: '#5C92C1',
    width,
    height: getNavbarHeight(),
    alignItems:'center'
  },
  main: {
    top: STATUSBAR_HEIGHT,
    width,
    height: NAV_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center'
  },
  backgroundWrapper: {
    position: 'absolute',
    width,
    height: NAV_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  backgroundImage: {
    width: width * .4,
    justifyContent: 'space-between',
    /** to prevent a jump of the topbar on enter animation */
    marginRight: 5
  },
  title: {
    fontWeight: 'bold',
    color: "#ffffff",
    fontSize:20
  }
});

function select(state) {
  return state;
}

export default connect(select())(Navbar);
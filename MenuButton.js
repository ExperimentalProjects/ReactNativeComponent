/**
 * Created by abhisheksingh on 03/06/16.
 */

import React, {Component} from 'react';
import {
  TouchableOpacity,
  Image,
  View,
  Animated,
  StyleSheet
} from 'react-native';

export default class MenuButton extends Component {

  static propTypes = {
    onPress: React.PropTypes.func.isRequired,
    show: React.PropTypes.bool.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      opacity: new Animated.Value(0)
    }
  }

  componentWillUpdate = (nextProps) => {
    if (nextProps.show && !this.props.show) {
      Animated.timing(this.state.opacity, {toValue: 1}).start();
    } else if (!nextProps.show && this.props.show) {
      Animated.timing(this.state.opacity, {toValue: 0}).start();
    }
  };

  render() {
    return (
      <Animated.View style={{opacity: this.state.opacity}}>
        <TouchableOpacity style={this.props.style}
                          onPress={this.props.onPress}>
          <View><Text>MENU</Text></View>
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  menu: {
    alignSelf: 'flex-end',
    marginRight: 10
  }
});
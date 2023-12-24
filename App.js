import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

class CalculatorApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: '0',
      calculation: '0',
      result: '0',
    };
  }

  handleNumberPress = (number) => {
    this.setState((prevState) => ({
      display: prevState.display === '0' ? number.toString() : prevState.display + number,
      calculation: prevState.calculation === '0' ? number.toString() : prevState.calculation + number,
    }));
  };

  handleOperatorPress = (operatorReal, operatorComputer = '') => {
    if (operatorComputer) {
      this.setState((prevState) => ({
        display: prevState.display + operatorReal,
        calculation: prevState.calculation + operatorComputer
      }));
    } else {
      this.setState((prevState) => ({
        display: prevState.display + operatorReal,
        calculation: prevState.calculation + operatorReal
      }));
    }
  };

  handleClearPress = () => {
    this.setState({
      display: '0',
      calculation: '0',
    });
  };

  handleDeletePress = () => {
    if (this.state.calculation[this.state.calculation.length - 1] === '!') {
      this.setState((prevState) => ({
        display: prevState.display.slice(0, -3) ? prevState.display.slice(0, -3) : '0',
        calculation: prevState.calculation.slice(0, -1) ? prevState.calculation.slice(0, -1) : '0'
      }));
    } else {
      this.setState((prevState) => ({
        display: prevState.display.slice(0, -1) ? prevState.display.slice(0, -1) : '0',
        calculation: prevState.calculation.slice(0, -1) ? prevState.calculation.slice(0, -1) : '0'
      }));
    }
  };

  handleANSPress = () => {
    this.setState((prevState) => ({
      display: prevState.display === '0' ? "ANS" : prevState.display + "ANS",
      calculation: prevState.calculation === '0' ? "!" : prevState.calculation + "!",
    }))
  };

  handleEqualPress = () => {
    try {
      const result = eval(this.state.calculation.replace("!", this.state.result));
      this.setState({
        result: result.toString(),
      });
    } catch (error) {
      this.setState({
        result: "Error",
      });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.displayContainer, styles.result]}>
          <Text style={styles.displayText}>result:</Text>
          <Text style={styles.displayText}>{this.state.result}</Text>
        </View>
        <View style={[styles.displayContainer, styles.current]}>
          <Text style={styles.displayText}>{this.state.display}</Text>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button} onPress={() => this.handleClearPress()}>
            <Text style={styles.buttonText}>AC</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => this.handleDeletePress()}>
            <Text style={styles.buttonText}>DEL</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonEnd} onPress={() => this.handleEqualPress()}>
            <Text style={styles.buttonText}>=</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button} onPress={() => this.handleNumberPress('7')}>
            <Text style={styles.buttonText}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => this.handleNumberPress('8')}>
            <Text style={styles.buttonText}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => this.handleNumberPress('9')}>
            <Text style={styles.buttonText}>9</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => this.handleOperatorPress('/')}>
            <Text style={styles.buttonText}>/</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button} onPress={() => this.handleNumberPress('4')}>
            <Text style={styles.buttonText}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => this.handleNumberPress('5')}>
            <Text style={styles.buttonText}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => this.handleNumberPress('6')}>
            <Text style={styles.buttonText}>6</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => this.handleOperatorPress('x', '*')}>
            <Text style={styles.buttonText}>x</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button} onPress={() => this.handleNumberPress('1')}>
            <Text style={styles.buttonText}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => this.handleNumberPress('2')}>
            <Text style={styles.buttonText}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => this.handleNumberPress('3')}>
            <Text style={styles.buttonText}>3</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => this.handleOperatorPress('-')}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button} onPress={() => this.handleNumberPress('0')}>
            <Text style={styles.buttonText}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => this.handleOperatorPress('.')}>
            <Text style={styles.buttonText}>.</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => this.handleANSPress()}>
            <Text style={styles.buttonText}>ANS</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => this.handleOperatorPress('+')}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
        {/* <StatusBar style="auto" /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  displayContainer: {
    // flex: 1,
    displayDirection: 'column',
    alignItems: 'flex-start',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    width: '100%',
  },
  result: {
    flex: 2,
    justifyContent: 'flex-start',
    // padding: 0,
    paddingLeft: 10
  },
  current: {
    flex: 3,
    justifyContent: 'flex-end',
    marginBottom: 10,
    padding:10,
  },
  displayText: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    width: '100%',
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 20,
    borderRadius: 5,
    width: '20%',
    alignItems: 'center',
  },
  buttonEnd: {
    backgroundColor: '#2196F3',
    padding: 20,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default CalculatorApp;

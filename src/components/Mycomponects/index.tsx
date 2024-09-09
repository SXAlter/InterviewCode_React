import React, { Component } from 'react';

interface MyComponentProps {
  initialValue: number;
}

interface MyComponentState {
  count: number;
}

class MyComponent extends Component<MyComponentProps, MyComponentState> {
  private intervalId?: number;

  constructor(props: MyComponentProps) {
    super(props);
    this.state = {
      count: props.initialValue,
    };
  }

  componentDidMount() {
    this.intervalId = window.setInterval(() => {
      this.setState((prevState) => ({
        count: prevState.count + 1,
      }));
    }, 1000);
  }

  componentDidUpdate(prevProps: MyComponentProps) {
    if (prevProps.initialValue !== this.props.initialValue) {
      this.setState({
        count: this.props.initialValue,
      });
    }
  }

  componentWillUnmount() {
    if (this.intervalId) {
      window.clearInterval(this.intervalId);
    }
  }

  handleClick = () => {
    alert(`Current count is ${this.state.count}`);
  };

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.handleClick}>Show Count</button>
      </div>
    );
  }
}

export default MyComponent;
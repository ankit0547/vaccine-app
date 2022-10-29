import React from "react";

// const CatAvatar = React.lazy(() => import('./path/to/cat/avatar'));

class ErrorHandler extends React.Component {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError(err) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <p>Loading has failed. Try refreshing the browser!</p>;
    }

    return this.props.children;
  }
}

export default ErrorHandler;

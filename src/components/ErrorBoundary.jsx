import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.error('Product loading failed:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="state-card error-card" role="alert">
          <span className="state-icon">!</span>
          <h2>We couldn't load the collection</h2>
          <p>Please refresh the page and try again.</p>
          <button className="button button-dark" onClick={() => window.location.reload()}>
            Reload store
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

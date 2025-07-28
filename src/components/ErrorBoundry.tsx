import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="h-screen flex flex-col items-center justify-center text-center p-4"> 
          <h1 className="">Something went wrong.</h1>
          <p>
            The page you are looking for does not exist or an error occurred.
          </p>
          <p>
            <a href="/">Return to the Home Page</a>
          </p>
        </div>
      )
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

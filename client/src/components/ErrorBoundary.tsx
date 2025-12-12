import { Component, ErrorInfo, ReactNode } from "react";

import { MessageBar, MessageBarType } from "@fluentui/react/lib/MessageBar";
import { DefaultButton } from "@fluentui/react/lib/Button";
import { Stack } from "@fluentui/react/lib/Stack";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log to error reporting service (e.g., Sentry, LogRocket)
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReset = (): void => {
    this.setState({ hasError: false, error: null });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Stack
          tokens={{ padding: 20, childrenGap: 12 }}
          style={{ maxWidth: 600, margin: "40px auto" }}
        >
          <MessageBar messageBarType={MessageBarType.error}>
            Something went wrong. Please try again.
          </MessageBar>
          {process.env.NODE_ENV === "development" && this.state.error && (
            <MessageBar messageBarType={MessageBarType.warning}>
              <code style={{ fontSize: 12 }}>{this.state.error.message}</code>
            </MessageBar>
          )}
          <Stack horizontal tokens={{ childrenGap: 8 }}>
            <DefaultButton onClick={this.handleReset}>Try Again</DefaultButton>
            <DefaultButton onClick={() => window.location.reload()}>
              Reload Page
            </DefaultButton>
          </Stack>
        </Stack>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

import { Component, ReactElement, Fragment } from "react";

export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  /**
   * @constructor state
   */
  private constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      error: false,
      message: "",
    };
  }
  /**
   * @public hooks
   */
  public componentDidCatch() {
    this.setState({
      error: true,
      message: "当前内容渲染错误",
    });
  }

  public render() {
    const { error, message } = this.state;
    const { children } = this.props;
    return <Fragment>{error ? <p>{message}</p> : children}</Fragment>;
  }
}

/**
 * @interface props
 */
export interface ErrorBoundaryProps {
  children?: Component | ReactElement | string;
}

/**
 * @interface state
 */
export interface ErrorBoundaryState {
  error: boolean;
  message: string;
}

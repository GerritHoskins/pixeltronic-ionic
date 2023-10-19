import type { PluginListenerHandle } from '@capacitor/core';

export interface InAppBrowserInterface {
  /**
   * Open a URL inside the webview or show a hidden webview
   * Should only be called after createWebView has finished successfully
   * optional headers can be set here as well for example User-Agent
   */
  openWebView(options: OpenOptions): Promise<void>;
  /**
   * Close and destroy an open webview.
   */
  closeWebView(): Promise<void>;
  /**
   * Hides the current webview.
   */
  hideWebView(): Promise<void>;
  /**
   * Shows the current webview.
   */
  showWebView(): Promise<void>;
  /**
   * Handle back navigation inside the webview
   */
  navigateBack(): Promise<void>;
  /**
   * Handle forward navigation inside the webview
   */
  navigateForward(): Promise<void>;
  /**
   * Load a specified URL in an existing webview.
   */
  loadUrl(options: { url: string }): Promise<void>;
  /**
   * Refresh the current page in the webview.
   */
  reload(): Promise<void>;
  /**
   * Event callback when the webview URL changes.
   * Response parameters:
   * newWindowRequest: boolean;
   * isSameHost: boolean;
   * complete: boolean;
   * This can be used to decide what to do when a URL is requested in a new window
   * from the same or different host origin. The callback event.complete(true/false)
   * can be used to cancel or continue the load process and to handle the window
   * request as desired.
   */
  onNavigation(listenerFunc: ListenerFunc<NavigationEvent>): Promise<void>;
  /**
   * Event triggered by the webview when the target URL has finished loading
   */
  onPageLoaded(listenerFunc: ListenerFunc<PageLoadStatus>): Promise<void>;
  /**
   * Event triggered by the webview when URL loading has failed
   * Returns the HTTP request error code.
   */
  onPageLoadError(listenerFunc: ListenerFunc<ErrorCode>): Promise<void>;
  /**
   * Event triggered by the webview when the webview is resized
   */
  onUpdateDimensions(listenerFunc: ListenerFunc<void>): Promise<void>;
  /**
   *  Create a screenshot of the current view
   *  and set it as a background of the web view container element.
   *  This is needed if there are HTML/Javascript UI elements to be overlaid.
   */
  captureScreen(showScreenCapture: boolean): Promise<void>;
  /**
   * Update the dimensions of the webview
   */
  updateDimensions(options?: Dimensions): Promise<void>;
}

export interface NativeInterface {
  openWebView(options: OpenOptions): Promise<void>;
  closeWebView(): Promise<void>;
  showWebView(): Promise<void>;
  hideWebView(): Promise<void>;
  openSystemBrowser(options: { url: string }): Promise<void>;
  openBrowser(options: OpenOptions): Promise<void>;
  navigateBack(): Promise<void>;
  navigateForward(): Promise<void>;
  refresh(): Promise<void>;
  loadUrl(options?: { url: string }): Promise<void>;
  onNavigation(options?: { allow: boolean }): Promise<void>;
  updateDimensions(options?: Dimensions): Promise<void>;
  captureScreen(options?: Dimensions): Promise<ScreenShot>;
  addListener(
    eventName: EventListeners,
    listenerFunc: (...args: any[]) => void,
  ): Promise<PluginListenerHandle>;
}
export interface OpenOptions extends Dimensions {
  /**
   * The URL to open the webview to
   */
  url: string;
  /**
   * element id of DOM node to which the webview should be attached
   * web view only
   */
  element?: HTMLElement;
  /**
   * Request headers
   */
  headers?: Headers;
  /**
   * Set the color scheme for safari system browser and custom tabs
   */
  colorScheme?: ColorScheme;
}
export interface ColorScheme {
  /**
   * Set the toolbar color
   * Android & iOS
   */
  toolBarColor?: string;
  /**
   * Set the navigation bar color
   * Android only
   */
  navigationBarColor?: string;
  /**
   * Set the navigation bar divider color
   * Android only
   */
  navigationBarDividerColor?: string;
  /**
   * Set the secondar toolbar color
   * Android only
   */
  secondaryToolbarColor?: string;
}
export interface Dimensions {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  ratio?: number;
}
export interface Headers {
  [key: string]: string;
}
export interface ListenerFunc<T> {
  (event: T): void;
}
export type NavigationEvent = {
  /**
   *  current url being loaded
   */
  url: string;
  /**
   *  current url target (new window, i.e. _blank / _self, etc)
   */
  newWindowRequest: boolean;
  /**
   *  current url is from same host
   */
  isSameHost: boolean;
  /**
   *  complete current url loading
   */
  complete: (allow: boolean) => void;
};
export type EventListeners =
  | 'pageLoaded'
  | 'updateDimensions'
  | 'updateScreenCapture'
  | 'navigationHandler'
  | 'pageLoadError';
export type ErrorCode = { errorCode: number };
export type PageLoadStatus = { isLoading: boolean };
export type ScreenShot = { src: string };

import type { PluginListenerHandle } from '@capacitor/core';
import { Capacitor, registerPlugin } from '@capacitor/core';
import ResizeObserver from 'resize-observer-polyfill';

import type {
  NativeInterface,
  InAppBrowserInterface,
  Dimensions,
  OpenOptions,
  NavigationEvent,
  ErrorCode,
  ScreenShot,
  EventListeners,
  PageLoadStatus,
} from './definitions';
const InAppBrowserPlugin = registerPlugin<NativeInterface>('InAppBrowserPlugin');

export class InAppBrowserClass implements InAppBrowserInterface {
  element?: HTMLElement;
  dimensions?: Dimensions;
  url?: string;
  updateDimensionsEvent?: PluginListenerHandle;
  pageLoadedEvent?: PluginListenerHandle;
  navigationHandlerEvent?: PluginListenerHandle;
  pageLoadErrorEvent?: PluginListenerHandle;
  resizeObserver?: ResizeObserver;

  async openWebView(options: OpenOptions): Promise<void> {
    if (!(await this.platformCheck())) return;
    this.element = options.element;

    if (!this.element) {
      return Promise.reject('pixeltronic-webview: could not bind webview to DOM element. Element is either missing or wrong.');
    }

    this.setStyleProperties(this.element.style);
    const dimensions = this.getDimensions(this.element);

    this.resizeObserver = new ResizeObserver(() => {
      InAppBrowserPlugin.updateDimensions(this.getDimensions(options.element));
    });
    this.resizeObserver.observe(this.element);

    await InAppBrowserPlugin.openWebView({
      url: options.url,
      headers: options.headers,
      ...dimensions
    });
    this.url = options.url;
  };

  async closeWebView(): Promise<void> {
    if (await this.platformCheck()) {
      this.clearResources();
      return InAppBrowserPlugin.closeWebView();
    }
  };

  showWebView = async (): Promise<void> => {
    return (await this.platformCheck()) && InAppBrowserPlugin.showWebView();
  };

  hideWebView = async (): Promise<void> => {
    return (await this.platformCheck()) && InAppBrowserPlugin.hideWebView();
  };

  loadUrl = async (options: { url: string }): Promise<void> => {
    if (await this.platformCheck()) this.url = options.url;
    await InAppBrowserPlugin.loadUrl(options);
  };

  reload = async (): Promise<void> => {
    return (await this.platformCheck()) && InAppBrowserPlugin.refresh();
  };

  async updateDimensions(dimensions: Dimensions): Promise<void> {
    return (
      (await this.platformCheck()) &&
      (await InAppBrowserPlugin.updateDimensions({
        ...dimensions,
        ratio: window.devicePixelRatio,
      }))
    );
  }

  navigateBack = async (): Promise<void> => {
    return (await this.platformCheck()) && InAppBrowserPlugin.navigateBack();
  };

  navigateForward = async (): Promise<void> => {
    return (await this.platformCheck()) && InAppBrowserPlugin.navigateForward();
  };

  onNavigation = async (
    listenerFunc: (event: NavigationEvent) => void,
  ): Promise<void> => {
    await this.addListener('navigationHandler', (event: any) => {
      listenerFunc({
        ...event,
        complete: (allow: boolean) =>
          InAppBrowserPlugin.onNavigation({ allow }),
      });
    });
    return Promise.resolve();
  };

  onPageLoadError = async (
    listenerFunc: (errorResponse: ErrorCode) => void,
  ): Promise<void> => this.addListener('pageLoadError', listenerFunc);

  onPageLoaded = async (
    listenerFunc: (status: PageLoadStatus) => void,
  ): Promise<void> => this.addListener('pageLoaded', listenerFunc);

  onUpdateDimensions = async (listenerFunc: () => void): Promise<void> =>
    this.addListener('updateDimensions', listenerFunc);

  captureScreen = async (showScreenCapture: boolean): Promise<void> => {
    if (!(await this.platformCheck())) return;

    const { width, height, x, y } =
      this.element.getBoundingClientRect() as DOMRect;
    this.dimensions = {
      width: Math.round(width),
      height: Math.round(height),
      x: Math.round(x),
      y: Math.round(y),
      ratio: window.devicePixelRatio,
    };

    const result: ScreenShot = await InAppBrowserPlugin.captureScreen(
      this.dimensions,
    );
    if (result?.src) {
      const webviewEl = this.element;
      if (webviewEl) {
        const buffer = await (
          await fetch('data:image/jpeg;base64,' + result.src)
        ).arrayBuffer();
        const blob = new Blob([buffer], { type: 'image/jpeg' });
        const blobUrl = URL.createObjectURL(blob);
        const img = new Image();

        img.onload = async () => {
          if (webviewEl.style) {
            webviewEl.style.backgroundSize = showScreenCapture
              ? 'contain'
              : 'unset';
            webviewEl.style.backgroundRepeat = showScreenCapture
              ? 'no-repeat'
              : 'unset';
            webviewEl.style.backgroundPosition = showScreenCapture
              ? 'center center'
              : 'unset';
            webviewEl.style.backgroundImage = showScreenCapture
              ? `url(${blobUrl})`
              : 'none';
            return await InAppBrowserPlugin[
              showScreenCapture ? 'hideWebView' : 'showWebView'
            ]();
          }
        };
        img.src = blobUrl;
      }
    }
  };

  private addListener = async (
    listenerEventType: string,
    listenerFunc: (...args: any[]) => void,
  ): Promise<void> => {
    if (!(await this.platformCheck())) return Promise.resolve();
    await InAppBrowserPlugin.addListener(
      listenerEventType as EventListeners,
      listenerFunc,
    );
    return Promise.resolve();
  };

  private setStyleProperties(style: CSSStyleDeclaration) {
    style.backgroundSize = 'cover';
    style.backgroundRepeat = 'no-repeat';
    style.backgroundPosition = 'center';
  }

  private getDimensions(element: HTMLElement): Dimensions {
    const { width, height, x, y } = element.getBoundingClientRect() as DOMRect;
    return {
      width: Math.round(width),
      height: Math.round(height),
      x: Math.round(x),
      y: Math.round(y),
      ratio: window.devicePixelRatio
    };
  }

  private async platformCheck(): Promise<boolean> {
    try {
      return Capacitor.isNativePlatform();
    } catch (err) {
      console.error('An error occurred while trying to check the platform.', err);
      return false;
    }
  };

  private async clearResources() {
    this.element = undefined;
    this.resizeObserver?.disconnect();
    this.url = undefined;

    await this.updateDimensionsEvent?.remove();
    await this.pageLoadedEvent?.remove();
    await this.navigationHandlerEvent?.remove();
    await this.pageLoadErrorEvent?.remove();
  }
}

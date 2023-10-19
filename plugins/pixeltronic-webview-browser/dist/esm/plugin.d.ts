import type { PluginListenerHandle } from '@capacitor/core';
import ResizeObserver from 'resize-observer-polyfill';
import type { InAppBrowserInterface, Dimensions, OpenOptions, NavigationEvent, ErrorCode, PageLoadStatus } from './definitions';
export declare class InAppBrowserClass implements InAppBrowserInterface {
    element?: HTMLElement;
    dimensions?: Dimensions;
    url?: string;
    updateDimensionsEvent?: PluginListenerHandle;
    pageLoadedEvent?: PluginListenerHandle;
    navigationHandlerEvent?: PluginListenerHandle;
    pageLoadErrorEvent?: PluginListenerHandle;
    resizeObserver?: ResizeObserver;
    openWebView(options: OpenOptions): Promise<void>;
    closeWebView(): Promise<void>;
    showWebView: () => Promise<void>;
    hideWebView: () => Promise<void>;
    loadUrl: (options: {
        url: string;
    }) => Promise<void>;
    reload: () => Promise<void>;
    updateDimensions(dimensions: Dimensions): Promise<void>;
    navigateBack: () => Promise<void>;
    navigateForward: () => Promise<void>;
    onNavigation: (listenerFunc: (event: NavigationEvent) => void) => Promise<void>;
    onPageLoadError: (listenerFunc: (errorResponse: ErrorCode) => void) => Promise<void>;
    onPageLoaded: (listenerFunc: (status: PageLoadStatus) => void) => Promise<void>;
    onUpdateDimensions: (listenerFunc: () => void) => Promise<void>;
    captureScreen: (showScreenCapture: boolean) => Promise<void>;
    private addListener;
    private setStyleProperties;
    private getDimensions;
    private platformCheck;
    private clearResources;
}

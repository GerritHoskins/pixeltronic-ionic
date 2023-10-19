import { Capacitor, registerPlugin } from '@capacitor/core';
import ResizeObserver from 'resize-observer-polyfill';
const InAppBrowserPlugin = registerPlugin('InAppBrowserPlugin');
export class InAppBrowserClass {
    constructor() {
        this.showWebView = async () => {
            return (await this.platformCheck()) && InAppBrowserPlugin.showWebView();
        };
        this.hideWebView = async () => {
            return (await this.platformCheck()) && InAppBrowserPlugin.hideWebView();
        };
        this.loadUrl = async (options) => {
            if (await this.platformCheck())
                this.url = options.url;
            await InAppBrowserPlugin.loadUrl(options);
        };
        this.reload = async () => {
            return (await this.platformCheck()) && InAppBrowserPlugin.refresh();
        };
        this.navigateBack = async () => {
            return (await this.platformCheck()) && InAppBrowserPlugin.navigateBack();
        };
        this.navigateForward = async () => {
            return (await this.platformCheck()) && InAppBrowserPlugin.navigateForward();
        };
        this.onNavigation = async (listenerFunc) => {
            await this.addListener('navigationHandler', (event) => {
                listenerFunc(Object.assign(Object.assign({}, event), { complete: (allow) => InAppBrowserPlugin.onNavigation({ allow }) }));
            });
            return Promise.resolve();
        };
        this.onPageLoadError = async (listenerFunc) => this.addListener('pageLoadError', listenerFunc);
        this.onPageLoaded = async (listenerFunc) => this.addListener('pageLoaded', listenerFunc);
        this.onUpdateDimensions = async (listenerFunc) => this.addListener('updateDimensions', listenerFunc);
        this.captureScreen = async (showScreenCapture) => {
            if (!(await this.platformCheck()))
                return;
            const { width, height, x, y } = this.element.getBoundingClientRect();
            this.dimensions = {
                width: Math.round(width),
                height: Math.round(height),
                x: Math.round(x),
                y: Math.round(y),
                ratio: window.devicePixelRatio,
            };
            const result = await InAppBrowserPlugin.captureScreen(this.dimensions);
            if (result === null || result === void 0 ? void 0 : result.src) {
                const webviewEl = this.element;
                if (webviewEl) {
                    const buffer = await (await fetch('data:image/jpeg;base64,' + result.src)).arrayBuffer();
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
                            return await InAppBrowserPlugin[showScreenCapture ? 'hideWebView' : 'showWebView']();
                        }
                    };
                    img.src = blobUrl;
                }
            }
        };
        this.addListener = async (listenerEventType, listenerFunc) => {
            if (!(await this.platformCheck()))
                return Promise.resolve();
            await InAppBrowserPlugin.addListener(listenerEventType, listenerFunc);
            return Promise.resolve();
        };
    }
    async openWebView(options) {
        if (!(await this.platformCheck()))
            return;
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
        await InAppBrowserPlugin.openWebView(Object.assign({ url: options.url, headers: options.headers }, dimensions));
        this.url = options.url;
    }
    ;
    async closeWebView() {
        if (await this.platformCheck()) {
            this.clearResources();
            return InAppBrowserPlugin.closeWebView();
        }
    }
    ;
    async updateDimensions(dimensions) {
        return ((await this.platformCheck()) &&
            (await InAppBrowserPlugin.updateDimensions(Object.assign(Object.assign({}, dimensions), { ratio: window.devicePixelRatio }))));
    }
    setStyleProperties(style) {
        style.backgroundSize = 'cover';
        style.backgroundRepeat = 'no-repeat';
        style.backgroundPosition = 'center';
    }
    getDimensions(element) {
        const { width, height, x, y } = element.getBoundingClientRect();
        return {
            width: Math.round(width),
            height: Math.round(height),
            x: Math.round(x),
            y: Math.round(y),
            ratio: window.devicePixelRatio
        };
    }
    async platformCheck() {
        try {
            return Capacitor.isNativePlatform();
        }
        catch (err) {
            console.error('An error occurred while trying to check the platform.', err);
            return false;
        }
    }
    ;
    async clearResources() {
        var _a, _b, _c, _d, _e;
        this.element = undefined;
        (_a = this.resizeObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
        this.url = undefined;
        await ((_b = this.updateDimensionsEvent) === null || _b === void 0 ? void 0 : _b.remove());
        await ((_c = this.pageLoadedEvent) === null || _c === void 0 ? void 0 : _c.remove());
        await ((_d = this.navigationHandlerEvent) === null || _d === void 0 ? void 0 : _d.remove());
        await ((_e = this.pageLoadErrorEvent) === null || _e === void 0 ? void 0 : _e.remove());
    }
}
//# sourceMappingURL=plugin.js.map
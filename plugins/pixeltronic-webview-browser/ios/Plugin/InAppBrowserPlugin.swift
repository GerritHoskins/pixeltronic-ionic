import Foundation
import Capacitor

typealias JSObject = [String: Any]
typealias JSArray = [JSObject]
private extension BrowserEvent {
    var listenerEvent: String {
        switch self {
        case .loaded:
            return "browserPageLoaded"
        case .finished:
            return "browserFinished"
        }
    }
}

private struct Constants {
    static let LOG_TAG = "pixeltronic-webview "
    static let NO_WEBVIEW_ERROR = "No valid InAppBrowser instance found"
    static let INVALID_MISSING_URL_ERROR = "must provide a valid URL to open"
}

@objc(InAppBrowserPlugin)
public class InAppBrowserPlugin: CAPPlugin {
    var headers: [String: String]?
    var width: CGFloat!
    var height: CGFloat!
    var x: CGFloat!
    var y: CGFloat!
    var hidden: Bool = false
    var inAppBrowser: InAppBrowser?
    var savedCall: CAPPluginCall?
    var observers: [NSObjectProtocol] = []

    @objc func openWebView(_ call: CAPPluginCall) {
        guard let urlString = call.getString("url"), let url = URL(string: urlString) else {
            call.reject(Constants.logTag, Constants.invalidURL)
            return
        }

        setupInAppBrowser(with: call)
        DispatchQueue.main.async {
            self.savedCall = call
            guard let inAppBrowser = self.inAppBrowser, let bridgeViewController = self.bridge?.viewController else {
                call.reject(Constants.logTag, Constants.noWebviewError)
                return
            }
            inAppBrowser.view.frame = CGRect(x: self.x, y: self.y, width: self.width, height: self.height)
            inAppBrowser.modalPresentationStyle = .fullScreen
            bridgeViewController.addChild(inAppBrowser)
            bridgeViewController.view.addSubview(inAppBrowser.view)
            inAppBrowser.didMove(toParent: bridgeViewController)
            inAppBrowser.loadUrl(url)
        }
    }

    private func setupInAppBrowser(with call: CAPPluginCall) {
        let webConfiguration = WKWebViewConfiguration()
        self.headers = call.getObject("headers", [:]).mapValues { String(describing: $0) }
        self.width = CGFloat(call.getFloat("width") ?? 1)
        self.height = CGFloat(call.getFloat("height") ?? 1)
        self.x = CGFloat(call.getFloat("x") ?? 0)
        self.y = CGFloat(call.getFloat("y") ?? 0)
        self.inAppBrowser = InAppBrowser(self, configuration: webConfiguration)
    }

    @objc func closeWebView(_ call: CAPPluginCall) {
        DispatchQueue.main.async {
            if self.inAppBrowser != nil {
                self.inAppBrowser?.view.removeFromSuperview()
                self.inAppBrowser?.removeFromParent()
                self.inAppBrowser = nil
                self.hidden = false
            }
            call.resolve()
        }
    }

    @objc func showWebView(_ call: CAPPluginCall) {
        DispatchQueue.main.async {
            self.hidden = false
            if self.inAppBrowser != nil {
                self.inAppBrowser?.view.isHidden = false
            }
            call.resolve()
        }
    }

    @objc func hideWebView(_ call: CAPPluginCall) {
        DispatchQueue.main.async {
            self.hidden = true
            if self.inAppBrowser != nil {
                self.inAppBrowser?.view.isHidden = true
            }
            call.resolve()
        }
    }

    @objc func navigateBack(_ call: CAPPluginCall) {
        DispatchQueue.main.async {
            if self.inAppBrowser != nil {
                self.inAppBrowser?.webview?.goBack()
                call.resolve()
            }
        }
    }

    @objc func navigateForward(_ call: CAPPluginCall) {
        DispatchQueue.main.async {
            if self.inAppBrowser != nil {
                self.inAppBrowser?.webview?.goForward()
                call.resolve()
            }
        }
    }

    @objc func refresh(_ call: CAPPluginCall) {
        DispatchQueue.main.async {
            if self.inAppBrowser != nil {
                self.inAppBrowser?.webview?.reload()
                call.resolve()
            }
        }
    }

    @objc func loadUrl(_ call: CAPPluginCall) {
        DispatchQueue.main.async {
            if self.inAppBrowser != nil {
                let url = call.getString("url") ?? ""
                self.savedCall = call
                self.inAppBrowser?.loadUrl(URL(string: url)!)
            }
        }
    }

    @objc func onNavigation(_ call: CAPPluginCall) {
        if self.inAppBrowser != nil && self.inAppBrowser?.currentDecisionHandler != nil {
            if call.getBool("allow") ?? true {
                self.inAppBrowser?.currentDecisionHandler!(.allow)
            } else {
                self.inAppBrowser?.currentDecisionHandler!(.cancel)
                self.inAppBrowser?.sendLoadingEvent(false)

            }
            self.inAppBrowser?.currentDecisionHandler = nil
            call.resolve()
        }
    }

    @objc func updateDimensions(_ call: CAPPluginCall) {
        if let inAppBrowser = self.inAppBrowser {
            DispatchQueue.main.async {
                self.width = CGFloat(call.getFloat("width") ?? 0)
                self.height = CGFloat(call.getFloat("height") ?? 0)
                self.x = CGFloat(call.getFloat("x") ?? 0)
                self.y = CGFloat(call.getFloat("y") ?? 0)

                let rect = CGRect(x: self.x, y: self.y, width: self.width, height: self.height)
                inAppBrowser.view.frame = rect
                if self.hidden {
                    // self.notifyListeners("captureScreen", data: [:])
                }
                call.resolve()
            }
        }
    }

    @objc func captureScreen(_ call: CAPPluginCall) {
        guard let inAppBrowser = self.inAppBrowser,
              let webview = inAppBrowser.webview else {
            call.resolve(["src": ""])
            return
        }

        DispatchQueue.main.async {
            let offset: CGPoint = webview.scrollView.contentOffset
            webview.scrollView.setContentOffset(offset, animated: false)

            webview.takeSnapshot(with: nil) {image, _ in
                if let image = image {
                    guard let jpeg = image.jpegData(compressionQuality: 1) else {
                        return
                    }
                    let base64String = jpeg.base64EncodedString()
                    call.resolve(["src": base64String])
                } else {
                    call.resolve(["src": ""])
                }
            }
        }
    }

    @objc func hasEventListeners(eventName: String) -> Bool {
        hasListeners(eventName)
    }

    @objc func notifyEventListeners(eventName: String, eventValue: JSObject) {
        notifyListeners(eventName, data: eventValue, retainUntilConsumed: eventName == "pageLoaded" ? true : false)
    }
}

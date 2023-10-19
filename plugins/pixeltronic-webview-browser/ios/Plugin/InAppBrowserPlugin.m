#import <Foundation/Foundation.h>
#import <Capacitor/Capacitor.h>

// Define the plugin using the CAP_PLUGIN Macro, and
// each method the plugin supports using the CAP_PLUGIN_METHOD macro.
CAP_PLUGIN(InAppBrowserPlugin, "InAppBrowserPlugin",
           CAP_PLUGIN_METHOD(openWebView, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(closeWebView, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(showWebView, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(hideWebView, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(navigateBack, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(navigateForward, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(refresh, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(loadUrl, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(onNavigation, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(updateDimensions, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(captureScreen, CAPPluginReturnPromise);
)

## API

<docgen-index>

* [`openWebView(...)`](#openwebview)
* [`closeWebView()`](#closewebview)
* [`hideWebView()`](#hidewebview)
* [`showWebView()`](#showwebview)
* [`navigateBack()`](#navigateback)
* [`navigateForward()`](#navigateforward)
* [`loadUrl(...)`](#loadurl)
* [`reload()`](#reload)
* [`onNavigation(...)`](#onnavigation)
* [`onPageLoaded(...)`](#onpageloaded)
* [`onPageLoadError(...)`](#onpageloaderror)
* [`onUpdateDimensions(...)`](#onupdatedimensions)
* [`captureScreen(...)`](#capturescreen)
* [`updateDimensions(...)`](#updatedimensions)
* [Interfaces](#interfaces)
* [Type Aliases](#type-aliases)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### openWebView(...)

```typescript
openWebView(options: OpenOptions) => Promise<void>
```

Open a URL inside the webview or show a hidden webview
Should only be called after createWebView has finished successfully
optional headers can be set here as well for example User-Agent

| Param         | Type                                                |
| ------------- | --------------------------------------------------- |
| **`options`** | <code><a href="#openoptions">OpenOptions</a></code> |

--------------------


### closeWebView()

```typescript
closeWebView() => Promise<void>
```

Close and destroy an open webview.

--------------------


### hideWebView()

```typescript
hideWebView() => Promise<void>
```

Hides the current webview.

--------------------


### showWebView()

```typescript
showWebView() => Promise<void>
```

Shows the current webview.

--------------------


### navigateBack()

```typescript
navigateBack() => Promise<void>
```

Handle back navigation inside the webview

--------------------


### navigateForward()

```typescript
navigateForward() => Promise<void>
```

Handle forward navigation inside the webview

--------------------


### loadUrl(...)

```typescript
loadUrl(options: { url: string; }) => Promise<void>
```

Load a specified URL in an existing webview.

| Param         | Type                          |
| ------------- | ----------------------------- |
| **`options`** | <code>{ url: string; }</code> |

--------------------


### reload()

```typescript
reload() => Promise<void>
```

Refresh the current page in the webview.

--------------------


### onNavigation(...)

```typescript
onNavigation(listenerFunc: ListenerFunc<NavigationEvent>) => Promise<void>
```

Event callback when the webview URL changes.
Response parameters:
newWindowRequest: boolean;
isSameHost: boolean;
complete: boolean;
This can be used to decide what to do when a URL is requested in a new window
from the same or different host origin. The callback event.complete(true/false)
can be used to cancel or continue the load process and to handle the window
request as desired.

| Param              | Type                                                                                                        |
| ------------------ | ----------------------------------------------------------------------------------------------------------- |
| **`listenerFunc`** | <code><a href="#listenerfunc">ListenerFunc</a>&lt;<a href="#navigationevent">NavigationEvent</a>&gt;</code> |

--------------------


### onPageLoaded(...)

```typescript
onPageLoaded(listenerFunc: ListenerFunc<PageLoadStatus>) => Promise<void>
```

Event triggered by the webview when the target URL has finished loading

| Param              | Type                                                                                                      |
| ------------------ | --------------------------------------------------------------------------------------------------------- |
| **`listenerFunc`** | <code><a href="#listenerfunc">ListenerFunc</a>&lt;<a href="#pageloadstatus">PageLoadStatus</a>&gt;</code> |

--------------------


### onPageLoadError(...)

```typescript
onPageLoadError(listenerFunc: ListenerFunc<ErrorCode>) => Promise<void>
```

Event triggered by the webview when URL loading has failed
Returns the HTTP request error code.

| Param              | Type                                                                                            |
| ------------------ | ----------------------------------------------------------------------------------------------- |
| **`listenerFunc`** | <code><a href="#listenerfunc">ListenerFunc</a>&lt;<a href="#errorcode">ErrorCode</a>&gt;</code> |

--------------------


### onUpdateDimensions(...)

```typescript
onUpdateDimensions(listenerFunc: ListenerFunc<void>) => Promise<void>
```

Event triggered by the webview when the webview is resized

| Param              | Type                                                              |
| ------------------ | ----------------------------------------------------------------- |
| **`listenerFunc`** | <code><a href="#listenerfunc">ListenerFunc</a>&lt;void&gt;</code> |

--------------------


### captureScreen(...)

```typescript
captureScreen(showScreenCapture: boolean) => Promise<void>
```

Create a screenshot of the current view
and set it as a background of the web view container element.
This is needed if there are HTML/Javascript UI elements to be overlaid.

| Param                   | Type                 |
| ----------------------- | -------------------- |
| **`showScreenCapture`** | <code>boolean</code> |

--------------------


### updateDimensions(...)

```typescript
updateDimensions(options?: Dimensions) => Promise<void>
```

Update the dimensions of the webview

| Param         | Type                                              |
| ------------- | ------------------------------------------------- |
| **`options`** | <code><a href="#dimensions">Dimensions</a></code> |

--------------------


### Interfaces


#### OpenOptions

| Prop              | Type                                                | Description                                                                  |
| ----------------- | --------------------------------------------------- | ---------------------------------------------------------------------------- |
| **`url`**         | <code>string</code>                                 | The URL to open the webview to                                               |
| **`element`**     | <code>HTMLElement</code>                            | element id of DOM node to which the webview should be attached web view only |
| **`headers`**     | <code><a href="#headers">Headers</a></code>         | Request headers                                                              |
| **`colorScheme`** | <code><a href="#colorscheme">ColorScheme</a></code> | Set the color scheme for safari system browser and custom tabs               |


#### Headers


#### ColorScheme

| Prop                            | Type                | Description                                       |
| ------------------------------- | ------------------- | ------------------------------------------------- |
| **`toolBarColor`**              | <code>string</code> | Set the toolbar color Android & iOS               |
| **`navigationBarColor`**        | <code>string</code> | Set the navigation bar color Android only         |
| **`navigationBarDividerColor`** | <code>string</code> | Set the navigation bar divider color Android only |
| **`secondaryToolbarColor`**     | <code>string</code> | Set the secondar toolbar color Android only       |


#### ListenerFunc


#### Dimensions

| Prop         | Type                |
| ------------ | ------------------- |
| **`width`**  | <code>number</code> |
| **`height`** | <code>number</code> |
| **`x`**      | <code>number</code> |
| **`y`**      | <code>number</code> |
| **`ratio`**  | <code>number</code> |


### Type Aliases


#### NavigationEvent

<code>{ /** * current url being loaded */ url: string; /** * current url target (new window, i.e. _blank / _self, etc) */ newWindowRequest: boolean; /** * current url is from same host */ isSameHost: boolean; /** * complete current url loading */ complete: (allow: boolean) =&gt; void; }</code>


#### PageLoadStatus

<code>{ isLoading: boolean }</code>


#### ErrorCode

<code>{ errorCode: number }</code>

</docgen-api>

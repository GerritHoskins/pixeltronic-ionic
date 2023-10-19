package dev.pixeltronic.plugins.pixeltronicwebviewbrowser;

import android.content.Context;
import com.getcapacitor.JSObject;
import com.getcapacitor.PluginCall;

public class InAppBrowserOptions {

    private JSObject headers = null;
    private Context context;
    private JSObject colorScheme = null;
    private PluginCall savedCall = null;
    private String targetUrl = null;
    private boolean hidden = false;
    private int width = 1;
    private int height = 1;
    private int x = 0;
    private int y = 0;
    private float ratio = 0.5f;

    public InAppBrowserOptions(Context context) {
        this.context = context;
    }

    public JSObject getHeaders() {
        return headers;
    }

    public void setHeaders(JSObject headers) {
        this.headers = headers;
    }

    public JSObject getColorScheme() {
        return colorScheme;
    }

    public void setColorScheme(JSObject colorScheme) {
        this.colorScheme = colorScheme;
    }

    public PluginCall getSavedCall() {
        return savedCall;
    }

    public void setSavedCall(PluginCall savedCall) {
        this.savedCall = savedCall;
    }

    public String getTargetUrl() {
        return targetUrl;
    }

    public void setTargetUrl(String targetUrl) {
        this.targetUrl = targetUrl;
    }

    public boolean isHidden() {
        return hidden;
    }

    public void setHidden(boolean hidden) {
        this.hidden = hidden;
    }

    public int getWidth() {
        return width;
    }

    public int getWidthInPixels() {
        return (int) getPixels(width);
    }

    public void setWidth(int width) {
        this.width = width;
    }

    public int getHeight() {
        return height;
    }

    public int getHeightInPixels() {
        return (int) getPixels(height);
    }

    public void setHeight(int height) {
        this.height = height;
    }

    public int getX() {
        return x;
    }

    public int getXInPixels() {
        return (int) getPixels(x);
    }

    public void setX(int x) {
        this.x = x;
    }

    public int getY() {
        return y;
    }

    public int getYInPixels() {
        return (int) getPixels(y);
    }

    public void setY(int y) {
        this.y = y;
    }

    public float getRatio() {
        return ratio;
    }

    public void setRatio(float ratio) {
        this.ratio = ratio;
    }

    private float getPixels(int value) {
        return value * context.getResources().getDisplayMetrics().density + 0.5f;
    }
}

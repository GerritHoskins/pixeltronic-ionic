package dev.pixeltronic.plugins.pixeltronicwebviewbrowser;

import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.util.Base64;
import android.webkit.WebView;
import com.getcapacitor.JSObject;
import com.getcapacitor.PluginCall;
import java.io.ByteArrayOutputStream;
import java.io.IOException;

public class InAppBrowserScreenTask implements Runnable {
    private static final String LOG_TAG = "pixeltronic";

    private final PluginCall call;
    private Exception exception;
    private final WebView webView;

    public InAppBrowserScreenTask(PluginCall call, WebView webView) {
        this.call = call;
        this.webView = webView;
    }

    @Override
    public void run() {
        final JSObject object = doInBackground();
        onPostExecute(object);
    }

    private JSObject doInBackground() {
        final JSObject object = new JSObject();

        int scrollY = webView.getScrollY();

        webView.setDrawingCacheEnabled(true);
        final Bitmap bm = Bitmap.createBitmap(webView.getWidth(), webView.getHeight(), Bitmap.Config.ARGB_8888);
        final Canvas canvas = new Canvas(bm);
        webView.draw(canvas);

        webView.scrollTo(0, scrollY); // Restore the original scroll position
        webView.destroyDrawingCache();

        try (ByteArrayOutputStream os = new ByteArrayOutputStream()) {
            bm.compress(Bitmap.CompressFormat.JPEG, 100, os);
            byte[] byteArray = os.toByteArray();
            String src = Base64.encodeToString(byteArray, Base64.DEFAULT);

            object.put("src", src);
        } catch (IOException e) {
            exception = e;
        }

        return object;
    }

    private void onPostExecute(JSObject object) {
        if (exception == null) {
            call.resolve(object);
        } else {
            call.reject(LOG_TAG, "Failed to capture screen.", exception);
        }
    }
}

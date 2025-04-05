package site.sumrndm.tinymv;

import android.os.Bundle;
import android.view.View;
import android.webkit.WebSettings;
import android.webkit.WebChromeClient;
import android.webkit.WebViewClient;
import android.webkit.WebView;
import android.widget.Toast;
import android.app.Activity;
import android.content.pm.ActivityInfo;
import android.graphics.Color;
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;

public class MainActivity extends Activity {
    private WebView webView;


    @Override
    @SuppressWarnings("deprecation")    // setAllowFileAccessFromFileURLs is deprecated
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_SENSOR_LANDSCAPE);

        webView = findViewById(R.id.webview);

        webView.setBackgroundColor(Color.BLACK);

        // Enable JavaScript
        WebSettings webSettings = webView.getSettings();
        webSettings.setJavaScriptEnabled(true);
        webSettings.setAllowFileAccessFromFileURLs(true);
        webSettings.setDomStorageEnabled(true);
        webSettings.setDatabaseEnabled(true);

        WebChromeClient webChrome = new WebChromeClient();

         // have to set _any_ web chrome client for console and alerts to work
        webView.setWebChromeClient(new WebChromeClient() {
            @Override
            public void onProgressChanged(WebView  view, int newProgress) {
                super.onProgressChanged(view, newProgress);
                //String code = getRawString(R.raw.gamepad);
                //view.evaluateJavascript(code, null);
            }
        });
        webView.addJavascriptInterface(new JavaScriptExtensions(), "jse");

        // Load the index.html file from assets
        webView.loadUrl("file:///android_asset/index.html");

        webView.setWebViewClient(new WebViewClient() {
            @Override
            public void onPageFinished(WebView view, String url) {
                super.onPageFinished(view, url);
                webView.loadUrl("javascript:AudioManager.audioFileExt = function() {return '.ogg';};");
            }
        });
    }
    class JavaScriptExtensions {
        public static final int TOAST_LONG = Toast.LENGTH_LONG;
        public static final int TOAST_SHORT = Toast.LENGTH_SHORT;

        public void toast(String message, int length) {
            Toast.makeText(MainActivity.this, message, length).show();
        }
    }
    @Override
    @SuppressWarnings("deprecation")
    public void onBackPressed() {
        WebView wv = (WebView) findViewById(R.id.webview);
        wv.evaluateJavascript("TouchInput._onCancel();", null);
    }
    @Override
    protected void onPause() {
        WebView wv = (WebView) findViewById(R.id.webview);
        wv.onPause();
        wv.pauseTimers();
        super.onPause();
    }

    @Override
    protected void onResume() {
        super.onResume();
        WebView wv = (WebView) findViewById(R.id.webview);
        wv.onResume();
        wv.resumeTimers();
    }

    public String getRawString(int id) {
        InputStream is = getResources().openRawResource(id);
        BufferedReader reader = new BufferedReader(new InputStreamReader(is));
        StringBuilder sb = new StringBuilder();
        String line;
        try {
            while((line = reader.readLine()) != null) {
                sb.append(line).append('\n');
            }
        } catch (Exception e) {
            return null;
        }
        return sb.toString();
    }
}

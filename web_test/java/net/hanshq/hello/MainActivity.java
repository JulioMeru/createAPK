package net.hanshq.hello;

import android.os.Bundle;
import android.view.View;
import android.webkit.WebSettings;
import android.webkit.WebViewClient;
import android.webkit.WebView;
import android.app.Activity;

public class MainActivity extends Activity {
    private WebView webView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        webView = findViewById(R.id.webview);
        
        // Enable JavaScript
        WebSettings webSettings = webView.getSettings();
        webSettings.setJavaScriptEnabled(true);
        webSettings.setAllowFileAccessFromFileURLs(true);

        // Load the index.html file from assets
        webView.loadUrl("file:///android_asset/index.html");

        // Pass data to the HTML file after it is loaded
        //String dataFromView = "This is some data from the view!";
        //webView.loadUrl("javascript:displayData('" + dataFromView + "')");
        webView.setWebViewClient(new WebViewClient() {
            @Override
            public void onPageFinished(WebView view, String url) {
                super.onPageFinished(view, url);
                // Now it's safe to call JavaScript
                String dataFromView = "This is some data from the view!";
                webView.loadUrl("javascript:displayData('" + dataFromView + "')");
                //webView.loadUrl("javascript:document.getElementById('dataContainer').innerText += 'Hello! Code injected!';");
            }
        });

    }
}


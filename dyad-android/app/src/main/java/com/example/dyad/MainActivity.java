package com.example.dyad;

    import android.app.Activity;
    import android.os.Bundle;
    import android.webkit.WebView;
    import android.webkit.WebViewClient;
    import android.webkit.WebSettings;

    public class MainActivity extends Activity {
        private WebView webView;

        @Override
        protected void onCreate(Bundle savedInstanceState) {
            super.onCreate(savedInstanceState);
            setContentView(R.layout.activity_main);

            webView = findViewById(R.id.webview);
            webView.setWebViewClient(new WebViewClient());
            
            // Enable JavaScript and other necessary settings
            WebSettings webSettings = webView.getSettings();
            webSettings.setJavaScriptEnabled(true);
            webSettings.setDomStorageEnabled(true);
            webSettings.setAllowFileAccess(true);
            webSettings.setAllowFileAccessFromFileURLs(true);
            webSettings.setAllowUniversalAccessFromFileURLs(true);
            
            // Load the dyad web application
            webView.loadUrl("file:///android_asset/index.html");
        }
    }

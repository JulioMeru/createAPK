package com.example.min;

import android.app.Activity;
import android.os.Bundle;
import android.widget.TextView;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.LinearLayout.LayoutParams;
import android.view.Gravity;

public class MainActivity extends Activity {
    private int counter = 0;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        LinearLayout layout = new LinearLayout(this);
        layout.setOrientation(LinearLayout.VERTICAL);
        setContentView(layout);

        LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(
                    LayoutParams.WRAP_CONTENT,
                    LayoutParams.WRAP_CONTENT,
                    0.0f
        );
        params.gravity = Gravity.CENTER;
        TextView txt = new TextView(this);
        txt.setText("Counter: 0");
        txt.setLayoutParams(params);
        Button btn = new Button(this);
        btn.setLayoutParams(params);
        btn.setText("Click Me!");
        btn.setOnClickListener(v -> {
            counter++;
            txt.setText("Counter: " + counter);
        });

        layout.addView(txt);
        layout.addView(btn);
    }
}

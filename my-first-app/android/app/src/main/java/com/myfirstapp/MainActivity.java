package com.myfirstapp;

// import com.facebook.react.ReactActivity;

import android.widget.LinearLayout;
import android.graphics.Color;
import android.widget.TextView;
import android.view.Gravity;
import android.util.TypedValue;

import com.reactnativenavigation.controllers.SplashActivity;

public class MainActivity extends SplashActivity {
  @Override
  public LinearLayout createSplashLayout() {
      LinearLayout view = new LinearLayout(this);
      TextView textView = new TextView(this);

      view.setBackgroundColor(Color.parseColor("#2196F3"));
      view.setGravity(Gravity.CENTER);

      textView.setTextColor(Color.parseColor("#ffffff"));
      textView.setText("RoadMonTrip");
      textView.setGravity(Gravity.CENTER);
      textView.setTextSize(TypedValue.COMPLEX_UNIT_DIP, 40);

      view.addView(textView);
      return view;
  }
}
package com.q42.nomnom;

import android.graphics.Color;
import android.os.Bundle;
import android.view.View;
import android.view.Window;

import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {

	/**
	 * Returns the name of the main component registered from JavaScript. This is used to schedule
	 * rendering of the component.
	 */
	@Override
	protected String getMainComponentName() {
		return "NomNom";
	}


	@Override
	protected void onCreate(Bundle savedInstanceState) {
		Window w = getWindow();
		w.setStatusBarColor(Color.TRANSPARENT);
		w.setNavigationBarColor(Color.TRANSPARENT);
		w.getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION | View.SYSTEM_UI_FLAG_LAYOUT_STABLE);
		super.onCreate(savedInstanceState);
	}
}

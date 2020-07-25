package com.q42.nomnom;

import android.os.Bundle;
import android.os.PersistableBundle;
import android.view.View;

import androidx.annotation.Nullable;

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
  public void onCreate(@Nullable Bundle savedInstanceState, @Nullable PersistableBundle persistentState) {
    View view = getWindow().getDecorView().findViewById(android.R.id.content);
    view.setSystemUiVisibility(
            // Tells the system that the window wishes the content to
            // be laid out at the most extreme scenario. See the docs for
            // more information on the specifics
            View.SYSTEM_UI_FLAG_LAYOUT_STABLE |
                    // Tells the system that the window wishes the content to
                    // be laid out as if the navigation bar was hidden
                    View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION);
    super.onCreate(savedInstanceState, persistentState);
  }
}

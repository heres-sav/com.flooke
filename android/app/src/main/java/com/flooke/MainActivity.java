package com.flooke;

import android.content.Intent;
import expo.modules.ReactActivityDelegateWrapper;
import expo.modules.devlauncher.DevLauncherController;
import expo.modules.devmenu.react.DevMenuAwareReactActivity;
import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "Flooke";
  }

  /**
   * Returns the instance of the {@link ReactActivityDelegate}. There the RootView is created and
   * you can specify the renderer you wish to use - the new renderer (Fabric) or the old renderer
   * (Paper).
   */
  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return DevLauncherController.wrapReactActivityDelegate(
      this,
      () -> new ReactActivityDelegateWrapper(
        this,
        new ReactActivityDelegate(this, getMainComponentName())
      )
    );
  }
  @Override
  public void onNewIntent(Intent intent) {
    if (DevLauncherController.tryToHandleIntent(this, intent)) {
      return;
    }
    super.onNewIntent(intent);
  }

  public static class MainActivityDelegate extends ReactActivityDelegate {
    public MainActivityDelegate(ReactActivity activity, String mainComponentName) {
      super(activity, mainComponentName);
    }

    @Override
    protected ReactRootView createRootView() {
      ReactRootView reactRootView = new ReactRootView(getContext());
      // If you opted-in for the New Architecture, we enable the Fabric Renderer.
      reactRootView.setIsFabric(BuildConfig.IS_NEW_ARCHITECTURE_ENABLED);
      return reactRootView;
    }

    @Override
    protected boolean isConcurrentRootEnabled() {
      // If you opted-in for the New Architecture, we enable Concurrent Root (i.e. React 18).
      // More on this on https://reactjs.org/blog/2022/03/29/react-v18.html
      return BuildConfig.IS_NEW_ARCHITECTURE_ENABLED;
    }
  }
}

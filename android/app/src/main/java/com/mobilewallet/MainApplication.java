package com.mobilewallet;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.react.rnspinkit.RNSpinkitPackage;
import com.lwansbrough.RCTCamera.RCTCameraPackage;
import com.corbt.keepawake.KCKeepAwakePackage;
import com.bitgo.randombytes.RandomBytesPackage;
import com.oblador.keychain.KeychainPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import com.reactnativenavigation.NavigationApplication;

import java.util.Arrays;
import java.util.List;

 public class MainApplication extends NavigationApplication {

      @Override
      public boolean isDebug() {
          return BuildConfig.DEBUG;
      }

     protected List<ReactPackage> getPackages() {
         // Add additional packages you require here
         // No need to add RnnPackage and MainReactPackage
         return Arrays.<ReactPackage>asList(
            new RNSpinkitPackage(),
            new RCTCameraPackage(),
            new KCKeepAwakePackage(),
            new RandomBytesPackage(),
            new KeychainPackage()
       );
     }


  @Override
  public List<ReactPackage> createAdditionalReactPackages() {
      return this.getPackages();
  }
}

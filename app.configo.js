import * as dotenv from 'dotenv';

dotenv.config();

export default {
  expo: {
    name: "loveu365a",
    slug: "loveu365a",
    version: "6.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    scheme: "loveu365a",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.ryancarlos11.loveu365a",
      infoPlist: {
        CFBundleURLTypes: [
          {
            CFBundleURLSchemes: ["loveu365a"]
          }
        ]
      }
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      }
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/favicon.png"
    },
    plugins: [
      "expo-router"
    ],
    experiments: {
      typedRoutes: true
    },
    extra: {
      EXPO_PUBLIC_SUPABASE_URL: process.env.EXPO_PUBLIC_SUPABASE_URL,
      EXPO_PUBLIC_SUPABASE_KEY: process.env.EXPO_PUBLIC_SUPABASE_KEY,
      router: {
        origin: false
      },
      eas: {
        projectId: "74dea708-1a5e-4bf1-99bc-247bbc861118"
      }
    },
    runtimeVersion: {
      policy: "appVersion"
    },
    updates: {
      url: "https://u.expo.dev/74dea708-1a5e-4bf1-99bc-247bbc861118"
    }
  }
};

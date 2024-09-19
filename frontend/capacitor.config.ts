import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'frontend',
  webDir: 'dist',
  plugins: {
    Keyboard: {
      resize: "none",
      scrollPadding: true
    }
  }
};

export default config;

import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'singularity.2n40.eu',
  appName: '2n40',
  webDir: 'out',
  server: {
    androidScheme: 'https',
    url: 'https://2n40.eu',
    cleartext: true
  }
};

export default config;

import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'towersVisualization',
  exposes: {
    './Routes': 'apps/towersVisualization/src/app/remote-entry/entry.routes.ts',
    './AppConfig': './apps/towersVisualization/src/app/app.config.ts',
  },

};
//'./AppConfig': './src/app/app.config.ts',
/**
 * Nx requires a default export of the config to allow correct resolution of the module federation graph.
 **/
export default config;

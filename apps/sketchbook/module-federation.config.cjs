const {
  withNativeFederation,
  share,
} = require('@softarc/native-federation/build');

module.exports = withNativeFederation({
  name: 'remote',

  exposes: {
    './audio-visualizer-1': './src/projects/audio-visualizers/01/index.tsx',
    // './audio-visualizer-2': './src/projects/audio-visualizers/02/index.tsx',
    // './audio-visualizer-3': './src/projects/audio-visualizers/03/index.tsx',
    // './audio-visualizer-4': './src/projects/audio-visualizers/04/index.tsx',
    // './audio-visualizer-5': './src/projects/audio-visualizers/05/index.tsx',
    // './audio-visualizer-6': './src/projects/audio-visualizers/06/index.tsx',
    // './audio-visualizer-7': './src/projects/audio-visualizers/07/index.tsx',
    // './audio-visualizer-8': './src/projects/audio-visualizers/08/index.tsx',
    // './audio-visualizer-9': './src/projects/audio-visualizers/09/index.tsx',
    // './audio-visualizer-10': './src/projects/audio-visualizers/10/index.tsx',
    // './audio-visualizer-11': './src/projects/audio-visualizers/11/index.tsx',

    './data-visualization-1': './src/projects/data-visualization/01/index.tsx',
    // './data-visualization-2': './src/projects/data-visualization/02/index.tsx',
    // './data-visualization-3': './src/projects/data-visualization/03/index.tsx',
    // './data-visualization-4': './src/projects/data-visualization/04/index.tsx',
    // './data-visualization-5': './src/projects/data-visualization/05/index.tsx',

    './general-sketches-1': './src/projects/general-sketches/01/index.tsx',
    // './general-sketches-2': './src/projects/general-sketches/02/index.tsx',
    // './general-sketches-3': './src/projects/general-sketches/03/index.tsx',
    // './general-sketches-4': './src/projects/general-sketches/04/index.tsx',
    // './general-sketches-5': './src/projects/general-sketches/05/index.tsx',
  },

  shared: {
    ...share({
      react: {
        singleton: true,
        requiredVersion: false,
        version: '0',
        includeSecondaries: false,
      },
      'react-dom': {
        singleton: true,
        requiredVersion: false,
        version: '0',
        includeSecondaries: false,
      },
      // 'three': {
      //   singleton: true,
      //   requiredVersion: false,
      //   version: '0',
      //   includeSecondaries: false
      // },
    }),
  },
});

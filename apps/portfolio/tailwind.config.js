// tailwind config is required for editor support

const sharedConfig = require("tailwind-config/tailwind.config.js");

module.exports = {
  presets: [sharedConfig],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fade-in 2s cubic-bezier(0.4, 0, 0.6, 1)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        }
      }
    }
  },
};

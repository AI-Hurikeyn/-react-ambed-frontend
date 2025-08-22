// Elementor Frontend Config stub
console.log('Elementor Frontend Config stub loaded');

// Create minimal elementorFrontendConfig to prevent errors
window.elementorFrontendConfig = {
  environmentMode: {
    edit: false,
    wpPreview: false,
    isScriptDebug: false
  },
  kit: {
    body_background_background: 'classic',
    active_breakpoints: ['viewport_mobile', 'viewport_tablet', 'viewport_tablet_extra', 'viewport_laptop']
  },
  settings: {
    page: [],
    editorPreferences: []
  },
  version: '3.0.0',
  is_static: false,
  experimentalFeatures: {},
  urls: {
    assets: '/vendor/assets/',
    uploadUrl: '/vendor/assets/uploads'
  },
  // Added responsive config expected by Elementor
  responsive: {
    hasCustomBreakpoints: false,
    breakpoints: {
      mobile: { label: 'Mobile', value: 767, default_value: 767, direction: 'max', is_enabled: true },
      mobile_extra: { label: 'Mobile Extra', value: 880, default_value: 880, direction: 'max', is_enabled: false },
      tablet: { label: 'Tablet', value: 1024, default_value: 1024, direction: 'max', is_enabled: true },
      tablet_extra: { label: 'Tablet Extra', value: 1200, default_value: 1200, direction: 'max', is_enabled: false },
      laptop: { label: 'Laptop', value: 1366, default_value: 1366, direction: 'max', is_enabled: true },
      widescreen: { label: 'Widescreen', value: 1920, default_value: 1920, direction: 'min', is_enabled: false }
    },
    activeBreakpoints: {}
  }
};

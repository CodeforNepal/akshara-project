import { configure } from '@storybook/preact';

function loadStories() {
  require('../stories/components/SearchBox.js');
  require('../stories/components/TransliteratedInput.js');
  require('../stories/components/Logo.js');
  // You can require as many stories as you need.
}

configure(loadStories, module);

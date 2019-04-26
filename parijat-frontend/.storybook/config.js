import { configure } from '@storybook/preact';

function loadStories() {
  require('../stories/components/SearchBox.js');
  require('../stories/components/TransliteratedInput.js');
  // You can require as many stories as you need.
}

configure(loadStories, module);

import type { Preview } from '@storybook/react-vite'
import '#index.css';

const preview: Preview = {
  parameters: {
    a11y: {
      test: 'error'
    }
  },
};

export default preview;
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Example } from './example';

const meta: Meta<typeof Example> = {
  title: 'globals/example',
  component: Example,
};

export default meta;
type Story = StoryObj<typeof Example>;

export const Primary: Story = {
  args: {},
};

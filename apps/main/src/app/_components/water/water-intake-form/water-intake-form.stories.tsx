import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { WaterIntakeForm } from './water-intake-form';

const meta: Meta<typeof WaterIntakeForm> = {
  title: 'water/water-intake-form',
  component: WaterIntakeForm,
};

export default meta;
type Story = StoryObj<typeof WaterIntakeForm>;

export const Primary: Story = {
  args: {},
};

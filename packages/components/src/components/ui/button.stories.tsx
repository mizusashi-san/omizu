import type { Meta, StoryObj } from '@storybook/react-vite';
import { Loader2, Mail } from 'lucide-react';

import { Button } from './button';

const meta: Meta<typeof Button> = {
  title: 'Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'default',
        'destructive',
        'outline',
        'secondary',
        'ghost',
        'link',
      ],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
      if: { arg: 'variant', neq: 'link' },
    },
    children: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
    },
    asChild: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    layout: 'centered',
  },
  args: {
    variant: 'default',
    size: 'default',
    children: 'Button',
    disabled: false,
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Outline: Story = {
  args: {
    variant: 'outline',
  },
};
export const Ghost: Story = {
  args: {
    variant: 'ghost',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
  },
};

export const Link: Story = {
  args: {
    variant: 'link',
  },
};

export const Loading: Story = {
  render: (args) => (
    <Button {...args}>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Button
    </Button>
  ),
  args: {
    ...Outline.args,
    disabled: true,
  },
};

export const WithIcon: Story = {
  render: (args) => (
    <Button {...args}>
      <Mail className="mr-2 h-4 w-4" /> Login with Email Button
    </Button>
  ),
  args: {
    ...Secondary.args,
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
  },
};

export const Icon: Story = {
  args: {
    ...Secondary.args,
    size: 'icon',
    title: 'Mail',
    children: <Mail />,
  },
};

export const IconSmall: Story = {
  args: {
    variant: 'secondary',
    size: 'icon-sm',
    title: 'Mail',
    children: <Mail />,
  },
};

export const IconLarge: Story = {
  args: {
    variant: 'secondary',
    size: 'icon-lg',
    title: 'Mail',
    children: <Mail />,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

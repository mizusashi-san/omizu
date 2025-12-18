import { Button } from "@omizu/components";
import type { FC } from "react";

export const Example: FC = () => {
  return (
    <div className="p-6 max-w-md mx-auto bg-primary-foreground rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-bold text-primary">Example Component</h2>
      <p className="text-primary">
        これはサンプルコンポーネントです。必要に応じてカスタマイズしてください。
      </p>
      <Button>
        Click me
      </Button>
    </div>
  );
}
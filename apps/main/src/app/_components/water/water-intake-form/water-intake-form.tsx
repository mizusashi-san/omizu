'use client';

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Label,
} from '@omizu/components';
import { useState } from 'react';

interface WaterIntakeFormProps {
  onSuccess?: () => void;
}

const PRESET_AMOUNTS = [
  { label: 'コップ1杯', amount: 200 },
  { label: 'ペットボトル小', amount: 350 },
  { label: 'ペットボトル', amount: 500 },
];

export function WaterIntakeForm({ onSuccess }: WaterIntakeFormProps) {
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = Number(amount);
    if (!amountNum || amountNum <= 0) {
      setMessage({ type: 'error', text: '有効な数値を入力してください' });
      return;
    }

    await recordIntake(amountNum);
  };

  const handlePresetClick = async (presetAmount: number) => {
    await recordIntake(presetAmount);
  };

  const recordIntake = async (amountMl: number) => {
    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch('/api/water-intakes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount_ml: amountMl }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('ログインが必要です');
        }

        let errorMessage = '記録に失敗しました';
        try {
          const error = await response.json();
          errorMessage = error.error || errorMessage;
        } catch {
          // JSONパースエラーの場合は、レスポンステキストを取得
          const errorText = await response.text();
          if (errorText.includes('Not Found')) {
            errorMessage = 'APIエンドポイントが見つかりません';
          }
        }
        throw new Error(errorMessage);
      }

      setAmount('');
      setMessage({ type: 'success', text: `${amountMl}mlを記録しました` });
      onSuccess?.();

      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : '記録に失敗しました',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>水分摂取記録</CardTitle>
        <CardDescription>飲んだ水の量を記録しましょう</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">水分量（ml）</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="例: 200"
              disabled={isLoading}
              min="1"
              max="10000"
            />
          </div>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? '記録中...' : '記録する'}
          </Button>
        </form>

        <div className="space-y-3">
          <Label>よく使う量</Label>
          <div className="grid grid-cols-3 gap-2">
            {PRESET_AMOUNTS.map((preset) => (
              <Button
                key={preset.amount}
                type="button"
                variant="outline"
                onClick={() => handlePresetClick(preset.amount)}
                disabled={isLoading}
                className="flex flex-col h-auto py-3"
              >
                <span className="font-medium">{preset.label}</span>
                <span className="text-xs text-muted-foreground">
                  {preset.amount}ml
                </span>
              </Button>
            ))}
          </div>
        </div>

        {message && (
          <div
            className={`p-3 rounded-lg text-sm ${
              message.type === 'success'
                ? 'bg-green-50 text-green-800 border border-green-200 dark:bg-green-950 dark:text-green-200'
                : 'bg-red-50 text-red-800 border border-red-200 dark:bg-red-950 dark:text-red-200'
            }`}
          >
            {message.text}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { RefreshCw, Sliders } from 'lucide-react';
import { defaultParams } from '../data/mockData';
import type { PredictionParams } from '../types/analytics';

interface ParamSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit?: string;
  prefix?: string;
  onChange: (value: number) => void;
}

function clampWithStep(value: number, min: number, max: number, step: number): number {
  const clamped = Math.min(max, Math.max(min, value));
  const precision = step < 1 ? String(step).split('.')[1]?.length ?? 2 : 0;
  const stepped = Math.round(clamped / step) * step;
  return Number(stepped.toFixed(precision));
}

function ParamSlider({ label, value, min, max, step, unit = '', prefix = '', onChange }: ParamSliderProps) {
  const percentage = ((value - min) / (max - min)) * 100;
  const displayValue = step < 1 ? value.toFixed(2) : value.toFixed(0);

  const handleRangeChange = (next: number) => {
    onChange(clampWithStep(next, min, max, step));
  };

  const handleInputChange = (rawValue: string) => {
    if (rawValue.trim() === '') return;
    const parsed = Number(rawValue);
    if (!Number.isFinite(parsed)) return;
    onChange(clampWithStep(parsed, min, max, step));
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-sm text-muted-foreground">{label}</label>
        <div className="flex items-center gap-2">
          {(prefix || unit) && (
            <span className="text-sm font-mono font-medium text-muted-foreground">
              {prefix}
              {displayValue}
              {unit}
            </span>
          )}
          <input
            type="number"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => handleInputChange(e.target.value)}
            className="input-field w-24 py-1 px-2 text-sm text-right font-mono"
          />
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => handleRangeChange(Number(e.target.value))}
        className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
        style={{
          background: `linear-gradient(to right, hsl(200, 100%, 50%) 0%, hsl(160, 84%, 45%) ${percentage}%, hsl(222, 35%, 18%) ${percentage}%)`,
        }}
      />
    </div>
  );
}

interface PredictionSimulatorProps {
  params: PredictionParams;
  onParamsChange: (params: PredictionParams) => void;
  breakevenDay: number | null;
  predictedRoi: number | null;
}

const sliderConfig: Array<{
  section: string;
  items: Array<{
    key: keyof PredictionParams;
    label: string;
    min: number;
    max: number;
    step: number;
    unit?: string;
    prefix?: string;
  }>;
}> = [
  {
    section: '获客成本',
    items: [{ key: 'cpi', label: 'CPI（单用户获取成本）', min: 0.5, max: 5, step: 0.1, prefix: '$' }],
  },
  {
    section: '用户留存',
    items: [
      { key: 'd1Retention', label: 'D1 留存率', min: 20, max: 60, step: 1, unit: '%' },
      { key: 'd7Retention', label: 'D7 留存率', min: 5, max: 30, step: 1, unit: '%' },
      { key: 'd30Retention', label: 'D30 留存率', min: 2, max: 15, step: 0.5, unit: '%' },
    ],
  },
  {
    section: '变现指标',
    items: [
      { key: 'arpu', label: 'ARPU（每用户平均收入）', min: 0.05, max: 0.5, step: 0.01, prefix: '$' },
      { key: 'payingRate', label: '付费转化率', min: 1, max: 10, step: 0.5, unit: '%' },
      { key: 'arppu', label: 'ARPPU（付费用户平均收入）', min: 5, max: 100, step: 1, prefix: '$' },
    ],
  },
  {
    section: '前期LTV锚点',
    items: [
      { key: 'ltvD1', label: 'D1 累计LTV', min: 0.01, max: 2, step: 0.01, prefix: '$' },
      { key: 'ltvD7', label: 'D7 累计LTV', min: 0.05, max: 5, step: 0.01, prefix: '$' },
      { key: 'ltvD30', label: 'D30 累计LTV', min: 0.2, max: 12, step: 0.01, prefix: '$' },
    ],
  },
  {
    section: '投放预算',
    items: [{ key: 'dailyBudget', label: '日均预算', min: 1000, max: 50000, step: 1000, prefix: '$' }],
  },
];

function PredictionSimulatorComponent({ params, onParamsChange, breakevenDay, predictedRoi }: PredictionSimulatorProps) {
  const [localParams, setLocalParams] = useState(params);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    setLocalParams(params);
  }, [params]);

  useEffect(() => {
    const timer = setTimeout(() => {
      onParamsChange(localParams);
      setIsUpdating(false);
    }, 250);

    return () => clearTimeout(timer);
  }, [localParams, onParamsChange]);

  const predictedRoas = useMemo(() => {
    if (predictedRoi === null) return '--';
    return `${predictedRoi.toFixed(1)}%`;
  }, [predictedRoi]);

  const handleChange = useCallback((key: keyof PredictionParams, value: number) => {
    setIsUpdating(true);
    setLocalParams((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleReset = useCallback(() => {
    setIsUpdating(true);
    setLocalParams(defaultParams);
  }, []);

  return (
    <div className="chart-container">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Sliders className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">参数模拟器</h3>
        </div>
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <RefreshCw className={`w-4 h-4 ${isUpdating ? 'animate-spin' : ''}`} />
          重置
        </button>
      </div>

      <div className="bg-muted/50 rounded-xl p-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">预测回本周期</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-mono font-bold text-gradient">{breakevenDay ?? '--'}</span>
              <span className="text-muted-foreground">天</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">预测 ROAS</p>
            <p className="text-2xl font-mono font-semibold text-success">{predictedRoas}</p>
          </div>
        </div>
      </div>

      <div className="space-y-5">
        {sliderConfig.map((group, groupIndex) => (
          <div
            key={group.section}
            className={groupIndex < sliderConfig.length - 1 ? 'pb-4 border-b border-border' : ''}
          >
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">{group.section}</p>
            <div className="space-y-4">
              {group.items.map((item) => (
                <ParamSlider
                  key={item.key}
                  label={item.label}
                  value={localParams[item.key] as number}
                  min={item.min}
                  max={item.max}
                  step={item.step}
                  unit={item.unit}
                  prefix={item.prefix}
                  onChange={(value) => handleChange(item.key, value)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export const PredictionSimulator = memo(PredictionSimulatorComponent);

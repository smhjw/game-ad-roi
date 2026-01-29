import { useState, useEffect, useCallback } from 'react';
import { RefreshCw, Sliders } from 'lucide-react';
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

function ParamSlider({ label, value, min, max, step, unit = '', prefix = '', onChange }: ParamSliderProps) {
  const percentage = ((value - min) / (max - min)) * 100;
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-sm text-muted-foreground">{label}</label>
        <span className="text-sm font-mono font-medium">
          {prefix}{value.toFixed(step < 1 ? 2 : 0)}{unit}
        </span>
      </div>
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
          style={{
            background: `linear-gradient(to right, hsl(200, 100%, 50%) 0%, hsl(160, 84%, 45%) ${percentage}%, hsl(222, 35%, 18%) ${percentage}%)`
          }}
        />
      </div>
    </div>
  );
}

interface PredictionSimulatorProps {
  params: PredictionParams;
  onParamsChange: (params: PredictionParams) => void;
  breakevenDay: number | null;
}

export function PredictionSimulator({ params, onParamsChange, breakevenDay }: PredictionSimulatorProps) {
  const [localParams, setLocalParams] = useState(params);
  const [isUpdating, setIsUpdating] = useState(false);
  
  // 延迟更新防止频繁重渲染
  useEffect(() => {
    const timer = setTimeout(() => {
      onParamsChange(localParams);
      setIsUpdating(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [localParams, onParamsChange]);
  
  const handleChange = useCallback((key: keyof PredictionParams, value: number) => {
    setIsUpdating(true);
    setLocalParams(prev => ({ ...prev, [key]: value }));
  }, []);
  
  const handleReset = useCallback(() => {
    setLocalParams(params);
  }, [params]);

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
      
      {/* 预测结果展示 */}
      <div className="bg-muted/50 rounded-xl p-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">预测回本周期</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-mono font-bold text-gradient">
                {breakevenDay !== null ? breakevenDay : '--'}
              </span>
              <span className="text-muted-foreground">天</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">预测ROAS</p>
            <p className="text-2xl font-mono font-semibold text-success">
              {breakevenDay !== null ? Math.round(100 + (180 - breakevenDay) * 0.8) : '--'}%
            </p>
          </div>
        </div>
      </div>
      
      {/* 参数调整区域 */}
      <div className="space-y-5">
        <div className="pb-4 border-b border-border">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">获客成本</p>
          <ParamSlider
            label="CPI (单用户获取成本)"
            value={localParams.cpi}
            min={0.5}
            max={5}
            step={0.1}
            prefix="$"
            onChange={(v) => handleChange('cpi', v)}
          />
        </div>
        
        <div className="pb-4 border-b border-border">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">用户留存</p>
          <div className="space-y-4">
            <ParamSlider
              label="D1留存率"
              value={localParams.d1Retention}
              min={20}
              max={60}
              step={1}
              unit="%"
              onChange={(v) => handleChange('d1Retention', v)}
            />
            <ParamSlider
              label="D7留存率"
              value={localParams.d7Retention}
              min={5}
              max={30}
              step={1}
              unit="%"
              onChange={(v) => handleChange('d7Retention', v)}
            />
            <ParamSlider
              label="D30留存率"
              value={localParams.d30Retention}
              min={2}
              max={15}
              step={0.5}
              unit="%"
              onChange={(v) => handleChange('d30Retention', v)}
            />
          </div>
        </div>
        
        <div className="pb-4 border-b border-border">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">变现指标</p>
          <div className="space-y-4">
            <ParamSlider
              label="ARPU (每用户平均收入)"
              value={localParams.arpu}
              min={0.05}
              max={0.5}
              step={0.01}
              prefix="$"
              onChange={(v) => handleChange('arpu', v)}
            />
            <ParamSlider
              label="付费转化率"
              value={localParams.payingRate}
              min={1}
              max={10}
              step={0.5}
              unit="%"
              onChange={(v) => handleChange('payingRate', v)}
            />
            <ParamSlider
              label="ARPPU (付费用户平均收入)"
              value={localParams.arppu}
              min={5}
              max={100}
              step={1}
              prefix="$"
              onChange={(v) => handleChange('arppu', v)}
            />
          </div>
        </div>
        
        <div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">投放预算</p>
          <ParamSlider
            label="日均预算"
            value={localParams.dailyBudget}
            min={1000}
            max={50000}
            step={1000}
            prefix="$"
            onChange={(v) => handleChange('dailyBudget', v)}
          />
        </div>
      </div>
      
      {/* 滑块样式 */}
      <style>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 18px;
          height: 18px;
          background: linear-gradient(135deg, hsl(200, 100%, 50%), hsl(160, 84%, 45%));
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 2px 8px hsla(200, 100%, 50%, 0.4);
          transition: transform 0.2s ease;
        }
        .slider::-webkit-slider-thumb:hover {
          transform: scale(1.1);
        }
        .slider::-moz-range-thumb {
          width: 18px;
          height: 18px;
          background: linear-gradient(135deg, hsl(200, 100%, 50%), hsl(160, 84%, 45%));
          border-radius: 50%;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 8px hsla(200, 100%, 50%, 0.4);
        }
      `}</style>
    </div>
  );
}

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { ArrowUpRight, ArrowDownRight, Minus, LucideIcon } from 'lucide-react';

interface MetricDisplayCardProps {
  title: string;
  value: string; // e.g., "75", "12K", "85%"
  unit?: string; // e.g., "%", "patients", "beds"
  trend?: 'up' | 'down' | 'neutral' | 'none';
  trendValue?: string; // e.g., "+5%", "-2", "+1.2%"
  trendPeriod?: string; // e.g., "vs last month", "since yesterday"
  capacityMax?: number;
  capacityCurrent?: number;
  capacityUnit?: string; // Unit for capacity, e.g., "beds"
  icon?: LucideIcon; // Icon for the card header
  className?: string;
}

const MetricDisplayCard: React.FC<MetricDisplayCardProps> = ({
  title,
  value,
  unit,
  trend = 'none',
  trendValue,
  trendPeriod = "vs last period",
  capacityMax,
  capacityCurrent,
  capacityUnit = "items",
  icon: IconComponent,
  className,
}) => {
  console.log(`MetricDisplayCard loaded: ${title}`);

  const TrendIcon =
    trend === 'up' ? ArrowUpRight :
    trend === 'down' ? ArrowDownRight :
    trend === 'neutral' ? Minus :
    null;

  const trendColor =
    trend === 'up' ? 'text-green-600 dark:text-green-400' :
    trend === 'down' ? 'text-red-600 dark:text-red-400' :
    'text-muted-foreground';

  const progressPercentage = (capacityMax && capacityCurrent !== undefined)
    ? (capacityCurrent / capacityMax) * 100
    : 0;

  return (
    <Card className={cn(
      "transition-all duration-300 ease-out hover:shadow-xl hover:scale-[1.02] transform",
      className
    )}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {IconComponent && <IconComponent className="h-4 w-4 text-muted-foreground" />}
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="text-3xl font-bold">
          {value}
          {unit && <span className="ml-1 text-base font-normal text-muted-foreground">{unit}</span>}
        </div>

        {trend !== 'none' && trendValue && TrendIcon && (
          <div className="flex items-center text-xs">
            <TrendIcon className={cn("h-4 w-4 mr-1", trendColor)} />
            <span className={cn(trendColor)}>{trendValue}</span>
            {trendPeriod && <span className="ml-1 text-muted-foreground">{trendPeriod}</span>}
          </div>
        )}

        {capacityMax !== undefined && capacityCurrent !== undefined && (
          <div className="pt-1">
            <Progress value={progressPercentage} aria-label={`${title} capacity`} className="h-2" />
            <p className="text-xs text-muted-foreground mt-1.5">
              {capacityCurrent} / {capacityMax} {capacityUnit}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MetricDisplayCard;
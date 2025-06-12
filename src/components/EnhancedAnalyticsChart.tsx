import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import { motion, type MotionProps } from 'framer-motion';

interface EnhancedAnalyticsChartProps {
  /** Configuration for the chart, including colors and labels for different data series. */
  config: ChartConfig;
  /** The actual Recharts chart component (e.g., <LineChart>...</LineChart>) along with its elements like XAxis, YAxis, Lines, Bars, Tooltip, Legend. */
  children: React.ReactNode;
  /** Optional title to be displayed above the chart. */
  title?: string;
  /** Optional description or subtext for the chart. */
  description?: string;
  /** Additional CSS classes for the wrapping Card component. */
  className?: string;
  /** Additional CSS classes for the ChartContainer component from shadcn/ui. Typically used for sizing (e.g., 'h-[300px] w-full'). */
  chartContainerClassName?: string;
  /** Framer Motion 'initial' prop for the card's entry animation. */
  initial?: MotionProps['initial'];
  /** Framer Motion 'animate' prop for the card's entry animation. */
  animate?: MotionProps['animate'];
  /** Framer Motion 'whileHover' prop for the card's hover effects. */
  whileHover?: MotionProps['whileHover'];
  /** Framer Motion 'transition' prop for controlling animation behavior. */
  transition?: MotionProps['transition'];
}

// Create a motion-enabled Card component
const MotionCard = motion(Card);

const EnhancedAnalyticsChart: React.FC<EnhancedAnalyticsChartProps> = ({
  config,
  children,
  title,
  description,
  className,
  chartContainerClassName = "min-h-[200px] w-full", // Default sizing, can be overridden
  initial = { opacity: 0, y: 20 },
  animate = { opacity: 1, y: 0 },
  whileHover = { 
    scale: 1.02, 
    boxShadow: "0px 10px 25px rgba(0,0,0,0.08), 0px 5px 12px rgba(0,0,0,0.06)" 
  },
  transition = { type: "spring", stiffness: 300, damping: 20, duration: 0.4 },
}) => {
  console.log(`EnhancedAnalyticsChart loaded${title ? ` for: ${title}` : ''}`);

  return (
    <MotionCard
      className={className}
      initial={initial}
      animate={animate}
      whileHover={whileHover}
      transition={transition}
      // `perspective` can be added if 3D rotations are used in `whileHover`
      // style={{ perspective: '1000px' }} 
    >
      {(title || description) && (
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription className="mt-1">{description}</CardDescription>}
        </CardHeader>
      )}
      {/* Apply default padding to CardContent, can be overridden if className includes p-0 or similar */}
      <CardContent className="p-4 pt-0 md:p-6 md:pt-0"> 
        <ChartContainer config={config} className={chartContainerClassName}>
          {children}
        </ChartContainer>
      </CardContent>
    </MotionCard>
  );
};

export default EnhancedAnalyticsChart;
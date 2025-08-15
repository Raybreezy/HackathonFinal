"use client";

import * as React from "react";
import * as RechartsPrimitive from 'recharts';

import { cn } from "./utils";

// Simplified chart components that avoid complex type issues
export function ChartContainer({
  id,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  children: React.ReactElement;
}) {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

  return (
    <div
      data-slot="chart"
      data-chart={chartId}
      className={cn(
        "[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border flex aspect-video justify-center text-xs [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-hidden [&_.recharts-sector]:outline-hidden [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-surface]:outline-hidden",
        className,
      )}
      {...props}
    >
      <RechartsPrimitive.ResponsiveContainer>
        {children}
      </RechartsPrimitive.ResponsiveContainer>
    </div>
  );
}

export function ChartTooltip(props: React.ComponentProps<typeof RechartsPrimitive.Tooltip>) {
  return (
    <RechartsPrimitive.Tooltip
      {...props}
    />
  );
}

export function ChartLegend(props: React.ComponentProps<typeof RechartsPrimitive.Legend>) {
  return (
    <RechartsPrimitive.Legend
      className="flex items-center justify-center gap-4"
      {...props}
    />
  );
}

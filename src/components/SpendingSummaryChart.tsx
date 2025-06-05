import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// TSB Colors (example, replace with actual TSB palette if available)
const TSB_COLORS = ['#00A8E1', '#0072C6', '#5CB85C', '#F0AD4E', '#D9534F', '#5BC0DE'];

interface ChartDataItem {
  name: string; // e.g., Category name like 'Groceries', 'Transport'
  value: number; // e.g., Amount spent
  // color?: string; // Optional: if you want to specify color per item
}

interface SpendingSummaryChartProps {
  data: ChartDataItem[];
  title?: string;
  chartType?: 'bar' | 'pie'; // Example: extendable for different chart types
  // For TSB, maybe a prop for the primary color for the bars if not multi-color
  // primaryBarColor?: string; // e.g., '#00A8E1'
}

const SpendingSummaryChart: React.FC<SpendingSummaryChartProps> = ({
  data,
  title = "Spending Summary",
  // primaryBarColor = '#00A8E1',
}) => {
  console.log("Rendering SpendingSummaryChart with data:", data);

  if (!data || data.length === 0) {
    console.log("No data provided for SpendingSummaryChart, rendering placeholder.");
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center text-muted-foreground">
          <p>No spending data available to display.</p>
        </CardContent>
      </Card>
    );
  }

  // Simple formatting for tooltip/labels
  const formatCurrency = (value: number) => `$${value.toFixed(2)}`;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.5} />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis tickFormatter={formatCurrency} tick={{ fontSize: 12 }} />
            <Tooltip
              formatter={(value: number) => [formatCurrency(value), "Amount"]}
              labelStyle={{ fontWeight: 'bold' }}
              contentStyle={{ borderRadius: '0.5rem', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
            />
            <Legend wrapperStyle={{ fontSize: 12, paddingTop: '10px' }} />
            <Bar dataKey="value" name="Spending" /* fill={primaryBarColor} */ radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={TSB_COLORS[index % TSB_COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default SpendingSummaryChart;
import React from "react";
import { CartesianGrid, Tooltip, YAxis, Area, AreaChart } from "recharts";
import CustomTooltip from "@/components/custom/CustomTooltip";
import { SimulationResult } from "../types/SimulationResult";

interface AreaChartProps {
  simulationResultList: SimulationResult[];
  width?: number;
  height?: number;
}

const AreaChartContainer: React.FC<AreaChartProps> = ({
  simulationResultList,
  width = 1000,
  height = 500,
}) => {
  return (
    <AreaChart
      width={width}
      height={height}
      data={simulationResultList}
      margin={{ top: 40, right: 30, left: 50, bottom: 20 }}
    >
      <Area
        type="monotone"
        dataKey="totalAmount"
        stroke="#82ca9d"
        fill="#82ca9d"
        name="元本"
      />
      <Area
        type="monotone"
        dataKey="totalInvestment"
        stroke="#8884d8"
        fill="#8884d8"
        fillOpacity={0.5}
        name="総額（利率含む）"
      />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      {/* <XAxis
        dataKey="month"
        tickFormatter={(month) => `${Math.floor(month / 12)}`}
        interval={11}
        domain={[0, "dataMax"]}
        label={{ value: "年数", position: "insideBottomRight", offset: -5 }}
      /> */}
      <YAxis
        tickFormatter={(totalInvestment) =>
          `${totalInvestment.toLocaleString()}円`
        }
        label={{ value: "金額（円）", position: "top", offset: 20 }}
      />
      <Tooltip content={<CustomTooltip />} />
    </AreaChart>
  );
};

export default AreaChartContainer;

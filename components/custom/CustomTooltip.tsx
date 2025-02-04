import { SimulationResult } from "@/app/types/SimulationResult";
import { TooltipProps } from "recharts";

// カスタムツールチップの定義
const CustomTooltip: React.FC<TooltipProps<number, string>> = ({
  active,
  payload,
}) => {
  if (active && payload && payload.length > 0) {
    const { year, month, totalInvestment, totalAmount, profit } = payload[0]
      .payload as SimulationResult;

    return (
      <div
        style={{
          backgroundColor: "white",
          border: "1px solid #ccc",
          padding: "10px",
          borderRadius: "5px",
        }}
      >
        <p>{` ${year}年${month}月`}</p>
        <p>総額: ¥{totalAmount.toLocaleString()}</p>
        <p>元本: ¥{totalInvestment.toLocaleString()}</p>
        <p>利益: ¥{profit.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};
export default CustomTooltip;

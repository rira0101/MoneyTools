"use client";
import React, { useEffect, useState } from "react";
import generateInvestmentData from "../logic/increase/generateInvestmentData";
import { Button } from "@/components/ui/button";
import { InvestmentData } from "../types/assetManagement/InvestmentData";
import SummarySection from "./SummarySection";
import AreaChartContainer from "./AreaChartContainer";

const ChartContainer: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<number>(360);
  const [data, setData] = useState<InvestmentData[]>([]);

  useEffect(() => {
    const generatedData = generateInvestmentData(selectedPeriod);
    setData(generatedData);
  }, [selectedPeriod]);

  const lastIndex = selectedPeriod - 1; // 年数を月数に変換

  return (
    <div className="">
      <div className="">
        <p>毎月5万円ずつ、年利5%で運用した場合の運用結果を用意しています。</p>
        <p>
          長期の運用になればなるほど福利の力で利益が急激に伸びているのが確認できます。
        </p>
      </div>
      <div className="flex justify-end mt-6">
        <p className="text-lg">投資期間を選択する</p>
      </div>
      <div className="flex justify-end mt-2">
        <div className="flex justify-around w-[360px]">
          {[10, 20, 30, 40].map((period) => (
            <Button
              className={`${
                period * 12 === selectedPeriod
                  ? "border-black border-2"
                  : "border-gray-300 border-2"
              }`}
              key={period}
              variant="outline"
              onClick={() => setSelectedPeriod(period * 12)}
            >
              {`${period}年`}
            </Button>
          ))}
        </div>
      </div>
      <AreaChartContainer data={data} />
      {data.length > 0 && lastIndex >= 0 && lastIndex < data.length && (
        <SummarySection data={data} lastIndex={lastIndex} />
      )}
    </div>
  );
};

export default ChartContainer;

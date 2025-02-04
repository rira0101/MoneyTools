"use client";
import React, { useEffect, useState } from "react";
import AreaChartContainer from "./AreaChartContainer";
import { IndexData } from "../types/assetManagement/IndexData";
import { SimulationResult } from "../types/SimulationResult";
import { getIndexData } from "../logic/increase/getIndexData";
import { Button } from "@/components/ui/button";
import { calculateInvestment } from "../logic/increase/calculateInvestment";
import { InvestmentForm } from "./InvestmentForm";

export type SimulationForm = {
  monthlyInvestmentAmount: number;
  startYear: number;
  startMonth: number;
};

const ChartContainer: React.FC = () => {
  const [investmentData, setInvestmentData] = useState<IndexData[]>([]);
  const [simulationResultList, setSimulationResultList] = useState<
    SimulationResult[]
  >([]);
  const [selectedIndex, setSelectedIndex] = useState<string>("nikkei225");
  const [simulationForm, setSimulationForm] = useState<SimulationForm>({
    monthlyInvestmentAmount: 10000,
    startYear: 2020,
    startMonth: 1,
  });

  // インデックスデータを取得（selectedIndex が変更されたときのみ）
  useEffect(() => {
    const fetchData = async () => {
      const data = await getIndexData(`${selectedIndex}.json`);
      setInvestmentData(data);
      console.log("Fetched Data:", data);
    };
    fetchData();
  }, [selectedIndex]);

  // フォームの値を更新
  const simulationFormChange = (field: keyof SimulationForm, value: number) => {
    setSimulationForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // 実行ボタンを押したときのみシミュレーションを更新
  const runSimulation = () => {
    if (investmentData.length > 0) {
      const simulationResult = calculateInvestment(
        investmentData,
        simulationForm
      );
      setSimulationResultList(simulationResult);
    }
  };

  return (
    <div>
      <h2>投資シミュレーションページ</h2>
      {/* インデックス選択ボタン */}
      <div className="flex justify-around w-[360px]">
        {["nikkei225", "sp500"].map((target) => (
          <Button
            key={target}
            className={`${
              target === selectedIndex
                ? "border-black border-2"
                : "border-gray-300 border-2"
            }`}
            variant="outline"
            onClick={() => setSelectedIndex(target)}
          >
            {target}
          </Button>
        ))}
      </div>

      {/* 投資条件の入力フォーム */}
      <div className="mt-8">
        <InvestmentForm
          simulationInfo={simulationForm}
          handleChange={simulationFormChange}
        />
      </div>

      {/* 実行ボタン */}
      <div className="mt-4">
        <Button onClick={runSimulation}>シミュレーションを実行</Button>
      </div>

      {/* グラフの表示 */}
      {simulationResultList.length > 0 && (
        <div className="mt-8">
          <AreaChartContainer simulationResultList={simulationResultList} />
        </div>
      )}
    </div>
  );
};

export default ChartContainer;

import { SimulationForm } from "@/app/investment_simulation/ChartContainer";
import { IndexData } from "@/app/types/assetManagement/IndexData";
import { SimulationResult } from "@/app/types/SimulationResult";

export const calculateInvestment = (
    data: IndexData[],
    simulationForm: SimulationForm
  ) => {
    let totalInvestment = 0;
    let totalAmount = 0;
    const monthlyProfits: SimulationResult[] = [];
    console.log(data);
    console.log(simulationForm);

    for (let i = 0; i < data.length; i++) {
      const { value } = data[i];
      totalInvestment += simulationForm.monthlyInvestmentAmount;
      totalAmount += (simulationForm.monthlyInvestmentAmount * value) / data[0].value;
      const profit = totalAmount - totalInvestment;
      monthlyProfits.push({
        month: data[i].month,
        year: data[i].year,
        totalInvestment: totalInvestment,
        totalAmount: totalAmount,
        profit: profit,
      });
    }

    return monthlyProfits;
  };
import { InvestmentData } from "@/app/types/assetManagement/InvestmentData";

const generateInvestmentData = (months: number): InvestmentData[] => {
    const monthlyInvestment = 50000; // 毎月の積立額
    const annualRate = 0.05; // 年利率 5%
    const monthlyRate = annualRate / 12; // 月利率

    let totalAmount = 0; // 総額
    let principalAmount = 0; // 元本
    const data: InvestmentData[] = []; // グラフ用データ

    for (let month = 1; month <= months; month++) {
      principalAmount += monthlyInvestment; // 元本を更新
      totalAmount = totalAmount * (1 + monthlyRate) + monthlyInvestment; // 総額を更新
      const interest = totalAmount - principalAmount; // 利息を計算

      data.push({
        month, // 月数
        total: Math.round(totalAmount), // 総額（四捨五入）
        principal: principalAmount, // 元本
        interest: Math.round(interest), // 利息（四捨五入）
      });
      
    }
    console.log(data);

    return data;
  };

  export default generateInvestmentData
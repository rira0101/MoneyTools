import { LoanInfo } from "../types/LoanInfo";
import { Repayment } from "../types/Repayment";

export const calculateRepayment =(
    formInfo:LoanInfo
  ): Repayment | null => {
    const loanAmount = parseFloat(formInfo.loanAmount.toString()) * 10000;
    const year = parseInt(formInfo.year.toString(), 10);
    const month = parseInt(formInfo.month.toString(), 10);
    const interestRate = parseFloat(formInfo.interestRate.toString());
    const totalMonth = year * 12 + month; // 総返済期間（月）
    const monthlyRate = interestRate / 12 / 100; // 月利
  
    if (!totalMonth || !monthlyRate || !loanAmount) {
      return null;
    }
    const monthlyRepayment =
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonth)) /
    (Math.pow(1 + monthlyRate, totalMonth) - 1);
    
    const totalRepayment = monthlyRepayment * totalMonth;
    const totalInterest = totalRepayment - loanAmount;

  return {
    monthlyRepayment,
    totalInterest,
    totalRepayment,
  };
}
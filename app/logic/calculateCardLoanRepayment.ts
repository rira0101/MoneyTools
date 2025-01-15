import { CardLoanInfo } from "../types/CardLoanInfo";
import { RepaymentCardLoan } from "../types/Repayment";

export const calculateCardLoanRepayment =(
    formInfo:CardLoanInfo
): RepaymentCardLoan | null => {
  const monthlyRepayment = parseInt(formInfo.monthlyRepayment.toString());
      const monthlyRate = parseInt(formInfo.interestRate.toString()) / 12 / 100
      let remainingLoan = parseInt(formInfo.loanAmount.toString()) * 10000;
      let totalInterest = 0;
      let repaymentPeriod = 0;
      console.log(monthlyRate);
      console.log(formInfo.loanAmount);

      while (remainingLoan > 0) {
        const interest = remainingLoan * monthlyRate; // 当月の利息
        const principalPayment = Math.min(
          parseInt(formInfo.monthlyRepayment.toString()) - interest,
          remainingLoan
        ); // 当月の元金返済額
        totalInterest += interest; // 利息を累計
        remainingLoan -= principalPayment; // 残りの借入金額を更新
        repaymentPeriod++; // 返済月数をカウント
      }
    
      const totalRepayment =parseInt(formInfo.loanAmount.toString()) * 10000 + totalInterest; // 総返済額
  return {
    monthlyRepayment,
    repaymentPeriod,
    totalInterest,
    totalRepayment,
  };
}
import { CardLoanInfo } from "@/app/types/CardLoanInfo";
import { LoanInfo } from "@/app/types/LoanInfo";


// 合計月々の返済額を計算
export const calculateTotalMonthlyRepayment = (
    loanList: LoanInfo[] = [],
    cardLoanList: CardLoanInfo[] = []
  ): number => {
    const total = [...loanList, ...cardLoanList].reduce((total, loan) => {
      if (loan.repayment?.monthlyRepayment) {
        return total + loan.repayment.monthlyRepayment;
      }
      return total;
    }, 0);
  
    return total;
  };

// 合計総返済額を計算
export const calculateTotalOverallRepayment = (
  loanList: LoanInfo[] = [],
    cardLoanList: CardLoanInfo[] = []
): number => {
  const total =  [...loanList, ...cardLoanList].reduce((total, loan) => {
    if (loan.repayment?.totalRepayment) {
      return total + loan.repayment.totalRepayment;
    }
    return total;
  }, 0);
  return total;
};

// 合計利息金額を計算
export const calculateTotalInterest = (
  loanList: LoanInfo[] = [],
    cardLoanList: CardLoanInfo[] = []
): number => {
  const total = [...loanList, ...cardLoanList].reduce((total, loan) => {
    if (
      loan.repayment?.totalRepayment &&
      parseInt(loan.loanAmount.toString()) // 借入金額が存在する場合のみ
    ) {
      return (
        total +
        (loan.repayment.totalRepayment - parseInt(loan.loanAmount.toString()) * 10000)
      );
    }
    return total;
  }, 0);
  return total;
};


import { RepaymentCardLoan } from "./Repayment"

export type CardLoanInfo= {
    name: string
    loanAmount: number, // 借入金額
    monthlyRepayment: number,
    interestRate: number, // 借入利率
    repayment: RepaymentCardLoan | null
}

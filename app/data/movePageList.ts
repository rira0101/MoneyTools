import { NavigationCategory, NavigationType } from "../types/navigation";

export const categoryList: NavigationCategory[] = [
    { category: "home", text: "ホーム"},
    { category: "loan", text: "お金を借りる" },
    { category: "assetManagement", text: "お金を増やす" },
    { category: "other", text: "その他" },
  ]

export const pageList:NavigationType[] =
[
    {
        category: "home",
        text: "ホーム",
        path: "/"
    },{
        category: "loan",
        text: "お金を借りる時に考えること",
        path: "/before_rent"
    },{
        category: "loan",
        text: "借入シミュレーション",
        path: "/loan_simulation"
    },{
        category: "loan",
        text: "借り換えシミュレーション",
        path: "/refinance_simulation"
    },{
        category: "loan",
        text: "住宅ローンシミュレーション",
        path: "/mortgage_loan_simulation"
    },{
        category: "loan",
        text: "住宅ローン借り換えシミュレーション",
        path: "/mortgage_refinance_simulation"
    },{
        category: "assetManagement",
        text: "資産運用について",
        path: "/about_increase_money"
    },{
        category: "assetManagement",
        text: "積立投資のすゝめ",
        path: "/recommend_reserve_investment_trust"
    },{
        category: "assetManagement",
        text: "投資シミュレーション",
        path: "/investment_simulation"
    },{
        category: "assetManagement",
        text: "取り崩しシミュレーション",
        path: "/withdrawal_simulation"
    },{
        category: "other",
        text: "ライフプランシミュレーション",
        path: "/life_plan_simulation"
    },{
        category: "other",
        text: "お金のニュース",
        path: "/news"
    },{
        category: "other",
        text: "問い合わせ",
        path: "/inquiry"
    },{
        category: "other",
        text: "このサイトの著者について",
        path: "/about_author"
    },
]
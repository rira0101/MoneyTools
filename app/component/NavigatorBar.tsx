"use client";
import { useRouter } from "next/navigation";
import { categoryList, pageList } from "../data/movePageList";
import { useState } from "react";

// カテゴリごとのリスト取得
const getCategoryList = (category: string) =>
  pageList.filter((pageInfo) => pageInfo.category === category);

const NavigatorBar = () => {
  const [hoverItem, setHoverItem] = useState<string>(""); // ホバー中のカテゴリ
  const router = useRouter();

  // ホバー中のカテゴリに対応するリストを取得
  const displayedList = hoverItem ? getCategoryList(hoverItem) : [];
  // const displayedList = getCategoryList("rent");

  return (
    <div className="relative mb-6">
      {/* ナビゲーションバー */}
      <nav
        style={{ backgroundColor: "#D9E5FF" }}
        className="h-12 bg-blue-500 flex items-center justify-around px-40 relative"
      >
        {categoryList.map(({ category, text }) => (
          <div
            style={{ color: "#000066" }}
            key={category}
            className="h-12 text-lg font-bold relative flex items-center justify-center"
            onMouseEnter={() => setHoverItem(category)}
            onMouseLeave={() => setHoverItem("")}
          >
            {text}
            {/* ホバー時に表示されるリスト */}
            {hoverItem === category && displayedList.length > 0 && (
              <ul
                // style={{ marginTop: "136px", marginLeft: "140px" }}
                className="absolute top-full left-0 bg-gray-200 shadow-lg p-4 w-max "
              >
                {displayedList.map((page) => (
                  <li
                    key={page.text}
                    className="text-black hover:text-blue-500 cursor-pointer whitespace-nowrap"
                    onClick={() => router.push(page.path)}
                  >
                    {page.text}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default NavigatorBar;

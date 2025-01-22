"use client";
import { useRouter } from "next/navigation";
import { categoryList, pageList } from "../data/movePageList";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// カテゴリごとのリスト取得
const getCategoryList = (category: string) =>
  pageList.filter((pageInfo) => pageInfo.category === category);

const NavigatorBar = () => {
  const router = useRouter();

  return (
    <div className="flex justify-around bg-gray-100 mb-8 w-full">
      {/* ナビゲーションバー */}
      {categoryList.map(({ category, text }) => (
        <DropdownMenu key={category}>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-1/4 bg-gray-200">
              {text}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              {getCategoryList(category).map((page) => (
                <DropdownMenuItem
                  key={page.text}
                  onClick={() => router.push(page.path)}
                >
                  {page.text}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      ))}
    </div>
  );
};

export default NavigatorBar;

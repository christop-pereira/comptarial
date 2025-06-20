"use client"

import { ArticleCard } from "./articles-card"
import { useArticles } from "@/hooks/use-articles"

export function ArticlesCarousel() {
  const { articles, handleArticleClick } = useArticles()

  return (
    <div className="relative max-w-7xl mx-auto">

      {/* Conteneur du carrousel */}
      <div className="overflow-hidden">
        {/* Desktop: 1 article par slide */}
        <div className="hidden md:flex justify-center">
          <div
            className="flex transition-transform duration-300 ease-in-out"
          >
            {articles.map((article) => (
              <div key={article.id} className="w-[400px] flex-shrink-0 px-4">
                <ArticleCard article={article} onClick={handleArticleClick} />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: 1 article par slide */}
        <div className="block md:hidden">
          <div
            className="flex transition-transform duration-300 ease-in-out"
          >
            {articles.map((article) => (
              <div key={article.id} className="w-full flex-shrink-0 px-4">
                <ArticleCard article={article} onClick={handleArticleClick} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

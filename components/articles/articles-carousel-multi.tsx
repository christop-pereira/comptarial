"use client"

import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { ArticleCard } from "./articles-card"
import { useArticles } from "@/hooks/use-articles"

export function ArticlesCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const { articles, handleArticleClick } = useArticles()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkScreen()
    window.addEventListener("resize", checkScreen)
    return () => window.removeEventListener("resize", checkScreen)
  }, [])

  const totalSlides = isMobile
    ? articles.length
    : Math.ceil(articles.length / 3)

  const showArrows = totalSlides > 1

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  const getCurrentIndicator = () => {
    const maxDots = 5
    const itemsPerIndicator = Math.ceil(totalSlides / maxDots)
    return Math.floor(currentSlide / itemsPerIndicator)
  }

  const goToIndicator = (indicatorIndex: number) => {
    const maxDots = 5
    const itemsPerIndicator = Math.ceil(totalSlides / maxDots)
    const target = indicatorIndex * itemsPerIndicator
    setCurrentSlide(Math.min(target, totalSlides - 1))
  }

  const indicatorsCount = Math.min(totalSlides, 5)

  return (
    <div className="relative max-w-7xl mx-auto">
      {/* Flèches de navigation */}
      {showArrows && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors"
            aria-label="Article précédent"
          >
            <ChevronLeft className="h-6 w-6 text-primary" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors"
            aria-label="Article suivant"
          >
            <ChevronRight className="h-6 w-6 text-primary" />
          </button>
        </>
      )}

      {/* Carrousel */}
      <div className="overflow-hidden mx-12">
        {/* Desktop view */}
        {!isMobile && (
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {Array.from({ length: Math.ceil(articles.length / 3) }).map((_, slideIndex) => (
              <div key={slideIndex} className="w-full flex-shrink-0">
                <div
                  className={`grid gap-6 px-4 ${
                    articles.length < 3
                      ? "grid-cols-1 sm:grid-cols-1 md:grid-cols-" + articles.length + " justify-center"
                      : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
                  }`}
                >
                  {articles.slice(slideIndex * 3, slideIndex * 3 + 3).map((article) => (
                    <ArticleCard key={article.id} article={article} onClick={handleArticleClick} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Mobile view */}
        {isMobile && (
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {articles.map((article) => (
              <div key={article.id} className="w-full flex-shrink-0 px-4">
                <ArticleCard article={article} onClick={handleArticleClick} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pagination (max 5 points) */}
      {totalSlides > 1 && (
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: indicatorsCount }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToIndicator(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                getCurrentIndicator() === index ? "bg-primary" : "bg-gray-300"
              }`}
              aria-label={`Aller au groupe ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

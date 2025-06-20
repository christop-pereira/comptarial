"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { ArticleCard } from "./articles-card"
import { useArticles } from "@/hooks/use-articles"

export function ArticlesCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const { articles, handleArticleClick } = useArticles()

  const nextSlide = () => {
    // Sur mobile : navigation article par article
    if (window.innerWidth < 768) {
      setCurrentSlide((prev) => (prev + 1) % articles.length)
    } else {
      // Sur desktop : navigation par groupe de 3
      setCurrentSlide((prev) => (prev + 1) % Math.ceil(articles.length / 3))
    }
  }

  const prevSlide = () => {
    // Sur mobile : navigation article par article
    if (window.innerWidth < 768) {
      setCurrentSlide((prev) => (prev - 1 + articles.length) % articles.length)
    } else {
      // Sur desktop : navigation par groupe de 3
      setCurrentSlide((prev) => (prev - 1 + Math.ceil(articles.length / 3)) % Math.ceil(articles.length / 3))
    }
  }

  // Fonction pour calculer l'indicateur actuel pour desktop
  const getCurrentDesktopIndicator = () => {
    const totalSlides = Math.ceil(articles.length / 3)
    if (totalSlides <= 5) return currentSlide

    const articlesPerIndicator = Math.ceil(totalSlides / 5)
    return Math.floor(currentSlide / articlesPerIndicator)
  }

  // Fonction pour calculer l'indicateur actuel pour mobile
  const getCurrentMobileIndicator = () => {
    if (articles.length <= 5) return currentSlide

    const articlesPerIndicator = Math.ceil(articles.length / 5)
    return Math.floor(currentSlide / articlesPerIndicator)
  }

  // Fonction pour naviguer vers un indicateur spécifique (desktop)
  const goToDesktopIndicator = (indicatorIndex: number) => {
    const totalSlides = Math.ceil(articles.length / 3)
    if (totalSlides <= 5) {
      setCurrentSlide(indicatorIndex)
    } else {
      const articlesPerIndicator = Math.ceil(totalSlides / 5)
      const targetSlide = indicatorIndex * articlesPerIndicator
      setCurrentSlide(Math.min(targetSlide, totalSlides - 1))
    }
  }

  // Fonction pour naviguer vers un indicateur spécifique (mobile)
  const goToMobileIndicator = (indicatorIndex: number) => {
    if (articles.length <= 5) {
      setCurrentSlide(indicatorIndex)
    } else {
      const articlesPerIndicator = Math.ceil(articles.length / 5)
      const targetSlide = indicatorIndex * articlesPerIndicator
      setCurrentSlide(Math.min(targetSlide, articles.length - 1))
    }
  }

  return (
    <div className="relative max-w-7xl mx-auto">
      {/* Boutons de navigation */}
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

      {/* Conteneur du carrousel */}
      <div className="overflow-hidden mx-12">
        {/* Desktop: 3 articles par slide */}
        <div className="hidden md:block">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {Array.from({ length: Math.ceil(articles.length / 3) }).map((_, slideIndex) => (
              <div key={slideIndex} className="w-full flex-shrink-0">
                <div className="grid grid-cols-3 gap-6 px-4">
                  {articles.slice(slideIndex * 3, slideIndex * 3 + 3).map((article) => (
                    <ArticleCard key={article.id} article={article} onClick={handleArticleClick} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: 1 article par slide */}
        <div className="block md:hidden">
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
        </div>
      </div>

      {/* Indicateurs de pagination */}
      <div className="flex justify-center mt-8 space-x-2">
        {/* Desktop: pagination intelligente - maximum 5 points */}
        <div className="hidden md:flex space-x-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToDesktopIndicator(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                getCurrentDesktopIndicator() === index ? "bg-primary" : "bg-gray-300"
              }`}
              aria-label={`Aller au groupe ${index + 1}`}
            />
          ))}
        </div>

        {/* Mobile: pagination intelligente - maximum 5 points */}
        <div className="flex md:hidden space-x-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToMobileIndicator(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                getCurrentMobileIndicator() === index ? "bg-primary" : "bg-gray-300"
              }`}
              aria-label={`Aller au groupe ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

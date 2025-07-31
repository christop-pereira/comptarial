"use client"

import Image from "next/image"
import { ExternalLink } from "lucide-react"

interface Article {
  id: number
  title: string
  date: string
  description: string
  pdfUrl: string
}

interface ArticleCardProps {
  article: Article
  onClick: (pdfUrl: string) => void
}

export function ArticleCard({ article, onClick }: ArticleCardProps) {
  return (
    <div
      className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group"
      onClick={() => onClick(article.pdfUrl)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors md:line-clamp-2">
            {article.title}
          </h3>
          <p className="text-sm text-gray-500 mb-3">{article.date}</p>
          <p className="text-muted-foreground text-sm leading-relaxed">{article.description}</p>
        </div>
        <ExternalLink className="h-4 w-4 text-primary ml-3 group-hover:scale-110 transition-transform flex-shrink-0" />
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <span className="text-xs text-primary font-medium">Lire l'article complet</span>
        <div className="bg-primary/10 p-1.5 rounded-full">
          <Image src="pdf1.webp" alt="PDF" width={12} height={12} className="w-3 h-3" />
        </div>
      </div>
    </div>
  )
}

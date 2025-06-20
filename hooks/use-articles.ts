export interface Article {
  id: number
  title: string
  date: string
  description: string
  pdfUrl: string
}

const articlesData: Article[] = [
  {
    id: 1,
    title: "Comment cotiser à l'AVS ? (Guide pratique)",
    date: "18 Juin 2025",
    description: "Découvrez les changements importants en matière de fiscalité pour cette année.",
    pdfUrl: "cotisations-AVS.pdf",
  }
]

export function useArticles() {
  const handleArticleClick = (pdfUrl: string) => {
    window.open(pdfUrl, "_blank")
  }

  return {
    articles: articlesData,
    handleArticleClick,
  }
}

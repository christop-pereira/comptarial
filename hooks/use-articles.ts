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
    description: "Découvrez vos obligations en matière d'AVS de 18 à 65 ans.",
    pdfUrl: "cotisations-AVS.pdf",
  },
  {
    id: 2,
    title: "10 Conseils pour démarrer votre activité",
    date: "30 Juin 2025",
    description: "Lancez votre activité en toute confiance grâce à 10 conseils essentiels.",
    pdfUrl: "10conseils-pour-demarrer.pdf",
  },
  {
    id: 3,
    title: "5 Points clés pour une routine de suivi comptable",
    date: "15 Juillet 2025",
    description: "Gardez le contrôle de votre comptabilité avec 5 gestes simples et essentiels",
    pdfUrl: "5points-clés-routine.pdf",
  }
]

export function useArticles() {
  const sortedArticles = [...articlesData].sort((a, b) => b.id - a.id)

  const handleArticleClick = (pdfUrl: string) => {
    window.open(pdfUrl, "_blank")
  }

  return {
    articles: sortedArticles,
    handleArticleClick,
  }
}

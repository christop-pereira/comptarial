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
    title: "Nouvelles réglementations fiscales 2024",
    date: "15 Janvier 2024",
    description: "Découvrez les changements importants en matière de fiscalité pour cette année.",
    pdfUrl: "/documents/reglementations-fiscales-2024.pdf",
  },
  {
    id: 2,
    title: "Guide de la digitalisation comptable",
    date: "8 Janvier 2024",
    description: "Comment moderniser votre comptabilité avec les outils numériques.",
    pdfUrl: "/documents/guide-digitalisation-comptable.pdf",
  },
  {
    id: 3,
    title: "Optimisation fiscale pour PME",
    date: "22 Décembre 2023",
    description: "Stratégies légales pour réduire votre charge fiscale.",
    pdfUrl: "/documents/optimisation-fiscale-pme.pdf",
  },
  {
    id: 4,
    title: "Gestion de la TVA en Suisse",
    date: "10 Décembre 2023",
    description: "Tout ce qu'il faut savoir sur la TVA suisse en 2024.",
    pdfUrl: "/documents/gestion-tva-suisse.pdf",
  },
  {
    id: 5,
    title: "Nouvelles normes comptables internationales",
    date: "5 Décembre 2023",
    description: "Impact des nouvelles normes IFRS sur votre entreprise.",
    pdfUrl: "/documents/normes-comptables-internationales.pdf",
  },
  {
    id: 6,
    title: "Déclarations sociales 2024",
    date: "28 Novembre 2023",
    description: "Calendrier et nouveautés des déclarations sociales.",
    pdfUrl: "/documents/declarations-sociales-2024.pdf",
  },
  {
    id: 7,
    title: "Audit interne : bonnes pratiques",
    date: "20 Novembre 2023",
    description: "Comment mettre en place un audit interne efficace.",
    pdfUrl: "/documents/audit-interne-bonnes-pratiques.pdf",
  },
  {
    id: 8,
    title: "Financement des entreprises en 2024",
    date: "15 Novembre 2023",
    description: "Les nouvelles solutions de financement disponibles.",
    pdfUrl: "/documents/financement-entreprises-2024.pdf",
  },
  {
    id: 9,
    title: "Contrôle fiscal : comment se préparer",
    date: "8 Novembre 2023",
    description: "Guide pratique pour anticiper un contrôle fiscal.",
    pdfUrl: "/documents/controle-fiscal-preparation.pdf",
  },
  {
    id: 10,
    title: "Comptabilité analytique moderne",
    date: "1 Novembre 2023",
    description: "Outils et méthodes pour une comptabilité analytique efficace.",
    pdfUrl: "/documents/comptabilite-analytique-moderne.pdf",
  },
  {
    id: 11,
    title: "Gestion des stocks et valorisation",
    date: "25 Octobre 2023",
    description: "Méthodes de valorisation des stocks selon les normes.",
    pdfUrl: "/documents/gestion-stocks-valorisation.pdf",
  },
  {
    id: 12,
    title: "Transformation digitale comptable",
    date: "18 Octobre 2023",
    description: "Les étapes clés de la digitalisation comptable.",
    pdfUrl: "/documents/transformation-digitale-comptable.pdf",
  },
  {
    id: 13,
    title: "Réforme de la fiscalité des entreprises",
    date: "12 Octobre 2023",
    description: "Analyse des impacts de la réforme fiscale sur les PME.",
    pdfUrl: "/documents/reforme-fiscalite-entreprises.pdf",
  },
  {
    id: 14,
    title: "Gestion de trésorerie optimisée",
    date: "5 Octobre 2023",
    description: "Techniques avancées pour optimiser votre trésorerie.",
    pdfUrl: "/documents/gestion-tresorerie-optimisee.pdf",
  },
  {
    id: 15,
    title: "Conformité RGPD en comptabilité",
    date: "28 Septembre 2023",
    description: "Comment assurer la conformité RGPD dans vos processus comptables.",
    pdfUrl: "/documents/conformite-rgpd-comptabilite.pdf",
  },
  {
    id: 16,
    title: "Intelligence artificielle en comptabilité",
    date: "20 Septembre 2023",
    description: "L'IA révolutionne les pratiques comptables traditionnelles.",
    pdfUrl: "/documents/ia-comptabilite.pdf",
  },
  {
    id: 17,
    title: "Consolidation des comptes : guide pratique",
    date: "15 Septembre 2023",
    description: "Méthodologie complète pour la consolidation comptable.",
    pdfUrl: "/documents/consolidation-comptes-guide.pdf",
  },
  {
    id: 18,
    title: "Évaluation d'entreprise : nouvelles méthodes",
    date: "8 Septembre 2023",
    description: "Techniques modernes d'évaluation d'entreprise.",
    pdfUrl: "/documents/evaluation-entreprise-methodes.pdf",
  },
  {
    id: 19,
    title: "Comptabilité environnementale",
    date: "1 Septembre 2023",
    description: "Intégrer les enjeux environnementaux dans votre comptabilité.",
    pdfUrl: "/documents/comptabilite-environnementale.pdf",
  },
  {
    id: 20,
    title: "Blockchain et comptabilité",
    date: "25 Août 2023",
    description: "Impact de la blockchain sur les pratiques comptables futures.",
    pdfUrl: "/documents/blockchain-comptabilite.pdf",
  },
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

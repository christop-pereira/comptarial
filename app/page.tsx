"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { toast, Toaster } from "sonner"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Menu, X, Phone, Mail, MapPin, CheckCircle, AlertCircle, Facebook, Instagram, Linkedin } from "lucide-react"
import { ArticlesCarousel } from "@/components/articles/articles-carousel"
import { ArrowUp } from "lucide-react"
import { FadeInSection } from "@/components/FadeInSection"

export default function Home() {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [activeSection, setActiveSection] = useState("accueil")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Handle scroll and update active section
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 200)
      const sections = document.querySelectorAll("section")
      const scrollPosition = window.scrollY + window.innerHeight / 3

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect()
        const sectionTop = rect.top + window.scrollY
        const sectionHeight = section.offsetHeight
        const sectionId = section.getAttribute("id") || ""

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId)
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    setIsMenuOpen(false)
    const section = document.getElementById(sectionId)
    if (section) {
      const yOffset = -90
      const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: "smooth" })
    }
  }


  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const form = e.currentTarget
    const formData = new FormData(form)

    const name = formData.get("name")?.toString().trim() || "";
    const email = formData.get("email")?.toString().trim() || "";
    const message = formData.get("message")?.toString().trim() || "";

    if (!name || !email || !message) {
      toast.error("Veuillez remplir tous les champs.", {
        icon: <AlertCircle className="h-5 w-5" />,
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ name, email, message })
      });

      const result = await response.json();

      if (!response.ok) {
        console.error(result);
        throw new Error(result.error || "Erreur lors de l'envoi du message.");
      }

      toast.success("Message envoyé !", {
        description: "Nous vous répondrons dans les plus brefs délais.",
        icon: <CheckCircle className="h-5 w-5" />,
      })
      form.reset()
    } catch (error) {
      toast.error("Une erreur est survenue", {
        description: "Veuillez vérifier votre connexion et réessayer.",
        icon: <AlertCircle className="h-5 w-5" />,
      })
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInstagramClick = () => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      window.location.href = "instagram://user?username=rosa.damasi.o";
      setTimeout(() => {
        window.location.href = "https://www.instagram.com/rosa.damasi.o";
      }, 1000);
    } else {
      window.open("https://www.instagram.com/rosa.damasi.o", "_blank");
    }
  };

  const handleFacebookClick = () => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      window.location.href = "fb://page/100063735014393";
      setTimeout(() => {
        window.location.href = "https://www.facebook.com/comptarial";
      }, 1000);
    } else {
      window.open("https://www.facebook.com/comptarial", "_blank");
    }
  };

  const handleLinkedinClick = () => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      window.location.href = "linkedin://in/rosa-damasio-19a148b6";
      setTimeout(() => {
        window.location.href = "https://ch.linkedin.com/in/rosa-damasio-19a148b6";
      }, 1000);
    } else {
      window.open("https://ch.linkedin.com/in/rosa-damasio-19a148b6", "_blank");
    }
  };

  return (
    <>
      <Toaster position="bottom-right" richColors closeButton />
      <div className="min-h-screen flex flex-col">
        
        {/* Scroll to Top Button */}
        {showScrollTop && (
          <button
            onClick={() => scrollToSection("accueil")}
            className="fixed bottom-8 right-8 z-50 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary/90 transition-colors"
            aria-label="Remonter à l'accueil"
          >
            <ArrowUp className="w-6 h-6" />
          </button>
        )}

        {/* Header */}
        <header
          className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-white shadow-md py-3`}
        >
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-3 z-20">
                <div className="flex items-center gap-2 z-20 p-2 rounded-md">
                    <Image
                      src="/logo.png"
                      alt="Logo"
                      width={200}
                      height={60}
                      className="h-[70px] w-[150px] object-cover rounded-md"
                    />
                </div>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center gap-10">
                <button
                  onClick={() => scrollToSection("accueil")}
                  className={`font-medium transition-colors relative ${
                    activeSection === "accueil" ? "text-primary" : "hover:text-primary"
                  }`}
                >
                  Accueil
                  {activeSection === "accueil" && (
                    <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-primary rounded-full"></span>
                  )}
                </button>
                <button
                  onClick={() => scrollToSection("nous")}
                  className={`font-medium transition-colors relative ${
                    activeSection === "nous" ? "text-primary" : "hover:text-primary"
                  }`}
                >
                  Nous
                  {activeSection === "nous" && (
                    <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-primary rounded-full"></span>
                  )}
                </button>
                <button
                  onClick={() => scrollToSection("services")}
                  className={`font-medium transition-colors relative ${
                    activeSection === "services" ? "text-primary" : "hover:text-primary"
                  }`}
                >
                  Services
                  {activeSection === "services" && (
                    <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-primary rounded-full"></span>
                  )}
                </button>
                <button
                  onClick={() => scrollToSection("actualites")}
                  className={`font-medium transition-colors relative ${
                    activeSection === "actualites" ? "text-primary" : "hover:text-primary"
                  }`}
                >
                  Actualités
                  {activeSection === "actualites" && (
                    <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-primary rounded-full"></span>
                  )}
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className={`font-medium transition-colors relative ${
                    activeSection === "contact" ? "text-primary" : "hover:text-primary"
                  }`}
                >
                  Contact
                  {activeSection === "contact" && (
                    <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-primary rounded-full"></span>
                  )}
                </button>
              </nav>

              {/* Social Media Links & Mobile Menu Button */}
              <div className="flex items-center gap-4">
                {/* Social Media Links - Desktop */}
                <div className="hidden md:flex items-center gap-3">
                  <button
                    onClick={handleFacebookClick}
                    className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
                    aria-label="Facebook"
                    type="button"
                  >
                    <Facebook className="h-4 w-4 text-primary" />
                  </button>
                  <button
                    onClick={handleInstagramClick}
                    className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
                    aria-label="Instagram"
                    type="button"
                  >
                    <Instagram className="h-4 w-4 text-primary" />
                  </button>
                  <button
                    onClick={handleLinkedinClick}
                    className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
                    aria-label="LinkedIn"
                    type="button"
                  >
                    <Linkedin className="h-4 w-4 text-primary" />
                  </button>
                </div>

                {/* Mobile Menu Button */}
                <button
                  className="md:hidden z-20 p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                >
                  {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            className={`fixed inset-0 bg-white/95 backdrop-blur-sm z-10 flex flex-col items-center justify-center gap-8 transition-all duration-300 ${
              isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
            } md:hidden`}
          >
            <button
              onClick={() => scrollToSection("accueil")}
              className={`text-2xl font-medium transition-colors ${activeSection === "accueil" ? "text-primary" : ""}`}
            >
              Accueil
            </button>
            <button
              onClick={() => scrollToSection("nous")}
              className={`text-2xl font-medium transition-colors ${activeSection === "nous" ? "text-primary" : ""}`}
            >
              Nous
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className={`text-2xl font-medium transition-colors ${activeSection === "services" ? "text-primary" : ""}`}
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection("actualites")}
              className={`text-2xl font-medium transition-colors ${activeSection === "actualites" ? "text-primary" : ""}`}
            >
              Actualités
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className={`text-2xl font-medium transition-colors ${activeSection === "contact" ? "text-primary" : ""}`}
            >
              Contact
            </button>

            {/* Social Media Links - Mobile */}
            <div className="flex items-center gap-4 mt-4">
              <button
                onClick={handleFacebookClick}
                className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
                aria-label="Facebook"
                type="button"
              >
                <Facebook className="h-4 w-4 text-primary" />
              </button>
              <button
                onClick={handleInstagramClick}
                className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
                aria-label="Instagram"
                type="button"
              >
                <Instagram className="h-4 w-4 text-primary" />
              </button>
              <button
                onClick={handleLinkedinClick}
                className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
                aria-label="LinkedIn"
                type="button"
              >
                <Linkedin className="h-4 w-4 text-primary" />
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1">
          {/* Accueil */}
          <FadeInSection>
          <section id="accueil" className="min-h-screen flex items-center relative bg-gradient-to-br from-gray-50 to-gray-100 pt-16">
            <div className="container px-4 py-20">
              <div className="grid md:grid-cols-2 items-center gap-20">
                {/* Texte à gauche */}
                <div className="space-y-6 animate-fade-in">
                  <h1 className="text-5xl font-bold leading-tight">
                    Bienvenue chez <span className="text-primary">Comptarial</span>
                  </h1>
                  <p className="text-xl text-muted-foreground">Une fiduciaire moderne à votre écoute.</p>
                  <p className="text-muted-foreground text-lg">
                    Nous proposons des solutions sur mesure, flexibles et efficaces, adaptées à chaque situation.
                    Restez informé grâce à nos actualités, conçues pour être claires et accessibles.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Button size="lg" className="w-full sm:w-auto" onClick={() => scrollToSection("contact")}>
                      Contactez-nous
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full sm:w-auto"
                      onClick={() => scrollToSection("actualites")}
                    >
                      Découvrir nos actualités
                    </Button>
                  </div>
                </div>

                {/* Image à droite */}
                <div className="rounded-2xl shadow-2xl overflow-hidden transform hover:scale-[1.02] transition-transform duration-300">
                  <Image
                    src="/test.jpeg"
                    alt="Image d'accueil"
                    width={500}
                    height={400}
                    className="w-full h-[400px] object-cover"
                  />
                </div>
              </div>
            </div>
          </section>
          </FadeInSection>

          {/* Nous */}
          <FadeInSection>
          <section id="nous" className="min-h-screen flex items-center relative bg-gradient-to-br from-orange-50 to-orange-100 pt-16">
            <div className="container mx-auto px-4 py-20">
              <div className="grid md:grid-cols-2 items-center gap-20">
            {/* Image à gauche */}
            <div className="rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-300 order-2 md:order-1">
              <Image
                src="/Nous.jpeg"
                alt="Notre équipe"
                width={500}
                height={400}
                className="w-full h-[400px] object-cover"
              />
            </div>


                {/* Texte à droite */}
                <div className="space-y-6 order-1 md:order-2">
                  <h2 className="text-4xl font-bold">À Propos de Nous</h2>
                  <div className="h-1 w-20 bg-primary rounded-full"></div>
                  <p className="text-xl text-muted-foreground">
                    Notre passion au service de vos besoins.
                  </p>
                  <p className="text-muted-foreground text-lg">
                    À l’écoute de nos clients, nous adoptons une approche globale, personnalisée et adaptée à chaque
                    situation.
                    En tant que partenaire de confiance, nous vous accompagnons au plus proche de vos intérêts, avec un
                    souci constant de rigueur, transparence et réactivité.
                    Nous privilégions des relations durables, fondées sur l’échange, la disponibilité et la confidentialité.
                  </p>
                  <p className="text-muted-foreground text-lg">
                    Notre fonctionnement repose principalement sur le travail à distance, afin de vous garantir une gestion
                    fluide, flexible et efficace.
                    Grâce à la formation continue et à une veille active sur les évolutions légales, comptables, fiscales,
                    salariales et administratives, nous restons à la hauteur des exigences actuelles.
                    Chaque client étant unique, nous adaptons nos solutions à vos besoins réels et à vos objectifs
                    professionnels ou personnels.
                  </p>


                  {/* Social Media Links dans la section À Propos */}
                  <div className="pt-6">
                    <p className="text-sm font-medium text-gray-700 mb-3">Suivez-nous sur nos réseaux sociaux :</p>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={handleFacebookClick}
                        className="flex items-center gap-2 p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors group"
                        aria-label="Facebook"
                        type="button"
                      >
                        <Facebook className="h-4 w-4 text-primary" />
                      </button>
                      <button
                        onClick={handleInstagramClick}
                        className="flex items-center gap-2 p-3 rounded-lg bg-pink-50 hover:bg-pink-100 transition-colors group"
                        aria-label="Instagram"
                        type="button"
                      >
                        <Instagram className="h-4 w-4 text-primary" />
                      </button>
                      <button
                        onClick={handleLinkedinClick}
                        className="flex items-center gap-2 p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors group"
                        aria-label="LinkedIn"
                        type="button"
                      >
                        <Linkedin className="h-4 w-4 text-primary" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          </FadeInSection>

          {/* Services */}
          <FadeInSection>
          <section id="services" className="min-h-screen flex items-center relative bg-gradient-to-br from-gray-50 to-gray-100 pt-20">
            <div className="container mx-auto px-4 py-10">
              <div className="text-center max-w-3xl mx-auto mb-10">
                <h2 className="text-4xl font-bold">Nos Services</h2>
                <div className="h-1 w-20 bg-primary rounded-full mx-auto my-4"></div>
                <p className="text-lg text-muted-foreground">
                  Chaque situation étant unique, nos honoraires varient de CHF 90.- à CHF 250.- par heure
                  en fonction des prestations à effectuer. Un devis personnalisé vous est fourni sur demande.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 items-start">
                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col">
                  <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <Image
                      src="/comptabilite.webp"
                      alt="Comptabilité"
                      width={24}
                      height={24}
                      className="w-6 h-6 rounded-full"
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Comptabilité</h3>
                  <p className="text-muted-foreground mb-4 text-sm">
                    Nous vous accompagnons dans la gestion complète de votre comptabilité, 
                    pour que vous puissiez vous concentrer sur votre activité.
                  </p>

                  <Accordion type="single" collapsible>
                    <AccordionItem value="comptabilite" className="border-b-0">
                      <AccordionTrigger className="text-primary py-1 px-0 text-sm">En savoir plus</AccordionTrigger>
                      <AccordionContent className="text-sm">
                        <p className="mt-2">Nos prestations incluent :</p>
                        <ul className="list-disc pl-5 space-y-1 mt-3">
                          <li>Procédure d’ouverture comptable (reprise de la comptabilité selon la législation en vigueur)</li>
                          <li>Saisie informatique des écritures (tenue comtpable sur logiciel adapté à votre structure)</li>
                          <li>Procédures de bouclement (clôture annuelle avec contrôle, régularisations et préparations aux obligations fiscales)</li>
                          <li>Clôture annuelle avec contrôle, régularisations et préparation aux obligations fiscales</li>
                          <li>Établissement des états financiers (bilan, compte de résultat, annexes selon les exigences légales)</li>
                          <li>Décomptes TVA (méthodes effective, taux de la dette fiscale nette)</li>
                          <li>Décompte de concordance annuelle (vérification entre comptablité et TVA déclarée)</li>
                          <li>Accompagnement lors de contrôles des administrations (préparation, gestion et suivi des vérifications fiscales ou sociales)</li>
                        </ul>
                        <p className="mt-3">Nous mettons tout en oeuvre pour vous garantir une comptabilité fiable, à jour et conforme, 
                        afin que vous puissiez prendre les meilleures décisions en toute sénérité.</p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col">
                  <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <Image src="/dollar.webp" alt="Paie" width={24} height={24} className="w-6 h-6 rounded-full" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Salaires et gestion du personnel</h3>
                  <p className="text-muted-foreground mb-4 text-sm">
                    Nous vous accompagnons dans la gestions administrative de vos collaborateurs avec discrétion et en conformité aux obligations légales.
                  </p>

                  <Accordion type="single" collapsible>
                    <AccordionItem value="salaires" className="border-b-0">
                      <AccordionTrigger className="text-primary py-1 px-0 text-sm">En savoir plus</AccordionTrigger>
                      <AccordionContent className="text-sm">
                        <p className="mt-2">Nos prestations incluent :</p>
                        <ul className="list-disc pl-5 space-y-1 mt-3">
                          <li>Établissement des fiches de salaires (calcul précis et conformes aux conventions applicables)</li>
                          <li>Déclarations annuelles aux assurances sociales (coordination et envoi des données aux caisses : AVS, LPP, LAA, etc.)</li>
                          <li>Établissement des certificats de salaire pour vos collaborateurs</li>
                          <li>Gestion complète des procédures d’engagement, de départ et de licenciement</li>
                          <li>Affiliation aux assurances sociales (mise en place des affiliations obligatoires dès l’embauche)</li>
                          <li>Rédaction des contrats de travail conformes au droit suisse du travail</li>
                          <li>Gestion administrative du personnel (suivi des absences, des vacances, des documents, etc.)</li>
                        </ul>
                        <p className="mt-3">
                          Confiez‑nous la gestion de vos salaires et de votre personnel pour un suivi précis, conforme et sans stress,
                          vous permettant de vous concentrer pleinement sur le développement de votre activité.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col">
                  <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <Image src="/profil.webp" alt="Conseil" width={24} height={24} className="w-6 h-6 rounded-full" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Fiscalité</h3>
                  <p className="text-muted-foreground mb-4 text-sm">
                    Que vous soyez un particulier, un indépendant ou une entreprise, nous vous accompagnons dans toutes vos démarches fisacles 
                    avec précision, confidentialité et clarté.
                  </p>

                  <Accordion type="single" collapsible>
                    <AccordionItem value="fiscalite" className="border-b-0">
                      <AccordionTrigger className="text-primary py-1 px-0 text-sm">En savoir plus</AccordionTrigger>
                      <AccordionContent className="text-sm">
                        <p className="mt-2">Nos prestations incluent :</p>
                        <ul className="list-disc pl-5 space-y-1 mt-3">
                          <li>Déclaration d'impôt pour personnes physiques (optimisation selon revenus et charges)</li>
                          <li>Déclaration d'impôt pour indépendants (prise en compte des spécificités de l'activité)</li>
                          <li>Gestion des cas particuliers : personnes à charge supplémentaires, étudiants, biens immobiliers, titres et placements</li>
                          <li>Rectification de l'impôt à la source (demandes de rectification et suivi auprès des autorités fiscales)</li>
                          <li>Déclaration pour personnes morales (établissement des déclarations pour sociétés, fondations ou associations)</li>
                        </ul>
                        <p className="mt-3">
                          Nous veillons au respect des délais légaux et assurons, si nécessaire, la représentation auprès des
                          autorités fiscales pour défendre au mieux vos intérêts.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mt-6 items-start">
                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col">
                  <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <Image
                      src="/argent.webp"
                      alt="Déclarations"
                      width={24}
                      height={24}
                      className="w-6 h-6 rounded-full"
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Services administratifs</h3>
                  <p className="text-muted-foreground mb-4 text-sm">
                    Nous vous soutenons dans toutes vos démarches administratives, qu'elles soient ponctuelles ou régulières,
                    avec réactivité, rigueur et discrétion.
                  </p>

                  <Accordion type="single" collapsible>
                    <AccordionItem value="admin" className="border-b-0">
                      <AccordionTrigger className="text-primary py-1 px-0 text-sm">En savoir plus</AccordionTrigger>
                      <AccordionContent className="text-sm">
                        <p className="mt-2">Nos prestations incluent :</p>
                        <ul className="list-disc pl-5 space-y-1 mt-3">
                          <li>Rédaction de courriers et documents officiels adaptés à chaque situation</li>
                          <li>Rédaction et vérification de contrats commerciaux adaptés à vos activités</li>
                          <li>Gestion des débiteurs et créanciers (suivi des factures, relances, échéanciers)</li>
                          <li>Création d’entreprise (dès la planification)</li>
                          <li>Préparation des dossiers en vue de contrôles (fiscaux ou administratifs)</li>
                          <li>Classement physique ou numérique des documents pour un accès rapide</li>
                          <li>Élaboration de tableurs personnalisés adaptés à vos besoins de suivi</li>
                          <li>Modification des acomptes et contrôle des bordereaux fiscaux auprès des administrations</li>
                          <li>Rédaction de réclamations structurées et argumentées pour défendre vos intérêts</li>
                        </ul>
                        <p className="mt-3">
                          Que ce soit pour alléger votre charge administrative ou fiabiliser vos procédures, nous sommes à vos côtés
                          avec des solutions pratiques et adaptées à vos besoins spécifiques.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col">
                  <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <Image src="/pdf.webp" alt="Documents" width={24} height={24} className="w-6 h-6 rounded-full" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Gestion des documents</h3>
                  <p className="text-muted-foreground mb-4 text-sm">
                    Nous vous aidons à organiser, sécuriser et centraliser vos documents fiscaux, comptables et administratifs pour une gestion
                    simplifiée et conforme aux éxigences.
                  </p>

                  <Accordion type="single" collapsible>
                    <AccordionItem value="documents" className="border-b-0">
                      <AccordionTrigger className="text-primary py-1 px-0 text-sm">En savoir plus</AccordionTrigger>
                      <AccordionContent className="text-sm">
                        <p className="mt-2">Nos prestations incluent :</p>
                        <ul className="list-disc pl-5 space-y-1 mt-3">
                          <li>Numérisation de vos documents fiscaux et comptables pour un accès rapide</li>
                          <li>Classement structuré des fichiers selon vos besoins spécifiques</li>
                          <li>Mise à disposition d’un espace partagé sécurisé pour vos documents</li>
                          <li>Archivage selon les normes en vigueur (conservation légale des documents)</li>
                          <li>Assistance à la transition vers une gestion sans papier</li>
                          <li>Suivi des échéances documentaires (renouvellement des déclarations, contrats, assurances, etc.)</li>
                        </ul>
                        <p className="mt-3">
                          Grâce à une gestion documentaire professionnelle, vous gagnez en sérénité, en efficacité ainsi qu'en
                          conformité vis‑à‑vis des obligations légales.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
            </div>
          </section>
          </FadeInSection>

          {/* Nos Actualités */}
          <FadeInSection>
          <section id="actualites" className="min-h-screen flex items-center relative bg-gradient-to-br from-orange-50 to-orange-100 pt-16">
            <div className="container mx-auto px-4 py-20">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <h2 className="text-4xl font-bold">Nos Actualités</h2>
                <div className="h-1 w-20 bg-primary rounded-full mx-auto my-4"></div>
                <p className="text-lg text-muted-foreground">
                  Restez informé des dernières actualités comptables, fiscales et réglementaires, pour particuliers 
                  comme pour entreprises, et bénéficiez de conseils pratiques pour vous accompagner au quotidien.
                </p>
              </div>

              <ArticlesCarousel />
            </div>
          </section>
          </FadeInSection>

          {/* Contact */}
          <FadeInSection>
          <section id="contact" className="min-h-screen flex items-center bg-gradient-to-br from-gray-50 to-gray-100 pt-16">
            <div className="container mx-auto px-4 py-20">
              <div className="grid md:grid-cols-2 gap-16 items-start max-w-6xl mx-auto">
                {/* Left column - Contact */}
                <div className="space-y-6">
                  <h2 className="text-4xl font-bold">Contact</h2>
                  <div className="h-1 w-20 bg-primary rounded-full mb-6"></div>
                  <p className="text-muted-foreground text-lg">
                    Nous sommes à votre écoute et prêts à répondre à toutes vos questions. Notre équipe s&apos;engage à
                    vous répondre rapidement.
                  </p>

                  <div className="space-y-6 mt-10">
                    <div className="flex items-center gap-4">
                      <div className="bg-primary rounded-full p-3 text-white">
                        <Phone className="w-5 h-5" />
                      </div>
                      <a href="tel:+41227940432" className="text-lg">
                        +41 22 794 04 32
                      </a>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="bg-primary rounded-full p-3 text-white">
                        <Mail className="w-5 h-5" />
                      </div>
                      <a href="mailto:rosa@comptarial.ch" className="text-lg">
                        rosa@comptarial.ch
                      </a>
                    </div>
                  </div>
                </div>

                {/* Right column - Form */}
                <div>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block font-medium mb-2">
                        Nom
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                        placeholder="Prénom NOM"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block font-medium mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                        placeholder="Email"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block font-medium mb-2">
                        Message
                      </label>
                      <textarea
                        name="message"
                        id="message"
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                        rows={5}
                        placeholder="Ecrivez votre message ici"
                      />
                    </div>

                    <div className="flex items-start gap-2">
                      <input type="checkbox" id="privacy" name="privacy" className="mt-1" required />
                      <label htmlFor="privacy" className="text-sm text-gray-600">
                        En sélectionnant cette option, vous acceptez notre{" "}
                        <Link href="/privacy-policy" className="text-primary underline">
                          Politique de confidentialité
                        </Link>
                        .
                      </label>
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-primary hover:bg-primary/90 text-white"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Envoi en cours..." : "Envoyer"}
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </section>
          </FadeInSection>
        </main>

        {/* Footer */}
        <footer className="py-12 bg-gray-900 text-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 z-20">
                  <div className="flex items-center gap-2 z-20">
                    <div className="p-2 rounded-md">
                      <Image
                        src="/logo.png"
                        alt="Logo"
                        width={200}
                        height={60}
                      className="h-[70px] w-[150px] object-cover rounded-md"
                      />
                    </div>
                  </div>
                </Link>
                <p className="text-gray-400 mt-4">
                  Solutions adaptées à vos besoins.
                </p>

                {/* Social Media Links dans le Footer */}
                <div className="flex items-center gap-3 mt-6">
                  <button
                    onClick={handleFacebookClick}
                    className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
                    aria-label="Facebook"
                    type="button"
                  >
                    <Facebook className="h-4 w-4 text-primary" />
                  </button>
                  <button
                    onClick={handleInstagramClick}
                    className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
                    aria-label="Instagram"
                    type="button"
                  >
                    <Instagram className="h-4 w-4 text-primary" />
                  </button>
                  <button
                    onClick={handleLinkedinClick}
                    className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
                    aria-label="LinkedIn"
                    type="button"
                  >
                    <Linkedin className="h-4 w-4 text-primary" />
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-4">Liens rapides</h3>
                <ul className="space-y-2">
                  <li>
                    <button
                      onClick={() => scrollToSection("accueil")}
                      className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                    >
                      Accueil
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection("nous")}
                      className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                    >
                      À propos
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection("services")}
                      className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                    >
                      Services
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection("actualites")}
                      className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                    >
                      Nos Actualités
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection("contact")}
                      className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                    >
                      Contact
                    </button>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-4">Services</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#services" className="text-gray-400 hover:text-white transition-colors">
                      Comptabilité
                    </a>
                  </li>
                  <li>
                    <a href="#services" className="text-gray-400 hover:text-white transition-colors">
                      Salaires et gestion du personnel
                    </a>
                  </li>
                  <li>
                    <a href="#services" className="text-gray-400 hover:text-white transition-colors">
                      Fiscalité
                    </a>
                  </li>
                  <li>
                    <a href="#services" className="text-gray-400 hover:text-white transition-colors">
                      Services administratifs
                    </a>
                  </li>
                  <li>
                    <a href="#services" className="text-gray-400 hover:text-white transition-colors">
                      Gestion des documents
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-4">Légal</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">
                      Politique de confidentialité
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800 mt-12 pt-8 text-center">
              <p className="text-gray-400">© {new Date().getFullYear()} Comptarial. Tous droits réservés.</p>
              <p className="text-gray-500 text-sm mt-2">
                <a
                  href="https://www.uid.admin.ch/Detail.aspx?uid_id=CHE239928457"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  CHE-239.928.457
                </a>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

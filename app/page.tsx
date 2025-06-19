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

export default function Home() {
  const [activeSection, setActiveSection] = useState("accueil")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Handle scroll and update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section")
      const scrollPosition = window.scrollY + window.innerHeight / 3

      // Check if page is scrolled for header styling
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }

      sections.forEach((section) => {
        const sectionTop = section.offsetTop
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
      window.scrollTo({
        top: section.offsetTop,
        behavior: "smooth",
      })
    }
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const form = e.currentTarget
    const formData = new FormData(form)

    const data = {
      name: formData.get("name")?.toString() || "",
      email: formData.get("email")?.toString() || "",
      subject: formData.get("subject")?.toString() || "",
      message: formData.get("message")?.toString() || "",
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

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

  return (
    <>
      <Toaster position="bottom-right" richColors closeButton />
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <header
          className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
            scrolled ? "bg-white shadow-md py-3" : "bg-transparent py-5"
          }`}
        >
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-3 z-20">
                <div className="flex items-center gap-2 z-20">
                  <div className="bg-primary/5 p-2 rounded-md">
                    <Image
                      src="/logo.png"
                      alt="Logo"
                      width={200}
                      height={60}
                      className="h-[60px] w-auto object-contain"
                    />
                  </div>
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
                  <a
                    href="https://www.facebook.com/comptarial"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
                    aria-label="Facebook"
                  >
                    <Facebook className="h-4 w-4 text-primary" />
                  </a>
                  <a
                    href="https://www.instagram.com/comptarial"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram className="h-4 w-4 text-primary" />
                  </a>
                  <a
                    href="https://www.linkedin.com/company/comptarial"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-4 w-4 text-primary" />
                  </a>
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
              <a
                href="https://www.facebook.com/comptarial"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-6 w-6 text-primary" />
              </a>
              <a
                href="https://www.instagram.com/comptarial"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6 text-primary" />
              </a>
              <a
                href="https://www.linkedin.com/company/comptarial"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-6 w-6 text-primary" />
              </a>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1">
          {/* Accueil */}
          <section
            id="accueil"
            className="min-h-screen flex items-center relative bg-gradient-to-br from-gray-50 to-gray-100 pt-16"
          >
            <div className="container px-4 py-20">
              <div className="grid md:grid-cols-2 items-center gap-20">
                {/* Texte à gauche */}
                <div className="space-y-6 animate-fade-in">
                  <h1 className="text-5xl font-bold leading-tight">
                    Bienvenue chez <span className="text-primary">Comptarial</span>
                  </h1>
                  <p className="text-xl text-muted-foreground">La comptabilité et la gestion fiduciaire simplifiées.</p>
                  <p className="text-muted-foreground text-lg">
                    Nous avons transformé la comptabilité et la gestion fiduciaire avec des solutions numériques
                    innovantes. Grâce à notre plateforme 100% en ligne, nous vous offrons une expérience fluide, rapide
                    et transparente pour la gestion de vos finances.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Button size="lg" className="w-full sm:w-auto" onClick={() => scrollToSection("contact")}>
                      Contactez-nous
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full sm:w-auto"
                      onClick={() => scrollToSection("services")}
                    >
                      Découvrir nos services
                    </Button>
                  </div>
                </div>

                {/* Image à droite */}
                <div className="rounded-2xl shadow-2xl overflow-hidden transform hover:scale-[1.02] transition-transform duration-300">
                  <Image
                    src="/logo.png"
                    alt="Image d'accueil"
                    width={500}
                    height={400}
                    className="w-full h-[400px] object-cover"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Nous */}
          <section id="nous" className="min-h-screen flex items-center bg-white relative pt-16">
            <div className="container mx-auto px-4 py-20">
              <div className="grid md:grid-cols-2 items-center gap-16">
                {/* Image à gauche */}
                <div className="rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-300 order-2 md:order-1">
                  <Image
                    src="/logo.png"
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
                    Une équipe passionnée au service de votre réussite financière.
                  </p>
                  <p className="text-muted-foreground text-lg">
                    Nous sommes une équipe passionnée de professionnels en comptabilité et fiduciaire qui a fait le
                    choix de la transformation numérique. Notre mission est de rendre la gestion comptable plus simple,
                    accessible et transparente pour tous.
                  </p>

                  {/* Social Media Links dans la section À Propos */}
                  <div className="pt-6">
                    <p className="text-sm font-medium text-gray-700 mb-3">Suivez-nous sur nos réseaux sociaux :</p>
                    <div className="flex items-center gap-4">
                      <a
                        href="https://www.facebook.com/comptarial"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors group"
                      >
                        <Facebook className="h-5 w-5 text-blue-600" />
                        <span className="text-sm font-medium text-blue-600 group-hover:text-blue-700">Facebook</span>
                      </a>
                      <a
                        href="https://www.instagram.com/comptarial"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 p-3 rounded-lg bg-pink-50 hover:bg-pink-100 transition-colors group"
                      >
                        <Instagram className="h-5 w-5 text-pink-600" />
                        <span className="text-sm font-medium text-pink-600 group-hover:text-pink-700">Instagram</span>
                      </a>
                      <a
                        href="https://www.linkedin.com/company/comptarial"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors group"
                      >
                        <Linkedin className="h-5 w-5 text-blue-700" />
                        <span className="text-sm font-medium text-blue-700 group-hover:text-blue-800">LinkedIn</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Services */}
          <section
            id="services"
            className="min-h-screen flex items-center relative bg-gradient-to-br from-gray-50 to-gray-100 pt-20"
          >
            <div className="container mx-auto px-4 py-10">
              <div className="text-center max-w-3xl mx-auto mb-10">
                <h2 className="text-4xl font-bold">Nos Services</h2>
                <div className="h-1 w-20 bg-primary rounded-full mx-auto my-4"></div>
                <p className="text-lg text-muted-foreground">
                  Découvrez nos services numériques pensés pour les entreprises modernes. Tout est accessible en ligne,
                  où que vous soyez.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
                  <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <Image
                      src="/comptabilite.webp"
                      alt="Comptabilité"
                      width={24}
                      height={24}
                      className="w-6 h-6 rounded-full"
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Comptabilité en ligne</h3>
                  <p className="text-muted-foreground mb-4 flex-grow text-sm">
                    Suivi de vos finances en temps réel, gestion de la TVA, des bilans et des déclarations fiscales sans
                    avoir à vous déplacer.
                  </p>

                  <Accordion type="single" collapsible className="mt-auto">
                    <AccordionItem value="item-1" className="border-b-0">
                      <AccordionTrigger className="text-primary py-1 px-0 text-sm">En savoir plus</AccordionTrigger>
                      <AccordionContent className="text-sm">
                        Notre plateforme vous permet d&apos;accéder à vos données comptables 24h/24, de générer des
                        rapports personnalisés et de collaborer facilement avec notre équipe d&apos;experts.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
                  <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <Image src="/dollar.webp" alt="Paie" width={24} height={24} className="w-6 h-6 rounded-full" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Gestion de la paie numérique</h3>
                  <p className="text-muted-foreground mb-4 flex-grow text-sm">
                    Automatisation complète de la gestion des salaires, des déclarations sociales, avec une interface
                    claire et intuitive.
                  </p>

                  <Accordion type="single" collapsible className="mt-auto">
                    <AccordionItem value="item-1" className="border-b-0">
                      <AccordionTrigger className="text-primary py-1 px-0 text-sm">En savoir plus</AccordionTrigger>
                      <AccordionContent className="text-sm">
                        Notre solution de paie s&apos;adapte à toutes les tailles d&apos;entreprise et prend en charge
                        l&apos;ensemble des obligations légales, vous permettant de vous concentrer sur votre cœur de
                        métier.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
                  <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <Image src="/profil.webp" alt="Conseil" width={24} height={24} className="w-6 h-6 rounded-full" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Conseil et accompagnement personnalisé</h3>
                  <p className="text-muted-foreground mb-4 flex-grow text-sm">
                    Nos experts sont à votre disposition pour vous conseiller sur les stratégies fiscales et financières
                    adaptées à votre situation.
                  </p>

                  <Accordion type="single" collapsible className="mt-auto">
                    <AccordionItem value="item-1" className="border-b-0">
                      <AccordionTrigger className="text-primary py-1 px-0 text-sm">En savoir plus</AccordionTrigger>
                      <AccordionContent className="text-sm">
                        Bénéficiez de conseils personnalisés pour optimiser votre fiscalité, améliorer votre trésorerie
                        et prendre les meilleures décisions pour le développement de votre entreprise.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
                  <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <Image
                      src="/argent.webp"
                      alt="Déclarations"
                      width={24}
                      height={24}
                      className="w-6 h-6 rounded-full"
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Déclarations fiscales automatisées</h3>
                  <p className="text-muted-foreground mb-4 flex-grow text-sm">
                    Simplifiez vos déclarations fiscales grâce à nos outils numériques qui automatisent les calculs et
                    génèrent vos rapports fiscaux.
                  </p>

                  <Accordion type="single" collapsible className="mt-auto">
                    <AccordionItem value="item-1" className="border-b-0">
                      <AccordionTrigger className="text-primary py-1 px-0 text-sm">En savoir plus</AccordionTrigger>
                      <AccordionContent className="text-sm">
                        Notre système intelligent analyse vos données financières et prépare automatiquement vos
                        déclarations fiscales, réduisant les risques d&apos;erreur et vous faisant gagner un temps
                        précieux.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
                  <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <Image src="/pdf.webp" alt="Documents" width={24} height={24} className="w-6 h-6 rounded-full" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Gestion des documents fiscaux et comptables</h3>
                  <p className="text-muted-foreground mb-4 flex-grow text-sm">
                    Numérisez et stockez tous vos documents fiscaux et comptables dans notre système sécurisé,
                    accessible à tout moment.
                  </p>

                  <Accordion type="single" collapsible className="mt-auto">
                    <AccordionItem value="item-1" className="border-b-0">
                      <AccordionTrigger className="text-primary py-1 px-0 text-sm">En savoir plus</AccordionTrigger>
                      <AccordionContent className="text-sm">
                        Notre solution de gestion documentaire vous permet d&apos;organiser, de classer et de retrouver
                        facilement tous vos documents importants, tout en garantissant leur sécurité et leur conformité
                        légale.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
            </div>
          </section>

          {/* Nos Actualités */}
          <section id="actualites" className="min-h-screen flex items-center bg-white relative pt-16">
            <div className="container mx-auto px-4 py-20">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <h2 className="text-4xl font-bold">Nos Actualités</h2>
                <div className="h-1 w-20 bg-primary rounded-full mx-auto my-4"></div>
                <p className="text-lg text-muted-foreground">
                  Restez informé des dernières actualités comptables, fiscales et réglementaires.
                </p>
              </div>

              <ArticlesCarousel />
            </div>
          </section>

          {/* Contact */}
          <section
            id="contact"
            className="min-h-screen flex items-center bg-gradient-to-br from-gray-50 to-gray-100 pt-16"
          >
            <div className="container mx-auto px-4 py-20">
              <div className="grid md:grid-cols-2 gap-16 items-start max-w-6xl mx-auto">
                {/* Left column - Contact */}
                <div className="space-y-6">
                  <h2 className="text-4xl font-bold">Contact</h2>
                  <div className="h-1 w-20 bg-primary rounded-full mb-6"></div>
                  <p className="text-muted-foreground text-lg">
                    Nous sommes à votre écoute et prêts à répondre à toutes vos questions. Notre équipe s&apos;engage à
                    vous répondre dans les 24 heures suivant votre message.
                  </p>

                  <div className="space-y-6 mt-10">
                    <div className="flex items-center gap-4">
                      <div className="bg-primary rounded-full p-3 text-white">
                        <Phone className="w-5 h-5" />
                      </div>
                      <a href="tel:0227940432" className="text-lg">
                        022 794 04 32
                      </a>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="bg-primary rounded-full p-3 text-white">
                        <Mail className="w-5 h-5" />
                      </div>
                      <a href="mailto:contact@comptarial.ch" className="text-lg">
                        contact@comptarial.ch
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
                      <label htmlFor="subject" className="block font-medium mb-2">
                        Sujet
                      </label>
                      <input
                        name="subject"
                        id="subject"
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                        placeholder="Sujet du message"
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
        </main>

        {/* Footer */}
        <footer className="py-12 bg-gray-900 text-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 z-20">
                  <div className="flex items-center gap-2 z-20">
                    <div className="bg-primary/10 p-2 rounded-md">
                      <Image
                        src="/logo.png"
                        alt="Logo"
                        width={200}
                        height={60}
                        className="h-[60px] w-auto object-contain"
                      />
                    </div>
                  </div>
                </Link>
                <p className="text-gray-400 mt-4">
                  Solutions comptables et fiduciaires innovantes pour les entreprises modernes.
                </p>

                {/* Social Media Links dans le Footer */}
                <div className="flex items-center gap-3 mt-6">
                  <a
                    href="https://www.facebook.com/comptarial"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
                    aria-label="Facebook"
                  >
                    <Facebook className="h-5 w-5 text-blue-400" />
                  </a>
                  <a
                    href="https://www.instagram.com/comptarial"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram className="h-5 w-5 text-pink-400" />
                  </a>
                  <a
                    href="https://www.linkedin.com/company/comptarial"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-5 w-5 text-blue-300" />
                  </a>
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
                      Comptabilité en ligne
                    </a>
                  </li>
                  <li>
                    <a href="#services" className="text-gray-400 hover:text-white transition-colors">
                      Gestion de la paie numérique
                    </a>
                  </li>
                  <li>
                    <a href="#services" className="text-gray-400 hover:text-white transition-colors">
                      Conseil et accompagnement personnalisé
                    </a>
                  </li>
                  <li>
                    <a href="#services" className="text-gray-400 hover:text-white transition-colors">
                      Déclarations fiscales automatisées
                    </a>
                  </li>
                  <li>
                    <a href="#services" className="text-gray-400 hover:text-white transition-colors">
                      Gestion des documents fiscaux et comptables
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

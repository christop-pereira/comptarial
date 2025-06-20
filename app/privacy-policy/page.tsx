import Link from "next/link"
import Image from "next/image"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-6 py-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="bg-primary/5 p-2 rounded-md">
              <Image
                src="/logo.png"
                alt="Logo"
                width={25}
                height={25}
                      className="h-[70px] w-[150px] object-cover rounded-md"
              />
            </div>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-6 py-12 max-w-4xl">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-bold mb-8">Politique de confidentialité</h1>

          <p className="text-gray-600 mb-8">Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}</p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
            <p className="text-gray-700 leading-relaxed">
              Chez Comptarial, nous nous engageons à protéger votre vie privée et vos données personnelles. Cette
              politique de confidentialité explique comment nous collectons, utilisons, stockons et protégeons vos
              informations lorsque vous utilisez nos services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">2. Données collectées</h2>
            <p className="text-gray-700 leading-relaxed mb-4">Nous collectons les types de données suivants :</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Informations d&apos;identification (nom, prénom, email)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">3. Utilisation des données</h2>
            <p className="text-gray-700 leading-relaxed mb-4">Nous utilisons vos données pour :</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Fournir nos services comptables et fiduciaires</li>
              <li>Communiquer avec vous</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">4. Protection des données</h2>
            <p className="text-gray-700 leading-relaxed">
              Nous mettons en place des mesures de sécurité techniques et organisationnelles appropriées pour protéger
              vos données contre tout accès non autorisé, modification, divulgation ou destruction.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">5. Vos droits</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Conformément au RGPD, vous disposez des droits suivants :
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Droit d&apos;accès à vos données</li>
              <li>Droit de rectification</li>
              <li>Droit à l&apos;effacement</li>
              <li>Droit à la portabilité</li>
              <li>Droit d&apos;opposition</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">6. Contact</h2>
            <p className="text-gray-700 leading-relaxed">
              Pour toute question concernant cette politique de confidentialité ou pour exercer vos droits,
              contactez-nous à :
            </p>
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-700">
                <strong>Email :</strong> rosa@comptarial.ch
                <br />
                <strong>Téléphone :</strong> +41 22 794 04 32 
                <br />
              </p>
            </div>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t">
          <Link href="/" className="inline-flex items-center text-primary hover:underline">
            ← Retour à l&apos;accueil
          </Link>
        </div>
      </main>
    </div>
  )
}

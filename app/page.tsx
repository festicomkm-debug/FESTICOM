"use client";

import { useState } from "react";
import Image from "next/image";
export default function Home() {
  const [showForm, setShowForm] = useState(false);
const [circuit, setCircuit] = useState("");
const [nom, setNom] = useState("");
const [prenom, setPrenom] = useState("");
const [telephone, setTelephone] = useState("");
const [email, setEmail] = useState("");
const [date, setDate] = useState("");
const [reservationEnvoyee, setReservationEnvoyee] = useState(false);

const envoyerReservation = async () => {
  if (!nom || !prenom || !telephone || !email || !date) {
    alert("Veuillez remplir tous les champs.");
    return;
  }

  const message = `🎉 *NOUVELLE RÉSERVATION FESTICOM*

🚌 Circuit : ${circuit}

👤 Nom : ${nom}
👤 Prénom : ${prenom}

📞 Téléphone : ${telephone}
📧 Email : ${email}

📅 Date : ${date}`;

  window.location.href =
  `https://wa.me/2693315703?text=${encodeURIComponent(message)}`;
  setShowForm(false);
  setReservationEnvoyee(true);
};

 return (
  <main className="text-[85%] md:text-[100%]">

      {/* HERO */}

      <section className="relative h-screen w-full">

        <Image
          src="/images/ecran.jpeg"
          alt="FESTICOM"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/50"></div>

        {/* NAVBAR */}

        <nav className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-10 py-6">

          <Image
            src="/images/logo-festicom.png"
            alt="Logo FESTICOM"
            width={120}
            height={120}
          />

          <div className="hidden md:flex gap-8 text-white font-semibold">

            <a href="#">Accueil</a>

            <a href="#festival">Festival</a>

            <a href="#circuit">Circuit</a>

            <a href="#galerie">Galerie</a>

            <a href="#programme">Programme</a>

            <a href="#reservation">Réservation</a>

            <a href="#contact">Contact</a>

          </div>

        </nav>

        {/* TEXTE HERO */}

        <div className="absolute inset-0 z-10 flex flex-col items-center text-center px-6 pt-90">

          <h1 className="mt-32 text-6xl md:text-8xl font-black text-white drop-shadow-lg">
  FESTICOM 2026
</h1>

          <p className="mt-6 max-w-3xl text-xl md:text-3xl text-white">

            Festival du Tourisme et de la Culture des Comores

          </p>

          <div className="mt-10 flex gap-6">
  <a
    href="#reservation"
    className="rounded-full bg-green-600 px-8 py-4 text-white font-bold hover:bg-green-700 transition"
  >
    Réserver SAFARIKOM
  </a>

  <a
    href="#programme"
    className="rounded-full border-2 border-white px-8 py-4 text-white font-bold hover:bg-white hover:text-black transition"
  >
    Découvrir le programme
  </a>
</div>

<div className="mt-8 flex justify-center">
  <Image
    src="/images/affiche-Safarikom.png"
    alt="Affiche SAFARIKOM"
    width={200}
    height={300}
    priority
    className="rounded-2xl shadow-2xl border-4 border-white"
  />
</div>

</div>
      </section>

      {/* PRESENTATION */}

      <section
        id="festival"
        className="py-24 bg-white"
      >

        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-5xl font-bold text-center text-green-700">

            Bienvenue à FESTICOM

          </h2>

          <p className="mt-10 text-xl leading-9 text-center text-gray-700 max-w-4xl mx-auto">

             Découvrez les richesses culturelles, les paysages, ,
             les traditions et la patrimoines exceptionnel des Comores
            <br /><br />

            Notre objectif est de promouvoir
            les richesses naturelles,
            les traditions,
            le patrimoine,
            la gastronomie
            et les villages emblématiques
            de l'archipel des Comores.

          </p>

        </div>

      </section>
      {/* CIRCUIT */}

      <section
        id="circuit"
        className="py-24 bg-gray-100"
      >

        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-5xl font-bold text-center text-green-700">
            Circuit SAFARIKOM
          </h2>

          <p className="mt-6 text-center text-xl text-gray-600">
            Découvrez les plus beaux sites du Sud de Ngazidja.
          </p>

          <div className="mt-16 grid md:grid-cols-3 gap-8">

            {/* Moroni */}

            <div className="bg-white rounded-3xl shadow-lg overflow-hidden">

              <img
                src="/images/moroni-port.png"
                alt="Moroni"
                className="w-full h-64 object-cover"
              />

              <div className="p-6">

                <h3 className="text-2xl font-bold">
                  📍 Moroni
                </h3>

                <p className="mt-4">
                  Départ officiel de SAFARIKOM avec accueil des participants
                  et petit-déjeuner.
                </p>

              </div>

            </div>

            {/* Iconi */}

            <div className="bg-white rounded-3xl shadow-lg overflow-hidden">

              <img
                src="/images/iconi.jpeg"
                alt="Iconi"
                className="w-full h-64 object-cover"
              />

              <div className="p-6">

                <h3 className="text-2xl font-bold">
                  📍 Iconi
                </h3>

                <p className="mt-4">
                  Découverte du patrimoine historique d'Iconi et visite guidée.
                </p>

              </div>

            </div>

            {/* Chouani */}

            <div className="bg-white rounded-3xl shadow-lg overflow-hidden">

              <img
                src="/images/chouani.jpeg"
                alt="Chouani"
                className="w-full h-64 object-cover"
              />

              <div className="p-6">

                <h3 className="text-2xl font-bold">
                  📍 Chouani
                </h3>

                <p className="mt-4">
                  Animations culturelles, gastronomie locale et artisanat.
                </p>

              </div>

            </div>

            {/* Mindraoidou */}

            <div className="bg-white rounded-3xl shadow-lg overflow-hidden">

              <img
                src="/images/mindraoidou.png"
                alt="Mindraoidou"
                className="w-full h-64 object-cover"
              />

              <div className="p-6">

                <h3 className="text-2xl font-bold">
                  📍 Mindraoidou
                </h3>

                <p className="mt-4">
                  Visite de la célèbre Ville Bleue et découverte de son histoire.
                </p>

              </div>

            </div>

            {/* Dzahadjou */}

            <div className="bg-white rounded-3xl shadow-lg overflow-hidden">

              <img
                src="/images/dzahadjou.png"
                alt="Dzahadjou"
                className="w-full h-64 object-cover"
              />

              <div className="p-6">

                <h3 className="text-2xl font-bold">
                  📍 Dzahadjou
                </h3>

                <p className="mt-4">
                  Découverte du patrimoine culturel et des traditions du village.
                </p>

              </div>

            </div>

            {/* Chindini */}

            <div className="bg-white rounded-3xl shadow-lg overflow-hidden">

              <img
                src="/images/chindini.png"
                alt="Chindini"
                className="w-full h-64 object-cover"
              />

              <div className="p-6">

                <h3 className="text-2xl font-bold">
                  🏖️ Chindini
                </h3>

                <p className="mt-4">
                  Beach Party, concerts, DJ, coucher de soleil et clôture du festival.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>
      {/* GALERIE */}

      <section
        id="galerie"
        className="py-24 bg-white"
      >

        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-5xl font-bold text-center text-green-700">
            Galerie
          </h2>

          <p className="text-center mt-6 text-xl text-gray-600">
            Découvrez quelques images des événements de FESTICOM.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-16">

            <img
              src="/images/affiche-safarikom.png"
              className="rounded-3xl shadow-lg h-72 w-full object-cover hover:scale-105 transition duration-300"
            />

            <img
              src="/images/culture.jpeg"
              className="rounded-3xl shadow-lg h-72 w-full object-cover hover:scale-105 transition duration-300"
            />

            <img
              src="/images/Safarikim2022.png"
              className="rounded-3xl shadow-lg h-72 w-full object-cover hover:scale-105 transition duration-300"
            />

            <img
              src="/images/culture2.jpeg"
              className="rounded-3xl shadow-lg h-72 w-full object-cover hover:scale-105 transition duration-300"
            />

            <img
              src="/images/jac.png"
              className="rounded-3xl shadow-lg h-72 w-full object-cover hover:scale-105 transition duration-300"
            />

            <img
              src="/images/itsandra.png"
              className="rounded-3xl shadow-lg h-72 w-full object-cover hover:scale-105 transition duration-300"
            />

            <img
              src="/images/hadja.png"
              className="rounded-3xl shadow-lg h-72 w-full object-cover hover:scale-105 transition duration-300"
            />

            <img
              src="/images/2020.png"
              className="rounded-3xl shadow-lg h-72 w-full object-cover hover:scale-105 transition duration-300"
            />
            <img
              src="/images/hadidja.png"
              className="rounded-3xl shadow-lg h-72 w-full object-cover hover:scale-105 transition duration-300"
            />


          </div>

        </div>

      </section>

      {/* PROGRAMME */}

      <section
        id="programme"
        className="py-24 bg-green-700 text-white"
      >

        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-5xl font-bold text-center">
            Programme de la journée
          </h2>

          <div className="mt-16 space-y-5">

            <div className="bg-white/10 rounded-2xl p-6">
              <strong>08h00 — Moroni</strong><br />
              Accueil des participants et petit-déjeuner.
            </div>

            <div className="bg-white/10 rounded-2xl p-6">
              <strong>09h30 — Iconi</strong><br />
              Visite guidée et découverte du patrimoine historique.
            </div>

            <div className="bg-white/10 rounded-2xl p-6">
              <strong>11h00 — Chouani</strong><br />
              Animations culturelles, artisanat et gastronomie.
            </div>

            <div className="bg-white/10 rounded-2xl p-6">
              <strong>13h30 — Mindraoidou</strong><br />
              Découverte de la célèbre Ville Bleue.
            </div>

            <div className="bg-white/10 rounded-2xl p-6">
              <strong>14h15 — Dzahadjou</strong><br />
              Découverte du patrimoine culturel.
            </div>

            <div className="bg-white/10 rounded-2xl p-6">
              <strong>15h00 — Chindini</strong><br />
              Beach Party, DJ, concerts et coucher de soleil.
            </div>

          </div>

        </div>

      </section>
      {/* TARIFS */}

{!showForm && !reservationEnvoyee && (
<section id="reservation" className="py-24 bg-white">
  <div className="max-w-6xl mx-auto px-6">

    <h2 className="text-5xl font-bold text-center text-green-700">
      Réserver votre place
    </h2>

    <div className="grid md:grid-cols-3 gap-10 mt-16">

      <div className="rounded-3xl shadow-xl p-10 text-center border">
        <h3 className="text-3xl font-bold">🚌 Circuit Bus</h3>

        <p className="mt-6 text-5xl font-black text-green-700">
          25 000 KMF
        </p>

        <p className="mt-2 text-xl text-gray-500">
          ≈ 50 €
        </p>

       <button
  onClick={() => {
    setCircuit("🚌 Circuit Bus");
    setShowForm(true);
  }}
  className="mt-10 bg-green-700 text-white px-8 py-4 rounded-full hover:bg-green-800 transition"
>
  Réserver
</button>

      </div>

      <div className="rounded-3xl shadow-xl p-10 text-center border">

        <h3 className="text-3xl font-bold">
          🏍️ Circuit Moto
        </h3>

        <p className="mt-6 text-5xl font-black text-green-700">
          40 000 KMF
        </p>

        <p className="mt-2 text-xl text-gray-500">
          ≈ 80 €
        </p>

        <button
  onClick={() => {
    setCircuit("🏍️ Circuit Moto");
    setShowForm(true);
  }}
  className="mt-10 bg-green-700 text-white px-8 py-4 rounded-full hover:bg-green-800 transition"
>
  Réserver
</button>

      </div>

      <div className="rounded-3xl shadow-xl p-10 text-center border">

        <h3 className="text-3xl font-bold">
          🌴 Beach Party
        </h3>

        <p className="mt-6 text-5xl font-black text-green-700">
          3 000 KMF
        </p>

        <p className="mt-2 text-xl text-gray-500">
          ≈ 6 €
        </p>

       <button
  onClick={() => {
    setCircuit("🌴 Beach Party");
    setShowForm(true);
  }}
  className="mt-10 bg-green-700 text-white px-8 py-4 rounded-full hover:bg-green-800 transition"
>
  Réserver
</button>

      </div>

    </div>

  </div>

</section>
)}
{showForm && (
  <section
    id="formulaire"
    className="py-24 bg-green-50"
  >
    <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl p-10">

      <h2 className="text-4xl font-bold text-center text-green-700">
        Réservation FESTICOM
      </h2>

      <p className="text-center mt-4 text-xl">
        <strong>Circuit choisi :</strong> {circuit}
      </p>

      <div className="mt-10 grid gap-6">

        <input
          type="text"
          placeholder="Nom"
          value={nom}
onChange={(e)=>setNom(e.target.value)}
          className="border rounded-xl p-4"
        />

        <input
          type="text"
          placeholder="Prénom"
          value={prenom}
          onChange={(e)=>setPrenom(e.target.value)}
          className="border rounded-xl p-4"
        />

        <input
          type="email"
          placeholder="Adresse e-mail"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          className="border rounded-xl p-4"
        />

        <input
          type="tel"
          placeholder="Téléphone"
          value={telephone}
          onChange={(e)=>setTelephone(e.target.value)}
          className="border rounded-xl p-4"
        />

        <input
          type="date"
          value={date}
          onChange={(e)=>setDate(e.target.value)}
          className="border rounded-xl p-4"
        />

        <button
  onClick={envoyerReservation}
  className="bg-green-700 text-white py-4 rounded-xl text-xl font-bold hover:bg-green-800 transition"
>
  Confirmer la réservation
</button>
      </div>

    </div>
    </section>
)}
{reservationEnvoyee && (
  <section className="py-16 bg-green-50">

    <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-10 text-center">

      <h2 className="text-4xl font-bold text-green-700">
        ✅ Réservation enregistrée
      </h2>

      <p className="mt-6 text-xl">
        Merci !
        <br />
        Votre réservation a bien été enregistrée.
      </p>

      <p className="mt-4 text-gray-600">
        Vous pouvez effectuer votre paiement maintenant ou ultérieurement.
        Votre place restera enregistrée en attente de confirmation.
      </p>

    </div>

  </section>
)}
 {/* MOYENS DE PAIEMENT */}

{reservationEnvoyee && (
<section id="paiement" className="py-24 bg-gray-100">

  <div className="max-w-6xl mx-auto px-6">

    <h2 className="text-5xl font-bold text-center text-green-700">
      Choisissez votre moyen de paiement
    </h2>

    <p className="text-center mt-6 text-xl text-gray-600">
      Sélectionnez votre mode de paiement pour finaliser votre réservation.
    </p>

    <div className="grid md:grid-cols-3 gap-8 mt-16">

      {/* CARTE */}

      <div className="bg-white rounded-3xl shadow-xl p-8 text-center">

        <div className="text-6xl">💳</div>

        <h3 className="text-2xl font-bold mt-6">
          wero
        </h3>

        <p className="mt-4">
          Paiement sécurisé via wero.
        </p>

        <a
          href="https://share.weropay.eu/p/1/c/VDTXn2d6kD"
          target="_blank"
          className="inline-block mt-8 bg-green-700 text-white px-8 py-3 rounded-full hover:bg-green-800"
        >
          Payer maintenant
        </a>

      </div>

      {/* MVOLA */}

      <div className="bg-white rounded-3xl shadow-xl p-8 text-center">

        <div className="text-6xl">📱</div>

        <h3 className="text-2xl font-bold mt-6">
          Mvola
        </h3>

        <p className="mt-4">
          Numéro : +269 XXX XX XX
        </p>

       <button
  onClick={() => {
    const message = `Bonjour,

Je viens d'effectuer mon paiement MVola.

Nom : ${nom}
Prénom : ${prenom}

Circuit : ${circuit}

Merci de confirmer ma réservation.`;

    window.location.href =
      `https://wa.me/2693315703?text=${encodeURIComponent(message)}`;
  }}
  className="mt-8 bg-green-700 text-white px-8 py-3 rounded-full hover:bg-green-800"
>
  J'ai payé par Mvola
</button>

      </div>

      {/* SUR PLACE */}

      <div className="bg-white rounded-3xl shadow-xl p-8 text-center">

        <div className="text-6xl">💵</div>

        <h3 className="text-2xl font-bold mt-6">
          Paiement en espèce
        </h3>

        <p className="mt-4">
          FESTICOM – Moroni Coulé
        </p>

       <button
  onClick={() => {
    const message = `Bonjour,

Je souhaite régler ma réservation en espèces au QG du FESTICOM 2026.

Nom : ${nom}
Prénom : ${prenom}

Circuit : ${circuit}

Merci de m'indiquer où et quand effectuer le paiement en espèces.`;

    window.location.href =
      `https://wa.me/2693315703?text=${encodeURIComponent(message)}`;
  }}
  className="mt-8 bg-green-700 text-white px-8 py-3 rounded-full hover:bg-green-800"
>
  Je paierai en espèces
</button>

      </div>

    </div>

  </div>

</section>
)}
{/* ITINÉRAIRE SAFARIKOM */}

<section className="py-24 bg-gray-100">

  <div className="max-w-6xl mx-auto px-6 text-center">

    <h2 className="text-5xl font-bold text-green-700">
      Itinéraire SAFARIKOM
    </h2>

    <p className="mt-6 text-xl text-gray-700">
      Suivez le parcours officiel de FESTICOM :
      <br />
      <strong>
        Moroni → Iconi → Chouani → Mindraoidou → Dzahadjou → Chindini
      </strong>
    </p>

    <a
      href="https://maps.app.goo.gl/hmsezS8oPdDv7nTi6?g_st=ic"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block mt-10 bg-green-700 text-white px-10 py-4 rounded-full text-xl font-bold hover:bg-green-800 transition"
    >
      🗺️ Ouvrir l'itinéraire dans Google Maps
    </a>

  </div>

</section>

 {/* CONTACT */}
<footer id="contact" className="bg-black text-white py-20">

  <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16">

    {/* CONTACT */}

    <div>

      <h3 className="text-2xl font-bold mb-6">
        Contact
      </h3>

      <p>📍 Moroni – Coulé</p>

      <p className="mt-3">
        🇫🇷 +33 7 61 89 75 51
      </p>

      <p className="mt-3">
        🇰🇲
        <a
          href="https://wa.me/2693315703"
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-400 hover:underline"
        >
          +269 331 57 03 (WhatsApp)
        </a>
      </p>

      <p className="mt-3">
        📧 festicom.km@gmail.com
      </p>

      <p className="mt-3">
        🌐 www.festicom.km
      </p>

    </div>

    {/* RESEAUX */}

    <div>

      <h3 className="text-2xl font-bold mb-6">
        Suivez-nous
      </h3>

      <div className="space-y-4">

        <a href="https://www.facebook.com/share/19FuQSLCLc/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer">
          📘 Facebook
        </a>

        <a href="https://www.instagram.com/festicom26?igsh=aGZwYndnNnd5eHc2&utm_source=qr" target="_blank" rel="noopener noreferrer">
          📸 Instagram
        </a>

        <a href="https://www.tiktok.com/@festicom26?_r=1&_t=ZN-983ka9W0vgc" target="_blank" rel="noopener noreferrer">
          🎵 TikTok
        </a>

        <a href="https://snapchat.com/t/JhoyUkq7" target="_blank" rel="noopener noreferrer">
          👻 Snapchat
        </a>

        <a href="https://wa.me/2693315703" target="_blank" rel="noopener noreferrer">
          💬 WhatsApp
        </a>

      </div>

    </div>
    </div>

  <div className="border-t border-gray-700 mt-16 pt-8 text-center text-gray-400">
    © 2026 FESTICOM — Tous droits réservés.
  </div>

</footer>

</main>
);
}
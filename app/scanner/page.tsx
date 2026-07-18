"use client";

import { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { supabase } from "@/lib/supabase";

type Reservation = {
  reservation_number: string;
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  circuit: string;
  paiement: string;
  statut: string;
};

export default function ScannerPage() {
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      {
        fps: 10,
        qrbox: 250,
      },
      false
    );

    scanner.render(
      async (decodedText) => {

        setLoading(true);

        const reservationNumber = decodedText.replace(
          "https://festikom.com/scan/",
          ""
        );

        const { data, error } = await supabase
          .from("reservations")
          .select("*")
          .eq("reservation_number", reservationNumber)
          .single();

        setLoading(false);

        if (error || !data) {
          alert("❌ Billet introuvable");

          scanner.resume();
          return;
        }

        setReservation(data);
      },
      () => {}
    );

    return () => {
      scanner.clear().catch(() => {});
    };
  }, []);
  async function validerEntree() {
    if (!reservation) return;

    if (reservation.statut === "Utilisé") {
      alert("⚠️ Ce billet a déjà été utilisé.");
      return;
    }

    const { error } = await supabase
      .from("reservations")
      .update({ statut: "Utilisé" })
      .eq("reservation_number", reservation.reservation_number);

    if (error) {
      alert(error.message);
      return;
    }

    setReservation({
      ...reservation,
      statut: "Utilisé",
    });

    alert("✅ Entrée validée avec succès.");
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">

      <h1 className="text-3xl font-bold mb-6">
        Scanner FESTICOM
      </h1>

      {!reservation && (
        <>
          <div id="reader" className="w-full max-w-md"></div>

          {loading && (
            <p className="mt-4 text-blue-600">
              Recherche du billet...
            </p>
          )}
        </>
      )}

      {reservation && (
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">

          <h2 className="text-2xl font-bold mb-4 text-center">
            Billet trouvé
          </h2>

          <p><strong>Réservation :</strong> {reservation.reservation_number}</p>
          <p><strong>Nom :</strong> {reservation.nom}</p>
          <p><strong>Prénom :</strong> {reservation.prenom}</p>
          <p><strong>Email :</strong> {reservation.email}</p>
          <p><strong>Téléphone :</strong> {reservation.telephone}</p>
          <p><strong>Circuit :</strong> {reservation.circuit}</p>

          <p className="mt-2">
            <strong>Paiement :</strong>{" "}
            <span className="text-green-600">
              {reservation.paiement}
            </span>
          </p>

          <p className="mt-2">
            <strong>Statut :</strong>{" "}
            {reservation.statut === "Utilisé" ? (
              <span className="text-red-600 font-bold">
                🔴 Billet déjà utilisé
              </span>
            ) : (
              <span className="text-green-600 font-bold">
                🟢 Billet valide
              </span>
            )}
          </p>

          {reservation.statut !== "Utilisé" && (
            <button
              onClick={validerEntree}
              className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-bold"
            >
              Valider l'entrée
            </button>
          )}

          <button
            onClick={() => window.location.reload()}
            className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold"
          >
            Scanner un autre billet
          </button>

        </div>
      )}

    </div>
  );
}
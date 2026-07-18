"use client";

import { useEffect, useState } from "react";
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

export default function AdminPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    fetchReservations();
  }, []);

  async function fetchReservations() {
    const { data, error } = await supabase
      .from("reservations")
      .select("*")
      .order("reservation_number", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    setReservations(data ?? []);
  }

  async function validerPaiement(reservationNumber: string) {
    console.log("===== VALIDER PAIEMENT =====");
    console.log(reservationNumber);

    const { data, error } = await supabase
      .from("reservations")
      .update({ paiement: "Payé" })
      .eq("reservation_number", reservationNumber)
      .select();

    if (error) {
      alert(error.message);
      return;
    }

    fetchReservations();

    const reservation = data?.[0];

    if (reservation) {
      console.log("Envoi vers /api/send-ticket");

      const response = await fetch("/api/send-ticket", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reservationNumber: reservation.reservation_number,
          nom: reservation.nom,
          prenom: reservation.prenom,
          email: reservation.email,
          telephone: reservation.telephone,
          circuit: reservation.circuit,
        }),
      });

      console.log("Status :", response.status);
      console.log(await response.text());

      const message = encodeURIComponent(
`Bonjour ${reservation.prenom} ${reservation.nom},

Votre paiement FESTICOM a été validé ✅

🎫 Réservation : ${reservation.reservation_number}
🚌 Circuit : ${reservation.circuit}

Votre billet officiel vous sera envoyé par e-mail.

Merci et à bientôt !`
      );

      window.open(
        `https://wa.me/${reservation.telephone.replace(/\D/g, "")}?text=${message}`,
        "_blank"
      );
    }
  }

  async function validerBillet(reservationNumber: string) {
    const { error } = await supabase
      .from("reservations")
      .update({ statut: "Utilisé" })
      .eq("reservation_number", reservationNumber);

    if (error) {
      alert(error.message);
      return;
    }

    fetchReservations();
  }
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">
        Administration FESTICOM
      </h1>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full border-collapse">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left">Réservation</th>
              <th className="p-3 text-left">Nom</th>
              <th className="p-3 text-left">Téléphone</th>
              <th className="p-3 text-left">Circuit</th>
              <th className="p-3 text-left">Paiement</th>
              <th className="p-3 text-left">Billet</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {reservations.map((reservation) => (
              <tr
                key={reservation.reservation_number}
                className="border-b"
              >
                <td className="p-3">
                  {reservation.reservation_number}
                </td>

                <td className="p-3">
                  {reservation.prenom} {reservation.nom}
                </td>

                <td className="p-3">
                  {reservation.telephone}
                </td>

                <td className="p-3">
                  {reservation.circuit}
                </td>

                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-white ${
                      reservation.paiement === "Payé"
                        ? "bg-green-600"
                        : "bg-yellow-500"
                    }`}
                  >
                    {reservation.paiement}
                  </span>
                </td>

                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-white ${
                      reservation.statut === "Utilisé"
                        ? "bg-red-600"
                        : "bg-green-600"
                    }`}
                  >
                    {reservation.statut}
                  </span>
                </td>

                <td className="p-3 space-y-2">
                  <button
                    onClick={() =>
                      validerPaiement(
                        reservation.reservation_number
                      )
                    }
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
                  >
                    Valider Paiement
                  </button>

                  <button
                    onClick={() =>
                      validerBillet(
                        reservation.reservation_number
                      )
                    }
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
                  >
                    Valider Billet
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
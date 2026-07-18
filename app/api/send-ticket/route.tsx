import { NextResponse } from "next/server";
import { Resend } from "resend";
import { renderToBuffer } from "@react-pdf/renderer";
import TicketPDF from "@/components/BilletPDF";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  console.log("API send-ticket appelée");

  try {
    const {
      reservationNumber,
      nom,
      prenom,
      email,
      telephone,
      circuit,
    } = await request.json();

    console.log("Données reçues :", {
      reservationNumber,
      nom,
      prenom,
      email,
      telephone,
      circuit,
    });

    console.log("Génération du PDF...");

    const pdfBuffer = await renderToBuffer(
      <TicketPDF
        reservation={{
          numero: reservationNumber,
          nom,
          prenom,
          email,
          telephone,
          circuit,
        }}
      />
    );

    console.log("PDF généré avec succès");

    const { data, error } = await resend.emails.send({
      from: "Billetterie FESTICOM <billetterie@festikom.com>",
      to: email,

      subject: "🎫 Votre billet officiel FESTICOM 2026",

      html: `
        <div style="font-family: Arial, sans-serif; line-height:1.6">
          <h2>Bonjour ${prenom} ${nom},</h2>

          <p>Nous avons le plaisir de vous confirmer que votre paiement a bien été validé.</p>

          <p>
            Votre <strong>billet officiel FESTICOM 2026</strong> est joint à cet e-mail.
          </p>

          <hr>

          <p><strong>Numéro de réservation :</strong> ${reservationNumber}</p>
          <p><strong>Circuit :</strong> ${circuit}</p>
          <p><strong>Téléphone :</strong> ${telephone}</p>

          <br>

          <p>
            Présentez simplement votre billet (papier ou sur votre téléphone)
            à l'entrée du FESTICOM.
          </p>

          <p>
            Le QR Code est personnel et valable pour une seule entrée.
          </p>

          <br>

          <p>Nous vous souhaitons un excellent FESTICOM ! 🎉</p>

          <p>
            <strong>L'équipe Billetterie FESTICOM</strong>
          </p>
        </div>
      `,

      attachments: [
        {
          filename: `Billet-FESTICOM-${reservationNumber}.pdf`,
          content: pdfBuffer,
        },
      ],
    });

    if (error) {
      console.error("Erreur Resend :", error);

      return NextResponse.json(
        {
          success: false,
          error,
        },
        { status: 400 }
      );
    }

    console.log("E-mail envoyé avec succès :", data);

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Erreur serveur :", error);

    return NextResponse.json(
      {
        success: false,
        error: "Erreur serveur",
      },
      { status: 500 }
    );
  }
}
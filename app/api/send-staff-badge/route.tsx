import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";
import React from "react";
import { renderToBuffer } from "@react-pdf/renderer";
import BadgeStaffPDF from "@/components/BadgeStaffPDF";
import QRCode from "qrcode";

const resend = new Resend(process.env.RESEND_API_KEY!);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "ID du staff manquant",
        },
        { status: 400 }
      );
    }

    const { data: staff, error } = await supabase
      .from("staff")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !staff) {
      return NextResponse.json(
        {
          success: false,
          message: "Staff introuvable",
        },
        { status: 404 }
      );
    }

    let matricule = staff.matricule;

    if (!matricule) {
      const { count } = await supabase
        .from("staff")
        .select("*", {
          count: "exact",
          head: true,
        });

      matricule = `STF-${String((count ?? 0) + 1).padStart(4, "0")}`;

      await supabase
        .from("staff")
        .update({
          matricule,
          date_validation: new Date().toISOString(),
        })
        .eq("id", staff.id);

      staff.matricule = matricule;
    }

    const qrCode = await QRCode.toDataURL(
  `FESTICOM|STAFF|${staff.matricule}`
);

    const pdfBuffer = await renderToBuffer(
  <BadgeStaffPDF
    staff={{
      matricule: staff.matricule,
      nom: staff.nom,
      prenom: staff.prenom,
      fonction: staff.fonction,
      departement: staff.departement ?? "",
      email: staff.email,
      telephone: staff.telephone,
      photo: staff.photo ?? "",
      qrCode,
    }}
  />
);
    await resend.emails.send({
      from: "FESTICOM <staffy@festikom.com>",
      to: [staff.email],
      subject: "Votre badge STAFF FESTICOM 2026",
      html: `
        <div style="font-family:Arial,sans-serif">
          <h2>Bonjour ${staff.prenom},</h2>

          <p>
            Votre inscription au STAFF de <strong>FESTICOM 2026</strong>
            a été validée.
          </p>

          <p>
            Votre badge est disponible en pièce jointe.
          </p>

          <p>
            Merci de le conserver et de le présenter lors des activités.
          </p>

          <br>

          <p>
            L'équipe FESTICOM
          </p>
        </div>
      `,
      attachments: [
        {
          filename: `Badge-${staff.matricule}.pdf`,
          content: Buffer.from(pdfBuffer),
        },
      ],
    });

    await supabase
      .from("staff")
      .update({
        badge_envoye: true,
      })
      .eq("id", staff.id);

    return NextResponse.json({
      success: true,
      message: "Badge envoyé avec succès",
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Erreur lors de l'envoi du badge",
      },
      {
        status: 500,
      }
    );
  }
}
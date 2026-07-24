import React from "react";
import {
  Document,
  Page,
  View,
  Text,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    width: 298,
    height: 420,
    backgroundColor: "#ffffff",
  },
  container: {
    position: "relative",
    width: 298,
    height: 420,
  },
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 298,
    height: 420,
  },
  photo: {
    position: "absolute",
    left: 42,
    top: 220,
    width: 84,
    height: 105,
    borderRadius: 8,
  },
  nom: {
    position: "absolute",
    left: 140,
    top: 230,
    fontSize: 18,
    fontWeight: "bold",
  },
  fonction: {
    position: "absolute",
    left: 140,
    top: 250,
    fontSize: 10,
    color: "#1d4ed8",
  },
  departement: {
    position: "absolute",
    left: 140,
    top: 260,
    fontSize: 9,
    color: "#666666",
  },
  matricule: {
    position: "absolute",
    left: 140,
    top: 300,
    fontSize: 12,
    fontWeight: "bold",
  },
  qr: {
    position: "absolute",
    left: 220,
    top: 265,
    width: 65,
    height: 65,
  },
});

type Props = {
  staff: {
    matricule: string;
    nom: string;
    prenom: string;
    fonction: string;
    departement: string;
    email: string;
    telephone: string;
    photo: string;
    qrCode: string;
  };
};

export default function BadgeStaffPDF({ staff }: Props) {
  // Récupération dynamique de l'origine du site pour pointer vers /images/badge-staff.png
  const baseUrl = typeof window !== "undefined" ? window.location.origin : "https://www.festikom.com";

  return (
    <Document>
      <Page size={[298, 420]} style={styles.page} wrap={false}>
        <View style={styles.container}>
          
          {/* Image d'arrière-plan pointant directement sur le dossier public */}
          <Image
            src={`${baseUrl}/images/badge-staff.png`}
            style={styles.background}
          />

          <Image
            src={staff.photo}
            style={styles.photo}
          />

          <Text style={styles.nom}>
            {staff.prenom} {staff.nom}
          </Text>

          <Text style={styles.fonction}>
            {staff.fonction}
          </Text>

          <Text style={styles.departement}>
            {staff.departement}
          </Text>

          <Text style={styles.matricule}>
            {staff.matricule}
          </Text>

          <Image
            src={staff.qrCode}
            style={styles.qr}
          />
        </View>
      </Page>
    </Document>
  );
}
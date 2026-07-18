import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    backgroundColor: "#ffffff",
  },

  logo: {
    width: 120,
    height: 120,
    alignSelf: "center",
    marginBottom: 15,
  },

  title: {
    fontSize: 22,
    textAlign: "center",
    marginBottom: 20,
    color: "#15803d",
    fontWeight: "bold",
  },

  section: {
    marginBottom: 10,
  },

  label: {
    fontWeight: "bold",
  },

  qr: {
    width: 150,
    height: 150,
    alignSelf: "center",
    marginTop: 30,
    marginBottom: 20,
  },

  footer: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 10,
    color: "gray",
  },
});

type Props = {
  reservation: {
    numero: string;
    nom: string;
    prenom: string;
    email: string;
    telephone: string;
    circuit: string;
  };
};

export default function TicketPDF({ reservation }: Props) {
  const qrData = `https://festikom.com/scan/${reservation.numero}`;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Image
          style={styles.logo}
          src="https://festikom.com/logo-festicom.png"
        />

        <Text style={styles.title}>
          BILLET OFFICIEL FESTICOM 2026
        </Text>

        <View style={styles.section}>
          <Text>
            <Text style={styles.label}>N° Réservation : </Text>
            {reservation.numero}
          </Text>
        </View>

        <View style={styles.section}>
          <Text>
            <Text style={styles.label}>Nom : </Text>
            {reservation.nom}
          </Text>
        </View>

        <View style={styles.section}>
          <Text>
            <Text style={styles.label}>Prénom : </Text>
            {reservation.prenom}
          </Text>
        </View>

        <View style={styles.section}>
          <Text>
            <Text style={styles.label}>Email : </Text>
            {reservation.email}
          </Text>
        </View>

        <View style={styles.section}>
          <Text>
            <Text style={styles.label}>Téléphone : </Text>
            {reservation.telephone}
          </Text>
        </View>

        <View style={styles.section}>
          <Text>
            <Text style={styles.label}>Circuit : </Text>
            {reservation.circuit}
          </Text>
        </View>

        <View style={styles.section}>
          <Text>
            <Text style={styles.label}>Paiement : </Text>
            ✅ PAYÉ
          </Text>
        </View>

        <Image
          style={styles.qr}
          src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(
            qrData
          )}`}
        />

        <Text style={{ textAlign: "center", marginBottom: 20 }}>
          Scanner ce QR Code à l'entrée du FESTICOM
        </Text>

        <Text style={styles.footer}>
          Présentez ce billet à l'entrée du FESTICOM.
          {"\n"}
          Ce billet est personnel et son QR Code est valable pour une seule entrée.
        </Text>
      </Page>
    </Document>
  );
}
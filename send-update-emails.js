// Script to send updated book emails to all real buyers
// Deduped by email, excluding test accounts
// If any purchase for an email was PREMIUM, they get the premium email

const BUYERS = [
  { email: "jonasmeyerboss@gmail.com", name: "Jonas Meyer", isPremium: false },
  {
    email: "emerald.inferno@outlook.com",
    name: "Sara Hantzinikolas",
    isPremium: false,
  },
  { email: "pelle@fitforkids.dk", name: "Pelle Plesner", isPremium: false },
  { email: "frenchog3@gmail.com", name: "Olivier Guerquin", isPremium: false },
  { email: "haniergi@gmail.com", name: "Ergisa Hani", isPremium: false },
  {
    email: "miestennis@gmail.com",
    name: "Michelle Dijkstra",
    isPremium: false,
  },
  { email: "zjukic26@gmail.com", name: "Zrinka Jukic", isPremium: false },
  {
    email: "abastasia.ason@gmail.com",
    name: "Anastasiia Ason",
    isPremium: false,
  },
  {
    email: "ilana.wapniarski@gmail.com",
    name: "Ilana Wapniarski",
    isPremium: false,
  },
  {
    email: "charchar_marie@hotmail.com",
    name: "Charlotte Neale",
    isPremium: true,
  },
  {
    email: "mirandacan2014@gmail.com",
    name: "Miranda Owens",
    isPremium: false,
  },
  {
    email: "jendobsoncreative@gmail.com",
    name: "Jennifer Dobson",
    isPremium: false,
  },
  {
    email: "annakoksharova05@gmail.com",
    name: "Anna Koksharova",
    isPremium: false,
  },
  { email: "linee2011@live.dk", name: "Line Eliasson", isPremium: false },
  { email: "breahjade@gmail.com", name: "Breah", isPremium: true },
  {
    email: "alexisjadealcott@hotmail.com",
    name: "Alexis Alcott",
    isPremium: false,
  },
  { email: "gracetau111@gmail.com", name: "Grace Taubeneck", isPremium: false },
  { email: "wylieimogen@gmail.com", name: "Imogen Wylie", isPremium: true },
  { email: "Zairaachtar@gmail.com", name: "Zaira", isPremium: true },
  {
    email: "maren_bertram@icloud.com",
    name: "Maren Bertram",
    isPremium: false,
  },
  {
    email: "patrycjastefaniabarlasz@gmail.com",
    name: "Patrycja Barlasz",
    isPremium: false,
  },
  { email: "shavon.annmary@gmail.com", name: "Shavon", isPremium: true },
  {
    email: "madelinealexandrialove@yahoo.com",
    name: "Madeline Love",
    isPremium: false,
  },
  { email: "dominicprata@gmail.com", name: "Dominic Prata", isPremium: false },
  {
    email: "n.o.korniienko@gmail.com",
    name: "Nadiia Korniienko",
    isPremium: false,
  },
  { email: "chloeaprice@gmail.com", name: "Chloe Price", isPremium: false },
  {
    email: "cheyanneskyelong@gmail.com",
    name: "Cheyanne Long",
    isPremium: false,
  },
  {
    email: "podpora@peniazepolopate.sk",
    name: "Zuzana Banasova",
    isPremium: false,
  },
  {
    email: "gheorghiu.carla@yahoo.com",
    name: "Carla Gheorghiu",
    isPremium: false,
  },
  {
    email: "mariehelenelandrykin@gmail.com",
    name: "Marie-Helene Landry",
    isPremium: false,
  },
  { email: "Jane_suos@hotmail.com", name: "Jane Sous", isPremium: true },
  {
    email: "witchywayz@weirdness.com",
    name: "Elizabeth Paterson",
    isPremium: false,
  },
  { email: "wiesneredit@hotmail.com", name: "Edit", isPremium: true },
  { email: "kresesa5396@protonmail.com", name: "Kresesa", isPremium: true },
  { email: "heldannamarie@gmail.com", name: "Anna Held", isPremium: false },
  { email: "christopher.alphonse7@gmail.com", name: "Chris", isPremium: true },
];

const API_URL = "https://kanikarose.com/api/admin/send-download-link";
const ADMIN_SECRET = process.env.ADMIN_SECRET;

if (!ADMIN_SECRET) {
  console.error("Set ADMIN_SECRET env var first");
  process.exit(1);
}

async function sendUpdate(buyer, index) {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-secret": ADMIN_SECRET,
      },
      body: JSON.stringify({
        email: buyer.email,
        name: buyer.name,
        isPremium: buyer.isPremium,
        isUpdate: true,
      }),
    });

    const data = await res.json();
    if (data.success) {
      console.log(
        `[${index + 1}/${BUYERS.length}] Sent to ${buyer.email} (${buyer.isPremium ? "PREMIUM" : "standard"})`,
      );
    } else {
      console.error(
        `[${index + 1}/${BUYERS.length}] FAILED ${buyer.email}: ${data.error}`,
      );
    }
  } catch (err) {
    console.error(
      `[${index + 1}/${BUYERS.length}] ERROR ${buyer.email}: ${err.message}`,
    );
  }
}

async function main() {
  console.log(`Sending updated book email to ${BUYERS.length} buyers...\n`);

  for (let i = 0; i < BUYERS.length; i++) {
    await sendUpdate(BUYERS[i], i);
    // 2 second delay between emails to avoid rate limiting
    if (i < BUYERS.length - 1) {
      await new Promise((r) => setTimeout(r, 2000));
    }
  }

  console.log("\nDone!");
}

main();

import { useMemo, useState } from "react";
import "./index.css";

/* =========================================================
   IMAGES
========================================================= */

const heroImage =
  "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1400&q=85";

const hotelImage =
  "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1000&q=85";

const beachImage =
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=85";

const foodImage =
  "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=85";

const gamingImage =
  "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1000&q=85";

/* =========================================================
   DATA - HOTELS AL HOCEIMA
========================================================= */

const hotels = [
  {
    id: 1,
    name: "Hôtel Mercure Quemado Resort",
    stars: 4,
    rating: 4.4,
    reviews: 4194,
    location: "Quemado, Al Hoceima",
    address: "Av. Mohamed V, Al Hoceima 32000",
    price: 1109,
    phone: "+212539842200",
    hours: "24h/24",
    coordinates: "35.2459,-3.9305",
    description:
      "Hôtel situé à proximité de la plage Quemado à Al Hoceima, idéal pour profiter de la mer et découvrir la ville.",
    rooms: [],
    services: [
      "Wi-Fi gratuit",
      "Piscine",
      "Restaurant",
      "Parking",
      "Climatisation",
      "Réception 24h/24",
    ],
  },

  {
    id: 2,
    name: "Hôtel Mira Palace",
    stars: 4,
    rating: 3.9,
    reviews: 256,
    location: "Mirador, Al Hoceima",
    address: "Hay Mirador, Espace Mirador, Al Hoceima 32000",
    price: 1342,
    phone: "+212539840084",
    hours: "24h/24",
    coordinates: "35.2500,-3.9370",
    description:
      "Hôtel élégant situé face à la baie d'Al Hoceima avec suites, piscine et rooftop panoramique.",
    rooms: [
      {
        name: "Chambre Premium",
        price: 1342,
        icon: "🛏️",
      },
      {
        name: "Suite",
        price: 1600,
        icon: "🛋️",
      },
    ],
    services: [
      "Wi-Fi gratuit",
      "Piscine",
      "Restaurant",
      "Rooftop",
      "Climatisation",
      "Réception 24h/24",
    ],
  },

  {
    id: 3,
    name: "Radisson Blu Resort Al Hoceima",
    stars: 5,
    rating: 3.8,
    reviews: 1417,
    location: "Plage Sfiha",
    address: "KM 8, Plage Sfiha, Ajdir 35502",
    price: 1480,
    phone: "+212539844000",
    hours: "24h/24",
    coordinates: "35.1780,-3.9080",
    description:
      "Resort 5 étoiles en bord de mer, situé près de la plage Sfiha, avec piscine, spa et nombreuses activités.",
    rooms: [],
    services: [
      "Wi-Fi gratuit",
      "Piscine extérieure",
      "Plage",
      "Restaurant",
      "Spa",
      "Fitness",
      "Parking",
      "Club enfants",
    ],
  },

  {
    id: 4,
    name: "Radisson Blu Residences Al Hoceima",
    stars: 5,
    rating: 3.9,
    reviews: 351,
    location: "Plage Sfiha",
    address: "Plage Sfiha KM 7, Ajdir",
    price: 1268,
    phone: "+212539844400",
    hours: "24h/24",
    coordinates: "35.1780,-3.9080",
    description:
      "Résidence en bord de mer proposant des chalets et bungalows près de la plage Sfiha.",
    rooms: [],
    services: [
      "Wi-Fi gratuit",
      "Plage",
      "Piscine",
      "Parking",
      "Jardin",
      "Terrasse",
      "Climatisation",
    ],
  },

  {
    id: 5,
    name: "Hôtel Al Hoceima Bay",
    stars: 4,
    rating: 3.6,
    reviews: 881,
    location: "Plage Sfiha",
    address: "Plage Sfiha, Ajdir, Al Hoceima",
    price: 891,
    phone: "+212539802011",
    hours: "24h/24",
    coordinates: "35.1780,-3.9080",
    description:
      "Hôtel situé dans la zone de Sfiha, près de la plage, adapté aux séjours en famille.",
    rooms: [],
    services: [
      "Wi-Fi",
      "Piscine",
      "Restaurant",
      "Parking",
      "Plage",
      "Climatisation",
    ],
  },

  {
    id: 6,
    name: "Hôtel Golden Bay",
    stars: 4,
    rating: 3.5,
    reviews: 76,
    location: "Al Hoceima",
    address: "Al Hoceima, Maroc",
    price: 1220,
    phone: "+212539842777",
    hours: "24h/24",
    coordinates: "35.2470,-3.9320",
    description:
      "Hôtel situé à Al Hoceima avec restaurant, terrasse et accès à la plage.",
    rooms: [],
    services: [
      "Plage",
      "Restaurant",
      "Terrasse",
      "Parking",
      "Wi-Fi",
      "Climatisation",
    ],
  },

  {
    id: 7,
    name: "Appart Hôtel Puerto Marino",
    stars: 3,
    rating: 3.5,
    reviews: 196,
    location: "Centre-ville",
    address: "28 Rue Anoual, Al Hoceima 32000",
    price: 1212,
    phone: "+212600333319",
    hours: "24h/24",
    coordinates: "35.2500,-3.9360",
    description:
      "Appart-hôtel situé au centre d'Al Hoceima, adapté aux voyageurs recherchant davantage d'autonomie.",
    rooms: [],
    services: [
      "Wi-Fi",
      "Appartements",
      "Climatisation",
      "Parking",
      "Réception",
    ],
  },

  {
    id: 8,
    name: "RS Appartements Hôtel",
    stars: 3,
    rating: 4.5,
    reviews: 24,
    location: "Mirador Bas",
    address: "Rue Oulmess, Mirador Bas, Al Hoceima",
    price: 1450,
    phone: "+212778939731",
    hours: "24h/24",
    coordinates: "35.2530,-3.9390",
    description:
      "Appartements situés dans le quartier Mirador Bas à Al Hoceima.",
    rooms: [],
    services: [
      "Wi-Fi",
      "Appartements",
      "Climatisation",
      "Parking",
    ],
  },

  {
    id: 9,
    name: "Hôtel La Marina",
    stars: 2,
    rating: 3.3,
    reviews: 160,
    location: "Hay Calabonita",
    address: "Hay Calabonita, Al Hoceima",
    price: 286,
    phone: "+212539840189",
    hours: "24h/24",
    coordinates: "35.2450,-3.9270",
    description:
      "Hôtel situé dans le quartier Calabonita à Al Hoceima.",
    rooms: [],
    services: [
      "Wi-Fi",
      "Restaurant",
      "Parking",
      "Climatisation",
      "Réception",
    ],
  },

  {
    id: 10,
    name: "Hôtel La Perla",
    stars: 3,
    rating: 3.5,
    reviews: 871,
    location: "Centre-ville",
    address: "Bd Tarik Ibn Ziyad, Al Hoceima 32000",
    price: 692,
    phone: "+212539984513",
    hours: "24h/24",
    coordinates: "35.2500,-3.9370",
    description:
      "Hôtel situé au centre d'Al Hoceima, près de la plage Quemado, avec restaurant panoramique.",
    rooms: [],
    services: [
      "Wi-Fi gratuit",
      "Restaurant",
      "Réception 24h/24",
      "Climatisation",
      "Service de chambre",
      "Vue panoramique",
    ],
  },

  {
    id: 11,
    name: "Hôtel Cataleya",
    stars: 3,
    rating: 4.1,
    reviews: 112,
    location: "Corniche de Sabadia",
    address: "Corniche de Sabadia, Al Hoceima 32000",
    price: 800,
    phone: "+212662100590",
    hours: "24h/24",
    coordinates: "35.2505,-3.9328",
    description:
      "Hôtel situé sur la corniche maritime de Sabadia.",
    rooms: [],
    services: [
      "Wi-Fi",
      "Climatisation",
      "Parking",
      "Réception",
      "Terrasse",
    ],
  },

  {
    id: 12,
    name: "Hôtel National",
    stars: 2,
    rating: 3.4,
    reviews: 135,
    location: "Centre-ville",
    address: "23 Rue Tetouane, Al Hoceima 32000",
    price: 233,
    phone: "+212539982681",
    hours: "24h/24",
    coordinates: "35.2500,-3.9370",
    description:
      "Hôtel économique situé au centre-ville d'Al Hoceima.",
    rooms: [],
    services: [
      "Wi-Fi gratuit",
      "Réception 24h/24",
      "Service de chambre",
    ],
  },

  {
    id: 13,
    name: "Hôtel Nexus Budget",
    stars: 2,
    rating: 3.6,
    reviews: 68,
    location: "Avenue Mohamed V",
    address:
      "Avenue Mohamed V, 4 Passage Soussan, Al Hoceima",
    price: 180,
    phone: "+212539840147",
    hours: "24h/24",
    coordinates: "35.2500,-3.9370",
    description:
      "Hébergement économique situé au centre d'Al Hoceima.",
    rooms: [],
    services: [
      "Wi-Fi",
      "Réception",
      "Climatisation",
    ],
  },

  {
    id: 14,
    name: "Suites Hotel Mohammed V by Accor",
    stars: 4,
    rating: 4.0,
    reviews: 108,
    location: "Place Mohammed VI",
    address: "Place Mohammed VI, Al Hoceima",
    price: 0,
    phone: "+212539982233",
    hours: "24h/24",
    coordinates: "35.2490,-3.9370",
    description:
      "Hôtel situé sur la Place Mohammed VI à Al Hoceima.",
    rooms: [],
    services: [
      "Wi-Fi",
      "Restaurant",
      "Climatisation",
      "Réception",
      "Parking",
    ],
  },

  {
    id: 15,
    name: "Hôtel Amir Plage",
    stars: 3,
    rating: 3.4,
    reviews: 251,
    location: "Al Hoceima",
    address: "Al Hoceima, Maroc",
    price: 0,
    phone: "+212539983290",
    hours: "24h/24",
    coordinates: "35.2470,-3.9340",
    description:
      "Hôtel situé à Al Hoceima, à proximité des différents points d'intérêt de la ville.",
    rooms: [],
    services: [
      "Wi-Fi",
      "Climatisation",
      "Réception",
      "Parking",
    ],
  },

  {
    id: 16,
    name: "Hôtel Villa Florido",
    stars: 3,
    rating: 3.7,
    reviews: 287,
    location: "Centre-ville",
    address: "32000, Al Hoceima",
    price: 0,
    phone: "+212539840847",
    hours: "24h/24",
    coordinates: "35.2500,-3.9370",
    description:
      "Hôtel situé au centre d'Al Hoceima, anciennement connu sous le nom Hôtel Étoile du Rif.",
    rooms: [],
    services: [
      "Wi-Fi",
      "Réception",
      "Climatisation",
      "Restaurant",
    ],
  },

  {
    id: 17,
    name: "Hôtel Al Khouzama",
    stars: 3,
    rating: 3.3,
    reviews: 128,
    location: "Al Hoceima",
    address: "Al Hoceima, Maroc",
    price: 0,
    phone: "",
    hours: "24h/24",
    coordinates: "35.2500,-3.9370",
    description:
      "Hôtel situé à Al Hoceima.",
    rooms: [],
    services: [
      "Wi-Fi",
      "Climatisation",
      "Réception",
    ],
  },

  {
    id: 18,
    name: "Résidence El Nido",
    stars: 3,
    rating: 4.6,
    reviews: 17,
    location: "Al Hoceima",
    address: "Al Hoceima 32000",
    price: 0,
    phone: "+212684258844",
    hours: "24h/24",
    coordinates: "35.2500,-3.9370",
    description:
      "Résidence située dans la région d'Al Hoceima.",
    rooms: [],
    services: [
      "Wi-Fi",
      "Parking",
      "Climatisation",
    ],
  },

  {
    id: 19,
    name: "Hôtel La Perla Bleue",
    stars: 3,
    rating: 3.6,
    reviews: 85,
    location: "Hay Calabonita",
    address: "Hay Calabonita, Al Hoceima 32000",
    price: 0,
    phone: "+212539982539",
    hours: "24h/24",
    coordinates: "35.2450,-3.9270",
    description:
      "Hôtel situé dans le quartier Calabonita à Al Hoceima.",
    rooms: [],
    services: [
      "Wi-Fi",
      "Climatisation",
      "Réception",
    ],
  },

  {
    id: 20,
    name: "Hôtel Basilic",
    stars: 3,
    rating: 3.5,
    reviews: 724,
    location: "Al Hoceima",
    address:
      "131 Avenue Abdelkrim El Khattabi, Al Hoceima",
    price: 0,
    phone: "+212539980083",
    hours: "24h/24",
    coordinates: "35.2500,-3.9370",
    description:
      "Hôtel situé à Al Hoceima avec des services adaptés aux voyageurs.",
    rooms: [],
    services: [
      "Wi-Fi",
      "Réception",
      "Climatisation",
      "Parking",
    ],
  },

  {
    id: 21,
    name: "Chafarina's Beach Hotel",
    stars: 3,
    rating: 3.5,
    reviews: 176,
    location: "Tala Youssef",
    address: "Tala Youssef, Al Hoceima",
    price: 0,
    phone: "+212808518378",
    hours: "24h/24",
    coordinates: "35.2260,-3.9630",
    description:
      "Hôtel situé dans la zone de Tala Youssef près du littoral.",
    rooms: [],
    services: [
      "Wi-Fi",
      "Parking",
      "Climatisation",
      "Réception",
    ],
  },
];

/* =========================================================
   DATA - RESTAURANTS
========================================================= */

const restaurants = [
  {
    id: 1,
    name: "Break Alhoceima",
    rating: 4.3,
    reviews: 493,
    cuisine: ["Italienne", "Pizza", "Fast Food"],
    price: "50–100 DH",
    location: "Al Hoceima",
    address: "25 Av. Hassan II, Al Hoceima",
    phone: "+212539841311",
    hours: "12h00 - 01h30",
    coordinates: "35.2512,-3.9375",
    description:
      "Restaurant proposant notamment des pizzas, plats italiens et options de restauration rapide.",
    services: [
      "Wi-Fi gratuit",
      "Terrasse",
      "À emporter",
      "Réservation",
      "Paiement par carte",
      "Service à table",
    ],
  },
  {
    id: 2,
    name: "il Gusto",
    rating: 4.1,
    reviews: 268,
    cuisine: ["Italienne"],
    price: "50–150 DH",
    location: "Al Hoceima",
    address: "18 Rue 9 Juillet, Al Hoceima",
    phone: "+212667595746",
    hours: "13h00 - 00h30",
    coordinates: "35.2507,-3.9369",
    description:
      "Une adresse italienne au cœur d'Al Hoceima.",
    services: [
      "Service à table",
      "À emporter",
      "Réservation",
      "Paiement par carte",
    ],
  },
  {
    id: 3,
    name: "Niebla Marina",
    rating: 3.4,
    reviews: 171,
    cuisine: [
      "Marocaine",
      "Fruits de mer",
      "Méditerranéenne",
      "Grillades",
    ],
    price: "100–250 DH",
    location: "Marina, Al Hoceima",
    address: "Marina, Al Hoceima",
    phone: "+212808646614",
    hours: "11h00 - 02h00",
    coordinates: "35.2478,-3.9305",
    description:
      "Restaurant situé dans la zone de la marina.",
    services: [
      "Vue sur la marina",
      "Terrasse",
      "Parking",
      "Livraison",
      "À emporter",
      "Réservation",
      "Wi-Fi",
    ],
  },
  {
    id: 4,
    name: "T Hoekje Restaurant",
    rating: 3.2,
    reviews: 321,
    cuisine: ["Restaurant", "Cuisine variée"],
    price: "100–350 DH",
    location: "Corniche de Sabadia",
    address:
      "Rue Tarik, Corniche de Sabadia, Al Hoceima",
    phone: "+212613178622",
    hours: "09h00 - 02h00",
    coordinates: "35.2505,-3.9328",
    description:
      "Restaurant situé près de la corniche maritime de Sabadia.",
    services: [
      "Terrasse",
      "Service à table",
      "Réservation",
      "À emporter",
    ],
  },
  {
    id: 5,
    name: "Casa Bento",
    rating: 4.1,
    reviews: 291,
    cuisine: [
      "Italienne",
      "Mexicaine",
      "Japonaise",
      "Marocaine",
    ],
    price: "50–150 DH",
    location: "Al Hoceima",
    address:
      "58 Bd Tarik Ibn Ziyad, Al Hoceima",
    phone: "+212605839594",
    hours: "07h00 - 01h00",
    coordinates: "35.2520,-3.9350",
    description:
      "Une adresse proposant une cuisine variée.",
    services: [
      "Petit-déjeuner",
      "Livraison",
      "À emporter",
      "Terrasse",
      "Réservation",
      "Wi-Fi",
    ],
  },
  {
    id: 6,
    name: "BARBECUE BROTHER'S",
    rating: 4.9,
    reviews: 383,
    cuisine: ["Grillades", "Barbecue"],
    price: "1–50 DH",
    location: "Sidi Abid",
    address: "Av. Sidi Abid, Al Hoceima",
    phone: "+212623573845",
    hours: "12h00 - 03h00",
    coordinates: "35.2449,-3.9440",
    description:
      "Une adresse spécialisée dans les grillades et le barbecue.",
    services: [
      "Livraison",
      "À emporter",
      "Parking",
      "Terrasse",
      "Service à table",
    ],
  },
];

/* =========================================================
   DATA - GAMING
========================================================= */

const gamingPlaces = [
  {
    id: 1,
    name: "Gaming House Al Hoceima",
    rating: 4.6,
    reviews: 84,
    type: ["PS5", "PC Gaming", "Esport"],
    price: "10–30 DH / heure",
    location: "Centre-ville",
    address: "Centre-ville, Al Hoceima",
    phone: "+212600000001",
    hours: "14h00 - 02h00",
    coordinates: "35.2504,-3.9365",
    description:
      "Espace gaming pour jouer entre amis sur PC et consoles, avec une ambiance dédiée aux joueurs.",
    services: [
      "PC Gaming",
      "PS5",
      "Esport",
      "Wi-Fi",
      "Tournois",
      "Snacks",
    ],
  },
  {
    id: 2,
    name: "Hoceima Esports Arena",
    rating: 4.5,
    reviews: 61,
    type: ["PC Gaming", "Esport", "Compétition"],
    price: "15–40 DH / heure",
    location: "Al Hoceima",
    address: "Al Hoceima, Maroc",
    phone: "+212600000002",
    hours: "15h00 - 01h00",
    coordinates: "35.2520,-3.9380",
    description:
      "Un espace consacré au gaming compétitif et aux jeux vidéo entre amis.",
    services: [
      "PC Gaming",
      "Esport",
      "Tournois",
      "Wi-Fi",
      "Casques Gaming",
    ],
  },
  {
    id: 3,
    name: "PlayZone Hoceima",
    rating: 4.3,
    reviews: 47,
    type: ["PS5", "FIFA", "Jeux vidéo"],
    price: "10–25 DH / heure",
    location: "Al Hoceima",
    address: "Al Hoceima, Maroc",
    phone: "+212600000003",
    hours: "12h00 - 00h00",
    coordinates: "35.2488,-3.9390",
    description:
      "Un espace gaming convivial pour jouer à FIFA, jeux de sport et autres jeux vidéo.",
    services: [
      "PS5",
      "FIFA",
      "Jeux vidéo",
      "Wi-Fi",
      "Tournois",
    ],
  },
];

/* =========================================================
   CATEGORIES
========================================================= */

const categories = [
  { id: "hotels", icon: "▣", name: "Hôtels" },
  { id: "restaurants", icon: "♜", name: "Restaurants" },
  { id: "pharmacies", icon: "✚", name: "Pharmacies" },
  { id: "cafes", icon: "☕", name: "Cafés" },
  { id: "beauty", icon: "✦", name: "Beauté" },
  { id: "gaming", icon: "🎮", name: "Gaming" },
  { id: "shopping", icon: "◇", name: "Shopping" },
  { id: "activities", icon: "☆", name: "Activités" },
  { id: "transport", icon: "↗", name: "Transport" },
];

/* =========================================================
   HELPERS
========================================================= */

function scrollTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

function mapsUrl(coordinates) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    coordinates
  )}`;
}

/* =========================================================
   NAVBAR
========================================================= */

function Navbar({
  menuOpen,
  setMenuOpen,
  goHome,
  openCategory,
}) {
  function closeAnd(action) {
    action();
    setMenuOpen(false);
  }

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <button
          className="logo"
          type="button"
          onClick={() => closeAnd(goHome)}
        >
          <span className="logo-mark">⌖</span>
          <span>
            Villa<span>Map</span>
          </span>
        </button>

        <nav className={menuOpen ? "menu menu-open" : "menu"}>
          <button
            type="button"
            onClick={() => closeAnd(goHome)}
          >
            Accueil
          </button>

          <button
            type="button"
            onClick={() =>
              closeAnd(() => openCategory("restaurants"))
            }
          >
            Explorer
          </button>

          <button
            type="button"
            onClick={() =>
              closeAnd(() => openCategory("hotels"))
            }
          >
            Hôtels
          </button>

          <button
            type="button"
            onClick={() =>
              closeAnd(() => openCategory("restaurants"))
            }
          >
            Restaurants
          </button>

          <button
            type="button"
            onClick={() =>
              closeAnd(() => openCategory("gaming"))
            }
          >
            Gaming
          </button>

          <button
            type="button"
            onClick={() => {
              setMenuOpen(false);
              goHome();

              setTimeout(() => {
                const about =
                  document.getElementById("about");

                if (about) {
                  about.scrollIntoView({
                    behavior: "smooth",
                  });
                }
              }, 250);
            }}
          >
            À propos
          </button>
        </nav>

        <div className="nav-location">
          ⌖ Al Hoceima
        </div>

        <button
          className="mobile-button"
          type="button"
          onClick={() =>
            setMenuOpen((value) => !value)
          }
        >
          {menuOpen ? "×" : "☰"}
        </button>
      </div>
    </header>
  );
}

/* =========================================================
   SEARCH
========================================================= */

function SearchBox({ value, onChange, full = false }) {
  return (
    <div
      className={`search-box-modern ${
        full ? "full" : ""
      }`}
    >
      <span>⌕</span>

      <input
        type="search"
        value={value}
        placeholder="Que cherchez-vous ?"
        onChange={(event) =>
          onChange(event.target.value)
        }
      />

      <button
        type="button"
        onClick={() =>
          onChange(value.trim())
        }
      >
        Rechercher
      </button>
    </div>
  );
}

/* =========================================================
   CATEGORIES
========================================================= */

function CategoryGrid({ openCategory }) {
  return (
    <div className="category-grid-modern">
      {categories.map((category) => (
        <button
          key={category.id}
          className="category-tile"
          type="button"
          onClick={() =>
            openCategory(category.id)
          }
        >
          <span className="category-icon">
            {category.icon}
          </span>

          <span>{category.name}</span>

          <b>→</b>
        </button>
      ))}
    </div>
  );
}

/* =========================================================
   FAVORITE
========================================================= */

function FavoriteButton() {
  const [favorite, setFavorite] = useState(false);

  return (
    <button
      className={`heart ${
        favorite ? "favorite" : ""
      }`}
      type="button"
      onClick={(event) => {
        event.stopPropagation();
        setFavorite((value) => !value);
      }}
    >
      {favorite ? "♥" : "♡"}
    </button>
  );
}

/* =========================================================
   RESTAURANT CARD
========================================================= */

function RestaurantCard({
  restaurant,
  openRestaurant,
}) {
  return (
    <article
      className="listing-card"
      onClick={() =>
        openRestaurant(restaurant)
      }
    >
      <div
        className="listing-photo"
        style={{
          backgroundImage: `url("${foodImage}")`,
        }}
      >
        <span className="rating-pill">
          ★ {restaurant.rating}
        </span>

        <FavoriteButton />
      </div>

      <div className="listing-body">
        <div className="eyebrow">
          Restaurant
        </div>

        <h3>{restaurant.name}</h3>

        <p className="muted">
          📍 {restaurant.location} ·{" "}
          {restaurant.price}
        </p>

        <div className="tags">
          {restaurant.cuisine
            .slice(0, 3)
            .map((item) => (
              <span key={item}>{item}</span>
            ))}
        </div>

        <div className="card-bottom">
          <small>
            ★ {restaurant.rating} ·{" "}
            {restaurant.reviews} avis
          </small>

          <b>Voir →</b>
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   HOTEL CARD
========================================================= */

function HotelCard({ hotel, openHotel }) {
  return (
    <article
      className="listing-card"
      onClick={() => openHotel(hotel)}
    >
      <div
        className="listing-photo"
        style={{
          backgroundImage: `url("${hotelImage}")`,
        }}
      >
        <span className="rating-pill">
          ★ {hotel.rating}
        </span>

        <FavoriteButton />
      </div>

      <div className="listing-body">
        <div className="eyebrow">
          Hôtel · {hotel.stars} étoiles
        </div>

        <h3>{hotel.name}</h3>

        <p className="muted">
          📍 {hotel.location}
        </p>

        <div className="card-bottom">
          <small>
            ★ {hotel.rating} ·{" "}
            {hotel.reviews} avis
          </small>

          {hotel.price > 0 ? (
            <strong>
              À partir de {hotel.price} DH
            </strong>
          ) : (
            <strong>
              Voir les tarifs
            </strong>
          )}
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   GAMING CARD
========================================================= */

function GamingCard({ gaming, openGaming }) {
  return (
    <article
      className="listing-card"
      onClick={() => openGaming(gaming)}
    >
      <div
        className="listing-photo"
        style={{
          backgroundImage: `url("${gamingImage}")`,
        }}
      >
        <span className="rating-pill">
          ★ {gaming.rating}
        </span>

        <FavoriteButton />
      </div>

      <div className="listing-body">
        <div className="eyebrow">
          🎮 Gaming
        </div>

        <h3>{gaming.name}</h3>

        <p className="muted">
          📍 {gaming.location} ·{" "}
          {gaming.price}
        </p>

        <div className="tags">
          {gaming.type
            .slice(0, 3)
            .map((item) => (
              <span key={item}>{item}</span>
            ))}
        </div>

        <div className="card-bottom">
          <small>
            ★ {gaming.rating} ·{" "}
            {gaming.reviews} avis
          </small>

          <b>Voir →</b>
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   DETAIL PAGE
========================================================= */

function DetailPage({
  item,
  type,
  goHome,
  openCategory,
  menuOpen,
  setMenuOpen,
}) {
  const isRestaurant =
    type === "restaurant";

  const isGaming = type === "gaming";

  const image = isGaming
    ? gamingImage
    : isRestaurant
    ? foodImage
    : hotelImage;

  const categoryName = isGaming
    ? "Gaming"
    : isRestaurant
    ? "Restaurants"
    : "Hôtels";

  const typeLabel = isGaming
    ? "GAMING"
    : isRestaurant
    ? "RESTAURANT"
    : "HÔTEL";

  let informationType = "";

  if (isGaming) {
    informationType =
      item.type.join(" · ");
  } else if (isRestaurant) {
    informationType =
      item.cuisine.join(" · ");
  } else {
    informationType =
      `Hôtel ${item.stars} étoiles`;
  }

  const priceText =
    isRestaurant || isGaming
      ? item.price
      : item.price > 0
      ? `${item.price} DH / nuit`
      : "Tarif à vérifier";

  function handleBack() {
    openCategory(
      isGaming
        ? "gaming"
        : isRestaurant
        ? "restaurants"
        : "hotels"
    );
  }

  return (
    <div className="app">
      <Navbar
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        goHome={goHome}
        openCategory={openCategory}
      />

      <main className="detail-page-modern">
        <button
          className="back-link"
          type="button"
          onClick={handleBack}
        >
          ← Retour
        </button>

        <div className="detail-breadcrumb">
          Accueil · {categoryName} ·{" "}
          {item.name}
        </div>

        <section className="detail-hero-modern">
          <div>
            <span className="eyebrow">
              {typeLabel}
            </span>

            <h1>{item.name}</h1>

            <div className="detail-rating">
              <strong>{item.rating}</strong>
              <span>★★★★★</span>
              <small>
                {item.reviews} avis
              </small>
            </div>

            <p>📍 {item.address}</p>

            <div className="detail-actions">
              <a
                href={mapsUrl(
                  item.coordinates
                )}
                target="_blank"
                rel="noreferrer"
              >
                ⌖ Voir sur la carte
              </a>

              {item.phone ? (
                <a
                  className="primary"
                  href={`tel:${item.phone}`}
                >
                  ☎ Appeler
                </a>
              ) : (
                <button
                  className="primary"
                  type="button"
                  disabled
                >
                  ☎ Téléphone indisponible
                </button>
              )}
            </div>
          </div>

          <div
            className="detail-main-photo"
            style={{
              backgroundImage: `url("${image}")`,
            }}
          >
            <span>1 / 4</span>
          </div>
        </section>

        <div className="detail-thumbs">
          <div
            style={{
              backgroundImage: `url("${image}")`,
            }}
          />

          <div
            style={{
              backgroundImage: `url("${beachImage}")`,
            }}
          />

          <div
            style={{
              backgroundImage: `url("${foodImage}")`,
            }}
          />

          <div
            style={{
              backgroundImage: `url("${gamingImage}")`,
            }}
          />
        </div>

        <div className="detail-layout-modern">
          <div className="detail-content-modern">
            <section className="detail-card-modern">
              <h2>À propos</h2>
              <p>{item.description}</p>
            </section>

            <section className="detail-card-modern">
              <h2>
                Informations pratiques
              </h2>

              <div className="info-list">
                <div>
                  <span>⌁</span>
                  <label>Type</label>
                  <strong>
                    {informationType}
                  </strong>
                </div>

                <div>
                  <span>⌖</span>
                  <label>
                    Localisation
                  </label>
                  <strong>
                    {item.location}
                  </strong>
                </div>

                <div>
                  <span>◷</span>
                  <label>Horaires</label>
                  <strong>
                    {item.hours}
                  </strong>
                </div>

                <div>
                  <span>☎</span>
                  <label>Téléphone</label>
                  <strong>
                    {item.phone ||
                      "Non disponible"}
                  </strong>
                </div>

                <div>
                  <span>DH</span>
                  <label>Prix</label>
                  <strong>
                    {priceText}
                  </strong>
                </div>
              </div>
            </section>

            <section className="detail-card-modern">
              <h2>
                Services disponibles
              </h2>

              <div className="service-chips">
                {item.services.map(
                  (service) => (
                    <span key={service}>
                      ✓ {service}
                    </span>
                  )
                )}
              </div>
            </section>

            {!isRestaurant &&
              !isGaming &&
              item.rooms &&
              item.rooms.length > 0 && (
                <section className="detail-card-modern">
                  <h2>
                    Types de chambres
                  </h2>

                  <div className="rooms-grid">
                    {item.rooms.map(
                      (room) => (
                        <div
                          className="room-card"
                          key={room.name}
                        >
                          <span>
                            {room.icon}
                          </span>

                          <div>
                            <strong>
                              {room.name}
                            </strong>

                            <small>
                              À partir de{" "}
                              {room.price} DH
                            </small>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </section>
              )}
          </div>

          <aside className="detail-aside">
            <div className="aside-card">
              <span>
                Prix indicatif
              </span>

              <strong>
                {priceText}
              </strong>

              <small>
                {isGaming
                  ? "selon la durée"
                  : isRestaurant
                  ? "par personne"
                  : "par nuit"}
              </small>

              <button
                type="button"
                onClick={() =>
                  alert(
                    isGaming
                      ? "La réservation gaming sera bientôt disponible."
                      : isRestaurant
                      ? "Le menu sera bientôt disponible."
                      : "La réservation en ligne sera bientôt disponible."
                  )
                }
              >
                {isGaming
                  ? "Réserver une session"
                  : isRestaurant
                  ? "Voir le menu"
                  : "Réserver maintenant"}
              </button>
            </div>

            <a
              className="mini-map-modern"
              href={mapsUrl(
                item.coordinates
              )}
              target="_blank"
              rel="noreferrer"
            >
              <span>⌖</span>
              <b>Al Hoceima</b>
              <small>
                Voir sur la carte →
              </small>
            </a>
          </aside>
        </div>
      </main>
    </div>
  );
}

/* =========================================================
   EMPTY
========================================================= */

function EmptyResults() {
  return (
    <div className="empty-category">
      <span>⌕</span>

      <h2>Aucun résultat</h2>

      <p>
        Essayez une autre recherche ou un
        autre filtre.
      </p>
    </div>
  );
}

/* =========================================================
   EXPLORER
========================================================= */

function ExplorerPage({
  category,
  search,
  setSearch,
  openHotel,
  openRestaurant,
  openGaming,
  openCategory,
  goHome,
  menuOpen,
  setMenuOpen,
}) {
  const [filter, setFilter] =
    useState("Tous");

  const isHotel =
    category === "hotels";

  const isRestaurant =
    category === "restaurants";

  const isGaming =
    category === "gaming";

  const categoryObject =
    categories.find(
      (item) => item.id === category
    );

  const categoryTitle = isHotel
    ? "Hôtels à Al Hoceima"
    : isRestaurant
    ? "Restaurants à Al Hoceima"
    : isGaming
    ? "Gaming à Al Hoceima"
    : categoryObject?.name ||
      "Explorer";

  const filteredHotels =
    useMemo(() => {
      const query =
        search.toLowerCase().trim();

      return hotels.filter((hotel) => {
        const text =
          `${hotel.name} ${hotel.location} ${hotel.address}`.toLowerCase();

        if (!text.includes(query)) {
          return false;
        }

        if (filter === "4★ et +") {
          return hotel.stars >= 4;
        }

        return true;
      });
    }, [search, filter]);

  const filteredRestaurants =
    useMemo(() => {
      const query =
        search.toLowerCase().trim();

      return restaurants.filter(
        (restaurant) => {
          const text =
            `${restaurant.name} ${restaurant.location} ${restaurant.address} ${restaurant.cuisine.join(
              " "
            )}`.toLowerCase();

          if (!text.includes(query)) {
            return false;
          }

          if (
            [
              "Italienne",
              "Marocaine",
              "Fruits de mer",
            ].includes(filter)
          ) {
            return restaurant.cuisine.includes(
              filter
            );
          }

          if (filter === "4★ et +") {
            return restaurant.rating >= 4;
          }

          return true;
        }
      );
    }, [search, filter]);

  const filteredGaming =
    useMemo(() => {
      const query =
        search.toLowerCase().trim();

      return gamingPlaces.filter(
        (gaming) => {
          const text =
            `${gaming.name} ${gaming.location} ${gaming.address} ${gaming.type.join(
              " "
            )}`.toLowerCase();

          if (!text.includes(query)) {
            return false;
          }

          if (filter === "4★ et +") {
            return gaming.rating >= 4;
          }

          if (filter === "PC Gaming") {
            return gaming.type.includes(
              "PC Gaming"
            );
          }

          if (filter === "PS5") {
            return gaming.type.includes(
              "PS5"
            );
          }

          return true;
        }
      );
    }, [search, filter]);

  const filters = isRestaurant
    ? [
        "Tous",
        "Italienne",
        "Marocaine",
        "Fruits de mer",
        "4★ et +",
      ]
    : isGaming
    ? [
        "Tous",
        "PC Gaming",
        "PS5",
        "4★ et +",
      ]
    : ["Tous", "4★ et +"];

  return (
    <div className="app">
      <Navbar
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        goHome={goHome}
        openCategory={openCategory}
      />

      <main className="explorer-page">
        <div className="page-kicker">
          EXPLORER
        </div>

        <h1>{categoryTitle}</h1>

        <p>
          Découvrez facilement les meilleurs
          établissements disponibles à Al
          Hoceima.
        </p>

        <SearchBox
          full
          value={search}
          onChange={setSearch}
        />

        {(isRestaurant ||
          isHotel ||
          isGaming) && (
          <div className="filter-row">
            {filters.map((item) => (
              <button
                key={item}
                type="button"
                className={
                  filter === item
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setFilter(item)
                }
              >
                {item}
              </button>
            ))}
          </div>
        )}

        {isHotel &&
          (filteredHotels.length > 0 ? (
            <div className="listing-grid">
              {filteredHotels.map(
                (hotel) => (
                  <HotelCard
                    key={hotel.id}
                    hotel={hotel}
                    openHotel={openHotel}
                  />
                )
              )}
            </div>
          ) : (
            <EmptyResults />
          ))}

        {isRestaurant &&
          (filteredRestaurants.length >
          0 ? (
            <div className="listing-grid">
              {filteredRestaurants.map(
                (restaurant) => (
                  <RestaurantCard
                    key={restaurant.id}
                    restaurant={restaurant}
                    openRestaurant={
                      openRestaurant
                    }
                  />
                )
              )}
            </div>
          ) : (
            <EmptyResults />
          ))}

        {isGaming &&
          (filteredGaming.length > 0 ? (
            <div className="listing-grid">
              {filteredGaming.map(
                (gaming) => (
                  <GamingCard
                    key={gaming.id}
                    gaming={gaming}
                    openGaming={openGaming}
                  />
                )
              )}
            </div>
          ) : (
            <EmptyResults />
          ))}

        {!isHotel &&
          !isRestaurant &&
          !isGaming && (
            <div className="empty-category">
              <span>
                {categoryObject?.icon ||
                  "✦"}
              </span>

              <h2>{categoryTitle}</h2>

              <p>
                Cette catégorie sera bientôt
                disponible sur VillaMap.
              </p>
            </div>
          )}
      </main>
    </div>
  );
}

/* =========================================================
   HOME
========================================================= */

function HomePage({
  search,
  setSearch,
  openCategory,
  openHotel,
  openRestaurant,
  openGaming,
}) {
  function handleHomeSearch(value) {
    setSearch(value);

    if (value.trim()) {
      openCategory("restaurants");
    }
  }

  return (
    <main>
      <section className="hero-modern">
        <div className="hero-copy">
          <span className="page-kicker">
            📍 AL HOCEIMA, MAROC
          </span>

          <h1>
            Découvrez
            <br />
            <em>Al Hoceima.</em>
          </h1>

          <p>
            Hôtels, restaurants, gaming,
            cafés, activités et services
            réunis au même endroit.
          </p>

          <SearchBox
            value={search}
            onChange={handleHomeSearch}
          />
        </div>

        <div className="hero-visual">
          <img
            src={heroImage}
            alt="Al Hoceima"
          />

          <div className="hero-map-badge">
            <span className="map-symbol">
              ⌖
            </span>

            <span>
              Al Hoceima
              <br />
              <small>
                Votre guide local
              </small>
            </span>
          </div>
        </div>
      </section>

      <section className="section-modern">
        <div className="section-heading">
          <div>
            <span className="page-kicker">
              EXPLORER
            </span>

            <h2>
              Tout ce dont vous avez
              besoin
            </h2>

            <p>
              Trouvez rapidement ce qui vous
              intéresse.
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              openCategory("restaurants")
            }
          >
            Tout voir →
          </button>
        </div>

        <CategoryGrid
          openCategory={openCategory}
        />
      </section>

      <section className="section-modern soft">
        <div className="section-heading">
          <div>
            <span className="page-kicker">
              POPULAIRE
            </span>

            <h2>
              Les établissements du moment
            </h2>

            <p>
              Une sélection pour commencer
              votre découverte.
            </p>
          </div>
        </div>

        <div className="featured-grid">
          <RestaurantCard
            restaurant={restaurants[0]}
            openRestaurant={
              openRestaurant
            }
          />

          <HotelCard
            hotel={hotels[0]}
            openHotel={openHotel}
          />

          <GamingCard
            gaming={gamingPlaces[0]}
            openGaming={openGaming}
          />
        </div>
      </section>

      <section
        className="about-modern"
        id="about"
      >
        <div>
          <span className="page-kicker">
            POURQUOI VILLAMAP ?
          </span>

          <h2>
            Tout Al Hoceima,
            <br />
            <em>au même endroit.</em>
          </h2>

          <p>
            VillaMap simplifie la découverte
            de la ville. Que vous soyez
            résident ou visiteur, trouvez
            rapidement les établissements et
            activités qui vous intéressent.
          </p>
        </div>

        <div className="about-points">
          <div>
            <b>⌖</b>
            <strong>Local</strong>
            <span>
              Pensé spécialement pour Al
              Hoceima.
            </span>
          </div>

          <div>
            <b>⌕</b>
            <strong>Simple</strong>
            <span>
              Trouvez rapidement ce que vous
              cherchez.
            </span>
          </div>

          <div>
            <b>🎮</b>
            <strong>Gaming</strong>
            <span>
              Découvrez aussi les espaces
              gaming de la ville.
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}

/* =========================================================
   FOOTER
========================================================= */

function Footer() {
  return (
    <footer>
      <div>
        <strong>
          <span>⌖</span> VillaMap
        </strong>

        <p>
          Votre guide local à Al Hoceima.
        </p>
      </div>

      <small>
        © 2026 VillaMap · Al Hoceima,
        Maroc
      </small>
    </footer>
  );
}

/* =========================================================
   APP
========================================================= */

export default function App() {
  const [search, setSearch] =
    useState("");

  const [selectedCategory, setSelectedCategory] =
    useState(null);

  const [selectedHotel, setSelectedHotel] =
    useState(null);

  const [selectedRestaurant, setSelectedRestaurant] =
    useState(null);

  const [selectedGaming, setSelectedGaming] =
    useState(null);

  const [menuOpen, setMenuOpen] =
    useState(false);

  function goHome() {
    setSelectedCategory(null);
    setSelectedHotel(null);
    setSelectedRestaurant(null);
    setSelectedGaming(null);
    setSearch("");
    setMenuOpen(false);

    scrollTop();
  }

  function openCategory(category) {
    setSelectedCategory(category);
    setSelectedHotel(null);
    setSelectedRestaurant(null);
    setSelectedGaming(null);
    setSearch("");
    setMenuOpen(false);

    setTimeout(scrollTop, 50);
  }

  function openHotel(hotel) {
    setSelectedHotel(hotel);
    setSelectedRestaurant(null);
    setSelectedGaming(null);
    setSelectedCategory(null);
    setMenuOpen(false);

    scrollTop();
  }

  function openRestaurant(
    restaurant
  ) {
    setSelectedRestaurant(restaurant);
    setSelectedHotel(null);
    setSelectedGaming(null);
    setSelectedCategory(null);
    setMenuOpen(false);

    scrollTop();
  }

  function openGaming(gaming) {
    setSelectedGaming(gaming);
    setSelectedHotel(null);
    setSelectedRestaurant(null);
    setSelectedCategory(null);
    setMenuOpen(false);

    scrollTop();
  }

  if (selectedHotel) {
    return (
      <DetailPage
        item={selectedHotel}
        type="hotel"
        goHome={goHome}
        openCategory={openCategory}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />
    );
  }

  if (selectedRestaurant) {
    return (
      <DetailPage
        item={selectedRestaurant}
        type="restaurant"
        goHome={goHome}
        openCategory={openCategory}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />
    );
  }

  if (selectedGaming) {
    return (
      <DetailPage
        item={selectedGaming}
        type="gaming"
        goHome={goHome}
        openCategory={openCategory}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />
    );
  }

  if (selectedCategory) {
    return (
      <ExplorerPage
        category={selectedCategory}
        search={search}
        setSearch={setSearch}
        openHotel={openHotel}
        openRestaurant={openRestaurant}
        openGaming={openGaming}
        openCategory={openCategory}
        goHome={goHome}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />
    );
  }

  return (
    <div className="app">
      <Navbar
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        goHome={goHome}
        openCategory={openCategory}
      />

      <HomePage
        search={search}
        setSearch={setSearch}
        openCategory={openCategory}
        openHotel={openHotel}
        openRestaurant={openRestaurant}
        openGaming={openGaming}
      />

      <Footer />
    </div>
  );
}
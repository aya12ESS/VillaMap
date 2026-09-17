import { useEffect, useMemo, useState } from "react";
import logo from "./assets/logo.png.png";
import "./index.css";
import { supabase } from "./supabaseClient";

/* =========================================================
   IMAGES
========================================================= */

const heroImage =
  "https://commons.wikimedia.org/wiki/Special:FilePath/Al%20Hoceima%20Beach.jpg?width=1400";

const fallbackImages = {
  hotels:
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80",
  restaurants:
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80",
  pharmacies:
    "https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&w=1000&q=80",
  cafes:
    "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1000&q=80",
  beauty:
    "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1000&q=80",
  gaming:
    "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1000&q=80",
  shopping:
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1000&q=80",
  activities:
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=80",
  transport:
    "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1000&q=80",
};

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

const emptyData = {
  hotels: [],
  restaurants: [],
  pharmacies: [],
  cafes: [],
  beauty: [],
  gaming: [],
  shopping: [],
  activities: [],
  transport: [],
};

/* =========================================================
   HELPERS
========================================================= */

function getCategoryName(type) {
  return (
    categories.find((category) => category.id === type)?.name ||
    "Lieu"
  );
}

function getImage(item, type) {
  return (
    item.main_image_url ||
    item.image ||
    item.image_url ||
    item.photo ||
    item.cover ||
    fallbackImages[type] ||
    heroImage
  );
}

function mapsUrl(item) {
  if (item.google_maps) return item.google_maps;

  if (item.maps_url) return item.maps_url;

  if (item.latitude && item.longitude) {
    return `https://www.google.com/maps/search/?api=1&query=${item.latitude},${item.longitude}`;
  }

  const query = encodeURIComponent(
    `${item.name || ""} ${item.address || ""} Al Hoceima`
  );

  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

function scrollTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

/* =========================================================
   AUTH MODAL
========================================================= */

function AuthModal({ onClose, onUserChange }) {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      if (!email || !password) {
        setMessage("Veuillez remplir tous les champs.");
        return;
      }

      if (mode === "login") {
        const { data, error } =
          await supabase.auth.signInWithPassword({
            email,
            password,
          });

        if (error) throw error;

        onUserChange?.(data.user);
        onClose();
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) throw error;

        onUserChange?.(data.user);

        setMessage(
          "Compte créé. Vérifiez votre email si une confirmation est demandée."
        );
      }
    } catch (error) {
      setMessage(error.message || "Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(10,30,40,.55)",
        display: "grid",
        placeItems: "center",
        padding: 20,
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 420,
          background: "#fff",
          borderRadius: 22,
          padding: 28,
          boxShadow: "0 25px 80px rgba(0,0,0,.2)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <div>
            <span className="page-kicker">VILLAMAP</span>

            <h2>
              {mode === "login"
                ? "Bienvenue 👋"
                : "Créer un compte"}
            </h2>
          </div>

          <button
            onClick={onClose}
            style={{
              border: 0,
              background: "#f2f7f9",
              width: 36,
              height: 36,
              borderRadius: "50%",
              fontSize: 20,
            }}
          >
            ×
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "grid",
            gap: 12,
          }}
        >
          <input
            type="email"
            placeholder="Votre email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              padding: "13px 14px",
              border: "1px solid #e2edf2",
              borderRadius: 11,
              outline: "none",
            }}
          />

          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              padding: "13px 14px",
              border: "1px solid #e2edf2",
              borderRadius: 11,
              outline: "none",
            }}
          />

          {message && (
            <p
              style={{
                fontSize: 13,
                color: "#d45b5b",
              }}
            >
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              border: 0,
              background: "#1499dc",
              color: "#fff",
              padding: "13px",
              borderRadius: 11,
              fontWeight: 800,
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading
              ? "Chargement..."
              : mode === "login"
              ? "Se connecter"
              : "Créer mon compte"}
          </button>
        </form>

        <button
          onClick={() => {
            setMode(mode === "login" ? "signup" : "login");
            setMessage("");
          }}
          style={{
            width: "100%",
            border: 0,
            background: "none",
            color: "#1499dc",
            marginTop: 18,
            fontWeight: 700,
          }}
        >
          {mode === "login"
            ? "Créer un nouveau compte"
            : "J'ai déjà un compte"}
        </button>
      </div>
    </div>
  );
}

/* =========================================================
   NAVBAR
========================================================= */

function Navbar({
  search,
  setSearch,
  menuOpen,
  setMenuOpen,
  onHome,
  onExplorer,
  onCategory,
  user,
  onAuth,
  isAdmin,
  onAdmin,
}) {
  async function logout() {
    await supabase.auth.signOut();
  }

  function go(action) {
    setMenuOpen(false);
    action();
    scrollTop();
  }

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <button
          className="logo"
          onClick={() => go(onHome)}
          aria-label="Retour à l'accueil VillaMap"
        >
          <img
            src={logo}
            alt="VillaMap — guide local d'Al Hoceima"
            className="logo-image"
          />
        </button>

        <nav
          className={`menu ${
            menuOpen ? "menu-open" : ""
          }`}
        >
          <button onClick={() => go(onHome)}>
            Accueil
          </button>

          <button onClick={() => go(onExplorer)}>
            Explorer
          </button>

          <button
            onClick={() =>
              go(() => onCategory("hotels"))
            }
          >
            Hôtels
          </button>

          <button
            onClick={() =>
              go(() => onCategory("restaurants"))
            }
          >
            Restaurants
          </button>

          <button
            onClick={() =>
              go(() => onCategory("gaming"))
            }
          >
            Gaming
          </button>

          <button
            onClick={() => {
              setMenuOpen(false);

              if (onHome) {
                onHome();
              }

              setTimeout(() => {
                document
                  .getElementById("about")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  });
              }, 50);
            }}
          >
            À propos
          </button>
        </nav>

        <div className="nav-location">
          ⌖ Al Hoceima
        </div>

        {isAdmin && (
          <button
            onClick={() => {
              setMenuOpen(false);
              onAdmin();
              scrollTop();
            }}
            style={{
              border: 0,
              background: "#163246",
              color: "#fff",
              borderRadius: 11,
              padding: "9px 13px",
              fontWeight: 750,
              fontSize: 12,
              cursor: "pointer",
            }}
          >
            📸 Admin
          </button>
        )}

        <button
          onClick={user ? logout : onAuth}
          style={{
            border: 0,
            background: "#eaf7fd",
            color: "#087bb7",
            borderRadius: 11,
            padding: "9px 13px",
            fontWeight: 750,
            fontSize: 12,
          }}
        >
          {user ? "Déconnexion" : "Connexion"}
        </button>

        <button
          className="mobile-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          {menuOpen ? "×" : "☰"}
        </button>
      </div>
    </header>
  );
}

/* =========================================================
   SEARCH BOX
========================================================= */

function SearchBox({
  value,
  onChange,
  onSubmit,
  full = false,
}) {
  return (
    <form
      className={`search-box-modern ${
        full ? "full" : ""
      }`}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.();
      }}
    >
      <span>⌕</span>

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Rechercher un lieu à Al Hoceima..."
        aria-label="Rechercher un lieu à Al Hoceima"
      />

      <button type="submit">
        Rechercher
      </button>
    </form>
  );
}

/* =========================================================
   CATEGORY GRID
========================================================= */

function CategoryGrid({ onCategory, data }) {
  return (
    <div className="category-grid-modern">
      {categories.map((category) => {
        const count =
          data?.[category.id]?.length || 0;

        return (
          <button
            className="category-tile"
            key={category.id}
            onClick={() => {
              onCategory(category.id);
              scrollTop();
            }}
          >
            <span className="category-icon">
              {category.icon}
            </span>

            <span>{category.name}</span>

            <b>{count}</b>
          </button>
        );
      })}
    </div>
  );
}

/* =========================================================
   FAVORITES
========================================================= */

function FavoriteButton({ item, type }) {
  const key = `villamap-favorite-${type}-${item.id}`;

  const [favorite, setFavorite] = useState(
    () => {
      try {
        return localStorage.getItem(key) === "true";
      } catch {
        return false;
      }
    }
  );

  function toggle(e) {
    e.stopPropagation();

    const next = !favorite;

    setFavorite(next);

    try {
      localStorage.setItem(key, String(next));
    } catch {
      // Ignore localStorage errors
    }
  }

  return (
    <button
      className={`heart ${
        favorite ? "favorite" : ""
      }`}
      onClick={toggle}
      aria-label={
        favorite
          ? "Retirer des favoris"
          : "Ajouter aux favoris"
      }
      type="button"
    >
      {favorite ? "♥" : "♡"}
    </button>
  );
}

/* =========================================================
   PLACE CARD
========================================================= */

function PlaceCard({
  item,
  type,
  onClick,
}) {
  const rating = Number(item.rating || 0);
  const placeName =
    item.name || "Lieu sans nom";

  function open() {
    onClick(item, type);
    scrollTop();
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      open();
    }
  }

  return (
    <article
      className="listing-card"
      onClick={open}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`${placeName} — ${getCategoryName(
        type
      )} à Al Hoceima`}
    >
      <div
        className="listing-photo"
        role="img"
        aria-label={`${placeName} à Al Hoceima`}
        style={{
          backgroundImage: `url("${getImage(
            item,
            type
          )}")`,
        }}
      >
        <span className="rating-pill">
          ⭐ {rating ? rating.toFixed(1) : "N/A"}
        </span>

        <FavoriteButton
          item={item}
          type={type}
        />
      </div>

      <div className="listing-body">
        <span className="eyebrow">
          {getCategoryName(type)}
        </span>

        <h3>{placeName}</h3>

        <p className="muted">
          📍{" "}
          {item.address ||
            "Al Hoceima, Maroc"}
        </p>

        {item.description && (
          <p
            className="muted"
            style={{
              marginTop: 6,
            }}
          >
            {item.description.length > 90
              ? `${item.description.slice(
                  0,
                  90
                )}...`
              : item.description}
          </p>
        )}

        {Array.isArray(item.services) &&
          item.services.length > 0 && (
            <div className="tags">
              {item.services
                .slice(0, 3)
                .map((service, index) => (
                  <span key={index}>
                    {service}
                  </span>
                ))}
            </div>
          )}

        <div className="card-bottom">
          <span>
            {item.reviews || 0} avis
          </span>

          <b>
            Voir détails →
          </b>
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   REVIEWS
========================================================= */

function ReviewsSection({
  item,
  type,
  user,
  onAuth,
}) {
  const placeId = `${type}-${item.id}`;

  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  async function loadReviews() {
    const { data, error } = await supabase
      .from("reviews")
      .select(
        "id, place_id, user_id, rating, comment, created_at"
      )
      .eq("place_id", placeId)
      .order("created_at", {
        ascending: false,
      });

    if (!error) {
      setReviews(data || []);
    } else {
      console.error(
        "Reviews error:",
        error
      );
    }
  }

  useEffect(() => {
    loadReviews();
  }, [placeId]);

  async function submitReview(e) {
    e.preventDefault();

    if (!user) {
      onAuth();
      return;
    }

    if (user.is_anonymous) {
      onAuth();
      return;
    }

    if (!comment.trim()) return;

    setLoading(true);

    const { error } = await supabase
      .from("reviews")
      .insert({
        place_id: placeId,
        user_id: user.id,
        rating,
        comment: comment.trim(),
      });

    if (!error) {
      setComment("");
      setRating(5);
      await loadReviews();
    } else {
      alert(error.message);
    }

    setLoading(false);
  }

  const average =
    reviews.length > 0
      ? reviews.reduce(
          (sum, review) =>
            sum + Number(review.rating || 0),
          0
        ) / reviews.length
      : 0;

  return (
    <section className="detail-card-modern">
      <h2>
        Avis des visiteurs
      </h2>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 20,
        }}
      >
        <strong
          style={{
            fontSize: 28,
            color: "#1499dc",
          }}
        >
          {average
            ? average.toFixed(1)
            : "—"}
        </strong>

        <span
          style={{
            color: "#f2aa20",
            letterSpacing: 2,
          }}
        >
          {"★".repeat(
            Math.round(average || 0)
          )}
          {"☆".repeat(
            Math.max(
              0,
              5 -
                Math.round(
                  average || 0
                )
            )
          )}
        </span>

        <small className="muted">
          ({reviews.length} avis)
        </small>
      </div>

      {reviews.length === 0 ? (
        <p
          className="muted"
          style={{
            marginBottom: 20,
          }}
        >
          Aucun avis pour le moment.
          Soyez le premier à donner votre
          avis !
        </p>
      ) : (
        <div
          style={{
            display: "grid",
            gap: 12,
            marginBottom: 24,
          }}
        >
          {reviews.map((review) => (
            <div
              key={review.id}
              style={{
                borderTop:
                  "1px solid #e2edf2",
                paddingTop: 14,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent:
                    "space-between",
                  gap: 10,
                }}
              >
                <strong>
                  ⭐{" "}
                  {Number(
                    review.rating
                  ).toFixed(0)}
                  /5
                </strong>

                <small className="muted">
                  {review.created_at
                    ? new Date(
                        review.created_at
                      ).toLocaleDateString(
                        "fr-FR"
                      )
                    : ""}
                </small>
              </div>

              <p
                style={{
                  marginTop: 5,
                }}
              >
                {review.comment}
              </p>
            </div>
          ))}
        </div>
      )}

      <form
        onSubmit={submitReview}
        style={{
          display: "grid",
          gap: 10,
        }}
      >
        <div>
          <label
            style={{
              display: "block",
              fontSize: 12,
              color: "#728492",
              marginBottom: 6,
            }}
          >
            Votre note
          </label>

          <select
            value={rating}
            onChange={(e) =>
              setRating(
                Number(e.target.value)
              )
            }
            style={{
              padding: "10px",
              border:
                "1px solid #e2edf2",
              borderRadius: 10,
              background: "#fff",
            }}
          >
            <option value={5}>
              ⭐⭐⭐⭐⭐ — 5
            </option>

            <option value={4}>
              ⭐⭐⭐⭐ — 4
            </option>

            <option value={3}>
              ⭐⭐⭐ — 3
            </option>

            <option value={2}>
              ⭐⭐ — 2
            </option>

            <option value={1}>
              ⭐ — 1
            </option>
          </select>
        </div>

        <textarea
          value={comment}
          onChange={(e) =>
            setComment(e.target.value)
          }
          placeholder={
            user
              ? "Écrivez votre avis..."
              : "Connectez-vous pour laisser un avis"
          }
          disabled={!user}
          rows={4}
          style={{
            width: "100%",
            resize: "vertical",
            padding: 12,
            border:
              "1px solid #e2edf2",
            borderRadius: 11,
            outline: "none",
          }}
        />

        {!user ? (
          <button
            type="button"
            onClick={onAuth}
            style={{
              border: 0,
              background: "#1499dc",
              color: "#fff",
              padding: 12,
              borderRadius: 10,
              fontWeight: 800,
            }}
          >
            Se connecter pour commenter
          </button>
        ) : (
          <button
            type="submit"
            disabled={loading}
            style={{
              border: 0,
              background: "#1499dc",
              color: "#fff",
              padding: 12,
              borderRadius: 10,
              fontWeight: 800,
            }}
          >
            {loading
              ? "Publication..."
              : "Publier mon avis"}
          </button>
        )}
      </form>
    </section>
  );
}

/* =========================================================
   PLACE PHOTOS
========================================================= */

function PlacePhotos({ item, user, onAuth }) {
  const [photos, setPhotos] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const placeId = item.id;

  async function loadPhotos() {
    const { data, error } = await supabase
      .from("restaurant_photos")
      .select(
        "id, place_id, image_url, created_at"
      )
      .eq("place_id", placeId)
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.error(
        "Photos error:",
        error
      );
      return;
    }

    setPhotos(data || []);
  }

  useEffect(() => {
    loadPhotos();
  }, [placeId]);

  async function handleUpload(event) {
    const file =
      event.target.files?.[0];

    if (!file) return;

    if (!user) {
      onAuth();
      event.target.value = "";
      return;
    }

    if (!file.type.startsWith("image/")) {
      setMessage(
        "Veuillez choisir une image."
      );
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setMessage(
        "La photo doit faire moins de 5 MB."
      );
      event.target.value = "";
      return;
    }

    setUploading(true);
    setMessage("");

    try {
      const extension =
        file.name.split(".").pop() ||
        "jpg";

      const fileName =
        `${placeId}/${Date.now()}-${Math.random()
          .toString(36)
          .slice(2)}.${extension}`;

      const {
        error: uploadError,
      } = await supabase.storage
        .from("restaurant-photos")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        throw uploadError;
      }

      const {
        data: publicUrlData,
      } = supabase.storage
        .from("restaurant-photos")
        .getPublicUrl(fileName);

      const imageUrl =
        publicUrlData.publicUrl;

      const {
        error: insertError,
      } = await supabase
        .from("restaurant_photos")
        .insert({
          place_id: placeId,
          image_url: imageUrl,
        });

      if (insertError) {
        throw insertError;
      }

      setMessage(
        "Photo ajoutée avec succès ✨"
      );

      await loadPhotos();
    } catch (error) {
      console.error(
        "Upload error:",
        error
      );

      setMessage(
        error.message ||
          "Impossible d'ajouter la photo."
      );
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  }

  return (
    <section className="detail-card-modern">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <div>
          <h2>📸 Photos</h2>

          <p
            style={{
              marginTop: 5,
              color: "#728492",
            }}
          >
            Partagez une photo de cet endroit
          </p>
        </div>

        <label
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "11px 16px",
            borderRadius: 14,
            background: "#1499dc",
            color: "#fff",
            fontWeight: 700,
            cursor: uploading
              ? "wait"
              : "pointer",
            opacity: uploading ? 0.7 : 1,
          }}
        >
          {uploading
            ? "⏳ Upload..."
            : "📷 Ajouter une photo"}

          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            disabled={uploading}
            style={{
              display: "none",
            }}
          />
        </label>
      </div>

      {message && (
        <p
          style={{
            marginTop: 12,
            color: "#087bb7",
            fontWeight: 600,
          }}
        >
          {message}
        </p>
      )}

      {photos.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill, minmax(180px, 1fr))",
            gap: 14,
            marginTop: 18,
          }}
        >
          {photos.map((photo) => (
            <img
              key={photo.id}
              src={photo.image_url}
              alt={`Photo de ${item.name} à Al Hoceima`}
              style={{
                width: "100%",
                height: 180,
                objectFit: "cover",
                borderRadius: 16,
                display: "block",
              }}
            />
          ))}
        </div>
      ) : (
        <div
          style={{
            marginTop: 18,
            padding: 25,
            textAlign: "center",
            borderRadius: 16,
            background: "#f5fafc",
            color: "#728492",
          }}
        >
          Aucune photo pour le moment 📷
        </div>
      )}
    </section>
  );
}

/* =========================================================
   DETAIL PAGE
========================================================= */

function DetailPage({
  item,
  type,
  onBack,
  user,
  onAuth,
}) {
  const image = getImage(item, type);

  const rating = Number(
    item.rating || 0
  );

  const services =
    Array.isArray(item.services)
      ? item.services
      : typeof item.services === "string"
      ? item.services
          .split(",")
          .map((x) => x.trim())
          .filter(Boolean)
      : [];

  return (
    <main className="detail-page-modern">
      <button
        className="back-link"
        onClick={() => {
          onBack();
          scrollTop();
        }}
      >
        ← Retour à l'exploration
      </button>

      <div className="detail-breadcrumb">
        Accueil / Al Hoceima /{" "}
        {getCategoryName(type)} /{" "}
        {item.name}
      </div>

      <section className="detail-hero-modern">
        <div>
          <span className="page-kicker">
            {getCategoryName(type)}
          </span>

          <h1>
            {item.name ||
              "Lieu sans nom"}
          </h1>

          <div className="detail-rating">
            <strong>
              {rating
                ? rating.toFixed(1)
                : "N/A"}
            </strong>

            <span>
              {"★".repeat(
                Math.round(rating)
              )}
              {"☆".repeat(
                Math.max(
                  0,
                  5 -
                    Math.round(
                      rating
                    )
                )
              )}
            </span>

            <small>
              {item.reviews || 0} avis
            </small>
          </div>

          <p>
            📍{" "}
            {item.address ||
              "Al Hoceima, Maroc"}
          </p>

          {item.description && (
            <p
              style={{
                marginTop: 14,
                maxWidth: 580,
              }}
            >
              {item.description}
            </p>
          )}

          <div className="detail-actions">
            <a
              className="primary"
              href={mapsUrl(item)}
              target="_blank"
              rel="noreferrer"
            >
              📍 Voir sur Maps
            </a>

            {item.phone && (
              <a
                href={`tel:${item.phone}`}
              >
                ☎ Appeler
              </a>
            )}
          </div>
        </div>

        <div>
          <div
            className="detail-main-photo"
            role="img"
            aria-label={`${item.name} à Al Hoceima`}
            style={{
              backgroundImage: `url("${image}")`,
            }}
          >
            <span>
              📷 VillaMap
            </span>
          </div>

          <div className="detail-thumbs">
            <div
              aria-hidden="true"
              style={{
                backgroundImage: `url("${image}")`,
              }}
            />

            <div
              aria-hidden="true"
              style={{
                backgroundImage: `url("${image}")`,
              }}
            />

            <div
              aria-hidden="true"
              style={{
                backgroundImage: `url("${image}")`,
              }}
            />

            <div
              aria-hidden="true"
              style={{
                backgroundImage: `url("${image}")`,
              }}
            />
          </div>
        </div>
      </section>

      <div className="detail-layout-modern">
        <div className="detail-content-modern">
          <section className="detail-card-modern">
            <h2>
              Informations pratiques
            </h2>

            <div className="info-list">
              <div>
                <span>⌖</span>

                <label>
                  Adresse
                </label>

                <strong>
                  {item.address ||
                    "Al Hoceima"}
                </strong>
              </div>

              <div>
                <span>★</span>

                <label>
                  Note
                </label>

                <strong>
                  {rating
                    ? `${rating.toFixed(
                        1
                      )}/5`
                    : "Pas encore noté"}
                </strong>
              </div>

              {item.phone && (
                <div>
                  <span>☎</span>

                  <label>
                    Téléphone
                  </label>

                  <strong>
                    {item.phone}
                  </strong>
                </div>
              )}

              {item.price && (
                <div>
                  <span>DH</span>

                  <label>
                    Prix indicatif
                  </label>

                  <strong>
                    {item.price}
                  </strong>
                </div>
              )}
            </div>
          </section>

          {services.length > 0 && (
            <section className="detail-card-modern">
              <h2>
                Services
              </h2>

              <div className="service-chips">
                {services.map(
                  (service, index) => (
                    <span key={index}>
                      {service}
                    </span>
                  )
                )}
              </div>
            </section>
          )}

          {type === "hotels" &&
            item.rooms && (
              <section className="detail-card-modern">
                <h2>
                  Chambres
                </h2>

                <div className="rooms-grid">
                  {Array.isArray(
                    item.rooms
                  ) &&
                    item.rooms.map(
                      (room, index) => (
                        <div
                          className="room-card"
                          key={index}
                        >
                          <span>
                            🛏️
                          </span>

                          <div>
                            <strong>
                              {room.name ||
                                "Chambre"}
                            </strong>

                            <small>
                              {room.price ||
                                "Prix sur demande"}
                            </small>
                          </div>
                        </div>
                      )
                    )}
                </div>
              </section>
            )}

          <PlacePhotos
            item={item}
            user={user}
            onAuth={onAuth}
          />

          <ReviewsSection
            item={item}
            type={type}
            user={user}
            onAuth={onAuth}
          />
        </div>

        <aside className="detail-aside">
          <div className="aside-card">
            <span>
              Prix indicatif
            </span>

            <strong>
              {item.price || "Sur demande"}
            </strong>

            <small>
              Les prix peuvent varier selon
              les disponibilités.
            </small>

            <button
              onClick={() =>
                window.open(
                  mapsUrl(item),
                  "_blank"
                )
              }
            >
              📍 Itinéraire
            </button>
          </div>

          <div
            className="mini-map-modern"
            onClick={() =>
              window.open(
                mapsUrl(item),
                "_blank"
              )
            }
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (
                e.key === "Enter" ||
                e.key === " "
              ) {
                e.preventDefault();

                window.open(
                  mapsUrl(item),
                  "_blank"
                );
              }
            }}
          >
            <span>⌖</span>

            <small>
              Ouvrir dans Google Maps →
            </small>
          </div>
        </aside>
      </div>
    </main>
  );
}

/* =========================================================
   EMPTY RESULTS
========================================================= */

function EmptyResults({
  search,
  category,
}) {
  return (
    <div className="empty-category">
      <span>⌕</span>

      <h2>
        Aucun résultat
      </h2>

      <p>
        {search
          ? `Aucun résultat pour "${search}".`
          : `Aucun lieu disponible dans ${getCategoryName(
              category
            )}.`}
      </p>
    </div>
  );
}

/* =========================================================
   EXPLORER PAGE
========================================================= */

function ExplorerPage({
  placesData,
  search,
  setSearch,
  selectedCategory,
  setSelectedCategory,
  onPlace,
}) {
  const [activeFilter, setActiveFilter] =
    useState("Tous");

  const currentCategory =
    selectedCategory || "all";

  const allPlaces = useMemo(() => {
    const result = [];

    Object.entries(placesData).forEach(
      ([type, places]) => {
        places.forEach((place) => {
          result.push({
            ...place,
            _type: type,
          });
        });
      }
    );

    return result;
  }, [placesData]);

  const categoriesToShow =
    currentCategory === "all"
      ? allPlaces
      : (
          placesData[currentCategory] ||
          []
        ).map((place) => ({
          ...place,
          _type: currentCategory,
        }));

  const filters = useMemo(() => {
    const tags = new Set();

    categoriesToShow.forEach((place) => {
      if (Array.isArray(place.services)) {
        place.services.forEach((service) =>
          tags.add(service)
        );
      }

      if (Array.isArray(place.tags)) {
        place.tags.forEach((tag) =>
          tags.add(tag)
        );
      }
    });

    return [
      "Tous",
      ...Array.from(tags).slice(0, 8),
    ];
  }, [categoriesToShow]);

  const normalizeText = (value) =>
    String(value || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(
        /[\u0300-\u036f]/g,
        ""
      )
      .trim();

  const filtered = categoriesToShow.filter(
    (place) => {
      const searchText =
        normalizeText(search);

      const searchableText =
        normalizeText(
          [
            place.name,
            place.title,
            place.address,
            place.location,
            place.description,
            place.category,
            place.type,
            place._type,
            place.phone,
            place.email,
            Array.isArray(place.services)
              ? place.services.join(" ")
              : place.services,
            Array.isArray(place.tags)
              ? place.tags.join(" ")
              : place.tags,
          ]
            .filter(Boolean)
            .join(" ")
        );

      const matchesSearch =
        !searchText ||
        searchableText.includes(
          searchText
        );

      const matchesFilter =
        activeFilter === "Tous" ||
        (Array.isArray(place.services) &&
          place.services.some(
            (service) =>
              normalizeText(service) ===
              normalizeText(
                activeFilter
              )
          )) ||
        (Array.isArray(place.tags) &&
          place.tags.some(
            (tag) =>
              normalizeText(tag) ===
              normalizeText(
                activeFilter
              )
          ));

      return (
        matchesSearch && matchesFilter
      );
    }
  );

  return (
    <main className="explorer-page">
      <span className="page-kicker">
        EXPLORE AL HOCEIMA
      </span>

      <h1>
        Trouvez votre prochain endroit
      </h1>

      <p>
        Hôtels, restaurants, cafés,
        pharmacies, activités, gaming,
        shopping et services à Al Hoceima.
      </p>

      <SearchBox
        value={search}
        onChange={setSearch}
        onSubmit={() => {}}
        full
      />

      <div className="filter-row">
        <button
          className={
            currentCategory === "all"
              ? "active"
              : ""
          }
          onClick={() => {
            setSelectedCategory("all");
            setActiveFilter("Tous");
          }}
        >
          Tout
        </button>

        {categories.map((category) => (
          <button
            key={category.id}
            className={
              currentCategory ===
              category.id
                ? "active"
                : ""
            }
            onClick={() => {
              setSelectedCategory(
                category.id
              );
              setActiveFilter("Tous");
            }}
          >
            {category.icon}{" "}
            {category.name}
          </button>
        ))}
      </div>

      {filters.length > 1 && (
        <div className="filter-row">
          {filters.map((filter) => (
            <button
              key={filter}
              className={
                activeFilter === filter
                  ? "active"
                  : ""
              }
              onClick={() =>
                setActiveFilter(filter)
              }
            >
              {filter}
            </button>
          ))}
        </div>
      )}

      {filtered.length === 0 ? (
        <EmptyResults
          search={search}
          category={
            currentCategory === "all"
              ? "hotels"
              : currentCategory
          }
        />
      ) : (
        <div className="listing-grid">
          {filtered.map((place) => (
            <PlaceCard
              key={`${place._type}-${place.id}`}
              item={place}
              type={place._type}
              onClick={onPlace}
            />
          ))}
        </div>
      )}
    </main>
  );
}

/* =========================================================
   HOME PAGE
========================================================= */

function HomePage({
  placesData,
  search,
  setSearch,
  onSearch,
  onCategory,
  onPlace,
}) {
  const featuredRestaurants =
    placesData.restaurants?.slice(
      0,
      3
    ) || [];

  const featuredHotels =
    placesData.hotels?.slice(
      0,
      3
    ) || [];

  const featuredGaming =
    placesData.gaming?.slice(
      0,
      3
    ) || [];

  return (
    <>
      {/* =====================================================
          HERO
      ===================================================== */}

      <main className="hero-modern">
        <div className="hero-copy">
          <span className="page-kicker">
            VOTRE GUIDE LOCAL
          </span>

          <h1>
            Découvrez
            <br />
            <em>Al Hoceima</em>
          </h1>

          <p>
            Explorez Al Hoceima avec VillaMap :
            découvrez les meilleurs hôtels,
            restaurants, cafés, pharmacies,
            activités, gaming et services locaux
            au cœur du Maroc méditerranéen.
          </p>

          <SearchBox
            value={search}
            onChange={setSearch}
            onSubmit={onSearch}
          />

          <div className="hero-highlights">
            <span>🏨 Hôtels</span>
            <span>🍴 Restaurants</span>
            <span>☕ Cafés</span>
            <span>📍 Activités</span>
          </div>
        </div>

        <div className="hero-visual">
          <img
            src={heroImage}
            alt="Plage d'Al Hoceima, Maroc — destination méditerranéenne"
          />

          <div className="hero-map-badge">
            <span className="map-symbol">
              ⌖
            </span>

            <div>
              Al Hoceima
              <small>
                Maroc · Méditerranée
              </small>
            </div>
          </div>
        </div>
      </main>

      {/* =====================================================
          CATEGORIES
      ===================================================== */}

      <section className="section-modern">
        <div className="section-heading">
          <div>
            <span className="page-kicker">
              EXPLOREZ AL HOCEIMA
            </span>

            <h2>
              Que cherchez-vous à Al Hoceima ?
            </h2>

            <p>
              Découvrez les hôtels, restaurants,
              cafés, pharmacies, activités, gaming,
              shopping et autres services disponibles
              à Al Hoceima avec VillaMap.
            </p>
          </div>

          <button
            onClick={() => {
              onCategory("all");
              scrollTop();
            }}
          >
            Tout explorer →
          </button>
        </div>

        <CategoryGrid
          onCategory={onCategory}
          data={placesData}
        />
      </section>

      {/* =====================================================
          RESTAURANTS
      ===================================================== */}

      {featuredRestaurants.length >
        0 && (
        <section className="section-modern soft">
          <div className="section-heading">
            <div>
              <span className="page-kicker">
                RESTAURANTS À AL HOCEIMA
              </span>

              <h2>
                Restaurants à découvrir à Al Hoceima
              </h2>

              <p>
                Découvrez une sélection de restaurants
                à Al Hoceima, avec leurs adresses,
                informations pratiques, avis et
                localisation sur VillaMap.
              </p>
            </div>

            <button
              onClick={() =>
                onCategory(
                  "restaurants"
                )
              }
            >
              Voir tout →
            </button>
          </div>

          <div className="featured-grid">
            {featuredRestaurants.map(
              (place) => (
                <PlaceCard
                  key={`restaurant-${place.id}`}
                  item={place}
                  type="restaurants"
                  onClick={onPlace}
                />
              )
            )}
          </div>
        </section>
      )}

      {/* =====================================================
          HOTELS
      ===================================================== */}

      {featuredHotels.length > 0 && (
        <section className="section-modern">
          <div className="section-heading">
            <div>
              <span className="page-kicker">
                HÔTELS À AL HOCEIMA
              </span>

              <h2>
                Hôtels et hébergements à Al Hoceima
              </h2>

              <p>
                Découvrez les hôtels et hébergements
                à Al Hoceima, avec leurs informations
                pratiques, avis, photos et
                localisation sur VillaMap.
              </p>
            </div>

            <button
              onClick={() =>
                onCategory("hotels")
              }
            >
              Voir les hôtels →
            </button>
          </div>

          <div className="featured-grid">
            {featuredHotels.map(
              (place) => (
                <PlaceCard
                  key={`hotel-${place.id}`}
                  item={place}
                  type="hotels"
                  onClick={onPlace}
                />
              )
            )}
          </div>
        </section>
      )}

      {/* =====================================================
          GAMING
      ===================================================== */}

      {featuredGaming.length > 0 && (
        <section className="section-modern soft">
          <div className="section-heading">
            <div>
              <span className="page-kicker">
                GAMING À AL HOCEIMA
              </span>

              <h2>
                Gaming et espaces de jeux à Al Hoceima
              </h2>

              <p>
                Découvrez les espaces gaming à
                Al Hoceima : PlayStation, PC gaming
                et lieux dédiés aux jeux vidéo
                pour jouer et se divertir.
              </p>
            </div>

            <button
              onClick={() =>
                onCategory("gaming")
              }
            >
              Voir tout →
            </button>
          </div>

          <div className="featured-grid">
            {featuredGaming.map(
              (place) => (
                <PlaceCard
                  key={`gaming-${place.id}`}
                  item={place}
                  type="gaming"
                  onClick={onPlace}
                />
              )
            )}
          </div>
        </section>
      )}

      {/* =====================================================
          ABOUT
      ===================================================== */}

      <section
        className="about-modern"
        id="about"
      >
        <div>
          <span className="page-kicker">
            À PROPOS
          </span>

          <h2>
            Al Hoceima,
            <br />
            <em>autrement.</em>
          </h2>

          <p>
            VillaMap est un guide local dédié à
            Al Hoceima, au Maroc. Explorez
            facilement les hôtels, restaurants,
            cafés, pharmacies, activités, gaming,
            shopping et autres services de la ville.
            Consultez les adresses, photos, avis et
            informations pratiques, puis localisez
            facilement chaque endroit sur Google Maps.
          </p>
        </div>

        <div className="about-points">
          <div>
            <b>⌕</b>

            <strong>
              Trouvez facilement
            </strong>

            <span>
              Recherchez rapidement les lieux et
              services à Al Hoceima.
            </span>
          </div>

          <div>
            <b>★</b>

            <strong>
              Découvrez les avis
            </strong>

            <span>
              Consultez les notes et avis pour mieux
              connaître les établissements.
            </span>
          </div>

          <div>
            <b>⌖</b>

            <strong>
              Localisez les endroits
            </strong>

            <span>
              Ouvrez directement les lieux
              dans Google Maps.
            </span>
          </div>
        </div>
      </section>
    </>
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
          Villa<span>Map</span>
        </strong>

        <p>
          Votre guide local à Al Hoceima.
        </p>
      </div>

      <small>
        © {new Date().getFullYear()} VillaMap
        · Al Hoceima, Maroc
      </small>
    </footer>
  );
}

/* =========================================================
   NORMALIZE DATABASE DATA
========================================================= */

function normalizePlace(place) {
  let category = String(
    place.category || ""
  )
    .toLowerCase()
    .trim();

  const aliases = {
    hotel: "hotels",
    hotels: "hotels",
    hôtel: "hotels",
    hôtels: "hotels",

    restaurant: "restaurants",
    restaurants: "restaurants",

    pharmacie: "pharmacies",
    pharmacies: "pharmacies",

    cafe: "cafes",
    cafés: "cafes",
    cafes: "cafes",

    beauté: "beauty",
    beaute: "beauty",
    beauty: "beauty",

    gaming: "gaming",

    shopping: "shopping",

    activité: "activities",
    activités: "activities",
    activites: "activities",
    activity: "activities",
    activities: "activities",

    transport: "transport",
  };

  category =
    aliases[category] || category;

  return {
    ...place,

    category,

    name:
      place.name ||
      place.title ||
      "Lieu sans nom",

    address:
      place.address ||
      place.location ||
      "Al Hoceima, Maroc",

    image:
      place.image ||
      place.image_url ||
      place.photo ||
      place.cover ||
      fallbackImages[category],

    rating: Number(
      place.rating || 0
    ),

    reviews: Number(
      place.reviews ||
        place.reviews_count ||
        0
    ),
  };
}

/* =========================================================
   ADMIN PAGE
========================================================= */

function AdminPage({
  placesData,
  onPlacesUpdated,
  onBack,
}) {
  const [search, setSearch] = useState("");
  const [uploadingId, setUploadingId] =
    useState(null);
  const [message, setMessage] =
    useState("");

  const allPlaces = useMemo(() => {
    const result = [];

    Object.entries(placesData).forEach(
      ([type, places]) => {
        places.forEach((place) => {
          result.push({
            ...place,
            _type: type,
          });
        });
      }
    );

    return result;
  }, [placesData]);

  const filteredPlaces =
    allPlaces.filter((place) => {
      const text =
        `${place.name || ""} ${
          place.address || ""
        } ${place._type || ""}`.toLowerCase();

      return text.includes(
        search.toLowerCase()
      );
    });

  async function changeMainPhoto(
    place,
    event
  ) {
    const file =
      event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setMessage(
        "Veuillez choisir une image."
      );
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setMessage(
        "La photo doit faire moins de 5 MB."
      );
      event.target.value = "";
      return;
    }

    setUploadingId(place.id);
    setMessage("");

    try {
      const extension =
        file.name.split(".").pop() ||
        "jpg";

      const fileName =
        `main/${place.id}/${Date.now()}-${Math.random()
          .toString(36)
          .slice(2)}.${extension}`;

      const {
        error: uploadError,
      } = await supabase.storage
        .from("restaurant-photos")
        .upload(
          fileName,
          file,
          {
            cacheControl: "3600",
            upsert: false,
          }
        );

      if (uploadError) {
        throw uploadError;
      }

      const {
        data: publicUrlData,
      } = supabase.storage
        .from("restaurant-photos")
        .getPublicUrl(fileName);

      const imageUrl =
        publicUrlData.publicUrl;

      const {
        error: updateError,
      } = await supabase
        .from("places")
        .update({
          main_image_url: imageUrl,
        })
        .eq("id", place.id);

      if (updateError) {
        throw updateError;
      }

      setMessage(
        `Photo de "${place.name}" mise à jour avec succès ✨`
      );

      await onPlacesUpdated?.();
    } catch (error) {
      console.error(
        "Admin photo error:",
        error
      );

      setMessage(
        error.message ||
          "Impossible de modifier la photo."
      );
    } finally {
      setUploadingId(null);
      event.target.value = "";
    }
  }

  return (
    <main
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "50px 24px 80px",
      }}
    >
      <button
        className="back-link"
        onClick={() => {
          onBack?.();
          scrollTop();
        }}
        style={{
          marginBottom: 20,
        }}
      >
        ← Retour à l'accueil
      </button>

      <span className="page-kicker">
        VILLAMAP ADMIN
      </span>

      <h1
        style={{
          marginTop: 8,
          fontSize:
            "clamp(32px, 5vw, 52px)",
        }}
      >
        Gestion des photos 📸
      </h1>

      <p
        style={{
          marginTop: 10,
          color: "#728492",
        }}
      >
        Changez directement les photos
        principales de vos lieux.
      </p>

      <div
        style={{
          marginTop: 25,
          marginBottom: 25,
        }}
      >
        <input
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="🔍 Rechercher un hôtel, restaurant..."
          style={{
            width: "100%",
            maxWidth: 600,
            padding: "15px 17px",
            border:
              "1px solid #e2edf2",
            borderRadius: 14,
            outline: "none",
            fontSize: 15,
          }}
        />
      </div>

      {message && (
        <div
          style={{
            marginBottom: 22,
            padding: 14,
            borderRadius: 14,
            background: "#eaf7fd",
            color: "#087bb7",
            fontWeight: 700,
          }}
        >
          {message}
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 20,
        }}
      >
        {filteredPlaces.map((place) => (
          <article
            key={`${place._type}-${place.id}`}
            style={{
              background: "#fff",
              border:
                "1px solid #e2edf2",
              borderRadius: 20,
              overflow: "hidden",
              boxShadow:
                "0 10px 30px rgba(22,50,70,.06)",
            }}
          >
            <img
              src={getImage(
                place,
                place._type
              )}
              alt={`${place.name} à Al Hoceima`}
              style={{
                width: "100%",
                height: 200,
                objectFit: "cover",
                display: "block",
              }}
            />

            <div
              style={{
                padding: 18,
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  color: "#1499dc",
                  textTransform:
                    "uppercase",
                }}
              >
                {getCategoryName(
                  place._type
                )}
              </span>

              <h3
                style={{
                  marginTop: 6,
                  marginBottom: 5,
                }}
              >
                {place.name}
              </h3>

              <p
                style={{
                  color: "#728492",
                  fontSize: 13,
                  marginBottom: 15,
                }}
              >
                {place.address ||
                  "Al Hoceima, Maroc"}
              </p>

              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent:
                    "center",
                  gap: 8,
                  width: "100%",
                  padding: "12px 15px",
                  borderRadius: 12,
                  background: "#1499dc",
                  color: "#fff",
                  fontWeight: 800,
                  cursor:
                    uploadingId === place.id
                      ? "wait"
                      : "pointer",
                  opacity:
                    uploadingId === place.id
                      ? 0.7
                      : 1,
                }}
              >
                {uploadingId === place.id
                  ? "⏳ Upload..."
                  : "📷 Changer la photo"}

                <input
                  type="file"
                  accept="image/*"
                  disabled={
                    uploadingId ===
                    place.id
                  }
                  onChange={(event) =>
                    changeMainPhoto(
                      place,
                      event
                    )
                  }
                  style={{
                    display: "none",
                  }}
                />
              </label>
            </div>
          </article>
        ))}
      </div>

      {filteredPlaces.length === 0 && (
        <div
          style={{
            padding: 40,
            textAlign: "center",
            color: "#728492",
          }}
        >
          Aucun lieu trouvé.
        </div>
      )}
    </main>
  );
}

/* =========================================================
   SEO HELPERS
========================================================= */

function updateMetaTag(
  attribute,
  attributeValue,
  content
) {
  let meta = document.querySelector(
    `meta[${attribute}="${attributeValue}"]`
  );

  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute(
      attribute,
      attributeValue
    );
    document.head.appendChild(meta);
  }

  meta.setAttribute(
    "content",
    content
  );
}

function updateCanonical(url) {
  let canonical =
    document.querySelector(
      'link[rel="canonical"]'
    );

  if (!canonical) {
    canonical =
      document.createElement("link");

    canonical.setAttribute(
      "rel",
      "canonical"
    );

    document.head.appendChild(
      canonical
    );
  }

  canonical.setAttribute(
    "href",
    url
  );
}

function updateJsonLd(data) {
  let script =
    document.getElementById(
      "villamap-jsonld"
    );

  if (!script) {
    script =
      document.createElement(
        "script"
      );

    script.id =
      "villamap-jsonld";

    script.type =
      "application/ld+json";

    document.head.appendChild(
      script
    );
  }

  script.textContent =
    JSON.stringify(data);
}

/* =========================================================
   APP
========================================================= */

export default function App() {
  const [search, setSearch] =
    useState("");

  const [placesData, setPlacesData] =
    useState(emptyData);

  const [loadingPlaces, setLoadingPlaces] =
    useState(true);

  const [errorPlaces, setErrorPlaces] =
    useState("");

  const [selectedCategory, setSelectedCategory] =
    useState(null);

  const [selectedPlace, setSelectedPlace] =
    useState(null);

  const [selectedPlaceType, setSelectedPlaceType] =
    useState(null);

  const [menuOpen, setMenuOpen] =
    useState(false);

  const [showAuth, setShowAuth] =
    useState(false);

  const [showAdmin, setShowAdmin] =
    useState(false);

  const [user, setUser] =
    useState(null);

  const ADMIN_EMAIL =
    "ayaesslimani73@gmail.com";

  const isAdmin =
    user?.email?.toLowerCase() ===
    ADMIN_EMAIL.toLowerCase();

  /* =======================================================
     AUTH
  ======================================================= */

  useEffect(() => {
    let mounted = true;

    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (mounted) {
        setUser(user);
      }
    }

    getUser();

    const {
      data: listener,
    } =
      supabase.auth.onAuthStateChange(
        (_event, session) => {
          setUser(
            session?.user || null
          );
        }
      );

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  /* =======================================================
     LOAD PLACES FROM SUPABASE
  ======================================================= */

  async function loadPlacesFromSupabase() {
    setLoadingPlaces(true);
    setErrorPlaces("");

    const { data, error } =
      await supabase
        .from("places")
        .select("*")
        .order("id", {
          ascending: true,
        });

    if (error) {
      console.error(
        "Supabase places error:",
        error
      );

      setErrorPlaces(
        "Impossible de charger les lieux depuis Supabase."
      );

      setLoadingPlaces(false);
      return;
    }

    const grouped = {
      ...emptyData,
    };

    (data || []).forEach(
      (rawPlace) => {
        const place =
          normalizePlace(
            rawPlace
          );

        if (
          grouped[place.category]
        ) {
          grouped[
            place.category
          ].push(place);
        }
      }
    );

    setPlacesData(grouped);
    setLoadingPlaces(false);
  }

  useEffect(() => {
    loadPlacesFromSupabase();
  }, []);

  /* =======================================================
     DYNAMIC SEO
  ======================================================= */

  useEffect(() => {
    const siteUrl =
      "https://villa-map-oo6p.vercel.app/";

    let title =
      "VillaMap — Guide local d'Al Hoceima | Hôtels, restaurants et services";

    let description =
      "VillaMap est votre guide local à Al Hoceima, Maroc. Découvrez hôtels, restaurants, cafés, pharmacies, activités, gaming, shopping et services locaux.";

    let canonicalUrl =
      siteUrl;

    let structuredData = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "VillaMap",
      url: siteUrl,
      description,
      inLanguage: "fr-MA",
      areaServed: {
        "@type": "City",
        name: "Al Hoceima",
        addressCountry: "MA",
      },
    };

    if (showAdmin && isAdmin) {
      title =
        "VillaMap Admin — Gestion des photos";

      description =
        "Espace d'administration VillaMap pour gérer les photos principales des lieux.";

      canonicalUrl =
        `${siteUrl}#admin`;

      structuredData = {
        "@context":
          "https://schema.org",
        "@type": "WebSite",
        name: "VillaMap",
        url: siteUrl,
      };
    } else if (
      selectedPlace &&
      selectedPlaceType
    ) {
      const categoryName =
        getCategoryName(
          selectedPlaceType
        );

      const placeName =
        selectedPlace.name ||
        "Lieu";

      title =
        `${placeName} — ${categoryName} à Al Hoceima | VillaMap`;

      description =
        selectedPlace.description ||
        `${placeName} à Al Hoceima : adresse, avis, photos, services et localisation sur Google Maps. Découvrez ce lieu avec VillaMap.`;

      canonicalUrl =
        `${siteUrl}#${selectedPlaceType}-${selectedPlace.id}`;

      const baseType =
        selectedPlaceType === "hotels"
          ? "Hotel"
          : selectedPlaceType ===
            "restaurants"
          ? "Restaurant"
          : "LocalBusiness";

      structuredData = {
        "@context":
          "https://schema.org",
        "@type": baseType,
        name: placeName,
        description,
        url: canonicalUrl,
        address: {
          "@type":
            "PostalAddress",
          addressLocality:
            "Al Hoceima",
          addressCountry: "MA",
          streetAddress:
            selectedPlace.address ||
            undefined,
        },
        image:
          getImage(
            selectedPlace,
            selectedPlaceType
          ),
      };

      if (selectedPlace.phone) {
        structuredData.telephone =
          selectedPlace.phone;
      }

      if (
        selectedPlace.rating &&
        selectedPlace.reviews
      ) {
        structuredData.aggregateRating =
          {
            "@type":
              "AggregateRating",
            ratingValue:
              Number(
                selectedPlace.rating
              ),
            reviewCount:
              Number(
                selectedPlace.reviews
              ),
            bestRating: 5,
            worstRating: 1,
          };
      }
    } else if (
      selectedCategory &&
      selectedCategory !== "all"
    ) {
      const categoryName =
        getCategoryName(
          selectedCategory
        );

      title =
        `${categoryName} à Al Hoceima — VillaMap`;

      description =
        `Découvrez les ${categoryName.toLowerCase()} à Al Hoceima, Maroc : adresses, avis, photos, services et localisation avec VillaMap.`;

      canonicalUrl =
        `${siteUrl}#${selectedCategory}`;

      structuredData = {
        "@context":
          "https://schema.org",
        "@type": "CollectionPage",
        name: title,
        description,
        url: canonicalUrl,
        inLanguage: "fr-MA",
        about: {
          "@type":
            "City",
          name: "Al Hoceima",
          addressCountry: "MA",
        },
      };
    } else if (
      search.trim()
    ) {
      const searchValue =
        search.trim();

      title =
        `${searchValue} à Al Hoceima — VillaMap`;

      description =
        `Recherchez ${searchValue} à Al Hoceima avec VillaMap et découvrez les lieux, adresses, avis et informations pratiques.`;

      canonicalUrl =
        `${siteUrl}#search-${encodeURIComponent(
          searchValue
        )}`;

      structuredData = {
        "@context":
          "https://schema.org",
        "@type": "SearchResultsPage",
        name: title,
        description,
        url: canonicalUrl,
        inLanguage: "fr-MA",
      };
    }

    document.title = title;

    updateMetaTag(
      "name",
      "description",
      description
    );

    updateMetaTag(
      "name",
      "robots",
      showAdmin && isAdmin
        ? "noindex, nofollow"
        : "index, follow"
    );

    updateMetaTag(
      "property",
      "og:title",
      title
    );

    updateMetaTag(
      "property",
      "og:description",
      description
    );

    updateMetaTag(
      "property",
      "og:url",
      canonicalUrl
    );

    updateMetaTag(
      "property",
      "og:image",
      `${siteUrl}logo.png.png`
    );

    updateMetaTag(
      "name",
      "twitter:title",
      title
    );

    updateMetaTag(
      "name",
      "twitter:description",
      description
    );

    updateMetaTag(
      "name",
      "twitter:image",
      `${siteUrl}logo.png.png`
    );

    updateCanonical(
      canonicalUrl
    );

    updateJsonLd(
      structuredData
    );
  }, [
    selectedPlace,
    selectedPlaceType,
    selectedCategory,
    search,
    showAdmin,
    isAdmin,
  ]);

  /* =======================================================
     NAVIGATION
  ======================================================= */

  function goHome() {
    setShowAdmin(false);
    setSelectedPlace(null);
    setSelectedPlaceType(null);
    setSelectedCategory(null);
    setSearch("");
  }

  function goExplorer(
    category = "all"
  ) {
    setShowAdmin(false);
    setSelectedPlace(null);
    setSelectedPlaceType(null);
    setSelectedCategory(category);
  }

  function openCategory(
    category
  ) {
    goExplorer(category);
  }

  function openPlace(
    item,
    type
  ) {
    setShowAdmin(false);
    setSelectedPlace(item);
    setSelectedPlaceType(type);
  }

  function backToExplorer() {
    setShowAdmin(false);
    setSelectedPlace(null);
    setSelectedPlaceType(null);

    if (selectedCategory === null) {
      setSelectedCategory("all");
    }
  }

  function handleSearch() {
    setShowAdmin(false);
    setSelectedPlace(null);
    setSelectedPlaceType(null);
    setSelectedCategory("all");
    scrollTop();
  }

  function openAdmin() {
    if (!isAdmin) {
      return;
    }

    setSelectedPlace(null);
    setSelectedPlaceType(null);
    setSelectedCategory(null);
    setSearch("");
    setShowAdmin(true);
  }

  /* =======================================================
     PAGE
  ======================================================= */

  let page;

  if (
    showAdmin &&
    isAdmin
  ) {
    page = (
      <AdminPage
        placesData={placesData}
        onPlacesUpdated={
          loadPlacesFromSupabase
        }
        onBack={goHome}
      />
    );
  } else if (
    selectedPlace &&
    selectedPlaceType
  ) {
    page = (
      <DetailPage
        item={selectedPlace}
        type={selectedPlaceType}
        onBack={backToExplorer}
        user={user}
        onAuth={() =>
          setShowAuth(true)
        }
      />
    );
  } else if (
    selectedCategory !== null
  ) {
    page = (
      <ExplorerPage
        placesData={placesData}
        search={search}
        setSearch={setSearch}
        selectedCategory={
          selectedCategory
        }
        setSelectedCategory={
          setSelectedCategory
        }
        onPlace={openPlace}
      />
    );
  } else {
    page = (
      <HomePage
        placesData={placesData}
        search={search}
        setSearch={setSearch}
        onSearch={handleSearch}
        onCategory={openCategory}
        onPlace={openPlace}
      />
    );
  }

  /* =======================================================
     RETURN
  ======================================================= */

  return (
    <div className="app">
      <Navbar
        search={search}
        setSearch={setSearch}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        onHome={goHome}
        onExplorer={() =>
          goExplorer("all")
        }
        onCategory={openCategory}
        user={user}
        onAuth={() =>
          setShowAuth(true)
        }
        isAdmin={isAdmin}
        onAdmin={openAdmin}
      />

      {loadingPlaces && (
        <div
          style={{
            position: "fixed",
            bottom: 20,
            left: "50%",
            transform:
              "translateX(-50%)",
            zIndex: 500,
            background: "#163246",
            color: "#fff",
            padding: "10px 16px",
            borderRadius: 12,
            fontSize: 12,
            boxShadow:
              "0 10px 30px rgba(0,0,0,.15)",
          }}
        >
          Chargement des lieux...
        </div>
      )}

      {errorPlaces && (
        <div
          style={{
            maxWidth: 1200,
            margin: "15px auto",
            padding: "0 24px",
          }}
        >
          <div
            style={{
              background: "#fff4f4",
              border:
                "1px solid #ffd4d4",
              color: "#a94a4a",
              borderRadius: 12,
              padding: 12,
              fontSize: 13,
            }}
          >
            {errorPlaces}
          </div>
        </div>
      )}

      {page}

      <Footer />

      {showAuth && (
        <AuthModal
          onClose={() =>
            setShowAuth(false)
          }
          onUserChange={setUser}
        />
      )}
    </div>
  );
}
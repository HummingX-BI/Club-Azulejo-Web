import { Link } from "react-router-dom";
import { Container } from "@/components/ui/Container";
import { Divider } from "@/components/ui/Divider";

/* ────────────────────────────────────────────────
   Footer — sobrio, columnar, sobre canvas
   ──────────────────────────────────────────────── */

const NAV_LINKS = [
  { to: "/#metodo", label: "Método" },
  { to: "/#programas", label: "Programas" },
  { to: "/#instructores", label: "Instructores" },
  { to: "/#galeria", label: "Galería" },
];

const HORARIOS = [
  "Lunes a viernes: 6:00 – 20:00",
  "Sábado: 7:00 – 14:00",
  "Domingo: cerrado",
];

const CONTACTO = [
  "Tel: +52 55 1234 5678",
  "hola@clubazulejo.mx",
];

export function Footer() {
  return (
    <footer style={{ backgroundColor: "var(--color-canvas)", paddingTop: "0" }}>
      <Container>
        <Divider />

        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-col">
            <Link
              to="/"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.25rem",
                fontWeight: 400,
                color: "var(--color-text)",
                display: "inline-block",
                marginBottom: "16px",
              }}
            >
              Club Azulejo
            </Link>
            <p className="footer-address">
              Av. Instituto Politécnico Nacional 1234 {/* Dato ilustrativo */}
              <br />
              Col. Lindavista
              <br />
              07300 CDMX, México
            </p>
          </div>

          {/* Navigation */}
          <div className="footer-col">
            <p className="footer-heading">Navegación</p>
            <ul>
              {NAV_LINKS.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="footer-link">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Horarios */}
          <div className="footer-col">
            <p className="footer-heading">Horarios</p>
            <ul>
              {HORARIOS.map((h) => (
                <li key={h} className="footer-detail">{h}</li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div className="footer-col">
            <p className="footer-heading">Contacto</p>
            <ul>
              {CONTACTO.map((c) => (
                <li key={c} className="footer-detail">{c}</li>
              ))}
            </ul>
          </div>
        </div>

        <Divider style={{ marginTop: "48px" }} />

        {/* Bottom bar */}
        <div className="footer-bottom">
          <p className="footer-detail">
            © {new Date().getFullYear()} Club Azulejo. Todos los derechos reservados.
          </p>
        </div>
      </Container>

      <style>{`
        .footer-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1fr;
          gap: 40px;
          padding-block: 48px;
        }
        .footer-col ul {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .footer-heading {
          font-family: var(--font-body);
          font-size: var(--font-size-eyebrow);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: var(--color-text-muted);
          margin-bottom: 16px;
        }
        .footer-address {
          font-size: var(--font-size-small);
          color: var(--color-text-muted);
          line-height: 1.7;
        }
        .footer-link {
          font-size: var(--font-size-small);
          color: var(--color-text-muted);
          transition: color var(--duration-sm) var(--ease-out);
        }
        .footer-link:hover {
          color: var(--color-text);
        }
        .footer-detail {
          font-size: var(--font-size-small);
          color: var(--color-text-muted);
          line-height: 1.6;
        }
        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-block: 24px;
        }
        .footer-admin-link {
          font-size: 0.75rem;
          color: var(--color-text-muted);
          opacity: 0.5;
          transition: opacity var(--duration-sm) var(--ease-out);
        }
        .footer-admin-link:hover {
          opacity: 1;
        }

        @media (max-width: 767px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .footer-bottom {
            flex-direction: column;
            gap: 12px;
            text-align: center;
          }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 32px;
          }
        }
      `}</style>
    </footer>
  );
}

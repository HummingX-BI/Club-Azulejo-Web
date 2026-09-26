# DESIGN.md — Club Azulejo

> Sistema de diseño: disciplina de un solo acento, superficies planas sin sombras, controles en píldora, pesos intermedios, ritmo espacioso.

## Paleta de colores

| Token         | Hex / valor                  | Uso                                |
|---------------|------------------------------|------------------------------------|
| `canvas`      | `#0B1B24`                    | Fondo base de toda la aplicación   |
| `surface`     | `#122731`                    | Tarjetas y paneles                 |
| `surface-2`   | `#1A3441`                    | Controles / superficies interactivas |
| `line`        | `rgba(237,239,234,0.14)`     | Divisores de 1 px                  |
| `text`        | `#EDEFEA`                    | Texto principal (nunca #fff puro)  |
| `text-muted`  | `#B4C0C4`                    | Texto secundario                   |
| `accent`      | `#46C2CF`                    | CTA principal y foco (uno por vista) |
| `accent-fg`   | `#06222B`                    | Texto sobre accent                 |

## Tipografía

- **Display:** Newsreader Variable — serif, peso 400, itálica para énfasis.
- **Body:** Manrope Variable — sans-serif, pesos 400–700.
- **Escala fluida:**
  - Display: `clamp(2.75rem, 7vw, 5.75rem)`, line-height 1.05, tracking −0.02em
  - H2: `clamp(2rem, 4vw, 3.5rem)`
  - H3: `clamp(1.375rem, 2.5vw, 1.75rem)`
  - Body: `clamp(1rem, 0.5vw + 0.875rem, 1.125rem)`, line-height 1.6
  - Eyebrow: `clamp(0.75rem, 0.25vw + 0.6875rem, 0.8125rem)`, uppercase, tracking 0.14em

## Espaciado y breakpoints

- Base: 4 px
- Ritmo entre secciones: `clamp(72px, 10vw, 128px)`
- Contenedor: máx 1 200 px con padding lateral fluido `clamp(20px, 4vw, 48px)`
- Radios: píldora (999 px) para botones, inputs, navbar, tags; 16 px para tarjetas
- Sin sombras en ningún componente
- Breakpoints: 768 px (tablet), 1 024 px (desktop)

## Principios

1. Un solo color de acento; máximo un botón primary visible por pantalla.
2. Superficies planas — sin sombras, sin glassmorphism (excepto backdrop-blur del navbar al scroll).
3. Mucho espacio en blanco, alineación a rejilla de 12 columnas, jerarquía tipográfica clara.
4. Animaciones sutiles: fade + translateY de 16 px al entrar en viewport, parallax leve en el hero.
5. Respetar `prefers-reduced-motion`: sin animaciones ni parallax.

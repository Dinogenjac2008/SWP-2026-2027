# UE 2026-09-22 — Kapselung & Invarianten · HÜ (Fahrzeug)

Starter rot → Lösung grün: `fährt` in `fahrzeug.ts`, alle Tests in
`fahrzeug_test.ts` sind grün (`deno test`).

## Invarianten (fail-fast gesichert)

| Invariante                                                | Wo gesichert                                       |
| --------------------------------------------------------- | -------------------------------------------------- |
| `kmStand` nie negativ                                     | `throw` im **Konstruktor** (`fahrzeug.ts:16`)      |
| Geschwindigkeit im Bereich `0 <= v <= maxGeschwindigkeit` | `throw` in `setGeschwindigkeit` (`fahrzeug.ts:38`) |
| `kmStand` nur über `fahre()` erhöhbar                     | `_kmStand` ist `private`, Lesen nur über Getter    |

## Vorhersagen (KM5-02)

**a) `k.kontostand = -1` — `public` oder `private`?**

- `private`: Der Schreibzugriff schlägt **zur Kompilierzeit** fehl,
  `deno check`/TypeScript meckert bereits.
- `public`: Kompiliert problemlos, **zur Laufzeit** wird der Wert einfach
  gesetzt — genau deshalb ist `private` die Absicherung der Invariante.

**b) `new Konto(-5)` wirft im Konstruktor — wie viele Objekte?**

Gar keins. `new` erzeugt zwar kurzzeitig ein Objekt, aber wenn der Konstruktor
`throw` auslöst, wird die Konstruktion abgebrochen und das (halbfertige) Objekt
verworfen — der Ausdruck liefert nie einen Wert (fail-fast, kein
halb-verändertes Objekt bleibt zurück).

## Dateien

- `fahrzeug.ts` — Lösung (Invarianten + Getter + `fahre()`)
- `fahrzeug_test.ts` — 4 Tests der Lehrperson (rot → grün)

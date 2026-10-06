# UE 2026-09-29 — Interfaces als Vertrag · HÜ (Produkt)

Starter rot → Lösung grün: `Produkt` implementiert `Comparable<Produkt>` und
`Versendbar`, alle Tests in `produkt_test.ts` sind grün (`deno test`).

## Verträge

| Interface             | Methode            | Umsetzung in `Produkt`                         |
| --------------------- | ------------------ | ---------------------------------------------- |
| `Comparable<Produkt>` | `compareTo(other)` | Vergleich nach `preisCent` (`<0` / `0` / `>0`) |
| `Versendbar`          | `versandkosten()`  | 400 Cent Grundgebühr + 200 Cent je `gewichtKg` |

## Structural typing (schriftliche Antwort)

Warum kompiliert `akzeptiereVersendbar({ versandkosten: () => 0 })` ohne
`implements` und ohne `class`?

TypeScript prüft beim Zuweisen **nur die Form** (structural typing), nicht die
Abstammung: `akzeptiereVersendbar` kennt ausschließlich den Vertrag `Versendbar`
und verlangt ein Objekt mit der Methode `versandkosten(): number`. Ein
Objekt-Literal, das diese Form mitbringt, erfüllt den Vertrag — `implements` ist
nur Dokumentation, keine Bedingung. (Java würde hier zur Laufzeit meckern,
TypeScript nicht.)

Die Antwort steht auch als Kommentar über `akzeptiereVersendbar` in
`produkt.ts:51`.

## Vorhersagen (KM5-03)

**a) `implements Verzinsbar`, vergisst `jahresZins()` — kompiliert das?**

Nein. TypeScript meckert an der `class`-Klausel: „Class ‚X' incorrectly
implements interface ‚Verzinsbar'. Property ‚jahresZins' is missing."

**b) Objekt mit `jahresZins`, aber ohne `implements` → Zuweisung erlaubt?**

Ja, erlaubt — wegen structural typing erfüllt das Objekt den Vertrag durch seine
Form, `implements` ist nicht nötig.

## Dateien

- `produkt.ts` — Lösung (Verträge + structural-typing-Kommentar)
- `produkt_test.ts` — 4 Tests der Lehrperson (rot → grün)

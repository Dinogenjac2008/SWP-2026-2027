// HÜ-Domäne UE 3: Interface als Vertrag am Produkt (Shop).
// Produkt implementiert beide Verträge — produkt_test.ts ist grün.
export interface Comparable<T> {
  compareTo(other: T): number; // <0: dieses kleiner · 0: gleich · >0: größer
}

export interface Versendbar {
  versandkosten(): number; // in Cent
}

export class Produkt implements Comparable<Produkt>, Versendbar {
  readonly name: string;
  private preisCent: number;
  private gewichtKg: number;

  constructor(name: string, preisCent: number, gewichtKg: number) {
    if (preisCent < 0) {
      throw new Error(`Preis darf nicht negativ sein (war ${preisCent})`);
    }
    if (gewichtKg < 0) {
      throw new Error(`Gewicht darf nicht negativ sein (war ${gewichtKg})`);
    }
    this.name = name;
    this.preisCent = preisCent;
    this.gewichtKg = gewichtKg;
  }

  get preis(): number {
    return this.preisCent;
  }

  compareTo(other: Produkt): number {
    if (this.preisCent < other.preisCent) return -1;
    if (this.preisCent > other.preisCent) return 1;
    return 0;
  }

  versandkosten(): number {
    return 400 + 200 * this.gewichtKg;
  }

  toString(): string {
    return `${this.name} (${
      (this.preisCent / 100).toFixed(2)
    } €, ${this.gewichtKg} kg)`;
  }
}

// Structural typing: TypeScript prüft nur die FORM (structural typing),
// nicht die Abstammung. akzeptiereVersendbar verlangt lediglich ein Objekt,
// das "versandkosten(): number" zur Verfügung stellt. Ein Objekt-Literal mit
// dieser Methode erfüllt den Vertrag — `implements`/`class` sind nur
// Dokumentation, keine Bedingung. Der Aufruf kompiliert deshalb auch ohne
// die beiden.
export function akzeptiereVersendbar(v: Versendbar): number {
  return v.versandkosten();
}

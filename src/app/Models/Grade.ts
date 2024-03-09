export class Grade {
  id: number;
  libelle: string;
  salair: string;
  constructor(id: number, libelle: string, salair: string) {
    this.id = id;
    this.libelle = libelle;
    this.salair = salair;
  }
}

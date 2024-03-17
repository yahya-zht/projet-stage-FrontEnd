export class Service {
  id: number;
  nom: string;
  responsable: number;
  nomberemployes: number;
  constructor(
    id: number,
    nom: string,
    responsable: number,
    nomberemployes: number
  ) {
    this.id = id;
    this.nom = nom;
    this.responsable = responsable;
    this.nomberemployes = nomberemployes;
  }
}

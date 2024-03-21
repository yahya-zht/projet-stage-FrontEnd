export class Demande {
  id: number;
  dateDemande: Date;
  dateDebut: Date;
  dateFin: Date;
  étet: string;
  Personne_id: number;
  personne!: {
    CIN: string;
    nom: string;
    prenom: string;
  };

  constructor(
    id: number,
    dateDemande: Date,
    dateDebut: Date,
    dateFin: Date,
    Personne_id: number,
    étet: string
  ) {
    this.id = id;
    this.dateDemande = dateDemande;
    this.dateDebut = dateDebut;
    this.dateFin = dateFin;
    this.Personne_id = Personne_id;
    this.étet = étet;
  }
}

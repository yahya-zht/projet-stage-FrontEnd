export class AbsenceCongeBase {
  id: number;
  datedebut: Date;
  datefin: Date;
  duree: number;
  type: string;
  personne_id: number;
  demande_conge_id: number;
  personne!: {
    CIN: string;
    nom: string;
    prenom: string;
    solde_conge: number;
  };
  constructor(
    id: number,
    datedebut: Date,
    datefin: Date,
    duree: number,
    type: string,
    Personne_id: number,
    demande_conge_id: number
  ) {
    this.id = id;
    this.datedebut = datedebut;
    this.datefin = datefin;
    this.duree = duree;
    this.type = type;
    this.personne_id = Personne_id;
    this.demande_conge_id = demande_conge_id;
  }
}

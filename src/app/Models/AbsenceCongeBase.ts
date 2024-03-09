export class AbsenceCongeBase {
  id: number;
  datedebut: Date;
  datefin: Date;
  duree: number;
  type: string;
  Personne_id: number;
  constructor(
    id: number,
    datedebut: Date,
    datefin: Date,
    duree: number,
    type: string,
    Personne_id: number
  ) {
    this.id = id;
    this.datedebut = datedebut;
    this.datefin = datefin;
    this.duree = duree;
    this.type = type;
    this.Personne_id = Personne_id;
  }
}

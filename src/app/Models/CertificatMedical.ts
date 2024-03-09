export class CertificatMedical {
  id: number;
  DateDébut: string;
  DateFin: string;
  Médecin: string;
  Diagnostic: string;
  DateEmission: string;
  Validité: string;
  Etablissement: string;
  Absence_id: number;
  constructor(
    id: number,
    DateDébut: string,
    DateFin: string,
    Médecin: string,
    Diagnostic: string,
    DateEmission: string,
    Validité: string,
    Etablissement: string,
    Absence_id: number
  ) {
    this.id = id;
    this.DateDébut = DateDébut;
    this.DateFin = DateFin;
    this.Médecin = Médecin;
    this.Diagnostic = Diagnostic;
    this.DateEmission = DateEmission;
    this.Validité = Validité;
    this.Etablissement = Etablissement;
    this.Absence_id = Absence_id;
  }
}

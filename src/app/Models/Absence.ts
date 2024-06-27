import { AbsenceCongeBase } from './AbsenceCongeBase';

export class Absence extends AbsenceCongeBase {
  date_fin: any;
  date_debut: any;
  demande_absence: any;
  nom: any;
  prenom: any;
  constructor(AbsenceCongeBase: AbsenceCongeBase) {
    super(
      AbsenceCongeBase.id,
      AbsenceCongeBase.datedebut,
      AbsenceCongeBase.datefin,
      AbsenceCongeBase.duree,
      AbsenceCongeBase.type,
      AbsenceCongeBase.personne_id,
      AbsenceCongeBase.demande_conge_id
    );
  }
}

import { AbsenceCongeBase } from './AbsenceCongeBase';

export class Conge extends AbsenceCongeBase {
  date_debut: any;
  date_fin: any;
  prenom: any;
  nom: any;
  demande_conge: any;
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

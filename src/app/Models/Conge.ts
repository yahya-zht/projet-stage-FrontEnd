import { AbsenceCongeBase } from './AbsenceCongeBase';

export class Conge extends AbsenceCongeBase {
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

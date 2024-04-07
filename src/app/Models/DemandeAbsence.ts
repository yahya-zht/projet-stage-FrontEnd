import { Demande } from './Demande';

export class DemandeAbsence extends Demande {
  Absence_id: number;
  constructor(demande: Demande, Absence_id: number) {
    super(
      demande.id,
      demande.dateDemande,
      demande.dateDebut,
      demande.dateFin,
      demande.Personne_id,
      demande.étet,
      demande.Ref
    );
    this.Absence_id = Absence_id;
  }
}

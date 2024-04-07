import { Demande } from './Demande';

export class DemandeConge extends Demande {
  Conge_id: number;
  constructor(demande: Demande, Conge_id: number) {
    super(
      demande.id,
      demande.dateDemande,
      demande.dateDebut,
      demande.dateFin,
      demande.Personne_id,
      demande.étet,
      demande.Ref
    );
    this.Conge_id = Conge_id;
  }
}

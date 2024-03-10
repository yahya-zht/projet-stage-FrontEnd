export class Personne {
  id: number;
  CIN: string;
  nom: string;
  prenom: string;
  date_naissance: string;
  adresse: string;
  telephone: string;
  role: string;
  chef_id?: number;
  grade_id: number;
  fonction_id: number;
  echelle_id: number;
  service_id: number;
  grade!: {
    // id: number;
    libelle: string;
    // salaire: number;
    // created_at: string;
    // updated_at: string;
  };
  fonction!: {
    id: number;
    libelle: string;
    created_at: string;
    updated_at: string;
  };
  echelle!: {
    id: number;
    libelle: string;
    niveau: number;
    created_at: string;
    updated_at: string;
  };
  service!: {
    id: number;
    nom: string;
    responsable_id: number | null;
    nombre_employes: number;
    created_at: string;
    updated_at: string;
  };
  chef!: {
    nom: string;
  };
  Personne: any;
  constructor(
    id: number,
    CIN: string,
    nom: string,
    prenom: string,
    dateNaissance: string,
    adresse: string,
    telephone: string,
    role: string,
    grade_id: number,
    fonction_id: number,
    echelle_id: number,
    service_id: number,
    chef_id?: number
  ) {
    this.id = id;
    this.CIN = CIN;
    this.nom = nom;
    this.prenom = prenom;
    this.date_naissance = dateNaissance;
    this.adresse = adresse;
    this.telephone = telephone;
    this.role = role;
    this.chef_id = chef_id;
    this.grade_id = grade_id;
    this.fonction_id = fonction_id;
    this.echelle_id = echelle_id;
    this.service_id = service_id;
  }
}

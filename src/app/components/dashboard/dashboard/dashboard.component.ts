import { Component, OnInit } from '@angular/core';
import { AccueilService } from 'src/app/services/accueil/accueil.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private accueil: AccueilService,
    private authService: AuthService
  ) {}
  public Role = '';
  public Accueil = {
    NbAbsence: '',
    NbConges: '',
    NbSoldeConges: '',
    personnes_count: 0,
    services_count: 0,
    absences_today_count: 0,
    conges_today_count: 0,
    conges_current_month_count: 0,
    absences_current_month_count: 0,
    demande_absences_count_month: 0,
    demande_conges_count_month: 0,
    demande_absences_today_count: 0,
    demande_conges_today_count: 0,
    total_demande_absences_count_att: 0,
    total_demande_conges_count_att: 0,
    demandeAbsencesCountCetteAnnee: 0,
    demandeCongesCountCetteAnnee: 0,
    etablissements_count: 0,
  };
  ngOnInit(): void {
    this.Role = this.authService.getUserRole();
    if (this.Role == 'Employé' || this.Role == 'Superviseur') {
      this.accueil.getAccueilEmployee().subscribe(
        (response) => {
          console.log(response.Conges.solde_congés);
          this.Accueil.NbAbsence = response.NbAbsence;
          this.Accueil.NbConges = response.Conges[0].SUMDayInYear;
          this.Accueil.NbSoldeConges = response.Conges[0].solde_congés;
          console.log(response);
          console.log(response.NbAbsence);
          console.log(response.Conges[0].solde_congés);
        },
        (error) => {
          console.error(error);
        }
      );
    } else if (this.Role === 'Directeur') {
      this.accueil.getAccueilDirecteur().subscribe(
        (response) => {
          console.log(response);
          this.Accueil.personnes_count = response.personnes_count;
          this.Accueil.services_count = response.services_count;
          this.Accueil.absences_today_count = response.absences_today_count;
          this.Accueil.conges_today_count = response.conges_today_count;
          this.Accueil.conges_current_month_count =
            response.conges_current_month_count;
          this.Accueil.absences_current_month_count =
            response.absences_current_month_count;
          this.Accueil.demande_absences_count_month =
            response.demande_absences_count;
          this.Accueil.demande_absences_today_count =
            response.demande_absences_today_count;
          this.Accueil.demande_conges_count_month =
            response.demande_conges_count;
          this.Accueil.demande_conges_today_count =
            response.demande_conges_today_count;
          this.Accueil.total_demande_absences_count_att =
            response.total_demande_absences_count;
          this.Accueil.total_demande_conges_count_att =
            response.total_demande_conges_count;
        },
        (error) => {
          console.error(error);
        }
      );
    } else if (this.Role === 'Admin') {
      this.accueil.getAccueilAdmin().subscribe(
        (response) => {
          console.log(response);
          this.Accueil.personnes_count = response.personnes_count;
          this.Accueil.services_count = response.services_count;
          this.Accueil.absences_today_count = response.absences_today_count;
          this.Accueil.conges_today_count = response.conges_today_count;
          this.Accueil.conges_current_month_count =
            response.conges_current_month_count;
          this.Accueil.absences_current_month_count =
            response.absences_current_month_count;
          this.Accueil.demande_absences_count_month =
            response.demande_absences_count;
          this.Accueil.demande_absences_today_count =
            response.demande_absences_today_count;
          this.Accueil.demande_conges_count_month =
            response.demande_conges_count;
          this.Accueil.demande_conges_today_count =
            response.demande_conges_today_count;
          this.Accueil.total_demande_absences_count_att =
            response.total_demande_absences_count;
          this.Accueil.total_demande_conges_count_att =
            response.total_demande_conges_count;
          this.Accueil.demandeAbsencesCountCetteAnnee =
            response.demandeAbsencesCountCetteAnnée;
          this.Accueil.demandeCongesCountCetteAnnee =
            response.demandeCongesCountCetteAnnée;
          this.Accueil.etablissements_count = response.etablissements_count;
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
}

import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Absence } from 'src/app/Models/Absence';
import { ExportService } from 'src/app/pdf/excel/export-service/export.service';
import { AbsenceService } from 'src/app/services/absence/absence.service';
import { AccueilService } from 'src/app/services/accueil/accueil.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-table-absence',
  templateUrl: './table-absence.component.html',
  styleUrls: ['./table-absence.component.css'],
})
export class TableAbsenceComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Absence>;
  dataSource = new MatTableDataSource<Absence>();

  displayedColumns = [
    'Nom',
    'Ref_demande',
    'datedebut',
    'datefin',
    'duree',
    'type',
  ];
  data: any[] = [];
  public Role = '';
  a = false;
  constructor(
    private absenceService: AbsenceService,
    private authService: AuthService,
    private accueil: AccueilService,
    private exportService: ExportService
  ) {}
  ngOnInit(): void {
    this.Role = this.authService.getUserRole();
    const Role = this.Role;
    this.dataSource.filterPredicate = (data, filter: string) => {
      const transformedFilter = filter.trim().toLowerCase();

      const nom = data.personne
        ? `${data.personne.nom} ${data.personne.prenom}`
        : `${data.nom} ${data.prenom}`;
      const refDemande = data.demande_absence
        ? data.demande_absence.Ref.toLowerCase()
        : '';
      const dateDebut = data.date_debut ? data.date_debut.toLowerCase() : '';
      const dateFin = data.date_fin ? data.date_fin.toLowerCase() : '';
      const duree = data.duree ? data.duree.toString().toLowerCase() : '';
      const type = data.type ? data.type.toString().toLowerCase() : '';

      return (
        nom.toLowerCase().includes(transformedFilter) ||
        refDemande.includes(transformedFilter) ||
        dateDebut.includes(transformedFilter) ||
        dateFin.includes(transformedFilter) ||
        type.includes(transformedFilter) ||
        duree.includes(transformedFilter)
      );
    };
    if (Role === 'Superviseur') {
      this.absenceService.getAbsenceForResponsable().subscribe(
        (absences: any) => {
          this.dataSource.data = absences.Absences;
          console.log('Absence dataSource:', this.dataSource.data);
        },
        (error) => {
          console.error('Error fetching Conge:', error);
        }
      );
    } else if (Role === 'Directeur') {
      if (window.location.pathname === '/absence') {
        this.absenceService.getAbsenceForDirecteur().subscribe(
          (absences: any) => {
            this.dataSource.data = absences.Absences;
            console.log('Absence dataSource:', this.dataSource.data);
            this.data = this.dataSource.data.map((absence) => ({
              Nom: absence.personne.nom,
              Ref_demande: absence.personne.prenom,
              datedebut: absence.date_debut,
              datefin: absence.date_fin,
              duree: absence.duree,
              type: absence.type,
            }));
          },
          (error) => {
            console.error('Error fetching Conge:', error);
          }
        );
      } else if (window.location.pathname === '/') {
        this.a = true;
        this.accueil.getAccueilDirecteur().subscribe(
          (absences: any) => {
            this.dataSource.data = absences.absences_today;
            console.log('Absence dataSource:', this.dataSource.data);
          },
          (error) => {
            console.error('Error fetching Conge:', error);
          }
        );
      }
    } else if (Role === 'Admin') {
      if (window.location.pathname === '/absence') {
        this.absenceService.getAllAbsence().subscribe(
          (absences: any) => {
            this.dataSource.data = absences.Absences;
            console.log('Absence dataSource:', this.dataSource.data);
            this.data = this.dataSource.data.map((absence) => ({
              Nom: absence.personne.nom,
              Ref_demande: absence.personne.prenom,
              datedebut: absence.date_debut,
              datefin: absence.date_fin,
              duree: absence.duree,
              type: absence.type,
            }));
            console.log('Absence data:', this.data);
          },
          (error) => {
            console.error('Error fetching Conge:', error);
          }
        );
      } else if (window.location.pathname === '/') {
        this.a = true;
        this.accueil.getAccueilAdmin().subscribe(
          (absences: any) => {
            this.dataSource.data = absences.absences_today;
            console.log('Absence dataSource:', this.dataSource.data);
          },
          (error) => {
            console.error('Error fetching Conge:', error);
          }
        );
      }
    }
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  exportData() {
    this.exportService.exportToExcel(this.data, 'Absences');
  }
}

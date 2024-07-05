import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { DemandeAbsence } from 'src/app/Models/DemandeAbsence';
import { AccueilService } from 'src/app/services/accueil/accueil.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DemandeAbsenceService } from 'src/app/services/demande_absence/demande-absence.service';
import { DemandeAbsenceAdminService } from 'src/app/services/demande_absence_admin/demande-absence-admin.service';

@Component({
  selector: 'app-table-demande-absence-admin',
  templateUrl: './table-demande-absence-admin.component.html',
  styleUrls: ['./table-demande-absence-admin.component.css'],
})
export class TableDemandeAbsenceAdminComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<DemandeAbsence>;
  dataSource = new MatTableDataSource<DemandeAbsence>();

  displayedColumns = [
    'CIN',
    'Personne',
    'Type',
    'Durée',
    'DateDemande',
    'DateDebut',
    'DateFin',
    'image',
    'Action',
  ];
  a = false;
  public Role = '';

  selectedImage: string | null = null;
  constructor(
    private demandeAbsenceAdminService: DemandeAbsenceAdminService,
    private accueil: AccueilService,
    private authService: AuthService
  ) {
    this.Role = this.authService.getUserRole();
  }
  ngOnInit(): void {
    if (window.location.pathname === '/admin/demande/absence') {
      this.demandeAbsenceAdminService.getAllDemandeAbsence().subscribe(
        (demandeabsence: any) => {
          this.dataSource.data = demandeabsence.demandesEnAttente;
          console.log('Demande Absence dataSource:', this.dataSource.data);
        },
        (error) => {
          console.error('Error fetching Demande Absence:', error);
        }
      );
    } else if (window.location.pathname === '/') {
      this.a = true;
      if ((this.Role = 'Admin')) {
        this.accueil.getAccueilAdmin().subscribe(
          (demandeabsence: any) => {
            this.dataSource.data = demandeabsence.demande_absences_today;
            console.log('Demande Absence dataSource:', this.dataSource.data);
          },
          (error) => {
            console.error('Error fetching Demande Absence:', error);
          }
        );
      } else if ((this.Role = 'Directeur')) {
        this.accueil.getAccueilDirecteur().subscribe(
          (demandeabsence: any) => {
            this.dataSource.data = demandeabsence.demande_absences_today;
            console.log('Demande Absence dataSource:', this.dataSource.data);
          },
          (error) => {
            console.error('Error fetching Demande Absence:', error);
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
  addAbsence(id: any, i: any) {
    this.demandeAbsenceAdminService.AddAbsence(id).subscribe(() => {
      this.dataSource.data.splice(i, 1);
      this.dataSource._updateChangeSubscription();
    });
  }
  rejectDemande(id: any, i: any) {
    this.demandeAbsenceAdminService.RejectAbsence(id).subscribe(() => {
      this.dataSource.data.splice(i, 1);
      this.dataSource._updateChangeSubscription();
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  showImage(imageUrl: string) {
    this.selectedImage = 'http://127.0.0.1:8000/Storage/' + imageUrl;
    console.log(this.selectedImage);
  }
}

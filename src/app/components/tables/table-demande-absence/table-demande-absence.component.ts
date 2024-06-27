import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { DemandeAbsence } from 'src/app/Models/DemandeAbsence';
import { AccueilService } from 'src/app/services/accueil/accueil.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DemandeAbsenceService } from 'src/app/services/demande_absence/demande-absence.service';

@Component({
  selector: 'app-table-demande-absence',
  templateUrl: './table-demande-absence.component.html',
  styleUrls: ['./table-demande-absence.component.css'],
})
export class TableDemandeAbsenceComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<DemandeAbsence>;
  dataSource = new MatTableDataSource<DemandeAbsence>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [
    'Ref',
    'Type',
    'DateDemande',
    'DateDebut',
    'DateFin',
    'Durée',
    'état',
    'Action',
  ];
  public Role = '';
  a = false;
  constructor(
    private demandeAbsenceService: DemandeAbsenceService,
    private authService: AuthService,
    private accueil: AccueilService
  ) {}
  ngOnInit(): void {
    this.Role = this.authService.getUserRole();
    const Role = this.Role;
    if (Role === 'Employé') {
      if (window.location.pathname === '/') {
        this.a = true;
        this.accueil.getAccueilEmployee().subscribe(
          (demandeabsence: any) => {
            this.dataSource.data = demandeabsence.demandeAbsencesCeMois;
            console.log('Demande Absence dataSource:', this.dataSource.data);
          },
          (error) => {
            console.error('Error fetching Demande Absence:', error);
          }
        );
      } else {
        this.demandeAbsenceService.getDemandeAbsenceForOne().subscribe(
          (demandeabsence: any) => {
            this.dataSource.data = demandeabsence.DemandeAbsence;
            console.log('Demande Absence dataSource:', this.dataSource.data);
          },
          (error) => {
            console.error('Error fetching Demande Absence:', error);
          }
        );
      }
      this.demandeAbsenceService.getDemandeAbsenceForOne().subscribe(
        (demandeabsence: any) => {
          this.dataSource.data = demandeabsence.DemandeAbsence;
          console.log('Demande Absence dataSource:', this.dataSource.data);
        },
        (error) => {
          console.error('Error fetching Demande Absence:', error);
        }
      );
    } else if (Role === 'Directeur') {
      console.log('Directeur');
      this.displayedColumns.unshift('CIN', 'Nom');
      this.demandeAbsenceService.getDemandeAbsenceForDirecteur().subscribe(
        (demandeabsence: any) => {
          this.dataSource.data = demandeabsence.DemandeAbsence;
          console.log('Demande Absence dataSource:', this.dataSource.data);
        },
        (error) => {
          console.error('Error fetching Demande Absence:', error);
        }
      );
    } else if (Role === 'Superviseur') {
      this.displayedColumns.unshift('CIN', 'Nom');
      if (window.location.pathname === '/') {
        this.a = true;
        this.accueil.getAccueilEmployee().subscribe(
          (demandeabsence: any) => {
            this.dataSource.data = demandeabsence.demandeAbsencesCeMois;
            // console.log('Demande Absence dataSource:', this.dataSource.data);
          },
          (error) => {
            console.error('Error fetching Demande Absence:', error);
          }
        );
      } else {
        this.demandeAbsenceService.getDemandeAbsenceForResponsable().subscribe(
          (demandeabsence: any) => {
            this.dataSource.data = demandeabsence.DemandeAbsence;
            // console.log('Demande Absence dataSource:', this.dataSource.data);
          },
          (error) => {
            console.error('Error fetching Demande Absence:', error);
          }
        );
      }
    } else if (Role === 'Admin') {
      console.log('Admin');
      this.displayedColumns.unshift('CIN', 'Nom');
      this.demandeAbsenceService.getAllDemandeAbsence().subscribe(
        (demandeabsence: any) => {
          this.dataSource.data = demandeabsence.DemandeAbsence;
          // console.log('Demande Absence dataSource:', this.dataSource.data);
        },
        (error) => {
          console.error('Error fetching Demande Absence:', error);
        }
      );
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
  delete(id: any, i: any) {
    if (confirm('Etes-vous sûr de vouloir supprimer cette Demande')) {
      this.demandeAbsenceService.deleteDemandeAbsence(id).subscribe(
        (response: any) => {
          this.dataSource.data.splice(i, 1);
          this.dataSource._updateChangeSubscription();
          // console.log(response.message);
        },
        (error: any) => {
          console.error('An error occurred while deleting the Demande:', error);
        }
      );
    }
  }
  getColor(etat: string): string {
    switch (etat) {
      case 'Acceptable':
        return 'green';
      case 'REJETÉ':
        return 'red';
      default:
        return 'black';
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

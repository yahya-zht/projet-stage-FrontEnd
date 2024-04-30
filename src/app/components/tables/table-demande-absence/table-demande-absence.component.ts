import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { DemandeAbsence } from 'src/app/Models/DemandeAbsence';
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
    'Type',
    'DateDemande',
    'DateDebut',
    'DateFin',
    'Durée',
    'état',
  ];
  public Role = '';
  constructor(
    private demandeAbsenceService: DemandeAbsenceService,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.Role = this.authService.getUserRole();
    const Role = this.Role;
    if (Role === 'Employé') {
      console.log('Employé');
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
      console.log('Superviseur');
      this.demandeAbsenceService.getDemandeAbsenceForResponsable().subscribe(
        (demandeabsence: any) => {
          this.dataSource.data = demandeabsence.DemandeAbsence;
          console.log('Demande Absence dataSource:', this.dataSource.data);
        },
        (error) => {
          console.error('Error fetching Demande Absence:', error);
        }
      );
    } else if (Role === 'Admin') {
      console.log('Admin');
      this.displayedColumns.unshift('CIN', 'Nom');
      this.demandeAbsenceService.getAllDemandeAbsence().subscribe(
        (demandeabsence: any) => {
          this.dataSource.data = demandeabsence.DemandeAbsence;
          console.log('Demande Absence dataSource:', this.dataSource.data);
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
}

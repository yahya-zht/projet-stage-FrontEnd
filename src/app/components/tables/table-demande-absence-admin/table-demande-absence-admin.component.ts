import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { DemandeAbsence } from 'src/app/Models/DemandeAbsence';
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
    'Personne',
    'Type',
    'Durée',
    'DateDemande',
    'DateDebut',
    'DateFin',
    'Action',
  ];

  constructor(private demandeAbsenceAdminService: DemandeAbsenceAdminService) {}
  ngOnInit(): void {
    this.demandeAbsenceAdminService.getAllDemandeAbsence().subscribe(
      (demandeabsence: any) => {
        this.dataSource.data = demandeabsence.demandesEnAttente;
        console.log('Demande Absence dataSource:', this.dataSource.data);
      },
      (error) => {
        console.error('Error fetching Demande Absence:', error);
      }
    );
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
}

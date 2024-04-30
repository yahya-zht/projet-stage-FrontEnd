import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Absence } from 'src/app/Models/Absence';
import { AbsenceService } from 'src/app/services/absence/absence.service';
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
  public Role = '';
  constructor(
    private absenceService: AbsenceService,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.Role = this.authService.getUserRole();
    const Role = this.Role;
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
      this.absenceService.getAbsenceForDirecteur().subscribe(
        (absences: any) => {
          this.dataSource.data = absences.Absences;
          console.log('Absence dataSource:', this.dataSource.data);
        },
        (error) => {
          console.error('Error fetching Conge:', error);
        }
      );
    } else if (Role === 'Admin') {
      this.absenceService.getAllAbsence().subscribe(
        (absences: any) => {
          this.dataSource.data = absences.Absences;
          console.log('Absence dataSource:', this.dataSource.data);
        },
        (error) => {
          console.error('Error fetching Conge:', error);
        }
      );
    }
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}

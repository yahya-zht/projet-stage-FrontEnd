import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Absence } from 'src/app/Models/Absence';
import { AbsenceService } from 'src/app/services/absence/absence.service';

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
    'Personne_id',
    'demande_absence_id',
    'datedebut',
    'datefin',
    'duree',
    'type',
  ];
  constructor(private absenceService: AbsenceService) {}
  ngOnInit(): void {
    this.absenceService.getAllAbsence().subscribe(
      (absences: any) => {
        this.dataSource.data = absences.Absences;
        console.log('Conge dataSource:', this.dataSource.data);
      },
      (error) => {
        console.error('Error fetching Conge:', error);
      }
    );
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}

import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { TableDemandeAbsenceDataSource, TableDemandeAbsenceItem } from './table-demande-absence-datasource';

@Component({
  selector: 'app-table-demande-absence',
  templateUrl: './table-demande-absence.component.html',
  styleUrls: ['./table-demande-absence.component.css']
})
export class TableDemandeAbsenceComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<TableDemandeAbsenceItem>;
  dataSource: TableDemandeAbsenceDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  constructor() {
    this.dataSource = new TableDemandeAbsenceDataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}

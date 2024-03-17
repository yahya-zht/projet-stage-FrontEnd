import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { TableDemandeCongeDataSource, TableDemandeCongeItem } from './table-demande-conge-datasource';

@Component({
  selector: 'app-table-demande-conge',
  templateUrl: './table-demande-conge.component.html',
  styleUrls: ['./table-demande-conge.component.css']
})
export class TableDemandeCongeComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<TableDemandeCongeItem>;
  dataSource: TableDemandeCongeDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  constructor() {
    this.dataSource = new TableDemandeCongeDataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}

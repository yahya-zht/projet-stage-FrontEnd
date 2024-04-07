import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Conge } from 'src/app/Models/Conge';
import { CongeService } from 'src/app/services/conge/conge.service';

@Component({
  selector: 'app-table-conge',
  templateUrl: './table-conge.component.html',
  styleUrls: ['./table-conge.component.css'],
})
export class TableCongeComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Conge>;
  dataSource = new MatTableDataSource<Conge>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [
    'Personne_id',
    'Ref_demande',
    'datedebut',
    'datefin',
    'duree',
    'type',
  ];

  constructor(private congeService: CongeService) {}
  ngOnInit(): void {
    this.congeService.getAllConge().subscribe(
      (conge: any) => {
        this.dataSource.data = conge.Conges;
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

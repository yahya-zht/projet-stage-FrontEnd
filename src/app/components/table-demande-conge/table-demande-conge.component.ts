import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import {
  TableDemandeCongeDataSource,
  TableDemandeCongeItem,
} from './table-demande-conge-datasource';
import { DemandeConge } from 'src/app/Models/DemandeConge';
import { DemandeCongeService } from 'src/app/services/demande_conge/demande-conge.service';

@Component({
  selector: 'app-table-demande-conge',
  templateUrl: './table-demande-conge.component.html',
  styleUrls: ['./table-demande-conge.component.css'],
})
export class TableDemandeCongeComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<DemandeConge>;
  dataSource = new MatTableDataSource<DemandeConge>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [
    'DateDemande',
    'DateDebut',
    'DateFin',
    'Durée',
    'Personne',
    'état',
  ];

  constructor(private demandeCongeService: DemandeCongeService) {}
  ngOnInit(): void {
    this.demandeCongeService.getAllDemandeConge().subscribe(
      (demandeConge: any) => {
        this.dataSource.data = demandeConge.DemandeConge;
        console.log('Demande Congé dataSource:', this.dataSource.data);
      },
      (error) => {
        console.error('Error fetching Demande Congé:', error);
      }
    );
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
  delete(id: any, i: any) {
    if (confirm('Etes-vous sûr de vouloir supprimer cette échelle')) {
      this.demandeCongeService.deleteDemandeConge(id).subscribe(() => {
        this.dataSource.data.splice(i, 1);
        this.dataSource._updateChangeSubscription();
      });
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
}

import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { DemandeConge } from 'src/app/Models/DemandeConge';
import { DemandeCongeAdminService } from 'src/app/services/demande_conge_admin/demande-conge-admin.service';

@Component({
  selector: 'app-table-demande-conge-directeur',
  templateUrl: './table-demande-conge-directeur.component.html',
  styleUrls: ['./table-demande-conge-directeur.component.css'],
})
export class TableDemandeCongeDirecteurComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<DemandeConge>;
  dataSource = new MatTableDataSource<DemandeConge>();

  displayedColumns = [
    'Personne',
    'Type',
    'Durée',
    'DateDemande',
    'DateDebut',
    'DateFin',
    'Action',
  ];

  constructor(private demandeCongeAdminService: DemandeCongeAdminService) {}

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
  ngOnInit(): void {
    this.demandeCongeAdminService.getAllDemandeConge().subscribe(
      (demandeConge: any) => {
        this.dataSource.data = demandeConge.demandesEnAttente;
        console.log('Demande Congé dataSource:', this.dataSource.data);
      },
      (error) => {
        console.error('Error fetching Demande Congé:', error);
      }
    );
  }
  addConge(id: any, i: any) {
    this.demandeCongeAdminService.AddConge(id).subscribe(() => {
      this.dataSource.data.splice(i, 1);
      this.dataSource._updateChangeSubscription();
    });
  }
  rejectDemande(id: any, i: any) {
    this.demandeCongeAdminService.RejectConge(id).subscribe(() => {
      this.dataSource.data.splice(i, 1);
      this.dataSource._updateChangeSubscription();
    });
  }
}

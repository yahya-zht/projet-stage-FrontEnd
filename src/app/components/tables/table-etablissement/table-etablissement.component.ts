import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Etablissement } from 'src/app/Models/Etablissement';
import { ExportService } from 'src/app/pdf/excel/export-service/export.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { EtablissementService } from 'src/app/services/etablissement/etablissement.service';

@Component({
  selector: 'app-table-etablissement',
  templateUrl: './table-etablissement.component.html',
  styleUrls: ['./table-etablissement.component.css'],
})
export class TableEtablissementComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Etablissement>;
  dataSource = new MatTableDataSource<Etablissement>();
  displayedColumns = ['nom', 'adresse', 'directeur_id', 'Action'];
  public Role = '';
  data: any[] = [];
  constructor(
    private authService: AuthService,
    private etablissement: EtablissementService,
    private exportService: ExportService
  ) {}
  ngOnInit(): void {
    this.Role = this.authService.getUserRole();
    this.etablissement.getAllEtablissement().subscribe(
      (etablissement: any) => {
        this.dataSource.data = etablissement.Etablissements;
        this.data = this.dataSource.data.map((etablissement) => ({
          Libelle: etablissement.nom,
          Adresse: etablissement.adresse,
          Nom: etablissement.directeur ? etablissement.directeur.nom : '---',
          Prenom: etablissement.directeur
            ? etablissement.directeur.prenom
            : '---',
        }));
      },
      (error) => {
        console.error('Error fetching personnes:', error);
      }
    );
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
  delete(id: any, i: any) {
    if (confirm('Etes-vous sûr de vouloir supprimer cette Etablissement?')) {
      this.etablissement.deleteEtablissement(id).subscribe(() => {
        this.dataSource.data.splice(i, 1);
        this.dataSource._updateChangeSubscription();
      });
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  exportData() {
    this.exportService.exportToExcel(this.data, 'Etablissements');
  }
}

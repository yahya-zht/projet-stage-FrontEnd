import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Conge } from 'src/app/Models/Conge';
import { ExportService } from 'src/app/pdf/excel/export-service/export.service';
import { AccueilService } from 'src/app/services/accueil/accueil.service';
import { AuthService } from 'src/app/services/auth/auth.service';
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
    'Nom',
    'Ref_demande',
    'datedebut',
    'datefin',
    'duree',
    'type',
  ];
  a = false;
  public Role = '';
  data: any[] = [];
  constructor(
    private congeService: CongeService,
    private authService: AuthService,
    private accueil: AccueilService,
    private exportService: ExportService
  ) {}
  ngOnInit(): void {
    this.dataSource.filterPredicate = (data, filter: string) => {
      const transformedFilter = filter.trim().toLowerCase();

      const nom = data.personne
        ? `${data.personne.nom} ${data.personne.prenom}`
        : `${data.nom} ${data.prenom}`;
      const refDemande = data.demande_conge
        ? data.demande_conge.Ref.toLowerCase()
        : '';
      const dateDebut = data.date_debut ? data.date_debut.toLowerCase() : '';
      const dateFin = data.date_fin ? data.date_fin.toLowerCase() : '';
      const duree = data.duree ? data.duree.toString().toLowerCase() : '';
      const type = data.type ? data.type.toString().toLowerCase() : '';

      return (
        nom.toLowerCase().includes(transformedFilter) ||
        refDemande.includes(transformedFilter) ||
        dateDebut.includes(transformedFilter) ||
        dateFin.includes(transformedFilter) ||
        type.includes(transformedFilter) ||
        duree.includes(transformedFilter)
      );
    };
    this.Role = this.authService.getUserRole();
    const Role = this.Role;
    if (Role === 'Superviseur') {
      this.congeService.getCongeForResponsable().subscribe(
        (conge: any) => {
          this.dataSource.data = conge.Conges;
          // console.log('Conge dataSource:', this.dataSource.data);
        },
        (error) => {
          console.error('Error fetching Conge:', error);
        }
      );
    } else if (Role === 'Directeur') {
      if (window.location.pathname === '/conge') {
        this.congeService.getCongeForDirecteur().subscribe(
          (conge: any) => {
            this.dataSource.data = conge.Conges;
            this.data = this.dataSource.data.map((conge) => ({
              Nom: conge.personne.nom,
              Ref_demande: conge.personne.prenom,
              datedebut: conge.date_debut,
              datefin: conge.date_fin,
              duree: conge.duree,
              type: conge.type,
            }));
          },
          (error) => {
            console.error('Error fetching Conge:', error);
          }
        );
      } else if (window.location.pathname === '/') {
        this.a = true;
        this.accueil.getAccueilDirecteur().subscribe(
          (conge: any) => {
            this.dataSource.data = conge.conges_today;
            // console.log('Conge dataSource:', this.dataSource.data);
          },
          (error) => {
            console.error('Error fetching Conge:', error);
          }
        );
      }
    } else if (Role === 'Admin') {
      if (window.location.pathname === '/conge') {
        this.congeService.getAllConge().subscribe(
          (conge: any) => {
            this.dataSource.data = conge.Conges;
            this.data = this.dataSource.data.map((absence) => ({
              Nom: absence.personne.nom,
              Ref_demande: absence.personne.prenom,
              datedebut: absence.date_debut,
              datefin: absence.date_fin,
              duree: absence.duree,
              type: absence.type,
            }));
          },
          (error) => {
            console.error('Error fetching Conge:', error);
          }
        );
      } else if (window.location.pathname === '/') {
        this.a = true;
        this.accueil.getAccueilAdmin().subscribe(
          (conge: any) => {
            this.dataSource.data = conge.conges_today;
            console.log('Conge dataSource:', this.dataSource.data);
          },
          (error) => {
            console.error('Error fetching Conge:', error);
          }
        );
      }
    }
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  exportData() {
    this.exportService.exportToExcel(this.data, 'Conges');
  }
}

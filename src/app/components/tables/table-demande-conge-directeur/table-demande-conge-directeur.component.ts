import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { DemandeConge } from 'src/app/Models/DemandeConge';
import { AccueilService } from 'src/app/services/accueil/accueil.service';
import { AuthService } from 'src/app/services/auth/auth.service';
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
    'CIN',
    'Personne',
    'Type',
    'Durée',
    'DateDemande',
    'DateDebut',
    'DateFin',
    'solde_conge',
    'Action',
  ];
  public Role = '';
  a = false;
  erreur: string = '';
  constructor(
    private demandeCongeAdminService: DemandeCongeAdminService,
    private accueil: AccueilService,
    private authService: AuthService
  ) {
    this.Role = this.authService.getUserRole();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
  ngOnInit(): void {
    if (window.location.pathname === '/admin/demande/conge') {
      this.demandeCongeAdminService.getAllDemandeConge().subscribe(
        (demandeConge: any) => {
          this.dataSource.data = demandeConge.demandesEnAttente;
          console.log('Demande Congé dataSource 01:', this.dataSource.data);
        },
        (error) => {
          console.error('Error fetching Demande Congé:', error);
        }
      );
    } else if (window.location.pathname === '/') {
      this.a = true;
      if ((this.Role = 'Admin')) {
        this.accueil.getAccueilAdmin().subscribe(
          (demandeConge: any) => {
            this.dataSource.data = demandeConge.demande_conges_today;
            console.log(
              'Demande Congé dataSource Today:',
              this.dataSource.data
            );
          },
          (error) => {
            console.error('Error fetching Demande Congé:', error);
          }
        );
      } else if ((this.Role = 'Directeur')) {
        this.accueil.getAccueilDirecteur().subscribe(
          (demandeConge: any) => {
            this.dataSource.data = demandeConge.demande_conges_today;
            console.log(
              'Demande Congé dataSource Today:',
              this.dataSource.data
            );
          },
          (error) => {
            console.error('Error fetching Demande Congé:', error);
          }
        );
      }
    }
  }
  addConge(id: any, i: any) {
    // this.demandeCongeAdminService.AddConge(id).subscribe(() => {
    //   this.dataSource.data.splice(i, 1);
    //   this.dataSource._updateChangeSubscription();
    // });
    this.demandeCongeAdminService.AddConge(id).subscribe(
      () => {
        this.dataSource.data.splice(i, 1);
        this.dataSource._updateChangeSubscription();
      },
      (error) => {
        const errorMessage = error.message;
        const customErrorMessage =
          'La durée du congé est supérieure à la durée qui vous est accordée';
        if (errorMessage.includes(customErrorMessage)) {
          this.erreur = customErrorMessage;
        } else {
          this.erreur = 'Erreur ';
        }
      }
    );
  }
  rejectDemande(id: any, i: any) {
    this.demandeCongeAdminService.RejectConge(id).subscribe(() => {
      this.dataSource.data.splice(i, 1);
      this.dataSource._updateChangeSubscription();
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

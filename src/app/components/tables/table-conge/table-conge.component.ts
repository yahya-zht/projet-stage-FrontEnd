import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Conge } from 'src/app/Models/Conge';
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
  constructor(
    private congeService: CongeService,
    private authService: AuthService,
    private accueil: AccueilService
  ) {}
  ngOnInit(): void {
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
            // console.log('Conge dataSource:', this.dataSource.data);
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
            // console.log('Conge dataSource:', this.dataSource.data);
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
}

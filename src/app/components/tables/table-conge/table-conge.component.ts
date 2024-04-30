import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Conge } from 'src/app/Models/Conge';
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
  public Role = '';
  constructor(
    private congeService: CongeService,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.Role = this.authService.getUserRole();
    const Role = this.Role;
    if (Role === 'Superviseur') {
      this.congeService.getCongeForResponsable().subscribe(
        (conge: any) => {
          this.dataSource.data = conge.Conges;
          console.log('Conge dataSource:', this.dataSource.data);
        },
        (error) => {
          console.error('Error fetching Conge:', error);
        }
      );
    } else if (Role === 'Directeur') {
      this.congeService.getCongeForDirecteur().subscribe(
        (conge: any) => {
          this.dataSource.data = conge.Conges;
          console.log('Conge dataSource:', this.dataSource.data);
        },
        (error) => {
          console.error('Error fetching Conge:', error);
        }
      );
    } else if (Role === 'Admin') {
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
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}

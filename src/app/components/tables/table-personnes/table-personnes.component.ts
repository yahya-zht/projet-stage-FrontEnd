import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { PersonneService } from 'src/app/services/personne/personne.service';
import { Personne } from 'src/app/Models/Personne';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from 'src/app/services/service/service.service';
import { Service } from 'src/app/Models/Service';
import { Etablissement } from 'src/app/Models/Etablissement';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-table-personnes',
  templateUrl: './table-personnes.component.html',
  styleUrls: ['./table-personnes.component.css'],
})
export class TablePersonnesComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Personne>;
  dataSource = new MatTableDataSource<Personne>();
  getId: any;
  public Role = '';
  displayedColumns: string[] = [];
  constructor(
    private authService: AuthService,
    private personneService: PersonneService,
    private activatedRoute: ActivatedRoute,
    private serviceService: ServiceService
  ) {
    this.getId = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('Id=>' + this.getId);
  }

  ngOnInit(): void {
    this.Role = this.authService.getUserRole();
    const Role = this.Role;
    if (this.getId === null) {
      this.displayedColumns = [
        'CIN',
        'nom',
        'prenom',
        'telephone',
        'role',
        'fonction_id',
        'echelle_id',
        'service_id',
        'Action',
      ];
    } else {
      this.displayedColumns = [
        'CIN',
        'nom',
        'prenom',
        'telephone',
        'role',
        'fonction_id',
        'Etablissement',
        'Action',
      ];
    }
    if (this.getId === null) {
      if (this.Role === 'Admin') {
        console.log('Admin');
        this.personneService.getAllPersonnes().subscribe(
          (personnes: any) => {
            this.dataSource.data = personnes.Personnes;
            console.log('Personnes dataSource:', this.dataSource.data);
          },
          (error) => {
            console.error('Error fetching personnes:', error);
          }
        );
      } else if (Role === 'Superviseur' || Role === 'Directeur') {
        console.log('sup or D');
        this.personneService.getEmployes().subscribe(
          (personnes: any) => {
            this.dataSource.data = personnes.Personnes;
            console.log('Personnes dataSource:', this.dataSource.data);
          },
          (error) => {
            console.error('Error fetching personnes:', error);
          }
        );
      }
    } else {
      this.serviceService
        .getServiceById(this.getId)
        .subscribe((service: Service) => {
          console.log('Service => ' + service.Service.employees);
          this.dataSource.data = service.Service.employees;
        });
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
  delete(id: any, i: any) {
    if (confirm('Etes-vous sûr de vouloir supprimer cette personne')) {
      this.personneService.deletePersonne(id).subscribe(() => {
        this.dataSource.data.splice(i, 1);
        this.dataSource._updateChangeSubscription();
      });
    }
  }
}

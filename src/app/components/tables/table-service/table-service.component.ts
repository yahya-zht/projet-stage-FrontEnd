import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Etablissement } from 'src/app/Models/Etablissement';
import { Service } from 'src/app/Models/Service';
import { TokenService } from 'src/app/services/auth/token.service';
import { EtablissementService } from 'src/app/services/etablissement/etablissement.service';
import { ServiceService } from 'src/app/services/service/service.service';

@Component({
  selector: 'app-table-service',
  templateUrl: './table-service.component.html',
  styleUrls: ['./table-service.component.css'],
})
export class TableServiceComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Service>;
  dataSource = new MatTableDataSource<Service>();
  displayedColumns = ['nom', 'responsable', 'nomberemployes', 'Action'];

  getId: any;
  constructor(
    private service: ServiceService,
    private activatedRoute: ActivatedRoute,
    private etablissementService: EtablissementService,
    private tokenService: TokenService
  ) {
    this.getId = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('Id=>' + this.getId);
  }
  ngOnInit(): void {
    const accessToken: any = this.tokenService.getAccessToken();
    if (this.getId === null) {
      this.service.getAllService(accessToken).subscribe(
        (services: any) => {
          this.dataSource.data = services.Services;
          console.log('Services dataSource:', this.dataSource.data);
        },
        (error) => {
          console.error('Error fetching personnes:', error);
        }
      );
    } else {
      this.etablissementService
        .getEtablissementById(this.getId)
        .subscribe((etablissement: Etablissement) => {
          this.dataSource.data = etablissement.Etablissement.service;
        });
    }
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
  delete(id: any, i: any) {
    if (confirm('Etes-vous sûr de vouloir supprimer cette Service?')) {
      this.service.deleteService(id).subscribe(() => {
        this.dataSource.data.splice(i, 1);
        this.dataSource._updateChangeSubscription();
      });
    }
  }
}

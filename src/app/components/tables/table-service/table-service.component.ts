import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Service } from 'src/app/Models/Service';
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

  constructor(private service: ServiceService) {}
  ngOnInit(): void {
    this.service.getAllService().subscribe(
      (services: any) => {
        this.dataSource.data = services.Services;
        console.log('Services dataSource:', this.dataSource.data);
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
    if (confirm('Etes-vous sûr de vouloir supprimer cette Service?')) {
      this.service.deleteService(id).subscribe(() => {
        this.dataSource.data.splice(i, 1);
        this.dataSource._updateChangeSubscription();
      });
    }
  }
}

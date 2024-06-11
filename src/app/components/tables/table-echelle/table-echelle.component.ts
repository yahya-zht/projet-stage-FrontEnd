import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Echelle } from 'src/app/Models/Echelle';
import { EchelleService } from 'src/app/services/echelle/echelle.service';

@Component({
  selector: 'app-table-echelle',
  templateUrl: './table-echelle.component.html',
  styleUrls: ['./table-echelle.component.css'],
})
export class TableEchelleComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Echelle>;
  dataSource = new MatTableDataSource<Echelle>();

  displayedColumns = ['libelle', 'niveau', 'Action'];

  constructor(private echelleService: EchelleService) {}
  ngOnInit(): void {
    this.echelleService.getAllEchelle().subscribe(
      (echelle: any) => {
        this.dataSource.data = echelle.Echelles;
        console.log('echelle dataSource:', this.dataSource.data);
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
    if (confirm('Etes-vous sûr de vouloir supprimer cette échelle')) {
      this.echelleService.deleteEchelle(id).subscribe(() => {
        this.dataSource.data.splice(i, 1);
        this.dataSource._updateChangeSubscription();
      });
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Fonction } from 'src/app/Models/Fonction';
import { FonctionService } from 'src/app/services/fonction/fonction.service';

@Component({
  selector: 'app-table-fonction',
  templateUrl: './table-fonction.component.html',
  styleUrls: ['./table-fonction.component.css'],
})
export class TableFonctionComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Fonction>;
  dataSource = new MatTableDataSource<Fonction>();

  displayedColumns = ['libelle', 'Action'];

  constructor(private fonctionService: FonctionService) {}

  ngOnInit(): void {
    this.fonctionService.getAllFonction().subscribe(
      (fonction: any) => {
        this.dataSource.data = fonction.Fonctions;
        console.log('Grade dataSource:', this.dataSource.data);
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
    if (confirm('Etes-vous sûr de vouloir supprimer cette fonction ')) {
      this.fonctionService.deleteFonction(id).subscribe(() => {
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

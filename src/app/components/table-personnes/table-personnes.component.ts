import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { PersonneService } from 'src/app/services/personne/personne.service';
import { Personne } from 'src/app/Models/Personne';

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
  displayedColumns = [
    'CIN',
    'nom',
    'prenom',
    'dateNaissance',
    'adresse',
    'telephone',
    'role',
    'grade_id',
    'fonction_id',
    'echelle_id',
    'service_id',
    'chef_id',
    'Action',
  ];

  constructor(private personneService: PersonneService) {}

  ngOnInit(): void {
    this.personneService.getAllPersonnes().subscribe(
      (personnes: any) => {
        this.dataSource.data = personnes.Personnes;
        console.log('Personnes dataSource:', this.dataSource.data);
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
    if (confirm('Etes-vous sûr de vouloir supprimer cette personne')) {
      this.personneService.deletePersonne(id).subscribe(() => {
        this.dataSource.data.splice(i, 1);
        this.dataSource._updateChangeSubscription();
      });
    }
  }
}

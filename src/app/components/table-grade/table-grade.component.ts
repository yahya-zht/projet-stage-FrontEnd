import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Grade } from 'src/app/Models/Grade';
import { GradeService } from 'src/app/services/grade/grade.service';

@Component({
  selector: 'app-table-grade',
  templateUrl: './table-grade.component.html',
  styleUrls: ['./table-grade.component.css'],
})
export class TableGradeComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Grade>;
  dataSource = new MatTableDataSource<Grade>();
  displayedColumns = ['libelle', 'salaire'];

  constructor(private grade: GradeService) {}
  ngOnInit(): void {
    this.grade.getAllGrade().subscribe(
      (grade: any) => {
        this.dataSource.data = grade.AllGrade;
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
    if (confirm('delete grade ')) {
      this.grade.deleteGrade(id).subscribe((grade) => {
        this.dataSource.data.splice(i, 1);
      });
    }
  }
}

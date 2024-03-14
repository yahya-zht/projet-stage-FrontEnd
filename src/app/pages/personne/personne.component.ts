import { Component, OnInit } from '@angular/core';
import { Personne } from 'src/app/Models/Personne';
import { PersonneService } from 'src/app/services/personne/personne.service';

@Component({
  selector: 'app-personne',
  templateUrl: './personne.component.html',
  styleUrls: ['./personne.component.css'],
})
export class PersonneComponent implements OnInit {
  Personnes: Personne[] = [];
  constructor(private personneService: PersonneService) {}

  ngOnInit(): void {
    this.personneService.getAllPersonnes().subscribe(
      (personnes: any) => {
        this.Personnes = personnes.Personnes;
        console.log('Personnes:', this.Personnes);
      },
      (error) => {
        console.error('Error fetching personnes:', error);
      }
    );
  }
  delete(id: any, i: any) {
    if (confirm('delete personnes ')) {
      this.personneService.deletePersonne(id).subscribe((person) => {
        this.Personnes.splice(i, 1);
      });
    }
  }
}

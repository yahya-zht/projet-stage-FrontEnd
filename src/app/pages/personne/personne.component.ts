import { Component, OnInit } from '@angular/core';
import { Personne } from 'src/app/Models/Personne';
import { PersonneService } from 'src/app/services/personne/personne.service';

@Component({
  selector: 'app-personne',
  templateUrl: './personne.component.html',
  styleUrls: ['./personne.component.css'],
})
export class PersonneComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Service } from 'src/app/Models/Service';
import { ServiceService } from 'src/app/services/service/service.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css'],
})
export class ShowComponent implements OnInit {
  getId: any;
  service: Service | any;
  NomService: string = '';
  etablissements = [''];
  constructor(
    private activatedRoute: ActivatedRoute,
    private serviceService: ServiceService
  ) {
    this.getId = this.activatedRoute.snapshot.paramMap.get('id');
    this.serviceService
      .getServiceById(this.getId)
      .subscribe((service: Service) => {
        console.log('Service ====>>>> ' + service.Service.nom);
        this.NomService = service.Service?.nom;
        this.etablissements = service.Service.etablissement?.nom;
      });
  }
  ngOnInit(): void {}
}

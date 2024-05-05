import { Component, OnInit } from '@angular/core';
// import { Chart } from 'chart.js';
import Chart from 'chart.js/auto';
import { AccueilService } from 'src/app/services/accueil/accueil.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-my-chart',
  templateUrl: './my-chart.component.html',
  styleUrls: ['./my-chart.component.css'],
})
export class MyChartComponent implements OnInit {
  constructor(
    private accueil: AccueilService,
    private authService: AuthService
  ) {}
  public chart: any;
  public Role = '';
  public Accueil = {
    AllAbsinMonth: [],
    AllCongesinMonth: [],
  };
  ngOnInit(): void {
    this.Role = this.authService.getUserRole();
    if (this.Role == 'Employé' || this.Role == 'Superviseur') {
      this.accueil.getAccueilEmployee().subscribe(
        (response) => {
          this.Accueil.AllAbsinMonth = response.AllAbsinMonth;
          this.Accueil.AllCongesinMonth = response.AllCongesinMonth;
          this.createChart();
        },
        (error) => {
          console.error(error);
        }
      );
    } else if (this.Role === 'Directeur' || this.Role === 'Admin') {
      this.accueil.getAccueilDirecteur().subscribe(
        (response) => {
          this.Accueil.AllAbsinMonth = response.absence_cette_année;
          this.Accueil.AllCongesinMonth = response.conges_cette_année;
          this.createChart();
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
  createChart() {
    this.chart = new Chart('MyChart', {
      type: 'bar',
      data: {
        labels: [
          'Janvier',
          'Février',
          'Mars',
          'Avril',
          'Mai',
          'Juin',
          'Juillet',
          'Août',
          'Septembre',
          'Octobre',
          'Novembre',
          'Décembre',
        ],
        datasets: [
          {
            label: "Nb d'employés Congés",
            data: this.Accueil.AllCongesinMonth,
            backgroundColor: 'limegreen',
          },
          {
            label: "Nb d'employés Absence",
            data: this.Accueil.AllAbsinMonth,
            backgroundColor: 'red',
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
      },
    });
  }
}

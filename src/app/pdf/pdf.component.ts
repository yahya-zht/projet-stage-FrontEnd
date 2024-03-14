import { Component, OnInit } from '@angular/core';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { PersonneService } from '../services/personne/personne.service';
import { Personne } from '../Models/Personne';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css'],
})
export class PdfComponent implements OnInit {
  id: any;
  Personne: any;
  PersonneService: any;
  constructor(
    private route: ActivatedRoute,
    private personneService: PersonneService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log('ID =>', this.id);
    if (this.id === null) {
      this.Personne = {
        CIN: '1834358',
        nom: 'KHAFFANE',
        prenom: 'Abdesadek',
        grade: { libelle: "Ingénieur d'état Grade Principal" },
        fonction: {
          libelle:
            'Direction Régionale de la Santé et de la Protection Sociale',
        },
      };
    } else {
      this.personneService
        .getPersonneById(this.id)
        .subscribe((personne: Personne) => {
          console.log('=>', personne.Personne['CIN']);
          this.Personne = personne.Personne;
          console.log('Personne:', this.Personne);
        });
    }
  }
  public convertToPDF() {
    const data = document.getElementById('contentToConvert');
    html2canvas(data as HTMLElement, { scale: 2 }).then((canvas) => {
      const imgWidth = 208;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const pdf = new jspdf.jsPDF('p', 'mm', 'a4');
      const position = 0;
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgHeight * pdfWidth) / imgWidth;
      pdf.addImage(
        canvas.toDataURL('image/png', 0.7),
        'PNG',
        0,
        position,
        pdfWidth,
        pdfHeight,
        '',
        'FAST'
      );
      pdf.setFontSize(10);
      pdf.save('new-file.pdf');
    });
  }
}

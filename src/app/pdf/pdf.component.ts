import { Component, OnInit } from '@angular/core';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { PersonneService } from '../services/personne/personne.service';
import { Personne } from '../Models/Personne';
import { DemandeConge } from '../Models/DemandeConge';
import { DemandeCongeService } from '../services/demande_conge/demande-conge.service';
import { Conge } from '../Models/Conge';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css'],
})
export class PdfComponent implements OnInit {
  id: any;
  DemandeConge: any;
  a = false;
  constructor(
    private route: ActivatedRoute,
    private demandeCongeService: DemandeCongeService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (window.location.pathname === `/pdf/${this.id}`) {
      this.a = true;
    }
    console.log('ID =>', this.id);
    if (this.id === null) {
      this.DemandeConge = {
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
      this.demandeCongeService
        .getDemandeCongeById(this.id)
        .subscribe((conge: any) => {
          console.log('=>', conge.DemandeConge.personne['CIN']);
          this.DemandeConge = conge.DemandeConge;
          const dateParts = this.DemandeConge.dateDemande.split('-');
          const year = dateParts[0];
          this.DemandeConge.year = year;
          console.log('DemandeConge:', this.DemandeConge);
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

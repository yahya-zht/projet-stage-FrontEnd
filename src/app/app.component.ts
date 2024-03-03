import { Component } from '@angular/core';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'projet-stage';
  public convertToPDF() {
    const data = document.getElementById('contentToConvert');
    html2canvas(data as HTMLElement, { scale: 2 }).then((canvas) => {
      // Adjust scale for higher DPI
      const imgWidth = 208;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      const pdf = new jspdf.jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
      const position = 0;

      // Adjust the PDF page size based on the image dimensions
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
      ); // Adjust image compression quality

      // Compress the PDF text content
      pdf.setFontSize(10); // Adjust font size to reduce PDF size

      // Save the PDF file
      pdf.save('new-file.pdf');
    });
  }
}

import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';

type AOA = Array<Array<any>>;

@Component({
  selector: 'app-tutor-load-file',
  templateUrl: './tutor-load-file.component.html',
  styleUrls: ['./tutor-load-file.component.css']
})
export class TutorLoadFileComponent implements OnInit {
  /*headers = [
    'matricula', 'nombre', 'nivel',
    'un_academica', 'carrera', 'programa',
    'campus', 'promedio', 'avance',
    'ult_periodo', 'email', 'tipo', 'kardex'];*/
    headers = ['worker_number', 'fullname', 'alt_email'];
  data: AOA;
  constructor() { }

  ngOnInit() {
  }

  onFileChange(evt: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) {
      // /throw new Error('Cannot use multiple files');
      return false;
    }
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = <AOA>(XLSX.utils.sheet_to_json(ws, { header: this.headers }));
      this.data.shift();
    };
    reader.readAsBinaryString(target.files[0]);
  }

}

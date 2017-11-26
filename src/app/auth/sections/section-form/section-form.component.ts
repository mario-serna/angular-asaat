import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MzToastService } from 'ng2-materialize';
import { SectionsService } from '../services/sections.service';

@Component({
  selector: 'app-section-form',
  templateUrl: './section-form.component.html',
  styleUrls: ['./section-form.component.css']
})
export class SectionFormComponent implements OnInit {
  @Input() sectionData?: any;
  section: any = <any>{};
  response: any = null;
  data = [
    {
      id: 0, name: 'Ing. Tecnologías de la Inf.', programs: [
        { name: 'ITI-2012', type: 'C' }, { name: 'ITI-2016', type: 'S' }
      ]
    },
    {
      id: 1, name: 'Ing. Ciencias de la Comp.', programs: [
        { name: 'ICC-2012', type: 'C' }, { name: 'ICC-2016', type: 'S' }
      ]
    },
    {
      id: 2, name: 'Lic. Ciencias de la Comp.', programs: [
        { name: 'LCC-2012', type: 'C' }, { name: 'LCC-2016', type: 'S' }
      ]
    }
  ];
  numbers = [101, 102, 103, 104, 105, 106];
  programs = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _sectionsService: SectionsService,
    private toast: MzToastService
  ) { }

  ngOnInit() {
    const url = this.router.url.split('/');
    this.section.tutor_id = +url[2];
    if (this.sectionData) {
      this.section = this.sectionData.section;
      const selectedCarrer = this.data.find(
        carrer => carrer.name === this.sectionData.section.carrer
      );
      this.section.carrer_id = selectedCarrer.id;
      const selectedProgram = selectedCarrer.programs.find(
        program => program.name === this.sectionData.section.program
      );
      this.programs = selectedCarrer.programs;
      this.section.program = `${selectedProgram.name}${selectedProgram.type}`;
      // this.tutor = this.sectionData.tutor;
    }
  }

  save(event: Event) {
    event.preventDefault();
    this.generateKey();
    this.router.navigate(['../'], { relativeTo: this.route });
    if (!this.sectionData) {
      this._sectionsService.createSection(this.section).subscribe(
        (data) => {
          console.log(data);
          this.section = data;
          this.toast.show(`La sección ${data.key} ha sido creada!`, 4000, 'green');
          // this.router.navigate(['sections'], {relativeTo: this.route});
        }, err => {
          this.toast.show(`Ha ocurrido un problema al crear la sección ${this.section.key}`, 4000, 'red');
          // this.response = JSON.parse(err._body);
          console.log(this.response);
        });
    } else {
      this._sectionsService.updateSection(this.section).subscribe(
        (data) => {
          this.section = data;
          this.toast.show(`Se han guardado los cambios!`, 4000, 'green');
        }, err => {
          this.toast.show(`Ha ocurrido un error al realizar los cambios!`, 4000, 'red');
          this.response = err;
          // this.response = JSON.parse(err._body);
          console.log(this.response);
        });
    }
  }

  generateKey() {
    // Example: ITI-2012, returns ITI
    const program: string = this.section.program.slice(0, 3);
    // Example: ITI-2012C, returns C
    const type: string = this.section.program.slice(-1);
    // Example: ITI-2012C, returns ITI-2012
    this.section.program = this.section.program.slice(0, -1);
    this.section.key = `${program}${this.section.generation}${type}${this.section.number}`;
    console.log(this.section);
  }

  setPrograms(id) {
    this.section.program = null;
    this.section.carrer = this.data[id].name;
    this.programs = this.data[id].programs;
  }
}

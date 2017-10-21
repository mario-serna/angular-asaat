import { Component } from '@angular/core';
import { MzToastService } from 'ng2-materialize';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private toastService: MzToastService) {
  }

  showToast() {
    this.toastService.show('Materialize works!', 4000, 'green');
  }
}

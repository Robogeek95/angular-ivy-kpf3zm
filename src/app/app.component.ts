import { Component, VERSION } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfigService } from './config/config.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  ndaForm: FormGroup;
  submitted = false;
  signUrl: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private config: ConfigService
  ) {}

  ngOnInit() {
    this.ndaForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
    });
  }

  onSubmit() {
    const formData = this.ndaForm.value;

    this.config
      .requestSign({ name: formData.name, email: formData.email })
      .subscribe((data) => {
        console.log(data);
        this.signUrl = data;
      });
  }
}

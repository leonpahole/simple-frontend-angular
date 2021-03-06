import { Component, OnInit } from '@angular/core';
import { KittensService } from './kittens.service';
import { ActivatedRoute } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  kittens: any[] = null;
  addKittenForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private kittensService: KittensService,
    private route: ActivatedRoute
  ) {
    this.addKittenForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.fetchKittens(params.apiUrl);
    });
  }

  fetchKittens(apiUrl: string = null): void {
    this.kittensService.getKittens(apiUrl).subscribe(
      (data) => {
        this.kittens = data.kittens;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  submitAddKittenForm() {
    if (!this.addKittenForm.valid) {
      return;
    }

    const kittenData = this.addKittenForm.value;

    this.kittensService.createKitten(kittenData.name, kittenData.age).subscribe(
      (data) => {
        this.fetchKittens();
        this.addKittenForm.reset();
      },
      (err) => {
        console.log(err);
      }
    );
  }
}

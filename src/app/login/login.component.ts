import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Login } from '../models/models';
import { NavigationService } from '../services/navigation.service';
import { UtilityServiceService } from '../services/utility-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  message = '';
  
  constructor(private fb: FormBuilder, private navigationService: NavigationService,
    private utility:UtilityServiceService){}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      pwd: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]]
    });
  }

  login(){
    let user: Login = {
      nameUser: this.UserName.value,
      password: this.PWD.value
    }

    this.navigationService.loginUser(user).subscribe((data:any) => {
      this.message = 'Listo'
      this.utility.setUser(data.data.token);
      console.log(this.utility.GetUserLogin());
    }, (error:any) => {
      this.message = 'Credenciales invalidas'
    });
  }

  get UserName(): FormControl {
    return this.loginForm.get('username') as FormControl;
  }
  get PWD(): FormControl {
    return this.loginForm.get('pwd') as FormControl;
  }
}

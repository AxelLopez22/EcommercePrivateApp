import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Usuarios } from '../models/models';
import { NavigationService } from '../services/navigation.service';
import { UtilityServiceService } from '../services/utility-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  invalidRPWD: boolean = false;
  message = '';
  constructor(private fb: FormBuilder, private navigationService: NavigationService, private utility:UtilityServiceService){}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['',[
        Validators.required,
        Validators.minLength(2),
        Validators.pattern('[a-zA-Z].*')
      ]],
      phonenumber:['',[
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(8)
      ]],
      email: ['', [Validators.required, Validators.email]],
      pwd: ['',[
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(15)
      ]],
      rpwd: ['']
    });
  }


  register(){
    let user: Usuarios = {
      nameUser: this.UserName.value,
      phoneNumber: this.PhoneNumber.value,
      email: this.Email.value,
      password: this.PWD.value
    }

    this.navigationService.registerUser(user).subscribe((data:any) => {
      this.message = 'Registro completado';
      this.utility.setUser(data.data.token);
    }, (error:any) => {
      this.message = 'Ocurrio un error';
    });
  }

  //#Region Getters
  get UserName(): FormControl {
    return this.registerForm.get('username') as FormControl;
  }
  get PhoneNumber():FormControl {
    return this.registerForm.get('phonenumber') as FormControl;
  }
  get Email(): FormControl {
    return this.registerForm.get('email') as FormControl;
  }
  get PWD(): FormControl {
    return this.registerForm.get('pwd') as FormControl;
  }
  get RPWD(): FormControl {
    return this.registerForm.get('rpwd') as FormControl
  }
  //#End Region Getters
}

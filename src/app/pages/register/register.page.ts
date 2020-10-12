import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  userForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]]
    });
  }

  register() {
    console.log(`Usuário com os seguintes dados foi cadastrado com sucesso!
      Nome: ${this.userForm.get('name').value}
      E-mail: ${this.userForm.get('email').value}
      Senha: ${this.userForm.get('password').value}
      Confirmação de senha: ${this.userForm.get('confirmPassword').value}`);
  }
}

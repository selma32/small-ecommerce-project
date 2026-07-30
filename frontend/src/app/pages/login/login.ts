import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private _authService = inject(AuthService)
  private router = inject(Router)

  logIn = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required])
  })

  submitForm(){
    console.log('clicked', this.logIn.valid, this.logIn.value);
    if(this.logIn.valid){
      this._authService.logIn(this.logIn.value).subscribe({
        next:(res:any) =>{
          console.log(res);
          localStorage.setItem("token",res.token)
          this.router.navigate(['/'])
        },error:(res)=>{
          console.log(res);
        }
      })
    }
  }

}

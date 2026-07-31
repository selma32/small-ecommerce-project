import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Toast } from '../../components/toast/toast';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,Toast],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private _authService = inject(AuthService)
  private _toastService = inject(ToastService)
  private router = inject(Router)

  errorMessage = signal<string | null>(null);

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
          this._toastService.show("logged in successfully",'success',1000)
          this.router.navigate(['/'])
        },error:(err)=>{
          this.errorMessage.set(err.error?.message || 'Something went wrong, please try again');
        }
      })
    }
  }

}

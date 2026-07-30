import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private _authService = inject(AuthService)
  private router = inject(Router)

  register = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    age: new FormControl('', [Validators.max(70), Validators.min(16)]),
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required])
  })

  submitForm(){
    if(this.register.valid){
      this._authService.register(this.register.value).subscribe({
        next:(res) =>{
          console.log(res);
          this.router.navigate(['/login'])
        },error:(res)=>{
          console.log(res);
        }
      })
    }
  }
}

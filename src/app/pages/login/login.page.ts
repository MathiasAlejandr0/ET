import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string = '';
  password: string = '';
  email: string = '';
  newUsername: string = '';
  newPassword: string = '';
  isCreatingAccount: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    // Inicialización opcional
  }

  async onLogin() {
    const success = await this.authService.login(this.username, this.password);
    
    if (success) {
      this.router.navigate(['/dashboard']);
    } else {
      const toast = await this.toastController.create({
        message: 'Credenciales incorrectas',
        duration: 2000,
        color: 'danger'
      });
      toast.present();
    }
  }

  showCreateAccount() {
    this.isCreatingAccount = true;
  }

  cancelCreateAccount() {
    this.isCreatingAccount = false;
  }

  async onCreateAccountConfirm() {
    const success = await this.authService.register(this.email, this.newUsername, this.newPassword);
    
    if (success) {
      const toast = await this.toastController.create({
        message: 'Cuenta creada exitosamente',
        duration: 2000,
        color: 'success'
      });
      toast.present();
      this.isCreatingAccount = false;
    } else {
      const toast = await this.toastController.create({
        message: 'Error al crear la cuenta',
        duration: 2000,
        color: 'danger'
      });
      toast.present();
    }
  }

  onRecoverAccount() {
    this.router.navigate(['/recover-account']);
  }
}

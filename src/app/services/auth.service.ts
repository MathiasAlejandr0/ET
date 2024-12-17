import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Preferences } from '@capacitor/preferences';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  public currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();

  constructor() {
    this.loadUserFromStorage();
  }

  async login(username: string, password: string): Promise<boolean> {
    try {
      // Simular verificación de usuario (reemplazar con tu lógica real)
      const { value } = await Preferences.get({ key: 'user' });
      
      if (value) {
        const storedUser: User = JSON.parse(value);
        
        if (storedUser.username === username && storedUser.password === password) {
          this.currentUserSubject.next(storedUser);
          return true;
        }
      }
      
      return false;
    } catch (error) {
      console.error('Login error', error);
      return false;
    }
  }

  // Método para verificar si el usuario está logueado
  isLoggedIn(): Observable<boolean> {
    return this.currentUser$.pipe(
      map(user => !!user)
    );
  }

  async logout(): Promise<void> {
    await Preferences.remove({ key: 'user' });
    this.currentUserSubject.next(null);
  }

  private async loadUserFromStorage(): Promise<void> {
    try {
      const { value } = await Preferences.get({ key: 'user' });
      
      if (value) {
        const storedUser: User = JSON.parse(value);
        this.currentUserSubject.next(storedUser);
      }
    } catch (error) {
      console.error('Error loading user from storage', error);
    }
  }

  // Agregar el método register
  async register(email: string, username: string, password: string): Promise<boolean> {
    try {
      // Simular el registro de usuario (reemplazar con tu lógica real)
      const newUser: User = { email, username, password };
      await Preferences.set({
        key: 'user',
        value: JSON.stringify(newUser)
      });
      this.currentUserSubject.next(newUser);
      return true;
    } catch (error) {
      console.error('Registration error', error);
      return false;
    }
  }
}

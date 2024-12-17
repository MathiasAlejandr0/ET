import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { fadeInOut, slideInOut, scaleInOut } from '../../animations';
import { Router } from '@angular/router'; 
import { Loader } from '@googlemaps/js-api-loader';

@Component({
  selector: 'app-professional-map',
  template: `
    <div class="professional-map-container">
      <div #mapContainer class="map-container"></div>
      
      <div class="service-selector">
        <label for="service">Seleccione un servicio:</label>
        <select id="service" (change)="onServiceChange($event)">
          <option *ngFor="let service of services" [value]="service">{{ service }}</option>
        </select>
      </div>

      <div class="professionals-container" *ngIf="!selectedProfessional">
        <div *ngFor="let professional of filteredProfessionals" 
             class="professional-card" 
             [@fadeInOut]="'active'"
             (click)="selectProfessional(professional)">
          <!-- Contenido de la tarjeta de profesional -->
          <h3>{{ professional.name }}</h3>
          <p>Especialista en {{ professional.specialty }}</p>
          <i class="material-icons">person</i>
        </div>
      </div>

      <div *ngIf="selectedProfessional" class="professional-details" [@slideInOut]>
        <h2>{{ selectedProfessional.name }}</h2>
        <p>Especialidad: {{ selectedProfessional.specialty }}</p>
        <button class="btn request-service" (click)="requestService()">Solicitar Servicio</button>
        <button class="btn back" (click)="deselectProfessional()">Volver</button>
      </div>
    </div>
  `,
  styles: [`
    .professional-map-container { 
      width: 100%; 
      height: 100%; 
      display: flex; 
      flex-direction: column; 
      align-items: center;
    }
    .map-container { 
      width: 100%; 
      height: 400px; 
    }
    .service-selector { 
      margin: 20px; 
    }
    .professionals-container { 
      width: 100%; 
      display: flex; 
      justify-content: center; 
      flex-wrap: wrap; 
      margin-top: 20px; 
    }
    .professional-card { 
      width: 200px; 
      height: 150px; 
      margin: 10px; 
      background: #fff; 
      box-shadow: 0 2px 5px rgba(0,0,0,0.3); 
      border-radius: 10px; 
      text-align: center; 
      padding: 10px;
      cursor: pointer;
    }
    .professional-details {
      width: 300px;
      padding: 20px;
      margin-top: 20px;
      background: #fff;
      box-shadow: 0 2px 5px rgba(0,0,0,0.3);
      border-radius: 10px;
      text-align: center;
    }
    .btn {
      display: inline-block;
      margin: 10px;
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      background-color: #007bff;
      color: white;
      font-size: 16px;
      cursor: pointer;
      transition: background-color 0.3s;
    }
    .btn:hover {
      background-color: #0056b3;
    }
    .btn.request-service {
      background-color: #28a745;
    }
    .btn.request-service:hover {
      background-color: #218838;
    }
    .btn.back {
      background-color: #dc3545;
    }
    .btn.back:hover {
      background-color: #c82333;
    }
  `],
  animations: [fadeInOut, slideInOut, scaleInOut]
})
export class ProfessionalMapPage implements OnInit {
  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;
  
  private map!: google.maps.Map;
  private markers: any[] = [];
  selectedProfessional: any = null;
  services: string[] = ['Electricidad', 'Plomería', 'Construcción'];
  selectedService: string = this.services[0];
  nearbyProfessionals = [
    { latitude: -41.4717, longitude: -72.9365, name: 'Professional 1', specialty: 'Electricidad' },
    { latitude: -41.4718, longitude: -72.9367, name: 'Professional 2', specialty: 'Plomería' },
    { latitude: -41.4719, longitude: -72.9368, name: 'Professional 3', specialty: 'Construcción' }
  ];
  filteredProfessionals: any[] = [];

  constructor(private router: Router) {}

  async ngOnInit() {
    await this.loadGoogleMaps();
    this.onServiceChange({ target: { value: this.selectedService } }); // Iniciar con la especialidad seleccionada
  }

  async loadGoogleMaps() {
    const loader = new Loader({
      apiKey: 'AIzaSyDr_UoMLcbtb4h3p6VL9I3PvHLvwsgw77A',
      version: 'weekly',
      libraries: ['places']
    });

    await loader.load();
    this.initMap();
  }

  initMap() {
    const centerCoords = { 
      lat: -41.4717, 
      lng: -72.9365 
    };

    this.map = new google.maps.Map(this.mapContainer.nativeElement, {
      center: centerCoords,
      zoom: 13,
      styles: [
        {
          featureType: 'landscape',
          stylers: [{ color: '#f4f4f4' }]
        },
        {
          featureType: 'road',
          stylers: [{ color: '#e9e9e9' }]
        }
      ]
    });

    this.updateMarkers();
  }

  updateMarkers() {
    // Limpia los marcadores anteriores
    this.markers.forEach(marker => marker.setMap(null));
    this.markers = [];

    // Agrega nuevos marcadores según la especialidad seleccionada
    this.filteredProfessionals.forEach(professional => {
      const marker = new google.maps.marker.AdvancedMarkerElement({
        position: { 
          lat: professional.latitude, 
          lng: professional.longitude 
        },
        map: this.map,
        title: professional.name
      });

      this.markers.push(marker);
    });
  }

  onServiceChange(event: any) {
    this.selectedService = event.target.value;
    this.filteredProfessionals = this.nearbyProfessionals.filter(pro => pro.specialty === this.selectedService);
    this.updateMarkers();
  }

  selectProfessional(professional: any) {
    this.selectedProfessional = professional;
  }

  deselectProfessional() {
    this.selectedProfessional = null;
  }

  requestService() {
    alert('El profesional se pondrá en contacto contigo para agendar la visita.');
    this.router.navigate(['/dashboard']); // Redirigir al dashboard
  }
}

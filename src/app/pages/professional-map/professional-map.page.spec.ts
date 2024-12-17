import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ProfessionalMapPage } from './professional-map.page';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Importa este módulo
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';

describe('ProfessionalMapPage', () => {
  let component: ProfessionalMapPage;
  let fixture: ComponentFixture<ProfessionalMapPage>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfessionalMapPage ],
      imports: [ BrowserAnimationsModule ], // Añade este módulo
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessionalMapPage);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have a map container', () => {
    const mapContainer = fixture.debugElement.query(By.css('.map-container'));
    expect(mapContainer).not.toBeNull();
  });

  it('should display professionals cards for selected service', () => {
    // Selecciona un servicio para asegurarse de que se filtran los profesionales
    component.selectedService = 'Electricidad';
    component.filteredProfessionals = component.nearbyProfessionals.filter(pro => pro.specialty === component.selectedService);
    fixture.detectChanges();

    const professionalCards = fixture.debugElement.queryAll(By.css('.professional-card'));
    expect(professionalCards.length).toBe(component.filteredProfessionals.length);
  });

  it('should select a professional on card click', () => {
    const professionalCard = fixture.debugElement.query(By.css('.professional-card'));
    professionalCard.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.selectedProfessional).toBe(component.filteredProfessionals[0]);
  });

  it('should navigate to dashboard on service request', () => {
    component.selectedProfessional = component.filteredProfessionals[0];
    fixture.detectChanges();
    const requestServiceButton = fixture.debugElement.query(By.css('.request-service'));
    requestServiceButton.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
  });
});

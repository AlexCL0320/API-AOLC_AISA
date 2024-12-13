import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComidaEditComponent } from './comidas-edit.component';

describe('ComidaEditComponent', () => {
  let component: ComidaEditComponent;
  let fixture: ComponentFixture<ComidaEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComidaEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComidaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

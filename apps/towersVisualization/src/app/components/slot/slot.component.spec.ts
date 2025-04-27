import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SlotComponent } from './slot.component';
import { Slot } from '../../simulation/slot';
import { GrowthTray } from '../../simulation/growth-tray';
import { GrowthJob } from '../../simulation/growth-job';
import { By } from '@angular/platform-browser';

describe('SlotComponent', () => {
  let component: SlotComponent;
  let fixture: ComponentFixture<SlotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlotComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SlotComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the slot number', () => {
    component.slot = new Slot(1, null);
    fixture.detectChanges();

    const slotNumberElement = fixture.debugElement.query(By.css('h3')).nativeElement;
    expect(slotNumberElement.textContent).toContain('Slot 1');
  });

  it('should display "No growth tray assigned to this slot" if no growth tray is present', () => {
    component.slot = new Slot(1, null);
    fixture.detectChanges();

    const noGrowthTrayMessage = fixture.debugElement.query(By.css('p')).nativeElement;
    expect(noGrowthTrayMessage.textContent).toBe('No growth tray assigned to this slot.');
  });

  it('should display the growth tray identifier if a growth tray is present', () => {
    component.slot = new Slot(1, new GrowthTray('GT A1', null));
    fixture.detectChanges();

    const growthTrayElement = fixture.debugElement.query(By.css('h4')).nativeElement;
    expect(growthTrayElement.textContent).toContain('Growth Tray: GT A1');
  });

  it('should display "No growth job assigned to this growth tray" if no growth job is present', () => {
    component.slot = new Slot(1, new GrowthTray('GT A1', null));
    fixture.detectChanges();

    const noGrowthJobMessage = fixture.debugElement.query(By.css('p')).nativeElement;
    expect(noGrowthJobMessage.textContent).toBe('No growth job assigned to this growth tray.');
  });

  it('should display the growth job name and progress if a growth job is present', () => {
    component.slot = new Slot(
      1,
      new GrowthTray('GT A1', new GrowthJob('Tomato', 70))
    );
    fixture.detectChanges();

    const growthJobNameElement = fixture.debugElement.query(By.css('p')).nativeElement;
    expect(growthJobNameElement.textContent).toContain('Growth Job: Tomato');

    const progressElement = fixture.debugElement.query(By.css('progress')).nativeElement;
    expect(progressElement.value).toBe(70);
    expect(progressElement.max).toBe(100);
  });
});
import { TestBed } from '@angular/core/testing';
import { TowerComponent } from './tower.component';
import { TowerService } from '../../simulation/tower.service';
import { BehaviorSubject, of } from 'rxjs';
import { TowersFacade } from '../../+state/towers.facade';

describe('TowerComponent', () => {
  let component: TowerComponent;
  let mockFacade: jest.Mocked<TowersFacade>;
  let mockTowerService: jest.Mocked<TowerService>;
  let loading$ = new BehaviorSubject<boolean>(false);
  let error$ = new BehaviorSubject<string | null>(null);

  beforeEach(async () => {
    loading$ = new BehaviorSubject<boolean>(false);
    error$ = new BehaviorSubject<string | null>(null);

    mockFacade = {
      fetchTowers: jest.fn(),
      selectTower: jest.fn(),
      towers$: of([
        { number: 1, slots: [] },
        { number: 2, slots: [] },
      ]),
      selectedTower$: of({ number: 1, slots: [] }),
      error$: error$.asObservable(),
      loading$: loading$.asObservable(),
    } as unknown as jest.Mocked<TowersFacade>;
    
    mockTowerService = {
      towerData$: of([]),
    } as unknown as jest.Mocked<TowerService>;

    await TestBed.configureTestingModule({
      imports: [TowerComponent],
      providers: [
        { provide: TowersFacade, useValue: mockFacade },
        { provide: TowerService, useValue: mockTowerService },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(TowerComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call fetchTowers on initialization', () => {
    const fetchTowersSpy = jest.spyOn(component, 'fetchTowers');

    component.ngOnInit();

    expect(fetchTowersSpy).toHaveBeenCalled();
    expect(mockFacade.fetchTowers).toHaveBeenCalled();
  });

  it('should call selectTower on the facade when onSelectTower is called', () => {
    const towerNumber = 2;

    component.onSelectTower(towerNumber);

    expect(mockFacade.selectTower).toHaveBeenCalledWith(towerNumber);
  });

  it('should display towers in the template', () => {
    const fixture = TestBed.createComponent(TowerComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const towerOptions = compiled.querySelectorAll('option');

    expect(towerOptions.length).toBe(2);
    expect(towerOptions[0].textContent).toContain('Tower 1');
    expect(towerOptions[1].textContent).toContain('Tower 2');
  });

  it('should display the selected tower in the template', () => {
    const fixture = TestBed.createComponent(TowerComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const towerHeading = compiled.querySelector('h2');

    expect(towerHeading?.textContent).toContain('Tower 1');
  });

  it('should display a loading message when loading$ is true', () => {
    const fixture = TestBed.createComponent(TowerComponent);
    loading$.next(true);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const loadingMessage = compiled.querySelector('.loading-message');

    expect(loadingMessage).toBeTruthy();
    expect(loadingMessage?.textContent).toContain(
      'Loading data, please wait...'
    );
  });

  it('should display an error message when error$ emits a value', () => {
    const fixture = TestBed.createComponent(TowerComponent);

    loading$.next(false);
    error$.next('An error occurred');

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const errorMessage = compiled.querySelector('.error-message');

    expect(errorMessage).toBeTruthy();
    expect(errorMessage?.textContent).toContain(
      'There was an error while trying to get data from the towers.'
    );
  });
});

import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { normalGuard } from './normal.guard'; // Import your guard here
import { LoginService } from './login.service';

describe('normalGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => normalGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule], // Import RouterTestingModule for routing dependencies
      providers: [
        LoginService, // Provide any dependencies of your guard
        // Any other services the guard depends on
      ]
    });
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});

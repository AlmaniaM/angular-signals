import {
  ChangeDetectionStrategy,
  Component,
  INJECTOR,
  Inject,
  Injector,
  computed,
  effect,
  signal,
  untracked,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { NgxEchartsDirective } from 'ngx-echarts';
import { BaseChartComponent } from '../base-chart.component';
import { createLineChartOptions } from '../../../chart-options/line-chart';
import {
  AbstractControl,
  FormControl,
  FormGroupDirective,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ErrorStateMatcher } from '@angular/material/core';
import { Subject } from 'rxjs';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

const isNumberValidator: ValidatorFn = (control: AbstractControl) => {
  try {
    return !isNaN(Number(control.value)) ? null : { number: true };
  } catch (error) {
    return { number: true };
  }
};

@Component({
  selector: 'line-chart',
  standalone: true,
  imports: [
    NgxEchartsDirective,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatCheckboxModule,
  ],
  template: `
    <div class="chart-container">
      <div echarts [options]="options()" [theme]="'dark'" class="chart"></div>
      <div class="form-container">
        <section class="form-section">
          <!-- Ignore all errors -->
          <mat-checkbox color="primary" [(ngModel)]="ignoreAllErrors">
            Ignore All Errors
          </mat-checkbox>

          <mat-form-field>
            <input matInput type="text" [formControl]="form" />

            @if (numberError()) {
            <mat-error>The value must be a <strong>number</strong></mat-error>
            } @if (maxError()) {
            <mat-error
              >A number less than or equal to <strong>100</strong></mat-error
            >
            } @if (minError()) {
            <mat-error
              >A number greater than or equal to <strong>1</strong></mat-error
            >
            } @if (requiredError()) {
            <mat-error>A number is <strong>required</strong></mat-error>
            }
          </mat-form-field>
        </section>

        <section class="form-section">
          @if (!isValid()) {
          <button
            mat-flat-button
            color="secondary"
            disabled
            style="width: 15rem;"
          >
            Enter Number
          </button>
          } @else {
          <button
            mat-flat-button
            color="primary"
            (click)="randomizeChartOptions()"
            style="width: 15rem;"
          >
            Change Chart Data
          </button>
          }

          <button mat-flat-button color="primary" (click)="emitRandomValue()">
            Emit Random Number
          </button>
        </section>
      </div>
    </div>
  `,
  styleUrls: ['../_base-chart.component.scss', './line-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LineChartComponent extends BaseChartComponent {
  currentValue = signal<number | string | null>(1);
  ignoreAllErrorValidation = signal(false);
  logLevel = 'none';

  /**
   * Computed signals are only evaluated once they're actually called (lazy-eval).
   *
   * Any computed value is cached (memoized) and returned on subsequent calls. Once any of the triggering signals update, the cache value is
   * then invalidated and a new value is recomputed.
   *
   * Because of memoization, it's safe to perform more expensive computations. Depending on the amount of updates of course.
   *
   * Only signals that are actually read during an evaluation inside the computed callback will trigger another computation. If a signal was not read then it
   * won't trigger a re-computation.
   */
  numberError = computed(() => {
    this._log('\n', undefined, 'errors');
    this._log('Validating number type...', undefined, 'errors');

    if (this.ignoreAllErrorValidation()) {
      return false;
    }

    if (this._emptyThing === 'empty-thing') {
      this._log(
        `This random number won't happen, ever ever ever...`,
        this._randomValue(),
        'errors'
      );
    }

    try {
      // This signal will not trigger this computed signal after the above ignoreAllErrorValidation becomes false.
      // That's because this below branch of code is not executed and the currentValue signal is not registered to be tracked.
      return isNaN(Number(this.currentValue()));
    } catch (error) {
      return true;
    }
  });

  loggingNumberError = computed(() =>
    this._log('\nLogging number error:', this.numberError(), 'errors')
  );

  maxError = computed(() => {
    this._log('\n', undefined, 'errors');
    this._log('Validating max number...', undefined, 'errors');

    if (this.ignoreAllErrorValidation()) {
      return false;
    }

    if (this.requiredError()) {
      // Ignore if there's no currentValue
      return false;
    }

    try {
      const value = Number(this.currentValue());
      return value > 100;
    } catch (error) {
      return false;
    }
  });

  minError = computed(() => {
    this._log('\n', undefined, 'errors');
    this._log('Validating min number...', undefined, 'errors');

    if (this.ignoreAllErrorValidation()) {
      return false;
    }

    if (this.requiredError()) {
      // Ignore if there's no currentValue
      return false;
    }

    try {
      const value = Number(this.currentValue());
      return value < 1;
    } catch (error) {
      return false;
    }
  });

  requiredError = computed(() => {
    this._log('\n', undefined, 'errors');
    this._log('Validating required value...', undefined, 'errors');

    if (this.ignoreAllErrorValidation()) {
      return false;
    }

    return this.currentValue() === null || this.currentValue() === '';
  });

  isValid = computed(() => {
    this._log('\n', undefined, 'errors');
    this._log('Validating all...', undefined, 'errors');

    if (this.ignoreAllErrorValidation()) {
      return true;
    }

    // Will update any time ANY of the below signals change.
    return (
      !this.numberError() &&
      !this.maxError() &&
      !this.minError() &&
      !this.requiredError()
    );
  });

  get modValue(): string | number | null {
    return this.currentValue();
  }
  set modValue(value: string | number | null) {
    this.currentValue.set(value);
  }

  get ignoreAllErrors(): boolean {
    return this.ignoreAllErrorValidation();
  }
  set ignoreAllErrors(value: boolean) {
    this.ignoreAllErrorValidation.set(value);
  }

  private _randomValue = signal(this.getRandomNumber(1000));
  private _randomValueSubject = new Subject<number>();
  private _emptyThing = 'empty-thing';
  readonly form = new FormControl(this.currentValue(), [
    Validators.required,
    Validators.max(100),
    Validators.min(1),
    isNumberValidator,
  ]);
  private readonly _initialData: number[];

  constructor(@Inject(INJECTOR) private _injector: Injector) {
    super();

    this.loggingNumberError();

    /**
     * Basically same rules as a computed signal. The callback will execute any time any of the read signal values change.
     * The execution will happen asynchronously during change detection as well.
     *
     * NOTE: effects can only be created where you have an injection context (access to inject()). This can be don in the constructor, class-level area, or inside
     * injection token factory functions. You can also provide an injector for creating outside of these areas.
     *
     * This effect will automatically be destroyed (cleaned up) when this component is destroyed.
     *
     * FROM ANGULAR DOCS:
     *
     * When not to use effects
     *
     * Avoid using effects for propagation of state changes. This can result in ExpressionChangedAfterItHasBeenChecked errors, infinite circular updates, or unnecessary change detection cycles.
     * Because of these risks, Angular by default prevents you from setting signals in effects. It can be enabled if absolutely necessary by setting the allowSignalWrites flag when you create an effect.
     * Instead, use computed signals to model state that depends on other state.
     */
    const loggingEffectRef = effect(
      () => {
        this._log('\n', undefined, 'effect');

        // The untracked function will prevent this effect from re-executing if numberError() hasn't changed.
        this._log(
          'Logging effect output for numberError changes:',
          [this.numberError(), untracked(this.currentValue)],
          'effect'
        );
      },
      {
        injector: this._injector,
        manualCleanup: false, // Setting this to true will allow the effect to live on past the component lifespan. YOU must clean it up manually if you choose to do this.
        allowSignalWrites: false, // Setting this to true will allow you to update signals (signalValue.set(newValue)) inside the effect. Not recommended but possible if absolutely necessary.
      }
    );

    // You can also destroy the effect manually if you want.
    // loggingEffectRef.destroy();

    effect((onCleanup) => {
      // OPTIONAL: onCleanup callback to clean up resources inside callback when the effect is destroyed
      const numberError = this.numberError();

      const timer = setTimeout(() => {
        untracked(() => {
          // If _log reads any additional signals, they won't be tracked because of the above untracked wrapper.
          this._log('\n', undefined, 'effect');
          this._log(
            'Logging effect output for numberError changes:',
            numberError,
            'effect'
          );
        });
      }, 1000);

      // Will run when the effect is destroyed.
      onCleanup(() => {
        clearTimeout(timer);
      });
    });

    this.options = signal(createLineChartOptions());
    this._initialData = (this.options().series! as any[])[0].data;

    this.form.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe((valueChange) => this.currentValue.set(valueChange));

    this._randomValueSubject
      .pipe(takeUntilDestroyed())
      .subscribe((value) => this._randomValue.set(value));
  }

  emitRandomValue(): void {
    this._randomValueSubject.next(this.getRandomNumber(1000));
  }

  protected override randomizeChartOptions(): void {
    const value = this.currentValue();
    if (!this.isValid() || !value) {
      return;
    }
    const { series } = this.deepCopyOptions();
    (series as any[])[0].data = this._initialData.map((s, index) => {
      if (this.getRandomNumber(1000) > 500) {
        return index % 2 === 0 ? s * parseInt(value as string) : s;
      }

      return s * parseInt(value as string);
    });

    this.updateChartOptions((options) => ({
      ...options,
      series,
    }));
  }

  private _log(message: string, arg?: any, logLevel = 'all'): void {
    if (this.logLevel === 'all' || this.logLevel === logLevel) {
      if (arg !== undefined) {
        console.log(message, arg);
      } else {
        console.log(message);
      }
    }
  }
}

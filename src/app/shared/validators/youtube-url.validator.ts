import { AbstractControl, ValidationErrors } from '@angular/forms';

export function youtubeUrlValidator(control: AbstractControl): ValidationErrors | null {
  if (!control.value) return null;

  const regex = /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^\&\?\/]+)/;
  const match = control.value.match(regex);

  return match ? null : { youtubeInvalido: true };
}

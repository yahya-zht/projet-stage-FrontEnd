import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
const Material = [MatIconModule, MatFormFieldModule, MatInputModule];
@NgModule({
  declarations: [],
  imports: [Material],
  exports: [Material],
})
export class MaterialModule {}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { ApiService } from './services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { InputFormComponent } from './components/input-form/input-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HouseGridComponent } from './components/house-grid/house-grid.component';
import { SimulationService } from './services/simulation.service';
import { HouseContainerComponent } from './components/house-container/house-container.component';

@NgModule({
  declarations: [
    AppComponent,
    InputFormComponent,
    HouseGridComponent,
    HouseContainerComponent,
  ],
  imports: [BrowserModule, RouterModule, HttpClientModule, ReactiveFormsModule],
  providers: [ApiService, SimulationService],
  bootstrap: [AppComponent],
})
export class AppModule {}

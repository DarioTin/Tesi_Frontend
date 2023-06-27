import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AuthComponent} from './components/auth/auth.component';
import {TopbarComponent} from './components/topbar/topbar.component';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {HomeComponent} from './components/home/home.component';
import {AuthService} from "./services/auth/auth.service";
import {CommonModule} from "@angular/common";
import {CodeEditorComponent} from './components/codeeditor/code-editor.component';
import {
  RefactoringGameCoreRouteComponent
} from './routes/refactoring-game/refactoring-game-core/refactoring-game-core-route.component';
import {CodemirrorModule} from '@ctrl/ngx-codemirror';
import {
  RefactoringGameExListRouteComponent
} from './routes/refactoring-game/refactoring-game-exercise-list/refactoring-game-ex-list-route.component';
import {CheckGameExListRoute} from './routes/check-smell-game/check-smell-exercise-list/check-game-ex-list-route';
import {CheckGameCoreRouteComponent} from './routes/check-smell-game/check-game-core/check-game-core-route.component';
import {SolutionComponent} from './components/solution/solution.component';
import {LeaderboardRouteComponent} from './routes/leaderboard-route/leaderboard-route.component';
import {LoaderComponent} from './components/loader/loader.component';
import {SettingsRouteComponent} from './routes/settings-route/settings-route.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeRouteComponent } from './routes/home-route/home-route.component';
import {MatButtonModule} from "@angular/material/button";
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatExpansionModule} from "@angular/material/expansion";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    TopbarComponent,
    HomeComponent,
    CodeEditorComponent,
    RefactoringGameCoreRouteComponent,
    RefactoringGameExListRouteComponent,
    CheckGameExListRoute,
    CheckGameCoreRouteComponent,
    SolutionComponent,
    LeaderboardRouteComponent,
    LoaderComponent,
    SettingsRouteComponent,
    HomeRouteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    CodemirrorModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatListModule,
    MatIconModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }

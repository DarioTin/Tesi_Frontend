import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthComponent} from "./components/auth/auth.component";
import {
  RefactoringGameCoreRouteComponent
} from "./routes/refactoring-game/refactoring-game-core/refactoring-game-core-route.component";
import {
  RefactoringGameExListRouteComponent
} from './routes/refactoring-game/refactoring-game-exercise-list/refactoring-game-ex-list-route.component';
import {CheckGameExListRoute} from './routes/check-smell-game/check-smell-exercise-list/check-game-ex-list-route';
import {CheckGameCoreRouteComponent} from "./routes/check-smell-game/check-game-core/check-game-core-route.component";
import {LeaderboardRouteComponent} from "./routes/leaderboard-route/leaderboard-route.component";
import {SettingsRouteComponent} from "./routes/settings-route/settings-route.component";
import {HomeRouteComponent} from "./routes/home-route/home-route.component";


const appRoutes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: 'home', component: HomeRouteComponent },
  { path: 'refactor-game', component: RefactoringGameExListRouteComponent },
  { path: 'check-game', component: CheckGameExListRoute},
  { path: 'refactor-game/:exercise', component: RefactoringGameCoreRouteComponent},
  { path: 'check-game/:exercise', component: CheckGameCoreRouteComponent},
  { path: 'refactor-game/leaderboard/:exercise', component: LeaderboardRouteComponent},
  { path: 'settings', component: SettingsRouteComponent},
  { path: "**", redirectTo:  'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

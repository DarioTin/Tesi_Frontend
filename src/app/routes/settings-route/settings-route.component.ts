import {Component, NgZone, OnInit} from '@angular/core';
import {FormBuilder, NgForm} from "@angular/forms";
import {environment} from "../../../environments/environment.prod";
import {UserService} from "../../services/user/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-settings-route',
  templateUrl: './settings-route.component.html',
  styleUrls: ['./settings-route.component.css']
})
export class SettingsRouteComponent implements OnInit {

  environmentForm: any;
  isUserAuthenticated!: boolean;
  constructor(private fb: FormBuilder,
              private userService: UserService,
              private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.fillEnvironmentForm();
    this.isUserAuthenticated = this.userService.user.getValue() !== null;
  }

  fillEnvironmentForm() {
    this.environmentForm = this.fb.group({
      user_service: environment.userServiceUrl,
      compiler_service: environment.compilerServiceUrl,
      exercise_service: environment.exerciseServiceUrl,
      leaderboard_service: environment.leaderboardServiceUrl
    })

  }
  submitEnvironmentForm(environmentForm: any) {
    environment.userServiceUrl = environmentForm.value.user_service
    environment.compilerServiceUrl = environmentForm.value.compiler_service
    environment.leaderboardServiceUrl = environmentForm.value.leaderboard_service
    environment.exerciseServiceUrl = environmentForm.value.exercise_service

    this._snackBar.open("Settings saved", "Close", {
      duration: 3000
    });
  }

  submitCompileCheckboxes(checkboxForm: NgForm) {

    this._snackBar.open("Settings saved", "Close", {
        duration: 3000
    });
  }


}

import {Component, NgZone, OnInit} from '@angular/core';
import {ExerciseService} from 'src/app/services/exercise/exercise.service';
import {Router} from "@angular/router";
import {FormBuilder, NgForm} from "@angular/forms";
import {environment} from "../../../../environments/environment.prod";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {MatDividerModule} from "@angular/material/divider";
import {DatePipe} from "@angular/common";


@Component({
  selector: 'app-refactoring-game-exercise-list',
  templateUrl: './refactoring-game-ex-list-route.component.html',
  styleUrls: ['./refactoring-game-ex-list-route.component.css'],
  // @ts-ignore
})
export class RefactoringGameExListRouteComponent implements OnInit {

  constructor(private exerciseService: ExerciseService,
              private zone:NgZone,
              private _router: Router,
              private fb: FormBuilder,

  ) { }
  exercises = new Array<any>();
  enableGit = false
  serverProblems = false;
  gitForm: any;
  waitingForServer!: boolean;
  exerciseType !: number;

  ngOnInit(): void {

    this.exerciseType = Number(localStorage.getItem("exerciseRetrieval"));


    // GET EXERCISES LIST FROM CLOUD
    if (this.exerciseType == 2){
      this.waitingForServer = true;
      this.exerciseService.getExercises().subscribe(response =>{
        this.waitingForServer = false;
        this.exercises = response;
      }, error => {
        this.serverProblems = true;
        this.waitingForServer = false;
      });
      // GET EXERCISES LIST FROM GIT
    } else if (this.exerciseType == 1){
      this.waitingForServer = false;
      this.enableGetExercisesFromGit()
    }
  }


  private enableGetExercisesFromGit() {
    this.enableGit = true
    this.gitForm = this.fb.group({
      url:"https://github.com/DarioTin/Tesi-Exercises-Repository",
      branch:"exercises"
    })
  }

  prepareGetFilesFromRemote(form: NgForm){
    this.exercises = [];
    environment.repositoryUrl = form.value.url;
    environment.repositoryBranch = form.value.branch;
  }

}

import {Component, NgZone, OnInit} from '@angular/core';
import {ExerciseService} from 'src/app/services/exercise/exercise.service';
import {Router} from "@angular/router";
import {FormBuilder, NgForm} from "@angular/forms";
import {environment} from "../../../../environments/environment.prod";

@Component({
  selector: 'app-check-smell-game-exercise-list',
  templateUrl: './check-game-ex-list-route.component.html',
  styleUrls: ['./check-game-ex-list-route.component.css']
})
export class CheckGameExListRoute implements OnInit {

  constructor(private exerciseService: ExerciseService,
              private zone:NgZone,
              private _router: Router,
              private fb: FormBuilder

  ) { }
  exercises = new Array<any>();
  enableGit = false
  serverProblems = false;
  gitForm: any;
  waitingForServer!: boolean;
  exerciseType !: number;


  ngOnInit(): void {
    // @ts-ignore
    this.exerciseType = Number(localStorage.getItem("exerciseRetrieval"));


    // GET EXERCISES FROM CLOUD
    if (this.exerciseType == 2){
      this.waitingForServer = true;
      this.exerciseService.getExercises().subscribe(response =>{
        this.waitingForServer = false;
        this.exercises = response;
      }, error => {
        this.serverProblems = true;
        this.waitingForServer = false;
      });
      // GET EXERCISES FROM GIT
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
    environment.repositoryUrl = form.value.url;
    environment.repositoryBranch = form.value.branch;
  }

}

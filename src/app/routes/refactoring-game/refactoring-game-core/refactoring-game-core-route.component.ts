import {Component, NgZone, OnInit, ViewChild} from '@angular/core';
import {CodeeditorService} from "../../../services/codeeditor/codeeditor.service";
import {ExerciseService} from 'src/app/services/exercise/exercise.service';
import {ActivatedRoute} from '@angular/router';
import {Exercise} from "../../../model/exercise/refactor-exercise.model";
import {LeaderboardService} from "../../../services/leaderboard/leaderboard.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ProgressBarMode} from "@angular/material/progress-bar";

@Component({
  selector: 'app-refactoring-game-core',
  templateUrl: './refactoring-game-core-route.component.html',
  styleUrls: ['./refactoring-game-core-route.component.css']
})
export class RefactoringGameCoreRouteComponent implements OnInit {

  @ViewChild('code') code: any;
  @ViewChild('testing') testing: any;
  @ViewChild('output') output: any;

  compiledExercise !: Exercise;
  exerciseName = this.route.snapshot.params['exercise'];

  progressBarMode: ProgressBarMode = 'determinate'

  // RESULT
  userCode = "";
  testingCode = "";
  shellCode =  "";
  smells = "";

  refactoringResult = "";
  config : {'refactoring_limit':number,
    'smells_allowed': number
  } = {
    refactoring_limit: 0,
    smells_allowed: 0
  };
  smellNumber: number = 0

  // SMELL FORMATTING VARIABLES
  smellResult: string[] = [];
  smellList: string[] = [];
  methodList: string[] = []

  java = "text/x-java";

  originalProductionCode = ""
  originalTestCode = ""

  exerciseType !: number;
  compileType!: number;


  // MESSAGES
  exerciseSuccess: boolean = false;
  smellNumberWarning: boolean = false;
  refactoringWarning: boolean = false;
  constructor(private codeService: CodeeditorService,
              private exerciseService: ExerciseService,
              private route:ActivatedRoute,
              private zone:NgZone,
              private leaderboardService: LeaderboardService,
              private _snackBar: MatSnackBar) {}
  ngOnInit(): void {
    this.compileType = Number(localStorage.getItem("compileMode"));
    this.exerciseType = Number(localStorage.getItem("exerciseRetrieval"));


      // INIT CODE FROM CLOUD
      this.exerciseService.getMainClass(this.exerciseName).subscribe( data=> {
        this.userCode = data;
        this.originalProductionCode = data;
      });
      this.exerciseService.getTestClass(this.exerciseName).subscribe( data => {
        this.testingCode = data
        this.originalTestCode = data
      })
      this.exerciseService.getConfigFile(this.exerciseName).subscribe(data=>{
        // @ts-ignore
        data = data.refactoring_game_configuration
        const json = JSON.parse(JSON.stringify(data));
        console.log(json);
        this.config.refactoring_limit = json.refactoring_limit;
        this.config.smells_allowed = json.smells_allowed;
      })
    }

  compile() {
    this.resetData();
    this.startLoading()
    // @ts-ignore
    const exercise = new Exercise(this.exerciseName,this.originalProductionCode, this.originalTestCode, this.testing.injectedCode);
    this.compiledExercise = exercise;
      this.codeService.compile(exercise).subscribe(data =>{
        this.elaborateCompilerAnswer(data);
      }, error => {
        this.showPopUp("Cloud server has a problem");
        this.stopLoading()
      });
  }

  showPopUp(message: string){
    this._snackBar.open(message, "Close", {
      duration: 3000
    });
  }

  publishSolutionToLeaderboard(){
    this.startLoading()
    if(this.exerciseSuccess){
      this.leaderboardService.saveSolution(this.compiledExercise, this.smellNumber, Boolean(this.refactoringResult), this.smells).subscribe(result => {
        this.showPopUp("Solution saved");
        this.stopLoading()
      },error => {
        this.showPopUp("Server has a problem");
        this.stopLoading()
      });
    }else{
      this.showPopUp("To save your solution in leaderboard you have to complete the exercise");
      this.stopLoading()
    }
  }

  resetData(){
    this.shellCode = ""
    this.smells = ""
    this.refactoringResult = ""
    this.smellList = []
    this.smellResult = []
    this.smellNumber = 0
    this.refactoringResult = ""
  }

  startLoading(){
    this.progressBarMode = 'query'
  }

  stopLoading() {
    this.progressBarMode = 'determinate'
  }

  elaborateCompilerAnswer(data: any){
    this.shellCode = data.testResult
    this.smells = data.smellResult
    this.refactoringResult = data.similarityResponse
    this.exerciseSuccess = data.success
    this.stopLoading()
    if(this.exerciseSuccess){
      const json = JSON.parse(this.smells);
      this.smellList = Object.keys(json);
      this.smellResult = Object.values(json);
      for (let i=0;i<this.smellResult.length;i++){
        this.methodList.push(JSON.parse(JSON.stringify(this.smellResult[i])).methods)
        this.smellNumber+=this.methodList[i].length;
      }
      this.checkConfiguration();
    }
  }

  checkConfiguration(){
    console.log("ALLOWED : "  + this.config.smells_allowed)
    if(this.refactoringResult.toString() == 'false')
      this.refactoringWarning = true
    if(this.config.smells_allowed < this.smellNumber)
      this.smellNumberWarning = true;
  }
}

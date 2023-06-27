import {Component, NgZone, OnInit, ViewChild} from '@angular/core';
import {CodeeditorService} from "../../../services/codeeditor/codeeditor.service";
import {ExerciseService} from 'src/app/services/exercise/exercise.service';
import {ActivatedRoute} from '@angular/router';
import {Exercise} from "../../../model/exercise/refactor-exercise.model";
import {LeaderboardService} from "../../../services/leaderboard/leaderboard.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-refactoring-game-core',
  templateUrl: './refactoring-game-core-route.component.html',
  styleUrls: ['./refactoring-game-core-route.component.css']
})
export class RefactoringGameCoreRouteComponent implements OnInit {

  // TODO: AGGIUNGERE LOADER

  @ViewChild('code') code: any;
  @ViewChild('testing') testing: any;
  @ViewChild('output') output: any;

  compiledExercise !: Exercise;
  exerciseName = this.route.snapshot.params['exercise'];

  // RESULT
  userCode = "";
  testingCode = "";
  shellCode =  "";
  smells = "";
  refactoringResult = "";
  config !: string[];
  smellNumber: number = 0

  // SMELL FORMATTING VARIABLES
  smellResult: string[] = [];
  smellList: string[] = [];
  methodList: string[] = []

  java = "text/x-java";
  shell = "text/x-shell"

  originalProductionCode = ""
  originalTestCode = ""

  exerciseType !: number;
  compileType!: number;
  showCompiler: any;
  exerciseSuccess: boolean = false;
  alertMessage: boolean = false;

  constructor(private codeService: CodeeditorService,
              private exerciseService: ExerciseService,
              private route:ActivatedRoute,
              private zone:NgZone,
              private leaderboardService: LeaderboardService,
              private _snackBar: MatSnackBar)
  {



  }
  ngOnInit(): void {
    console.log("PRODUCTION CODE : " + this.route.snapshot.paramMap.get("productionCode"));
    this.compileType = Number(localStorage.getItem("compileMode"));
    this.exerciseType = Number(localStorage.getItem("exerciseRetrieval"));
    this.alertMessage = false;


    // INIT CODE FROM LOCAL
    if(this.exerciseType == 1){
    }else if(this.exerciseType == 2){
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
        this.config = data;
      })
    }
  }

  compile() {
    this.resetData();
    // @ts-ignore
    const exercise = new Exercise(this.exerciseName,this.originalProductionCode, this.originalTestCode, this.testing.injectedCode);
    this.compiledExercise = exercise;
    if(this.compileType == 1){
    } else if(this.compileType == 2){
      this.codeService.compile(exercise).subscribe(data =>{
        let jsonData = JSON.parse(JSON.stringify(data));
        this.shellCode = jsonData.testResult
        this.smells = jsonData.smellResult
        this.refactoringResult = jsonData.similarityResponse
        this.exerciseSuccess = jsonData.success

        console.log(jsonData)

        console.log(this.smells);
        const json = JSON.parse(this.smells);
        this.smellList = Object.keys(json);
        this.smellResult = Object.values(json);
        for (let i=0;i<this.smellResult.length;i++){
          this.methodList.push(JSON.parse(JSON.stringify(this.smellResult[i])).methods)
          this.smellNumber+=this.methodList[i].length;
        }
      }, error => {
        this.showPopUp("Cloud server has a problem");
      });
    }
  }

  showPopUp(message: string){
    this._snackBar.open(message, "Close", {
      duration: 3000
    });
  }

  publishSolutionToLeaderboard(){
    if(this.exerciseSuccess){
      this.leaderboardService.saveSolution(this.compiledExercise, this.smellNumber, Boolean(this.refactoringResult), this.smells).subscribe(result => {
        this.showPopUp("Solution saved");
      },error => {
        this.showPopUp("Server has a problem");
      });
    }else{
      this.showPopUp("To save your solution in leaderboard you have to complete the exercise");
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

}

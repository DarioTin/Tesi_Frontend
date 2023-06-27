import {Component, NgZone, OnInit, ViewChild} from '@angular/core';
import {CodeeditorService} from "../../../services/codeeditor/codeeditor.service";
import {ExerciseService} from "../../../services/exercise/exercise.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-check-game-core',
  templateUrl: './check-game-core-route.component.html',
  styleUrls: ['./check-game-core-route.component.css']
})
export class CheckGameCoreRouteComponent implements OnInit {
  smells!: string[];
  answers!: string[];
  private config : string[] = [];
  exerciseName = this.route.snapshot.params['exercise'];
  testingCode = "";
  @ViewChild('testing') testing: any;
  java = "text/x-java";
  fail: boolean = false;
  success: boolean = false;
  exerciseType !: number;

  constructor(private codeService: CodeeditorService,
              private exerciseService: ExerciseService,
              private route:ActivatedRoute,
              private zone:NgZone)
  {

  }

  ngOnInit(): void {
    this.exerciseType = Number(localStorage.getItem("exerciseRetrieval"));

    // INIT PRODUCTION CLASS FROM LOCAL
    if(this.exerciseType == 1){
      // INIT PRODUCTION CLASS FROM CLOUD
    }else if(this.exerciseType == 2){

      this.exerciseService.getTestClass(this.exerciseName).subscribe( data => {
        this.testingCode = data
      })

      this.exerciseService.getCheckGameConfigFile(this.exerciseName).subscribe(data=>{
        console.log(data);
        // @ts-ignore
        data = data.check_game_configuration;
        // @ts-ignore
        this.smells = Object.keys(data.smells)
        // @ts-ignore
        this.answers = Object.values(data.smells)

      })
    }

  }

  checkAnswer(i: number) {
    this.fail = false;
    this.success = false;
    // @ts-ignore
    if (this.answers[i].isPresent == false) {
      this.fail = true;
    }else{
      this.success = true;
    }

  }
}

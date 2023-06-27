import {Component, NgZone, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {LeaderboardService} from "../../services/leaderboard/leaderboard.service";
import {Solution} from "../../model/solution/solution";
import {ExerciseService} from "../../services/exercise/exercise.service";

@Component({
  selector: 'app-leaderboard-route',
  templateUrl: './leaderboard-route.component.html',
  styleUrls: ['./leaderboard-route.component.css']
})
export class LeaderboardRouteComponent implements OnInit {

  solutions!: Solution[]
  exerciseCode!: string;
  testingCode!: string;
  exerciseType !: number;
  exerciseName = this.route.snapshot.params['exercise'];

  constructor(private http: HttpClient,
              private router: Router,
              private leaderboardService: LeaderboardService,
              private exerciseService: ExerciseService,
              private zone:NgZone,
              private route:ActivatedRoute) {
    // GET TESTING CLASS FROM ELECTRON
  }

  ngOnInit(): void {
    this.exerciseType = Number(localStorage.getItem("exerciseRetrieval"));

    // INIT CODE FROM LOCAL
    if(this.exerciseType == 1){
    }else if(this.exerciseType == 2){
      // INIT CODE FROM CLOUD
      this.exerciseService.getMainClass(this.exerciseName).subscribe( data=> {
        this.exerciseCode = data;
      });
      this.exerciseService.getTestClass(this.exerciseName).subscribe( data => {
        this.testingCode = data
      })
    }

    this.leaderboardService.getSolutionsByExerciseName(this.exerciseName).subscribe(data=>{
      this.solutions = data;
    })

  }

}

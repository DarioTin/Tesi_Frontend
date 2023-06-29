import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {environment} from "../../../environments/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  constructor(private http: HttpClient, private router: Router) { }





  // CLOUD CALLS

  getExercises(){
    return this.http.get<any>(environment.exerciseServiceUrl + '/files/')
    }

  getMainClass(exercise: string){
    let HTTPOptions:Object = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json'
      }),
      responseType: 'text'
   }
   return this.http.get<string>(environment.exerciseServiceUrl + '/files/' + exercise + "/Production", HTTPOptions);
  }

  getTestClass(exercise: string){
    let HTTPOptions:Object = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json'
      }),
      responseType: 'text'
   }
   return this.http.get<string>(environment.exerciseServiceUrl + '/files/' + exercise + "/Test", HTTPOptions);

  }
  getConfigFile(exercise: string) {
    let HTTPOptions:Object = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      responseType: 'json'
    }
    return this.http.get<string>(environment.exerciseServiceUrl + '/files/' + exercise + "/Configuration", HTTPOptions);
  }

  initProductionCodeFromCloud(exerciseName: string) {
    let userCode;
    let originalProductionCode;
    this.getMainClass(exerciseName).subscribe(data => {
        userCode = data
        originalProductionCode = data
        return data
      }, // Init Production code from GitHub
      (error) => {
        console.log("Entro nell'errore")
      })
    return ["", ""]
  }

  async initTestingCodeFromCloud(exerciseName: string) {
    let testingCode;
    let originalTestCode;
    await this.getTestClass(exerciseName).subscribe(data => {
      testingCode = data
      originalTestCode = data
      return [testingCode, originalTestCode]
    }, () => {
      return ["", ""]
    })
  }

  initConfigCodeFromCloud(exerciseName: string) {
    let config: string
    this.getConfigFile(exerciseName).subscribe(data => {
      // @ts-ignore
      config = data
      return [config]
    },()=>{
    })
    return [""];
  }




}


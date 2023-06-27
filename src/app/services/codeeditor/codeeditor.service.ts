import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment.prod";
import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs";
import {Exercise} from "../../model/exercise/refactor-exercise.model";

@Injectable({
  providedIn: 'root'
})
export class CodeeditorService {

  constructor(private http: HttpClient) { }

  compile(exercise: Exercise) {

    const body = {
      exerciseName: exercise.exerciseName,
      originalProductionCode: exercise.originalProductionCode,
      originalTestCode: exercise.originalTestCode,
      refactoredTestCode: exercise.refactoredTestCode,
      repositoryUrl: environment.repositoryUrl,
      repositoryBranch: environment.repositoryBranch
    }
    return this.http.post(environment.compilerServiceUrl+'/compiler/refactoring',body)
  }

}

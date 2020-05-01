import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
    templateUrl: './app.doneTasks.html'
})
export class DoneTasksComponent {
    _doneTasksArray: Array<any>;
    _http: HttpClient;
    selectedTask;

 


    constructor(private http: HttpClient) {
        this._http = http;
        this.getDoneTasks();
    }


    getDoneTasks() {
        let url = "http://127.0.0.1:5000/doneTasks";
        this._http.get<any>(url)
        .subscribe(result => {
            this._doneTasksArray = result;
            console.log(this._doneTasksArray)
        })
    }

    onSelect(task) {
        this.selectedTask = task;
    }

}
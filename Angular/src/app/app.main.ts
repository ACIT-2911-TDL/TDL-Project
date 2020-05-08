import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { formatDate } from '@angular/common';


@Component({
    templateUrl: './app.main.html'
})
export class MainComponent {
    _allTasksArray: Array<any>;
    _sortedTasksArray: Array<any>;
    _overdueTasksArray: Array<any> = [];
    _todayTasksArray: Array<any> = [];
    _weekTasksArray: Array<any> = [];
    _otherTasksArray: Array<any> = [];
    _http: HttpClient;
    _today;
    _todayTime;
    selectedTask
    taskDate;
 


    constructor(private http: HttpClient) {
        this._http = http;
        this.getAllTasks();
        this._today = new Date();
        this._todayTime = this.getTime(this._today)
        this._today = this.formatTaskDeadline(this._today);

    }

    formatTaskDeadline(_date) {
        let month = '' + (_date.getMonth() + 1);
        let day = '' + _date.getDate();
        let year = _date.getFullYear();

    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return year+month+day
    }

    getTime(_date) {
        let hour = _date.getHours();
        let min = _date.getMinutes();
        let _mins = hour*60 + min;
        return _mins
    }

    getAllTasks() {
        let url = "http://127.0.0.1:5000/toDoTasks";
        this._http.get<any>(url)
        .subscribe(result => {
            this._allTasksArray = result;

            
            // order all tasks by time
            for(let i=0; i<this._allTasksArray.length; i++){
                this._allTasksArray[i].deadline = this._allTasksArray[i].deadline.slice(0,-3)
                this._allTasksArray[i].deadline = new Date(this._allTasksArray[i].deadline)
            }
            this._sortedTasksArray = this._allTasksArray.sort((a, b)=>  a.deadline -  b.deadline)

            // divide tasks into diiferent time periods
            for(let i=0; i<this._sortedTasksArray.length; i++) {
                this.taskDate = this.formatTaskDeadline(this._sortedTasksArray[i].deadline);
                if(this.taskDate == this._today) {
                    if(this.getTime(this._sortedTasksArray[i].deadline) - this._todayTime < 0) {
                        this._overdueTasksArray.push(this._sortedTasksArray[i])
                    }
                    else {
                        this._todayTasksArray.push(this._sortedTasksArray[i])
                    }
                }
                else if(this.taskDate - this._today <= 7 && this.taskDate - this._today > 0) {
                    this._weekTasksArray.push(this._sortedTasksArray[i])
                    console.log(this._sortedTasksArray[i].deadline)

                }
                else if(this.taskDate - this._today > 7) {
                    this._otherTasksArray.push(this._sortedTasksArray[i])
                }
            }
        })
    }

    
    onSelect(task) {
        this.selectedTask = task;
    }

    deleteTask() {
        let url = "http://127.0.0.1:5000/deleteTask";

        this.http.post(url,this.selectedTask)
            .subscribe(
                (data) => {
                    // console.log(data)
                },
                error => {
                    alert(JSON.stringify(error));
                });
        location.reload();

    }

    completeTask() {
        let url = "http://127.0.0.1:5000/completeTask";

        this.http.post(url,this.selectedTask)
        .subscribe(
            (data) => {
                // console.log(data)
            },
            error => {
                alert(JSON.stringify(error));
            });
        location.reload();
    }

    markTask() {
        let url = "http://127.0.0.1:5000/markTask";
        if(this.selectedTask.color == "red") {
            this.selectedTask.color = null;
        }
        else if(this.selectedTask.color == null) {
            this.selectedTask.color = "red"
        }

        this.http.post(url,this.selectedTask)
        .subscribe(
            (data) => {
                // console.log(data)
            },
            error => {
                alert(JSON.stringify(error));
            });
    }

}
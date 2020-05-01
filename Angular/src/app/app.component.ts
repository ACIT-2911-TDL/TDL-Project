import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    template:   
    `<nav>
    <a routerLink="/main" routerLinkActive="active">Tasks</a> |
    <a routerLink="/done" routerLinkActive="active">Done</a> |
    <a routerLink="/new" routerLinkActive="active">New Task</a>
    </nav>
    
    <!-- Where router should display a view -->
    <router-outlet></router-outlet>`
})
export class AppComponent { }

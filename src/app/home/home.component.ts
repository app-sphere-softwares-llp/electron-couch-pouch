import {Component, OnInit} from '@angular/core';
import {DbService} from '../services/db.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  todos: any[];

  constructor(private db: DbService) {
  }

  ngOnInit() {
    this.getTodos();

    this.db.remoteDb.changes({
      since: 'now',
      live: true,
      include_docs: true
    }).on('change', change => {
      this.getTodos();
    }).on('complete', info => {
    }).on('error', err => {
    });
  }

  add() {
    this.db.addTodo(Math.random().toString(36).substring(7));
    this.getTodos();
  }

  async getTodos() {
    const data = await this.db.showTodos();
    if (data) {
      this.todos = data.rows;
    }
  }

  deleteTodo(todo) {
    this.db.deleteTodo(todo);
    this.getTodos();
  }

}

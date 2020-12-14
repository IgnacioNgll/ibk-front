import { Component, OnInit } from '@angular/core';

import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-edad',
  templateUrl: './user-edad.component.html',
  styleUrls: ['./user-edad.component.css']
})
export class UserEdadComponent implements OnInit {
  userList: User[];
  totalEdad: number = 0;
  desviacionEstandar: number = 0;
  numi: number = 0;
  num: number = 0;

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit() {
    return this.userService.getUsers()
      .snapshotChanges().subscribe(item => {
        this.userList = [];

        item.forEach(element => {
          let x = element.payload.toJSON();
          x["$key"] = element.key;
          this.userList.push(x as User);
          this.totalEdad += x["age"];
        });

        this.totalEdad /= this.userList.length;

        item.forEach(element => {
          let x = element.payload.toJSON();
          this.numi = Math.pow(( x["age"] - this.totalEdad), 2);
          this.num += this.numi;
        });

        this.desviacionEstandar = Math.sqrt(this.num / this.userList.length)
      });
  }

}

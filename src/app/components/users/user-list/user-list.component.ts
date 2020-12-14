import { Component, OnInit } from '@angular/core';

// model
import { User } from '../../../models/user';

// service
import { UserService } from '../../../services/user.service';

// toastr
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  userList: User[];
  EdadPosibleMuerte: number = 0;
  totalEdad: number = 0;
  contador: number = 0;

  constructor(
    private userService: UserService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    return this.userService.getUsers()
      .snapshotChanges().subscribe(item => {
        this.userList = [];

        item.forEach(element => {
          let x = element.payload.toJSON();
          x["$key"] = element.key;
          this.totalEdad += x["age"];
          this.contador +=1;
        });
        this.totalEdad /= this.contador;

        item.forEach(element => {
          debugger;
          let x = element.payload.toJSON();
          x["$key"] = element.key;
          
          x["EdadPosibleMuerte"] = this.totalEdad - x["age"];
          this.userList.push(x as User);
        });

      });
  }

  onEdit(user: User) {
    this.userService.selectedUser = Object.assign({}, user);
  }

  onDelete($key: string) {
    if(confirm('Are you sure you want to delete it?')) {
      this.userService.deleteUser($key);
      this.toastr.warning('Deleted Successfully', 'User Removed');
    }
  }

}

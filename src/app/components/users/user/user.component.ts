import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

//  Service 
import { UserService } from '../../../services/user.service';

// Class
import { User } from '../../../models/user';

// toastr
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(
    private userService: UserService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.userService.getUsers();
    this.resetForm();
  }

  onSubmit(userForm: NgForm)
  {
    if(userForm.value.$key == null)
      this.userService.insertUser(userForm.value);
    else
    this.userService.updateUser(userForm.value);
    
    this.resetForm(userForm);
    this.toastr.success('Sucessful Operation', 'User Registered');
  }

  resetForm(userForm?: NgForm)
  {
    if(userForm != null)
      userForm.reset();
      this.userService.selectedUser = new User();
  }

}

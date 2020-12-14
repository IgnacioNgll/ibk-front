import { Injectable } from '@angular/core';

// Firebase
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

// Model
import { User } from '../models/user';

@Injectable()
export class UserService {

  userList: AngularFireList<any>;
  selectedUser: User = new User();

  constructor(private firebase: AngularFireDatabase) { }

  getUsers()
  {
    return this.userList = this.firebase.list('users');
  }

  insertUser(user: User)
  {
    this.userList.push({
      name: user.name,
      lastname: user.lastname,
      age: user.age,
      birthdate: user.birthdate
    });
  }

  updateUser(user: User)
  {
    this.userList.update(user.$key, {
      name: user.name,
      lastname: user.lastname,
      age: user.age,
      birthdate: user.birthdate
    });
  }

  deleteUser($key: string)
  {
    this.userList.remove($key);
  }
}

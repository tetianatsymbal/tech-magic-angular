import { Injectable } from '@angular/core';
import {User} from "../shared/user";
import { USERS } from "../../users-data/USERS";
import {BehaviorSubject, Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = this.getAllUsers()
  private usersSubject: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(this.users)

  constructor() { }

  getAllUsers(): User[]{
    return USERS;
  }

  getUsersObservable(): Observable<User[]>{
    return this.usersSubject.asObservable()
  }

  deleteUsers(usersToDelete: User[]){
    this.users = this.users.filter(user => !usersToDelete.includes(user))
    this.usersSubject.next(this.users)
  }

  searchUsers(term: string){
    if(term.length == 0){
      this.users = this.getAllUsers()
    }else{
      this.users = this.users.filter(user => user.lastname.toLowerCase().includes(term.toLowerCase())
        || user.firstname.toLowerCase().includes(term.toLowerCase()))
    }
    this.usersSubject.next(this.users)
  }

  orderByName(orderType: 'firstname' | 'lastname'){
    this.users = this.users.sort((a, b) => a[orderType].localeCompare(b[orderType]))
    this.usersSubject.next(this.users)
  }
}
import { Component, OnInit, Input } from '@angular/core';
import { Project } from 'src/app/interfaces/project';
import { ProjectService } from 'src/app/services/project.service';
import { AccountService } from 'src/app/services/account.service';
import { Router } from '@angular/router';
import { ProjectUser } from 'src/app/interfaces/project-user';
import { RoutePipe } from 'src/app/application-pipes/custom.pipe';
import { Observable } from 'rxjs';
import { ApplicationUser } from 'src/app/interfaces/user';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css']
})
export class ProjectCardComponent implements OnInit {

  constructor(
    private projectService : ProjectService,
    private accountService : AccountService,
    private router : Router
    ) { }

  @Input() project : Project;

  currentUser : ApplicationUser = null
  projectUser : ProjectUser = null

  ngOnInit(): void {
    // Get User And Check For Project User Match
    if(this.accountService.checkLoginStatus()){
      this.accountService.currentUser.subscribe(
        result => {
            this.currentUser = result  
            this.projectUser = this.project.projectUsers.find(x => x.userID == result.id) || null
      })
    }
  }

  get isFollowing() : boolean{
    if(this.currentUser == null) return false
    if(this.projectUser == null) return false
    if(this.projectUser.isFollowing == true) return true
    return false;
  }

  followProject(){
    // Navigate To Login Page If User Not Logged In
    if(!this.accountService.checkLoginStatus())
      this.router.navigate(['/login'])

    if(this.projectUser == null)
    {
      // Create Project User As Follower
      this.projectService.addUser(this.project.projectID, this.currentUser.id, "follower", true).subscribe(
        result =>{
          this.project.projectUsers.push(result) 
          this.projectUser = result;  
        }, error =>{
          console.log(error)
        }
      )
    }
    else{
      // Modify Project User And Set Following To True
      this.projectUser.isFollowing = true;     
      this.projectService.updateUser(this.projectUser).subscribe(
        result =>{
          let index = this.project.projectUsers.findIndex(pu => pu.userID == result.userID)
          this.project.projectUsers[index] = result
          this.projectUser = result;          
        }, error =>{
          console.log(error)
        }
      )
    }
  }

  unFollowProject(){
    this.projectUser.isFollowing = false
    if(this.projectUser.userRole == "follower")
      this.projectService.removeUser(this.projectUser.projectID, this.projectUser.userID).subscribe(
        result => {
          let index = this.project.projectUsers.indexOf(result)
          this.project.projectUsers.splice(index, 1)
          this.projectUser = null
        }, error =>{
          console.log(error)
        }
      )
    else{
      this.projectService.updateUser(this.projectUser).subscribe(
        result => {
          let index = this.project.projectUsers.findIndex(pu => pu.userID == result.userID)
          this.project.projectUsers[index] = result
          this.projectUser = result 
        }, error =>{
          console.log(error)
        }
      )
    }
  }
}

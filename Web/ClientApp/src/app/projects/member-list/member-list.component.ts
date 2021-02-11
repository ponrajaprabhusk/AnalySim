import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { Observable } from 'rxjs';
import { Project } from 'src/app/interfaces/project';
import { AccountService } from 'src/app/services/account.service';
import { ProjectService } from 'src/app/services/project.service';
import { ProjectFileExplorerComponent } from '../project-file-explorer/project-file-explorer.component';
import { ProjectUser } from 'src/app/interfaces/project-user';
import { of, } from 'rxjs';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  constructor(
    private router : Router,
    private route: ActivatedRoute,
    private accountService : AccountService,
    private projectService : ProjectService) { }


  project : Project = null
  projectmembers: []
  memberIDs : number[]
  members: ProjectUser[]
  membersTest: Observable<User>[] = []
  usernames: User
  usernamelist: String[] = []
  headers = ["Project Members","Project Members"]
  testlist: String[] = []
 

  async ngOnInit() {
   

    let owner = this.route.snapshot.params['owner']
    let projectname = this.route.snapshot.params['projectname']
    let projectmambers = this.route.snapshot.params['projectUsers']

    this.projectService.getUserList(1).subscribe(user => {
    user.forEach(element => {this.membersTest.push(this.accountService.getUserByID(element.userID))
        
      });
    })
   
 


  }
}
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AddMemberDto, Team } from '../../../models/hr/team';
import { TeamsService } from '../../../services/hr/teams.service';
import { GenericTableComponent } from '../../../shared/components/generic-table/generic-table.component';
import { DrawerFormComponent } from '../../../shared/components/drawer-form/drawer-form.component';
import { FormField } from '../../../shared/models/form-field.model';
import { DepartmentsService } from '../../../services/hr/departments.service';
import { Department } from '../../../models/hr/department';
import { UsersService } from '../../../services/hr/users.service';

@Component({
  selector: 'app-teams',
  imports: [CommonModule, RouterModule, GenericTableComponent, DrawerFormComponent],
  templateUrl: './teams.component.html',
  styleUrl: './teams.component.css'
})
export class TeamsComponent implements OnInit {

  teams: Team[] = [];
  departments: Department[] = [];
  users: any[] = [];

  teamsService = inject(TeamsService);
  departmentsService = inject(DepartmentsService);
  usersService = inject(UsersService);

  showDrawer = false;
  selectedTeam: any = {};
  mode: 'create' | 'update' = 'create';

  ngOnInit(): void {
    this.loadTeams();
    this.loadDepartments();
  }
teamFields: FormField[] = [
  { key: 'teamName', label: 'Team Name', type: 'text' },
  { key: 'description', label: 'Description', type: 'text' },
  { key: 'departmentName', label: 'Department', type: 'dropdown', options: [], optionValue: 'departmentName', optionLabel: 'departmentName' },
  { key: 'userId', label: 'Add Member', type: 'dropdown', options: [], optionValue: 'id', optionLabel: 'username' },
  { key: 'members', label: 'Members', type: 'text' },
  { key: 'projectList', label: 'Projects', type: 'text' }
];

  teamColumns = [
    { key: 'teamName', label: 'Team Name' },
    { key: 'description', label: 'Description' },
    { key: 'departmentName', label: 'DepartmentName', type: 'text' }
  ];

  loadTeams(): void {
    this.teamsService.getAll().subscribe(data => {
      this.teams = data;
    });
  }

  loadDepartments(): void {
    this.departmentsService.getAll().subscribe(data => {
      this.departments = data;
      const field = this.teamFields.find(x => x.key === 'departmentName');
      if (field) {
        field.options = data;
      }
    });
  }

  createTeam(): void {
    this.mode = 'create';
    this.selectedTeam = {};
    this.showDrawer = true;
  }

editTeamShowDrawer(team: any): void {
  this.mode = 'update';

  const teamId = team.id ?? team.teamId;

  this.teamsService.getTeamMembersByTeamId(teamId).subscribe(data => {
    const details = data?.[0];

    this.selectedTeam = {
      ...team,
      members: details?.members
        ?.map(member => `${member.firstName} ${member.lastName} (${member.jobTitle})`)
        .join(', ') ?? '',
      projectList: details?.projectList?.join(', ') ?? ''
    };

    console.log('Selected Team:', this.selectedTeam);

    this.showDrawer = true;
  });
}

  saveTeam(team: Team): void {
    this.teamsService.create(team).subscribe(newTeam => {
      this.teams.push(newTeam);
      this.showDrawer = false;
    });
  }
      getTeamMembersByTeamId(teamId: number): any {
    return this.teamsService.getTeamMembersByTeamId(teamId);
  }

  updateTeam(team: any): void {
    const id = this.selectedTeam.id ?? this.selectedTeam.teamId;
    this.teamsService.update({ ...this.selectedTeam, ...team, id }).subscribe(() => {
      this.loadTeams();
      this.showDrawer = false;
    });
  }

  deleteTeam(team: any): void {
    const id = this.selectedTeam.id ?? this.selectedTeam.teamId;
    this.teamsService.delete(id).subscribe(() => {
      this.teams = this.teams.filter(t => (t.id ?? (t as any).teamId) !== id);
      this.showDrawer = false;
    });
  }
}
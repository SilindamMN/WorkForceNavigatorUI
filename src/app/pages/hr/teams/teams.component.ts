import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Team } from '../../../models/hr/team';
import { TeamsService } from '../../../services/hr/teams.service';
import { GenericTableComponent } from '../../../shared/components/generic-table/generic-table.component';
import { DrawerFormComponent } from '../../../shared/components/drawer-form/drawer-form.component';
import { FormField } from '../../../shared/models/form-field.model';

@Component({
  selector: 'app-teams',
  imports: [CommonModule, RouterModule,GenericTableComponent,DrawerFormComponent],
  templateUrl: './teams.component.html',
  styleUrl: './teams.component.css'
})
export class TeamsComponent implements OnInit {

  teams: Team[] = [];

  teamsService = inject(TeamsService);

  showDrawer = false;

  selectedTeam: any = {};

  mode: 'create' | 'update' = 'create';

  ngOnInit(): void {
    this.loadTeams();
  }
teamFields: FormField[] = [
  { key: 'teamName', label: 'Team Name', type: 'text' },
  { key: 'description', label: 'Description', type: 'text' },
  { key: 'departmentName', label: 'DepartmentName', type: 'text' }
];
  // ================= FORM CONFIG =================
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
   createJobTitle(): void {
    this.mode = 'create';
    this.selectedTeam = {};
    this.showDrawer = true;
  }

  editTeamShowDrawer(team: any): void {
    this.mode = 'update';
    this.selectedTeam = { ...team };
    this.showDrawer = true;
  }

  updateTeam(team: Team): void {
    this.teamsService.update(team, ``).subscribe(() => {
      this.loadTeams();
      this.showDrawer = false;
    });
  }

  deleteTeam(team: any): void {
    this.teams = this.teams.filter(t => t !== team);
    this.showDrawer = false;
  }
}
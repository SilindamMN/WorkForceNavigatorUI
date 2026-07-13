import { Department } from "./department";
import { Project } from "./project";

export class Team {
  id?: number;
  teamName: string;
  description: string;
  departmentId: number;

  department?: Department;

  projects: Project[];

  constructor() {
    this.id = undefined;
    this.teamName = '';
    this.description = '';
    this.departmentId = 0;

    this.projects = [];
  }
}

// DTO (for create/update)
export class TeamDto {
  teamName: string;
  description: string;
  departmentName: string;

  constructor() {
    this.teamName = '';
    this.description = '';
    this.departmentName = '';
  }
}
// DTO (for create/update)
export class UserTeamListDto {
  teamId?: number;
  userName: string;
  teamName: string;
  teamLeader: string;

  constructor() {
    this.teamId = undefined;
    this.userName = '';
    this.teamName = '';
    this.teamLeader = '';
  }
}export class AddMemberDto {
  teamId: number;
  userId: string;
  isRemoved?: boolean;

  constructor() {
    this.teamId = 0;
    this.userId = '';
this.isRemoved = false;
  }
}
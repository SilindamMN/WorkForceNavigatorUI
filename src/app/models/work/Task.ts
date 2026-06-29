export class Task {
  id?: any;
  projectId: number=0;
  TaskName: string = '' ;

  constructor() {
    this.id = undefined;
    this.projectId = 0;
    this.TaskName = '';
  }
}

// DTO without id
export class TaskDto {
  projectName: string;
  teamName: string;

  constructor() {
    this.projectName = '';
    this.teamName = '';
  }
}
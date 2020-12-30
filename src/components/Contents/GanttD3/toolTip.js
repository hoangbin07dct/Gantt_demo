export default class ToolTip {
  constructor(currentData, left, top) {
    this.currentData = currentData;
    this.left = left;
    this.top = top;
    this.containElement = document.createElement('div');
    this.visible = false;
  }
  render() {
    this.containElement.style.visibility = this.visible ? 'visible' : 'hidden';
    this.containElement.className = 'tool-tip';
    this.containElement.innerHTML = '';
    this.containElement.style.position = 'fixed';
    this.containElement.style.width = `100px`;
    this.containElement.style.height = `50px`;
    this.containElement.style.color = '#ffffff';
    this.containElement.style.top = `${this.top}px`;
    this.containElement.style.left = `${this.left}px`;

    // Task
    let taskName = document.createElement('p');
    taskName.className = 'task-name';
    taskName.innerText = `Task: ${this.currentData.task}`;

    // Group
    let group = document.createElement('p');
    group.className = 'task-group';
    group.innerText = `Group: ${this.currentData.type}`;

    // Progress
    let progress = document.createElement('p');
    progress.className = 'task-progress';
    progress.innerText = `Progress: ${this.currentData.progress}%`;

    this.containElement.appendChild(taskName);
    this.containElement.appendChild(group);
    this.containElement.appendChild(progress);

    return this.containElement;
  }

  setCurrentData(currentData) {
    this.currentData = currentData;
  }

  setPosition(left, top) {
    let areaDimesion = document.querySelector('svg').getBoundingClientRect();
    this.left = areaDimesion.left + left;
    this.top = areaDimesion.top + top + 35;
  }
}
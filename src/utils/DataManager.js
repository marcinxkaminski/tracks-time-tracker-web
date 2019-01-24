import { Service } from './Service';
import { TimeConverter } from './TimeConverter';

export const DataManager = {
    logout: function () {
        this.removeData();
        Service.logout();
    },

    getData: function () {
        // Service.getData();
        const data = localStorage.tracks;
        return data ? JSON.parse(data) : null;
    },

    setData: function (data) {
        if (data && !data.message) {
            localStorage.setItem('tracks', JSON.stringify(data));
        } else if (data.message) {
            console.error(data.message);
        }
    },

    removeData: function () {
        localStorage.removeItem('tracks');
    },

    removeUser: function (data) {
        this.removeData();
        if (data) {
            Service.deleteUser(data);
        }
    },

    getUserDetails: function () {
        let data = this.getData();
        if (data) {
            delete data.projects;
            return data;
        }
    },

    setUserDetails: function (data) {
        Service.editUser(data);
        data.projects = this.getProjects();
        this.setData(data);
    },

    getEarningsAndTimeSpentForProject(project, date) {
        var earned = 0;
        var timeSpent = 0;
        for (let i = 0; i < project.tasks.length; ++i) {
            if (date) {
                for (let j = 0; j < project.tasks[i].working.length; ++j) {
                    if (TimeConverter.isBetweenDates(project.tasks[i].working[j].start, date.from, date.to)) {
                        earned += TimeConverter.getMoneyEarned(project.tasks[i].working[j].timeSpent, project.tasks[i].pricePerHour);
                        timeSpent += project.tasks[i].working[j].timeSpent;
                    }
                }
            } else {
                earned += TimeConverter.getMoneyEarned(project.tasks[i].timeSpent, project.tasks[i].pricePerHour);
                timeSpent += project.tasks[i].timeSpent;
            }
        }
        return { earned, timeSpent };
    },

    getDailyOverview: function (date) {
        let projects = this.getProjects();
        date = date ? date : { from: TimeConverter.getTodaysDateWithoutTime(), to: TimeConverter.getTodaysDateWithoutTime() };
        if (projects) {
            const result = {
                tasks: [],
                projects: [],
                timeSpent: 0,
                earned: 0
            };
            for (var i = 0; i < projects.length; ++i) {
                for (var j = 0; j < projects[i].tasks.length; ++j) {
                    var addedTask = false;
                    for (let k = 0; k < projects[i].tasks[j].working.length && !addedTask; ++k) {
                        if (!addedTask && TimeConverter.isBetweenDates(projects[i].tasks[j].working[k].start, date.from, date.to)) {
                            addedTask = true;
                            result.tasks.push(projects[i].tasks[j]);
                        }
                    }
                }
                if (addedTask) {
                    var dailyForProject = this.getEarningsAndTimeSpentForProject(projects[i], date);
                    result.earned += dailyForProject.earned;
                    result.timeSpent += dailyForProject.timeSpent;
                    result.projects.push(projects[i]);
                }
            }
            return result;
        }
    },

    // Projects
    getProjects: function () {
        const data = this.getData();
        return data ? data.projects : null;
    },

    getProject: function (id) {
        if (id !== null) {
            const projects = this.getProjects();
            if (projects) {
                for (var i = 0; i < projects.length; ++i) {
                    if (projects[i].id === Number(id)) {
                        if (projects[i].earned === 0 || !projects[i].earned) {
                            projects[i].earned = this.getEarningsAndTimeSpentForProject(projects[i]).earned;
                        }
                        return projects[i];
                    }
                }
            }
        }
    },

    addProject: function (project) {
        if (project) {
            const data = this.getData();
            if (data) {
                project.id = this.getMaxProjectID() + 1;
                data.projects.push(project);
                this.setData(data);
                Service.addProject(project);
            }
        }
    },

    editProject: function (project) {
        
        if (project) {
            const data = this.getData();
            if (data) {
                for (let i = 0; i < data.projects.length; ++i) {
                    if (data.projects[i].id === Number(project.id)) {
                        data.projects[i] = project;
                    }
                }
                this.setData(data);
                Service.editProject(project);
            }
        }
    },

    removeProject: function (project) {
        
        if (project) {
            const data = this.getData();
            if (data) {
                for (let i = 0; i < data.projects.length; ++i) {
                    if (data.projects[i].id === Number(project.id)) {
                        data.projects.splice(i, 1);
                    }
                }
                this.setData(data);
                Service.removeProject(project);
            }
        }
    },

    getMaxProjectID: function () {
        let maxId = 0;
        const data = this.getData();
        if (data) {
            for (let i = 0; i < data.projects.length; ++i) {
                let id = data.projects[i].id;
                maxId = maxId < id ? id : maxId;
            }
            return maxId;
        }
    },

    getProjectName: function (id) {
        
        const projects = this.getProjects();
        for (let i = 0; i < projects.length; ++i) {
            if (projects[i].id === id) {
                return projects[i].name;
            }
        }
    },

    shareProject: function (project, email) {
        Service.shareProject(project, email);
    },

    // Tasks
    getTasks: function () {
        
        const projects = this.getProjects();
        if (projects) {
            const tasks = [];
            projects.map(project => project.tasks.map(task => tasks.push(task)));
            return tasks;
        }
    },

    getTask: function (id) {
        if (id !== null && id !== undefined) {
            const projects = this.getProjects();
            if (projects) {
                for (var i = 0; i < projects.length; ++i) {
                    for (var j = 0; j < projects[i].tasks.length; ++j) {
                        if (projects[i].tasks[j] && projects[i].tasks[j].id === Number(id)) {
                            return projects[i].tasks[j];
                        }
                    }
                }
            }
        }
    },

    addTask: function (task) {
        if (task) {
            task.id = this.getMaxTasksID() + 1;
            const data = this.getData();
            if (data) {
                for (let i = 0; i < data.projects.length; ++i) {
                    if (data.projects[i].id === Number(task.projectId)) {
                        data.projects[i].tasks.push(task);
                    }
                }
                this.setData(data);
                Service.addTask(task);
            }
        }
    },

    startWorking: function (log) {
        Service.startCounting(log);
    },

    addWorkingLog: function (log) {
        
        if (log.id !== null && log.id !== undefined) {
            Service.stopCounting(log);
            const data = this.getData();
            if (data) {
                for (let i = 0; i < data.projects.length; ++i) {
                    for (let j = 0; j < data.projects[i].tasks.length; ++j) {
                        if (data.projects[i].tasks[j].id === Number(log.id)) {
                            const earned = TimeConverter.getMoneyEarned(log.timeSpent, data.projects[i].tasks[j].pricePerHour);
                            data.projects[i].timeSpent += log.timeSpent;
                            data.projects[i].tasks[j].earned +=TimeConverter.getMoneyEarned(log.timeSpent, data.projects[i].tasks[j].pricePerHour);
                            data.projects[i].earned += earned;
                            data.projects[i].tasks[j].timeSpent += log.timeSpent;
                            data.projects[i].tasks[j].working.push({ "start": log.start, "timeSpent": log.timeSpent });
                        }
                    }
                }
                this.setData(data);
            }
        }
    },

    saveTmpWorkingLog: function (id, time) {
        if (id !==null && id !== undefined && time) {
            const timeToSave = TimeConverter.getCurrentTime() + time;
            localStorage.setItem(id, timeToSave);
            return true;
        }
    },

    getTmpWorkingLog: function (id) {
        let timeDifference = TimeConverter.getTimeDifferenceInSeconds(localStorage.getItem(id));
        timeDifference = timeDifference ? timeDifference : 0;
        localStorage.removeItem(id);
        return timeDifference;
    },

    editTask: function (task) {
        
        if (task) {
            const data = this.getData();
            if (data) {
                for (let i = 0; i < data.projects.length; ++i) {
                    if (data.projects[i].id === task.projectId) {
                        for (let j = 0; j < data.projects[i].tasks.length; ++j) {
                            if (data.projects[i].tasks[j].id === Number(task.id)) {
                                data.projects[i].tasks[j] = task;
                            }
                        }
                    }
                }
                this.setData(data);
                Service.editTask(task);
            }
        }
    },

    removeTask: function (task) {
        
        if (task) {
            const data = this.getData();
            if (data) {
                for (let i = 0; i < data.projects.length; ++i) {
                    if (data.projects[i].id === Number(task.projectId)) {
                        for (let j = 0; j < data.projects[i].tasks.length; ++j) {
                            if (data.projects[i].tasks[j].id === Number(task.id) || !data.projects[i].tasks[j]) {
                                data.projects[i].timeSpent -= data.projects[i].tasks[j].timeSpent;
                                data.projects[i].earned -= data.projects[i].tasks[j].earned;
                                data.projects[i].tasks.splice(j, 1);
                            }
                        }
                    }
                }
                this.setData(data);
                Service.removeTask(task);
            }
        }
    },

    getMaxTasksID: function () {
        let maxId = 0;
        const data = this.getData();
        if (data) {
            for (let i = 0; i < data.projects.length; ++i) {
                for (let j = 0; j < data.projects[i].tasks.length; ++j) {
                    let id = data.projects[i].tasks[j].id;
                    maxId = maxId < id ? id : maxId;
                }
            }
            return maxId;
        }
    },

    shareTask: function (task, email) {
        Service.shareTask(task, email);
    }


}
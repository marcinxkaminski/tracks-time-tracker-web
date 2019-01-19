const url = 'http://student.agh.edu.pl/~mpitura/Tracks';

function getOptions(method, data) {
    const dataToSend = method === 'GET' ? null : JSON.stringify({ ...data, _method: method });
    const options = {
        method: method,
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: dataToSend
    }
    return options;
}

export const Service = {
    // USER
    logout() {
        localStorage.removeItem('tracks');
        fetch(url + '/logout', getOptions('POST'));
    },

    login(data, callback, failureCallback) {
        data = { email: data.email };
        fetch(url + '/login', getOptions('POST', data)).then((res) => {
            return res.json();
        }).then(res => {
            this.getData();
            if (callback) { callback(res) };
        }).catch(err => {
            console.error(err.message);
            if (failureCallback) { failureCallback(); }
        });
    },

    register(data, callback) {
        fetch(url + '/users', getOptions('POST', data)).then((res) => {
            return res.json();
        }).then(res => {
            if (callback) { callback(res) };
        }).catch(err => {
            console.error(err.message);
        });
    },

    remind(data, callback) {
        fetch(url + '/remind', getOptions('POST', data)).then((res) => {
            return res.json();
        }).then(res => {
            if (callback) { callback(res) };
        }).catch(err => {
            console.error(err.message);
        });
    },

    getData: function (callback) {
        fetch((url + '/user'), getOptions('GET')).then((res) => {
            return res.json();
        }).then(res => {
            if (res && !res.message && res.projects) {
                const fetchedData = JSON.stringify(res);
                localStorage.setItem('tracks', fetchedData);
                if (callback) { callback(res) };
            } else if (res.message) {
                console.error(res.message);
            }
        }).catch(err => {
            console.error(err.message);
        });
    },

    editUser: function (data, callback) {
        fetch(url + '/users/' + data.id, getOptions('PUT', data)).then((res) => {
            return res.json();
        }).then(res => {
            this.getData();
            if (callback) { callback(res) };
        }).catch(err => {
            console.error(err.message);
        });
    },

    deleteUser: function (data, callback) {
        fetch(url + '/users/' + data.id, getOptions('PUT', data)).then((res) => {
            return res.json();
        }).then(res => {
            this.getData();
            if (callback) { callback(res) };
        }).catch(err => {
            console.error(err.message);
        });
    },

    // PROJECTS
    getProjects: function (callback) {
        fetch(url + '/projects', getOptions('GET')).then((res) => {
            return res.json();
        }).then(res => {
            this.getData();
            if (callback) { callback(res) };
        }).catch(err => {
            console.error(err.message);
        });
    },

    getProject: function (data, callback) {
        fetch(url + '/projects/' + data.id, getOptions('GET', data)).then((res) => {
            return res.json();
        }).then(res => {
            this.getData();
            if (callback) { callback(res) };
        }).catch(err => {
            console.error(err.message);
        });
    },

    getProjectSummary: function (data, callback) {
        fetch(url + '/projects/' + data.id + '/summary', getOptions('GET', data)).then((res) => {
            return res.json();
        }).then(res => {
            this.getData();
            if (callback) { callback(res) };
        }).catch(err => {
            console.error(err.message);
        });
    },

    addProject: function (data, callback) {
        fetch(url + '/projects', getOptions('POST', data)).then((res) => {
            return res.json();
        }).then(res => {
            this.getData();
            if (callback) { callback(res) };
        }).catch(err => {
            console.error(err.message);
        });
    },

    editProject: function (data, callback) {
        fetch(url + '/projects/' + data.id, getOptions('PUT', data)).then((res) => {
            return res.json();
        }).then(res => {
            this.getData();
            if (callback) { callback(res) };
        }).catch(err => {
            console.error(err.message);
            if (callback) callback(false);
        });
    },

    removeProject: function (data, callback) {
        fetch(url + '/projects/' + data.id, getOptions('DELETE', data)).then(res => {
            return res.json()
        }).then(res => {
            this.getData();
            if (callback) { callback(res) };
        }).catch(err => {
            console.error(err.message);
        });
    },

    // TASKS
    getTasks: function (callback) {
        fetch(url + '/tasks', getOptions('GET')).then((res) => {
            return res.json();
        }).then(res => {
            this.getData();
            if (callback) { callback(res) };
        }).catch(err => {
            console.error(err.message);
        });
    },

    getTask: function (data, callback) {
        fetch(url + '/tasks/' + data.id, getOptions('GET', data)).then((res) => {
            return res.json();
        }).then(res => {
            this.getData();
            if (callback) { callback(res) };
        }).catch(err => {
            console.error(err.message);
        });
    },

    getTaskSummary: function (data, callback) {
        fetch(url + '/tasks/' + data.id + '/summary', getOptions('GET', data)).then((res) => {
            return res.json();
        }).then(res => {
            this.getData();
            if (callback) { callback(res) };
        }).catch(err => {
            console.error(err.message);
        });
    },

    addTask: function (data, callback) {
        fetch(url + '/tasks', getOptions('POST', data)).then((res) => {
            return res.json();
        }).then(res => {
            this.getData();
            if (callback) { callback(res) };
        }).catch(err => {
            console.error(err.message);
        });
    },

    editTask: function (data, callback) {
        fetch(url + '/tasks/' + data.id, getOptions('PUT', data)).then((res) => {
            return res.json();
        }).then(res => {
            this.getData();
            if (callback) { callback(res) };
        }).catch(err => {
            console.error(err.message);
        });
    },

    removeTask: function (data, callback) {
        fetch(url + '/tasks/' + data.id, getOptions('DELETE', data)).then(res => {
            return res.json()
        }).then(res => {
            this.getData();
            if (callback) { callback(res) };
        }).catch(err => {
            console.error(err.message);
        });
    },

    startCounting: function (data, callback) {
        fetch(url + '/tasks/' + data.id + '/start', getOptions('GET')).then(res => {
            return res.json();
        }).then(res => {
            if (callback) { callback(res) };
        }).catch(err => {
            console.error(err.message);
        });
    },

    stopCounting: function (data, callback) {
        fetch(url + '/tasks/' + data.id + '/stop', getOptions('GET')).then(res => {
            return res.json();
        }).then(res => {
            this.getData();
            if (callback) { callback(res) };
        }).catch(err => {
            console.error(err.message);
        });
    },

    // NOTIFICATIONS
    shareTask: function (task, email, callback) {
        fetch(url + '/tasks/' + task.id + '/summary', getOptions('POST', email)).then(res => {
            return res.json();
        }).then(res => {
            if (callback) { callback(res) };
        }).catch(err => {
            console.error(err.message);
        });
    },

    shareProject: function (project, email, callback) {
        fetch(url + '/projects/' + project.id + '/summary', getOptions('POST', email)).then(res => {
            return res.json();
        }).then(res => {
            if (callback) { callback(res) };
        }).catch(err => {
            console.error(err.message);
        });
    },
};

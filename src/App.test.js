import React from 'react';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';
import { exists } from 'fs';
import { DataManager } from './utils/DataManager';
import { TimeConverter } from './utils/TimeConverter';
import FormButton from './components/common/FormButton';
import Dashboard from './containers/Dashboard/Dashboard';
import Overview from './containers/Dashboard/Overview/Overview';
import AddProject from './containers/Dashboard/Projects/AddProject';
import EditProject from './containers/Dashboard/Projects/EditProject';
import Projects from './containers/Dashboard/Projects/Projects';
import Project from './containers/Dashboard/Projects/Project';
import AddTask from './containers/Dashboard/Tasks/AddTask';
import EditTask from './containers/Dashboard/Tasks/EditTask';
import Tasks from './containers/Dashboard/Tasks/Tasks';
import Task from './containers/Dashboard/Tasks/Task';
import Header from './components/Dashboard/Header';
import Footer from './components/Dashboard/Footer';
import FooterNavigation from './components/Dashboard/FooterNavigation';
import Calendar from './components/Dashboard/Overview/Calendar';
import OverviewDetails from './components/Dashboard/Overview/OverviewDetails';
import Settings from './components/Dashboard/Overview/Settings';
import AddProjectForm from './components/Dashboard/Projects/AddProjectForm';
import EditProjectForm from './components/Dashboard/Projects/EditProjectForm';
import ProjectDetails from './components/Dashboard/Projects/ProjectDetails';
import ProjectTile from './components/Dashboard/Projects/ProjectTile';
import AddTaskForm from './components/Dashboard/Tasks/AddTaskForm';
import EditTaskForm from './components/Dashboard/Tasks/EditTaskForm';
import TaskDetails from './components/Dashboard/Tasks/TaskDetails';
import TaskTile from './components/Dashboard/Tasks/TaskTile';
import TaskTiming from './components/Dashboard/Tasks/TaskTiming';




Enzyme.configure({ adapter: new Adapter() });

describe('Tests', () => {
  it('works', () => {
    true == true;
  });
});

// Data Manager
describe('Data Manager', () => {
  beforeEach(() => {
    const mockData = {
      name: 'test',
      projects: [
        {id:0, tasks: []}
      ]
    };
    DataManager.setData(mockData);
  });

  it('logout', () => {
    DataManager.logout();
    expect(DataManager.getData()).to.equal(null);
  });

  it('gets data', () => {
    expect(DataManager.getData()).exist;
  });

  it('sets data', () => {
    const mockData = {test: 'test'};
    DataManager.setData(mockData);
    expect(DataManager.getData().test).to.equal(mockData.test);
  });

  it('removes data', () => {
    DataManager.removeData();
    expect(DataManager.getData()).to.equal(null);
  });

  it('removes user', () => {
    DataManager.removeUser();
    expect(DataManager.getData()).to.equal(null);
  });

  it('gets user details', () => {
    expect(DataManager.getUserDetails().name).to.equal('test');
  });

  it('sets user details', () => {});

  it('gets daily overview', () => {});

  it('gets projects', () => {
    expect(DataManager.getProjects().length).to.equal(1);
  });

  it('gets project', () => {
    expect(DataManager.getProject(0)).exist;
  });

  it('adds project', () => {
    const mockData = {tasks:[]};
    DataManager.addProject(mockData);
    expect(DataManager.getProjects().length).to.equal(2);
  });

  it('edits project', () => {});

  it('removes project', () => {});

  it('gets max projects id', () => {});

  it('gets project name', () => {});

  it('share project', () => {});

  it('get tasks', () => {});

  it('get task', () => {});

  it('adds task', () => {
    const mockData = {projectId: 0};
    DataManager.addTask(mockData);
    expect(DataManager.getTasks(0).length).to.equal(1);
  });

  it('add working log', () => {});

  it('saves temporary working log', () => {});

  it('edits task', () => {});

  it('removes task', () => {});

  it('gets max tasks id', () => {});

  it('share task', () => {});
});

// Time Converter
describe('Time Converter', () => {
  it('gets todays date', () => {
    expect(TimeConverter.getTodaysDate().match(/\d{4}-\d{2}-\d{2}\ \d{2}:\d{2}:\d{2}/ig)).exist;
  });

  it('gets todays date without time', () => {
    expect(TimeConverter.getTodaysDateWithoutTime().match(/\d{4}-\d{2}-\d{2}/ig)).exist;
  });

  it('gets current time', () => {
    expect(TimeConverter.getCurrentTime()).exist;
  });

  it('gets time difference in seconds', () => {
    expect(TimeConverter.getTimeDifferenceInSeconds(TimeConverter.getCurrentTime())).to.equal(0);
  });

  it('gets seconds part', () => {
    // 20:10:05 = 72605 sec
    const time = 72605 ;
    expect(TimeConverter.getSecondsPart(time)).to.equal('05');
  });

  it('gets minutes part', () => {
    // 20:10:05 = 72605 sec
    const time = 72605 ;
    expect(TimeConverter.getMinutesPart(time)).to.equal('10');
  });

  it('gets hours part', () => {
    // 20:10:05 = 72605 sec
    const time = 72605 ;
    expect(TimeConverter.getHoursPart(time)).to.equal('20');
  });

  it('gets date part', () => {
    const dateAndTime = '1997-07-28 10:00:00'
    expect(TimeConverter.getDatePart(dateAndTime)).to.equal('1997-07-28');
  });

  it('gets year part', () => {
    const dateAndTime = '1997-07-28'
    expect(TimeConverter.getYearPart(dateAndTime)).to.equal(1997);
  });

  it('gets month part', () => {
    const dateAndTime = '1997-07-28'
    expect(TimeConverter.getMonthPart(dateAndTime)).to.equal(7);
  });

  it('gets day part', () => {
    const dateAndTime = '1997-07-28'
    expect(TimeConverter.getDayPart(dateAndTime)).to.equal(28);
  });

  it('gets money earned', () => {
    const pricePerHour = 10;
    const time = 36000; // 10 hours
    expect(TimeConverter.getMoneyEarned(time, pricePerHour)).to.equal(100);
  });
});

// Form Button Component
describe('Form Button Component', () => {
  it('properly renders button', () => {
    const formButton = shallow(<FormButton />);
    expect(formButton.find('button')).to.have.lengthOf(1);
  });

  it('rendered button is enabled', () => {
    const formButton = shallow(<FormButton needValidation={null}/>);
    expect(formButton.find('button').prop('disabled')).to.equal(false);
  });

  it('rendered button is disabled', () => {
    const formButton = shallow(<FormButton needValidation={{test: ''}}/>);
    expect(formButton.find('button').prop('disabled')).to.equal(true);
  });
});

// Overview
describe('Overview', () => {
  it('renders properly', () => {
    const container = shallow(<Overview/>);
    expect(container).exist;
  });

  it('has header', () => {
    const container = shallow(<Overview/>);
    expect(container.find(Header)).exist;
  });

  it('has footer navigation', () => {
    const container = shallow(<Overview/>);
    expect(container.find(FooterNavigation)).exist;
  });
  
});

// Add Project
describe('Add Project', () => {
  it('renders properly', () => {
    const container = shallow(<AddProject />);
    expect(container).exist;
  });

  it('has header', () => {
    const container = shallow(<AddProject />);
    expect(container.find(Header)).exist;
  });

  it('has add form', () => {
    const container = shallow(<AddProject />);
    expect(container.find(AddProjectForm)).exist;
  });

  it('has button', () => {
    const container = shallow(<AddProject />);
    expect(container.find(AddProjectForm).find(FormButton)).exist;
  });
});

// Edit Project
describe('Edit Project', () => {
  it('renders properly', () => {
    const container = shallow(<EditProject />);
    expect(container).exist;
  });

  it('has header', () => {
    const container = shallow(<EditProject />);
    expect(container.find(Header)).exist;
  });

  it('has add form', () => {
    const container = shallow(<EditProject />);
    expect(container.find(EditProjectForm)).exist;
  });

  it('has button', () => {
    const container = shallow(<EditProject />);
    expect(container.find(EditProjectForm).find(FormButton)).exist;
  });
});

// Project
describe('Project', () => {
  it('renders properly', () => {
    const container = shallow(<Project />);
    expect(container).exist;
  });

  it('has project details', () => {
    const container = shallow(<Project />);
    expect(container.find(ProjectDetails)).exist;
  });
});

// Projects
describe('Projects', () => {
  it('renders properly', () => {
    const container = shallow(<Projects />);
    expect(container).exist;
  });

  it('has at one project tile', () => {
    const mockData = {
      name: 'test',
      projects: [
        {id:0, tasks: []}
      ]
    };
    DataManager.setData(mockData);
    const container = shallow(<Projects />);
    expect(container.find(ProjectTile).length).to.equal(1);
  });
});

// Add Task
describe('Add Task', () => {
  it('renders properly', () => {
    const container = shallow(<AddTask />);
    expect(container).exist;
  });

  it('has header', () => {
    const container = shallow(<AddTask />);
    expect(container.find(Header)).exist;
  });

  it('has add form', () => {
    const container = shallow(<AddTask />);
    expect(container.find(AddTaskForm)).exist;
  });

  it('has button', () => {
    const container = shallow(<AddTask />);
    expect(container.find(AddTaskForm).find(FormButton)).exist;
  });
});

// Edit Task
describe('Edit Task', () => {
  it('renders properly', () => {
    const container = shallow(<EditTask />);
    expect(container).exist;
  });

  it('has header', () => {
    const container = shallow(<EditTask />);
    expect(container.find(Header)).exist;
  });

  it('has edit form', () => {
    const container = shallow(<EditTask />);
    expect(container.find(EditTaskForm)).exist;
  });

  it('has button', () => {
    const container = shallow(<EditTask />);
    expect(container.find(EditTaskForm).find(FormButton)).exist;
  });
});

// Task
describe('Task', () => {
  it('renders properly', () => {
    const container = shallow(<Task />);
    expect(container).exist;
  });

  it('has task details', () => {
    const container = shallow(<Task />);
    expect(container.find(TaskDetails)).exist;
  });

  it('has task timing', () => {
    const container = shallow(<Task />);
    expect(container.find(TaskTiming)).exist;
  });
});

// Tasks
describe('Tasks', () => {
  it('renders properly', () => {
    const container = shallow(<Tasks />);
    expect(container).exist;
  });
});

// Dashboard
describe('Dashboard', () => {
  it('renders properly', () => {
    const container = shallow(<Dashboard />);
    expect(container).exist;
  });
});

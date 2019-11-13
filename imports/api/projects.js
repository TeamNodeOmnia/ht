import { Mongo } from 'meteor/mongo';

// create a Mongo collection for our projects
Projects = new Mongo.Collection('projects');

export function insertProject(name, customer) {
  Projects.insert({ name, customer, createdAt: new Date() });
}

export function deleteProject(project) {
  Projects.remove(project._id);
}

export default Projects;


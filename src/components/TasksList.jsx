import { Center, Container, ScrollArea, SimpleGrid, Text } from "@mantine/core";
import React from "react";
import CompletedTask from "./CompletedTask";
import ActiveTask from "./ActiveTAsk";
import { HIGH, LOW, MEDIUM } from "../constants/priority";
import { ACTIVE, ALL, COMPLETED } from "../constants/completedStatus";

class TasksList extends React.Component {
  assignColorByPriority = (priority) => {
    if (priority === HIGH) {
      return "violet.3";
    }
    if (priority === MEDIUM) {
      return "indigo.2";
    }
    return "blue.1";
  };

  getActiveTasks = (tasks) => {
    return tasks.filter((task) => !task.isCompleted);
  };

  getCompletedTasks = (tasks) => {
    return tasks.filter((task) => task.isCompleted);
  };

  getHighPriorityTasks = (tasks) => {
    return tasks.filter((task) => task.priority === HIGH);
  };

  getMediumPriorityTasks = (tasks) => {
    return tasks.filter((task) => task.priority === MEDIUM);
  };

  getLowPriorityTasks = (tasks) => {
    return tasks.filter((task) => task.priority === LOW);
  };

  sortByPriority = (tasks) => {
    return tasks.sort((item1, item2) => {
      const priorityOrder = {
        high: 1,
        medium: 2,
        low: 3,
      };
      return priorityOrder[item1.priority] - priorityOrder[item2.priority];
    });
  };

  sortTasks = (tasks) => {
    const activeTasks = this.getActiveTasks(tasks);
    const completedTasks = this.getCompletedTasks(tasks);
    const sortedActiveByPriority = this.sortByPriority(activeTasks);
    return [...sortedActiveByPriority, ...completedTasks];
  };

  getTaskByPriority = (tasks, priority) => {
    return tasks.filter((task) => task.priority === priority);
  };

  filterActiveTasks = (tasks, priority) => {
    const activeTasks = this.sortByPriority(this.getActiveTasks(tasks));

    if (priority !== "") {
      return this.getTaskByPriority(activeTasks, priority);
    }

    return activeTasks;
  };

  filterTasks = (tasks) => {
    const { status, priority } = this.props.filter;

    if (!priority && status === ALL) {
      return this.sortTasks(tasks);
    }

    if (status === ACTIVE || status === ALL) {
      return this.filterActiveTasks(tasks, priority);
    }

    if (status === COMPLETED) {
      return this.getCompletedTasks(tasks);
    }
  };

  sortTasksByDueDate = (tasks) => {
    return tasks.sort(function (task1, task2) {
      return new Date(task1.dueDate) - new Date(task2.dueDate);
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.tasks !== this.props.tasks) {
      localStorage.setItem("tasks", JSON.stringify(this.props.tasks));
    }
  }

  render() {
    const { handleDelete, handleToggleIsCompleted, openEditForm, filter } =
      this.props;

    let tasks = this.props.tasks;

    if (filter.dueDate === true && filter.status !== COMPLETED) {
      tasks = this.sortTasksByDueDate(this.getActiveTasks(tasks));
    } else if (filter.dueDate === true && filter.status === COMPLETED) {
      tasks = this.sortTasksByDueDate(this.getCompletedTasks(tasks));
    } else {
      tasks = this.filterTasks(tasks);
    }

    return (
      <Container fluid mx="xl" p={"xl"}>
        <ScrollArea h={"47vh"} py={"xl"} auto="true">
          <SimpleGrid mx="xl" cols={1} verticalSpacing="lg">
            {tasks.length !== 0 ? (
              tasks.map((task) =>
                task.isCompleted ? (
                  <CompletedTask
                    key={task.id}
                    task={task}
                    handleDelete={handleDelete}
                    handleToggleIsCompleted={handleToggleIsCompleted}
                  />
                ) : (
                  <ActiveTask
                    task={task}
                    key={task.id}
                    assignColorByPriority={this.assignColorByPriority}
                    handleToggleIsCompleted={handleToggleIsCompleted}
                    openEditForm={openEditForm}
                    handleDelete={handleDelete}
                  />
                )
              )
            ) : (
              <Center>
                <Text size={"xl"} my={"xl"}>
                  NO TODOS
                </Text>
              </Center>
            )}
          </SimpleGrid>
        </ScrollArea>
      </Container>
    );
  }
}

export default TasksList;

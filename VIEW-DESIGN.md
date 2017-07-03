# Overview

This document details the actions the user can make on the view and also define the resulting behavior. At its core, the user should be able to do six things
* create a task with tags

* add a subtask

* marking a task as finished

* deleting unwanted tasks

* search and filter certain tasks


To accomplish this, the view should have two main modes: edit mode and idle mode.

Idle mode is the default mode. It only allows the user to view existing tasks, mark tasks as "finished", and search.

Edit mode enables all existing functions above.

There should be a small button for switching between these modes.
In edit mode, new buttons should appear for creation, deletion, and subtask addition. They should disappear when the user switches back to idle.

# Creating a task

A button should be present for creating a parent task. When pressed, the user will be required to give the task a name (untitled tasks should not exist). A date of creation will be assigned to the object and appear on the view.

An optional "due" date can be later implemented to the task.

Tags can also be added to a task(only during creation, for simplicity). This is for added functionality in searching.

# Adding subtasks

There should be a button below each parent task for subtask creation. Once the subtask is made, a list will start growing below the parent task. The list will grow as more subtasks are created until a finite length has been reached. Then a scroll wheel will appear to fit more subtasks.

## F u t u r e  S t u f f ~

#### Chained Subtasks
One possible feature to implement is a chained subtask, where the user should be able to create a subtask for an existing subtask. In terms of the view, a sub window should appear containing space for the whole chain of tasks to be viewed.

#### Dependent Subtasks

Dependent subtasks can be implemented later on in development. A dependent subtask can be a subtask for multiple parent tasks. For simplicity and clarity, the view should display the same dependent task under all respective parent tasks.

A method for creating dependent subtasks must be defined.

# Removal of a task

In cases where unwanted tasks are made and needed to be removed, there should be a button on the corner of the task for deletion. This is only possible in edit mode.

# Finishing a task

When a task is created, a check box appears to the left of the title. It can be marked anytime to indicate that it is finished. For a certain amount of time(before the page is reloaded?), the check mark can be undone. Although once the period has passed, the task should disappear from the view.

## F u t u r e  S t u f f ~

#### Finishing parent tasks with existing subtasks

If a subtask is made on a parental task, the check box should disappear and only reappear once all the subtasks are completed.

#### Finishing dependent subtasks

If a user marks a dependent subtask as "finished", then the check mark should appear on all instances of the subtask in and disappear for them as well.

# Searching and sorting

On the top of the window, there should be a search box for finding specific tasks by tags and title names. Alongside the search bar there should be a sorting option to organize the tasks by

* creation date

* finish date(tasks with null dates will be pushed to the back and sorted by creation date)

* tags? grouping similar tasks together.

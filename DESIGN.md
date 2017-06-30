# Features

- Todo tasks
  - Subtasks (dependencies)
  - Tags
- Timestamps on events
  - Create, finish, etc
  - Due dates
  - Sorting based on time

# Model

The fundamental thing is a `Task`
`Task`s have:

- A title
- A completion state
- A list of tags
- A list of dependent tasks
- Timestamps for events

# Concept

Immutable database
Changes have timestamps
All changes are stored, there are no real deletions

# Architecture

View component
Controller component
Persistence backend

Controller and persistence (model?) only talk to each other through messages, so that the persistence can later be moved out of the browser into a server, etc.

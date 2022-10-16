// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

contract TasksContract {
    uint256 public tasksCounter;

    struct Task {
        uint256 id;
        string title;
        string description;
        bool state; // true if done, else false
        uint256 createdAt;
        uint256 doneAt; // when task was made
    }

    mapping(uint256 => Task) public tasks;

    constructor() {
        createTask("task 1", "to do something");
    }

    // Events

    event NewTaskCreated(
        uint256 id,
        string title,
        string description,
        bool state,
        uint256 createdAt,
        uint256 doneAt
    );

    event StateToggled(uint256 id, bool state, uint256 doneAt);

    // Operations
    function createTask(string memory _title, string memory _description)
        public
    {
        tasksCounter++;
        tasks[tasksCounter] = Task(
            tasksCounter,
            _title,
            _description,
            false,
            block.timestamp,
            0
        );
        emit NewTaskCreated(
            tasksCounter,
            _title,
            _description,
            false,
            block.timestamp,
            0
        );
    }

    // Helpers
    function toggleState(uint256 _id) public {
        tasks[_id].state = !tasks[_id].state;
        tasks[_id].doneAt = block.timestamp;
        emit StateToggled(_id, tasks[_id].state, tasks[_id].doneAt);
    }
}

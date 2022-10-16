const TasksContract = artifacts.require("TasksContract");

contract("TaskContract", async () => {
  before(async () => {
    this.tasksContract = await TasksContract.deployed();
  });

  it("migrate deployed successfully", async () => {
    const address = this.tasksContract.address;

    assert.notEqual(address, null);
    assert.notEqual(address, undefined);
    assert.notEqual(address, 0x0);
    assert.notEqual(address, "");
  });

  it("Get Tasks list", async () => {
    const tasksCounter = await this.tasksContract.tasksCounter();
    const task = await this.tasksContract.tasks(tasksCounter);

    assert.equal(task.id.toNumber(), tasksCounter.toNumber());
    assert.equal(task.title, "task 1");
    assert.equal(task.description, "to do something");
    assert.equal(task.state, false);
    assert.equal(tasksCounter, 1);
  });

  it("Create new task", async () => {
    const title = "Practice web3";
    const description = "Learn some about solidity and Ethereum";
    const taskCreated = await this.tasksContract.createTask(title, description);

    const tasksCounter = await this.tasksContract.tasksCounter();
    const taskEvent = taskCreated.logs[0].args;
    assert.equal(tasksCounter, 2);
    assert.equal(taskEvent.id.toNumber(), 2);
    assert.equal(taskEvent.title, title);
    assert.equal(taskEvent.description, description);
    assert.equal(taskEvent.state, false);
  });

  it("Toggle task state", async () => {
    const tasksCounter = await this.tasksContract.tasksCounter();
    const id = tasksCounter.toNumber();

    const noToggledTask = await this.tasksContract.tasks(id);
    assert.equal(noToggledTask.state, false);

    const taskStateToggled = await this.tasksContract.toggleState(id);
    const taskEvent = taskStateToggled.logs[0].args;

    const toggledTask = await this.tasksContract.tasks(id);
    assert.equal(toggledTask.state, true);

    assert.equal(taskEvent.state, true);
    assert.equal(taskEvent.id, id);
  });
});

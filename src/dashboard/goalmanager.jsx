import React, { useState, useEffect } from 'react';

function GoalManager({ user }) {
  const [goals, setGoals] = useState([]);
  const [newGoalName, setNewGoalName] = useState('');
  const [newGoalValue, setNewGoalValue] = useState(0);
  const [displayError, setDisplayError] = useState(null);

  useEffect(() => {
    async function fetchGoals() {
      try {
        const response = await fetch(`/api/goals?email=${user}`);
        if (response.ok) {
          const data = await response.json();
          setGoals(data); // Update state with fetched goals
        } else {
          console.error('Failed to fetch goals');
        }
      } catch (error) {
        console.error('Error fetching goals:', error);
      }
    }

    fetchGoals();
  }, [user]); // Dependency array ensures this runs when the user email changes

  async function createGoal() {
    try {
      const response = await fetch('/api/goals', {
        method: 'POST',
        body: JSON.stringify({ name: newGoalName, goal: newGoalValue, email: user }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const newGoal = await response.json();
        setGoals([...goals, newGoal]); // Add the new goal to the state
      } else {
        const errorText = await response.text();
        console.error('Failed to create goal:', errorText);
        setDisplayError(`⚠ Error: ${response.status} - ${errorText}`);
      }
    } catch (error) {
      console.error('Error creating goal:', error);
      setDisplayError(`⚠ Error: ${error.message}`);
    }
  }

  async function removeGoal(id) {
    try {
      const response = await fetch(`/api/goals/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Filter out the deleted goal from the state
        setGoals(goals.filter((goal) => goal._id !== id));
      } else {
        const errorText = await response.text();
        console.error('Failed to delete goal:', errorText);
        setDisplayError(`⚠ Error: ${response.status} - ${errorText}`);
      }
    } catch (error) {
      console.error('Error deleting goal:', error);
      setDisplayError(`⚠ Error: ${error.message}`);
    }
  }

  return (
    <div className="col-md-6 col-lg-4 d-flex flex-column">
      <div className="bg-green p-4 rounded shadow-sm flex-grow-1 d-flex flex-column">
        <h2 className="text-center text-dark">Budgeting Goals</h2>
        {goals.map((goal) => (
          <div key={goal._id} className="goal mb-4 flex-grow-1">
            <h4 className="text-primary">{goal.name}</h4>
            <p>Goal: ${goal.goal}</p>
            <div className="progress" style={{ height: '20px' }}>
              <div
                className="progress-bar bg-success"
                style={{ width: `${(goal.progress / goal.goal) * 100}%` }}
              ></div>
            </div>
            <p>Progress: ${goal.progress} / ${goal.goal}</p>
            <button className="btn btn-danger" onClick={() => removeGoal(goal._id)}>Remove</button>
          </div>
        ))}
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Goal Name"
          value={newGoalName}
          onChange={(e) => setNewGoalName(e.target.value)}
        />
        <input
          type="number"
          className="form-control mb-2"
          placeholder="Goal Amount"
          value={newGoalValue}
          onChange={(e) => setNewGoalValue(e.target.value)}
        />
        <button className="btn btn-primary w-100 mt-auto" onClick={createGoal}>Add New Goal</button>
        {displayError && <div style={{ color: 'red' }}>{displayError}</div>}
      </div>
    </div>
  );
}

export default GoalManager;

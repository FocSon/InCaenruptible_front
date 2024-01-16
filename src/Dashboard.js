import React, { Component } from "react";



class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: {
        title: "",
        completion: "",
        type: "",
      },
      checkedTasks: {},
      taskList: [],
      taskListProhibited: [],
      activePenaltyList: [],
    };
  }

  

  
  render() {
    return (
      <>
        <main className="content">
          <h2>Coucou</h2>
        </main>
      </>
    );
  }
}

export default Dashboard;

import React, { Component } from 'react';
import axios from 'axios';


class Archive extends Component {


////////////////////////////
// Initialize state
////////////////////////////

  state = {
    data: [],
    filteredData: [],
    dataList: []
  }

////////////////////////////
// Load data
////////////////////////////

  refreshList() {
    setTimeout(() => {
      axios.get(
        'http://api.bcbhtech.com/users/archive',
        {headers: {
            "auth" : "2sx3SgceF2JK8DasoDYmngZ31SJaPmz2",
            "limit": 1,
            "offset": 0
          }
        }
      )
      .then((response) => {
          let data = response.data;
          console.log(data);
          this.setState({
            data: data,
            filteredData: data
          });
        }
      );
    }, 150);
  }

  componentDidMount() {
    this.refreshList();
  }


////////////////////////////
// Render app
////////////////////////////

  render() {
    let listData = this.state.filteredData;
    let list = listData.map((d) => <li key={d.id}><span className="list-item-left">{d.full_name}</span> | <span>{d.email_address}, {d.diagnosis} - {d.user_address}, {d.user_city}, {d.user_state} {d.user_zip} - Assigned to {d.owner} </span></li>);
    return (
    <div className="container">
        <h1>Welcome to the archives!</h1>
       <ul>
           {list}
       </ul>
    </div>
    );
}
}

////////////////////////////
// End render app
////////////////////////////

export default Archive;

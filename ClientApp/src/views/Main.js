import React, { Component } from 'react';
import axios from 'axios';


class Main extends Component {

  ////////////////////////////
  // Initialize state
  ////////////////////////////

  state = {
    data: [],
    formValue: {
      name: '',
      email: '',
      phone: '',
      diagnosis: '',
      address: '',
      city: '',
      state: '',
      zip: ''
    },
    editing: false,
    editID: '',
    editUser: {
      name: '',
      email: '',
      phone: '',
      diagnosis: '',
      address: '',
      city: '',
      state: '',
      zip: ''
    }
  }

  ////////////////////////////
  // Load data
  ////////////////////////////

  refreshList() {
    setTimeout(() => {
      axios.get(
        'https://api.bcbhtech.com:1313/users',
        {headers: {
            "auth" : "2sx3SgceF2JK8DasoDYmngZ31SJaPmz2"
          }
        }
      )
      .then((response) => {
          let data = response.data;
          this.setState({
            data: data
          });
        }
      );
    }, 150);
  }

  componentDidMount() {
    this.refreshList();
  }
 
  ////////////////////////////
  // Handle updates
  ////////////////////////////

  handleChange = (event) => {
    const {name, value} = event.target;
    this.setState( prevState => ({
      formValue: {
        ...prevState.formValue,
        [name]: value
      }
    }))
  }

  handleSubmit = (event) => {
    event.preventDefault();
      axios.post('https://api.bcbhtech.com:1313/users', {name: this.state.formValue.name, email: this.state.formValue.email, phone: this.state.formValue.phone, diagnosis: this.state.formValue.diagnosis}, 
      {headers: {
        "auth" : "2sx3SgceF2JK8DasoDYmngZ31SJaPmz2"
        }
      }
    ).then(
      this.setState({
        formValue: {
          name: '',
          email: '',
          phone: '',
          diagnosis: '',
          address: '',
          city: '',
          state: '',
          zip: ''
        }
      })
    ).then(
      this.refreshList()
    );
  }

  handleEdit = (event) => {
    axios.get(
      `https://api.bcbhtech.com:1313/users/${event.target.id}`,
      {headers: {
          "auth" : "2sx3SgceF2JK8DasoDYmngZ31SJaPmz2"
        }
      }
    )
    .then((response) => {
      let data = response.data;
      this.setState({
        editing: true,
        editID: data[0].id,
        editUser: {
          name: data[0].full_name,
          email: data[0].email_address,
          phone: data[0].phone_number,
          diagnosis: data[0].diagnosis,
          address: '',
          city: '',
          state: '',
          zip: ''
        }
      });
    }
  );
  }

  handleEditChange = (event) => {
    const {name, value} = event.target;
    this.setState( prevState => ({
      editUser: {
        ...prevState.editUser,
        [name]: value
      }
    }))
  }

  handleEditSubmit = (event) => {
    event.preventDefault();
    let editID = this.state.editID;
      axios.put(`https://api.bcbhtech.com:1313/${editID}`, {name: this.state.editUser.name, email: this.state.editUser.email, phone: this.state.editUser.phone, diagnosis: this.state.editUser.diagnosis}, 
      {headers: {
        "auth" : "2sx3SgceF2JK8DasoDYmngZ31SJaPmz2"
        }
      }
    ).then(
      this.setState({
        editing: false,
        editID: '',
        editUser: {
          name: '',
          email: '',
          phone: '',
          diagnosis: '',
          address: '',
          city: '',
          state: '',
          zip: ''
        }
      })
    ).then(
      this.refreshList()
    );
  }


  handleDelete = (ID) => {
      axios.delete(`https://api.bcbhtech.com:1313/${ID}`,
      {headers: {
        "auth" : "2sx3SgceF2JK8DasoDYmngZ31SJaPmz2"
        }
      }
    ).then(
      this.refreshList()
    );
  }



  ////////////////////////////
  // Render app
  ////////////////////////////
  render() {
  let list = this.state.data.map((d) => <li key={d.id}><span className="list-item-left">{d.full_name}</span> | <span>{d.email_address}, {d.diagnosis} - {d.user_address}, {d.user_city}, {d.user_state} {d.user_zip} </span><button id={d.id} onClick={this.handleEdit}>Edit</button> <button id={d.id} onClick={() => { if (window.confirm(`Are you sure you wish to delete ${d.full_name}?`)) this.handleDelete(d.id) } }>Delete</button></li>);
    if (this.state.editing === true) {
      return (
        <div className="container">
          <h1>I am the walrus</h1>
          <ul>
            {list}
          </ul>
          <h2>Edit user</h2>
          <form onSubmit={this.handleEditSubmit}>
            <label>
              Name:
              <input type="text" name="name" value={this.state.editUser.name} onChange={this.handleEditChange} />
            </label>
            <label>
              Email:
              <input type="text" name="email" value={this.state.editUser.email} onChange={this.handleEditChange} />
            </label>
            <label>
              Phone:
              <input type="text" name="phone" value={this.state.editUser.phone} onChange={this.handleEditChange} />
            </label>
            <label>
              Diagnosis:
              <input type="text" name="diagnosis" value={this.state.editUser.diagnosis} onChange={this.handleEditChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
      );
    } else {
      return (
        <div className="container">
          <h1>I am the walrus</h1>
          <ul>
            {list}
          </ul>
          <h2>Add a user</h2>
          <form onSubmit={this.handleSubmit}>
            <label>
              Name:
              <input type="text" name="name" value={this.state.formValue.name} onChange={this.handleChange} />
            </label>
            <label>
              Email:
              <input type="text" name="email" value={this.state.formValue.email} onChange={this.handleChange} />
            </label>
            <label>
              Phone:
              <input type="text" name="phone" value={this.state.formValue.phone} onChange={this.handleChange} />
            </label>
            <label>
              Diagnosis:
              <input type="text" name="diagnosis" value={this.state.formValue.diagnosis} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
      );
    }
  }
}

////////////////////////////
// End render app
////////////////////////////

export default Main;

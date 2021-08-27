import React, { Component } from "react";
import TableComponent from "./components/Table";
import { ToastContainer, toast } from 'react-toastify'
import Swal from 'sweetalert2';
import './App.css'
import Pagination from './components/Pagination';

class App extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
      usersData : [],
      addedUsersData : [],
      searchData : [],
      usersPerPage : 4,
      currentPage : 1,
      totalUsers : null
    }
  }

  async usersInfo(page){
    let data = await fetch(`https://reqres.in/api/users?page=${page}&per_page=${this.state.usersPerPage}`);
    data = await data.json();
    let arr = data.data;
    let addedUsers = this.state.addedUsersData.filter(user => {
      return user.isAddedByMe && user.onPage===page
    })
    let newArray = addedUsers.concat(arr)
    this.setState({
      usersData : newArray,
      totalUsers : data.total + addedUsers.length
    })
  }

  componentDidMount() {
    this.usersInfo()
  }

  modifiedDetails(userObject){
    let array = this.state.usersData
    let sameObjects = obj => obj.id === userObject.id;
    let index = array.findIndex(sameObjects)
    array.splice(index,1,userObject);
    this.setState({
      usersData : array
    })
    toast.success("Updated!",{
      autoClose: false
      })
  }

  addUser(userObject){
    let array = this.state.usersData;
    let addedUsersArray = this.state.addedUsersData;
    const totUsers = this.state.totalUsers;
    let similarEmail = array.find(user => user.email===userObject.email);
    if(!similarEmail){
      if(userObject.isAddedByMe){
        userObject['onPage'] = this.state.currentPage
        array.unshift(userObject)
        addedUsersArray.unshift(userObject)
        this.setState({
          usersData : array,
          addedUsersData : addedUsersArray,
          totalUsers : totUsers+1
        })
        
        toast.success('Added.', {
          autoClose: false
        })
      }
    }else{
      toast.error("Not added coz this Email is already taken.",{
        autoClose: false
      })
    }
  }

  deleteHandler(user){
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this data!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: "red",
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'User Data has been deleted :(',
          'success'
        )
        let array = this.state.usersData;
        let addedUsersArray = this.state.addedUsersData;
        let sameObjects = obj => obj.id === user.id;
        let index = array.findIndex(sameObjects);
        let indexOfAddedUsersArray = addedUsersArray.findIndex(sameObjects);
        array.splice(index,1);
        addedUsersArray.splice(indexOfAddedUsersArray,1);
        this.setState({
          usersData : array,
          addedUsersData : addedUsersArray
        })      
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'User data is safe :)',
          'error'
        )
      }
    })
  }

  searchUsers(usersArray){
    this.setState({
      searchData : usersArray
    })
  }

  paginate(pageNumber){
    this.usersInfo(pageNumber)
    this.setState({
      currentPage : pageNumber
    })
  }

  

  render() {
    const { usersData, totalUsers, usersPerPage } = this.state;

    
    return (
      <div className="App container">
        <TableComponent
          users = {usersData}
          searchUsers = {this.state.searchData}
          modifiedDetailsController={this.modifiedDetails.bind(this)}
          deleteHandlerController={this.deleteHandler.bind(this)}
          addUserController={this.addUser.bind(this)} 
          searchUsersController={this.searchUsers.bind(this)}
        />
        <Pagination usersPerPage={usersPerPage} totalusers={totalUsers} paginate={this.paginate.bind(this)}/>
        
        <ToastContainer/>
      </div>
    )
  }
}

export default App;

import React, { Component } from 'react'
import { Table , Button } from 'react-bootstrap'
import UserModal from './Modal';
import image from '../static/nouser.jpg'

class TableComponent extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            show : false,
            user : {}
        }
    }
    
    updateHandler(user){
        this.setState({
            show : true,
            user : user
        })
    }

    addUserModal(){
        let user= {
            first_name : '',
            last_name : '',
            email : '',
            avatar : image
        }
        this.setState({
            show : true,
            user : user
        })
    }


    closeHandler = () => {
        this.setState({
            show : false,
            user : {}
        })
    }

    closeAddUserHandler(){
        this.setState({
            addUserModalShow : false
        })
    }


    modifyUserDetails(userObject){
        let { modifiedDetailsController }= this.props;
        this.setState({
            show : false
        })
        modifiedDetailsController(userObject)
    }

    addUserDetails(userObject){
        let {addUserController} = this.props;
        this.setState({
            show : false
        })
        userObject['isAddedByMe'] = true
        addUserController(userObject)
    }

    searchUser(event){
        let {searchUsersController} = this.props;
        const {users} = this.props;
        let text = event.target.value.replace(/ /g,'')
        let searchValue = [text];
        let searchUsersArray = users.filter(user => {
            return user.first_name.indexOf(searchValue) > -1 || user.last_name.indexOf(searchValue) > -1 || user.email.indexOf(searchValue) > -1
        })
        if(text){
            searchUsersController(searchUsersArray)
        }else{
            searchUsersController(users)
        }
    }
    

    render() {
        let {users,searchUsers} = this.props;
        if(searchUsers && searchUsers.length>0){
            users = searchUsers
        }
        return (
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-4">
                            <input className="form-control mt-2" placeholder="Search users" onChange={this.searchUser.bind(this)}/>
                        </div>
                        <div className="col-4">
                            <h1>Table</h1>
                        </div>
                        <div className="col-4">
                            <Button className="btn btn-primary mt-2" onClick={() => this.addUserModal()}>Add user</Button>
                        </div>
                    </div>
                </div>
                
                <Table striped bordered hover variant="light" >
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Image</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map(user => (
                                <tr key={user.id}>
                                    <td>{user.first_name}</td>
                                    <td>{user.last_name}</td>
                                    <td>{user.email}</td>
                                    <td><img style={{width:'150px',height:'150px'}} src={user.avatar} alt="..."/></td>
                                    <td>
                                        <Button className="mx-1 btn-primary" onClick={() => this.updateHandler(user)}>
                                            Update
                                        </Button>
                                        <Button className="btn-danger" onClick={() => this.props.deleteHandlerController(user)}>
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
                {
                    this.state.show && (
                        <UserModal 
                            show={this.state.show} 
                            handleClose={this.closeHandler} 
                            user={this.state.user}
                            modifyUserDetailsControler={this.modifyUserDetails.bind(this)}
                            addUserDetailsControler={this.addUserDetails.bind(this)}
                        />
                    )

                }

            </>
        )
    }
}

export default TableComponent

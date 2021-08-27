import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { v4 as uuidv4 } from 'uuid';
import './Modal.css'


class UserModal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id : this.props.user.id,
            first_name : this.props.user.first_name,
            last_name : this.props.user.last_name,
            email : this.props.user.email,
            avatar : this.props.user.avatar,
            inputFirstNameCheck : true,
            inputLastNameCheck : true,
            inputEmailCheck : true,
            emailRegCheck : true
        }
        this.fileRef = React.createRef();
    }


    handleChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    inputChange = (event) => {
        if(event.target.value){
            if(event.target.name === 'first_name'){
                this.setState({
                    inputFirstNameCheck : true
                })
            }else if(event.target.name === 'last_name'){
                this.setState({
                    inputLastNameCheck : true
                })
            }else if(event.target.name === 'email'){
                this.setState({
                    inputEmailCheck : true
                })
                const reg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
                if(event.target.value.match(reg)){
                    this.setState({
                        emailRegCheck : true
                    })
                }else{
                    this.setState({
                        emailRegCheck : false
                    })
                }  
            }
        }
        else{
            if(event.target.name === 'first_name'){
                this.setState({
                    inputFirstNameCheck : false
                })
            }else if(event.target.name === 'last_name'){
                this.setState({
                    inputLastNameCheck : false
                })
            }else if(event.target.name === 'email'){
                this.setState({
                    inputEmailCheck : false,
                    emailRegCheck : true
                })
            }
        }
    }

    inputBlur = (event) => {
        if(!event.target.value){
            if(event.target.name === 'first_name'){
                this.setState({
                    inputFirstNameCheck : false
                })
            }else if(event.target.name === 'last_name'){
                this.setState({
                    inputLastNameCheck : false
                })
            }else if(event.target.name === 'email'){
                this.setState({
                    inputEmailCheck : false 
                })
                
            }
        }else{
            if(event.target.name === 'first_name'){
                this.setState({
                    inputFirstNameCheck : true
                })
            }else if(event.target.name === 'last_name'){
                this.setState({
                    inputLastNameCheck : true
                })
            }else if(event.target.name === 'email'){
                this.setState({
                    inputEmailCheck : true
                })
            }
        }
    }


    handleFileButton = () => {
        this.fileRef.current.click()
    }

    onFileChange = (event) => {
        const filePath = event.target.value;
        const allowedExtensions = 
            /(\.jpg|\.jpeg|\.png|\.gif)$/i;
        if (!allowedExtensions.exec(filePath)){
            toast.error("Invalid File Type",{autoClose:false})
        }else{
            this.setState({
                avatar : URL.createObjectURL(event.target.files[0])
            })
        } 
    }

    updateUser(updatedData){
        if(!updatedData.first_name){
            this.setState({
                inputFirstNameCheck : false
            })
        }else if(!updatedData.last_name){
            this.setState({
                inputLastNameCheck : false
            })
        }else if(!updatedData.email){
            this.setState({
                inputEmailCheck : false,
                emailRegCheck : true
            })
        }else{
            const reg = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
            if(updatedData.email.match(reg)){
                this.props.modifyUserDetailsControler(updatedData)
            }else{
                this.setState({
                    emailRegCheck : false
                })
            }   
        }
    }

    addUser(updatedData){
        if(!updatedData.first_name){
            this.setState({
                inputFirstNameCheck : false
            })
        }else if(!updatedData.last_name){
            this.setState({
                inputLastNameCheck : false
            })
        }else if(!updatedData.email){
            this.setState({
                inputEmailCheck : false,
                emailRegCheck : true
            })
        }else{
            const reg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
            if(updatedData.email.match(reg)){
                this.props.addUserDetailsControler(updatedData)
            }else{
                this.setState({
                    emailRegCheck : false
                })
            }   
        }
    }

    returnUpdatedData(){
        let updatedData
        if(this.state.id){
            updatedData = {
                id : this.state.id,
                first_name : this.state.first_name,
                last_name : this.state.last_name,
                email : this.state.email,
                avatar : this.state.avatar
            }
            return updatedData
        }else{
            updatedData = {
                id : uuidv4(),
                first_name : this.state.first_name,
                last_name : this.state.last_name,
                email : this.state.email,
                avatar : this.state.avatar
            }
            return updatedData
        }
    }

    render() {
        const {show, handleClose, user} = this.props;
        const {first_name, last_name, email, avatar}  = this.state;
        let updatedData = this.returnUpdatedData()
        
        return (
            <div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        {
                            this.state.id ? (<Modal.Title>{user.first_name}</Modal.Title>) :
                            (<Modal.Title>Add User</Modal.Title>)
                        }
                    
                    </Modal.Header>
                    <form>
                        <Modal.Body>
                                <div className="mb-3">
                                    <img className="rounded-circle" style={{width:'150px',height:'150px'}} src={avatar} alt="..."/><br/><br/>
                                    <input type="file" onChange={this.onFileChange} style={{display:'none'}} ref={this.fileRef}/>
                                    <Button variant="primary" onClick={this.handleFileButton}>Change Pic</Button>
                                </div>
                                
                                <div className="mb-3">
                                    <label className="form-label">First Name</label>
                                    <input className="form-control" name="first_name" value={first_name} onInput={this.inputChange} onBlur={this.inputBlur} onChange={this.handleChange} autoComplete="off"/>
                                    {
                                        this.state.inputFirstNameCheck ? 
                                        (<div></div>) : 
                                        (<div className="errorMsgStyle">Required<sup>*</sup></div>)
                                    }
                                    
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Last Name</label>
                                    <input className="form-control" name="last_name" value={last_name} onInput={this.inputChange} onBlur={this.inputBlur} onChange={this.handleChange} autoComplete="off"/>
                                    {
                                        this.state.inputLastNameCheck ? 
                                        (<div></div>) : 
                                        (<div className="errorMsgStyle">Required<sup>*</sup></div>)
                                    }
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input className="form-control" name="email" value={email} onInput={this.inputChange} onBlur={this.inputBlur} onChange={this.handleChange} autoComplete="off"/>
                                    {
                                        this.state.inputEmailCheck ? 
                                        (<div></div>) : 
                                        (<div className="errorMsgStyle">Required<sup>*</sup></div>)
                                    }
                                    {
                                        this.state.emailRegCheck ? 
                                        (<div></div>) : 
                                        (<div className="errorMsgStyle">Please provide valid email</div>)
                                    }
                                </div>

                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>

                        {
                            this.state.id ? 
                            (<Button variant="primary" onClick={() => this.updateUser(updatedData)}>
                                Save Changes
                                </Button>) : 
                                (<Button variant="primary" onClick={() => this.addUser(updatedData)}>
                                    Add
                                </Button>)
                        }
                        
                        </Modal.Footer>
                    </form>
                </Modal>
                
            </div>
        )
    }
}

export default UserModal

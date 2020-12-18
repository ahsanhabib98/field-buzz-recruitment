import React, {Fragment} from "react";
import axios from "axios";
import {Alert, Button, Form} from "react-bootstrap";
import  { Redirect } from 'react-router-dom';

import {infoURL, cvUploadURL} from "../constants";
import {connect} from "react-redux";

class InfoForm extends React.Component {
    state = {
      name: "",
      email: "",
      phone: "",
      full_address: "",
      name_of_university: "",
      graduation_year: "",
      cgpa: "",
      experience_in_months: "",
      current_work_place_name: "",
      applying_in: "",
      expected_salary: "",
      field_buzz_reference: "",
      github_project_url: "",
      cv_file: "",
      errors: {},
      formValid: true,
      tsync_id: ''
    };

    componentDidMount() {
      if(!this.props.isAuthenticated) {
        this.props.history.push('/login')
      }
    };

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    handleFIle = e => {
        this.setState({
            [e.target.name]: e.target.files[0]
        })
    };

    handleValidation(){
            let data = this.state;
            let errors = {};
            let formIsValid = true;

            //Name
            if(data.name.length>256){
               formIsValid = false;
               errors["name"] = "Max length 256";
            }

            //Email
            if(data.email.length>256){
               formIsValid = false;
               errors["email"] = "Max length 256";
            }

            if(typeof data.email !== "undefined"){
               let lastAtPos = data["email"].lastIndexOf('@');
               let lastDotPos = data["email"].lastIndexOf('.');

               if (!(lastAtPos < lastDotPos && lastAtPos > 0 && data["email"].indexOf('@@') === -1 && lastDotPos > 2 && (data["email"].length - lastDotPos) > 2)) {
                  formIsValid = false;
                  errors["email"] = "Email is not valid";
                }
           }

           //Phone
            if(data.phone.length>14){
               formIsValid = false;
               errors["phone"] = "Max length 14";
            }

            //Full address
            if(data.full_address.length>512){
               formIsValid = false;
               errors["full_address"] = "Max length 512";
            }

            //Name of university
            if(data.name_of_university.length>256){
               formIsValid = false;
               errors["name_of_university"] = "Max length 256";
            }

            //Graduation year
            if(data.graduation_year>2020){
               formIsValid = false;
               errors["graduation_year"] = "Max is 2020";
            }

            if(data.graduation_year<2015){
               formIsValid = false;
               errors["graduation_year"] = "Min is 2015";
            }

            //Cgpa
            if(data.cgpa>4){
               formIsValid = false;
               errors["cgpa"] = "Max is 4";
            }

            if(data.cgpa<2){
               formIsValid = false;
               errors["cgpa"] = "Min is 2";
            }

            //Experience in months
            if(data.experience_in_months>100){
               formIsValid = false;
               errors["experience_in_months"] = "Max is 100";
            }

            if(data.experience_in_months<0){
               formIsValid = false;
               errors["experience_in_months"] = "Min is 0";
            }

            //Current work place name
            if(data.current_work_place_name.length>256){
               formIsValid = false;
               errors["current_work_place_name"] = "Max length 256";
            }

            //Expected salary
            if(data.expected_salary>60000){
               formIsValid = false;
               errors["expected_salary"] = "Max is 60000";
            }

            if(data.expected_salary<15000){
               formIsValid = false;
               errors["expected_salary"] = "Min is 15000";
            }

            //Field buzz reference
            if(data.field_buzz_reference.length>256){
               formIsValid = false;
               errors["field_buzz_reference"] = "Max length 256";
            }

            //Github project url
            if(data.github_project_url.length>512){
               formIsValid = false;
               errors["github_project_url"] = "Max length 512";
            }

           this.setState({errors: errors});
           if (!formIsValid) {
             this.setState({formValid: false});
           }
           return formIsValid;
       };

    handleFormSubmit = async (e) => {
      e.preventDefault();
      if (this.handleValidation()) {
        console.log("Form submitted");

        const form_data = {...this.state}
        delete form_data.cv_file
        delete form_data.errors
        delete form_data.formValid
        delete form_data.tsync_id

        let contentType = {}
        contentType = {
          headers: {
              'content-type': 'application/json'
          }}
        await axios.post(infoURL, form_data, contentType)
          .then(res => {
            if (res.status === 201) {
              this.setState({
                  tsync_id: res.data.cv_file.tsync_id
              })
            }
          })

        let contentType1 = {}
        contentType1 = {
          headers: {
              'content-type': 'multipart/form-data'
          }}
        let form_data1 = new FormData();
        form_data1.append('cv_file', this.state.cv_file, this.state.cv_file.name);
        await axios.put(cvUploadURL(this.state.tsync_id), form_data1, contentType1)
          .then(res => {
            if (res.status === 201) {
            }
          })
        this.props.history.push('/message');
      }
    };

    render() {
        return (
            <Fragment>
                <Form encType="multipart/form-data" onSubmit={(e) => this.handleFormSubmit(e)}>
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Name"
                            name="name"
                            onChange={this.handleChange}
                            value={this.state.name}
                        />
                        {this.state.errors["name"] && (
                          <Alert variant="danger">{this.state.errors["name"]}</Alert>
                        )}
                    </Form.Group>

                    <Form.Group controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            required
                            type="email"
                            placeholder="Email"
                            name="email"
                            onChange={this.handleChange}
                            value={this.state.email}
                        />
                        {this.state.errors["email"] && (
                          <Alert variant="danger">{this.state.errors["email"]}</Alert>
                        )}
                    </Form.Group>

                    <Form.Group controlId="phone">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Phone"
                            name="phone"
                            onChange={this.handleChange}
                            value={this.state.phone}
                        />
                        {this.state.errors["phone"] && (
                          <Alert variant="danger">{this.state.errors["phone"]}</Alert>
                        )}
                    </Form.Group>

                    <Form.Group controlId="full_address">
                        <Form.Label>Full address</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Full address"
                            name="full_address"
                            onChange={this.handleChange}
                            value={this.state.full_address}
                        />
                        {this.state.errors["full_address"] && (
                          <Alert variant="danger">{this.state.errors["full_address"]}</Alert>
                        )}
                    </Form.Group>

                    <Form.Group controlId="name_of_university">
                        <Form.Label>Name of university</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Name of university"
                            name="name_of_university"
                            onChange={this.handleChange}
                            value={this.state.name_of_university}
                        />
                        {this.state.errors["name_of_university"] && (
                          <Alert variant="danger">{this.state.errors["name_of_university"]}</Alert>
                        )}
                    </Form.Group>

                    <Form.Group controlId="graduation_year">
                        <Form.Label>Graduation year</Form.Label>
                        <Form.Control
                            required
                            type="number"
                            placeholder="Graduation year"
                            name="graduation_year"
                            onChange={this.handleChange}
                            value={this.state.graduation_year}
                        />
                        {this.state.errors["graduation_year"] && (
                          <Alert variant="danger">{this.state.errors["graduation_year"]}</Alert>
                        )}
                    </Form.Group>

                    <Form.Group controlId="cgpa">
                        <Form.Label>Cgpa</Form.Label>
                        <Form.Control
                            type="number"
                            step="0.01"
                            placeholder="Cgpa"
                            name="cgpa"
                            onChange={this.handleChange}
                            value={this.state.cgpa}
                        />
                        {this.state.errors["cgpa"] && (
                          <Alert variant="danger">{this.state.errors["cgpa"]}</Alert>
                        )}
                    </Form.Group>

                    <Form.Group controlId="experience_in_months">
                        <Form.Label>Experience in months</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Experience in months"
                            name="experience_in_months"
                            onChange={this.handleChange}
                            value={this.state.experience_in_months}
                        />
                        {this.state.errors["experience_in_months"] && (
                          <Alert variant="danger">{this.state.errors["experience_in_months"]}</Alert>
                        )}
                    </Form.Group>

                    <Form.Group controlId="current_work_place_name">
                        <Form.Label>Current work place name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Current work place name"
                            name="current_work_place_name"
                            onChange={this.handleChange}
                            value={this.state.current_work_place_name}
                        />
                        {this.state.errors["current_work_place_name"] && (
                          <Alert variant="danger">{this.state.errors["current_work_place_name"]}</Alert>
                        )}
                    </Form.Group>

                    <Form.Group controlId="applying_in">
                        <Form.Label>Applying in</Form.Label>
                        <Form.Control as="select" name="applying_in" required onChange={this.handleChange}>
                          <option value="Mobile">Mobile</option>
                          <option value="Backend">Backend</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="expected_salary">
                        <Form.Label>Expected salary</Form.Label>
                        <Form.Control
                            required
                            type="number"
                            placeholder="Expected salary"
                            name="expected_salary"
                            onChange={this.handleChange}
                            value={this.state.expected_salary}
                        />
                        {this.state.errors["expected_salary"] && (
                          <Alert variant="danger">{this.state.errors["expected_salary"]}</Alert>
                        )}
                    </Form.Group>

                    <Form.Group controlId="field_buzz_reference">
                        <Form.Label>Field buzz reference</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Field buzz reference"
                            name="field_buzz_reference"
                            onChange={this.handleChange}
                            value={this.state.field_buzz_reference}
                        />
                        {this.state.errors["field_buzz_reference"] && (
                          <Alert variant="danger">{this.state.errors["field_buzz_reference"]}</Alert>
                        )}
                    </Form.Group>

                    <Form.Group controlId="github_project_url">
                        <Form.Label>Github project url</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Github project url"
                            name="github_project_url"
                            onChange={this.handleChange}
                            value={this.state.github_project_url}
                        />
                        {this.state.errors["github_project_url"] && (
                          <Alert variant="danger">{this.state.errors["github_project_url"]}</Alert>
                        )}
                    </Form.Group>

                    <Form.Group controlId="cv_file">
                        <Form.Label>Cv file</Form.Label>
                        <Form.Control
                            required
                            type="file"
                            name="cv_file"
                            accept="cv_file/pdf"
                            onChange={this.handleFIle}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                    {!this.state.formValid && (
                      <Alert variant="danger">Your form data is not valid. Plz check your input error message.</Alert>
                    )}
                </Form>
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.token !== null
    }
}

export default connect(mapStateToProps, null)(InfoForm);
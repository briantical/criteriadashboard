import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import SpringSpinner from '@bit/bondz.react-epic-spinners.spring-spinner';

//Import created components
import { secureStorage, pusher } from '../../../../../../utils';
import { 
    setErrorMessage, 
    addNewCategory, 
    removeCategory,
    setCategories, 
    setModalVisibility, 
    showLoadingSpinner
} from '../../../../../../actions';
import Listings from './Listing/Listings';
import { addcategorymodal } from '../../../../../../constants/modals';

//import the css file
import './Categories.css';


export class Categories extends Component {

    constructor(props){
        super(props)
        this.getCategories();
    }

    componentDidMount(){
        this.channel = pusher.subscribe('categories');
        this.channel.bind('inserted', this.insertCategory);
        this.channel.bind('deleted', this.deleteCategory);
    }

    insertCategory = (category) =>{
        this.props.addNewCategory(category.category);
    }

    deleteCategory = (category) =>{
        this.props.removeCategory(category);
    }

    showAddModal = () =>{
        let addNewCategory = (...arg) =>this.addCategory(...arg)
        this.props.setModalVisibility(true,addcategorymodal,{addNewCategory})
    }

    getCategories = () =>{
        this.props.showLoadingSpinner(true);
        let headers = {
            'Authorization': 'Bearer ' + secureStorage.getItem('token').token
        }

        axios.get(
            `${process.env.REACT_APP_URL}/api/v1/category/`,
            {headers},
        ).then((response) => {
            const { categories } = response.data;
            this.props.setCategories(categories);
            // reset the error message  
            let errorMessage = {message: "", show: false};
            this.props.setErrorMessage(errorMessage);
            this.props.showLoadingSpinner(false)
        }).catch((error) => {
            console.log(error)
            this.props.showLoadingSpinner(false)
            let message = error.response.data.message;
            let show = true;
            let theError = {message,show}
            this.props.setErrorMessage(theError);
        });
    }

    addCategory = (categoryfields) =>{
        const{ name, description } = categoryfields;
        let data = {
            name,
            description,
        };

        let options = {
            responseType: "json",
        }

        let headers = {
            'Authorization': 'Bearer ' + secureStorage.getItem('token').token
        }

        axios.post(
            `${process.env.REACT_APP_URL}/api/v1/category/`,
            data,
            {headers},
            options
        ).then(() => {
            console.log('Successfully added')

            // reset the error message  
            let errorMessage = {message: "", show: false};
            this.props.setErrorMessage(errorMessage);
            this.props.showLoadingSpinner(false);
        }).catch((error) => {
            console.log(error)
            let message = error.response.data.message;
            let show = true;
            let theError = {message,show}
            this.props.setErrorMessage(theError);
            this.props.showLoadingSpinner(false);
        });
    }

    removeCategory = (event) =>{
        let options = {
            responseType: "json",
        }

        let headers = {
            'Authorization': 'Bearer ' + secureStorage.getItem('token').token
        }

        axios.delete(
            `${process.env.REACT_APP_URL}/api/v1/category/${event.target.id}`,
            {headers},
            options
        ).then(() => {
            // reset the error message  
            let errorMessage = {message: "", show: false};
            this.props.setErrorMessage(errorMessage);
        }).catch((error) => {
            console.log(error)
            let message = error.response.data.message;
            let show = true;
            let theError = {message,show}
            this.props.setErrorMessage(theError);
        });
    }

    handleSubmit = (event) =>{
        event.preventDefault();
        if(!event.target.checkValidity()){
          let message="";
          let show=true;
          this.props.setErrorMessage({message,show});
          return;
        }
        const form = event.target;
        const data = new FormData(form);

        this.props.showLoadingSpinner(true)
    
        let name = data.get('name');
        let description = data.get('description');
        
        this.addCategory({name,description });
    }

    render() {
        const { categories, spinner,errorMessage } = this.props;
        
        return (
            <div className="categories">
                <div className="addcategory">
                    <form
                        onSubmit={this.handleSubmit} 
                        noValidate 
                        className={errorMessage.show ? 'displayErrors' : ''}
                    >
                        <table>
                            <tbody>
                                <tr>
                                    <td>NAME:</td>
                                    <td><input type="text" id="name" name="name"  autoComplete="off" required/></td>
                                </tr>
                                <tr>
                                    <td>DESCRIPTION:</td>
                                    <td><input type="text" id="description" name="description" autoComplete="off" required/></td>
                                </tr>
                            </tbody>
                        </table>
                        {spinner ? <SpringSpinner color='#000000' size={parseInt('20')}/> : <button>ADD</button>}
                    </form>
                </div>
                <div className="categories_list">
                    {
                        spinner ?
                        <SpringSpinner color='#000000' size={parseInt('20')}/> :
                        categories.map((category) => <Listings category={category} key={category._id} removeCategory={this.removeCategory} editCategory={this.editCategory}/>)
                    }
                </div>
            </div>  
        )
    }
}

const mapStateToProps = (state) => {
    const {errorMessage, categories,  spinner} = state;
    return { errorMessage, categories, spinner };
}

const mapDispatchToProps = {
    setErrorMessage,
    addNewCategory,
    removeCategory,
    setCategories,
    setModalVisibility,
    showLoadingSpinner
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
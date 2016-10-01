import React, { Component } from 'react'
import addSearch from '../actions/addSearch'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { RadioButton } from 'material-ui/RadioButton'
import MenuItem from 'material-ui/MenuItem'
import { AutoComplete as MUIAutoComplete } from 'material-ui'
import FlatButton from 'material-ui/FlatButton';
import {yellow600, yellow200, blue200, blue500} from 'material-ui/styles/colors';
import {
 AutoComplete,
 TextField,
 Toggle
} from 'redux-form-material-ui'

const styles = {
  errorStyle: {
    color: yellow600,
  },
  underlineStyle: {
    borderColor: blue500,
  },
  floatingLabelStyle: {
    color: yellow600,
  },
  floatingLabelFocusStyle: {
    color: blue500,
  },
  radio:{
    fill: yellow600,
  },
  toggle:{
    color: yellow600,
  },
  label:{
    color:'#fff',
    letterSpacing: '0.1em'
  }
};

 const validate = values => {
 const errors = {}
 const requiredFields = [ 'query', 'limit' ]
 requiredFields.forEach(field => {
   if (!values[ field ]) {
     errors[ field ] = 'Required'
   }
 })
 return errors
}

class Form extends Component {

scrollUp(){
  parent = document.getElementsByClassName("aside")[0]
  element = document.getElementById('results')
  parent.animate({ scrollTop: element.offset().top - parent.offset().top }, { duration: 'slow', easing: 'swing'});

  document.getElementById('results').scrollIntoView({block: 'end', behavior: 'smooth'})
  setTimeout(scrollUp, 40);
}

 onSubmit(data) {
   event.preventDefault()
   var {query} = data
   this.props.addSearch({query})
   this.scrollUp()
 }

 componentDidMount() {
   this.refs.query           // the Field
     .getRenderedComponent() // on Field, returns ReduxFormMaterialUITextField
     .getRenderedComponent() // on ReduxFormMaterialUITextField, returns TextField
 }


 render() {
   const { handleSubmit, pristine, reset, submitting } = this.props
   return (
     <form className='yelp-form' onSubmit={handleSubmit(data => this.onSubmit(data))}>
     <div>
       <Field
       name="query"
       component={TextField}
       filter={MUIAutoComplete.fuzzyFilter}
       hintText="Try 'Pizza' or 'Starbucks'!"
       floatingLabelText="WHAT ARE YOU IN THE MOOD FOR?"
       ref="query"
       withRef
       hintStyle={styles.hintStyle}
       errorStyle={styles.errorStyle}
       underlineStyle={styles.underlineStyle}
       underlineFocusStyle={styles.underlineFocusStyle}
       />
     </div>
     <br/>

     <FlatButton type='submit' label="FIND PLACES!" backgroundColor={blue500} labelStyle={styles.label}	hoverColor={yellow200} /> &nbsp; &nbsp; &nbsp;
     <FlatButton onClick={reset} label="CLEAR FORM" backgroundColor={yellow600} labelStyle={styles.label}	hoverColor={blue200} />

   </form>
   )
 }
}



function mapDispatchToProps(dispatch) {
  return bindActionCreators({addSearch}, dispatch)
}

var SmartYelpForm = reduxForm({
 form: 'YelpForm',
   initialValues: {
     sortBy: 0
   },
 validate
})(Form)

export default connect(null, mapDispatchToProps)(SmartYelpForm)

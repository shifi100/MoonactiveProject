// import React, { Component } from 'react';
// import { Link, withRouter } from 'react-router-dom';
// import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
// import AppNavbar from './AppNavbar';

// class CustomerEdit extends Component {


// emptyPromotion=[];
   
//   constructor(props) {
//     super(props);
//     this.state = {
//       item: this.emptyPromotion
//     };
//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   async componentDidMount() {


//     // need to call get /api/promotion/:id and to put on state

//     if (this.props.match.params.id !== 'new') {
//       const promotion = await (await fetch(`/api/promotiion/:id`)).json();
//       this.setState({item: promotion});
//     }
//   }

//   handleChange(event) {
//     const target = event.target;
//     const value = target.value;
//     const name = target.name;
//     let item = {...this.state.item};
//     item[name] = value;
//     this.setState({item});
//   }

//   async handleSubmit(event) {


//     // need to call update /api/promotion
  
//         await fetch(`/api/promotion`, {
//           method: 'UPDATE',
//           headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//           }
//         }).then(() => {
//           console.log("Update Done!");
//           let updatedPromotions = [...this.state.promotionsLines].filter(i => i._id !== id);
//           this.setState({promotionsLines: updatedPromotions});
//         });
     
//     event.preventDefault();
//     const {item} = this.state;

//     await fetch('/api/promotion', {
//       method: (item._id) ? 'PUT' : 'POST',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(item),
//     });
//     this.props.history.push('/promotions');
//   }

//   render() {
//     const {item} = this.state;
//     const title = <h2>{item.id ? 'Edit promotion' : 'Add promotion'}</h2>;

//     return <div>
//       <AppNavbar/>
//       <Container>
//         {title}
//         <Form onSubmit={this.handleSubmit}>

//          {Object.keys(item).map(function(value) {
//                 if(value != 'id') {
//                   <FormGroup>
//                     <Label for={value}>{value}</Label>
//                     <Input type="text" name={value} id={value} value={item[value] || ''}
//                           onChange={this.handleChange} autoComplete={value}/>
//                   </FormGroup>
//                 }
//             })}
//           {/* <FormGroup>
//             <Label for="firstname">Firstname</Label>
//             <Input type="text" name="firstname" id="firstname" value={item.firstname || ''}
//                    onChange={this.handleChange} autoComplete="firstname"/>
//           </FormGroup>
//           <FormGroup>
//             <Label for="lastname">Lastname</Label>
//             <Input type="text" name="lastname" id="lastname" value={item.lastname || ''}
//                    onChange={this.handleChange} autoComplete="lastname"/>
//           </FormGroup>          
//           <FormGroup>
//             <Label for="age">Age</Label>
//             <Input type="text" name="age" id="age" value={item.age || ''}
//                    onChange={this.handleChange} autoComplete="age"/>
//           </FormGroup>
//           <FormGroup>
//             <Label for="address">Address</Label>
//             <Input type="text" name="address" id="address" value={item.address || ''}
//                    onChange={this.handleChange} autoComplete="address"/>
//           </FormGroup> */}
//           <FormGroup>
//             <Button color="primary" type="submit">Save</Button>{' '}
//             <Button color="secondary" tag={Link} to="/customers">Cancel</Button>
//           </FormGroup>
//         </Form>
//       </Container>
//     </div>
//   }
// }

// export default withRouter(CustomerEdit);
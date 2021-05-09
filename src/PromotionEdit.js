import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

class PromotionEdit extends Component {


emptyPromotion=[];
   
  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyPromotion
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
      const promotion = await (await fetch(`/api/promotion/${this.props.match.params.id}`)).json();
      this.setState({item: promotion});
  }
 

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = {...this.state.item};
    item[name] = value;
    this.setState({item});
  }

  async handleSubmit(event) {
    event.preventDefault();
    const {item} = this.state;

    await fetch(`/api/promotion`, {
        method: 'PUT',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({promotionData :item}),
    }).then(() => {
        console.log("Update Done!");
    });
    this.props.history.push('/');
  }

  render() {
    const {item} = this.state;
    const title = <h2>Edit promotion</h2>;

    return <div>
      <AppNavbar/>
      <Container>
        {title}
        <Form onSubmit={this.handleSubmit}>
        {Object.keys(item).map((value)=> {
            if(value != "_id" && value != "__v"){
              return <FormGroup>
                  <Label for={value}>{value}</Label>
                  <Input type="text" name={value} id={value} value={item[value] || ''}
                      onChange={this.handleChange} autoComplete={value}/>
              </FormGroup>
            }
        })}
          <FormGroup>
            <button  type="submit">Save</button>{' '}
            <button  tag={Link} to="/">Cancel</button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  }
}

export default withRouter(PromotionEdit);
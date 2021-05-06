import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

class PromotionList extends Component {
  
  pageNumber = 1;
  constructor(props) {
    super(props);
    this.state = {promotionsColumns: [], promotionsLines: [], isLoading: true};
    this.remove = this.remove.bind(this);
    this.create = this.create.bind(this);
    this.firstEvent = this.firstEvent.bind(this);
    

  }

  componentDidMount() {
    this.setState({isLoading: true});

    fetch('api/promotionsColumns')
      .then(response => response.json())
      .then(data => this.setState({promotionsColumns: data, isLoading: false}));

    this.getPromotionLines();
  }
  async remove(id) {
    await fetch(`/api/promotion/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      console.log("Remove Done!");
      let updatedPromotions = [...this.state.promotionsLines].filter(i => i._id !== id);
      this.setState({promotionsLines: updatedPromotions});
    });
  }

  async create(id) {
    let promotion = [...this.state.promotionsLines].filter(i => i._id == id);
    delete promotion[0]._id
    const newPromtion = {
      promotionData: promotion[0]
    }
    await fetch(`/api/promotions`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newPromtion),
    }).then(async (data) => {
      console.log("Create Done!");
      console.log(data.body)
      await fetch(`/api/promotions?page=1`)
      .then(response => response.json())
      .then(data => this.setState({promotionsLines: data}));
    });
  }
  
  
  

  firstEvent(e) {
		var bottom = e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight < 50;
		if(bottom){
        this.pageNumber = this.pageNumber+1;
        this.getPromotionLines();
       
         }
         
         
         var lastScrollTop = 0;
      var st = window.pageYOffset|| document.documentElement.scrollTop;
      if (st < lastScrollTop){
        console.log("up");
     } else {
        console.log("down");
     }
     lastScrollTop = st <= 0 ? 0 : st; 

     
     
   
      
  }

  async getPromotionLines(){
    await fetch(`api/promotions?page=${this.pageNumber}`)
    .then(response => response.json())
    .then(data => {
      if(this.pageNumber > 1) {
        let arr = [...this.state.promotionsLines, ...data];
        this.setState({promotionsLines: arr});

      } else {
          this.setState({promotionsLines: data})
      }
    });  
}
  
async generatePromotions(){
  await fetch(`/api/generatePromotion`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  }).then(async (data) => {
    this.pageNumber = 1;
    await fetch(`/api/promotions?page=1`)
    .then(response => response.json())
    .then(data => this.setState({promotionsLines: data}));
  });
}


  render() {
    const {promotionsColumns,promotionsLines, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }
    const promotionList = promotionsColumns;

    return (
      <div className="promotionPage" >
        <AppNavbar/>
        <Container fluid>
          <div className="float-right">
            <Button color="success" onClick={() => this.generatePromotions()}>Generate Promotions</Button>
          </div>
          <h3>Promotion List</h3>
          <div onScroll={this.firstEvent} className="promotionTable">
            <Table className="mt-4">
              <thead>
                <tr>
                <th width="20%">checkbox</th>
                  {Object.keys(promotionList).map(function(value) {
                    return <th width="20%">
                    {value}
                    </th>
                  })}
                  <th width="10%">Actions</th>
                </tr>
              </thead>
              <tbody>
                {promotionsLines.map((item) => 
                    <tr>
                      <td width="20%"></td>
                      {Object.keys(item).map(function(value) {
                        if(value != '_id') {
                          return <td width="20%" >
                          {item[value]}
                          </td>
                        }
                    })}
                      <ButtonGroup>
                          <Button size="sm" color="primary" tag={Link} to={"/promotion/" + item["_id"]}>Edit</Button>
                          <Button size="sm" color="danger" onClick={() => this.create(item["_id"])}>Duplicate</Button>
                          <Button size="sm" color="primary" onClick={() => this.remove(item["_id"])}>Delete</Button>
                      </ButtonGroup>
                    </tr>
                  )}
              </tbody>
            </Table>
          </div>
        </Container>
      </div>
    );
  }
}

export default PromotionList;
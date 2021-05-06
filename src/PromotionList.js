import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

class PromotionList extends Component {

  pageNumber = 1;
  lastScrollTop = 0;
  totalPages = 0;
  constructor(props) {
    super(props);
    this.state = { promotionsColumns: [], promotionsLines: [], isLoading: true };
    this.remove = this.remove.bind(this);
    this.create = this.create.bind(this);
    this.firstEvent = this.firstEvent.bind(this);
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    fetch('api/promotionsColumns')
      .then(response => response.json())
      .then(data => this.setState({ promotionsColumns: data, isLoading: false }));

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
      this.setState({ promotionsLines: updatedPromotions });
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
      this.pageNumber = 1;
      await this.getPromotionLines();
    });
  }

  firstEvent(e) {
    var bottom = e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight < 50;
    if (bottom&&this.pageNumber<this.totalPages) {
      this.pageNumber = this.pageNumber + 1;
      // if (this.pageNumber > this.totalPages)
        this.pageNumber = this.totalPages;
      this.getPromotionLines();
    }
    var st = window.pageYOffset || e.target.scrollTop;
    if (st == 0&&this.pageNumber>1) {
      this.pageNumber = this.pageNumber - 1;
      this.getPromotionLines();
    }
    this.lastScrollTop = st <= 0 ? 0 : st;
  }



  async getPromotionLines() {
    await fetch(`api/promotions?page=${this.pageNumber}`)
      .then(response => response.json())
      .then(data => {
        this.totalPages = data.totalPages;
        if (this.pageNumber > 1) {
          let arr = [...data.promotionInfo];
          this.setState({ promotionsLines: arr });
        } else {
          this.setState({ promotionsLines: data.promotionInfo })
        }
      });
  }

  async generatePromotions() {
    await fetch(`/api/generatePromotion`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).then(async (data) => {
      this.pageNumber = 1;
      await this.getPromotionLines();
    });
  }

  render() {
    const { promotionsColumns, promotionsLines, isLoading } = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }
    const promotionList = promotionsColumns;

    return (
      <div >
        <AppNavbar />
        <Container fluid>
          <div className="float-right">
            <Button color="success" onClick={() => this.generatePromotions()}>Generate Promotions</Button>
          </div>
          <h3>Promotions</h3>
          <div onScroll={this.firstEvent} className="promotionTable">
            <Table className="mt-4">
              <thead>
                <tr>
                  <th></th>
                  {Object.keys(promotionList).map(function (value) {
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
                    <td >
                      <input type="checkbox" ></input>
                    </td>
                    {Object.keys(item).map(function (value) {
                      if (value != '_id') {
                        return <td width="20%" >
                          {item[value]}
                        </td>
                      }
                    })}
                    <ButtonGroup>
                      <Button size="sm" color="danger" onClick={() => this.create(item["_id"])}>Duplicate</Button>
                      <Button size="sm" color="primary" tag={Link} to={"/promotion/" + item["_id"]}>Edit</Button>
                      <Button size="sm" color="danger" onClick={() => this.remove(item["_id"])}>Delete</Button>
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
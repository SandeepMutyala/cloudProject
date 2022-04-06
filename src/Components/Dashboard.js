
import React, { Component } from "react";
import "./Dashboard.css";
import axios from 'axios'
import { Card, Container, Row, Button } from 'react-bootstrap';
import fileDownload from 'js-file-download'

class Dashboard extends Component {
    state = {
        selectedFile : null
      }

    handleFileInput = (e) => {
        this.setState({
            selectedFile:e.target.files[0]
        })
    }

    handleUpload = async () => {
        var data = new FormData();
        data.append("data", this.state.selectedFile)
        axios.post("/upload", data).then((res) => {
            alert("File uploaded successfully! Please wait for few minutes to get your csv.")
        }, (error) => {
         console.log(error);
         alert("Error occurred while fetching file!")
       });
     }

    downloadCSV = () => {
        axios.get("/getFile").then((res) => {
            fileDownload(res.data, 'winter_cloud_output.csv')
        }, (error) => {
         alert("Error occurred while getting file!")
       });
    }

  render() {
    return (
     <div>
         <Card className="totalCard">
                <Container>
                    <Row>
                        <Card.Body className='eachCard'>
                        <strong>Description</strong>
                        <Card.Text>Welcome to our application. Get your CSVs from files right now!</Card.Text>
                        </Card.Body>
                    </Row>
                    <Row>
                    <Card.Body className='cardLeft eachCard'>
                        <h6>Upload hand-written document to extract the csv from it</h6>
                        <div className="uploadbutton">
                        <input type="file" name="myfile" onChange={this.handleFileInput}/>
                            <Button onClick={() => this.handleUpload(this.state.selectedFile)}> Upload to S3</Button>
                        </div>
                    </Card.Body>
                    <Card.Body className='cardRight eachCard'>
                        <h6 className='content'>Click on the download option to download the csv extracted from your uploaded document which consists of the the deatils in comma separated form that can be easily uploaded into database for further processiong.</h6>
                        <div className="downloadbutton">
                            <Button onClick={this.downloadCSV}>Download CSV</Button>
                        </div>
                    </Card.Body>
                    </Row>
                    </Container>
            </Card>
     </div>
    );
  }
}

export default Dashboard;
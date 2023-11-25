import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { addBox, addUser, addDelivery } from '../services/addRequest';
import { editBox, editUser, editDelivery } from '../services/updateRequest';

//props: isShown, formType:[add/update], type:['User','Box','Delivery'], formcontent[4]/[3], editID
//user: email, password, role ,RFID(optional)
//box: box name, address, RFID
//delivery: target_box(boxId 作为RESTapi地址), target_customer(id), assgined_deliverer(id)
const FormModal = forwardRef((props, ref) => {

  
  //props.isShown
  //only call for one time
  
   const [show, setShow] = useState(props.isShown);
  
  //const [show, setShow] = useState(true);
 console.log(props.isShown);
  console.log(show);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [email, setUserEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [Role, setUserRole] = useState("");


  console.log(props.formContent);
  console.log(props.formType);
  console.log(props.type);
  console.log(props.editID);


  async function addNew() {

    let response = [];
    switch (props.type) {
        case 'User':
            response = await addUser(email, username, Role, password);
            
            break;
        case 'Box':
            //email = boxName, username = address, password = rfid
            response = await addBox(email, username, password);
            
            break;
        case 'Delivery':
            //email = target_box, username = customerId, password = delivererID 
            response = await addDelivery(email, username, password);
            
            break;
        default:
            break;
    }
 
//{"id":"63d67ebbe999b545c1fc76d5","email":"432@gmail.com","username":"deliverer1","role":"deliverer","token":"234qcrq23414"}
//{"id":"63d68035e999b545c1fc76d6","name":"432@542","addr":"deliverer1","rfid":"password","boxStatus":0,"orderIds":[]}
//{"id":"63d7c2b52df5c34ddbe94a99","status":"Ordered","createdAt":1675084469897,"changedAt":1675084469897,"customer":{"id":"63d76a8b982f9143e56af4bd","email":"test3@gmail.com","username":"customer","role":"customer","token":"f784xjmc"},"deliverer":{"id":"63d76a8b982f9143e56af4bc","email":"test2@gmail.com","username":"deliverer","role":"deliverer","token":"w9zap1br"},"qrCode":"test","box":{"id":"63d76a8b982f9143e56af4be","name":"box","addr":"Garching","rfid":"1234567890","boxStatus":0},"trackCode":"936d0380-1d95-4adf-b34a-4296d039b892"}

    if(response.status === '200'){
        //fetch again the data?
        //add input data as a new row       
    }      
  }

  async function update() {

    let response = [];
    switch (props.type) {
        case 'User':
            //role = password, token = role
            //editUser(id, role = null, token = null)
            response = await editUser(props.editID, password, Role);
            break;
        case 'Box':
            //email = boxName, username = address, password = rfid
            //editBox(id, boxName)
            response = await editBox(props.editID, password);
            
            break;
        case 'Delivery':
            //email = target_box, username = customerId, password = delivererID 
            //editDelivery(id, targetBox = null, customerId = null, delivererId = null)
            response = await editDelivery(props.editID, email, username, password);           
            break;
        default:
            break;
    }
 
//{"id":"63d67ebbe999b545c1fc76d5","email":"432@gmail.com","username":"deliverer1","role":"deliverer","token":"234qcrq23414"}
//{"id":"63d68035e999b545c1fc76d6","name":"432@542","addr":"deliverer1","rfid":"password","boxStatus":0,"orderIds":[]}
//{"id":"63d7c2b52df5c34ddbe94a99","status":"Ordered","createdAt":1675084469897,"changedAt":1675084469897,"customer":{"id":"63d76a8b982f9143e56af4bd","email":"test3@gmail.com","username":"customer","role":"customer","token":"f784xjmc"},"deliverer":{"id":"63d76a8b982f9143e56af4bc","email":"test2@gmail.com","username":"deliverer","role":"deliverer","token":"w9zap1br"},"qrCode":"test","box":{"id":"63d76a8b982f9143e56af4be","name":"box","addr":"Garching","rfid":"1234567890","boxStatus":0},"trackCode":"936d0380-1d95-4adf-b34a-4296d039b892"}
//{"id":"63d843579cbaf70f13e13680","status":"Ordered","createdAt":1675117399101,"changedAt":1675117539176,"customer":{"id":"63d842bf90fdb62ae334f43b","email":"412321@gmail.com","username":"customer1","role":"customer","token":"cib8cfk5"},"deliverer":{"id":"63d76a8b982f9143e56af4bc","email":"test2@gmail.com","username":"deliverer","role":"deliverer","token":"w9zap1br"},"qrCode":"test","box":{"id":"63d76a8b982f9143e56af4be","name":"box","addr":"Garching","rfid":"1234567890","boxStatus":0},"trackCode":"9c0baaa9-1611-4106-bb3d-394f88e8f628"}
//{"id":"63d76a8b982f9143e56af4bb","email":"test1@gmail.com","username":"dispatcher","role":"dispatcher","token":null}
    // if(response.status === '200'){
    //     //fetch again the data?
    //     //add input data as a new row       
    // }      
  }

  const onSubmit = (event) => {
    event.preventDefault(event);
    //send REST：props.role
   if(props.formType === 'add') addNew();
   else update();
    handleClose();
    //navigate('/dispatcher');
};

  useEffect(() => {
      //setShow(props.isShown);
      console.log(email);
      console.log(password);
      console.log(username);
      console.log(Role);
      console.log(show);
      
  }, [email, password, Role, username, props.type, props.isShown, show]);

  return (
    <>      
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
        {props.formType === "add" ?
          <Modal.Title>Add A New {props.type}</Modal.Title>
          : <Modal.Title>Update {props.type}</Modal.Title>
        }
        </Modal.Header>
        <Modal.Body>      
          <Form onSubmit={onSubmit}>  

            <Form.Group className="mb-3" controlId="userEmail">
              <Form.Label>{props.formContent[0]}</Form.Label>
              {(props.formType === "add" || props.type === "Delivery") ? 
              <><Form.Control placeholder={props.formContent[0]}
                onChange={(e) => setUserEmail(e.target && e.target.value ? e.target.value : "")} />
                <Form.Text className="text-muted">
                Please enter the {props.formContent[0]} for this newly added {props.type}
                </Form.Text>
              </>
                : <Form.Control placeholder= {props.formContent[0]} disabled/>
              }
            </Form.Group>

            <Form.Group className="mb-3" controlId="username">
              <Form.Label>{props.formContent[1]}</Form.Label>
              {(props.formType === "add" || props.type === "Delivery") ? 
              <Form.Control placeholder={props.formContent[1]}
                onChange={(e) => setUsername(e.target && e.target.value ? e.target.value : "")}
              /> : <Form.Control placeholder= {props.formContent[1]} disabled/>
             }
            </Form.Group>

            <Form.Group className="mb-3" controlId="userPassword">
              <Form.Label>{props.formContent[2]}</Form.Label>
              <Form.Control placeholder={props.formContent[2]}
                onChange={(e) => setPassword(e.target && e.target.value ? e.target.value : "")}
              />
            </Form.Group>

            {props.type === 'User' ? <>
            <Form.Group className="mb-3" controlId="userRole">
              <Form.Label>{props.formContent[3]}</Form.Label>
              <Form.Control type="role" placeholder={props.formContent[3]}
                onChange={(e) => setUserRole(e.target && e.target.value ? e.target.value : "")} />
            </Form.Group>
            </> : null}

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>  
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer> */}
      </Modal>
    </>
  );
});

export default FormModal;

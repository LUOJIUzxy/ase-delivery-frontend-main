/* eslint-disable no-undef */
import React, { useEffect, useRef, useState } from 'react'
import $ from "jquery";
import { delBox, delUser, delDelivery } from '../services/delRequest';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { addBox, addUser, addDelivery } from '../services/addRequest';
import { editBox, editUser, editDelivery } from '../services/updateRequest';
import {getAllUsers} from "../services/userRequest";



//tr td type
function Table(props) {
    $.DataTable = require('datatables.net');
    $.buttons = require('datatables.net-buttons');

    const formTrUser = ['Email','Username', 'Password', 'Role'];
    const formTrDelivery = ['Target Box', 'Target Customer Email', 'Assigned Deliverer Email'];
    const formTrBox = ['Box Name', 'Street Name', 'RFID'];

    const formTrUserEdit = ['Email','Username', 'Token', 'Role'];
    const formTrDeliveryEdit = ['Target Box', 'Target Customer Email', 'Assigned Deliverer Email'];
    const formTrBoxEdit = ['RFID', 'Street Name', 'Box Name'];
    const [formType, setFormType] = useState('');
    const [formTr, setFormTr] = useState([]);
    const [RFID, setRFID] = useState('');
    const [editID, setEditID] = useState('');
    const [streetName, setStreetName] = useState('');
    const [userEmail, setEmail] = useState('');
    const [userName, setName] = useState('');

    const [isShown, setIsShown] = useState(false);  
    const handleClose = () => setIsShown(false);
    const handleShow = () => setIsShown(true);

    const [email, setUserEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [Role, setUserRole] = useState("");
    
    //reference to the dataTable
    const tableRef = useRef();
    
   
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
                //email = boxName, username = customer email, password = deliverer email
                response = await addDelivery(email, username, password);
                
                break;
            default:
                break;
        }
     
    //{"id":"63d67ebbe999b545c1fc76d5","email":"432@gmail.com","username":"deliverer1","role":"deliverer","token":"234qcrq23414"}
    //{"id":"63d68035e999b545c1fc76d6","name":"432@542","addr":"deliverer1","rfid":"password","boxStatus":0,"orderIds":[]}
    //{"id":"63d7c2b52df5c34ddbe94a99","status":"Ordered","createdAt":1675084469897,"changedAt":1675084469897,"customer":{"id":"63d76a8b982f9143e56af4bd","email":"test3@gmail.com","username":"customer","role":"customer","token":"f784xjmc"},"deliverer":{"id":"63d76a8b982f9143e56af4bc","email":"test2@gmail.com","username":"deliverer","role":"deliverer","token":"w9zap1br"},"qrCode":"test","box":{"id":"63d76a8b982f9143e56af4be","name":"box","addr":"Garching","rfid":"1234567890","boxStatus":0},"trackCode":"936d0380-1d95-4adf-b34a-4296d039b892"}
    
        if(!response.error){
            //fetch again the data?
            //add input data as a new row 
           
            return response;     
        } else {
            alert(response);
        }
    }
    
      async function update() {
    
        let response = [];
        switch (props.type) {
            case 'User':
                //token = password, role = role
                //editUser(id, role = null, token = null)
                response = await editUser(editID, password, Role);
                break;
            case 'Box':
                //email = boxName, username = address, password = rfid
                //editBox(id, boxName)
                response = await editBox(editID, password);
                
                break;
            case 'Delivery':
                //email = target_box, username = customerId, password = delivererID 
                //editDelivery(id, targetBox = null, customerId = null, delivererId = null)
                response = await editDelivery(editID, email, username, password);           
                break;
            default:
                break;
        }
      return response;
    //{"id":"63d67ebbe999b545c1fc76d5","email":"432@gmail.com","username":"deliverer1","role":"deliverer","token":"234qcrq23414"}
    //{"id":"63d68035e999b545c1fc76d6","name":"432@542","addr":"deliverer1","rfid":"password","boxStatus":0,"orderIds":[]}
    //{"id":"63d7c2b52df5c34ddbe94a99","status":"Ordered","createdAt":1675084469897,"changedAt":1675084469897,"customer":{"id":"63d76a8b982f9143e56af4bd","email":"test3@gmail.com","username":"customer","role":"customer","token":"f784xjmc"},"deliverer":{"id":"63d76a8b982f9143e56af4bc","email":"test2@gmail.com","username":"deliverer","role":"deliverer","token":"w9zap1br"},"qrCode":"test","box":{"id":"63d76a8b982f9143e56af4be","name":"box","addr":"Garching","rfid":"1234567890","boxStatus":0},"trackCode":"936d0380-1d95-4adf-b34a-4296d039b892"}
    //{"id":"63d843579cbaf70f13e13680","status":"Ordered","createdAt":1675117399101,"changedAt":1675117539176,"customer":{"id":"63d842bf90fdb62ae334f43b","email":"412321@gmail.com","username":"customer1","role":"customer","token":"cib8cfk5"},"deliverer":{"id":"63d76a8b982f9143e56af4bc","email":"test2@gmail.com","username":"deliverer","role":"deliverer","token":"w9zap1br"},"qrCode":"test","box":{"id":"63d76a8b982f9143e56af4be","name":"box","addr":"Garching","rfid":"1234567890","boxStatus":0},"trackCode":"9c0baaa9-1611-4106-bb3d-394f88e8f628"}
    //{"id":"63d76a8b982f9143e56af4bb","email":"test1@gmail.com","username":"dispatcher","role":"dispatcher","token":null}
       
    }
    
      const onSubmit = (event) => {
        event.preventDefault(event);
        //send REST：props.role
        if(formType === 'add') {
            const res = addNew();
            setTimeout(function() {
                if(res.error){
                    handleClose();
                    alert(res);
                } else{
                    window.location.reload();
                }
            }, 1500);
            
        }
        else {
            const res = update();
            setTimeout(function() {
                if(res.error){
                    handleClose();
                    alert(res);
                } else{
                    window.location.reload();
                }
            }, 1500);
        } 
    };

          
    useEffect(() => {
        //console.log(tableRef.current);
        //can use all the APIs on table now    
 
        const table = $(tableRef.current).DataTable(
            {
                data: props.td,
                columnDefs: [
                    {
                        'targets': 0,
                        'searchable':false,
                        'orderable':false,
                        'render': function (data, type, full, meta){
                            return '<input type="checkbox" name="id[]" value="'
                               + $('<div/>').text(data).html() + '">';
                        }
                    },
                    {
                        'targets': 1,
                        'visible': false                
                    },
                    {
                        'targets': 8,
                        'searchable':false,
                        'orderable':false,
                        'render': function () {
                            return `<button  class='btn btn-info btn-sm'>Edit</button>`;
                        },
                    },
                    {
                        'targets': 5,
                        'visible': props.type === 'Box' ? false : true
                    },
                    {
                        'targets': [6, 7],
                        'visible': props.tr.length === 7 ? true : false
                        
                    }
                ],
                select: {
                    style: 'os',
                    selected: 'td:first-child'
                },
                order: [[1, 'asc']],
                columns: [
                    { title: ""},
                    { title: props.tr[0],},
                    { title: props.tr[1],},
                    { title: props.tr[2],},
                    { title: props.tr[3],},
                    { title: props.tr[4],},
                    { title: props.tr[5],},
                    { title: props.tr[6],
                        'render': function (qrCode){
                            return props.tr.length === 7 ? '<img src=' + qrCode + ' width="100px">'
                            : null;
                        }
                    },
                    { title: ""},
                ],
                scrollX: true,
                dom: 'Bfrtip',
                buttons: true,
                searching: true,
                destroy: true,
                paging: true,
            }
        );

       
        table.button().add( 0, {
            text: "Delete",
            action: function ( e, dt, button, config){
                e.preventDefault();
                var $checkboxes = $('#dataTable td input[type="checkbox"]');
                var countChecked = $checkboxes.filter(':checked').length;

                console.log(countChecked);
                if(countChecked === 0) {
                    e.preventDefault();
                    window.alert("Please select at least one row");
                    return false;
                };

                var checkedIndexes = [];
                var checkedIds = [];
                          
                $checkboxes.filter(':checked').each(function() {
                    checkedIds.push(table.row($(this).parent().parent()).data()[1]);
                    checkedIndexes.push($checkboxes.index($(this)));
                    console.log($(this).parent().parent());
                    table.row( $(this).parent().parent()).remove().draw();
                });
                console.log(checkedIndexes);
                console.log(checkedIds);
                //get userID instead of indexes
                switch (props.type) {
                    case 'User':
                        delUser(checkedIds);
                        break;
                    case 'Box':
                        delBox(checkedIds);
                        break;
                    case 'Delivery':
                        delDelivery(checkedIds);
                        break;
                    default:
                        break;
                }
                setTimeout(function() {
                        window.location.reload();
                }, 1500);
            }
        });

        table.button().add( 1, {
            text: "Add",
            action: function ( e, dt, button, config){
                e.preventDefault();
                switch (props.type) {
                    case 'User':
                        setFormTr(formTrUser);
                        break;
                    case 'Box':
                        setFormTr(formTrBox);
                        break;
                    case 'Delivery':
                        setFormTr(formTrDelivery);
                        break;
                    default:
                        break;
                }
                setFormType("add");
                handleShow();
                //after the form is submitted, callback to get input data 
                //tab.row.add(newData);
                // //table.row.add(['', '000001', '234@gmail.com', 'Deliverer', '354qwcqw', 'None', '2022/12/29 23:59:00']).draw();
                // table.$('td').addClass('editable');
            }
        });
     
        //click on the edit button
        $('tbody tr').on('click', 'button', function() {
            //get the row data
            //['', 'test1@gmail.com', 'dispatcher', 'dispatcher', null, '', '']
            console.log(table.row($(this).parents("tr")).data());
            console.log(table.row($(this).parents("tr")).data()[1]);
            if (props.type === 'User') {
                setEmail(table.row($(this).parents("tr")).data()[2]);
                setName(table.row($(this).parents("tr")).data()[3]);
            } else if (props.type === 'Box'){
                setStreetName(table.row($(this).parents("tr")).data()[3]);
                setRFID(table.row($(this).parents("tr")).data()[4]);
                console.log(table.row($(this).parents("tr")).data()[4]);
            }
            setEditID(table.row($(this).parents("tr")).data()[1]);
            console.log(editID);
            //show update popup
            //need to enable disable
            switch (props.type) {
                case 'User':
                    setFormTr(formTrUserEdit);
                    break;
                case 'Box':
                    setFormTr(formTrBoxEdit);
                    break;
                case 'Delivery':
                    setFormTr(formTrDeliveryEdit);
                    break;
                default:
                    break;
            }
            setFormType("update");
            handleShow();
        });
          
        return function() {
            console.log("Table Destroyed");
            table.destroy();
        }

    },[props, props.td, props.tr, userEmail, isShown]);

    return (
        <div>
            <table id='dataTable' className='display' width='100%' ref={ tableRef }></table>
            {/* {isShown ?  */}
            <>      
            <Modal
              show={isShown}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header closeButton>
              {formType === "add" ?
                <Modal.Title>Add A New {props.type}</Modal.Title>
                : <Modal.Title>Update {props.type}</Modal.Title>
              }
              </Modal.Header>
              <Modal.Body>      
                <Form onSubmit={onSubmit}>  
      
                  <Form.Group className="mb-3" controlId="userEmail">
                    <Form.Label>{formTr[0]}</Form.Label>
                    {(formType === "add" || props.type === "Delivery") ? 
                    <><Form.Control placeholder={formTr[0]}
                      onChange={(e) => setUserEmail(e.target && e.target.value ? e.target.value : "")} />
                      <Form.Text className="text-muted">
                      Please enter the {formTr[0]} for this newly added {props.type}
                      </Form.Text>
                    </>
                      : (props.type === "User") ? <Form.Control placeholder={userEmail} disabled/>
                         :   <Form.Control placeholder={RFID} disabled/>

                    }
                  </Form.Group>
      
                  <Form.Group className="mb-3" controlId="username">
                    <Form.Label>{formTr[1]}</Form.Label>
                      {
                          (formType === "add" || props.type === "Delivery") ?
                              <Form.Control placeholder={formTr[1]}
                                            onChange={(e) => setUsername(e.target && e.target.value ? e.target.value : "")}
                              />
                              : (props.type === "User") ?
                                  <Form.Control placeholder={userName} disabled />
                                  : <Form.Control placeholder={streetName} disabled />
                      }
                  </Form.Group>
      
                  <Form.Group className="mb-3" controlId="userPassword">
                    <Form.Label>{formTr[2]}</Form.Label>
                    <Form.Control placeholder={formTr[2]}
                      onChange={(e) => setPassword(e.target && e.target.value ? e.target.value : "")}
                    />
                  </Form.Group>
      
                  {props.type === 'User' ? <>
                  <Form.Group className="mb-3" controlId="userRole">
                    <Form.Label>{formTr[3]}</Form.Label>
                    <Form.Control type="role" placeholder={formTr[3]}
                      onChange={(e) => setUserRole(e.target && e.target.value ? e.target.value : "")} as="select">
                        <option> </option>
                        <option>dispatcher</option>
                        <option>deliverer</option>
                        <option>customer</option>
                    </Form.Control>
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
        {/* : null} */}
        </div>
    )
}

export default Table
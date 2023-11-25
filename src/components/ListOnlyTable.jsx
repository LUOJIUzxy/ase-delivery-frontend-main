/* eslint-disable no-undef */
import React, { useEffect, useRef } from 'react'
import $ from "jquery";

//tr, td, type
function ListOnlyTable(props) {
    $.DataTable = require('datatables.net');
    $.buttons = require('datatables.net-buttons');
 
    //reference to the dataTable
    const tableRef = useRef();

    useEffect(() => {
        console.log(tableRef.current);
        //can use all the APIs on table now
 
        const table = $(tableRef.current).DataTable(
            {
                data: props.td,
                columnDefs: [
                    {
                        'targets': 0 ,
                        'visible': props.type === "Box" ? false : true
                        
                    },
                    {
                        'targets': [4, 5, 6, 7],
                        'visible': props.tr.length < 8 ? false : true

                    },
                ],
                columns: [
                    { title: props.tr[0],},
                    { title: props.tr[1],},
                    { title: props.tr[2],},
                    { title: props.tr[3],},
                    { title: props.tr[4],},
                    { title: props.tr[5],},
                    { title: props.tr[6],},
                    { title: props.tr[7],},
                ],
                scrollX: true,
                searching: true,
                destroy: true,
                paging: true,
            }
        );
     
        //click on the specific row
        $('tbody').on('click', 'tr td', function() {
            //get the row data
            console.log( table.row(this).data());
        });        
    

        return function() {
            console.log("Table Destroyed");
            table.destroy();
        }

    },[props.td, props.tr]);

    return (
        <div>
            <table id='dataTable' className='display' width='100%' ref={ tableRef }></table>
        </div>
    )
}

export default ListOnlyTable
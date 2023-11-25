/* eslint-disable no-undef */

window.addEventListener('DOMContentLoaded', event => {
    // Simple-DataTables
    // https://github.com/fiduswriter/Simple-DataTables/wiki

    const datatablesSimple = document.getElementById('datatable');
    if (datatablesSimple) {
        new simpleDatatables.DataTable(datatablesSimple);
        console.log("!!!!!!!!!!!!!!!");
    }
});

//window.addEventListener('DOMContentLoaded', event => {
        // console.log("??????????");
        // const datatablesSimple = document.getElementById('dataTable');
        //  if (datatablesSimple) {
        //      new DataTable(datatablesSimple);
        //     console.log("!!!!!!!!!!!!!!!");
        //  }
    // });

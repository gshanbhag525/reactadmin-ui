import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import GetAppIcon from '@material-ui/icons/GetApp';
import AddIcon from '@material-ui/icons/Add';

function App() {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetch(
      'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'
    )
      .then((response) => response.json())
      .then((result) => setTableData(result))
      .catch((error) => console.log(error));
  }, []);

  const columns = [
    {
      title: 'Employee ID',
      field: 'id',
      filterPlaceholder: 'filter',
      // cellStyle: { background: '#009688' }, 
    },
    {
      title: 'Name',
      field: 'name',
      sorting: true,
      filtering: true,
      filterPlaceholder: 'filter',
      headerStyle: { color: '#fff' },
    },
    { title: 'Email', field: 'email', filterPlaceholder: 'filter' },
    { title: 'Role', field: 'role', filterPlaceholder: 'filter' },
  ];
  return (
    <div className='App'>
      <h1 align='center'>ADMIN UI</h1>

      <MaterialTable
        columns={columns}
        data={tableData}
        editable={{
          onRowAdd: (newRow) =>
            new Promise((resolve, reject) => {
              setTableData([...tableData, newRow]);

              setTimeout(() => resolve(), 500);
            }),
          onRowUpdate: (newRow, oldRow) =>
            new Promise((resolve, reject) => {
              const updatedData = [...tableData];
              updatedData[oldRow.tableData.id] = newRow;
              setTableData(updatedData);
              setTimeout(() => resolve(), 500);
            }),
          onRowDelete: (selectedRow) =>
            new Promise((resolve, reject) => {
              const updatedData = [...tableData];
              updatedData.splice(selectedRow.tableData.id, 1);
              setTableData(updatedData);
              setTimeout(() => resolve(), 1000);
            }),
        }}
        actions={[
          {
            icon: () => <GetAppIcon />,
            tooltip: 'Click me',
            onClick: (e, data) => console.log(data),
            // isFreeAction:true
          },
        ]}
        onSelectionChange={(selectedRows) => console.log(selectedRows)}
        options={{
          sorting: true,
          search: true,
          searchFieldAlignment: 'right',
          searchAutoFocus: true,
          searchFieldVariant: 'standard',
          // filtering: true,
          paging: true,
          pageSizeOptions: [2, 5, 10, 20, 25, 50, 100],
          pageSize: 10,
          paginationType: 'stepped',
          showFirstLastPageButtons: false,
          paginationPosition: 'both',
          exportButton: true,
          exportAllData: true,
          exportFileName: 'TableData',
          addRowPosition: 'first',
          actionsColumnIndex: -1,
          selection: true,
          showSelectAllCheckbox: true,
          showTextRowsSelected: false,
          selectionProps: (rowData) => ({
            // disabled: rowData.age == null,
            color:"primary"
          }),
          grouping: true,
          columnsButton: true,
          rowStyle: (data, index) =>
            index % 2 === 0 ? { background: '#f5f5f5' } : null,
          headerStyle: { background: '#f44336', color: '#fff' },
        }}
        title='Employee Information'
        icons={{ Add: () => <AddIcon /> }}
      />
    </div>
  );
}

export default App;

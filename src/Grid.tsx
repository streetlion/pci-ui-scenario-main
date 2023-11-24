import {useMemo} from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import data from "./near-earth-asteroids.json";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";

const columnDefs: ColDef[] = [
  { field: "designation", headerName: "Designation", filter: "agTextColumnFilter"},
  { field: "discovery_date", headerName: "Discovery Date", filter: "agTextColumnFilter", valueFormatter: (data) => {
    return data.value ? (new Date(data.value)).toLocaleDateString() : '';
  }},
  { field: "h_mag", headerName: "H (mag)", filter: "agTextColumnFilter"},
  { field: "moid_au", headerName: "MOID (au)", filter: "agTextColumnFilter"},
  { field: "q_au_1", headerName: "q (au)", filter: "agTextColumnFilter"},
  { field: "q_au_2", headerName: "Q (au)", filter: "agTextColumnFilter"},
  { field: "period_yr", headerName: "Period (yr)", filter: "agTextColumnFilter"},
  { field: "i_deg", headerName: "Inclination (deg)", filter: "agTextColumnFilter"},
  { field: "pha", headerName: "Potentially Hazardous", filter: "agTextColumnFilter", valueFormatter: (data) => {
    return !data.value.includes('/') ? (data.value === 'Y' ? 'YES' : 'NO') : ' ';
  }},
  { field: "orbit_class", headerName: "Orbit Class", enableRowGroup: true, filter: "agTextColumnFilter"},
];

const NeoGrid = (): JSX.Element => {

  const defaultColDef = useMemo(()=>({
    sortable: true
  }), []);

  return (
    <>
      <h1 style={{display: "inline", marginRight: "15px"}}>Near-Earth Object Overview</h1>
      <div className="ag-theme-alpine" style={{ height: 900, width: 1920 }}>
        <AgGridReact
          rowData={data}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowGroupPanelShow={'always'}
          enableRangeSelection={true}
        />
      </div>
    </>
  );
};

export default NeoGrid;

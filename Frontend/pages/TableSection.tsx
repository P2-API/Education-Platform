import MaterialReactDataTable from "../components/DataTable";
import { DegreeType } from "../../src/enums"

import Paper from '@mui/material/Paper';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';



type TableSectionProps = {
    tableRef: React.RefObject<HTMLDivElement>;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const TableSection: React.FC<TableSectionProps> = ({ tableRef, setIsModalOpen }) => {
    const degreeTypes = Object.values(DegreeType).filter(value => typeof value === 'string');    
    //const 
    
    return (
        <div style={{ height: "100vh", width: "100%", backgroundColor: "#f8fbff" }}>
            <div ref={tableRef} id="table" style={{ marginTop: "9vh", backgroundColor: "white" }} />
            <h1 style={{ textAlign: "center" }} className="text-color-blue">
                Uddannelser
            </h1>
            <div style={{ display: "flex", padding: "1em" }}>
                <div style={{ width: "30%", height: "100%", minWidth: "302px" }}>
                    <Paper elevation={2} style={{ marginRight: "1em" }}>
                        <div style={{ height: "3.5em", borderBottom: "2px solid black", padding: 0, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <h2 style={{ textAlign: "left", paddingLeft: "0.5em" }}>Filtre</h2>
                            <button className="primary-button" style={{ marginRight: "0.5em", borderRadius: 5 }} onClick={() => setIsModalOpen(true)}>Quiz</button>
                        </div>
                        <div style={{ padding: "1em", }}>
                            <Autocomplete
                                multiple
                                id="tags-outlined"
                                options={degreeTypes}
                                getOptionLabel={(option) => option.toString()}
                                filterSelectedOptions
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Filtrer efter uddannelsestype"
                                        placeholder="Uddannelsestype"
                                    />
                                )}
                            />
                            <p>Filter efter uddannelsessted</p>
                            <p>Filter efter uddannelsesniveau</p>
                            <p>Filter efter uddannelsesvarighed</p>
                            <p>Filter efter uddannelsespris</p>
                            <p>Filter efter uddannelsesstart</p>
                            <p>Filter efter uddannelsesform</p>
                            <p>Filter efter uddannelsesindhold</p>
                        </div>


                    </Paper>
                </div>

                <div style={{ width: "70%" }}>
                    <MaterialReactDataTable />

                </div>
            </div >
        </div >
    );
};

export default TableSection;
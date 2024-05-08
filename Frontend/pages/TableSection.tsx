import React from 'react';
import BasicTabs from '../components/Tabs.tsx';
import DataTableSection from './DataTableSection.tsx';
import { Education } from '../../src/types.ts';




type TableSectionProps = {
    tableRef: React.RefObject<HTMLDivElement>;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};



const TableSection: React.FC<TableSectionProps> = ({ tableRef, setIsModalOpen }) => {
    const getValueTextDuration = (value: number) => { return `${value} måneder`; }
    const getValueTextSalary = (value: number) => { return `${value}k kr.` }

    const [data, setData] = React.useState<TableSectionDataFromServer>()

    const { getTableSectionData } = useServer();

    const asyncUpdateTableSectionData = async () => {
        setData(await getTableSectionData());
    }
    asyncUpdateTableSectionData();

    return (
        <div style={{ height: "100vh", width: "100%", backgroundColor: "#f8fbff" }}>
            <div ref={tableRef} id="table" style={{ marginTop: "9vh", backgroundColor: "white" }} />
            <h1 style={{ textAlign: "center" }} className="text-color-blue">
                Uddannelser
            </h1>
            <div style={{ display: "flex", padding: "1em", height: "80%" }}>
                <div style={{ width: "30%", height: "100%", minWidth: "302px" }}>
                    <Paper elevation={2} style={{ marginRight: "1em", height: "100%", zIndex: 1, overflowY: "scroll" }}>
                        <div style={{ height: "3.5em", position: "sticky", top: 0, zIndex: 2, borderBottom: "2px solid black", padding: 0, display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "white" }}>
                            <h2 style={{ textAlign: "left", paddingLeft: "0.5em" }}>Filtre (scroll ned)</h2>
                            <button className="primary-button" style={{ marginRight: "0.5em", borderRadius: 5 }} onClick={() => setIsModalOpen(true)}>Quiz</button>
                        </div>
                        <div style={{ padding: "1em", display: "grid", gap: "1em", height: "100%" }}>
                            {(data != undefined) && (
                                <>
                                    <MultiSelectAutoComplete collection={data?.degreeTypesString} selectLabel="Filtrer efter uddannelsestype" selectPlaceholder="Uddannelsestype" />
                                    <MultiSelectAutoComplete collection={data?.institutesString} selectLabel="Filtrer efter uddannelsessted" selectPlaceholder="Uddannelsessted" />
                                    <MultiSelectAutoComplete collection={data?.geographiesString} selectLabel="Filtrer efter kommune" selectPlaceholder="Kommune" />
                                    <MultiSelectAutoComplete collection={data?.geographiesString} selectLabel="Filtrer efter kommune" selectPlaceholder="Kommune" />
                                    <MinimumDistanceSlider
                                        initialState={data?.educationDurationRange}
                                        sliderRange={data?.educationDurationRange}
                                        minimumDistance={1}
                                        description="Filtrer efter uddannelsesvarighed i måneder"
                                        getValueText={getValueTextDuration}
                                    />
                                    <MinimumDistanceSlider
                                        initialState={data?.newGraduateSalaryRange}
                                        sliderRange={data?.newGraduateSalaryRange}
                                        minimumDistance={1}
                                        description="Filtrer efter nyuddannedes løn i tusinde"
                                        getValueText={getValueTextSalary}
                                    />

                                    <MinimumDistanceSlider
                                        initialState={data?.experiencedSalaryRange}
                                        sliderRange={data?.experiencedSalaryRange}
                                        minimumDistance={1}
                                        description="Filtrer efter erfarenes løn i tusinde"
                                        getValueText={getValueTextSalary}
                                    />
                                </>

                            )}

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



import DataTable, { TableColumn } from "react-data-table-component";
type DataRow = {
    løn: number;
    uddannelse: string;
    varighed: number;
    sprog: string;
    branche: string,
};

const DataTableComponent = () => {

    const columns: TableColumn<DataRow>[] = [
        { name: "Uddannelse", selector: (row) => row.uddannelse, sortable: true, minWidth: "15em" },
        { name: "Varighed", selector: (row) => row.varighed, sortable: true },
        { name: "Løn", selector: (row) => row.løn, sortable: true },
        { name: "Sprog", selector: (row) => row.sprog, sortable: true },
        { name: "Branche", selector: (row) => row.branche, sortable: true }
    ];
    const data: DataRow[] = [
        {
            løn: 60000,
            uddannelse: "Softwareudvikler",
            varighed: 3,
            sprog: "Python",
            branche: "IT"
        },
        {
            løn: 55000,
            uddannelse: "Computer Science",
            varighed: 4,
            sprog: "JavaScript",
            branche: "IT"
        },
        {
            løn: 62000,
            uddannelse: "Datamatiker",
            varighed: 2,
            sprog: "C#",
            branche: "IT"
        },
        {
            løn: 58000,
            uddannelse: "Software Engineering",
            varighed: 3,
            sprog: "Java",
            branche: "IT"
        },
        {
            løn: 57000,
            uddannelse: "Information Technology",
            varighed: 5,
            sprog: "C++",
            branche: "IT"
        },
        {
            løn: 59000,
            uddannelse: "Computer Engineering",
            varighed: 4,
            sprog: "Python",
            branche: "IT"
        },
        {
            løn: 54000,
            uddannelse: "Datamatiker",
            varighed: 3,
            sprog: "JavaScript",
            branche: "IT"
        },
        {
            løn: 61000,
            uddannelse: "Softwareudvikler",
            varighed: 4,
            sprog: "C#",
            branche: "IT"
        },
        {
            løn: 60000,
            uddannelse: "Computer Science",
            varighed: 2,
            sprog: "Java",
            branche: "IT"
        },
        {
            løn: 56000,
            uddannelse: "Software Engineering",
            varighed: 3,
            sprog: "C++",
            branche: "IT"
        },
        {
            løn: 58000,
            uddannelse: "Information Technology",
            varighed: 5,
            sprog: "Python",
            branche: "IT"
        },
        {
            løn: 57000,
            uddannelse: "Computer Engineering",
            varighed: 4,
            sprog: "JavaScript",
            branche: "IT"
        },
        {
            løn: 59000,
            uddannelse: "Datamatiker",
            varighed: 3,
            sprog: "C#",
            branche: "IT"
        },
        {
            løn: 61000,
            uddannelse: "Softwareudvikler",
            varighed: 4,
            sprog: "Java",
            branche: "IT"
        },
        {
            løn: 60000,
            uddannelse: "Computer Science",
            varighed: 2,
            sprog: "C++",
            branche: "IT"
        },
        {
            løn: 56000,
            uddannelse: "Information Technology",
            varighed: 5,
            sprog: "Python",
            branche: "IT"
        },
        {
            løn: 59000,
            uddannelse: "Computer Engineering",
            varighed: 4,
            sprog: "JavaScript",
            branche: "IT"
        }
    ];

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <div
                className="crazy-shadow"
                style={{
                    marginBottom: "5em",
                }}
            >
                <h3 style={{ textAlign: "center" }}>Uddannelser</h3>
                <DataTable
                    columns={columns}
                    highlightOnHover
                    pointerOnHover
                    fixedHeader
                    fixedHeaderScrollHeight="25em"
                    data={data}
                    responsive
                    expandableRows
                    expandOnRowClicked
                    customStyles={{
                        table: {
                            style: {
                                width: "100%",
                            },
                        },
                    }
                    }
                />
            </div>
        </div>

    )

};

export default DataTableComponent;
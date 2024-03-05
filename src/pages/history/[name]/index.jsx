import React, { useState } from "react";
import styles from "../history.module.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
// import "primereact/resources/themes/lara-light-cyan/theme.css";

const History = () => {
  const [products] = useState([
    {
      code: "88",
      name: "name",
      category: "name",
      quantity: 20,
    },
  ]);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [rowClick, setRowClick] = useState(true);

  return (
    <div>
      <DataTable
        value={products}
        selectionMode={rowClick ? null : "checkbox"}
        selection={selectedProducts}
        onSelectionChange={(e) => setSelectedProducts(e.value)}
        dataKey="id"
        tableStyle={{ minWidth: "50rem" }}
      >
        <Column
          selectionMode="multiple"
          headerStyle={{ width: "3rem" }}
        ></Column>
        <Column field="code" header="Code"></Column>
        <Column field="name" header="Name"></Column>
        <Column field="category" header="Category"></Column>
        <Column field="quantity" header="Quantity"></Column>
      </DataTable>
    </div>
  );
};

export default History;

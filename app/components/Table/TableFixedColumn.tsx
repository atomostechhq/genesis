"use client";
import { tableData } from "@/app/components/Table/table";
import {
  Table,
  TableBody,
  TableDataCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "@/app/components/TableComponents";
import React, { useState } from "react";
import Chip from "../Chip";
import Button from "../Button";
import Pagination from "../Pagination";
import { RiInformation2Line } from "@remixicon/react";
import Tooltip from "../Tooltip";

const TableFixedColumn = () => {
  const [data, setdata] = useState(tableData);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  const startIndex = page * rowsPerPage;
  const endIndex = (page + 1) * rowsPerPage;

  const currentPageData = data?.slice(startIndex, endIndex);
  return (
    <div>
      <Pagination
        count={tableData?.length}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        variant="secondary"
        countVariable="Logs"
        itemsPerPage={false}
      />
      <div className="overflow-auto">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeadCell sticky left="0px" shadow className="z-[100]">
                ID
              </TableHeadCell>
              <TableHeadCell>First Name</TableHeadCell>
              <TableHeadCell
                icon={
                  <Tooltip
                    position="right"
                    content={
                      <div>
                        <h1 className="font-semibold text-xs">
                          This is a tooltip
                        </h1>
                        <p className="font-normal text-xs">
                          Tooltips are used to describe or identify an element.
                          In most scenarios, tooltips help the user understand
                          the meaning, function or alt-text of an element. Lorem
                          ipsum dolor sit amet, consectetur adipisicing elit.
                          Error quo totam voluptatibus incidunt recusandae, quas
                          obcaecati sequi quia id, delectus temporibus optio
                          commodi maiores aperiam laborum, quis exercitationem
                          mollitia tenetur! Temporibus similique, facilis
                          tempore nostrum placeat dolorem amet modi possimus.
                          Incidunt animi quas deserunt recusandae ipsam, nemo
                          quos nobis exercitationem fugit officiis atque error
                          repellat omnis adipisci dicta magni! Ratione odit id
                          neque corrupti mollitia iusto, harum quia expedita
                          ipsam facilis. Eum eaque tempora itaque illo minus
                          ratione quam ipsam corrupti vitae dolorum sit omnis
                          molestiae fugit enim quidem animi nesciunt,
                          dignissimos in beatae nemo qui. Laudantium ipsum
                          repellat quia?
                        </p>
                      </div>
                    }
                  >
                    <RiInformation2Line size={15} />
                  </Tooltip>
                }
              >
                Last Name
              </TableHeadCell>
              <TableHeadCell>Age</TableHeadCell>
              <TableHeadCell>Progress</TableHeadCell>
              <TableHeadCell>Status</TableHeadCell>
              <TableHeadCell>Visits</TableHeadCell>
              <TableHeadCell>Progress Extra</TableHeadCell>
              <TableHeadCell>Status Extra</TableHeadCell>
              <TableHeadCell>Visits Extra</TableHeadCell>
              <TableHeadCell>Progress Extra</TableHeadCell>
              <TableHeadCell>Status Extra</TableHeadCell>
              <TableHeadCell>Visits Extra</TableHeadCell>
              <TableHeadCell>Progress Extra</TableHeadCell>
              <TableHeadCell>Status Extra</TableHeadCell>
              <TableHeadCell>Visits Extra</TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentPageData?.map((item) => {
              return (
                <TableRow key={item.id}>
                  <TableDataCell sticky left="0px" shadow>
                    {item.id}
                  </TableDataCell>
                  <TableDataCell>{item.firstName}</TableDataCell>
                  <TableDataCell>{item.lastName}</TableDataCell>
                  <TableDataCell>{item.age}</TableDataCell>
                  <TableDataCell>{item.progress}</TableDataCell>
                  <TableDataCell>
                    <Chip intent={"primary"} size={"md"}>
                      {item.status}
                    </Chip>
                  </TableDataCell>
                  <TableDataCell>{item.visits}</TableDataCell>
                  <TableDataCell>{item.progress}</TableDataCell>
                  <TableDataCell>
                    <Chip intent={"primary"} size={"md"}>
                      {item.status}
                    </Chip>
                  </TableDataCell>
                  <TableDataCell>{item.visits}</TableDataCell>
                  <TableDataCell>{item.progress}</TableDataCell>
                  <TableDataCell>
                    <Chip intent={"primary"} size={"md"}>
                      {item.status}
                    </Chip>
                  </TableDataCell>
                  <TableDataCell>{item.visits}</TableDataCell>
                  <TableDataCell>{item.progress}</TableDataCell>
                  <TableDataCell>
                    <Chip intent={"primary"} size={"md"}>
                      {item.status}
                    </Chip>
                  </TableDataCell>
                  <TableDataCell>{item.visits}</TableDataCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      <Pagination
        count={tableData?.length}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        className="rounded-b-xl"
        variant="primary"
      />
    </div>
  );
};

export default TableFixedColumn;

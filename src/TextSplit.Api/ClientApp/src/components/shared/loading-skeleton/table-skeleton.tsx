import React from "react";
import Skeleton from "react-loading-skeleton";
import { Table } from "reactstrap";

interface TableSkeletonProps {
  columnCount: number
}

const TableSkeleton: React.FC<TableSkeletonProps> = ({ columnCount, ...rest }) => {

  const columns: string[] = [];
  const compiledColumnCount = columnCount < 0 ? 3 : columnCount;
  for(let i = 0; i < compiledColumnCount; i++) {
    columns.push("");
  }

  return (
    <Table responsive>
      <thead>
        <tr>
          {columns.map((c, i) => <th key={i}><Skeleton /></th>)}
        </tr>
      </thead>
      <tbody>
        <tr>{columns.map((c, i) => <td key={i}><Skeleton /></td>)}</tr>
        <tr>{columns.map((c, i) => <td key={i}><Skeleton /></td>)}</tr>
        <tr>{columns.map((c, i) => <td key={i}><Skeleton /></td>)}</tr>
        <tr>{columns.map((c, i) => <td key={i}><Skeleton /></td>)}</tr>
        <tr>{columns.map((c, i) => <td key={i}><Skeleton /></td>)}</tr>
      </tbody>
    </Table>
  )
}

export default TableSkeleton;
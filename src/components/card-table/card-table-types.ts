import { TableCellProps, TableProps, CardProps } from "@mui/material";
import { ReactNode } from "react";
import { ScrollbarProps } from "../scrollbar";
import { Selection } from "@/hooks/use-selection";
import { UsePaginationResult } from "@/hooks/use-pagination";

// Interface for editing cell props, providing flexibility for various data types
export type CardTableEditCellProps<P, T extends { id: P }> = (
  editingValue: any, // Current value being edited
  onChange: (value: any) => void, // Function to handle value changes
  updating: boolean, // Flag indicating if the cell is currently being updated
  initialValue: any, // Initial value before editing
  onUpdate: (value: any) => Promise<any>, // Function to perform update
  onCancel: () => void, // Function to cancel editing
  type?: "string" | "number" | "date" | "datetime" | "float" // Data type of the cell
) => ReactNode;

// Interface for configuring table columns
export interface CardTableConfig<P, T extends { id: P }> {
  key: keyof T | string; // Unique key for the column
  headerLabel: string; // Label displayed in the header
  groupedHeaderLabel?: string; // Label for grouped headers (optional)
  headerIcon?: ReactNode; // Icon to display in the header (optional)
  type?: "string" | "number" | "date" | "datetime" | "float"; // Data type of the cell
  headerCellProps?: TableCellProps; // Custom props for header cells (optional)
  renderCell?: (cellData: T, onEdit?: () => void) => ReactNode; // Function to render cell content
  renderEditingCell?: CardTableEditCellProps<P, T>; // Function to render editing cell content (optional)
  cellProps?: TableCellProps; // Custom props for cells (optional)
}

// Interface for sorting table data
export interface CardTableSortModel<P, T extends { id: P }> {
  key: keyof T | string; // Column to sort by
  direction: "asc" | "desc"; // Sorting direction
}

// Main interface for CardTable component
export interface CardTableProps<P, T extends { id: P }> {
  rows: T[]; // Array of data objects
  configs: CardTableConfig<P, T>[]; // Array of column configurations
  actions?: ReactNode; // Actions to display above the table (optional)
  renderRowActions?: (item: T, index: number) => ReactNode; // Function to render row-specific actions (optional)
  cellProps?: TableCellProps; // Custom props for all cells (optional)
  tableProps?: TableProps; // Custom props for the underlying MUI Table component (optional)
  cardProps?: CardProps; // Custom props for the card container (optional)
  scrollbarProps?: ScrollbarProps; // Custom props for the scrollbar (optional)
  children?: ReactNode; // Additional content to display within the card (optional)
  onClickRow?: (item: T, index: number) => void; // Function to handle row click events
  onClickEdit?: (item: T, index: number) => void; // Function to handle edit button clicks (optional)
  onClickDelete?: (item: T, index: number) => void; // Function to handle delete button clicks (optional)
  onClickDetail?: (item: T, index: number) => void; // Function to handle detail button clicks (optional)
  onUpdate?: (key: keyof T, value: any, item: T, index: number) => Promise<any>; // Function to handle data updates (use with renderEditingCell)
  indexColumn?: boolean; // Whether to display an index column (optional)
  select?: Selection<T>; // Selection state for handling row selection (optional)
  pagination?: UsePaginationResult; // Pagination state and functions (optional)
  hidePagination?: boolean; // Whether to hide pagination controls (optional)
  stickyHeader?: boolean; // Whether to keep the header fixed during scrolling (optional)
  additionalRow?: ReactNode; // Additional row to display at the bottom (optional)
  additionalTopRow?: ReactNode; // Additional row to display at the top (optional)
  loading?: boolean; // Whether to display a loading indicator (optional)
  flexible?: boolean; // Whether to allow table width to adjust to content (optional)
}

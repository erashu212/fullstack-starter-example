import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import Service from "src/data/services";
import {
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowId,
  GridRowModel,
} from "@mui/x-data-grid";
import { useCallback, useEffect, useState } from "react";
import { Task } from "src/types";
import { TaskForm } from "./Form";

export const Grid = () => {
  const [rows, setRows] = useState<GridRowModel[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [formValues, setFormValues] = useState<Task>();
  const [loading, setLoading] = useState<boolean>(false);

  const getTasks = useCallback(async () => {
    setLoading(true);
    await Service.getAllTask()
      .then((result) => {
        setRows([...result]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    getTasks();
  }, [getTasks]);

  const handleEditClick = useCallback(
    (id: GridRowId) => {
      const rowToUpdate = rows.find((r) => r.id === id);
      setFormValues(rowToUpdate as unknown as Task);
      setOpenDialog(true);
    },
    [rows]
  );

  const handleDeleteClick = useCallback(
    async (id: GridRowId) => {
      await Service.deleteTask(id as string);
      await getTasks();
    },
    [getTasks]
  );

  const handleSubmitClick = useCallback(
    async ({ id, ...values }: Task) => {
      if (!!formValues) {
        await Service.updateTask(id as string, values as Task);
      } else {
        await Service.addTask(values as Task);
      }
      await getTasks();
      setOpenDialog(false);
    },
    [formValues, getTasks]
  );

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name" },
    {
      field: "due",
      headerName: "Due date",
      type: "string",
      width: 220,
      valueGetter: (params) => new Date(params.row.due).toDateString(),
    },
    {
      field: "assignee",
      headerName: "Assignee",
      width: 220,
    },
    {
      field: "reporter",
      headerName: "Reporter",
      width: 220,
    },
    {
      field: "status",
      headerName: "Status",
    },
    {
      field: "priority",
      headerName: "Priority",
      editable: false,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={() => handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        height: 500,
        width: "100%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        slots={{
          toolbar: () => {
            return (
              <GridToolbarContainer>
                <Button
                  color="primary"
                  startIcon={<AddIcon />}
                  onClick={() => {
                    setOpenDialog(true);
                    setFormValues(undefined);
                  }}
                >
                  Add record
                </Button>
              </GridToolbarContainer>
            );
          },
        }}
      />
      <TaskForm
        open={openDialog}
        task={formValues}
        onSubmitButtonClick={handleSubmitClick}
        onCancelButtonClick={() => {
          setOpenDialog(false);
        }}
      />
    </Box>
  );
};

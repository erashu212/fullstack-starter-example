import { useState, useCallback, useMemo, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Option, Priority, Status, Task, User } from "src/types";
import { useForm } from "src/hooks";
import Input from "src/components/Input";
import Select from "src/components/Select";
import Button from "src/components/Button";
import { Box } from "@mui/material";
import Service from "src/data/services";
import { validateTaskForm } from "src/data/utils";

type TaskDialogProps = {
  open?: boolean;
  title?: string;
  task?: Task;
  onSubmitButtonClick?: (values: Task) => void;
  onCancelButtonClick?: () => void;
};

export const TaskForm: React.FC<TaskDialogProps> = ({
  open,
  task,
  title,
  onSubmitButtonClick,
  onCancelButtonClick,
}) => {
  const [users, setUsers] = useState<Option[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmitForm = useCallback(
    (values: Task) => {
      if (onSubmitButtonClick) {
        const assignee = users?.find(
          (u) => u.label === values.assignee
        ) as Option;
        const reporter = users?.find(
          (u) => u.label === values.reporter
        ) as Option;
        onSubmitButtonClick({
          ...values,
          id: task?.id,
          assignee: assignee?.id as string,
          reporter: reporter?.id as string,
        });
      }
    },
    [onSubmitButtonClick, task, users]
  );

  const handleClose = useCallback(() => {
    if (onCancelButtonClick) {
      onCancelButtonClick();
    }
  }, [onCancelButtonClick]);

  useEffect(() => {
    setLoading(true);
    Service.getUsers()
      .then((res: User[]) => {
        return res?.map((u: User) => ({
          label: u.email,
          value: u.email,
          id: u.id,
        })) as unknown as Option[];
      })
      .then((res: Option[]) => {
        setUsers(res);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [task]);

  const {
    values,
    errors,
    setErrors,
    setValues,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useForm<Task>({
    initialValues: {
      name: "",
      assignee: "",
      due: "",
      reporter: "",
      status: Status.Open,
      priority: Priority.P1,
    },
    validate: validateTaskForm,
    onSubmit: handleSubmitForm,
  });

  useEffect(() => {
    if (task) {
      const { id, ...rest } = task;
      setValues({
        ...rest,
        due: new Date(rest.due).toJSON().substring(0, 10) as unknown as string,
      });
      setErrors({});
    }
  }, [task, setValues, setErrors]);

  return open ? (
    <Dialog open onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignitems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          <Input
            autoFocus
            name="name"
            label="Task Name"
            type="text"
            value={values.name}
            onBlur={handleBlur}
            error={errors.name}
            onChange={handleChange}
          />
          <Select
            autoFocus
            name="assignee"
            label="Assignee"
            value={values.assignee}
            error={!!errors.assignee}
            onChange={handleChange}
            options={users ?? []}
          />
          <Input
            autoFocus
            name="due"
            label="Task Due"
            type="date"
            value={values.due}
            onBlur={handleBlur}
            error={errors.due}
            onChange={handleChange}
          />
          <Select
            autoFocus
            name="reporter"
            label="Reporter"
            value={values.reporter}
            error={!!errors.reporter}
            onChange={handleChange}
            options={users}
          />
          <Select
            autoFocus
            name="status"
            label="Status"
            value={values.status}
            error={!!errors.status}
            onChange={handleChange}
            options={[
              {
                label: Status.Open,
                value: Status.Open,
              },
              {
                label: Status.InProgress,
                value: Status.InProgress,
              },
              {
                label: Status.InVerification,
                value: Status.InVerification,
              },
              {
                label: Status.Close,
                value: Status.Close,
              },
            ]}
          />
          <Select
            autoFocus
            name="priority"
            label="Priority"
            value={values.priority ?? ""}
            error={!!errors.priority}
            onChange={handleChange}
            options={[
              {
                label: Priority.P1,
                value: Priority.P1,
              },
              {
                label: Priority.P2,
                value: Priority.P2,
              },
              {
                label: Priority.P3,
                value: Priority.P3,
              },
              {
                label: Priority.P4,
                value: Priority.P4,
              },
              {
                label: Priority.P5,
                value: Priority.P5,
              },
            ]}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button className="cancel" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          className="submit"
          disabled={loading}
          onClick={(event) => handleSubmit(event as unknown as any)}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  ) : null;
};

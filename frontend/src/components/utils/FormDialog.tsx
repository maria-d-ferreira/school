import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface Props {
  text: string;
  title: string;
  openDialog: boolean;
  handleDialog: (b: boolean) => void;
}

export default function FormDialog(props: Props) {
  const { title, text, openDialog, handleDialog } = props;
  const [open, setOpen] = React.useState(openDialog);

  const handleClose = (b: boolean) => {
    setOpen(false);
    handleDialog(b);
  };

  return (
    <div>
      <Dialog open={open} onClose={() => handleClose(false)}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{text}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(true)}>Confirm</Button>
          <Button onClick={() => handleClose(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

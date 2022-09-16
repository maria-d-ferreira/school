import React, { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";

import CardContent from "@mui/material/CardContent";

import Typography from "@mui/material/Typography";
import { Button } from "@material-ui/core";

interface Props {
  id: string;
  name: string;
  email: string;
  courses: string[];
  handleEdit: (id: string) => void;
  handleShowEdit: (b: boolean) => void;
}

export default function UserCard(props: Props) {
  const { id, name, email, courses, handleEdit, handleShowEdit } = props;
  const [showEdit, setShowEdit] = useState(false);

  const handleClickEdit = (id: string) => {
    handleShowEdit(true);
    handleEdit(id);
  };

  return (
    <Card
      variant="outlined"
      sx={{
        minWidth: 275,
        mb: 0.2,
        textAlign: "left",
        justifyContent: "left",
        alignContent: "left",
      }}
    >
      <CardContent>
        <Typography component="div" color="text.secondary">
          {name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {email}
        </Typography>

        <Button
          style={{ width: "75%", textTransform: "none" }}
          variant="outlined"
          size="small"
          onClick={() => handleClickEdit(id)}
        >
          Edit
        </Button>
      </CardContent>
    </Card>
  );
}

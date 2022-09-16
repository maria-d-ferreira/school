import React, { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";

import CardContent from "@mui/material/CardContent";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { text } from "node:stream/consumers";

interface Props {
  id: string;
  name: string;
  email: string;
  enable: boolean;
  handleApprove: (id: string, approve) => void;
}

export default function UserCard(props: Props) {
  const { id, name, email, enable, handleApprove } = props;
  const [approve, setApprove] = useState(enable);

  const handleClick = (id, approve) => {
    handleApprove(id, !approve);
    setApprove(prev => !prev);
  };

  const color = approve ? "text.secondary" : "red";

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
        <Typography component="div" color={color}>
          {name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {email}
        </Typography>

        <Button
          style={{ height: 28, width: "75%", textTransform: "none" }}
          variant="contained"
          size="small"
          onClick={() => handleClick(id, approve)}
        >
          {approve ? "Disable" : "Enable"}
        </Button>

        {/* {showCourses && (

      
         
          )} */}
      </CardContent>
    </Card>
  );
}

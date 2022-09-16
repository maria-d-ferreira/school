import React, { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";

import CardContent from "@mui/material/CardContent";

import Typography from "@mui/material/Typography";
import { Button } from "@material-ui/core";

interface Props {
  name: string;
  email: string;
  courses: string[];
}

export default function UserCard(props: Props) {
  const [showCourses, setShowCourses] = useState(false);
  const { name, email, courses } = props;
  return (
    <Card variant="outlined" sx={{ minWidth: 275, mb: 0.2 }}>
      <CardContent>
        <Typography component="div">{name}</Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {email}
        </Typography>

        <Button
          style={{ width: "75%", textTransform: "none" }}
          variant="outlined"
          size="small"
          onClick={() => setShowCourses(prev => !prev)}
        >
          {showCourses ? "Hide courses" : "Show courses"}
        </Button>

        {/* {showCourses && (

              {courses.map(c => (
                <p>{c}</p>
              ))}
         
          )} */}
      </CardContent>
    </Card>
  );
}

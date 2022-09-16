import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: "98%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

interface Props {
  label: string;
  teachers: any;
}

export default function MuiSelect(props: Props) {
  const { label, teachers } = props;
  const classes = useStyles();
  const [teacher, setTeacher] = React.useState("");

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const handleChange = event => {
    setTeacher(event.target.value);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
          {label}
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={teacher}
          onChange={handleChange}
          labelWidth={labelWidth}
        >
          {teachers.map(({ name }) => (
            <MenuItem value={name}>{name}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

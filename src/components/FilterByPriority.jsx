import React from "react";
import { Button } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { HIGH, LOW, MEDIUM } from "../constants/priority";
import { PRIORITYBUTTON } from "../constants/colors";

class FilterByPriority extends React.Component {
  handleClearFilterByPriority = () => {
    const { setFilter } = this.props;
    setFilter("");
  };

  handleButtonClick = (value) => {
    this.props.setFilter(value);
  };

  render() {
    const { filter } = this.props;
    return (
      <>
        <Button.Group>
          <Button
            variant={
              filter.priority === HIGH && !filter.dueDate ? "filled" : "outline"
            }
            color={PRIORITYBUTTON}
            onClick={() => this.handleButtonClick(HIGH)}
          >
            High
          </Button>
          <Button
            variant={
              filter.priority === MEDIUM && !filter.dueDate
                ? "filled"
                : "outline"
            }
            color={PRIORITYBUTTON}
            onClick={() => this.handleButtonClick(MEDIUM)}
          >
            Medium
          </Button>
          <Button
            variant={
              filter.priority === LOW && !filter.dueDate ? "filled" : "outline"
            }
            color={PRIORITYBUTTON}
            onClick={() => this.handleButtonClick(LOW)}
          >
            Low
          </Button>
          <Button
            variant="light"
            color={"indigo.4"}
            size="sm"
            rightIcon={<IconX size={"1rem"} />}
            onClick={() => this.handleClearFilterByPriority()}
          >
            Clear Filter
          </Button>
        </Button.Group>
      </>
    );
  }
}

export default FilterByPriority;

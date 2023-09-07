import { Button, Group, Text } from "@mantine/core";
import { IconPlus, IconTrashX } from "@tabler/icons-react";
import React from "react";
import FilterByPriority from "./FilterByPriority";
import FilterByDueDate from "./FilterByDueDate";

class ActionButtons extends React.Component {
  render() {
    const { handleNewToDoClick, handleRemoveCompletedClick } = this.props;
    return (
      <>
        <Group position="apart" p={"lg"}>
          <Button
            color="indigo"
            leftIcon={<IconPlus size="1.125rem" />}
            onClick={() => handleNewToDoClick()}
          >
            <Text>Add todo</Text>
          </Button>
          {/* <FilterByPriority />
          <FilterByDueDate /> */}
          <Button
            leftIcon={<IconTrashX size="1.125rem" />}
            color="red"
            onClick={() => handleRemoveCompletedClick()}
          >
            <Text>Remove Completed</Text>
          </Button>
        </Group>
      </>
    );
  }
}

export default ActionButtons;

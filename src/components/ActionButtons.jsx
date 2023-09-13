import { Button, Group, Text } from "@mantine/core";
import { IconPlus, IconTrashX } from "@tabler/icons-react";
import FilterByPriority from "./FilterByPriority";

const ActionButtons = ({
  handleNewToDoClick,
  setIsConfirmModalOpen,
  setFilter,
  filter,
}) => {
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
        <FilterByPriority setFilter={setFilter} filter={filter} />
        <Button
          leftIcon={<IconTrashX size="1.125rem" />}
          color="red"
          onClick={() => setIsConfirmModalOpen()}
        >
          <Text>Remove Completed</Text>
        </Button>
      </Group>
    </>
  );
};

export default ActionButtons;

import { Tabs } from "@mantine/core";
import React from "react";
import { BUTTON } from "../constants/colors";

class FilterByCompletedStatus extends React.Component {
  render() {
    return (
      <Tabs
        orientation="vertical"
        variant="pills"
        color={BUTTON}
        defaultValue="all"
        onTabChange={(value) => this.props.setFilter(value)}
        h={"180px"}
      >
        <Tabs.List position="apart">
          <Tabs.Tab value="all">All</Tabs.Tab>
          <Tabs.Tab value="active">Active</Tabs.Tab>
          <Tabs.Tab value="completed">Completed</Tabs.Tab>
        </Tabs.List>
      </Tabs>
    );
  }
}

export default FilterByCompletedStatus;

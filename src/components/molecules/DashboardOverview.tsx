import React from "react";
import { Card, Statistic, Row, Col } from "antd";
import useLocalStorage from "../../hooks/useLocalStorage";
import { MenuItem } from "../../interface/types";
import { defaultCategories } from "../../utils/constant";

const DashboardOverview: React.FC = () => {
  const [menuItems] = useLocalStorage<MenuItem[]>("menu-items", []);

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={24} md={12} lg={8}>
        <Card>
          <Statistic title="Total Menu Items" value={menuItems.length} />
        </Card>
      </Col>
      <Col xs={24} sm={24} md={12} lg={8}>
        <Card>
          <Statistic
            title="Total Categories"
            value={defaultCategories.length}
          />
        </Card>
      </Col>
      <Col xs={24} sm={24} md={12} lg={8}>
        <Card>
          <Statistic
            title="Available Items"
            value={menuItems.filter((i) => i.available).length}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default DashboardOverview;

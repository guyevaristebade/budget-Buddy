import React, { useEffect } from "react";
import { Row, Col, Card, Statistic } from "antd";

export const RoomStatistics = ({ roomStats }) => {
  useEffect(() => {}, [roomStats]);

  return (
    <Row
      gutter={{ xs: 8, sm: 16, md: 24 }}
      style={{ margin: "2rem 0" }}
      wrap={true}
    >
      <Col span={8}>
        <Card>
          <Statistic title="Total Objet" value={roomStats.items_count} />
        </Card>
      </Col>
      <Col span={8}>
        <Card>
          <Statistic
            title="Prix total"
            value={roomStats.room_price}
            suffix="€"
          />
        </Card>
      </Col>
      <Col span={8}>
        <Card>
          <Statistic
            title="Moyenne"
            value={
              roomStats.items_count === 0
                ? "N/A"
                : (roomStats.room_price / roomStats.items_count).toFixed(2)
            }
            suffix={roomStats.items_count === 0 ? "" : "€"}
          />
        </Card>
      </Col>
    </Row>
  );
};

import React, { useState, useEffect } from "react";
import { Row, Col, Card, Spin, Statistic, Typography } from "antd";
import { getRoomStats } from "../api";
import { BarChart, AreaChart, LineChart } from "../components/graphics";

const { Title } = Typography;
export const OverviewPage = () => {
  const [stats, setStats] = useState({});

  useEffect(() => {
    getRoomStats()
      .then((roomStats) => setStats(roomStats))
      .catch((err) => console.error(err.message));
  }, []);

  if (!stats) {
    return <Spin size="large" fullscreen={true} />;
  }

  return (
    <div>
      <Title level={1} style={{ marginBottom: "4rem" }}>
        Vue d'ensemble
      </Title>
      <Row gutter={8} style={{ marginBottom: "2rem" }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="total"
              value={stats.global?.total_price}
              suffix="€"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Moyenne"
              value={stats.global?.average_price}
              suffix="€"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Pieces" value={stats.global?.rooms_count} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Objets" value={stats.global?.items_count} />
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginBottom: "2rem" }}>
        <Col span={12}>
          <Card
            title={`Piece avec le plus grand nombre d'item : ${stats.global?.most_item_room.name}`}
          >
            <Statistic
              suffix="item(s)"
              value={stats.global?.most_item_room.count}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card
            title={`Piece la plus chère : ${stats.global?.most_expensive_room.name}`}
          >
            <Statistic
              suffix="€"
              value={stats.global?.most_expensive_room.count}
            />
          </Card>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Card>
            <BarChart stats={stats} />
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <LineChart stats={stats} />
          </Card>
        </Col>
      </Row>
      <Row>
        <Col span={24} style={{ marginTop: "2rem" }}>
          <Card>
            <AreaChart stats={stats} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

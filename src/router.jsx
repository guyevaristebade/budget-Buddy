import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  Home,
  Login,
  Register,
  Room,
  Unknown,
  OverviewPage,
  RoomSettings,
  UserSettings,
  ItemPage,
} from "./pages";
import { MainLayout } from "./components";

export const Router = () => (
  <Routes>
    <Route element={<MainLayout />}>
      <Route index element={<Home />} />
      <Route path="room/:_id" element={<Room />} />
      <Route path="overview" element={<OverviewPage />} />
      <Route path="settings" element={<RoomSettings />} />
      <Route path="user-settings" element={<UserSettings />} />
      <Route path="item/:_id" element={<ItemPage />} />
    </Route>
    <Route path="login" element={<Login />} />
    <Route path="register" element={<Register />} />
    <Route path="*" element={<Unknown />} />
  </Routes>
);

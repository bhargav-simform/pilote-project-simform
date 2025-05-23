import { MenuCategory } from "../interface/types";

export const LINK_PATHS = {
  dashboard: {
    path: "/",
  },
  signin: {
    path: "/sign-in",
  },
};

export const defaultCategories: MenuCategory[] = [
  { id: "1", name: "Starters" },
  { id: "2", name: "Main Courses" },
  { id: "3", name: "Side Dishes" },
  { id: "4", name: "Beverages" },
  { id: "5", name: "Desserts" },
  { id: "6", name: "Snacks" },
];

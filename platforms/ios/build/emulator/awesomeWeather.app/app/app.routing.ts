import { MainComponent } from "./pages/main/main.component";
import { FavoritesComponent } from "./pages/favorites/favorites.component";

export const routes = [
  { path: "", component: MainComponent },
  { path: "/favorites", component: FavoritesComponent }
];

export const navigatableComponents = [
  MainComponent,
  FavoritesComponent
];

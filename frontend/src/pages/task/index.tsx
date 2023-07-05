import { withAuth } from "src/hoc";
import { Container } from "@mui/material";
import { Grid } from "./Grid";

const HomeComponent = () => {
  return (
    <Container maxWidth="lg">
      <Grid />
    </Container>
  );
};

export const Home = withAuth(HomeComponent);

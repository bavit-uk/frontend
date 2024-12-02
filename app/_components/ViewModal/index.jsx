<<<<<<< Updated upstream
=======
/* eslint-disable @typescript-eslint/no-unused-vars */
>>>>>>> Stashed changes
import {
  Container,
  Group,
  Modal as ModalMantine,
<<<<<<< Updated upstream
  createStyles,
} from "@mantine/core";
import Button from "../Button";

const useStyles = createStyles((theme) => ({
=======
  createStyles
} from "@mantine/core";
import Button from "../ui/Button";


// Rename your custom useStyles function
const useModalStyles = createStyles((theme) => ({
>>>>>>> Stashed changes
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "5px",
  },
}));

const ViewModal = ({ opened, setOpened, children, title }) => {
<<<<<<< Updated upstream
  const { classes } = useStyles();
=======
  const { classes } = useModalStyles();  // Use the renamed hook here
>>>>>>> Stashed changes
  return (
    <ModalMantine
      opened={opened}
      onClose={() => setOpened(false)}
      withCloseButton={false}
      title={title}
      centered
      radius={"lg"}
      size={"xl"}
      styles={{
        overlay: {
          backdropFilter: "blur(3px)",
        },
        inner: {
          width: "94%",
          paddingInline: "0px !important",
        },
      }}
    >
      <Container className={classes.root} p="0px">
        {children}
        <Group pt={"sm"} ml={"auto"}>
          <Button label="Close" onClick={() => setOpened(false)} />
        </Group>
      </Container>
    </ModalMantine>
  );
};
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
export default ViewModal;

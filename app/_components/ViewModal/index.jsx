import {
  Container,
  Group,
  Modal as ModalMantine,
  createStyles,
} from "@mantine/core";
import Button from "../Button";

const useStyles = createStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "5px",
  },
}));

const ViewModal = ({ opened, setOpened, children, title }) => {
  const { classes } = useStyles();
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
export default ViewModal;

import {
    Container,
    Group,
    Modal as ModalMantine,
    createStyles,
  } from "@mantine/core";
  import Button from "../ui/Button";
  import { ReactNode } from "react";
  
  // Define the props type
  interface ViewModalProps {
    opened: boolean;
    setOpened: (state: boolean) => void;
    children: ReactNode;
    title: string;
  }
  
  // Rename your custom useStyles function
  const useModalStyles = createStyles((theme) => ({
    root: {
      display: "flex",
      flexDirection: "column",
      gap: theme.spacing.md,
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
      borderRadius: theme.radius.md,
      boxShadow: theme.shadows.xl,
      padding: theme.spacing.xl,
    },
    modalHeader: {
      fontSize: theme.fontSizes.lg,
      fontWeight: 600,
      textAlign: "center",
      color:
        theme.colorScheme === "dark" ? theme.colors.gray[0] : theme.colors.dark[8],
    },
    modalContent: {
      fontSize: theme.fontSizes.md,
      color:
        theme.colorScheme === "dark" ? theme.colors.gray[3] : theme.colors.gray[7],
      textAlign: "center",
    },
    closeButton: {
      marginTop: theme.spacing.md,
    },
  }));
  
  const ViewModal: React.FC<ViewModalProps> = ({
    opened,
    setOpened,
    children,
    title,
  }) => {
    const { classes } = useModalStyles();
    return (
      <ModalMantine
        opened={opened}
        onClose={() => setOpened(false)}
        withCloseButton={false}
        centered
        radius={"lg"}
        size={"lg"}
        overlayProps={{
          opacity: 0.55,
          blur: 3,
        }}
        transitionProps={{
          transition: "fade",
          duration: 300,
          timingFunction: "ease-in-out",
        }}
        styles={{
          inner: {
            padding: 0,
          },
          content: {
            padding: 0,
            // borderRadius: theme.radius.md,
          },
        }}
      >
        <Container className={classes.root}>
          <div className={classes.modalHeader}>{title}</div>
          <div className={classes.modalContent}>{children}</div>
          <Group position="right" className={classes.closeButton}>
            <Button label="Close" onClick={() => setOpened(false)} />
          </Group>
        </Container>
      </ModalMantine>
    );
  };
  
  export default ViewModal;
  
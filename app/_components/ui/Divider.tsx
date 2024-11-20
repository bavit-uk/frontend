// TypeScript type definition for the props
type DividerProps = {
  label: string;
  classes: {
    divider?: string;  // Class for the divider line
    label?: string;    // Class for the label text
    container?: string;  // Optional class for the outer container
  };
};

const Divider: React.FC<DividerProps> = ({
  label,
  classes
}) => {
  return (
    <div className={`relative w-full px-2 py-6 ${classes.container || ''}`}>
      <div
        className={`bg-primaryText/25 absolute top-[50%] h-[1px] w-full translate-y-[-50%] ${classes.divider}`}
      ></div>
      <p
        className={`bg-primaryBg absolute left-[50%] top-[50%] z-10 mx-auto w-fit translate-x-[-50%] translate-y-[-50%] px-2 text-center text-sm ${classes.label}`}
      >
        {label}
      </p>
    </div>
  );
};

export default Divider;

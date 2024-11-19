type DividerProps = {
  label: string;
  labelClassName?: string;
  containerClassName?: string;
  borderClassName?: string;
};
const Divider: React.FC<DividerProps> = ({
  label,
  containerClassName,
  labelClassName,
  borderClassName,
}) => {
  return (
    <div className={`relative w-full px-2 py-6 ${containerClassName}`}>
      <div
        className={`bg-primaryText/25 absolute top-[50%] h-[1px] w-full translate-y-[-50%] ${borderClassName}`}
      ></div>
      <p
        className={`bg-primaryBg absolute left-[50%] top-[50%] z-10 mx-auto w-fit translate-x-[-50%] translate-y-[-50%] px-2 text-center text-sm text-slate-500 ${labelClassName}`}
      >
        {label}
      </p>
    </div>
  );
};

export default Divider;

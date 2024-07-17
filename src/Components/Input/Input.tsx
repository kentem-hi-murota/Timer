import { SerializedStyles } from "@emotion/react";

interface Props {
  type: string;
  name: string;
  id?: string;
  label?: string;
  value?: string;
  defaultValue?: string;
  checked?: boolean;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleClick?: () => void;
  handleBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  handleOnFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  styles?: SerializedStyles;
}

const Input: React.FC<Props> = ({
  type,
  name,
  id,
  label,
  value,
  defaultValue,
  checked = false,
  handleChange,
  handleClick,
  handleBlur,
  handleOnFocus,
  styles,
}: Props) => {
  return (
    <div>
      <label>
        {type !== "radio" && label}
        <input
          type={type}
          name={name}
          id={id}
          value={value}
          defaultValue={defaultValue}
          defaultChecked={checked}
          onChange={handleChange}
          onClick={handleClick}
          onBlur={handleBlur}
          onFocus={handleOnFocus}
          css={styles}
        />
        {type === "radio" && label}
      </label>
    </div>
  );
};

export default Input;

interface UnityIconProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  name: string;
  size?: number;
}

export function UnityIcon({ name, size = 24, style, ...props }: UnityIconProps) {
  return (
    <img
      src={`/icons/36-${name}.svg`}
      width={size}
      height={size}
      alt=""
      role="img"
      style={{ display: "inline-block", verticalAlign: "middle", ...style }}
      {...props}
    />
  );
}

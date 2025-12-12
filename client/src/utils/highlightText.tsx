import React from "react";

interface HighlightTextProps {
  text: string;
  highlight: string;
}

/** Escapes special regex characters to prevent injection */
const escapeRegex = (str: string): string =>
  str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export const HighlightText: React.FC<HighlightTextProps> = ({
  text,
  highlight,
}) => {
  if (!highlight.trim()) {
    return <>{text}</>;
  }

  const regex = new RegExp(`(${escapeRegex(highlight)})`, "gi");
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, index) =>
        regex.test(part) ? (
          <span
            key={index}
            style={{
              backgroundColor: "#fff4ce",
              fontWeight: 600,
            }}
          >
            {part}
          </span>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </>
  );
};

export default HighlightText;

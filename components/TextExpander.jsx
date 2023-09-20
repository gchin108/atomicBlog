"use client";
import { useEffect } from "react";
import { useState } from "react";

const CollapsedText = ({ text, wordCount }) => {
  function collapseSentence(sentence, count) {
    const words = sentence.split(" "); //split the sentence into an array when each word is a seperated element in the array
    if (words.length <= count) {
      return sentence;
    }
    const shortenedWords = words.slice(0, count); //returns a shallow copy of a portion of an array into a new array object
    return `${shortenedWords.join(" ")}...`; //  joins all elements of an array into a string
  }

  return <>{collapseSentence(text, wordCount)}</>;
};

export default function TextExpander({
  children,
  collapsedNumWords = 10,
  expandButtonText = "show more",
  collapseButtonText = "show less",
  textStyle,
  textOnCliked,
  buttonStyle,
  expanded,
  containerStyle,
}) {
  const [isExpanded, setIsExpanded] = useState(expanded);
  const needExpansion = children.split(" ").length > collapsedNumWords;

  return (
    <div className={`font-sans flex flex-col gap-2 mb-2 ${containerStyle}`}>
      <div className={`${textStyle}`} onClick={textOnCliked}>
        {isExpanded ? (
          children
        ) : (
          <CollapsedText text={children} wordCount={collapsedNumWords} />
        )}
      </div>
      {needExpansion && (
        <span
          className={`text-orange-400 rounded-lg w-fit py-2 cursor-pointer hover:text-orange-600 ${buttonStyle}`}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? collapseButtonText : expandButtonText}
        </span>
      )}
    </div>
  );
}
